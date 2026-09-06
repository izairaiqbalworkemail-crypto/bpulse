import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { LegalDoc } from "@/content/documents/types";
import { LEGAL_STATUS_META } from "@/content/documents/types";
import { clauseNumber } from "@/content/documents";
import { DRAFT_NOTICE, isDraftDocument } from "@/lib/legal/status";
import { registerLegalFonts, legalLogoDataUri } from "./fonts";

registerLegalFonts();

const LOGO = legalLogoDataUri();
const FONT_SANS = "Plex Sans";
const FONT_MONO = "Plex Mono";
const IRON = "#161614";
const INK = "#3f3e39";

const styles = StyleSheet.create({
  page: {
    paddingTop: 56.7,
    paddingBottom: 72,
    paddingHorizontal: 56.7,
    backgroundColor: "#ffffff",
    fontFamily: FONT_SANS,
    fontSize: 10.5,
    lineHeight: 1.45,
    color: IRON,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    width: 14,
    height: 18,
  },
  wordmark: {
    fontFamily: FONT_SANS,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: IRON,
  },
  rule: {
    borderBottomWidth: 0.75,
    borderBottomColor: IRON,
    marginBottom: 14,
  },
  draftBanner: {
    marginBottom: 10,
    borderWidth: 0.75,
    borderColor: INK,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  draftBannerText: {
    fontFamily: FONT_MONO,
    fontSize: 8.5,
    color: INK,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: FONT_SANS,
    fontSize: 16,
    lineHeight: 1.25,
    color: IRON,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  metaCell: {
    width: "50%",
    marginBottom: 6,
  },
  metaLabel: {
    fontFamily: FONT_MONO,
    fontSize: 7.5,
    color: INK,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontFamily: FONT_SANS,
    fontSize: 10,
    color: IRON,
    marginTop: 1,
  },
  h2: {
    fontFamily: FONT_SANS,
    fontSize: 11,
    color: IRON,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginTop: 14,
    marginBottom: 6,
  },
  clauseRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  clauseNumber: {
    fontFamily: FONT_MONO,
    fontSize: 9,
    color: INK,
    width: 36,
  },
  clauseText: {
    flex: 1,
    fontFamily: FONT_SANS,
    fontSize: 10.5,
    lineHeight: 1.45,
    color: IRON,
    textAlign: "justify",
  },
  signatures: {
    marginTop: 28,
    paddingTop: 12,
    borderTopWidth: 0.75,
    borderTopColor: IRON,
  },
  signTitle: {
    fontFamily: FONT_MONO,
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: IRON,
    marginBottom: 14,
  },
  signRow: {
    flexDirection: "row",
  },
  signBlock: {
    width: "50%",
    paddingRight: 16,
  },
  signName: {
    fontFamily: FONT_SANS,
    fontSize: 10,
    color: IRON,
  },
  signLine: {
    marginTop: 36,
    borderBottomWidth: 0.75,
    borderBottomColor: IRON,
    paddingBottom: 2,
    fontFamily: FONT_MONO,
    fontSize: 8,
    color: INK,
  },
  initials: {
    position: "absolute",
    bottom: 48,
    right: 56.7,
    flexDirection: "row",
    gap: 16,
  },
  initialBox: {
    width: 48,
    height: 22,
    borderWidth: 0.75,
    borderColor: IRON,
  },
  initialLabel: {
    fontFamily: FONT_MONO,
    fontSize: 6.5,
    color: INK,
    marginBottom: 2,
  },
  changelog: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 0.75,
    borderTopColor: IRON,
  },
  changeEntry: {
    marginBottom: 5,
    flexDirection: "row",
  },
  changeVersion: {
    fontFamily: FONT_MONO,
    fontSize: 8,
    color: INK,
    width: 110,
  },
  changeText: {
    flex: 1,
    fontFamily: FONT_SANS,
    fontSize: 9,
    lineHeight: 1.4,
    color: IRON,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 56.7,
    right: 56.7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: INK,
  },
  footerText: {
    fontFamily: FONT_MONO,
    fontSize: 7,
    color: INK,
  },
  draftWatermark: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: FONT_MONO,
    fontSize: 72,
    letterSpacing: 8,
    color: "#8a8778",
    opacity: 0.14,
  },
});

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaCell}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

