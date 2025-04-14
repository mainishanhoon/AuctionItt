export default function CallToAction() {
  return (
    <section id="Features" className="bg-black py-18 text-white md:py-24">
      <div className="relative container max-w-xl">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Try it Yourself!
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iusto
          doloribus amet! Vero error qui eveniet, fuga maiores quo inventore
        </p>
        <form className="mx-auto mt-10 flex max-w-sm flex-col items-center justify-center gap-2.5 md:max-w-md md:flex-row">
          <input
            type="email"
            placeholder="loremipsum@email.com"
            className="placeholder:text-muted-foreground h-12 w-full rounded-lg bg-white/20 px-5 font-medium"
          />
          <button className="h-12 rounded-lg bg-white px-5 font-medium text-black uppercase">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
