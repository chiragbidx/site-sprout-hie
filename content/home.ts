// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ─── Sponsors ───────────────────────────────────────────────────────────────
export type SponsorItem = { icon: string; name: string };
export type SponsorsContent = {
  heading: string;
  items: SponsorItem[];
};

// ─── Benefits ───────────────────────────────────────────────────────────────
export type BenefitItem = { icon: string; title: string; description: string };
export type BenefitsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: BenefitItem[];
};

// ─── Feature Grid ───────────────────────────────────────────────────────────
export type FeatureItem = { icon: string; title: string; description: string };
export type FeaturesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: FeatureItem[];
};

// ─── Services ───────────────────────────────────────────────────────────────
export type ServiceItem = { title: string; description: string; pro: boolean };
export type ServicesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: ServiceItem[];
};

// ─── Testimonials ───────────────────────────────────────────────────────────
export type TestimonialItem = {
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
};
export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  reviews: TestimonialItem[];
};

// ─── Team ───────────────────────────────────────────────────────────────────
export type SocialLink = { name: string; url: string };
export type TeamMember = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialLink[];
};
export type TeamContent = {
  eyebrow: string;
  heading: string;
  members: TeamMember[];
};

// ─── Pricing ────────────────────────────────────────────────────────────────
export type PricingPlan = {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefits: string[];
};
export type PricingContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  priceSuffix: string;
  plans: PricingPlan[];
};

// ─── Contact ────────────────────────────────────────────────────────────────
export type ContactInfoBlock = { label: string; value: string | string[] };
export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  mailtoAddress: string;
  info: {
    address: ContactInfoBlock;
    phone: ContactInfoBlock;
    email: ContactInfoBlock;
    hours: ContactInfoBlock;
  };
  formSubjects: string[];
  formSubmitLabel: string;
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
export type FaqItem = { question: string; answer: string };
export type FaqContent = {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
};

// ─── Footer ─────────────────────────────────────────────────────────────────
export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };
export type FooterContent = {
  brandName: string;
  columns: FooterColumn[];
  copyright: string;
  attribution: { label: string; href: string };
};

// ─── Navbar ─────────────────────────────────────────────────────────────────
export type NavRoute = { href: string; label: string };
export type NavFeature = { title: string; description: string };
export type NavbarContent = {
  brandName: string;
  routes: NavRoute[];
  featureDropdownLabel: string;
  featureImage: { src: string; alt: string };
  features: NavFeature[];
  signInLabel: string;
  signUpLabel: string;
  dashboardLabel: string;
  githubLink: { href: string; ariaLabel: string };
};