export function LegalPdf({ doc }: { doc: LegalDoc }) {
  const status = LEGAL_STATUS_META[doc.status];
  const isDraft = isDraftDocument(doc);
  const client = doc.parties.find((party) => party.key !== "bpulse");

  return (
    <Document
      title={`${doc.name} — ${doc.version}`}
      author="bpulse — Breakthrough Pulse"
      producer="bpulse"
    >
      <Page size="A4" style={styles.page} wrap>
        {isDraft ? <Text fixed style={styles.draftWatermark}>DRAFT</Text> : null}
        <View>
          <View style={styles.brandRow}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt */}
            <Image src={LOGO} style={styles.logo} />
            <Text style={styles.wordmark}>bpulse</Text>
          </View>
          <View style={styles.rule} />
          {isDraft ? (
            <View style={styles.draftBanner}>
              <Text style={styles.draftBannerText}>{DRAFT_NOTICE}</Text>
            </View>
          ) : null}
          <Text style={styles.title}>{doc.name}</Text>
          <View style={styles.metaGrid}>
            <MetaRow label="Reference" value={doc.reference} />
            <MetaRow label="Version" value={doc.version} />
            <MetaRow label="Between" value="bpulse, Lahore" />
            <MetaRow label="Issued" value={doc.issuedAt} />
            <MetaRow label="" value={client ? client.name : "—"} />
            <MetaRow label="Status" value={status.label} />
          </View>
          <View style={styles.rule} />
        </View>

        {doc.sections.map((section) => (
          <View key={section.number} wrap>
            <Text style={styles.h2}>
              {section.number}. {section.heading}
            </Text>
            {section.clauses.map((clause, index) => (
              <View
                key={clause.number ?? `${section.number}.${index}`}
                style={styles.clauseRow}
                wrap={false}
              >
                <Text style={styles.clauseNumber}>
                  {clauseNumber(section.number, index, clause.number)}
                </Text>
                <Text style={styles.clauseText}>{clause.text}</Text>
              </View>
            ))}
          </View>
        ))}

        {doc.signatureBlocks.length > 0 ? (
          <View style={styles.signatures} wrap={false}>
            <Text style={styles.signTitle}>Signatures</Text>
            <View style={styles.signRow}>
              {doc.signatureBlocks.map((block) => (
                <View key={block.party} style={styles.signBlock}>
                  <Text style={styles.signName}>
                    For {block.party} — {block.name}
                  </Text>
                  <Text style={styles.signName}>{block.title}</Text>
                  <Text style={styles.signLine}>Signature</Text>
                  <Text style={styles.signLine}>Date</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.changelog}>
          <Text style={styles.signTitle}>Changelog</Text>
          {doc.changelog.map((entry) => (
            <View
              key={`${entry.version}-${entry.date}`}
              style={styles.changeEntry}
              wrap={false}
            >
              <Text style={styles.changeVersion}>
                {entry.version} · {entry.date}
              </Text>
              <Text style={styles.changeText}>
                {entry.change} — {entry.reason}
              </Text>
            </View>
          ))}
        </View>

        {doc.initialsOnEachPage ? (
          <View fixed style={styles.initials}>
            <View>
              <Text style={styles.initialLabel}>bpulse</Text>
              <View style={styles.initialBox} />
            </View>
            <View>
              <Text style={styles.initialLabel}>client</Text>
              <View style={styles.initialBox} />
            </View>
          </View>
        ) : null}

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>bpulse · Lahore, Pakistan</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `${doc.reference} · ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
