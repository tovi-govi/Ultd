import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import brandLogo from "@/assets/logo.svg";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Download,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { arrivalHighlight, initGsap } from "@/lib/animations";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udvitha Technologies | IT Training and Placements in Hyderabad" },
      {
        name: "description",
        content:
          "Industry-oriented IT training in Hyderabad for IAM, Cyber Security, Cloud, DevOps, Full Stack, AI, Data Engineering, and enterprise platforms.",
      },
      {
        property: "og:title",
        content: "Udvitha Technologies | Education Meets Employment",
      },
      {
        property: "og:description",
        content:
          "500+ students trained, 200+ placements, real-time projects, expert trainers, and placement support for modern IT careers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Landing,
});

const navItems = [
  { label: "Programs", href: "#programs" },
  { label: "Method", href: "#method" },
  { label: "Placements", href: "#placements" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

const companies = [
  "Capgemini",
  "Cognizant",
  "TCS",
  "PwC",
  "KPMG",
  "Deloitte",
  "Wipro",
  "Accenture",
];

const kineticSkills = [
  "IAM labs",
  "SOC drills",
  "Cloud deploys",
  "Mock rounds",
  "SailPoint",
  "Okta",
  "Kubernetes",
  "React builds",
  "AI projects",
  "Interview prep",
];

const stats = [
  { value: "500+", label: "students trained", detail: "across career-ready IT tracks" },
  { value: "200+", label: "placements", detail: "with MNC and consulting partners" },
  { value: "50+", label: "hiring partners", detail: "supporting fresher and lateral roles" },
  { value: "95%", label: "career support", detail: "resume, mock interview, and referral prep" },
];

const courses = [
  {
    icon: ShieldCheck,
    name: "IAM: Okta / SailPoint",
    desc: "Identity lifecycle, access governance, SSO, MFA, provisioning, and enterprise IAM labs.",
    skills: ["Okta", "SailPoint", "SSO", "IGA"],
    tag: "Most demanded",
  },
  {
    icon: ShieldCheck,
    name: "Cyber Security",
    desc: "SOC workflows, threat analysis, ethical hacking foundations, and blue-team practice.",
    skills: ["SOC", "SIEM", "VAPT", "IR"],
  },
  {
    icon: Cloud,
    name: "Cloud and DevOps",
    desc: "AWS, Azure, Docker, Kubernetes, Terraform, CI/CD, monitoring, and deployment pipelines.",
    skills: ["AWS", "K8s", "Docker", "CI/CD"],
    tag: "Fast track",
  },
  {
    icon: Code2,
    name: "Full Stack Development",
    desc: "React, Node.js, APIs, databases, Git, testing, and cloud deployment through real builds.",
    skills: ["React", "Node", "SQL", "APIs"],
  },
  {
    icon: Database,
    name: "Data Engineering",
    desc: "Spark, Snowflake, Airflow, ETL design, and modern data platform fundamentals.",
    skills: ["Spark", "ETL", "SQL", "Airflow"],
  },
  {
    icon: Sparkles,
    name: "AI and Data Science",
    desc: "Python, ML, deep learning, model evaluation, and generative AI project workflows.",
    skills: ["Python", "ML", "Gen AI", "MLOps"],
  },
  {
    icon: BadgeCheck,
    name: "Software Testing",
    desc: "Manual testing, Selenium, API testing, performance testing, and QA documentation.",
    skills: ["Selenium", "API", "Jira", "QA"],
  },
  {
    icon: Briefcase,
    name: "Enterprise Platforms",
    desc: "ServiceNow, Salesforce, and SAP career tracks with certification and interview prep.",
    skills: ["ServiceNow", "SAP", "CRM", "ITSM"],
  },
];

const programOrbit: TimelineItem[] = [
  {
    id: 1,
    title: "IAM",
    date: "Okta / SailPoint",
    content:
      "Identity lifecycle, access governance, SSO, MFA, provisioning, and enterprise IAM labs for support and implementation roles.",
    category: "Okta, SailPoint, SSO, IGA",
    icon: ShieldCheck,
    relatedIds: [2, 3, 8],
    status: "completed",
    statusLabel: "Most demanded",
    energy: 96,
  },
  {
    id: 2,
    title: "Cyber Security",
    date: "SOC / VAPT",
    content:
      "SOC workflows, threat analysis, ethical hacking foundations, blue-team practice, and incident response thinking.",
    category: "SOC, SIEM, VAPT, IR",
    icon: ShieldCheck,
    relatedIds: [1, 3, 7],
    status: "in-progress",
    statusLabel: "Security track",
    energy: 90,
  },
  {
    id: 3,
    title: "Cloud DevOps",
    date: "AWS / K8s",
    content:
      "AWS, Azure, Docker, Kubernetes, Terraform, CI/CD, monitoring, and deployment pipelines through practical labs.",
    category: "AWS, K8s, Docker, CI/CD",
    icon: Cloud,
    relatedIds: [1, 2, 4],
    status: "completed",
    statusLabel: "Fast track",
    energy: 92,
  },
  {
    id: 4,
    title: "Full Stack",
    date: "React / Node",
    content:
      "React, Node.js, APIs, databases, Git, testing, and cloud deployment through real product-style builds.",
    category: "React, Node, SQL, APIs",
    icon: Code2,
    relatedIds: [3, 5, 6],
    status: "in-progress",
    statusLabel: "Build track",
    energy: 85,
  },
  {
    id: 5,
    title: "Data Engineering",
    date: "Spark / ETL",
    content:
      "Spark, Snowflake, Airflow, ETL design, SQL depth, and modern data platform fundamentals for analytics teams.",
    category: "Spark, ETL, SQL, Airflow",
    icon: Database,
    relatedIds: [4, 6],
    status: "pending",
    statusLabel: "Data track",
    energy: 78,
  },
  {
    id: 6,
    title: "AI & Data Science",
    date: "Python / ML",
    content:
      "Python, machine learning, model evaluation, deep learning basics, and generative AI project workflows.",
    category: "Python, ML, Gen AI, MLOps",
    icon: Sparkles,
    relatedIds: [4, 5],
    status: "in-progress",
    statusLabel: "AI track",
    energy: 88,
  },
  {
    id: 7,
    title: "Testing",
    date: "QA / Selenium",
    content:
      "Manual testing, Selenium automation, API testing, performance basics, Jira workflows, and QA documentation.",
    category: "Selenium, API, Jira, QA",
    icon: BadgeCheck,
    relatedIds: [2, 4],
    status: "pending",
    statusLabel: "QA track",
    energy: 76,
  },
  {
    id: 8,
    title: "Enterprise",
    date: "SAP / CRM",
    content:
      "ServiceNow, Salesforce, and SAP career tracks with certification direction, process context, and interview prep.",
    category: "ServiceNow, SAP, CRM, ITSM",
    icon: Briefcase,
    relatedIds: [1, 3],
    status: "pending",
    statusLabel: "Enterprise",
    energy: 82,
  },
];

const method = [
  {
    step: "01",
    title: "Map the role",
    text: "A counsellor helps pick a track based on your degree, experience, timeline, and target salary.",
    icon: BookOpenCheck,
  },
  {
    step: "02",
    title: "Train on real tools",
    text: "You learn through labs, project scenarios, weekly reviews, and mentor feedback from working professionals.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Package your profile",
    text: "Resume, LinkedIn, GitHub, mock interviews, HR rounds, and recruiter communication are tightened together.",
    icon: Award,
  },
  {
    step: "04",
    title: "Interview to offer",
    text: "The placement team shares openings, tracks progress, and keeps you practicing until you convert.",
    icon: TrendingUp,
  },
];

const outcomes = [
  {
    title: "IAM fresher to Capgemini engineer",
    company: "Capgemini",
    stack: "Okta, SailPoint, Java basics",
    timeline: "12 weeks",
    result: "Placed in an IAM support role",
  },
  {
    title: "Manual tester to automation QA",
    company: "Cognizant",
    stack: "Selenium, API testing, Jira",
    timeline: "10 weeks",
    result: "Moved into QA automation interviews",
  },
  {
    title: "Graduate to cloud support associate",
    company: "TCS",
    stack: "AWS, Linux, Docker, CI/CD",
    timeline: "14 weeks",
    result: "Converted first MNC offer",
  },
];

const learnerRoutes = [
  {
    label: "Freshers",
    title: "First job launch plan",
    body: "Structured fundamentals, daily lab routines, resume projects, communication practice, and placement drives for students starting from zero.",
    bullets: ["Foundation-friendly batches", "Portfolio projects", "HR and aptitude prep"],
  },
  {
    label: "Professionals",
    title: "Switch or upgrade your role",
    body: "Focused tracks for working professionals moving into IAM, DevOps, testing automation, cloud, data, or security roles without wasting months.",
    bullets: ["Weekend options", "Scenario-led labs", "Interview repositioning"],
  },
  {
    label: "Colleges",
    title: "Campus placement accelerator",
    body: "Partner programs for colleges that want industry-grade bootcamps, trainer-led labs, and employability outcomes for final-year students.",
    bullets: ["Custom curriculum", "Batch analytics", "Corporate-style reviews"],
  },
];

const testimonials = [
  {
    name: "Priya R.",
    role: "IAM Engineer at Capgemini",
    quote:
      "The SailPoint labs made interviews feel familiar. I could explain access reviews, provisioning, and real tickets with confidence.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=420&auto=format&fit=crop&q=75",
    alt: "Portrait of a confident student",
  },
  {
    name: "Arjun K.",
    role: "DevOps Engineer at Cognizant",
    quote:
      "The trainers were working professionals, so every session connected tools to what actually happens in a project team.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=420&auto=format&fit=crop&q=75",
    alt: "Portrait of a technology learner",
  },
  {
    name: "Sneha M.",
    role: "Cyber Analyst at PwC",
    quote:
      "Mock interviews changed everything. I stopped memorizing answers and started explaining how I would investigate issues.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=420&auto=format&fit=crop&q=75",
    alt: "Portrait of a cyber security student",
  },
];

function setupHeroAnimations(hero: HTMLElement | null) {
  gsap.from("[data-hero-item]", {
    y: 34,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
  });

  const heroImage = hero?.querySelector("[data-hero-image]");
  if (!heroImage) return;

  gsap.to(heroImage, {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      scrub: 0.6,
      start: "top top",
      end: "bottom top",
    },
  });
}

function setupSectionReveals() {
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
        },
      },
    );
  });
}

