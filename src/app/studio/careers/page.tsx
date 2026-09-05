import { AdminBoard } from "@/components/careers/AdminBoard";
import { getAdminDiagnostic, listAdminBoard } from "@/lib/careers/store";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function StudioCareersPage({ searchParams }: Props) {
  const params = await searchParams;
  const board = listAdminBoard();
  const selectedToken =
    params.token ?? board.find((item) => item.hasSubmission)?.diagnosticToken ?? null;
  const selected = selectedToken ? getAdminDiagnostic(selectedToken) : null;

  return (
    <section className="w-full bg-rag pb-24">
      <div className="grid-container pt-14">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Studio admin · careers</p>
        <h1 className="mt-2 font-newsreader text-[38px] leading-[1.08] text-iron">Gate board and scorer</h1>
        <AdminBoard
          board={board}
          selectedDiagnosticToken={selected?.diagnostic.token ?? null}
          selectedPayload={selected?.diagnostic.payload ?? selected?.diagnostic.draft ?? null}
        />
      </div>
    </section>
  );
}
