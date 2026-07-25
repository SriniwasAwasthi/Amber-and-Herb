"use client";
import { ArrowUpRight, Carrot, Drumstick, Sprout, Wheat } from "lucide-react";

const TAGS = ["Bold", "Fresh", "Tailored"];

export function Hero() {
  return (
    <section id="top" className="glow-hero relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium text-ink">It&apos;s a Lifestyle</span>
          <Sprout size={16} className="animate-pulse-soft text-leaf" />
        </div>

        {/* headline */}
        <h1 className="font-display mx-auto mt-6 max-w-5xl text-center text-[clamp(2.9rem,8.6vw,7.4rem)] font-bold leading-[0.96] tracking-tight text-balance">
          Eat Local, Eat Healthy, Amber & Herb<span className="text-accent">.</span>
        </h1>

        {/* bowl + floating chips */}
        <div className="relative mx-auto mt-4 w-full max-w-3xl md:mt-0">
          <img
            src="/images/hero-bowl.png"
            alt="A glass meal-prep box bursting with fresh vegetables, grains and protein"
            className="relative z-10 mx-auto w-[min(680px,92vw)] select-none drop-shadow-[0_40px_80px_rgba(255,106,43,0.18)]"
            draggable={false}
          />

          {/* category chips */}
          <div className="animate-floaty absolute left-[2%] top-[58%] z-20 hidden md:flex" style={{ animationDelay: "0.4s" }}>
            <Chip icon={<Carrot size={18} />} label="Garden" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty-slow absolute right-[0%] top-[38%] z-20 hidden md:flex">
            <Chip icon={<Wheat size={18} />} label="Bowls & Grains" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty absolute bottom-[6%] right-[8%] z-20 hidden md:flex" style={{ animationDelay: "1.2s" }}>
            <Chip icon={<Drumstick size={18} />} label="Proteins" tint="text-accent bg-accent/15" />
          </div>
        </div>

        {/* bottom row */}
        <div className="relative z-20 mt-10 flex flex-col gap-10 md:mt-2 md:grid md:grid-cols-2 md:items-end">
          <div className="max-w-sm">
            <div className="mb-5 flex flex-wrap gap-2.5">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted transition hover:border-accent/50 hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-[1.7rem]">
              From Our Kitchen
              <br />
              to Your Door
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Healthy eating made effortless. Fuel your body and free your time — real food,
              cooked today, delivered this week.
            </p>
          </div>

          <div className="flex md:justify-end">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-amber via-accent to-ember px-7 py-4 text-sm font-bold text-[#140b05] shadow-[0_16px_50px_-12px_rgba(255,106,43,0.6)] transition hover:shadow-[0_20px_60px_-10px_rgba(255,106,43,0.75)]"
            >
              <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="animate-bob flex h-9 w-6 items-start justify-center rounded-full border border-line pt-1.5">
          <span className="h-2 w-[3px] rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}

function Chip({ icon, label, tint }: { icon: React.ReactNode; label: string; tint: string }) {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new CustomEvent("set-filter", { detail: label }));
        document.getElementById("table")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-panel2/80 py-2.5 pl-2.5 pr-5 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/40"
    >
      <span className={`grid h-9 w-9 place-items-center rounded-xl transition-colors group-hover:bg-accent group-hover:text-[#140b05] ${tint}`}>{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
