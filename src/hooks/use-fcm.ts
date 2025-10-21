
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
      if (Notification.permission !== 'default') {
        setNotificationPermission(Notification.permission);
      }
    }
    
    if (firebaseApp && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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
  }, [firebaseApp, toast]);


  // Effect for retrieving the FCM token, depends on user and permission status
  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && user && notificationPermission === 'granted') {
        try {
          const messaging = getMessaging(firebaseApp);
          const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          const currentToken = await getToken(messaging, { 
              vapidKey: 'BFIXI5c9g5f58s43x5R8s_E1xQhB-n2XwYJgKl8Z1v5f2X2Y7p1h9C3mF4jJ3kL3h5J2g1cR0n4mY2w9O1',
              serviceWorkerRegistration: swRegistration
          });

          if (currentToken) {
              setToken(currentToken);
          } else {
              console.log('No registration token available. Request permission to generate one.');
          }
        } catch (error) {
          console.error('An error occurred while retrieving token. ', error);
        }
      }
    };

    retrieveToken();
  }, [firebaseApp, user, notificationPermission]);

  return { token, notificationPermission, setNotificationPermission };
};

