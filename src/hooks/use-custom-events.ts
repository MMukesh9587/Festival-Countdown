"use client";

import useLocalStorage from './use-local-storage';
import type { Festival } from '@/lib/types';

export const useCustomEvents = () => {
  const [customEvents, setCustomEvents] = useLocalStorage<Festival[]>('customEvents', []);

  const addCustomEvent = (event: Omit<Festival, 'id' | 'slug' | 'custom' | 'is_fixed' | 'image'>) => {
    const newEvent: Festival = {
      ...event,
      id: `custom-${new Date().getTime()}`,
      slug: `custom-${new Date().getTime()}`,
      custom: true,
      is_fixed: false, // All custom events are treated as one-off
      image: 'event-default'
    };
    setCustomEvents([...customEvents, newEvent]);
  };

  return { customEvents, addCustomEvent };
};
