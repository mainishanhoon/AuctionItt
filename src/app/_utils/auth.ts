import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from '@/app/_utils/prisma';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Resend, Google, GitHub],
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/error',
    newUser: '/auth/onboarding',
  },
});
