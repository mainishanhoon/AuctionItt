import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import Form from 'next/form';

export default async function SignOutButton() {
  return (
    <Form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit" variant="destructive">
        SignOut
      </Button>
    </Form>
  );
}