function setupProgramShutter(shutter: HTMLElement | null) {
  const shutterPanel = shutter?.querySelector("[data-shutter-panel]");
  const shutterContent = shutter?.querySelector("[data-shutter-content]");
  if (!shutter || !shutterPanel) return;

  gsap.set(shutterPanel, { yPercent: 0 });
  gsap.fromTo(
    shutterContent,
    { y: 24, opacity: 0.55 },
    {
      y: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: shutter,
        start: "top 82%",
        end: "bottom 42%",
        scrub: true,
      },
    },
  );
  gsap.to(shutterPanel, {
    yPercent: -104,
    ease: "none",
    scrollTrigger: {
      trigger: shutter,
      start: "top 72%",
      end: "bottom 38%",
      scrub: true,
    },
  });
}

function Landing() {
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const shutterRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    initGsap();
    const ctx = gsap.context(() => {
      setupHeroAnimations(heroRef.current);
      setupSectionReveals();
      setupProgramShutter(shutterRef.current);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onAnchorClick = (ev: Event) => {
      const target = ev.target as Element | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;

      ev.preventDefault();
      setMobileOpen(false);
      const top = section.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });

      if (!prefersReducedMotion) {
        window.setTimeout(() => arrivalHighlight(section), 250);
      }
    };

    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, [prefersReducedMotion]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sent");
    event.currentTarget.reset();
    window.setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-md border border-white/10 bg-black/78 px-4 py-3 shadow-nav backdrop-blur-xl">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={brandLogo}
              alt="Udvitha Technologies"
              className="h-10 w-10 rounded-md object-cover"
            />
            <span className="hidden font-display text-sm font-extrabold uppercase tracking-wide text-white sm:block">
              Udvitha Technologies
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-white/72 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-md bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground transition hover:bg-secondary sm:inline-flex"
            >
              Apply now
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/12 text-white md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mx-auto mt-2 grid max-w-7xl rounded-md border border-white/10 bg-black/92 p-2 shadow-nav backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-white/78"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section
        id="top"
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-black pt-28 text-white"
      >
        <img
          data-hero-image
          src={heroImg}
          alt="Students learning technology in a computer lab"
          className="absolute inset-0 h-full w-full object-cover opacity-58"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.92)_34%,rgba(3,3,3,0.58)_68%,rgba(3,3,3,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl content-between px-5 pb-8">
          <div className="max-w-6xl">
            <h1
              data-hero-item
              className="max-w-5xl font-display text-5xl font-extrabold leading-[0.96] tracking-normal text-white md:text-7xl lg:text-8xl"
            >
              Industry-ready IT training in Hyderabad
            </h1>

            <div data-hero-item className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-primary/30 bg-primary/12 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-primary">
                Education meets employment
              </span>
              <span className="rounded-md border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-bold text-white/76">
                Hyderabad / Online / Corporate
              </span>
            </div>

            <div data-hero-item className="mt-7 grid max-w-4xl gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <p className="text-lg leading-8 text-white/76 md:text-xl">
                Udvitha turns ambitious learners into job-ready professionals through real-time
                projects, expert trainers, and placement support across IAM, Cyber Security, Cloud,
                DevOps, Full Stack, AI, and Data Engineering.
              </p>
              <div className="border-l border-white/14 pl-5 text-sm leading-6 text-white/68">
                Built for freshers, working professionals, colleges, and corporate teams that need
                practical skills instead of passive course completion.
              </div>
            </div>

            <div data-hero-item className="mt-9 flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-glow transition hover:bg-secondary"
              >
                Book free counselling <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#programs"
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                className="inline-flex items-center gap-2 rounded-md border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/14"
              >
                Explore programs <ChevronRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          <div
            data-hero-item
            className="grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-black/58 p-5 backdrop-blur-md">
                <div className="font-display text-4xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-bold uppercase tracking-wide text-primary">
                  {stat.label}
                </div>
                <p className="mt-3 text-sm leading-5 text-white/58">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-5">
        <div className="partner-strip mx-auto max-w-7xl px-5">
          <p className="partner-strip-label">Students placed with</p>
          <div className="partner-marquee">
            <div className="marquee flex min-w-max gap-10">
              {[...companies, ...companies].map((company, index) => (
                <span
                  key={`${company}-${index}`}
                  className="font-display text-2xl font-extrabold text-foreground/44"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={shutterRef} className="surface-light shutter-reveal">
        <div data-shutter-content className="shutter-underlay">
          <p className="eyebrow">Programs</p>
          <h2>Eight tracks. One practical career system.</h2>
          <p>
            Each program is designed around the role you want, the tools recruiters ask for, and the
            proof you need in interviews.
          </p>
          <strong>All programs include projects, certification prep, and placement support.</strong>
        </div>
        <div data-shutter-panel className="shutter-panel" aria-hidden="true">
          <div className="shutter-panel-inner">
            <div>
              <span className="shutter-kicker">Udvitha Technologies</span>
              <h2>From classroom to offer.</h2>
              <p>Scroll once to open the program system.</p>
            </div>
            <div className="shutter-milestones">
              {["Counselling", "Labs", "Mock rounds", "Placement"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="surface-light section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.82fr_0.72fr] lg:items-end" data-reveal>
            <div>
              <p className="eyebrow">Programs</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
                Eight tracks orbit one employable skill system.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Pick a node to see the tools, role focus, and demand signal for each career track.
            </p>
          </div>

          <div data-reveal>
            <RadialOrbitalTimeline timelineData={programOrbit} metricLabel="Demand" />
          </div>

          <div className="skill-ribbon" aria-hidden="true">
            <div className="skill-ribbon-track">
              {[...kineticSkills, ...kineticSkills].map((skill, index) => (
                <span key={`${skill}-ribbon-${index}`}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="surface-light section-pad bg-muted">
        <div className="mx-auto max-w-7xl px-5">
          <div className="method-header" data-reveal>
            <div>
              <p className="eyebrow">Method</p>
              <h2>A placement-first path from counselling to offer.</h2>
            </div>
            <p>
              Udvitha behaves less like a course vendor and more like a career operating system:
              role clarity, skills, proof, and interview momentum all move together.
            </p>
          </div>

          <div className="method-grid" data-reveal>
            {method.map((item) => (
              <article key={item.step} className="method-card">
                <div className="method-card-top">
                  <span>{item.step}</span>
                  <div>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3" data-reveal>
            {learnerRoutes.map((route) => (
              <article
                key={route.label}
                className="rounded-md border border-border bg-background p-5 shadow-elegant"
              >
                <p className="text-xs font-extrabold uppercase tracking-wide text-primary">
                  {route.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight">
                  {route.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{route.body}</p>
                <ul className="mt-5 grid gap-2">
                  {route.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-sm font-bold text-foreground/82"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="placements" className="surface-light section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5">
          <div className="placement-header" data-reveal>
            <div className="placement-copy">
              <p className="eyebrow">Placements</p>
              <h2>Outcomes that read like case studies.</h2>
              <p>
                The goal is not just finishing a syllabus. It is building enough practical proof to
                speak clearly in real interviews.
              </p>
            </div>
            <div className="placement-support">
              {[
                { icon: Users, label: "1:1 mentoring" },
                { icon: Calendar, label: "Mock rounds" },
                { icon: Building2, label: "Partner openings" },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#contact"
                  className="placement-support-item"
                  aria-label={`${item.label} placement support`}
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <p>{item.label}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3" data-reveal>
            {outcomes.map((item) => (
              <article key={item.title} className="rounded-md border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                  <span className="rounded-md bg-primary px-2 py-1 text-xs font-extrabold text-primary-foreground">
                    {item.company}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {item.timeline}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight">
                  {item.title}
                </h3>
                <dl className="mt-8 grid gap-4 text-sm">
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                      Tech focus
                    </dt>
                    <dd className="mt-1 text-foreground">{item.stack}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                      Result
                    </dt>
                    <dd className="mt-1 text-primary">{item.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="surface-light review-proof bg-background">
        <div className="review-proof-shell">
          <div className="review-proof-header" data-reveal>
            <div>
              <p className="eyebrow">Stories</p>
              <h2>Confidence that shows up in interviews.</h2>
            </div>
            <p>
              Students remember the shift: clearer tool language, sharper project explanations, and
              the confidence to handle real interview rooms.
            </p>
          </div>

          <div className="mt-8" data-reveal>
            <ScrollReelTestimonials
              testimonials={testimonials.map((item) => ({
                quote: item.quote,
                author: `${item.name} / ${item.role}`,
                image: item.image,
                alt: item.alt,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-3xl font-extrabold md:text-4xl">
            Ready to build your employable skill stack?
          </p>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-extrabold text-white"
          >
            Talk to Udvitha <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <div className="surface-light contact-separator" aria-hidden="true" />

      <section id="contact" className="surface-light section-pad pb-10 bg-background md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Book a free counselling session.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Tell us your background and target role. The team will recommend the right track,
              batch, and interview plan.
            </p>

            <div className="mt-7 grid gap-3">
              <a href="tel:9100052143" className="contact-row">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 91000 52143 / +91 88857 21731</span>
              </a>
              <a href="mailto:info@udvitechnologies.com" className="contact-row">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@udvitechnologies.com</span>
              </a>
              <div className="contact-row">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <a
                href="https://www.instagram.com/udvithatechnologies?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <Instagram className="h-5 w-5 text-primary" />
                <span>@udvithatechnologies</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-border bg-card p-5 shadow-elegant md:p-8"
            data-reveal
          >
            <div className="grid gap-4">
              <div>
                <label className="form-label">Full name</label>
                <input required maxLength={80} className="form-field" placeholder="Your name" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    required
                    type="tel"
                    maxLength={15}
                    className="form-field"
                    placeholder="+91"
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    required
                    type="email"
                    maxLength={120}
                    className="form-field"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Interested program</label>
                <select required className="form-field">
                  <option value="">Select a track</option>
                  {courses.map((course) => (
                    <option key={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Career goal</label>
                <textarea
                  maxLength={500}
                  rows={4}
                  className="form-field resize-none"
                  placeholder="Tell us your current background and target role"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground transition hover:bg-secondary"
              >
                {formStatus === "sent" ? "We will call you shortly" : "Request free counselling"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href="#" className="secondary-action">
                  <Download className="h-4 w-4" /> Brochure
                </a>
                <a
                  href="https://wa.me/919100052143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-action"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="footer-handoff" aria-hidden="true" />

      <FooterTapedDesign logoSrc={brandLogo} />

      <motion.a
        href="https://wa.me/919100052143"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={prefersReducedMotion ? {} : { y: -2 }}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-md bg-[#25D366] text-white shadow-glow"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </main>
  );
}
