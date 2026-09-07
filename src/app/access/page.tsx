import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AccessPage() {
  const cookieHeader = (await headers()).get("cookie");
  const session = readSessionFromCookieHeader(cookieHeader);
  if (!session) notFound();
  redirect("/admin");
}
