import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: [
      "src/components/Hero.tsx",
      "src/components/primitives/Masthead.tsx",
      "src/app/check/page.tsx",
      "src/components/IntakeForm.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/text-(ink|rag)\\/([0-6][0-9])(\\b|$)/]",
          message:
            "Text using ink/rag must stay at 70% opacity or higher.",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] TemplateElement[value.raw=/text-(ink|rag)\\/([0-6][0-9])(\\b|$)/]",
          message:
            "Text using ink/rag must stay at 70% opacity or higher.",
        },
      ],
    },
  },
];

export default config;
