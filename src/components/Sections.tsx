"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChefHat,
  Check,
  Clock,
  Flame,
  Heart,
  MapPin,
  Salad,
  Sprout,
  Star,
  Sunrise,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Marquee, Reveal } from "./box";

/* ---------------- shared bits ---------------- */

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
      <span className="h-px w-8 bg-accent" />
      {children}
    </span>
  );
}

function useCountUp(target: number, active: boolean, dur = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, dur]);
  return v;
}

/* ---------------- FRESH ---------------- */

const FRESH_STATS = [
  { value: 48, suffix: "h", label: "from farm harvest to your doorstep" },
  { value: 0, suffix: "", label: "preservatives, additives or shortcuts. ever." },
  { value: 26, suffix: "", label: "partner farms within 60 miles of our kitchen" },
  { value: 100, suffix: "%", label: "seasonal produce, menu rewritten every week" },
];

function Stat({ value, suffix, label, delay }: (typeof FRESH_STATS)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, on);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="border-l-2 border-accent/60 pl-5">
        <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          {n}
          <span className="text-accent">{suffix}</span>
        </p>
        <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-muted">{label}</p>
      </div>
    </Reveal>
  );
}

export function Fresh() {
  return (
    <section id="fresh" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Tag>Fresh</Tag>
          <h2 className="font-display mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Picked at dawn.
            <br />
            On your table
            <br />
            by <span className="text-accent">dinner.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Nothing sits in a warehouse. Nothing waits in a freezer. Our growers harvest in the
            morning, our cooks fire the pans by noon, and your box arrives the same week it was
            alive in the ground.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {FRESH_STATS.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOURCE ---------------- */

const SOURCE_STEPS = [
  {
    n: "01",
    icon: MapPin,
    title: "Partner farms, real names",
    body: "We buy from 26 growers we can drive to — Hilltop Greens, Red Barn Dairy, Blue Cove Fisheries. If we wouldn't serve it to our own kids, it doesn't get a contract.",
  },
  {
    n: "02",
    icon: Sunrise,
    title: "Harvested the morning we cook",
    body: "Trucks leave the fields before 7am. Produce is washed, trimmed and prepped within hours of leaving the soil — that's where the flavour (and the nutrients) actually live.",
  },
  {
    n: "03",
    icon: ChefHat,
    title: "Cooked same-day, sealed fresh",
    body: "Forty cooks, one kitchen, zero shortcuts. Meals are portioned into returnable glass, blast-chilled, and routed to your door on the next delivery run.",
  },
];

export function Source() {
  return (
    <section id="source" className="glow-warm relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <Tag>Source</Tag>
          <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Three hands touch your food.
            <span className="text-muted"> All of them ours.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 space-y-12 md:space-y-16">
          <span className="absolute bottom-4 left-[27px] top-4 hidden w-px bg-line md:block" aria-hidden="true" />
          {SOURCE_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className={`relative flex flex-col gap-5 md:flex-row md:items-start md:gap-10 ${i % 2 ? "md:pl-24" : ""}`}>
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/40 bg-panel text-accent">
                  <s.icon size={20} />
                </span>
                <div className={`max-w-2xl rounded-2xl border border-line bg-panel/70 p-7 transition hover:border-accent/30 ${i % 2 ? "md:ml-auto" : ""} md:w-2/3`}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-bold text-accent/80">{s.n}</span>
                    <h3 className="font-display text-xl font-semibold md:text-2xl">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GOALS ---------------- */

const PLANS = [
  {
    id: "train",
    name: "Lean & Train",
    who: "For fitness enthusiasts",
    icon: Flame,
    base: 1150,
    featured: false,
    perks: ["Macro-tagged, 35g+ protein", "Post-workout ready in 3 min", "Carb-cycled options"],
  },
  {
    id: "time",
    name: "The Time-Saver",
    who: "For busy professionals",
    icon: Clock,
    base: 1050,
    featured: true,
    perks: ["Zero decisions all week", "Desk-drawer friendly", "Skip or pause in two taps"],
  },
  {
    id: "family",
    name: "Family Table",
    who: "For everyday families",
    icon: Users,
    base: 1250,
    featured: false,
    perks: ["Bigger portions, kid-approved", "One box feeds four", "Mild & adventurous splits"],
  },
];

function perMealCents(base: number, meals: number) {
  if (meals >= 12) return base - 250;
  if (meals >= 8) return base - 150;
  return base;
}

export function Goals() {
  const [meals, setMeals] = useState(8);
  return (
    <section id="goals" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Tag>Goals</Tag>
          </div>
          <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Pick your why.
            <span className="text-muted"> We&apos;ll handle the how.</span>
          </h2>
          <p className="mt-5 text-muted">
            Founded in 2015 for fitness enthusiasts, busy professionals and everyday families —
            three plans, one promise: delicious, attainable, affordable.
          </p>
        </Reveal>

        {/* meals slider */}
        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-line bg-panel px-6 py-6">
            <div className="flex items-baseline justify-between">
              <label htmlFor="meals" className="text-sm font-medium text-muted">
                Meals per week
              </label>
              <span className="font-display text-2xl font-bold text-amber">{meals}</span>
            </div>
            <input
              id="meals"
              type="range"
              min={4}
              max={14}
              value={meals}
              onChange={(e) => setMeals(Number(e.target.value))}
              className="mt-4 w-full accent-[#ff6a2b]"
            />
            <div className="mt-2 flex justify-between text-[11px] text-faint">
              <span>4 · light</span>
              <span>8 · steady</span>
              <span>14 · all-in</span>
            </div>
            {meals >= 12 ? (
              <p className="mt-3 text-center text-xs font-semibold text-leaf">
                Best rate unlocked — save $2.50 per meal
              </p>
            ) : (
              <p className="mt-3 text-center text-xs text-faint">
                Add {12 - meals} more to unlock the best rate
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const each = perMealCents(p.base, meals);
            const weekly = each * meals;
            return (
              <Reveal key={p.id} delay={i * 110} className={p.featured ? "lg:-my-4" : ""}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 transition duration-300 hover:-translate-y-1.5 ${
                    p.featured
                      ? "border-accent/60 bg-gradient-to-b from-panel2 to-panel shadow-[0_30px_80px_-30px_rgba(255,106,43,0.45)]"
                      : "border-line bg-panel/70 hover:border-accent/30"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#140b05]">
                      Most loved
                    </span>
                  )}
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      p.featured ? "bg-accent text-[#140b05]" : "bg-accent/12 text-accent"
                    }`}
                  >
                    <p.icon size={22} />
                  </span>
                  <h3 className="font-display mt-5 text-2xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.who}</p>
                  <ul className="mt-6 space-y-2.5">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check size={15} className="mt-0.5 shrink-0 text-leaf" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <div className="flex items-end justify-between border-t border-line pt-5">
                      <div>
                        <p className="font-display text-3xl font-bold">
                          ${(each / 100).toFixed(2)}
                          <span className="text-sm font-medium text-muted"> /meal</span>
                        </p>
                      </div>
                      <p className="text-right text-sm text-muted">
                        ≈ <span className="font-semibold text-amber">${(weekly / 100).toFixed(0)}</span>
                        <br />
                        per week
                      </p>
                    </div>
                    <a
                      href="#contact"
                      onClick={() => window.dispatchEvent(new CustomEvent("set-plan", { detail: p.name }))}
                      className={`mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition ${
                        p.featured
                          ? "bg-accent text-[#140b05] hover:bg-amber"
                          : "border border-line text-ink hover:border-accent/60 hover:text-accent"
                      }`}
                    >
                      {p.featured ? <Heart size={15} /> : null}
                      Start this plan
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUSTED ---------------- */

const TESTIMONIALS = [
  {
    quote:
      "I've cycled through every meal-kit app out there. Amber & Herb is the first one that tastes like a cook made it — because one actually did. My prep Sunday is now just… Sunday.",
    name: "Dana R.",
    role: "Fitness enthusiast · customer since 2019",
  },
  {
    quote:
      "Twelve-hour workdays killed my cooking. Now I open the fridge, grab a box, and eat better than I ever did ordering in. It's the one subscription I've never paused.",
    name: "Marcus T.",
    role: "Busy professional · customer since 2021",
  },
  {
    quote:
      "Two kids, two jobs, zero time. The Family Table plan ended the nightly 'what's for dinner' standoff — and somehow both kids eat the vegetables. Witchcraft.",
    name: "Priya & Sam K.",
    role: "Family of four · customers since 2017",
  },
];

const TRUST_STATS = [
  { v: "10", l: "years cooking, since 2015" },
  { v: "2.4M", l: "meals delivered & counting" },
  { v: "4.9", l: "average box rating" },
  { v: "92%", l: "of customers reorder weekly" },
];

export function Trusted() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5600);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];

  return (
    <section id="trusted" className="relative border-y border-line bg-panel/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="rounded-2xl border border-line bg-bg/50 p-6 text-center">
                <p className="font-display text-4xl font-bold text-amber">{s.v}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative mx-auto mt-16 max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber text-amber" />
              ))}
            </div>
            <blockquote
              key={idx}
              className="reveal is-in font-display text-xl font-medium leading-snug text-balance md:text-[1.7rem]"
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-accent">{t.name}</p>
            <p className="mt-1 text-xs text-muted">{t.role}</p>
            <div className="mt-8 flex justify-center gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === idx ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- LIFESTYLE ---------------- */

const STEPS = [
  { icon: Salad, title: "Choose", body: "Pick your meals from this week's table — or let us balance the box for you." },
  { icon: ChefHat, title: "We cook", body: "Real chefs, real pans, same-day. Sealed in returnable glass, never plastic film." },
  { icon: Truck, title: "Delivered", body: "Chilled boxes land on your porch Sunday or Wednesday evening. Leave the empties out." },
  { icon: Flame, title: "Heat & live", body: "Three minutes, any kitchen, zero cleanup. Reclaim the hour you'd have spent cooking." },
];

export function Lifestyle() {
  return (
    <section id="lifestyle" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <Tag>Lifestyle</Tag>
          <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Dinner, minus the <span className="text-accent">second job.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="group relative">
                <div className="mb-6 flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-panel text-muted transition duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-[#140b05]">
                    <s.icon size={22} />
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent md:block" />
                  )}
                  <span className="font-display absolute right-0 top-0 text-4xl font-bold text-line transition group-hover:text-accent/30">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INGREDIENTS ---------------- */

const ALWAYS = [
  "Seasonal vegetables, harvested this week",
  "Whole grains & sprouted seeds",
  "Lean, traceable proteins",
  "Cold-pressed oils & real butter",
  "Sea salt, herbs & honest spices",
];

const NEVER = [
  "Preservatives or stabilisers",
  "Refined sugars & syrups",
  "Artificial colours or flavours",
  "Frozen-for-months anything",
  "Mystery 'natural' additives",
];

export function Ingredients() {
  return (
    <section id="ingredients" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Tag>Ingredients</Tag>
          </div>
          <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Pure means <span className="text-leaf">nothing to hide.</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-leaf/25 bg-leaf/[0.05] p-8">
              <h3 className="font-display flex items-center gap-3 text-xl font-bold text-leaf">
                <Sprout size={20} /> Always in the box
              </h3>
              <ul className="mt-6 space-y-4">
                {ALWAYS.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf/15 text-leaf">
                      <Check size={12} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-ember/25 bg-ember/[0.05] p-8">
              <h3 className="font-display flex items-center gap-3 text-xl font-bold text-accent">
                <X size={20} /> Never. Not once.
              </h3>
              <ul className="mt-6 space-y-4">
                {NEVER.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember/15 text-accent">
                      <X size={12} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAMILY ---------------- */

const VALUES = ["Delicious", "Attainable", "Affordable"];

export function Family() {
  return (
    <section id="family" className="glow-warm relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-line">
              <img
                src="https://images.pexels.com/photos/3296437/pexels-photo-3296437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt="An Amber & Herb cook preparing fresh greens in the kitchen"
                className="h-[480px] w-full object-cover transition duration-700 hover:scale-[1.03] md:h-[560px]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-line bg-panel px-6 py-4 shadow-xl">
              <p className="font-display text-3xl font-bold text-accent">Est. 2015</p>
              <p className="mt-0.5 text-xs text-muted">Two burners then. Forty cooks now.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Tag>Our Family</Tag>
          <h2 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Started small.
            <br />
            Stayed <span className="text-accent">honest.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            Amber & Herb was established in 2015 to accommodate fitness enthusiasts, busy
            professionals, and everyday families — because eating well shouldn&apos;t be a
            luxury, a hobby, or a part-time job.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We believe in delicious, attainable, and affordable meals for all. A decade on, that
            belief still sets every menu, every price, and every route our drivers take.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {VALUES.map((v) => (
              <span
                key={v}
                className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent"
              >
                {v}
              </span>
            ))}
          </div>
          <p className="font-display mt-10 text-lg font-medium text-muted">
            — Mara &amp; the Amber & Herb family
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PARTNERS ---------------- */

const FARMS_A = [
  "Hilltop Greens",
  "Red Barn Dairy",
  "Stonefield Grains",
  "Blue Cove Fisheries",
  "Ortega Orchards",
  "Wildroot Farms",
];
const FARMS_B = [
  "Sunbeam Poultry",
  "Cedar & Sage Honey",
  "Mill Creek Mushrooms",
  "Golden Acre Co-op",
  "Salt Meadow Eggs",
  "Two Rivers Beef",
];

export function Partners() {
  return (
    <section id="partners" className="relative border-t border-line py-24 md:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Tag>Partners</Tag>
            <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Grown by <span className="text-leaf">neighbours.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every ingredient has a name and a face behind it. These are the farms, dairies and
            fisheries that make the menu possible.
          </p>
        </Reveal>
      </div>
      <div className="space-y-5 border-y border-line py-8">
        <Marquee items={FARMS_A} />
        <Marquee items={FARMS_B} reverse />
      </div>
      <p className="mt-8 text-center text-xs text-faint">
        Want to grow with us? <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("set-message", { detail: "I'm interested in becoming a partner farm..." }))} className="text-accent underline-offset-4 hover:underline">Become a partner farm</a>
      </p>
    </section>
  );
}
