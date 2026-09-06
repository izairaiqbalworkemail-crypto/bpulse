"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/studio/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="border border-rag/20 px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/80 hover:text-rag"
    >
      Logout
    </button>
  );
}
