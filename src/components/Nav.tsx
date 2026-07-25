"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useBox } from "./box";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 10c-2-4 1-8 6-8 1 4-2 8-6 8Z" fill="#7cb342" />
      <path d="M25 11c1-3 5-4 8-3-1 3-5 5-8 3Z" fill="#9bd84f" />
      <path
        d="M24 12c9 0 15 7 15 15 0 9-7 16-15 16S9 36 9 27c0-8 6-15 15-15Z"
        fill="url(#lg)"
      />
      <path d="M11 24c5 1 9-1 12-1s7 2 13 1" stroke="#140b05" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".55" />
      <path d="M10 30c6 1 10-1 14-1s8 2 14 1" stroke="#140b05" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".55" />
      <path d="M12 36c5 1 8-1 12-1s7 2 12 1" stroke="#140b05" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".55" />
      <defs>
        <linearGradient id="lg" x1="9" y1="12" x2="39" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#e8501a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#family", label: "About" },
  { href: "#faqs", label: "FAQs" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

const RAIL = [
  { id: "fresh", label: "Fresh" },
  { id: "source", label: "Source" },
  { id: "goals", label: "Goals" },
  { id: "trusted", label: "Trusted" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "ingredients", label: "Ingredients" },
  { id: "family", label: "Our Family" },
  { id: "table", label: "Table" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen, toast } = useBox();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-5">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Amber & Herb home">
              <Logo />
              <span className="font-display hidden text-lg font-bold tracking-tight sm:block">
                Amber<span className="text-accent"> & Herb</span>
              </span>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="group hidden items-center gap-3 md:flex"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-[2px] w-7 bg-ink transition-all group-hover:w-5 group-hover:bg-accent" />
                <span className="h-[2px] w-7 bg-ink transition-all group-hover:bg-accent" />
              </span>
              <span className="text-sm font-medium text-muted transition group-hover:text-ink">Menu</span>
            </button>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
              >
                <span className="h-1 w-1 rounded-full bg-accent opacity-70 transition group-hover:scale-150" />
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => toast("Customer portal coming soon.")} className="hidden text-sm text-accent transition hover:text-amber md:block">
              Current Customer?
            </button>
            <button
              onClick={() => setOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:border-accent/60 hover:text-accent"
              aria-label={`Open box, ${count} meals`}
            >
              <ShoppingBag size={17} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-[#140b05]">
                  {count}
                </span>
              )}
            </button>
            <a
              href="#table"
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent hover:text-[#140b05] sm:flex"
            >
              Order Now
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[#140b05] transition group-hover:translate-x-0.5 group-hover:bg-[#140b05] group-hover:text-accent">
                <ArrowRight size={12} />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* full overlay menu */}
      <div
        className={`fixed inset-0 z-[80] transition ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-full max-w-lg flex-col border-r border-line bg-panel px-8 py-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-lg font-bold">
                Amber<span className="text-accent"> & Herb</span>
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent/50 hover:text-ink"
              aria-label="Close menu"
            >
              <X size={17} />
            </button>
          </div>
          <nav className="flex flex-col">
            {[
              { href: "#fresh", label: "Fresh" },
              { href: "#source", label: "Source" },
              { href: "#goals", label: "Goals & Plans" },
              { href: "#lifestyle", label: "How it works" },
              { href: "#ingredients", label: "Ingredients" },
              { href: "#table", label: "This Week's Table" },
              { href: "#family", label: "Our Family" },
              { href: "#partners", label: "Partners" },
              { href: "#faqs", label: "FAQs" },
              { href: "#contact", label: "Contact" },
            ].map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 border-b border-line py-4 transition hover:pl-2"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <span className="font-display text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold text-muted transition group-hover:text-ink">
                  {l.label}
                </span>
                <ArrowRight
                  size={16}
                  className="ml-auto -translate-x-2 text-accent opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <a
              href="#table"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold text-[#140b05] transition hover:bg-amber"
            >
              Order Now <ArrowRight size={16} />
            </a>
            <p className="mt-4 text-center text-xs text-faint">
              Est. 2015 · Delicious, attainable, affordable.
            </p>
          </div>
        </div>
      </div>

      <SectionRail />
    </>
  );
}

function SectionRail() {
  const [active, setActive] = useState("fresh");

  useEffect(() => {
    const sections = RAIL.map((r) => document.getElementById(r.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      aria-label="Section navigation"
    >
      {RAIL.map((r) => {
        const on = active === r.id;
        return (
          <a key={r.id} href={`#${r.id}`} className="group flex items-center gap-3">
            <span
              className={`text-[11px] tracking-wide transition-all duration-300 ${
                on ? "font-semibold text-accent" : "text-faint group-hover:text-muted"
              }`}
            >
              {r.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                on ? "w-10 bg-accent" : "w-5 bg-line group-hover:w-8 group-hover:bg-muted"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
