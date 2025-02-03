import { signIn } from '@/lib/auth';
import Form from 'next/form';
import { GitHubAuthButton, GoogleAuthButton } from '@/components/Buttons';
import { Fragment } from 'react';

export default async function SocialButton() {
  return (
    <Fragment>
      <Form
        action={async () => {
          'use server';
          await signIn('google', {
            redirectTo: `/auth/onboarding`,
          });
        }}
      >
        <GoogleAuthButton />
      </Form>
      <Form
        action={async () => {
          'use server';
          await signIn('github', {
            redirectTo: `/auth/onboarding`,
          });
        }}
      >
        <GitHubAuthButton />
      </Form>
    </Fragment>
  );
}
