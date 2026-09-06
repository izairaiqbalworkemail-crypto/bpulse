import type { Metadata } from "next";
import { AdminAccessForm } from "@/components/admin/AdminAccessForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Access",
  description: "Internal access request page.",
  path: "/access",
  robots: "noindex, nofollow",
});

export default function AccessPage() {
  return (
    <section className="w-full bg-rag pb-24">
      <div className="grid-container pt-16">
        <AdminAccessForm />
      </div>
    </section>
  );
}