// ─── Root ───────────────────────────────────────────────────────────────────
export type HomeContent = {
  hero: HeroContent;
  sponsors: SponsorsContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  pricing: PricingContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  navbar: NavbarContent;
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "Powerful CRM",
    badgeOuter: "ClientPilot is live",
    titleBefore: "Take control of your",
    titleHighlight: "internal CRM",
    titleAfter: "with ClientPilot",
    subtitle:
      "ClientPilot helps your team organize customer data, notes, and activity with an easy-to-use dashboard. Empower everyone — not just sales.",
    primaryCta: { label: "Launch Dashboard", href: "/dashboard/crm" },
    secondaryCta: { label: "CRM Features", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "ClientPilot CRM dashboard preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Built with trusted tools",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Squirrel", name: "Clerk" },
      { icon: "Cookie", name: "Resend" },
      { icon: "Drama", name: "Sentry" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why ClientPilot",
    heading: "The intuitive CRM teams love to use",
    description:
      "Get organized without the clutter or complexity. Simple, secure, and customizable for your internal teams.",
    items: [
      {
        icon: "Blocks",
        title: "Real Customer Visibility",
        description: "Keep everyone up to date with one source of truth for clients, companies, and notes.",
      },
      {
        icon: "LineChart",
        title: "Actionable Insights",
        description: "See your customer pipeline, track activity, and plan follow-ups with less manual work.",
      },
      {
        icon: "Wallet",
        title: "Affordable For All",
        description: "No per-seat pricing. ClientPilot keeps your costs low and value high — forever.",
      },
      {
        icon: "Sparkle",
        title: "Instant Collaboration",
        description: "Share updates and work together seamlessly, in a dashboard anyone can use from day one.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Features",
    heading: "A focused CRM, minus the bloat",
    subtitle:
      "Lightweight but powerful — everything your team needs to organize and own your customer relationships.",
    items: [
      { icon: "TabletSmartphone", title: "Responsive Design", description: "ClientPilot works beautifully on desktop and mobile—no extra setup." },
      { icon: "BadgeCheck", title: "Team-Based Permissions", description: "Admins and owners control data. Members get access with just the right privileges." },
      { icon: "Goal", title: "Customer Profile & Notes", description: "Store names, email, phone, company, and rich notes for each client." },
      { icon: "BarChart", title: "Pipeline Visibility", description: "Keep tabs on your leads and customer activity in a glance-ready dashboard." },
      { icon: "ShieldCheck", title: "Secure by Default", description: "Modern architecture, full session encryption, and no external sales scripts." },
      { icon: "Rocket", title: "Fast Setup", description: "Get started in minutes—no long onboarding forms, demos, or credit cards required." },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Services",
    heading: "ClientPilot core capabilities",
    subtitle:
      "Rapid onboarding, always optimized for speed and simplicity.",
    items: [
      { title: "Customer Database", description: "Flexible notes, company fields, and custom tags—no headaches.", pro: false },
      { title: "Instant Search", description: "Find customer info and history in seconds.", pro: false },
      { title: "Role-Based Access", description: "Owner/admin/member structure for safer data and easier teamwork.", pro: false },
      { title: "Production-Grade Security", description: "Full HTTPS, modern session cookies, and encrypted data at rest.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "Testimonials",
    heading: "How teams use ClientPilot",
    reviews: [
      { image: "/demo-img.jpg", name: "Priya S.", role: "Customer Ops Lead", comment: "We replaced our bloated CRM in a day and nobody misses the old one.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Liam P.", role: "Technical Operations", comment: "We finally have a client dashboard the whole team actually enjoys using.", rating: 4.9 },
      { image: "/demo-img.jpg", name: "Stephen J.", role: "Co-founder, Growly", comment: "Super clean and simple. ClientPilot is exactly the internal CRM we needed.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Nina Patel", role: "Ops Associate", comment: "The permissions and roles just make sense. No more accidental edits!", rating: 4.8 },
      { image: "/demo-img.jpg", name: "Marlon Q.", role: "Account Manager", comment: "Way easier than other tools. Onboarding took just a few clicks.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Sofia G.", role: "Product Manager", comment: "Modern, responsive, and focused—an obvious win for internal teams.", rating: 4.9 },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "Team",
    heading: "Meet the ClientPilot team",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder & Engineer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://linkedin.com/in/chiragdodiya" },
          { name: "Github", url: "https://github.com/chiragdodiya" },
        ],
      },
      // You can add additional team members here
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Pricing",
    heading: "Simple pricing, forever",
    subtitle: "Pay only for what your team needs. Unlimited customers. No hidden fees.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Free",
        popular: false,
        price: 0,
        description: "Start small, stay simple. For testing or tiny teams.",
        buttonText: "Try for free",
        benefits: ["Unlimited customers", "Basic team permissions", "Full CRM feature access", "No setup required", "Community support"],
      },
      {
        title: "Business",
        popular: true,
        price: 29,
        description: "For teams that need fast, flexible internal CRM.",
        buttonText: "Get Started",
        benefits: ["Unlimited teammates", "Advanced permissions", "Priority support", "Segments & custom fields", "CSV export"],
      },
      {
        title: "Enterprise",
        popular: false,
        price: 99,
        description: "SAML SSO, dedicated onboarding, and more for large orgs.",
        buttonText: "Contact sales",
        benefits: ["SAML SSO", "Custom onboarding", "Security review", "Personal support", "Advanced workflow consulting"],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Contact ClientPilot",
    description:
      "Questions? Want a walk-through, demo, or help getting started? Our founder responds to every inquiry personally.",
    mailtoAddress: "hi@chirag.co",
    info: {
      address: { label: "Remote HQ", value: "Distributed — London & Mumbai" },
      phone: { label: "Contact", value: "" },
      email: { label: "Email", value: "hi@chirag.co" },
      hours: { label: "Hours", value: ["Monday - Friday", "10AM - 6PM IST"] },
    },
    formSubjects: ["CRM Demo", "Team Setup", "Integration Question", "Feature Request", "Sales/Enterprise"],
    formSubmitLabel: "Send message",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "Common Questions",
    items: [
      { question: "Is ClientPilot free to try?", answer: "Yes. You can use all CRM features and team permissions on the free plan." },
      { question: "Can I restrict access or roles for my team?", answer: "Yes. Add as many teammates as needed and assign admin/owner/member roles with just a few clicks." },
      { question: "Do you offer onboarding or migration help?", answer: "Of course! Just reach out using the contact form and we'll personally help your team migrate or roll out ClientPilot." },
      { question: "Can I export my customer data?", answer: "Yes, CSV export and advanced integrations are available for Business/Enterprise plans." },
      { question: "Where is ClientPilot hosted?", answer: "Our core is built on Vercel and Railway, and all customer data is encrypted at rest in the cloud." },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "ClientPilot",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "hi@chirag.co", href: "mailto:hi@chirag.co" },
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://linkedin.com/in/chiragdodiya" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "CRM Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
          { label: "Docs", href: "https://nextjs.org/docs" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://linkedin.com/in/chiragdodiya" },
        ],
      },
    ],
    copyright: "\u00a9 2026 ClientPilot CRM.",
    attribution: { label: "Built on Next.js", href: "https://nextjs.org" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "ClientPilot",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "CRM Features",
    featureImage: { src: "/demo-img.jpg", alt: "ClientPilot preview" },
    features: [
      { title: "Role-based Permissions", description: "Manage data safely—no accidental changes or leaks." },
      { title: "No-Nonsense CRM", description: "Everything you need for tracking, nothing extra to slow you down." },
      { title: "Ready in Minutes", description: "No slow onboarding or demos required to get started." },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "Dashboard",
    githubLink: { href: "https://github.com/chiragdodiya", ariaLabel: "View on GitHub" },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}