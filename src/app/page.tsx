import { getMealsAndFaqs } from "@/lib/seed";
import { BoxProvider, Marquee } from "@/components/box";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import {
  Fresh,
  Source,
  Goals,
  Trusted,
  Lifestyle,
  Ingredients,
  Family,
  Partners,
} from "@/components/Sections";
import { MenuSection } from "@/components/MenuSection";
import { Faqs, Contact, Footer } from "@/components/FaqContact";

const TICKER = [
  "Eat Local",
  "Eat Healthy",
  "Amber & Herb",
  "Est. 2015",
  "Zero Preservatives",
  "Farm to Door in 48h",
  "Affordable for All",
];

export default async function Home() {
  const { meals: mealRows, faqs: faqRows } = await getMealsAndFaqs();


  return (
    <BoxProvider>
      <Nav />
      <main>
        <Hero />
        <div className="border-y border-line bg-panel/40 py-5">
          <Marquee items={TICKER} />
        </div>
        <Fresh />
        <Source />
        <Goals />
        <Trusted />
        <Lifestyle />
        <Ingredients />
        <Family />
        <MenuSection meals={mealRows} />
        <Partners />
        <Faqs faqs={faqRows} />
        <Contact />
      </main>
      <Footer />
    </BoxProvider>
  );
}
