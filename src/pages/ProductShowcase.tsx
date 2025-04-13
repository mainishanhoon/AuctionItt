import Image from 'next/image';

export default function ProductShowcase() {
  return (
    <div className="bg-gradient-to-b from-black to-emerald-500 text-white py-18 md:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Intuitive Interface
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
          pariatur sequi explicabo iusto, vitae nemo iste consequuntur,
        </p>
        <Image src="/Dashboard.png" alt="Dashboard Image" width={1000} height={1000} className="mt-14 rounded-sm" />
      </div>
    </div>
  );
}
