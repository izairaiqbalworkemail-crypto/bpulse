import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ReportLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @media print {
          nav, header, footer, .report-cta, .sticky-contact { display: none !important; }
          .report-print-url { display: block !important; }
          details { display: block !important; }
          details summary { display: block !important; }
          .report-page { background: white !important; color: black !important; }
          body { background: white !important; }
        }
      `}</style>
      {children}
    </>
  );
}
