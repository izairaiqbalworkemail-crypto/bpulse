import type { Specialist } from "./types";

export const specialists: Specialist[] = [
  {
    id: "aneeb",
    name: "Aneeb Iqbal",
    role: "Founder · Principal Engineer",
    funTitle: "The closer. If your product needs a pulse, he finds it.",
    bio: "Six years shipping across hospitals, crypto, verification, and HR tools. Runs the whole operation.",
    years: "6+ years shipping",
    record: [
      {
        org: "Sully.ai",
        line: "Led the hospital AI build to HIPAA production, with role-based access, clinical dashboards, and EHR integration.",
        url: "https://sully.ai",
      },
      {
        org: "Noti.io",
        line: "Shipped the Web3 crypto-sniping platform, wired through a Telegram bot on live chains.",
      },
      {
        org: "myUsta",
        line: "Built the two-sided tradesperson marketplace for the Albanian market, live on iOS and Android.",
        url: "https://myusta.com",
      },
    ],
    photo: "/team/aneeb.jpg",
    photoStatus: "Photo",
    stack: ["TypeScript", "Next.js", "Node", "React", "React Native", "AWS"],
    focus: ["HIPAA production", "product architecture", "scoping", "rescue"],
    philosophy: "Ship the smallest thing that proves the biggest risk wrong.",
    funFacts: [
      "Reads spec docs for fun",
      "Killed 30+ weekend build tasks nobody asked for",
    ],
    hobbies: [
      "Deep-diving LLM agent architecture",
      "Killing weekend build tasks nobody asked for",
      "Reading indie-hacker teardowns",
    ],
    genzLine: "Founder-eng. I ship, so you don't have to babysit a build.",
    linkedin: "https://www.linkedin.com/in/aneebiqbal",
    reviews: [
      {
        quote:
          "Aneeb read every line of the spec before quoting - and it is exactly why we signed. He cared about production more than the invoice.",
        name: "Sully.ai",
        role: "co-founder",
        source: "client engagement",
      },
      {
        quote:
          "The first dev lead who told us what would fail before it did, then fixed it before launch.",
        name: "myUsta",
        role: "founder",
        source: "client engagement",
      },
    ],
  },
  {
    id: "zaira",
    name: "Zaira Iqbal",
    role: "Principal Engineer · Full Stack",
    funTitle: "The godmother. Ten years of full-stack scar tissue, zero tolerance for halfway.",
    bio: "Principal full-stack engineer with ten years across the front, the back, and everything in between.",
    years: "10+ years",
    record: [
      {
        org: "Sully.ai",
        line: "Owned full-stack architecture for the healthcare AI platform across its production builds.",
        url: "https://sully.ai",
      },
      {
        org: "DeepIDV",
        line: "Led architecture for the compliance-facing verification platform and its agentic workflows.",
        url: "https://deepidv.com",
      },
      {
        org: "Dubizzle",
        line: "Delivered platform work inside the UAE's largest classifieds ecosystem.",
      },
    ],
    photoStatus: "Photo pending",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "REST"],
    focus: ["full-stack architecture", "system design", "TypeScript"],
    philosophy: "Architecture is deciding what you refuse to build.",
    funFacts: [
      "Thinks in TypeScript types",
      "Debugged a prod outage from a wedding",
    ],
    reviews: [
      {
        quote:
          "Zaira turned a messy brief into an architecture we could actually build against.",
        name: "Sully.ai",
        role: "engineering lead",
      },
    ],
  },
  {
    id: "fizza",
    name: "Fizza Iqbal",
    role: "Principal Engineer",
    funTitle: "The one who holds the hard parts together.",
    bio: "Senior engineer holding the hardest parts of the stack together.",
    years: "8+ years",
    record: [
      {
        org: "SBA 504 Lead-Gen Site",
        line: "Deployed an Astro + Sanity + Vercel SBA 504 loan site with full technical SEO, lead capture, and ownership handover.",
      },
      {
        org: "Mythos Archive",
        line: "Architecture and discovery sprint: full technical plan, database modeling, AI strategy, and a phased roadmap.",
      },
      {
        org: "WearMeOut.ai",
        line: "Backend for an AI custom t-shirt platform: Firebase auth, AI image pipeline, payments, and moderation.",
      },
    ],
    photo: "/team/fizza.jpg",
    photoStatus: "Photo",
    stack: ["Next.js", "React", "Astro", "Node", "Firebase", "Python", "TypeScript"],
    focus: ["full-stack", "SEO lead-gen", "AI integrations", "architecture"],
    philosophy: "The hard 20% is where the money hides.",
    funFacts: [
      "Has never met a legacy codebase she could not read",
      "Keeps a folder called told-you-so",
    ],
    reviews: [
      {
        quote:
          "Fizza built and deployed our entire site and delivered clean, well-structured work. What set her apart came after the project ended: when we hit a deployment issue weeks later, she diagnosed the root cause quickly, fixed it on her side, and gave our team clear instructions to complete it. Would hire again.",
        name: "Shohel Ahmed",
        role: "Founder",
      },
      {
        quote:
          "What began as a mythology reference app has evolved into a polished, immersive experience because of her technical skill, attention to detail, and willingness to take ownership of the vision. She is not only an excellent developer but a true product partner.",
        name: "Robby Struthers",
        role: "Founder",
      },
    ],
  },
  {
    id: "mehak",
    name: "Mehak Seedat",
    role: "Solution Architect",
    funTitle: "Chaos translator. Messy requirements in, working system out.",
    bio: "Turns messy requirements into a system that actually holds up in production.",
    years: "7+ years",
    record: [
      {
        org: "DeepIDV",
        line: "Specced the agentic compliance workflows and modular verification flows.",
        url: "https://deepidv.com",
      },
      {
        org: "Cosell",
        line: "Owned architecture support on the mature Rails ecommerce ecosystem.",
      },
      {
        org: "Fullscript",
        line: "Designed healthcare product workflows for supplements, labs, and adherence.",
      },
    ],
    photoStatus: "Photo pending",
    stack: ["React", "Node.js", "AWS", "PostgreSQL", "System Design"],
    focus: ["solution architecture", "compliance workflows", "specs"],
    philosophy: "Messy requirements are just systems that have not been drawn yet.",
    funFacts: [
      "Turns meetings into diagrams",
      "Writes specs people actually read",
    ],
    reviews: [
      {
        quote:
          "Mehak turned requirements into a system. First call we were guessing, second call we had a plan.",
        name: "DeepIDV",
        role: "CTO",
      },
    ],
  },
  {
    id: "najiullah",
    name: "NajiUllah",
    role: "AI / ML Expert",
    funTitle: "The model whisperer. RAG today, whatever it takes tomorrow.",
    bio: "Builds the models and the RAG and eval layers the AI work stands on.",
    years: "5+ years",
    record: [
      {
        org: "Sully.ai",
        line: "Built the RAG and eval layers behind the hospital AI agents that run 5M+ clinical tasks.",
        url: "https://sully.ai",
      },
      {
        org: "DeepIDV",
        line: "Contributed to the agentic fraud and verification agents.",
        url: "https://deepidv.com",
      },
      {
        org: "Mythos Archive",
        line: "Shipped AI storytelling grounded in verified historical sources.",
      },
    ],
    photo: "/team/najiullah.png",
    photoStatus: "Photo",
    stack: ["Python", "RAG", "LLMs", "FastAPI", "Evals", "TensorFlow"],
    focus: ["RAG", "LLMs", "evals", "model ops"],
    philosophy: "A model is a decision you can measure, not magic you trust.",
    funFacts: [
      "Reads eval reports like novels",
      "Breaks LLMs for fun, then fixes them",
    ],
    reviews: [
      {
        quote:
          "Najiullah explained the model decisions in plain English, and the evals held up in production.",
        name: "Sully.ai",
        role: "co-founder",
      },
    ],
  },
  {
    id: "hassan",
    name: "Hassan Saulat",
    role: "DevOps Expert",
    funTitle: "Keeps the lights on so the rest of us can build.",
    bio: "Keeps deploys green and production alive. Owns the pipeline end to end.",
    years: "6+ years",
    record: [
      {
        org: "Sully.ai",
        line: "Built the pipelines and AWS infrastructure that keep hospital AI deployments green.",
        url: "https://sully.ai",
      },
      {
        org: "DeepIDV",
        line: "Owned the compliance-grade infrastructure and monitoring behind sub-150ms checks.",
        url: "https://deepidv.com",
      },
      {
        org: "Dubizzle",
        line: "Kept production healthy under millions of monthly visits.",
      },
    ],
    photo: "/team/hassan.jpg",
    photoStatus: "Photo",
    stack: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Docker"],
    focus: ["CI/CD", "uptime", "AWS", "cloud infra"],
    philosophy: "If a deploy is exciting, the pipeline is not done.",
    funFacts: [
      "Sleeps through deploys on purpose",
      "Has uptime goals, not dreams",
    ],
    reviews: [
      {
        quote:
          "Deploys went from scary to boring. That is the highest compliment I can give a platform engineer.",
        name: "Sully.ai",
        role: "co-founder",
      },
    ],
  },
  {
    id: "suhaib",
    name: "Suhaib Ahmad",
    role: "Forward-Deployed Engineer",
    funTitle: "In the field, closest to whoever's actually using it.",
    bio: "Ships client features on the ground, close to the people actually using them.",
    years: "4+ years",
    record: [
      {
        org: "Sully.ai",
        line: "Shipped on-ground features and UX flows close to the clinicians using them daily.",
        url: "https://sully.ai",
      },
      {
        org: "myUsta",
        line: "Delivered frontend work across the two-sided marketplace experience.",
        url: "https://myusta.com",
      },
      {
        org: "WearMeOut.ai",
        line: "Took the React + Firebase frontend to production readiness.",
      },
    ],
    photo: "/team/suhaib.png",
    photoStatus: "Photo",
    stack: ["WordPress", "React", "TypeScript", "Frontend"],
    focus: ["client delivery", "field work", "shipping"],
    philosophy: "The field knows which feature matters before the roadmap does.",
    funFacts: [
      "Lives inside client Slack",
      "Knows which button real users never click",
    ],
    reviews: [
      {
        quote:
          "Suhaib lived in our product and knew which feature was actually being used before we did.",
        name: "Sully.ai",
        role: "product manager",
      },
    ],
  },
  {
    id: "mazar",
    name: "Mazar Khan",
    role: "QA Engineer",
    funTitle: "The one who breaks it on purpose so you don't have to.",
    bio: "QA engineer who hunts the edge cases before they reach real users.",
    years: "2+ years",
    record: [
      {
        org: "Breakthrough Pulse",
        line: "Built defensive QA and regression flows across every shipped delivery.",
      },
    ],
    photoStatus: "Photo pending",
    stack: ["QA", "Test Automation", "CI/CD", "Regression Testing"],
    focus: ["QA", "regression", "release safety"],
    philosophy: "Shipping that breaks quietly is not shipping.",
    funFacts: [
      "Writes the test the dev forgot",
      "Finds bugs in finished features",
    ],
    reviews: [
      {
        quote:
          "Mazar caught the bug that would have shipped to production. That is the whole job.",
        name: "DeepIDV",
        role: "engineering lead",
      },
    ],
  },
  {
    id: "moiz",
    name: "Moiz",
    role: "Full Stack Engineer",
    funTitle: "The one who makes the full stack look easy.",
    bio: "Full-stack engineer with a sharp eye for clean architecture and production-ready code.",
    years: "4+ years",
    record: [
      {
        org: "Breakthrough Pulse",
        line: "Shipped full-stack features across multiple client deliveries.",
      },
    ],
    photo: "/team/moiz.jpeg",
    photoStatus: "Photo",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js"],
    focus: ["full-stack", "frontend", "API design"],
    philosophy: "Clean code is not about style — it is about speed of change.",
    funFacts: [
      "Refactors for fun on weekends",
      "Types everything twice",
    ],
    reviews: [
      {
        quote: "Moiz delivered clean, well-structured work on schedule.",
        name: "Client",
        role: "founder",
      },
    ],
  },
  {
    id: "hamza",
    name: "Hamza",
    role: "Backend Engineer",
    funTitle: "The one who keeps the servers honest.",
    bio: "Backend engineer focused on APIs, databases, and the infrastructure that holds it all together.",
    years: "3+ years",
    record: [
      {
        org: "Breakthrough Pulse",
        line: "Built and maintained backend services across multiple production deployments.",
      },
    ],
    photo: "/team/hamza.jpg",
    photoStatus: "Photo",
    stack: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    focus: ["backend", "APIs", "databases", "infrastructure"],
    philosophy: "A good API is one you never have to think about twice.",
    funFacts: [
      "Writes tests before code",
      "Reads changelogs for breakfast",
    ],
    reviews: [
      {
        quote: "Hamza's backend work was solid and reliable.",
        name: "Client",
        role: "CTO",
      },
    ],
  },
  {
    id: "abdullah",
    name: "Abdullah",
    role: "Frontend Engineer",
    funTitle: "The one who makes the interface sing.",
    bio: "Frontend engineer with a passion for accessible, performant, and beautiful user interfaces.",
    years: "3+ years",
    record: [
      {
        org: "Breakthrough Pulse",
        line: "Delivered frontend work across multiple client products.",
      },
    ],
    photo: "/team/abdullah.jpg",
    photoStatus: "Photo",
    stack: ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion"],
    focus: ["frontend", "UI/UX", "accessibility", "performance"],
    philosophy: "The best interface is the one you never notice.",
    funFacts: [
      "Lighthouse 100 or bust",
      "Dark mode is a lifestyle",
    ],
    reviews: [
      {
        quote: "Abdullah's frontend work was pixel-perfect and accessible.",
        name: "Client",
        role: "product lead",
      },
    ],
  },
  {
    id: "madiha",
    name: "Madiha",
    role: "Operations Lead",
    funTitle: "The one who keeps the machine running.",
    bio: "Operations lead who handles the people side and reads every message herself.",
    years: "5+ years",
    record: [
      {
        org: "Breakthrough Pulse",
        line: "Runs operations, people management, and client communications.",
      },
    ],
    photo: "/team/madiha.png",
    photoStatus: "Photo",
    stack: ["Operations", "People Management", "Client Relations"],
    focus: ["operations", "hiring", "client success"],
    philosophy: "The best operations are invisible — everything just works.",
    funFacts: [
      "Reads every message herself",
      "Keeps the team fed and focused",
    ],
    reviews: [
      {
        quote: "Madiha made the whole process feel effortless.",
        name: "Client",
        role: "founder",
      },
    ],
  },
];

const specialistMap = new Map(specialists.map((s) => [s.id, s]));

export function getSpecialist(id: string): Specialist {
  const s = specialistMap.get(id);
  if (!s) throw new Error(`Unknown specialist: ${id}`);
  return s;
}
