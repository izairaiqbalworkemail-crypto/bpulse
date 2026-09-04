export type SourceRef = {
  kind:
    | "client-engagement"
    | "client-site"
    | "portfolio"
    | "field-note"
    | "review";
  org: string;
  url?: string;
};

export type LotDataLine = {
  label: string;
  value: string;
  mono?: boolean;
};

/**
 * A lot is graded on its condition ON ARRIVAL — the state of the object when
 * it came through the door, not its state today. Every lot arrived somewhere
 * short of shippable; that is why it was brought in.
 *
 * `state` is the arrival state vocabulary (see DECISIONS.md). `grade` maps
 * that state onto the two existing token colours and is never shown without
 * a written label. `label` is the human word, e.g. "Incomplete on arrival".
 * `date` is the arrival date — or, where the source does not state one, the
 * engagement start; the limits line says which and we never infer.
 */
export type ArrivalGrade = {
  state:
    | "incomplete"
    | "stalled"
    | "integration-blocked"
    | "unstable";
  grade: "sound" | "unsound";
  label: string;
  /**
   * The arrival date. Optional — where the source records no arrival (or
   * engagement-start) date, it is omitted rather than inferred, and the lot's
   * limits line says so.
   */
  date?: string;
};

export type Lot = {
  slug: string;
  lotNumber: string;
  client: string;
  clientUrl?: string;
  logoUrl?: string;
  imageUrl?: string;
  title: string;
  summary: string;
  condition: string;
  dataLines: LotDataLine[];
  /**
   * Condition on arrival — see ArrivalGrade.
   */
  grade: ArrivalGrade;
  /**
   * What shipped. The outcome, stated separately from the arrival state.
   */
  outcome: string;
  /**
   * Where the source is silent. The honest place to say "we do not have a
   * number here" instead of inventing one.
   */
  limits?: string[];
  specialistId: string;
  specialistCapability: string;
  sources: SourceRef[];
};

export type Specialist = {
  id: string;
  name: string;
  role: string;
  funTitle: string;
  bio: string;
  years: string;
  record: {
    org: string;
    line: string;
    url?: string;
  }[];
  photo?: string;
  photoStatus: "Photo" | "Photo pending";
  stack: string[];
  focus: string[];
  philosophy: string;
  funFacts: string[];
  reviews?: {
    quote: string;
    name: string;
    role: string;
  }[];
};

export type Notice = {
  id: string;
  question: string;
  answer: string;
  source?: SourceRef;
};

export type Offer = {
  check: {
    name: string;
    price: number;
    currency: string;
    duration: string;
    description: string;
  };
  close: {
    name: string;
    priceRange: string;
    description: string;
  };
  standing: {
    name: string;
    priceRange: string;
    description: string;
  };
};
