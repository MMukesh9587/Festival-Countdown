
// This file needs to be in the public directory.
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-2039701027-271ab",
  "appId": "1:441235110655:web:3b108873248da72ee3aaca",
  "apiKey": "AIzaSyAiqmC6pS7LbOaUvVqahmHDz7_soeJICa8",
  "authDomain": "studio-2039701027-271ab.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "441235110655"
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  if (!payload.notification) {
    return;
  }

  const notificationTitle = payload.notification.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: payload.notification.image || '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
