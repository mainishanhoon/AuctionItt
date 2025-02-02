import SocialButton from '@/components/auth/SocialButton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function AuthDialogBox() {
  return (
    <section
      className="flex min-h-dvh items-center justify-center"
      style={{
        backgroundImage: 'url(/signIn.jpeg)',
        objectFit: 'cover',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-4xl font-black">
            <Image
              alt="Logo"
              src="/logo.png"
              width={250}
              height={250}
              className="size-20"
            />
            <p className="font-bold tracking-wide">
              Auction
              <span className="text-primary">Itt</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-3xl font-medium">
          <span className="rounded-xl bg-primary/10 px-3 py-1">Access</span>
          &nbsp;your Account
        </CardContent>
        <CardFooter className="flex w-full flex-col items-center gap-3">
          <SocialButton />
        </CardFooter>
      </Card>
    </section>
  );
}
