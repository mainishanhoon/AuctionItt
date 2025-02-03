'use client';

import { SignOut } from '@/lib/actions';
import { ReactNode } from 'react';

export default function SignOutWrapper({ children }: { children: ReactNode }) {
  function onSubmit() {
    SignOut();
  }
  return <span onClick={onSubmit}>{children}</span>;
}
