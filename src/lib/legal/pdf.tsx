import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LegalDoc } from "@/content/documents/types";
import { LEGAL_STATUS_META } from "@/content/documents/types";
import { clauseNumber } from "@/content/documents";
import { registerLegalFonts, legalLogoDataUri } from "./fonts";

registerLegalFonts();

const LOGO = legalLogoDataUri();

const FONT_SANS = "Plex Sans";
const FONT_MONO = "Plex Mono";
const FONT_SERIF = "Newsreader";

const IRON = "#0d1218";
const INK = "#38424e";
const SIGNAL = "#f2c230";
const RAG = "#efeae0";
const RAG_CARD = "#f7f4ee";
const PARTIAL = "#4a8f6f";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingHorizontal: 56.7,
    backgroundColor: "#ffffff",
  },
  body: {
    paddingBottom: 72,
  },
  masthead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 48,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: IRON,
  },
  logoCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 22,
    height: 28,
  },
  wordmarkCol: {
    flexDirection: "column",
  },
  wordmark: {
    fontFamily: FONT_SANS,
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 1.5,
    color: IRON,
    textTransform: "uppercase",
  },
  wordmarkSub: {
    fontFamily: FONT_SANS,
    fontSize: 8,
    color: INK,
    marginTop: 1,
  },
  mastheadSub: {
    fontFamily: FONT_MONO,
    fontSize: 7.5,
    color: INK,
    textAlign: "right",
  },
  title: {
    fontFamily: FONT_SERIF,
    fontWeight: 600,
    fontSize: 26,
    color: IRON,
    marginTop: 22,
    letterSpacing: -0.4,
  },
  lead: {
    fontFamily: FONT_SERIF,
    fontSize: 11.5,
    lineHeight: 1.55,
    color: INK,
    marginTop: 10,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    backgroundColor: RAG_CARD,
    borderWidth: 1,
    borderColor: "#e4ddd0",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  metaCell: {
    width: "33.33%",
    marginBottom: 6,
  },
  metaLabel: {
    fontFamily: FONT_MONO,
    fontSize: 6.5,
    color: INK,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metaValue: {
    fontFamily: FONT_SANS,
    fontSize: 9,
    color: IRON,
    marginTop: 2,
  },
  statusWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PARTIAL,
    borderRadius: 99,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  statusChipText: {
    fontFamily: FONT_SANS,
    fontWeight: 600,
    fontSize: 7,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  h2: {
    fontFamily: FONT_SERIF,
    fontWeight: 600,
    fontSize: 14,
    color: IRON,
    marginTop: 18,
    marginBottom: 7,
  },
  plainBox: {
    marginTop: 2,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderLeftWidth: 2.5,
    borderLeftColor: SIGNAL,
    backgroundColor: RAG,
  },
  plainLabel: {
    fontFamily: FONT_MONO,
    fontSize: 6.5,
    color: INK,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 3,
  },
  plainText: {
    fontFamily: FONT_SERIF,
    fontSize: 10,
    lineHeight: 1.5,
    color: IRON,
  },
  clauseRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  clauseNumber: {
    fontFamily: FONT_MONO,
    fontSize: 8,
    color: INK,
    width: 34,
    marginTop: 1,
  },
  clauseText: {
    flex: 1,
    fontFamily: FONT_SERIF,
    fontSize: 10,
    lineHeight: 1.5,
    color: IRON,
  },
  reviewNote: {
    marginTop: 3,
    marginBottom: 8,
    fontFamily: FONT_SANS,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: INK,
    fontStyle: "italic",
  },
  signatures: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: IRON,
  },
  signTitle: {
    fontFamily: FONT_SANS,
    fontWeight: 600,
    fontSize: 9,
    color: IRON,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  signBlock: {
    width: "50%",
    paddingRight: 18,
  },
  signRow: {
    flexDirection: "row",
  },
  signName: {
    fontFamily: FONT_SANS,
    fontWeight: 600,
    fontSize: 10,
    color: IRON,
  },
  signLine: {
    fontFamily: FONT_SANS,
    fontSize: 9,
    color: INK,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: INK,
    paddingBottom: 2,
  },
  changelog: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: IRON,
  },
  changeEntry: {
    marginBottom: 6,
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
    fontFamily: FONT_SERIF,
    fontSize: 9.5,
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
    fontSize: 6.5,
    color: INK,
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

  return (
    <Document
      title={`${doc.name} — ${doc.version}`}
      author="bpulse — Breakthrough Pulse"
      producer="bpulse"
    >
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.masthead}>
          <View style={styles.logoCluster}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt prop in 4.9 */}
            <Image src={LOGO} style={styles.logo} />
            <View style={styles.wordmarkCol}>
              <Text style={styles.wordmark}>bpulse</Text>
              <Text style={styles.wordmarkSub}>Breakthrough Pulse</Text>
            </View>
          </View>
          <Text style={styles.mastheadSub}>
            Lahore, Punjab, Pakistan{"\n"}contact@bpulse.dev
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{doc.name}</Text>
          <Text style={styles.lead}>{doc.lead}</Text>

          <View style={styles.metaGrid}>
            <MetaRow label="Reference" value={doc.reference} />
            <MetaRow label="Version" value={doc.version} />
            <MetaRow label="Issued" value={doc.issuedAt} />
            <MetaRow label="Updated" value={doc.updatedAt} />
            <MetaRow
              label="Status"
              value={`${status.dot} ${status.label}`}
            />
            <MetaRow label="Owner" value={`${doc.owner} · ${doc.role}`} />
          </View>

          {doc.parties.map((party) => (
            <Text key={party.key} style={styles.lead}>
              {party.key === "bpulse" ? "From" : "To"} — {party.name} ·{" "}
              {party.entity} · {party.jurisdiction}
            </Text>
          ))}

          {doc.sections.map((section) => (
            <View key={section.number} wrap>
              <Text style={styles.h2}>
                {section.number}. {section.heading}
              </Text>
              <View style={styles.plainBox}>
                <Text style={styles.plainLabel}>In plain terms</Text>
                <Text style={styles.plainText}>{section.plainTerms}</Text>
              </View>
              {section.clauses.map((clause, index) => (
                <View
                  key={clause.number ?? `${section.number}.${index}`}
                  style={styles.clauseRow}
                >
                  <Text style={styles.clauseNumber}>
                    {clauseNumber(section.number, index, clause.number)}
                  </Text>
                  <Text style={styles.clauseText}>{clause.text}</Text>
                </View>
              ))}
              {section.reviewNote && (
                <Text style={styles.reviewNote}>
                  Review needed: {section.reviewNote}
                </Text>
              )}
            </View>
          ))}

          {doc.signatureBlocks.length > 0 && (
            <View style={styles.signatures}>
              <Text style={styles.signTitle}>Signatures</Text>
              <View style={styles.signRow}>
                {doc.signatureBlocks.map((block) => (
                  <View key={block.party} style={styles.signBlock}>
                    <Text style={styles.signName}>
                      For {block.party.toUpperCase()} — {block.name}
                    </Text>
                    <Text style={styles.signName}>Title: {block.title}</Text>
                    <Text style={styles.signLine}>
                      Signature and date
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.changelog}>
            <Text style={styles.signTitle}>Changelog</Text>
            {doc.changelog.map((entry) => (
              <View
                key={`${entry.version}-${entry.date}`}
                style={styles.changeEntry}
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
        </View>

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>
            bpulse · breakthrough pulse · contact@bpulse.dev
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `${doc.reference} · ${doc.version} · ${status.dot} ${status.label} · ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
