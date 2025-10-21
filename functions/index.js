
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase एडमिन SDK को शुरू करें
admin.initializeApp();

/**
 * यह Cloud Function हर दिन भारतीय समय के अनुसार सुबह 9 बजे अपने आप चलेगा।
 * इसका काम उन त्योहारों के लिए रिमाइंडर भेजना है जो अगले 24 घंटों में आने वाले हैं।
 */
exports.sendFestivalReminders = functions.pubsub
  .schedule("every day 09:00")
  .timeZone("Asia/Kolkata") // भारतीय समय क्षेत्र
  .onRun(async (context) => {
    console.log("दैनिक रिमाइंडर जांच शुरू हो रही है...");

    const firestore = admin.firestore();
    const messaging = admin.messaging();

    // उन सभी सब्सक्रिप्शन्स को प्राप्त करें जो एक्टिव हैं
    const subscriptionsSnapshot = await firestore
      .collectionGroup("pushSubscriptions")
      .get();

    if (subscriptionsSnapshot.empty) {
      console.log("कोई रिमाइंडर सब्सक्रिप्शन नहीं मिला।");
      return null;
    }

    const festivalPromises = [];
    const subscriptionsByFestival = {};

    // सभी सब्सक्रिप्शन्स को त्योहार ID के अनुसार ग्रुप करें
    subscriptionsSnapshot.forEach((doc) => {
      const subscription = doc.data();
      const { festivalId, fcmToken } = subscription;

      if (!subscriptionsByFestival[festivalId]) {
        subscriptionsByFestival[festivalId] = [];
      }
      subscriptionsByFestival[festivalId].push(fcmToken);

      // त्योहार का डेटा प्राप्त करने का वादा बनाएं (यदि पहले से नहीं है)
      if (!festivalPromises.find(p => p.id === festivalId)) {
         const festivalDocRef = firestore.collection("festivals").doc(festivalId);
         festivalPromises.push({id: festivalId, promise: festivalDocRef.get()});
      }
    });

    const festivalDocs = await Promise.all(festivalPromises.map(p => p.promise));

    for(let i = 0; i < festivalDocs.length; i++) {
        const festivalDoc = festivalDocs[i];
        const festivalId = festivalPromises[i].id;

        if (!festivalDoc.exists) {
            console.log(`त्योहार ${festivalId} नहीं मिला।`);
            continue;
        }

        const festival = festivalDoc.data();
        const festivalDate = new Date(festival.date_rule + "T00:00:00");
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        // जांचें कि क्या त्योहार अगले 24 घंटों में है
        if (festivalDate.getTime() - now.getTime() < oneDay && festivalDate.getTime() > now.getTime()) {
            const tokens = subscriptionsByFestival[festivalId];
            if (tokens && tokens.length > 0) {
                const payload = {
                    notification: {
                        title: `🎉 ${festival.name.en} का रिमाइंडर!`,
                        body: `याद रखें, ${festival.name.en} कल है! तैयारी शुरू करें!`,
                        icon: "https://festivalcountdown.netlify.app/icons/icon-192x192.png"
                    },
                    webpush: {
                        fcm_options: {
                            link: `https://festivalcountdown.netlify.app/festivals/${festival.slug}`
                        }
                    }
                };

                console.log(`${tokens.length} यूज़र्स को ${festival.name.en} के लिए नोटिफिकेशन भेजा जा रहा है।`);
                await messaging.sendToDevice(tokens, payload);
            }
        }
    }

    console.log("रिमाइंडर जांच पूरी हुई।");
    return null;
  });
