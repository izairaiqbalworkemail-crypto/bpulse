import { subProcessors } from "@/content/legal/vendors";

/**
 * /legal/data — the transfer page. Facts a European buyer will ask.
 * No invented statute numbers. Commission Decision (EU) 2021/914 is
 * named because that is the instrument the brief requires us to use.
 */
export const transferPage = {
  title: "Where data goes",
  dek: "Pakistan has no enacted data protection law. We say that first, then the route we use, then what we actually do.",
  owner: "Hamza Khan",
  pakistan: {
    heading: "The Pakistan position",
    plain:
      "There is no adequacy decision covering Pakistan. There is also no operational data-protection authority and no mandatory breach-notification regime we can point a European buyer to.",
    clauses: [
      "Pakistan has no enacted general data protection law. The Personal Data Protection Bill has been in draft since 2018 and remains unpassed as of 2026.",
      "PECA 2016, as amended, is a criminal statute. It criminalises specific misuse. It does not establish a framework for how organisations collect, process, or store personal data.",
      "There is no mandatory breach notification, no data-subject rights framework, and no operational data protection authority.",
      "That is why EU personal data cannot rely on adequacy, and why a Transfer Impact Assessment is required in addition to Standard Contractual Clauses.",
    ],
  },
  architecture: {
    heading: "The better mitigation is architectural",
    plain:
      "If the engagement never requires the client's personal data to leave their systems, most of the transfer problem collapses.",
    clauses: [
      "A Check can be run against a repository and environments you control. We do not need a copy of your production personal data to write a condition report.",
      "When you keep production personal data in your systems and grant time-limited access, bpulse is reading, not exporting a dataset to Lahore.",
      "When a Close does require a copy — test fixtures with real names, a production dump, a customer export — that is when the DPA, the SCCs, and the TIA apply. We say so before that copy is made.",
    ],
  },
  scc: {
    heading: "The SCC position",
    plain:
      "EU clients transferring personal data to us need Standard Contractual Clauses. The mandatory clauses cannot be modified.",
    clauses: [
      "The instrument is Commission Implementing Decision (EU) 2021/914, the 2021 modernised set.",
      "For a client that is a controller and bpulse as processor, the module is Module Two.",
      "We do not rewrite those clauses. The official text is attached to the DPA unmodified. Our cover document is at /legal/standard-contractual-clauses.",
      "SCCs alone are not enough after Schrems II. The exporter still needs a Transfer Impact Assessment.",
    ],
    reviewNote:
      "Solicitor to attach the official 2021/914 text, complete Annex I–III, and confirm Module Two is the correct module for the matter.",
  },
  uk: {
    heading: "The UK is separate",
    plain:
      "UK clients do not use raw EU SCCs. They use the UK International Data Transfer Addendum to those SCCs.",
    clauses: [
      "UK adequacy for the EU was renewed in December 2025 and runs to December 2031. That is a fact about EU–UK transfers, not about Pakistan.",
      "A UK client sending personal data to bpulse in Pakistan still needs a transfer tool. The tool we prepare is the UK International Data Transfer Addendum to the EU SCCs.",
      "We do not treat a UK contract as covered by the EU SCC set alone.",
    ],
    reviewNote:
      "Solicitor to confirm the current ICO addendum version and complete it for the matter.",
  },
  tia: {
    heading: "Transfer Impact Assessment",
    plain:
      "The TIA is required, not optional. Pakistan is harder to argue than most, because there is no privacy framework and PECA grants law-enforcement access powers.",
    clauses: [
      "We prepare a TIA for any engagement that moves personal data to bpulse systems or to our sub-processors.",
      "The TIA records: what data, who the exporter is, who the importer is, the legal regime in Pakistan, the access-request policy below, and the supplementary measures actually in place.",
      "We do not claim essential equivalence. We document the gap and the measures.",
    ],
    reviewNote:
      "Solicitor to confirm the TIA form and whether supplementary measures are sufficient for the specific dataset.",
  },
  measures: {
    heading: "Supplementary measures we can state today",
    plain:
      "Only measures that are true of the current stack. Intended measures are labelled as intended.",
    inPlace: [
      "Transit is encrypted by the vendors (TLS on Vercel, Neon, Upstash, and Resend).",
      "Vendor-managed encryption at rest on Neon, Upstash, and the Vercel platform, on their terms.",
      "Access to intake records is limited to the people who read submissions. Aneeb reads Check intake. Hamza is the legal-risk contact.",
      "Public analytics is self-hosted and cookieless. Portal analytics runs only after authentication.",
    ],
    notClaimed: [
      "We do not claim that encryption keys are held outside Pakistan. We do not operate our own key-management system. Keys are vendor-managed.",
      "We do not claim pseudonymisation of intake data today. A filed Check contains what the visitor typed.",
      "We do not claim a dedicated access-logging product beyond what the vendors and our application logs already produce.",
    ],
    intended: [
      "Per-engagement: keep production personal data in the client's systems wherever the work allows.",
      "Per-engagement: record the Neon region in Annex I before a DPA is executed.",
      "A written government-access request policy, below, to be confirmed by counsel.",
    ],
  },
  access: {
    heading: "Government access requests",
    plain:
      "If a Pakistani authority asks for client data, we do not volunteer it. The written rule is below. Counsel must still confirm it.",
    clauses: [
      "We do not provide client data to a government authority unless we are legally compelled to do so.",
      "If we receive a request, we notify the client unless the law forbids that notice.",
      "We ask for the request in writing, we narrow it to what is specified, and we record what was asked and what was given.",
      "Hamza Khan is the named owner for this process: hamza@bpulse.dev.",
    ],
    reviewNote:
      "Solicitor to confirm this policy against PECA and any applicable compulsory-access powers before it is relied on.",
  },
  vendors: subProcessors,
} as const;
