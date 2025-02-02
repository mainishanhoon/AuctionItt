'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          size={'lg'}
          className="space-x-2 border-2 border-dashed border-muted-foreground"
        >
          <Loader className="size-5 animate-spin font-bold [animation-duration:3s]" />
          <p className="font-medium">Signing Into Google</p>
        </Button>
      ) : (
        <Button
          size="lg"
          className="space-x-2 border-2 border-muted-foreground font-bold hover:border-primary hover:bg-primary/10"
          variant="outline"
        >
          <FcGoogle className="size-6" />
          <p className="font-medium">Sign In with Google</p>
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          size={'lg'}
          className="space-x-2 border-2 border-dashed border-muted-foreground"
        >
          <Loader className="size-5 animate-spin font-bold [animation-duration:3s]" />
          <p className="font-medium">Signing Into GitHub</p>
        </Button>
      ) : (
        <Button
          size="lg"
          className="space-x-2 border-2 border-muted-foreground font-bold hover:border-primary hover:bg-primary/10"
          variant="outline"
        >
          <GitHubLogoIcon className="size-6" />
          <p className="font-medium">Sign In with GitHub</p>
        </Button>
      )}
    </>
  );
}
