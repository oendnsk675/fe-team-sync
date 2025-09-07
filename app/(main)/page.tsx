import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative">
      <img
        src="/hero-ui.png"
        alt="hero ui"
        className="absolute z-20 left-1/2 translate-x-[-50%] -bottom-[28rem] 2xl:-bottom-[26rem]"
      />
      <img
        src="/ellipse-1.png"
        alt="ellipse"
        className="absolute z-10 -left-[45rem] -top-[70rem] opacity-25"
      />
      <img
        src="/ellipse-1.png"
        alt="ellipse"
        className="absolute z-10 -left-[28rem] -bottom-[70rem] opacity-80"
      />
      <img
        src="/ellipse-2.png"
        alt="ellipse"
        className="absolute z-10 -right-[33rem] -bottom-[32rem] opacity-80"
      />

      {/* HERO */}
      <section className="relative z-20 max-w-xl mx-auto flex flex-col gap-6 h-[455px] 2xl:h-[700px] items-center justify-center">
        <h1 className="text-5xl font-bold text-center">
          Create your products more effeccienlty
        </h1>

        <span className=" text-center">
          revolutionizing software development with streamlined issues, sprints
          and roadmaps.
        </span>

        <div className="flex gap-4">
          <Link href="/sign-in">
            <button className="btn btn-primary">Get Started</button>
          </Link>
          <Link href={''}>
            <button className="btn btn-outline">Pricing</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
