'use client';

import { SignOut } from '@/app/actions';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function SignOutWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function onSubmit() {
    SignOut();
  }
  return (
    <span onClick={onSubmit} className={cn(className)}>
      {children}
    </span>
  );
}
