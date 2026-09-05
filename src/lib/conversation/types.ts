export type Answers = Record<string, string>;

export type Chip = { id: string; label: string };

export type FieldKind = "textarea" | "chips" | "chips-text" | "identity";

export type Field = {
  name: string;
  ask: string;
  kind: FieldKind;
  chips?: readonly Chip[];
  extraPlaceholder?: string;
  placeholder?: string;
  required?: boolean;
  when?: (answers: Answers) => boolean;
};

export type ScriptId = "check" | "second-chair";

export type Script = {
  id: ScriptId;
  source: string;
  banner: string;
  fields: Field[];
};

export type DeskState = {
  answers: Answers;
  seen: string[];
};
