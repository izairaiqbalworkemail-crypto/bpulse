import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LegalDoc } from "@/content/documents/types";
import { diffSections } from "./diff";
import type { SectionDiff } from "./diff";
import { registerLegalFonts, legalLogoDataUri } from "./fonts";

registerLegalFonts();

const LOGO = legalLogoDataUri();

const IRON = "#161614";
const INK = "#3f3e39";
const PARTIAL = "#4a8f6f";
const BLOCKED = "#b03a28";

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
  wordmark: {
    fontFamily: "Plex Sans",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 1.5,
    color: IRON,
    textTransform: "uppercase",
  },
  wordmarkSub: {
    fontFamily: "Plex Sans",
    fontSize: 8,
    color: INK,
    marginTop: 1,
  },
  mastheadSub: {
    fontFamily: "Plex Mono",
    fontSize: 7.5,
    color: INK,
    textAlign: "right",
  },
  title: {
    fontFamily: "Newsreader",
    fontWeight: 600,
    fontSize: 24,
    color: IRON,
    marginTop: 22,
    letterSpacing: -0.4,
  },
  lead: {
    fontFamily: "Plex Mono",
    fontSize: 9,
    color: INK,
    marginTop: 8,
  },
  section: {
    marginTop: 18,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "Newsreader",
    fontWeight: 600,
    fontSize: 13,
    color: IRON,
  },
  sectionBadge: {
    fontFamily: "Plex Mono",
    fontSize: 6.5,
    color: "#fff",
    backgroundColor: PARTIAL,
    borderRadius: 99,
    paddingVertical: 1,
    paddingHorizontal: 6,
    marginLeft: 8,
    textTransform: "uppercase",
  },
  clauseRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  added: {
    backgroundColor: "rgba(74,143,111,0.12)",
    borderLeftWidth: 3,
    borderLeftColor: PARTIAL,
  },
  removed: {
    backgroundColor: "rgba(176,58,40,0.12)",
    borderLeftWidth: 3,
    borderLeftColor: BLOCKED,
  },
  unchanged: {
    backgroundColor: "transparent",
  },
  clauseNumber: {
    fontFamily: "Plex Mono",
    fontSize: 8,
    color: INK,
    width: 40,
    marginTop: 1,
  },
  clauseText: {
    flex: 1,
    fontFamily: "Newsreader",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: IRON,
  },
  marker: {
    fontFamily: "Plex Mono",
    fontSize: 9,
    color: IRON,
    marginRight: 6,
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
    fontFamily: "Plex Mono",
    fontSize: 6.5,
    color: INK,
  },
});

export function LegalDiffPdf({
  doc,
  beforeLabel,
  afterLabel,
}: {
  doc: LegalDoc;
  beforeLabel: string;
  afterLabel: string;
}) {
  const version = doc.versions?.[0];
  if (!version) return null;

  const diffs: SectionDiff[] = diffSections(version.sections, doc.sections);
  const changed = diffs.filter(
    (section) =>
      section.clauses.some((clause) => clause.state !== "unchanged") ||
      section.plainTermsChanged
  );

  return (
    <Document
      title={`${doc.name} — scope diff ${beforeLabel} → ${afterLabel}`}
      author="bpulse — Breakthrough Pulse"
      producer="bpulse"
    >
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.masthead}>
          <View style={styles.logoCluster}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt prop in 4.9 */}
            <Image src={LOGO} style={styles.logo} />
            <View>
              <Text style={styles.wordmark}>bpulse</Text>
              <Text style={styles.wordmarkSub}>Breakthrough Pulse</Text>
            </View>
          </View>
          <Text style={styles.mastheadSub}>
            Lahore, Punjab, Pakistan{"\n"}contact@bpulse.dev
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{doc.name} — scope diff</Text>
          <Text style={styles.lead}>
            {doc.reference} · {beforeLabel} → {afterLabel} · rendered from the
            versions on file
          </Text>

          {changed.map((section) => (
            <View key={section.number} wrap style={styles.section}>
              <View style={styles.sectionHead}>
                <Text style={styles.sectionTitle}>
                  Section {section.number}. {section.heading}
                </Text>
                {section.plainTermsChanged && (
                  <Text style={styles.sectionBadge}>plain terms changed</Text>
                )}
              </View>
              {section.clauses.map((clause) => (
                <View
                  key={clause.key}
                  style={[
                    styles.clauseRow,
                    clause.state === "added"
                      ? styles.added
                      : clause.state === "removed"
                        ? styles.removed
                        : styles.unchanged,
                  ]}
                >
                  <Text style={styles.clauseNumber}>{clause.number}</Text>
                  <Text style={styles.marker}>
                    {clause.state === "added"
                      ? "＋"
                      : clause.state === "removed"
                        ? "−"
                        : ""}
                  </Text>
                  <Text style={styles.clauseText}>{clause.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>
            bpulse · breakthrough pulse · contact@bpulse.dev
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `${doc.reference} · ${beforeLabel} → ${afterLabel} · ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}