
'use client';

import { Bell, BellRing } from 'lucide-react';
import { Button } from './ui/button';
import { useFCM } from '@/hooks/use-fcm';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import type { Festival } from '@/lib/types';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export function RemindMeButton({ festival }: { festival: Festival }) {
  const { token, notificationPermission, setNotificationPermission } = useFCM();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const firestore = useFirestore();

  const subscriptionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/pushSubscriptions`),
      where('festivalId', '==', festival.id)
    );
  }, [firestore, user, festival.id]);

  const { data: subscriptions, isLoading: subscriptionsLoading } = useCollection(subscriptionsQuery);

  const isSubscribed = subscriptions && subscriptions.length > 0;

  const handleRemindMe = async () => {
    if (isUserLoading || subscriptionsLoading) return; // Wait for auth and data

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'You must be signed in to set a reminder.',
      });
      return;
    }

    if (notificationPermission === 'denied') {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description:
          'You have denied notification permissions. Please enable them in your browser settings.',
      });
      return;
    }

    if (notificationPermission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission); // Update the state in the hook
        if (permission !== 'granted') {
          toast({
            variant: 'destructive',
            title: 'Permission Required',
            description: 'You must allow notifications to receive reminders.',
          });
          return;
        }
        // If permission is granted, the token will be fetched by the useFCM hook.
        // We can show a pending toast and let the user click again.
        toast({
            title: 'Permission Granted!',
            description: 'Please click "Remind Me" again to confirm.',
        });
        return; // Return here, user will click again
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        toast({
          variant: 'destructive',
          title: 'Permission Error',
          description: 'An error occurred while requesting notification permission.',
        });
        return;
      }
    }

    if (token) {
      const subscription = {
        fcmToken: token,
        festivalId: festival.id,
        reminderTime: '09:00', // Example time, could be user-configurable
        userId: user.uid,
      };

      try {
        const subscriptionsCollection = collection(
          firestore,
          `users/${user.uid}/pushSubscriptions`
        );
        addDocumentNonBlocking(subscriptionsCollection, subscription);

        toast({
          title: 'Reminder Set!',
          description: `You will be notified before ${typeof festival.name === 'string' ? festival.name : festival.name.en}.`,
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Failed to set reminder',
          description: error.message,
        });
      }
    } else {
        toast({
            variant: 'destructive',
            title: 'Could not get notification token.',
            description: 'Please click again, or try refreshing the page.',
        });
    }
  };

  if (notificationPermission === null) {
    return null; // Don't render until permission status is known
  }
  
  const buttonText = isSubscribed ? 'Reminder is Set' : 'Remind Me';

  return (
    <Button
      variant={isSubscribed ? 'default' : 'outline'}
      onClick={handleRemindMe}
      disabled={isSubscribed || isUserLoading || subscriptionsLoading}
      aria-label={buttonText}
      size="lg"
    >
      {isSubscribed ? (
        <BellRing className="mr-2 h-5 w-5" />
      ) : (
        <Bell className="mr-2 h-5 w-5" />
      )}
      {buttonText}
    </Button>
  );
}
