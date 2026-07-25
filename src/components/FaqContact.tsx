"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Send,
} from "lucide-react";

const SOCIALS = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "X",
    path: <path d="M4 4l7.2 9.3L4.4 20h2.5l5.4-5.3L16.8 20H20l-7.5-9.7L18.9 4h-2.5l-4.8 4.8L8 4z" />,
  },
];
import { Reveal } from "./box";
import { Logo } from "./Nav";
import { useBox } from "./box";
import type { FaqRow } from "@/db/schema";

/* ---------------- FAQs ---------------- */

export function Faqs({ faqs }: { faqs: FaqRow[] }) {
  const [open, setOpen] = useState<number | null>(faqs[0]?.id ?? null);

  return (
    <section id="faqs" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-8 bg-accent" />
            FAQs
          </span>
          <h2 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Questions,
            <br />
            <span className="text-muted">answered honestly.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            No fine print, no gotchas. If it&apos;s not covered here, the humans in our kitchen
            reply within one business day.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-amber"
          >
            Ask us anything <ArrowRight size={15} />
          </a>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <Reveal key={f.id} delay={i * 60}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-lg font-semibold transition md:text-xl ${
                        isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {f.question}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 ${
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-[#140b05]"
                          : "border-line text-muted group-hover:border-accent/60 group-hover:text-accent"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div className={`acc-body ${isOpen ? "open" : ""}`}>
                    <div className="acc-inner">
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted md:text-base">
                        {f.answer}
                      </p>
                    </div>
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

/* ---------------- Contact ---------------- */

const PLANS = ["Not sure yet — help me choose", "Lean & Train", "The Time-Saver", "Family Table", "I'm a current customer"];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [form, setForm] = useState({ email: "", phone: "", plan: PLANS[0], message: "" });

  useEffect(() => {
    const onPlan = (e: any) => setForm(f => ({ ...f, plan: e.detail }));
    const onMsg = (e: any) => setForm(f => ({ ...f, message: e.detail }));
    window.addEventListener("set-plan", onPlan);
    window.addEventListener("set-message", onMsg);
    return () => {
      window.removeEventListener("set-plan", onPlan);
      window.removeEventListener("set-message", onMsg);
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ...form }),
      });
      const data = (await res.json()) as { ok: boolean };
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="glow-warm relative border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Contact
          </span>
          <h2 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Say hello.
            <br />
            <span className="text-muted">We answer fast.</span>
          </h2>
          <div className="mt-10 space-y-5">
            {[
              { icon: MapPin, t: "The kitchen", d: "12 Market Lane, Riverside District" },
              { icon: Clock, t: "Hours", d: "Mon–Sat · 7am–6pm (delivery runs Sun & Wed evenings)" },
              { icon: Phone, t: "Call or text", d: "(555) 014-2015" },
              { icon: Mail, t: "Write", d: "hello@amberandherb.example" },
            ].map((r) => (
              <div key={r.t} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-panel text-accent">
                  <r.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.t}</p>
                  <p className="mt-0.5 text-sm text-muted">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-3">
          <div className="rounded-3xl border border-line bg-panel p-7 md:p-10">
            {status === "done" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-leaf">
                  <Check size={28} />
                </span>
                <h3 className="font-display text-3xl font-bold">Got it, {name.split(" ")[0]}.</h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted">
                  Your message is on its way to the kitchen. Expect a real reply from a real human
                  within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      Name
                    </label>
                    <input
                      id="c-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Rivera"
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="field"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      Phone <span className="normal-case text-faint">(optional)</span>
                    </label>
                    <input
                      id="c-phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-plan" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      I&apos;m interested in
                    </label>
                    <select
                      id="c-plan"
                      value={form.plan}
                      onChange={(e) => setForm({ ...form, plan: e.target.value })}
                      className="field appearance-none"
                    >
                      {PLANS.map((p) => (
                        <option key={p} value={p} className="bg-panel text-ink">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="c-msg" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Allergies, delivery questions, partner farm inquiries — tell us everything."
                    className="field resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-accent">
                    Hmm, that didn&apos;t go through. Give it another try in a moment.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-accent py-4 text-sm font-bold text-[#140b05] transition hover:bg-amber disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

const FOOT_LINKS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "#fresh", label: "Fresh" },
      { href: "#source", label: "Source" },
      { href: "#ingredients", label: "Ingredients" },
      { href: "#table", label: "This Week's Table" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#family", label: "Our Family" },
      { href: "#partners", label: "Partners" },
      { href: "#trusted", label: "Reviews" },
      { href: "#faqs", label: "FAQs" },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: "#goals", label: "Plans & pricing" },
      { href: "#table", label: "Order now" },
      { href: "#lifestyle", label: "How it works" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const { toast } = useBox();

  return (
    <footer className="relative border-t border-line bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-10 w-10" />
              <span className="font-display text-2xl font-bold">
                Amber<span className="text-accent"> & Herb</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Delicious, attainable, affordable meals for all — from our kitchen to your door
              since 2015.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubbed(true);
              }}
              className="mt-7 flex max-w-sm gap-2"
            >
              {subbed ? (
                <p className="flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-5 py-3 text-sm font-semibold text-leaf">
                  <Check size={15} /> You&apos;re on the list — see you Sunday.
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for the weekly menu"
                    className="field"
                    aria-label="Email for weekly menu"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-accent px-5 text-sm font-bold text-[#140b05] transition hover:bg-amber"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOT_LINKS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-muted transition hover:text-accent">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-faint">
            © 2015–{new Date().getFullYear()} Amber & Herb. Made with real ingredients.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <button
                key={s.label}
                onClick={() => toast(`Redirecting to ${s.label}...`)}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-accent/60 hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.path}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
