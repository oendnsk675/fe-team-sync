export default function Home() {
  return (
    <main className="">
      {/* HERO */}
      <section className="max-w-xl mx-auto flex flex-col gap-6 h-[455px] items-center justify-center">
        <h1 className="text-5xl font-bold text-center">
          Create your products more effeccienlty
        </h1>

        <span className=" text-center">
          revolutionizing software development with streamlined issues, sprints
          and roadmaps.
        </span>

        <div className="flex gap-4">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </section>
    </main>
  );
}
