import { signIn } from '@/app/_utils/auth';
import Form from 'next/form';
import {
  GitHubAuthButton,
  GoogleAuthButton,
} from '@/app/_components/home/Buttons';
import { Fragment } from 'react';

export default async function SocialButton() {
  return (
    <Fragment>
      <Form
        action={async () => {
          'use server';
          await signIn('google', {
            redirectTo: `/home`,
          });
        }}
      >
        <GoogleAuthButton />
      </Form>
      <Form
        action={async () => {
          'use server';
          await signIn('github', {
            redirectTo: `/home`,
          });
        }}
      >
        <GitHubAuthButton />
      </Form>
    </Fragment>
  );
}
