
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

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (Notification.permission !== 'default') {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && user) {
        try {
          const messaging = getMessaging(firebaseApp);

          // Request permission if not granted or denied
          if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            setNotificationpermission(permission);
            if (permission !== 'granted') {
              console.log('Notification permission not granted.');
              return;
            }
          }
          
          if(Notification.permission === 'granted') {
             // Get FCM token
            const currentToken = await getToken(messaging);

            if (currentToken) {
                setToken(currentToken);
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
          }

        } catch (error) {
          console.error('An error occurred while retrieving token. ', error);
        }
      }
    };

    retrieveToken();
    
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

  }, [firebaseApp, user, toast]);

  return { token, notificationPermission };
};
