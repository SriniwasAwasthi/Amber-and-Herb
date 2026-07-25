# 🌿 Amber & Herb — Eat Local, Eat Healthy 🥗✨

![Amber & Herb Banner](./.github/assets/banner.png)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.38-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/SriniwasAwasthi/Amber-and-Herb?style=for-the-badge&color=gold)](https://github.com/SriniwasAwasthi/Amber-and-Herb)

**An Online Food Court & Doorstep Delivery Platform delivering 100% organic, zero-preservative meals straight from local farms to your home in 48 hours! 🛵💨**

[🌐 View Live Screenshots](#-real-website-live-screenshots) • [🧩 Architecture & Components](#-application-architecture--component-structure-) • [🚀 Installation Guide](#-how-to-install--run-locally) • [💖 Thank You](#-a-heartfelt-thank-you-to-every-visitor-)

</div>

---

## 📸 Real Website Live Screenshots 🖥️✨

### 🏠 1. Live Hero Section
![Real Website Hero Section](./.github/assets/real-hero-section.png)

### 🥗 2. Live Interactive Menu ("This Week's Table")
![Real Website Menu Section](./.github/assets/real-menu-section.png)

### 📬 3. Live Contact & Order Inquiries Form
![Real Website Contact Section](./.github/assets/real-contact-section.png)

---

## 📌 What is Amber & Herb? 🍕🥗

**Amber & Herb** is a modern, full-stack online food court and delivery platform. It bridges the gap between **local organic farmers** and **healthy food lovers**. 

Unlike conventional fast-food delivery apps, Amber & Herb focuses on **100% natural, farm-fresh ingredients with zero artificial preservatives**. Users can easily browse through categorized food menus, explore healthy meal bowls, learn about organic farming origins, and get wholesome meals delivered to their doorstep in under **48 hours**! 🚚📦

![Online Delivery Platform Concept](./.github/assets/delivery-platform.png)

---

## 💡 Why This Website is Used (Purpose & Core Mission) 🎯

1. 🚫🧪 **Eliminating Preservatives:** Providing pure, chemical-free food to protect health and immunity.
2. 👩‍🌾 **Supporting Local Farmers:** Sourcing raw ingredients directly from registered regional farms to promote local agriculture.
3. ⏱️ **Fast 48-Hour Delivery:** Guaranteeing peak freshness from harvest to kitchen to table.
4. 🥗 **Transparent Nutrition:** Every menu item lists clean ingredients, calorie breakdowns, and dietary tags (Vegan, High Protein, Gluten-Free).

---

## 👥 Why Amber & Herb is Helpful for Everyone 🎓💼

![Student & Learner Focus](./.github/assets/student-food.png)

### 🎒 1. For Students & Young Learners
- 🧠 **Brain-Boosting Meals:** Helps students choose nutritious study snacks (fresh smoothies, fruit bowls, protein salads) to stay alert during exams.
- 💰 **Budget Friendly:** Offers combo options and accessible meal pricing tailored for student budgets.
- 💻 **Open-Source Learning:** Serves as a real-world code tutorial for learning Next.js 15, TypeScript, Tailwind CSS, and SQLite database management.

### 💼 2. For Developers, Recruiters & Tech Interviewers
- ⚡ **Modern Stack:** Demonstrates clean architecture using Next.js App Router, Server Components, dynamic seeding, and Drizzle ORM.
- 🎨 **Visual Excellence:** High-end UI aesthetics featuring glassmorphism, responsive marquee banners, and atomic component architecture.

![Tech Review Showcase](./.github/assets/tech-review.png)

### 👵 3. For Families & Senior Citizens
- 🥬 **Easy Digestion:** Low-salt, soft, preservative-free ingredients suitable for older adults and children.
- 🔍 **Accessible UI:** High-contrast typography and intuitive navigation.

---

## ⚙️ Why This Method & Architecture is Used 🏛️

Amber & Herb is engineered for **speed, scalability, and maintainability**:

- 🚀 **Next.js 15 (App Router & Server Components):** Renders pages on the server for lightning-fast initial load times and superior SEO rankings.
- 📘 **TypeScript:** Enforces strict type safety across database schemas, API responses, and UI props to prevent runtime errors.
- 🗄️ **Drizzle ORM & SQLite / Better-SQLite3:** Lightweight, zero-overhead database interaction for seeding and fetching meals and FAQs instantly.
- 🎨 **Tailwind CSS & Utility-First Styling:** Ensures rapid UI customization with a uniform color palette and responsive layout breakpoints.

---

## 🧩 Application Architecture & Component Structure 📦

![Healthy Menu Artwork](./.github/assets/healthy-menu.png)

The Amber & Herb platform is structured into modular, reusable Next.js 15 React components:

```text
src/
├── app/                  # Next.js 15 App Router pages & API endpoints
│   ├── api/              # Backend API routes (health check, order inquiries)
│   ├── globals.css       # Custom design system, CSS variables & animations
│   ├── layout.tsx        # Global HTML layout & metadata configuration
│   └── page.tsx          # Main home page aggregating all modular sections
│
├── components/           # Reusable UI React components
│   ├── Nav.tsx           # Sticky brand navigation bar & CTA order triggers
│   ├── Hero.tsx          # Dynamic hero banner showcasing featured meal prep bowl
│   ├── MenuSection.tsx   # Interactive food catalog with category filters & pricing
│   ├── Sections.tsx      # Core showcase modules (Farm Sourcing, Lifestyle, Goals, Partners)
│   ├── FaqContact.tsx    # Dynamic FAQ accordion & order inquiry contact form
│   └── box.tsx           # Animated continuous slogan ticker & layout wrappers
│
├── db/                   # Database configuration & ORM schemas
│   ├── index.ts          # SQLite database connection setup
│   └── schema.ts         # Drizzle ORM schema for meals, categories, & FAQs
│
└── lib/                  # Helper utilities & data seeders
    └── seed.ts           # Auto-seeding database engine for initial meal catalog
```

### 🌟 Key Feature Modules
- 🧭 **Navigation & Hero Hub (`Nav.tsx`, `Hero.tsx`):** Instant brand introduction with animated category badges and CTA order triggers.
- 📜 **Continuous Marquee Ticker (`box.tsx`):** Infinite scrolling banner broadcasting live platform values (*"Eat Local"*, *"Zero Preservatives"*).
- 🥗 **Interactive Food Catalog (`MenuSection.tsx`):** Live database-driven meal filtering by dietary tags (High Protein, Vegan, Gluten-Free).
- 🥦 **Farm Sourcing & Lifestyle (`Sections.tsx`):** Informative visual cards explaining organic farm connections, soil standards, and customer trust metrics.
- ❓ **Support & Inquiries (`FaqContact.tsx`):** Collapsible FAQs paired with a functional contact form that submits inquiries directly to the API routes.

---

## 🚀 How to Install & Run Locally 🛠️

Follow these quick steps to get Amber & Herb running on your machine:

### 📋 Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **pnpm** / **yarn**
- **Git**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SriniwasAwasthi/Amber-and-Herb.git
cd Amber-and-Herb
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up & Seed Database
Initialize and seed the SQLite database with fresh meals and FAQs:
```bash
npm run db:push
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

### 5️⃣ Open in Browser
Open your browser and navigate to:
```text
http://localhost:3000
```

---

## 🛠️ Tech Stack at a Glance ⚡

```text
├── Framework    : Next.js 15 (App Router)
├── Language     : TypeScript
├── Styling      : Tailwind CSS + PostCSS
├── Database     : SQLite / Better-SQLite3
├── ORM          : Drizzle ORM
├── Components   : React Server Components (RSC) + Lucide Icons
```

---

## 💖 A Heartfelt Thank You to Every Visitor! 🌿✨

Thank you so much for taking your valuable time to explore **Amber & Herb**! 🌟

Whether you are a fellow developer, a recruiter, a curious learner, or a passionate food lover, your presence here means the absolute world to me. 🍕💚 Building projects that blend modern software engineering with real-world healthy living is my passion, and sharing this journey with awesome human beings like you makes it truly rewarding. 🚀💫

🌱 **My Wish for You:**  
I hope exploring this project brought fresh ideas, inspiration, or a big smile to your day! May your journey be filled with endless growth, bright energy, good health, and incredible achievements. ☀️🌈

⭐ **Let's Connect & Build Together!**  
If you enjoyed exploring Amber & Herb, feel free to **leave a star ⭐️** on this repository or reach out to connect! 

*Wishing you positivity, success, and delicious healthy food always! Have an extraordinary day ahead!* 🌺✨

---

<div align="center">

Made with ❤️ by [Sriniwas Awasthi](https://github.com/SriniwasAwasthi) • **Amber & Herb © 2026**

</div>
