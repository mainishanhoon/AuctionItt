import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-[linear-gradient(to_right,rgb(252,214,255,.7),rgb(41,216,255,.7),rgb(255,253,128,.7),rgb(248,154,191,.7),rgb(252,214,255,.7))] py-3 text-center">
      <div className="container">
        <p className="font-medium">
          <span className="hidden sm:inline">
            Introducing a completely redesigned interface -&nbsp;
          </span>
          <Link
            href="#"
            prefetch={false}
            className="underline underline-offset-4"
          >
            Explore the demo
          </Link>
        </p>
      </div>
    </div>
  );
}
