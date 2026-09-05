import { NextResponse } from "next/server";
import {
  getDiagnosticByToken,
  saveDiagnosticDraft,
  type DiagnosticPayloadInput,
} from "@/lib/careers/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
};

export async function POST(request: Request, { params }: Props) {
  const { token } = await params;
  if (!/^[A-Za-z0-9]{16}$/.test(token)) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 400 });
  }
  const diagnostic = getDiagnosticByToken(token);
  if (!diagnostic) {
    return NextResponse.json({ ok: false, error: "Token not found." }, { status: 404 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  const saved = saveDiagnosticDraft(token, payload as DiagnosticPayloadInput);
  if (!saved.ok) {
    return NextResponse.json(saved, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
