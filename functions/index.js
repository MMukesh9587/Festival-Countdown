
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendFestivalReminders = functions.pubsub
  .schedule("every day 09:00")
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    console.log("दैनिक रिमाइंडर जांच शुरू हो रही है...");

    const firestore = admin.firestore();
    const messaging = admin.messaging();

    const subscriptionsSnapshot = await firestore
      .collectionGroup("pushSubscriptions")
      .get();

    if (subscriptionsSnapshot.empty) {
      console.log("कोई रिमाइंडर सब्सक्रिप्शन नहीं मिला।");
      return null;
    }

    const festivalPromises = [];
    const subscriptionsByFestival = {};

    subscriptionsSnapshot.forEach((doc) => {
      const subscription = doc.data();
      const { festivalId, fcmToken } = subscription;

      if (!subscriptionsByFestival[festivalId]) {
        subscriptionsByFestival[festivalId] = [];
      }
      subscriptionsByFestival[festivalId].push(fcmToken);

      if (!festivalPromises.find(p => p.id === festivalId)) {
         const festivalDocRef = firestore.collection("festivals").doc(festivalId);
         festivalPromises.push({id: festivalId, promise: festivalDocRef.get()});
      }
    });

    const festivalDocs = await Promise.all(festivalPromises.map(p => p.promise));

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    for(let i = 0; i < festivalDocs.length; i++) {
        const festivalDoc = festivalDocs[i];
        const festivalId = festivalPromises[i].id;

        if (!festivalDoc.exists) {
            console.log(`त्योहार ${festivalId} नहीं मिला।`);
            continue;
        }

        const festival = festivalDoc.data();
        
        let festivalDate;
        if (/^\d{4}-\d{2}-\d{2}/.test(festival.date_rule)) {
            festivalDate = new Date(festival.date_rule.substring(0, 10) + "T00:00:00");
        } else if (/^\d{2}-\d{2}$/.test(festival.date_rule)) {
            const [month, day] = festival.date_rule.split('-').map(Number);
            festivalDate = new Date(now.getFullYear(), month - 1, day);
            if (festivalDate < now) {
                festivalDate.setFullYear(now.getFullYear() + 1);
            }
        } else {
             console.log(`त्योहार ${festivalId} के लिए अमान्य तारीख प्रारूप: ${festival.date_rule}`);
             continue;
        }

        if (festivalDate.getTime() - now.getTime() < oneDay && festivalDate.getTime() > now.getTime()) {
            const tokens = subscriptionsByFestival[festivalId];
            if (tokens && tokens.length > 0) {
                const payload = {
                    notification: {
                        title: `🎉 ${festival.name.en || festival.name} का रिमाइंडर!`,
                        body: `याद रखें, ${festival.name.en || festival.name} कल है! तैयारी शुरू करें!`,
                        icon: "https://festivalcountdown.netlify.app/icons/icon-192x192.png"
                    },
                    webpush: {
                        fcm_options: {
                            link: `https://festivalcountdown.netlify.app/festivals/${festival.slug}`
                        }
                    }
                };

                console.log(`${tokens.length} यूज़र्स को ${festival.name.en || festival.name} के लिए नोटिफिकेशन भेजा जा रहा है।`);
                await messaging.sendToDevice(tokens, payload);
            }
        }
    }

    console.log("रिमाइंडर जांच पूरी हुई।");
    return null;
  });
