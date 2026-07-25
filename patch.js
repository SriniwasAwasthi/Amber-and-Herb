const fs = require('fs');

function replace(file, search, replace) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes(search)) {
    console.error('FAILED TO FIND in ' + file + ':\n' + search);
    process.exit(1);
  }
  fs.writeFileSync(file, content.replace(search, replace));
  console.log('Patched ' + file);
}

// 1. box.tsx
replace('src/components/box.tsx',
`  count: number;
  totalCents: number;
  open: boolean;
  setOpen: (b: boolean) => void;
};`,
`  count: number;
  totalCents: number;
  open: boolean;
  setOpen: (b: boolean) => void;
  toast: (msg: string) => void;
};`);

replace('src/components/box.tsx',
`export function BoxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<number, number>>({});
  const [meals, setMeals] = useState<BoxMeal[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((m: BoxMeal) => {`,
`export function BoxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<number, number>>({});
  const [meals, setMeals] = useState<BoxMeal[]>([]);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }, []);

  const add = useCallback((m: BoxMeal) => {`);

replace('src/components/box.tsx',
`  return (
    <Ctx.Provider
      value={{ items, meals, add, dec, remove, clear, count, totalCents, open, setOpen }}
    >
      {children}
      <BoxDrawer />
    </Ctx.Provider>
  );`,
`  return (
    <Ctx.Provider
      value={{ items, meals, add, dec, remove, clear, count, totalCents, open, setOpen, toast }}
    >
      {children}
      <BoxDrawer />
      <div
        className={\`fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-line bg-[#15100b] px-6 py-3 text-sm font-medium text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 \${
          toastMsg ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }\`}
      >
        {toastMsg}
      </div>
    </Ctx.Provider>
  );`);

// 2. Nav.tsx
replace('src/components/Nav.tsx',
`  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useBox();`,
`  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen, toast } = useBox();`);

replace('src/components/Nav.tsx',
`            <a href="#faqs" className="hidden text-sm text-accent transition hover:text-amber md:block">
              Current Customer?
            </a>`,
`            <button onClick={() => toast("Customer portal coming soon.")} className="hidden text-sm text-accent transition hover:text-amber md:block">
              Current Customer?
            </button>`);

// 3. Hero.tsx
replace('src/components/Hero.tsx',
`          {/* category chips */}
          <div className="animate-floaty absolute left-[2%] top-[58%] z-20 hidden md:flex" style={{ animationDelay: "0.4s" }}>
            <Chip icon={<Carrot size={18} />} label="Vegetables" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty-slow absolute right-[0%] top-[38%] z-20 hidden md:flex">
            <Chip icon={<Wheat size={18} />} label="Grains" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty absolute bottom-[6%] right-[8%] z-20 hidden md:flex" style={{ animationDelay: "1.2s" }}>
            <Chip icon={<Drumstick size={18} />} label="Proteins" tint="text-accent bg-accent/15" />
          </div>`,
`          {/* category chips */}
          <div className="animate-floaty absolute left-[2%] top-[58%] z-20 hidden md:flex" style={{ animationDelay: "0.4s" }}>
            <Chip icon={<Carrot size={18} />} label="Garden" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty-slow absolute right-[0%] top-[38%] z-20 hidden md:flex">
            <Chip icon={<Wheat size={18} />} label="Bowls & Grains" tint="text-amber bg-amber/15" />
          </div>
          <div className="animate-floaty absolute bottom-[6%] right-[8%] z-20 hidden md:flex" style={{ animationDelay: "1.2s" }}>
            <Chip icon={<Drumstick size={18} />} label="Proteins" tint="text-accent bg-accent/15" />
          </div>`);

replace('src/components/Hero.tsx',
`function Chip({ icon, label, tint }: { icon: React.ReactNode; label: string; tint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel2/80 py-2.5 pl-2.5 pr-5 shadow-xl backdrop-blur-md">
      <span className={\`grid h-9 w-9 place-items-center rounded-xl \${tint}\`}>{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}`,
`function Chip({ icon, label, tint }: { icon: React.ReactNode; label: string; tint: string }) {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new CustomEvent("set-filter", { detail: label }));
        document.getElementById("table")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-panel2/80 py-2.5 pl-2.5 pr-5 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent/40"
    >
      <span className={\`grid h-9 w-9 place-items-center rounded-xl transition-colors group-hover:bg-accent group-hover:text-[#140b05] \${tint}\`}>{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}`);

// 4. MenuSection.tsx
replace('src/components/MenuSection.tsx',
`import { useMemo, useState } from "react";`,
`import { useMemo, useState, useEffect } from "react";`);

replace('src/components/MenuSection.tsx',
`  const [justAdded, setJustAdded] = useState<number | null>(null);

  const filtered = useMemo(`,
`  const [justAdded, setJustAdded] = useState<number | null>(null);

  useEffect(() => {
    const onFilter = (e: any) => {
      if (CATS.includes(e.detail)) setCat(e.detail);
    };
    window.addEventListener("set-filter", onFilter);
    return () => window.removeEventListener("set-filter", onFilter);
  }, []);

  const filtered = useMemo(`);

// 5. Sections.tsx
replace('src/components/Sections.tsx',
`                    <a
                      href="#contact"
                      className={\`mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition \${`,
`                    <a
                      href="#contact"
                      onClick={() => window.dispatchEvent(new CustomEvent("set-plan", { detail: p.name }))}
                      className={\`mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition \${`);

replace('src/components/Sections.tsx',
`Want to grow with us? <a href="#contact" className="text-accent underline-offset-4 hover:underline">Become a partner farm</a>`,
`Want to grow with us? <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("set-message", { detail: "I'm interested in becoming a partner farm..." }))} className="text-accent underline-offset-4 hover:underline">Become a partner farm</a>`);

// 6. FaqContact.tsx
replace('src/components/FaqContact.tsx',
`import { useState, type FormEvent } from "react";`,
`import { useState, useEffect, type FormEvent } from "react";`);

replace('src/components/FaqContact.tsx',
`import { Logo } from "./Nav";
import type { FaqRow } from "@/db/schema";`,
`import { Logo } from "./Nav";
import { useBox } from "./box";
import type { FaqRow } from "@/db/schema";`);

replace('src/components/FaqContact.tsx',
`export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [form, setForm] = useState({ email: "", phone: "", plan: PLANS[0], message: "" });

  const submit = async (e: FormEvent) => {`,
`export function Contact() {
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

  const submit = async (e: FormEvent) => {`);

replace('src/components/FaqContact.tsx',
`export function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (`,
`export function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const { toast } = useBox();

  return (`);

replace('src/components/FaqContact.tsx',
`          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#top"
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
              </a>
            ))}
          </div>`,
`          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <button
                key={s.label}
                onClick={() => toast(\`Redirecting to \${s.label}...\`)}
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
          </div>`);

