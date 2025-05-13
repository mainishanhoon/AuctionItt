'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/app/_components/ui/button';
import { IconLoader } from '@tabler/icons-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { TextMorph } from '@/app/_components/ui/text-morph';
import { Fragment, ReactNode } from 'react';

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <Fragment>
      <Button
        type="submit"
        disabled={pending}
        variant={'outline'}
        className={`${pending && 'outline-muted-foreground outline-2 outline-dashed'} text-foreground flex w-fit items-center text-sm font-medium tracking-normal`}
      >
        {!pending && (
          <Image
            alt="GoogleLogo"
            src="/google.webp"
            width={25}
            height={25}
            className="size-5"
          />
        )}
        {pending && (
          <IconLoader
            size={25}
            strokeWidth={2.5}
            className="animate-spin [animation-duration:3s]"
          />
        )}
        <TextMorph>
          {pending ? 'Signing In with Google...' : 'Sign In with Google'}
        </TextMorph>
      </Button>
    </Fragment>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <Fragment>
      <Button
        type="submit"
        disabled={pending}
        variant={'outline'}
        className={`${pending && 'outline-muted-foreground outline-2 outline-dashed'} text-foreground flex w-fit items-center text-sm font-medium tracking-normal`}
      >
        {!pending && (
          <Image
            alt="GitHubLogo"
            src="/github.webp"
            width={25}
            height={25}
            className="size-5 invert-0 dark:invert"
          />
        )}
        {pending && (
          <IconLoader
            size={25}
            strokeWidth={2.5}
            className="animate-spin [animation-duration:3s]"
          />
        )}
        <TextMorph>
          {pending ? 'Signing In with Github...' : 'Sign In with Github'}
        </TextMorph>
      </Button>
    </Fragment>
  );
}

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  loadingText: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  loadingVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
  className?: string;
}

export function SubmitButton({
  icon,
  text,
  loadingText,
  buttonVariant,
  loadingVariant,
  className,
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Fragment>
      <Button
        type="submit"
        size="sm"
        disabled={pending}
        variant={pending ? loadingVariant : buttonVariant}
        className={twMerge(
          pending && 'outline-muted-foreground outline-2 outline-dashed',
          buttonVariant === 'destructive' &&
            !pending &&
            'text-muted dark:text-red-900',
          'flex w-fit items-center gap-1 text-sm',
          className,
        )}
      >
        {pending ? (
          <IconLoader
            size={25}
            strokeWidth={2.5}
            className="animate-spin [animation-duration:3s]"
          />
        ) : (
          <span>{icon}</span>
        )}
        <TextMorph className="font-medium">
          {pending ? `${loadingText}` : `${text}`}
        </TextMorph>
      </Button>
    </Fragment>
  );
}
