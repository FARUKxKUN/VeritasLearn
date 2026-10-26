export function Paths() {
  return (
    <section aria-labelledby="paths" className="shell py-20">
      <h2 id="paths" className="text-h1">
        Two ways out of the gate.
      </h2>
      <div className="mt-12 grid gap-0 md:grid-cols-2">
        <div className="border-2 border-ink p-7 md:p-10">
          <p className="label">Path one</p>
          <h3 className="mt-3 text-h2">Copy it</h3>
          <p className="mt-4 text-ink-2">
            The answer opens right away. You keep it, you earn nothing, and the activity log notes that you copied.
          </p>
          <p className="tnum mt-8 font-display text-hero leading-none text-ink-3">0</p>
        </div>
        <div className="border-2 border-crimson bg-crimson p-7 text-paper md:border-l-0 md:p-10">
          <p className="label !text-paper">Path two</p>
          <h3 className="mt-3 text-h2">Earn it</h3>
          <p className="mt-4">
            Pass the check and you get the answer, a study sheet, and points. Miss it and an easier set is offered for 30.
          </p>
          <p className="tnum mt-8 font-display text-hero leading-none">+50</p>
        </div>
      </div>
    </section>
  );
}
