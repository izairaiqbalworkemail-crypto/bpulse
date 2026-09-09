import { After } from "@/components/home/After";
import { Happens } from "@/components/home/Happens";
import { Proof } from "@/components/home/Proof";
import { Questions } from "@/components/home/Questions";
import { Suggest } from "@/components/home/Suggest";
import { Terms } from "@/components/home/Terms";
import { View } from "@/components/home/View";
import { Where } from "@/components/home/Where";
import { Who } from "@/components/home/Who";

/**
 * The folio under the poster. One sheet. Sections, not cards.
 */
export function Landing() {
  return (
    <div className="letter-folio">
      <Where />
      <Suggest />
      <View />
      <Proof />
      <Happens />
      <Terms />
      <div className="letter-crew">
        <div className="letter-crew-desk">
          <Who />
          <After />
        </div>
      </div>
      <Questions />
    </div>
  );
}
