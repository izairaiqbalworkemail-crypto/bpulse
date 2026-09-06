import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Desk } from "@/components/conversation/Desk";
import { ChairProblem } from "@/components/chair/ChairProblem";
import { ChairPromise } from "@/components/chair/ChairPromise";
import { TeacherObject } from "@/components/chair/TeacherObject";
import { WeekSpine } from "@/components/chair/WeekSpine";
import { ChairAudit } from "@/components/chair/ChairAudit";
import { CompareLedger } from "@/components/chair/CompareLedger";
import { ChairQuestions } from "@/components/chair/ChairQuestions";
import { ChairTiers } from "@/components/chair/ChairTiers";
import { Reveal } from "@/components/landing/Reveal";
import { secondChair } from "@/content/second-chair";
import { ladderPrices } from "@/content/ladder";
import { pageFrame } from "@/content/platform";
import { getSpecialist } from "@/content/specialists";
import { admission, assignmentHistory, signalsClosed } from "@/lib/assignment";

export const metadata: Metadata = buildMetadata({
  title: "Second Chair",
  description: pageFrame.secondChair,
  path: "/second-chair",
});

export default function SecondChairPage() {
  const person = getSpecialist(secondChair.assignedId);
  const first = person.name.split(" ")[0] ?? person.name;
  const line = admission(person);
  const history = assignmentHistory(person);
  const closed = signalsClosed(person);

  return (
    <>
      <ServiceJsonLd
        name={secondChair.name}
        description={pageFrame.secondChair}
        price={ladderPrices.standingMin}
      />

      <Episode labelledBy="problem" tone="cocoa" size="tall">
        <ChairProblem />
      </Episode>

      <Episode labelledBy="promise" tone="paper" size="short">
        <ChairPromise />
      </Episode>

      <Episode labelledBy="teacher" tone="cocoa" size="tall">
        <EpisodeHead
          n="03"
          kicker="WHO TEACHES"
          id="teacher"
          tone="cocoa"
          heading={`You would work with ${first}.`}
        />
        <TeacherObject
          person={person}
          first={first}
          standing={line.standing}
          dateNote={line.dateNote}
          history={history}
          closed={closed.length}
        />
      </Episode>

      <Episode labelledBy="month" tone="paper">
        <EpisodeHead
          n="04"
          kicker="A MONTH"
          id="month"
          heading="Your repository. Not a syllabus."
        >
          A syllabus means the content was written before they arrived.
        </EpisodeHead>
        <WeekSpine />
      </Episode>

      <Episode labelledBy="audit" tone="cocoa">
        <ChairAudit />
      </Episode>

      <Episode labelledBy="against" tone="paper" size="tall">
        <EpisodeHead
          n="06"
          kicker="AGAINST THE ALTERNATIVES"
          id="against"
          heading="Your codebase, or a course."
        />
        <CompareLedger />
      </Episode>

      <Episode labelledBy="questions" tone="cocoa">
        <ChairQuestions />
      </Episode>

      <Episode labelledBy="start" tone="signal">
        <EpisodeHead
          n="08"
          kicker="START"
          id="start"
          tone="signal"
          heading="Published. Cancel any month."
        >
          Write {first}. He reads it.
        </EpisodeHead>
        <ChairTiers />
        <Reveal delay={0.12}>
          <div
            id="intake"
            className="mt-12 scroll-mt-[5.75rem] md:scroll-mt-28"
          >
            <Desk scriptId="second-chair" ending="enquiry" />
          </div>
        </Reveal>
      </Episode>
    </>
  );
}
