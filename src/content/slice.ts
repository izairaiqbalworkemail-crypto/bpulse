export const sessionPage = {
  title: "Ninety minutes. A written scope.",
  dek: "A senior engineer on your actual problem. You leave with a range. Credited against anything you buy in 30 days.",
  not: "It is not a sales call. Nothing in the hour is a pitch for a larger engagement.",
  in: [
    "Your actual problem, not a sample.",
    "A written scope you can take anywhere.",
    "A published range, not a quote that changes after the call.",
  ],
  out: [
    "A repository read. That is the Check.",
    "Production work. That is the First Slice or the Close.",
    "A meeting you have to attend to get a price. The prices are already on this page.",
  ],
} as const;

export const slicePage = {
  title: "One thing that works.",
  dek: "Two weeks. Fixed price, fixed scope. Something in production you can show someone.",
  honest:
    "It is a beginning, not a finish. If you need the product finished, that is the Close. If you need to know whether to keep the one you have, that is the Check.",
  in: [
    "One agreed slice, written before we start.",
    "Deployed somewhere a person who is not us can use it.",
    "A short note on what we did not do, so the next step is honest.",
  ],
  out: [
    "A finished product. Two weeks will not finish a Close.",
    "A redesign of the whole system.",
    "An open-ended retainer. When the two weeks end, the work ends.",
  ],
} as const;

export const readPage = {
  title: "A real read. No meeting.",
  dek: "You describe what is stuck. We write back within one business day: what we think is happening, what we would look at, and what we could not tell from your description.",
  not: "It is not a diagnosis of code we have not seen. It is not a sales call.",
} as const;
