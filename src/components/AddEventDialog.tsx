"use client";

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Festival } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Event name must be at least 2 characters.' }),
  date: z.string().nonempty({ message: 'Date is required.' }),
  time: z.string().nonempty({ message: 'Time is required.' }),
});

type AddEventFormValues = z.infer<typeof formSchema>;

interface AddEventDialogProps {
  children: ReactNode;
  onAddEvent: (event: Omit<Festival, 'id' | 'slug' | 'custom' | 'is_fixed' | 'image'>) => void;
}

export function AddEventDialog({ children, onAddEvent }: AddEventDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: '',
      time: '00:00',
    },
  });

  function onSubmit(values: AddEventFormValues) {
    const { name, date, time } = values;
    const dateTimeString = `${date}T${time}`;
    const targetDate = new Date(dateTimeString);

    if (isNaN(targetDate.getTime())) {
      form.setError('date', { type: 'manual', message: 'Invalid date or time.' });
      return;
    }

    onAddEvent({
      name: { en: name, hi: name },
      date_rule: dateTimeString,
    });

    toast({
      title: 'Event Added',
      description: `"${name}" has been added to your list.`,
    });
    
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('add_custom_event')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('event_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('event_name_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('event_date')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('event_time')}</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {t('close')}
                </Button>
              </DialogClose>
              <Button type="submit">{t('add_event')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
