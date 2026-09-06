import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AdminBoard } from "@/components/careers/AdminBoard";
import { getAdminDiagnosticData, listAdminBoardData } from "@/lib/careers/repo";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function StudioCareersPage({ searchParams }: Props) {
  const headerStore = await headers();
  const session = readSessionFromCookieHeader(headerStore.get("cookie"));
  if (!session) notFound();

  const params = await searchParams;
  const board = await listAdminBoardData();
  const selectedToken =
    params.token ?? board.find((item) => item.hasSubmission)?.diagnosticToken ?? null;
  const selected = selectedToken ? await getAdminDiagnosticData(selectedToken) : null;

  return (
    <section className="w-full bg-rag pb-24">
      <div className="grid-container pt-14">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Careers pipeline</p>
        <h1 className="mt-2 font-newsreader text-[38px] leading-[1.08] text-iron">Gate board and reviewer desk</h1>
        <p className="mt-3 max-w-[58ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          Candidate movement by gate with direct scoring from submitted diagnostics.
          Items past seven days in gate are flagged for action.
        </p>
        <AdminBoard
          board={board}
          selectedDiagnosticToken={selected?.diagnostic.token ?? null}
          selectedPayload={selected?.diagnostic.payload ?? selected?.diagnostic.draft ?? null}
        />
      </div>
    </section>
  );
}
