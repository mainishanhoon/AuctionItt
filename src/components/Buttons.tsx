'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Image from 'next/image';

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          className="border-2 border-dashed border-muted-foreground bg-primary/80"
        >
          <Loader className="size-5 animate-spin font-bold [animation-duration:3s]" />
          <p className="font-medium">Signing Into Google</p>
        </Button>
      ) : (
        <Button>
          <Image
            alt="GoogleLogo"
            src="/google.svg"
            width={25}
            height={25}
            className="size-6"
          />
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
          className="border-2 border-dashed border-muted-foreground bg-primary/80"
        >
          <Loader className="size-5 animate-spin font-bold [animation-duration:3s]" />
          <p className="font-medium">Signing Into GitHub</p>
        </Button>
      ) : (
        <Button>
          <Image
            alt="GitHubLogo"
            src="/github.svg"
            width={25}
            height={25}
            className="size-6 invert dark:invert-0"
          />
          <p className="font-medium">Sign In with GitHub</p>
        </Button>
      )}
    </>
  );
}
