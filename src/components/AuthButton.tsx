
'use client';

import { useUser, useAuth } from '@/firebase';
import { Button } from './ui/button';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export function AuthButton() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignIn = () => {
    initiateAnonymousSignIn(auth);
    toast({
      title: 'Signing In...',
      description: 'You will be signed in shortly.',
    });
  };

  const handleSignOut = () => {
    signOut(auth);
    toast({
      title: 'Signed Out',
      description: 'You have been signed out.',
    });
  };

  if (isUserLoading) {
    return <Button variant="ghost" size="icon" disabled className="animate-pulse" />;
  }

  if (!user) {
    return (
      <Button variant="outline" onClick={handleSignIn}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <UserIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Anonymous User</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.uid}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
