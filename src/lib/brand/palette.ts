/**
 * Two darks, one cream, yellow only on the ask.
 * Status is red / green / amber. Never a third near-black.
 */
export const palette = {
  paper: "#F3ECE3",
  paperCard: "#F7F2EC",
  ink: "#15130F",
  ink2: "#15130F",
  inkCard: "#1E1B15",
  ground: "#15130F",
  ground2: "#15130F",
  card: "#1E1B15",
  void: "#15130F",
  void2: "#15130F",
  voidCard: "#1E1B15",
  page: "#F3ECE3",
  pageCard: "#F7F2EC",
  carbon: "#15130F",
  dust: "#4A453B",
  mist: "#F3ECE3",
  text: "#F3ECE3",
  quill: "#4A453B",
  mute: "#4A453B",
  sub: "#4A453B",
  read: "#C9C3B6",
  label: "#8A8272",
  line: "#E4DDD1",
  lineInk: "#33301F",
  headline: "#1A1A1A",
  gold: "#F0BB35",
  strike: "#F0BB35",
  ember: "#B23B34",
  tape: "#D9A62B",
  comment: "#D9A62B",
  after: "#4A6B57",
  stuck: "#B23B34",
  diag: "#D9A62B",
  build: "#D9A62B",
  ship: "#4A6B57",
} as const;

export type Palette = typeof palette;
