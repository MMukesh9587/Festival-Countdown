// This file needs to be in the public directory.

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-2039701027-271ab",
  "appId": "1:441235110655:web:3b108873248da72ee3aaca",
  "apiKey": "AIzaSyAiqmC6pS7LbOaUvVqahmHDz7_soeJICa8",
  "authDomain": "studio-2039701027-271ab.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "441235110655"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
