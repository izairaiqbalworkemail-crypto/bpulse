import { After } from "@/components/home/After";
import { Happens } from "@/components/home/Happens";
import { Proof } from "@/components/home/Proof";
import { Questions } from "@/components/home/Questions";
import { Terms } from "@/components/home/Terms";
import { View } from "@/components/home/View";
import { Where } from "@/components/home/Where";
import { Who } from "@/components/home/Who";

/**
 * 01 is Recognition (Hero).
 * 02 Where are you. 03 Visibility. 04 Proof. 05 What happens.
 * 06 Terms. 07 Who. 08 After. 09 Doubt, then the ask.
 */
export function Landing() {
  return (
    <>
      <Where />
      <View />
      <Proof />
      <Happens />
      <Terms />
      <Who />
      <After />
      <Questions />
    </>
  );
}
