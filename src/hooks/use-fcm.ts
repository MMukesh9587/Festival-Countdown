
'use client';

import { useState, useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useFirebaseApp, useUser } from '@/firebase/provider';
import { useToast } from './use-toast';

export const useFCM = () => {
  const firebaseApp = useFirebaseApp();
  const { user } = useUser();
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);

  // Effect for handling service worker registration and foreground messages
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        // Set initial permission status
        setNotificationPermission(Notification.permission);

        // Set up foreground message listener
        if (firebaseApp) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground message received.', payload);
                toast({
                    title: payload.notification?.title,
                    description: payload.notification?.body,
                });
            });
            return () => unsubscribe();
        }
    }
  }, [firebaseApp, toast]);


  // Effect for retrieving the FCM token, depends on user and permission status
  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && user && notificationPermission === 'granted') {
        try {
          const messaging = getMessaging(firebaseApp);
          // Register the service worker
          const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          
          // Get token
          const currentToken = await getToken(messaging, {
              serviceWorkerRegistration: swRegistration
          });

          if (currentToken) {
              setToken(currentToken);
          } else {
              console.log('No registration token available. Request permission to generate one.');
          }
        } catch (error) {
          console.error('An error occurred while retrieving token. ', error);
          // This error is often due to an invalid VAPID key or service worker issues.
        }
      }
    };

    retrieveToken();
  }, [firebaseApp, user, notificationPermission]);

  return { token, notificationPermission, setNotificationPermission };
};
