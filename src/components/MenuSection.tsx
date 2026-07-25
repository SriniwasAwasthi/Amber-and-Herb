"use client";

import { useMemo, useState, useEffect } from "react";
import { Check, Drumstick, Flame, Plus, RotateCw } from "lucide-react";
import { money, Reveal, useBox, type BoxMeal } from "./box";
import type { MealRow } from "@/db/schema";

const CATS = ["All", "Proteins", "Garden", "Bowls & Grains"] as const;

export function MenuSection({ meals }: { meals: MealRow[] }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const { add, items } = useBox();
  const [justAdded, setJustAdded] = useState<number | null>(null);

  useEffect(() => {
    const onFilter = (e: any) => {
      if (CATS.includes(e.detail)) setCat(e.detail);
    };
    window.addEventListener("set-filter", onFilter);
    return () => window.removeEventListener("set-filter", onFilter);
  }, []);

  const filtered = useMemo(
    () => (cat === "All" ? meals : meals.filter((m) => m.category === cat)),
    [meals, cat],
  );

  const handleAdd = (m: MealRow) => {
    add({ id: m.id, name: m.name, priceCents: m.priceCents, image: m.image, category: m.category } as BoxMeal);
    setJustAdded(m.id);
    window.setTimeout(() => setJustAdded((v) => (v === m.id ? null : v)), 1200);
  };

  return (
    <section id="table" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-8 bg-accent" />
              The Table
            </span>
            <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              This week&apos;s <span className="text-accent">table.</span>
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted">
            <RotateCw size={14} className="text-leaf" />
            Menu rotates every Sunday with the harvest
          </p>
        </Reveal>

        {/* filters */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  cat === c
                    ? "bg-accent text-[#140b05]"
                    : "border border-line text-muted hover:border-accent/50 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto hidden items-center text-sm text-faint sm:flex">
              {filtered.length} meal{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => {
            const added = justAdded === m.id;
            const inBox = items[m.id] ?? 0;
            return (
              <Reveal key={m.id} delay={(i % 3) * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_rgba(255,106,43,0.35)]">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {m.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-bg/70 px-3 py-1 text-[11px] font-semibold text-amber backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {inBox > 0 && (
                      <span className="absolute right-4 top-4 grid h-7 min-w-7 place-items-center rounded-full bg-accent px-2 text-xs font-bold text-[#140b05]">
                        {inBox} in box
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <Flame size={13} className="text-accent" /> {m.kcal} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Drumstick size={13} className="text-leaf" /> {m.protein}g protein
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-xl font-bold leading-tight">{m.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{m.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <p className="font-display text-lg font-bold text-amber">{money(m.priceCents)}</p>
                      <button
                        onClick={() => handleAdd(m)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                          added
                            ? "bg-leaf text-[#10230a]"
                            : "bg-ink text-bg hover:bg-accent hover:text-[#140b05]"
                        }`}
                      >
                        {added ? (
                          <>
                            <Check size={15} /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={15} /> Add to box
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
