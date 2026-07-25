import { db } from "@/db";
import { meals, faqs } from "@/db/schema";

const MEALS = [
  {
    name: "Citrus Chicken & Avocado",
    description:
      "Char-grilled chicken, pineapple, avocado and cherry tomatoes over baby greens with a lime-honey drizzle.",
    category: "Proteins",
    kcal: 420,
    protein: 38,
    priceCents: 1050,
    tags: ["High Protein", "GF"],
    image:
      "https://images.pexels.com/photos/17597414/pexels-photo-17597414.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 1,
  },
  {
    name: "Sesame Ginger Chicken",
    description:
      "Seared chicken tossed with rainbow peppers and a toasted sesame-ginger glaze. Bold, glossy, gone in minutes.",
    category: "Proteins",
    kcal: 460,
    protein: 41,
    priceCents: 1100,
    tags: ["High Protein", "Dairy-Free"],
    image:
      "https://images.pexels.com/photos/38714623/pexels-photo-38714623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 2,
  },
  {
    name: "Garlic Butter Prawns",
    description:
      "Plump prawns, charred broccolini and zucchini ribbons finished in brown-butter garlic. Weeknight luxury.",
    category: "Proteins",
    kcal: 380,
    protein: 32,
    priceCents: 1250,
    tags: ["Pescatarian", "GF"],
    image:
      "https://images.pexels.com/photos/17597407/pexels-photo-17597407.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 3,
  },
  {
    name: "Sunday Roast Chicken",
    description:
      "Slow-roasted breast with pan jus and smashed herbs. The comfort classic, portioned for real life.",
    category: "Proteins",
    kcal: 440,
    protein: 44,
    priceCents: 1050,
    tags: ["High Protein", "Family Fave"],
    image:
      "https://images.pexels.com/photos/6107756/pexels-photo-6107756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 4,
  },
  {
    name: "Market Greens Bowl",
    description:
      "Crisp seasonal greens, shaved vegetables and a bright citrus vinaigrette. The one your body asks for.",
    category: "Garden",
    kcal: 310,
    protein: 12,
    priceCents: 850,
    tags: ["Vegan", "GF"],
    image:
      "https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 5,
  },
  {
    name: "Little Gem Caesar",
    description:
      "Charred little gem, sourdough croutons and a whipped tahini caesar. All crunch, no guilt.",
    category: "Garden",
    kcal: 340,
    protein: 11,
    priceCents: 850,
    tags: ["Vegetarian"],
    image:
      "https://images.pexels.com/photos/1591226/pexels-photo-1591226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 6,
  },
  {
    name: "Seed & Sprout Salad",
    description:
      "Sprouted grains, toasted seeds and garden vegetables with a green-goddess dressing. Quietly addictive.",
    category: "Garden",
    kcal: 330,
    protein: 13,
    priceCents: 900,
    tags: ["Vegan", "High Fibre"],
    image:
      "https://images.pexels.com/photos/2741448/pexels-photo-2741448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 7,
  },
  {
    name: "Quinoa Power Bowl",
    description:
    "Fluffy quinoa, roasted vegetables and grilled chicken — the balanced workhorse of the weekly lineup.",
    category: "Bowls & Grains",
    kcal: 480,
    protein: 29,
    priceCents: 1050,
    tags: ["GF", "Meal-Prep Hero"],
    image:
      "https://images.pexels.com/photos/25315523/pexels-photo-25315523.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 8,
  },
  {
    name: "Sesame Noodle Bowl",
    description:
      "Soba-style noodles, crisp vegetables and a nutty sesame sauce. Comfort that travels well.",
    category: "Bowls & Grains",
    kcal: 450,
    protein: 16,
    priceCents: 950,
    tags: ["Vegan Option", "Dairy-Free"],
    image:
      "https://images.pexels.com/photos/8481837/pexels-photo-8481837.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 9,
  },
  {
    name: "Wild Mushroom Pappardelle",
    description:
      "Ribbons of pasta, wild mushrooms and sweet tomato in a light garlic cream. Dinner, handled.",
    category: "Bowls & Grains",
    kcal: 520,
    protein: 18,
    priceCents: 1000,
    tags: ["Vegetarian", "Family Fave"],
    image:
      "https://images.pexels.com/photos/12001950/pexels-photo-12001950.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    sort: 10,
  },
];

const FAQS = [
  {
    question: "Where do you deliver, and when?",
    answer:
      "We deliver across the metro area Sunday and Wednesday evenings, 5–9pm. Orders placed by Friday midnight make the Sunday run; everything arrives chilled in insulated, returnable packaging.",
    sort: 1,
  },
  {
    question: "How much does a weekly box cost?",
    answer:
      "Meals start at $8.50 and average around $10. The more meals you add, the lower the per-meal price drops — boxes of 12+ land near $9 a meal. Delivery is always included, never a surprise fee.",
    sort: 2,
  },
  {
    question: "Can you work around allergies and dietary goals?",
    answer:
      "Yes. Every meal is tagged with macros and allergens, and your profile can lock out ingredients entirely — gluten, dairy, nuts, shellfish. Macros-forward plans for training, and gentle options for family tables.",
    sort: 3,
  },
  {
    question: "How long do the meals stay fresh?",
    answer:
      "Meals are cooked the same day they're delivered and stay fresh in your fridge for up to 5 days. Nothing is frozen, nothing is preserved — that's the whole point of Amber & Herb.",
    sort: 4,
  },
  {
    question: "Can I skip a week or pause anytime?",
    answer:
      "Anytime, no fees, no phone calls. Skip, pause or cancel from your account in two taps before the weekly cutoff and you'll never be charged for a box you didn't order.",
    sort: 5,
  },
  {
    question: "You've been around since 2015 — what's the story?",
    answer:
      "We started as a two-burner kitchen making honest meals for gym friends and neighbours. A decade later we're 40+ cooks strong, but the rule hasn't changed: real ingredients, fair prices, zero shortcuts.",
    sort: 6,
  },
];

export const DEFAULT_MEALS = MEALS.map((m, idx) => ({ ...m, id: idx + 1 }));
export const DEFAULT_FAQS = FAQS.map((f, idx) => ({ ...f, id: idx + 1 }));

let seeding: Promise<void> | null = null;

export function ensureSeeded(): Promise<void> {
  if (!db) return Promise.resolve();
  if (!seeding) seeding = run();
  return seeding;
}

async function run() {
  if (!db) return;
  try {
    const existing = await db.select({ id: meals.id }).from(meals).limit(1);
    if (existing.length > 0) return;
    await db.insert(meals).values(MEALS);
    await db.insert(faqs).values(FAQS);
  } catch (err) {
    seeding = null;
    console.warn("Database seeding failed, falling back to default data:", err);
  }
}

export async function getMealsAndFaqs() {
  if (!db) {
    return { meals: DEFAULT_MEALS, faqs: DEFAULT_FAQS };
  }
  try {
    await ensureSeeded();
    const mealRows = await db.select().from(meals).orderBy(meals.sort);
    const faqRows = await db.select().from(faqs).orderBy(faqs.sort);
    return { meals: mealRows.length > 0 ? mealRows : DEFAULT_MEALS, faqs: faqRows.length > 0 ? faqRows : DEFAULT_FAQS };
  } catch (err) {
    console.warn("Database query failed, using fallback data:", err);
    return { meals: DEFAULT_MEALS, faqs: DEFAULT_FAQS };
  }
}

