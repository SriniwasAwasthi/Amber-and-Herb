"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Check,
  ArrowRight,
  Leaf,
} from "lucide-react";

export type BoxMeal = {
  id: number;
  name: string;
  priceCents: number;
  image: string;
  category: string;
};

export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

type BoxCtx = {
  items: Record<number, number>;
  meals: BoxMeal[];
  add: (m: BoxMeal) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  count: number;
  totalCents: number;
  open: boolean;
  setOpen: (b: boolean) => void;
  toast: (msg: string) => void;
};

const Ctx = createContext<BoxCtx | null>(null);

export function useBox() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBox outside provider");
  return v;
}

export function BoxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<number, number>>({});
  const [meals, setMeals] = useState<BoxMeal[]>([]);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }, []);

  const add = useCallback((m: BoxMeal) => {
    setItems((p) => ({ ...p, [m.id]: (p[m.id] ?? 0) + 1 }));
    setMeals((p) => (p.some((x) => x.id === m.id) ? p : [...p, m]));
  }, []);

  const dec = useCallback((id: number) => {
    setItems((p) => {
      const n = { ...p };
      if (!n[id]) return p;
      n[id] -= 1;
      if (n[id] <= 0) delete n[id];
      return n;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((p) => {
      const n = { ...p };
      delete n[id];
      return n;
    });
    setMeals((p) => p.filter((m) => m.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems({});
    setMeals([]);
  }, []);

  const count = useMemo(
    () => Object.values(items).reduce((a, b) => a + b, 0),
    [items],
  );
  const totalCents = useMemo(
    () => meals.reduce((a, m) => a + m.priceCents * (items[m.id] ?? 0), 0),
    [meals, items],
  );

  return (
    <Ctx.Provider
      value={{ items, meals, add, dec, remove, clear, count, totalCents, open, setOpen, toast }}
    >
      {children}
      <BoxDrawer />
      <div
        className={`fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-line bg-[#15100b] px-6 py-3 text-sm font-medium text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          toastMsg ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {toastMsg}
      </div>
    </Ctx.Provider>
  );
}

function BoxDrawer() {
  const { open, setOpen, meals, items, dec, add, remove, count, totalCents, clear } = useBox();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!open) setPlaced(false);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-panel shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Your weekly box"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
              <ShoppingBag size={17} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-none">Your weekly box</p>
              <p className="mt-1 text-xs text-muted">
                {count} meal{count === 1 ? "" : "s"} · delivery included
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-accent/50 hover:text-ink"
            aria-label="Close box"
          >
            <X size={16} />
          </button>
        </header>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-leaf">
              <Check size={28} />
            </span>
            <h3 className="font-display text-2xl font-bold">Box locked in.</h3>
            <p className="text-sm leading-relaxed text-muted">
              Nice choices. We&apos;ll text you within the hour to confirm your first delivery
              window — Sunday or Wednesday, 5–9pm.
            </p>
            <button
              onClick={() => {
                clear();
                setOpen(false);
              }}
              className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#140b05] transition hover:bg-amber"
            >
              Done
            </button>
          </div>
        ) : count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-line text-faint">
              <Leaf size={24} />
            </span>
            <h3 className="font-display text-xl font-semibold">Your box is empty</h3>
            <p className="text-sm text-muted">
              Browse this week&apos;s table and toss in whatever looks good. No minimums.
            </p>
            <a
              href="#table"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-[#140b05]"
            >
              See the menu <ArrowRight size={15} />
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {meals
                .filter((m) => items[m.id])
                .map((m) => (
                  <div key={m.id} className="flex gap-4 rounded-2xl border border-line bg-panel2/60 p-3">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{m.name}</p>
                        <button
                          onClick={() => remove(m.id)}
                          className="text-faint transition hover:text-accent"
                          aria-label={`Remove ${m.name}`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{money(m.priceCents)} each</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-1">
                          <button
                            onClick={() => dec(m.id)}
                            className="grid h-6 w-6 place-items-center rounded-full text-muted transition hover:bg-line hover:text-ink"
                            aria-label="One less"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">{items[m.id]}</span>
                          <button
                            onClick={() => add(m)}
                            className="grid h-6 w-6 place-items-center rounded-full text-muted transition hover:bg-line hover:text-ink"
                            aria-label="One more"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-amber">
                          {money(m.priceCents * (items[m.id] ?? 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <footer className="border-t border-line px-6 py-5">
              <div className="mb-1 flex items-center justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>{money(totalCents)}</span>
              </div>
              <div className="mb-4 flex items-center justify-between text-sm text-muted">
                <span>Delivery &amp; packaging</span>
                <span className="text-leaf">Included</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Total</span>
                <span className="font-display text-lg font-bold text-amber">{money(totalCents)}</span>
              </div>
              <button
                onClick={() => setPlaced(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold text-[#140b05] transition hover:bg-amber"
              >
                Lock in this box <ArrowRight size={16} />
              </button>
              <p className="mt-3 text-center text-[11px] text-faint">
                Skip or pause anytime · no subscription traps
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- marquee ---------- */
export function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const track = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display px-6 text-sm font-semibold uppercase tracking-[0.22em] text-muted md:px-8">
            {t}
          </span>
          <Leaf size={13} className="text-accent" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-paused overflow-hidden">
      <div
        className={`animate-marquee flex w-max ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {track("a")}
        {track("b")}
      </div>
    </div>
  );
}
