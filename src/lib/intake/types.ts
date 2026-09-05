export type IntakeType =
  | "start"
  | "rescue"
  | "contact"
  | "about"
  | "careers"
  | "work"
  | "check";

type FieldWhen = {
  when?: (answers: Record<string, string>) => boolean;
};

export type FieldConfig = FieldWhen &
  (
    | {
        name: string;
        label: string;
        type: "input";
        input?: string;
        autoComplete?: string;
        required: boolean;
        placeholder?: string;
      }
    | {
        name: string;
        label: string;
        type: "textarea";
        required: boolean;
        placeholder?: string;
      }
    | {
        name: string;
        label: string;
        type: "select";
        options: string[];
        required: boolean;
      }
    | {
        name: string;
        label: string;
        type: "radio";
        options: string[];
        required: boolean;
      }
  );
