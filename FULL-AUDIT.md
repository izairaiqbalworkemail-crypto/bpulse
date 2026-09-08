# FULL-AUDIT

8 September 2026. Findings only. Nothing in this file was fixed except the three Part 0 items already committed as `4440d22`.

**Method.** Code walk of every route in Part 3. Copy quoted from `src/`. Prices traced to `src/content/ladder.ts`. Nav and footer crawled from source. Two prior agents walked funnel, proof, people, system, company, legal, private, and chrome.

**I cannot see images.** Visual layout, contrast, and overflow are inferred from code and marked **needs founder eyes**.

**Not run, so not claimed:** Lighthouse on every route, axe on every route, a real phone, Slack/LinkedIn OG paste, crawl of a production build. Those are open verification items at the end.

No em dashes in this file.

---

## Part 0, already shipped (`4440d22`)

These were true this morning. They are listed so the list is complete, then marked fixed.

```
ID        F-000
Page      /pricing
Section   The ladder
Lens      Truth
Severity  Critical
Found     Session, Check, and First Slice rendered $0. ladder.ts has $400, $1,500, $7,500.
          Cause: Count started at 0 and waited for inView. First paint was $0.
Impact    On a site that publishes prices, a $0 price is the worst possible lie.
Fix       Shipped. Prices now print the ladder string. Count no longer counts through zero.
          Tests fail the build if a paid price is zero or missing.
Effort    S
```

```
ID        F-000b
Page      /contact
Section   Payment strip
Lens      Trust
Severity  Critical
Found     VettedPay said "$1,500 is billed by a named person." Contact is not the Check.
Impact    A visitor who only wanted to write believed contact costs money.
Fix       Shipped. Contact is name, email, what do you need, send, plus contact@bpulse.dev.
Effort    S
```

```
ID        F-000c
Page      /access
Section   Admin Access
Lens      Security
Severity  Critical
Found     Public nav and footer linked /access. The form named STUDIO_ADMIN_ALLOWLIST
          and told the reader to edit .env.local. Dev magic links were returned to the browser.
Impact    Internal config on a public page. Looks like a leak. Is a leak of how to get in.
Fix       Shipped. Removed from nav and footer. Unsigned /access is 404 via page and proxy.
          Form no longer names env vars. Login remains unlisted at /admin/login.
Effort    S
```

---

## Five people. Where they stop.

### 1. CTO, US company, 90 seconds, laptop

Lands on `/`. Hero: "Everyone gets to 80%. We ship the rest." "They vet the person." Sample portal with three hostnames. Does not yet know this is a Lahore studio that finishes stuck products.

Clicks **Check · $1,500** because that is the only priced action in the bar. Does not find Pricing. Does not find the free Read.

If they last 90 seconds they may reach THE RECORD or THE TERMS. More likely they leave at the hero because they cannot name the service.

**Stops:** first screen. **Confused by:** they / we, Check, three hosts. **Leaves:** before Pricing.

### 2. Founder, launch moved twice, phone, night

Lands on `/` or `/read` from a late search. On a phone the masthead is Menu. Menu has no Pricing, no Read, no Contact. Difference table is `min-w-[36rem]` and scrolls sideways.

If they reach `/read`, Write Aneeb is five steps after Pricing promised "no form beyond your email." Keyboard fights a stepped form at 1am.

**Stops:** menu or the Read form at step 2. **Confused by:** why Check is the only button. **Leaves:** after the sideways table or the third question.

### 3. Procurement, terms, pricing, security

Looks for Pricing in the header. It is not there. Footer, after a long Studio list.

`/pricing` is good for them: six prices, included, not included, PO, W-8BEN, no discount.

Then `/security`: vendor names, no regions, no SOC 2 line, no never-do. Must go to `/legal/data` for the real answer.

`/legal` says draft, not in force, while the sales pages sell HIPAA hospital work.

**Stops:** legal register. **Confused by:** draft vs "the forms we actually sign." **Leaves:** if counsel will not accept draft documents.

### 4. Engineer considering applying

`/careers` is clear: five gates, no candidate fee. Then a published sample diagnostic URL. `/standard` repeats the five gates in full. Team says "admitted" and "Gate 4."

**Stops:** Gate 0 brief, or the sample token. **Confused by:** whether they are applying or taking a public exam. **Leaves:** if the process feels like theatre.

### 5. LinkedIn DM onto `/work/deepidv` (most traffic)

This is the important one.

Ten seconds: "LOT 031 · engagement." "This is the platform's file on one engagement. Assignment first." A waveform called a trace. Assigned / Arrived / Closed. Grade: unsound. Integration-blocked on arrival.

The client's problem (compliance path demo-tight, not proven on production data) sits **below** the filing chrome.

Hero has no action. The Check appears at the bottom in PageClose, after a long file.

A CTO who got a DM about DeepIDV wanted: what was stuck, what you did, what it cost to start. They got a lot file.

**Stops:** above the condition paragraph, or at PageClose if they finish. **Confused by:** LOT, trace, arrived, unsound. **Leaves:** without knowing the Read is free.

---

## What each page is for

| Page | For | Who | One action | Stranger knows in 10s? |
|---|---|---|---|---|
| `/` | Prove the studio, start a Check | Buyers who already know you | Start the Check | No |
| `/pricing` | Publish every price | Anyone comparing | Start the Read | Yes, if they found the page |
| `/read` | Free written reply | Unsure visitors | Send it to Aneeb | Partially. Person-first, not "free read" |
| `/session` | Book 90 minutes, $400 | Early / no-code | File the brief | Price is in the kicker, not a hero button |
| `/check` | Reserve the $1,500 diagnostic | Stuck-build buyers | Reserve a slot | Yes |
| `/first-slice` | Buy two weeks, $7,500 | Prototype-to-prod | File the brief | Yes on scope, no hero button |
| `/work` | Case list | Evaluators | Open a lot | "A database of projects" |
| `/work/[slug]` | One engagement file | Technical buyers | Read, then Check | No. Filing language first |
| `/demo` + 8 views | Sample Close portal | Evaluators | Start a Check | Yes: labelled sample |
| `/team` | The twelve | Buyers and candidates | Open a person or Match | "Admitted" is not "team" |
| `/team/[slug]` | One person record | Someone choosing who | Write {name} | Hybrid: quotes plus database |
| `/direct` | Pick a person and write | Buyers who want a name | File it for them | Yes. Clearest people path |
| `/how-it-works` | End to end process | Evaluators | Start with the Read | Process doc, yes-ish |
| `/standard` | How you hire | Candidates, some buyers | Read gates | Internal rubric |
| `/match` | Paste a wound, get a name | People with a paragraph | Read it | Unique, jargon-heavy |
| `/second-chair` | After launch | Teams you already shipped | Write Hassan | Fairly clear |
| `/about` | Who you are | Culture check | Start (Read) | Yes. Best company page |
| `/careers` | Apply | Engineers | Apply in five steps | Yes |
| `/notices` | Objections | Skeptics | Read, then Check | Yes |
| `/contact` | Write without a product | Anyone | Send | Yes, after Part 0 |
| `/security` | Claims to vendors | Security / procurement | Go to /legal/data | Thin |
| `/legal` | Document register | Counsel | Open a doc | Yes, and it says draft |
| `/legal/data` | Transfers, Pakistan, SCC | Counsel | Read | Yes, and honest |
| Private tokens | Delivered work | Invited people | Next step on the token | N/A for strangers |
| 404 | Recover | Lost people | Home or /work | On-brand, only two exits |
| error | Recover | Broken render | Try again | Apologises |

---

## Findings

Severity: Critical = untrue, broken, exposed, or losing leads today. High = conversion or trust this week. Medium = this sprint. Low = backlog.

Effort: S under an hour. M half a day. L more than a day.

### Chrome and navigation

```
ID        F-001
Page      all
Section   Masthead
Lens      Hierarchy
Severity  Critical
Found     The only priced action in the bar is Check · $1,500. No Read. No Pricing. No Contact.
Impact    Every page steers a stranger to a $1,500 offer. The free door is in the footer.
Fix       One persistent action: Start free, or Check, chosen on purpose. Do not hide Read.
Effort    S
```

```
ID        F-002
Page      all
Section   Masthead
Lens      Navigation
Severity  High
Found     Five items: Record, Admitted, Check, How, Assign. Pricing is missing.
Impact    Procurement and any price-shopper must hunt the footer.
Fix       Work, Team, Pricing, Process, Match. Action: Read or Check. Five plus one.
Effort    S
```

```
ID        F-003
Page      all
Section   Masthead
Lens      Comprehension
Severity  High
Found     Record, Admitted, Assign are our words. They are not English for work, team, match.
Impact    A CTO should not need a glossary to use the header.
Fix       Rename for strangers. Keep Record in the codebase.
Effort    S
```

```
ID        F-004
Page      all
Section   Footer Studio column
Lens      Density
Severity  High
Found     Seventeen studio links in one column.
Impact    Looks like you could not decide what mattered. Read is lost in the list.
Fix       Four columns, three to five links each. Ladder extras live on /pricing.
Effort    M
```

```
ID        F-005
Page      all
Section   DirectStrip
Lens      Hierarchy
Severity  Medium
Found     Every page closes with "Twelve specialists. Write to one directly."
Impact    A third CTA after Check and whatever the page asked for.
Fix       Hide on intake pages. One strip on /team and /direct only.
Effort    S
```

```
ID        F-006
Page      all
Section   PageClose
Lens      Hierarchy
Severity  High
Found     Work, team, standard, notices end on Start the Check · $1,500. Read is free and absent.
Impact    Mid-site landings (persona 5) are forced to the paid diagnostic.
Fix       PageClose should offer Read first, Check second, on proof pages.
Effort    S
```

```
ID        F-007
Page      all
Section   PageHero default
Lens      Hierarchy
Severity  High
Found     Default actionLabel is Start the Check · $1,500. Many pages hide it instead of replacing it.
Impact    Either Check, or no action at all. No middle.
Fix       Default to the page's one action. Do not default every hero to Check.
Effort    S
```

```
ID        F-008
Page      404
Section   Recovery
Lens      Navigation
Severity  Medium
Found     Two exits: home and /work. Brief asked for three. Title says "this lot is not in the catalogue."
Impact    A lost visitor on /pricing typo is sent into work language.
Fix       Three real routes: Pricing, Work, Read. Plain title.
Effort    S
```

```
ID        F-009
Page      error
Section   Recovery
Lens      Trust
Severity  Low
Found     "This was not your fault." Brief said neither 404 nor error apologises. Buttons are pills.
Impact    Soft. Not a leak.
Fix       Say what failed and what to do. Try again. Go to /read.
Effort    S
```

```
ID        F-010
Page      all
Section   siteNav in site.ts
Lens      Consistency
Severity  Low
Found     siteNav lists Pricing, Careers, About, Contact. Masthead does not use it.
Impact    Two sources of truth for navigation. One is dead.
Fix       Delete siteNav or wire it. One list.
Effort    S
```

### Homepage

```
ID        F-011
Page      /
Section   Hero
Lens      Comprehension
Severity  Critical
Found     H1: "Everyone gets to 80%. We ship the rest." Dek: "They vet the person. We're accountable for the product."
Impact    A stranger cannot say what you sell. They, 80%, Check, three hosts, sample portal.
Fix       One sentence in the visitor's words above the fold. Studio in Lahore. Stuck products. We finish them.
Effort    S
```

```
ID        F-012
Page      /
Section   Hero
Lens      Hierarchy
Severity  Critical
Found     Primary: Start the Check. No price in the label. No Read. Footer is where the plain sentence lives.
Impact    First screen asks them to buy a thing they cannot define.
Fix       Primary: Write us free. Secondary: See the work. Check later.
Effort    S
```

```
ID        F-013
Page      /
Section   Hero SamplePortal
Lens      Friction
Severity  High
Found     Three hostnames and a live sample (42% of the lock, Scope v3, findings) before the offer exists.
Impact    Looks like three products. Looks like an internal demo.
Fix       One host. Move the sample below the offer, or cut it from the first screen.
Effort    M
```

```
ID        F-014
Page      /
Section   THE READING
Lens      Comprehension
Severity  Critical
Found     "Tap what is already true." Verdicts. Signals. Lot. Trace.
Impact    Internal ontology before English. Persona 1 leaves here if they got past the hero.
Fix       Symptoms in their words. Keep the viz. Drop the word trace from copy.
Effort    M
```

```
ID        F-015
Page      /
Section   THE READING
Lens      Hierarchy
Severity  High
Found     Note mentions the free Read. Button is "Five days. A verdict." to /check.
Impact    The interactive section sells Check.
Fix       Button: Get the free Read.
Effort    S
```

```
ID        F-016
Page      /
Section   THE DIFFERENCE
Lens      Mobile
Severity  High
Found     Table min-w-[36rem] with overflow-x-auto.
Impact    Night-phone founder scrolls sideways and misses the bpulse column. Needs founder eyes.
Fix       Stack two columns on small screens.
Effort    M
```

```
ID        F-017
Page      /
Section   THE RECORD
Lens      Comprehension
Severity  High
Found     "What arrived unfinished." Lot. Crew-asserted figures stay tagged.
Impact    Filing language on a marketing page.
Fix       Heading: Work we finished. Link: All case studies.
Effort    S
```

```
ID        F-018
Page      /
Section   THE STANDARD
Lens      Density
Severity  High
Found     Five gates in full, plus commitments, plus twelve portraits. Same gates on /standard and /careers.
Impact    Three full explanations of one hiring process. Buyer did not ask.
Fix       Home: one line and a link. Full gates once, on /standard or /careers.
Effort    M
```

```
ID        F-019
Page      /
Section   THE VIEW
Lens      Accessibility
Severity  High
Found     Tabs without aria-controls / tabpanel ids. CheckReports does this correctly.
Impact    Keyboard and AT users lose the sample.
Fix       Copy the CheckReports tab pattern.
Effort    S
```

```
ID        F-020
Page      /
Section   THE TERMS
Lens      Hierarchy
Severity  High
Found     First time Read is a real button, after six sections. Gold room also mounts PulseCheckIntake for the Check.
Impact    Two intakes on one gold band. Check wins visually.
Fix       Gold: Read only. Check form stays on /check.
Effort    M
```

```
ID        F-021
Page      /
Section   THE QUESTIONS
Lens      Density
Severity  Medium
Found     Six long answers, no collapse. Same questions live on /pricing.
Impact    Scroll fatigue. Two sources to keep honest.
Fix       One FAQ source. Home links. Pricing hosts. Or the reverse.
Effort    M
```

```
ID        F-022
Page      /
Section   THE QUESTIONS close
Lens      Hierarchy
Severity  Medium
Found     "The Read is free. The Check is $1,500." links only to /check.
Impact    The sentence names both. The click is Check.
Fix       Two links, or link /pricing.
Effort    S
```

### Funnel

```
ID        F-023
Page      /pricing
Section   The ladder, Read card
Lens      Truth
Severity  Critical
Found     "No call, no form beyond your email."
          readScript is five fields: product, stage, shipWound, duration, identity.
Impact    You told them the free thing is an email. It is an interview.
Fix       "Five short questions. A written reply in one business day."
Effort    S
```

```
ID        F-024
Page      /pricing
Section   Which one are you
Lens      Hierarchy
Severity  High
Found     Best self-selection on the site sits in section 03. Read is last: "No idea where you are."
Impact    Read looks like a consolation prize. The table should be the first thing after prices.
Fix       Move the routing table up. Make Read the recommended start, not the leftover.
Effort    S
```

```
ID        F-025
Page      /pricing
Section   Close and Standing cards
Lens      Friction
Severity  Medium
Found     Close goes to /how-it-works. Standing goes to /second-chair. No dedicated Close page.
Impact    Clicking a price does not always land on that offer.
Fix       Say so on the card, or add a Close page.
Effort    M
```

```
ID        F-026
Page      /read
Section   Offer
Lens      Hierarchy
Severity  Medium
Found     H1 is Write Aneeb. Free and one business day are in the dek and pledge.
Impact    The free offer does not say free in the title.
Fix       Title that a stranger can repeat: Free read. One business day.
Effort    S
```

```
ID        F-027
Page      /read
Section   Sample
Lens      Hierarchy
Severity  High
Found     The specimen is below the form. User commits before seeing what they get.
Impact    Trust should come first on a free offer.
Fix       Sample above the form, or a short excerpt beside it.
Effort    M
```

```
ID        F-028
Page      /read
Section   Start
Lens      Friction
Severity  Medium
Found     Write Aneeb links to #offer, the section top, not #intake.
Impact    Extra scroll to the field.
Fix       href="#intake"
Effort    S
```

```
ID        F-029
Page      /read
Section   Masthead
Lens      Hierarchy
Severity  High
Found     On the free page, the bar still says Check · $1,500.
Impact    The page and the chrome argue.
Fix       Page-aware action, or always Read in the bar.
Effort    M
```

```
ID        F-030
Page      /session
Section   Hero
Lens      Hierarchy
Severity  High
Found     hideAction. $400 lives in the kicker. Start is at the bottom after in/out.
Impact    A $400 offer with no above-fold action.
Fix       Hero: Book · $400.
Effort    S
```

```
ID        F-031
Page      /session
Section   Intake
Lens      Friction
Severity  High
Found     BriefIntake type="start": name, company, email, idea, spec, budget. Six fields.
          Same set as First Slice.
Impact    Ninety minutes should not need a new-product questionnaire.
Fix       Session-specific fields. The rescue set already exists and is unused.
Effort    M
```

```
ID        F-032
Page      /first-slice
Section   Hero
Lens      Hierarchy
Severity  High
Found     hideAction on a $7,500 offer.
Impact    Highest fixed price, no button until the user scrolls.
Fix       Hero: Start · $7,500.
Effort    S
```

```
ID        F-033
Page      /first-slice
Section   Intake
Lens      Truth
Severity  High
Found     Same start fields as Session. Spec vs idea. Wrong for "one thing that works."
Impact    The form does not match the offer.
Fix       Ask for the one thing, the repo, the deadline.
Effort    M
```

```
ID        F-034
Page      /check
Section   Start
Lens      Friction
Severity  High
Found     ConditionDesk can be seven steps. Button: File · $1,500. Header: Reserve. No payment yet.
Impact    File sounds like pay. Seven steps after a long page.
Fix       Short reserve: name, email, repo. Detail after confirm. Button says Reserve.
Effort    L
```

```
ID        F-035
Page      /check
Section   Who runs it
Lens      Comprehension
Severity  Medium
Found     Admission. Deployments led. Signals closed.
Impact    HR file, not "who will be in your repo."
Fix       Buyer labels: years shipping, products led, what they fixed.
Effort    S
```

```
ID        F-036
Page      /check
Section   Start success
Lens      Consistency
Severity  Medium
Found     "He reads it tomorrow" vs "within one business day" everywhere else.
Impact    Two clocks.
Fix       One phrase, site-wide.
Effort    S
```

```
ID        F-037
Page      /session and /first-slice
Section   Below intake
Lens      Density
Severity  Medium
Found     Full PricingLadder repeated under both intakes.
Impact    Six more links after they already chose.
Fix       One line: See all prices, link /pricing.
Effort    S
```

### Proof

```
ID        F-038
Page      /work
Section   Hero
Lens      Comprehension
Severity  High
Found     "Delivery history. Maintained." "The delivery record the platform maintains."
Impact    Persona 5's list page sounds like ops, not case studies.
Fix       Work. What we shipped. What was stuck when we arrived.
Effort    S
```

```
ID        F-039
Page      /work
Section   Close
Lens      Hierarchy
Severity  Medium
Found     hideAction on hero. Only PageClose sells, and it sells Check.
Impact    No above-fold next step.
Fix       Hero secondary: Start free.
Effort    S
```

```
ID        F-040
Page      /work/deepidv
Section   Hero
Lens      Comprehension
Severity  Critical
Found     LOT 031. Platform file. Assignment first. Trace. Arrived. Closed. Unsound.
          The actual problem is lower: compliance path demo-tight, not proven on production data.
Impact    LinkedIn traffic hits our filing system, not their problem.
Fix       Lead with the client's stuck state in one sentence. Then the file.
Effort    M
```

```
ID        F-041
Page      /work/deepidv
Section   Outcome
Lens      Hierarchy
Severity  High
Found     Outcome is after assignment, grade, condition, findings, stage rail.
Impact    Process first. Result last. CTOs skim the opposite way.
Fix       Outcome and limits at the top, equal weight, then the file.
Effort    M
```

```
ID        F-042
Page      /work/sully
Section   ProofRow
Lens      Trust
Severity  High
Found     450+ orgs, 5M+ tasks on the page. Limits say client-reported, not audited. Caveat is below.
Impact    A skeptic sees a big number, then a footnote. Feels like marketing.
Fix       Tag the number where it sits. Same for DeepIDV 211 countries.
Effort    S
```

```
ID        F-043
Page      /work/wearmeout
Section   Header
Lens      Trust
Severity  Medium
Found     LOT 036 · crew-reported, unverified. Live URL is onrender.com.
Impact    Honesty is good. Mixed with client-listing lots in one index without a visual tier.
Fix       Two lists, or a mark on the index row, not only on the slug.
Effort    M
```

```
ID        F-044
Page      /work/[slug]
Section   Unknown slug
Lens      Truth
Severity  High
Found     getLot throws. Curl of a missing slug was 500, not 404.
Impact    Broken state. Looks unmaintained.
Fix       notFound() on unknown slugs. Same for getSpecialist.
Effort    S
```

```
ID        F-045
Page      /demo
Section   Entry
Lens      Navigation
Severity  Medium
Found     Best proof that the portal is a sample. Buried in a 17-link footer.
Impact    Evaluators who need it cannot find it. Casual visitors who find it get eight tabs.
Fix       Link from /how-it-works and /about only. Sub-views stay inside /demo.
Effort    S
```

```
ID        F-046
Page      /how-it-works
Section   Portal
Lens      Truth
Severity  Low
Found     Copy admits portal screenshots are not on file yet.
Impact    Honest. Keep it. Do not imply the portal is live beyond /demo.
Fix       None. Do not "improve" this into a lie.
Effort    —
```

### People

```
ID        F-047
Page      /team
Section   Hero
Lens      Comprehension
Severity  High
Found     Admitted to the standard. The platform assigns from this bench.
Impact    Reads like a clearance roster, not people you can hire.
Fix       These twelve ship. Pick one, or describe the stuck part.
Effort    S
```

```
ID        F-048
Page      /team
Section   Rows
Lens      Friction
Severity  High
Found     Twelve rows of name, standing, status. No "start here." writeAbout is not on the index.
Impact    Cannot pick who to contact without reading twelve profiles.
Fix       Three featured. Rest behind "everyone." Or send them to /direct cards with writeAbout.
Effort    M
```

```
ID        F-049
Page      /team/[slug]
Section   Body
Lens      Comprehension
Severity  Medium
Found     Admission, assignment history, signals closed, engagements as a trace.
Impact    Database record with a philosophy paragraph taped on.
Fix       Lead with one sentence in their voice. Move the ledger down.
Effort    M
```

```
ID        F-050
Page      /team/zaira
Section   Photo
Lens      Trust
Severity  Medium
Found     Initials. The "not a hole" line is in metadata, not on the page.
Impact    Looks unfinished unless you already know the rule.
Fix       One line on the page: Photograph not on file yet.
Effort    S
```

```
ID        F-051
Page      /direct
Section   Cards
Lens      Trust
Severity  Medium
Found     Madiha is on Direct with "Operations · not client-facing."
Impact    Pick a lane. A buyer should not write someone who will not reply as owner.
Fix       Remove non-client-facing people from /direct.
Effort    S
```

```
ID        F-052
Page      /direct
Section   Page
Lens      Comprehension
Severity  Low
Found     "Twelve specialists. Write to one." One business day. Not a chatbot.
Impact    Clearest people path. Keep this. Do not bury it.
Fix       Promote from footer dump to Company column. Three to five links.
Effort    S
```

### System

```
ID        F-053
Page      /how-it-works
Section   SignalPlate
Lens      Comprehension
Severity  Medium
Found     "The ladder · published." "The rungs before it."
Impact    We need the concept. They do not need the word rung.
Fix       How we work together. Six offers, published.
Effort    S
```

```
ID        F-054
Page      /how-it-works
Section   Chrome
Lens      Consistency
Severity  Medium
Found     Still PageHero + SignalPlate, not the ribbon used on /read and /pricing.
Impact    Same studio, two visual systems. Feels unfinished.
Fix       Same rooms as /pricing. Needs founder eyes.
Effort    M
```

```
ID        F-055
Page      /standard
Section   Gates
Lens      Density
Severity  High
Found     Full five gates plus rubric. Also on / and /careers.
Impact    Buyers get an HR manual. Candidates get it three times.
Fix       One canonical page. Others summarise and link.
Effort    M
```

```
ID        F-056
Page      /match
Section   Explainer
Lens      Density
Severity  High
Found     Long pipeline with bg-partial, bg-ink, multiple signal plates before the desk.
Impact    Gold more than once. Cards. A CTO with a paragraph wanted a box, not a lecture.
Fix       Desk first. Working shown after submit. One gold.
Effort    M
```

```
ID        F-057
Page      /match
Section   Promise
Lens      Truth
Severity  Low
Found     No model. No score. Engine routes weak matches to Aneeb.
Impact    Honest. Keep it.
Fix       None.
Effort    —
```

```
ID        F-058
Page      /second-chair
Section   Proof
Lens      Truth
Severity  Low
Found     Content: no client has bought Second Chair yet. Proof does not render.
Impact    Rare and correct. If the UI ever invents a case study, that is a Critical.
Fix       Keep the empty state visible.
Effort    —
```

```
ID        F-059
Page      /second-chair
Section   Tiers
Lens      Consistency
Severity  Medium
Found     On Call $900/mo matches standingMin. Second Chair $2,400 and audit $4,000 are not on the main ladder card.
Impact    Two price stories. Not wrong. Easy to miss.
Fix       One line on /pricing Standing card: tiers on /second-chair.
Effort    S
```

### Company and legal

```
ID        F-060
Page      /about
Section   Whole
Lens      Comprehension
Severity  Low
Found     Lahore. Twelve. Stuck products. Beliefs link to records.
Impact    Best company page. A stranger gets it.
Fix       Do not rewrite this into platform voice.
Effort    —
```

```
ID        F-061
Page      /careers
Section   Sample token
Lens      Security
Severity  High
Found     Public copy has linked /careers/diagnostic/Q7m2Lc9rT4vN8xPw.
Impact    A private-shaped URL is a marketing link. Tokens look like a pattern.
Fix       Remove the public token. If you need a sample, use /standard copy, not a live token route.
Effort    S
```

```
ID        F-062
Page      /careers
Section   Rejection
Lens      Security
Severity  Medium
Found     No rejection-email-first path. Advance exists. Reject does not.
Impact    A candidate can be moved in studio with no mail. Brief said a rejection is an email first.
Fix       Reject writes mail, then status. No silent gate change.
Effort    M
```

```
ID        F-063
Page      /notices
Section   PageClose
Lens      Consistency
Severity  Medium
Found     "Still a question? Five days, or write the studio."
Impact    Five days is the Check. Reply SLA is one business day.
Fix       Separate the two clocks in that sentence.
Effort    S
```

```
ID        F-064
Page      /security
Section   Data handling
Lens      Truth
Severity  High
Found     Vendor names only. No regions. No never-do. No SOC 2 Type I targeted. Em dash in the list (code).
Impact    Procurement arrives and finds an appendix, not a security page.
Fix       Every claim a row: fact, where in code or /legal/data. Honest SOC 2 line.
Effort    M
```

```
ID        F-065
Page      /legal
Section   Register
Lens      Trust
Severity  High
Found     Draft. Pending legal review. Not in force. Sales pages sell hospital HIPAA work.
Impact    Counsel will stop. Or they will think the rest of the site is also draft.
Fix       Keep the banner until a solicitor removes it. Do not imply docs are live. Founder-blocked.
Effort    S to keep. L to make true.
```

```
ID        F-066
Page      /legal/[slug]
Section   Metadata
Lens      Navigation
Severity  Medium
Found     No Breadcrumb JSON-LD. Work and team slugs have it.
Impact     Nested legal URLs look like orphans to machines.
Fix       Same BreadcrumbList helper already in src/lib/JsonLd.tsx.
Effort    S
```

```
ID        F-067
Page      /legal/data
Section   Whole
Lens      Trust
Severity  Low
Found     Pakistan position, SCC, TIA, measures in place / not claimed / intended.
Impact    Strongest trust page. Keep it. Point /security here in one sentence at the top.
Fix       Link from /security hero, not only the body.
Effort    S
```

### Private and security

```
ID        F-068
Page      /admin
Section   Unsigned
Lens      Security
Severity  Low
Found     Layout and proxy 404 when logged out. /admin/login remains for magic link, unlisted.
Impact    Correct after Part 0. Verify on a deployed host, not only local.
Fix       curl -I on preview. Founder-blocked on preview URL.
Effort    S
```

```
ID        F-069
Page      /
Section   Signed-in redirect
Lens      Security
Severity  Medium
Found     proxy.ts: if session and path is /, redirect to /admin.
Impact    A shared laptop on bpulse.dev reveals staff. Home is not home.
Fix       Do not hijack /. Admin stays at /admin.
Effort    S
```

```
ID        F-070
Page      all
Section   Masthead when signed in
Lens      Security
Severity  Medium
Found     Open admin replaces Check in the public bar.
Impact    Session visible to anyone looking at the screen.
Fix       Admin chrome only on /admin. Public bar unchanged.
Effort    S
```

```
ID        F-071
Page      /studio/*
Section   APIs
Lens      Security
Severity  High
Found     Studio pages exist. Proxy gates them now. Confirm /api/careers/admin still 404s unsigned on preview.
Impact    LAUNCH-STATE said these APIs were open. Code now checks session. Deploy must match.
Fix       curl the admin APIs logged out on preview. Treat a 200 as Critical.
Effort    S
```

```
ID        F-072
Page      email
Section   src/lib/email.ts
Lens      Security
Severity  Medium
Found     No RESEND_API_KEY: log payload to console. No Check-confirmed, application, gate, or report templates.
Impact    Misconfigured prod leaks intake to logs. Missing mails mean silent ops.
Fix       Refuse boot without mail in production. Add the four templates. Plain text on each.
Effort    M
```

```
ID        F-073
Page      /report/[slug]
Section   Follow-up
Lens      Security
Severity  Medium
Found     View log writes slug and time. No admin follow-up queue UI wired to it in the public tree we walked.
Impact    The highest-value ops screen in the brief may still be missing or thin.
Fix       Confirm /admin?view=follow-up against real data. If empty by design, say so.
Effort    M
```

```
ID        F-074
Page      robots / sitemap
Section   /read and /match
Lens      Security
Severity  Medium
Found     Both landings are in the sitemap. robots disallows /read/ and /match/.
Impact    Tokens are blocked. Landings may confuse crawlers on slash rules.
Fix       Keep landings allowed and indexed. Keep token prefixes disallowed. Confirm with a crawler.
Effort    S
```

### Consistency, vocabulary, motion, a11y, perf

```
ID        F-075
Page      many
Section   Vocabulary
Lens      Comprehension
Severity  Critical
Found     LOT, the record, trace, signals, arrived, closed, admitted, standing, deployment, ladder, rung.
          Used in nav, heroes, lot files, team, match, pricing start line.
Impact    The site is optimised for people who already work here. That is the one thing in the brief.
Fix       Customer words on every public surface. Internal words stay in code and /studio.
          Suggested map is in the brief. Use it. Argue exceptions below.
Effort    L
```

```
ID        F-076
Page      many
Section   Primary CTA
Lens      Hierarchy
Severity  Critical
Found     Distinct conversion labels include: Start the Check, Check · $1,500, Start with the Read,
          Write Aneeb, Send it to Aneeb, File it for {name}, File the Check, File · $1,500,
          Reserve a slot, Book the Check, Book 20 minutes, Describe what's stuck, Start,
          Apply in five steps, Or write the studio, Write {name}.
Impact    There is no one primary action. Check wins by volume, not by fit.
Fix       Decide: strangers start at Read. Named buyers start at Check. Chrome matches that.
Effort    M
```

```
ID        F-077
Page      many
Section   Gold
Lens      Consistency
Severity  Medium
Found     /match uses several signal plates. Home Terms is gold and also has a Check form.
Impact    One-gold rule is broken where the page is already confusing.
Fix       One signal room per page. Match: the desk only.
Effort    M
```

```
ID        F-078
Page      many
Section   Counts
Lens      Consistency
Severity  Medium
Found     Twelve specialists, nine lots. Mostly derived from .length. Some copy still says "twelve" in prose.
Impact    Drift risk when the bench changes. Less bad than invented figures.
Fix       All public counts from lots.length and specialists.length.
Effort    S
```

```
ID        F-079
Page      /work/[slug] /team/[slug] /legal/[slug]
Section   OG images
Lens      Trust
Severity  Medium
Found     Work, team, report, read-token, check, second-chair, root have OG. Funnel landings share brand.ogImage.
          Legal slugs have none of their own. Slack/LinkedIn paste not run.
Impact    A DM to /pricing or /read may unfurl the generic card.
Fix       Per-route OG. Then paste real URLs. Needs founder eyes.
Effort    M
```

```
ID        F-080
Page      many
Section   Descriptions
Lens      Consistency
Severity  Medium
Found     Unique descriptions not proven. pageFrame is reused as meta. Title template adds · bpulse.
Impact     Duplicate or thin snippets. Not traced pair-by-pair in this pass.
Fix       Table of title + description for every route. Fail the build on duplicates. Fail over 60 / 160.
Effort    M
```

```
ID        F-081
Page      /
Section   Metadata title
Lens      Comprehension
Severity  Low
Found     Home title involves "The catalogue" in older framing. Tab may not say what you do.
Impact    Weak SERP and tab.
Fix       Title a stranger would search: Finish the last twenty percent, or similar, under 60 characters.
Effort    S
```

```
ID        F-082
Page      many
Section   Motion
Lens      Performance
Severity  Medium
Found     Reveal, Rise, Stagger, SamplePortal, Match animated reveal, Count (now static).
          Brief said section reveal once, hero mount, trace on tap, hover as border. Nothing else.
Impact    Extra motion on Match and home. Unverified LCP.
Fix       Strip motion that is not on the four allowed events. Needs founder eyes and Lighthouse.
Effort    M
```

```
ID        F-083
Page      /admin
Section   Tables
Lens      Mobile
Severity  Medium
Found     Admin tables min-w-[56rem].
Impact    Ops on a phone is unusable. Code-only. Needs founder eyes.
Fix       Card rows under 40rem.
Effort    M
```

```
ID        F-084
Page      many
Section   Images
Lens      Performance
Severity  Medium
Found     Mix of next/image and raw img. Portraits, lot thumbs, OG. Lighthouse not run.
Impact    Anything under 90 is unmeasured. Cannot claim 90+.
Fix       Lighthouse mobile on the eight routes in the launch brief. Then fix what fails.
Effort    L
```

```
ID        F-085
Page      many
Section   Keyboard
Lens      Accessibility
Severity  Medium
Found     Masthead has a focus trap. Some tabs do not. Placeholders used as the only hint on writes.
          axe not run.
Impact    Cannot claim WCAG. Violations unknown.
Fix       axe every route. Real labels. Visible focus. Do not claim conformance.
Effort    L
```

```
ID        F-086
Page      /pricing
Section   Included
Lens      Comprehension
Severity  Medium
Found     "Live progress in the portal, read from the repository."
Impact    Portal is a sample. Sounds live.
Fix       "You can open a working sample of that log" as on About, or link /demo.
Effort    S
```

```
ID        F-087
Page      many
Section   Orphan components
Lens      Trust
Severity  Low
Found     Twenty unused components remain (IntakeForm, CrewSession UI, ProjectGrid, StickyContact, TierTable, ...).
Impact    Dead UI can be mounted by mistake. CrewSession still holds old hex.
Fix       Delete in the cleanup phase. Already listed in LAUNCH-STATE.md.
Effort    M
```

```
ID        F-088
Page      process.ts
Section   edpulseTracks
Lens      Truth
Severity  Low
Found     Explorer price is the string "$0". Paid ladder tests do not cover this leftover track.
Impact    /edpulse redirects. If this copy surfaces, it is a zero price again.
Fix       Delete edpulseTracks or keep it off every page. Grep before launch.
Effort    S
```

```
ID        F-089
Page      /read specimen
Section   Sample
Lens      Comprehension
Severity  Low
Found     "arrived the same way." Internal verb in the specimen.
Impact    Small. The specimen is otherwise strong.
Fix       "came to us the same way."
Effort    S
```

```
ID        F-090
Page      /check
Section   File button
Lens      Friction
Severity  Medium
Found     File · $1,500 vs Reserve a slot. No payment yet.
Impact    Two verbs for one act.
Fix       Reserve. Everywhere.
Effort    S
```

```
ID        F-091
Page      /work index
Section   Off-site rows
Lens      Trust
Severity  Medium
Found     Some index rows open external sites. Deep lots open /work/[slug].
Impact    Mixed proof in one list. A row can leave the site.
Fix       External rows marked. Or only link what you own.
Effort    S
```

```
ID        F-092
Page      /match/[token]
Section   Result
Lens      Friction
Severity  Medium
Found     Book 20 minutes · write {first}, or Check. Animated reveal.
Impact    Good fork. Motion may hide the decision. Unverified.
Fix       Show the decision immediately. Working below.
Effort    M
```

```
ID        F-093
Page      emails
Section   Subjects
Lens      Consistency
Severity  Low
Found     Intake subject can include an em dash pattern in older code paths. Read and match copy is clean.
Impact    Tiny. Grep email.ts for \\u2014 before launch.
Fix       Same punctuation rule as the site.
Effort    S
```

```
ID        F-094
Page      /legal/[slug]
Section   reviewNote
Lens      Truth
Severity  Medium
Found     Solicitor reviewNote exists in content and is not rendered. Status can say In force while notes say solicitor to do.
Impact    LAUNCH-STATE already flagged this. Public status may overclaim.
Fix       Render the note, or keep every public doc on Draft until review is real.
Effort    S
```

```
ID        F-095
Page      /careers/diagnostic
Section   Variants
Lens      Truth
Severity  Medium
Found     Three scenario keys. marlow and oxide are stubs.
Impact    "Anyone can attempt it" is not three real briefs.
Fix       Finish the two stubs or remove them from the picker.
Effort    M
```

```
ID        F-096
Page      /standard/gate-0
Section   Route
Lens      Navigation
Severity  High
Found     404. Open diagnostic is token-gated under /careers.
Impact    Brief asked for a public door. There is none.
Fix       Public /standard/gate-0 that starts a token, or say the door is apply-first.
Effort    M
```

```
ID        F-097
Page      all
Section   Clicks to Read
Lens      Friction
Severity  Critical
Found     From any inner page: Masthead 0 clicks (absent). Footer 1 click after a long list.
          Hero 0. Persona 5 on DeepIDV: Read is not offered at all.
Impact    The free rung is not one click from anywhere that matters.
Fix       Persistent Read in the bar, or PageClose Read on every proof page.
Effort    S
```

```
ID        F-098
Page      all
Section   Clicks to Pricing
Lens      Navigation
Severity  High
Found     Masthead 0. Footer 1. No header path.
Impact    The page that would have saved the $0 disaster is hidden.
Fix       Pricing in the five.
Effort    S
```

```
ID        F-099
Page      all
Section   Clicks to Contact
Lens      Navigation
Severity  Medium
Found     Footer and some PageCloses. Not in the bar. DirectStrip is a cousin, not Contact.
Impact    Fine for a studio if Read exists. Right now neither is in the bar.
Fix       Contact in footer Company column. Not in the five.
Effort    S
```

```
ID        F-100
Page      /work/deepidv
Section   Status
Lens      Truth
Severity  Medium
Found     Ongoing product ownership plus past-tense outcome.
Impact    Is the engagement live or done?
Fix       One status word, dated.
Effort    S
```

```
ID        F-101
Page      home metadata
Section   /
Lens      Truth
Severity  Low
Found     Home meta lists free Read, $400 Session, $1,500 Check. Body hero does not.
Impact    Google may understand you better than the visitor.
Fix       Same sentence on the first screen.
Effort    S
```

```
ID        F-102
Page      /check
Section   Sits
Lens      Density
Severity  Low
Found     Shows Session, Check, Slice only. Not the six.
Impact    Partial ladder. Link to /pricing is enough.
Fix       Three is fine if /pricing is one click away. It is not. See F-098.
Effort    S
```

```
ID        F-103
Page      cookies / analytics
Section   Policies vs code
Lens      Security
Severity  Medium
Found     Cookie policy: site sets no cookies. Studio session cookie exists for admin.
          Public analytics module was modified outside this audit (uncommitted PublicAnalytics.tsx).
Impact    Policy vs code must be re-read after analytics ships. Do not claim no cookies if a public tracker exists.
Fix       Name first-party cookies that exist. Do not ship analytics that the policy forbids.
Effort    M
```

```
ID        F-104
Page      all
Section   Visual
Lens      Mobile
Severity  High
Found     No real phone pass. No 375 screenshots in this audit. polish-checkpoints/home-375.png exists from an older pass.
Impact    The brief said assume most first visits are mobile. We did not look.
Fix       Founder walks every route at 375. Agent can recapture. Do not treat this audit as a mobile sign-off.
Effort    L
```

---

## Every distinct call to action

Chrome: logo, Record, Admitted, Check, How, Assign, Check · $1,500, Menu, Open admin (signed in), Logout, DirectStrip, footer Work / Studio / Contact / Legal, mailto.

Home: Start the Check, Open a live sample, hostnames, Explore the sample, symptom toggles, See the record, Five days a verdict, The published standard, The whole log, lot links, twelve portraits, view tabs, Explore a real engagement, ladder rungs, Start with the Read, How the five days work, File the Check, The Read is free The Check is $1,500.

Pricing: six cards, six routing rows, Start.

Read: Continue, Back, Send it to Aneeb, see DeepIDV, The Check, Write Aneeb.

Session / Slice: the Read or the Check, File it for Aneeb, six ladder rungs.

Check: Reserve a slot, See a real report, Session, First Slice, report tabs, File · $1,500, runner links.

Work / lots: filters, lot links, PageClose Check, write the studio.

Team / direct: person links, Describe what's stuck, Write {name}, File it for {name}, Start with Aneeb, Match it.

Match: Read it, Book 20 minutes, Or start the Check, Email me this read, Describe it again.

Careers: Apply in five steps, Apply to this role.

About: Start.

How-it-works: Start with the Read, guarantee links.

Report token: Book the Check.

Read token: Write Aneeb, Session, Check.

404 / error: Back to the catalogue, browse the work, Try again.

**Count:** more than 40 distinct labels. **Primary by volume:** Check. **Primary by fit for a stranger:** Read. They are not the same.

**Second-best on every page, if not ready:** the work, or the free Read. Today the second-best is often Contact or Direct, which is a person, not a proof.

---

## Proposed navigation

**Bar, five plus one**

| Label | href |
|---|---|
| Work | `/work` |
| Team | `/team` |
| Pricing | `/pricing` |
| Process | `/how-it-works` |
| Match | `/match` |
| Action | `The Read` → `/read` |

Check stays on `/check` and on pricing. It is not the global action.

This conflicts with the current decision that Check is the commercial default. The case: most traffic will not be ready for $1,500. Persona 5 never sees Read. A published ladder with a hidden free rung is a prop.

**Footer, four by four**

Work: `/work` `/match` `/demo` `/notices`  
Start: `/read` `/check` `/pricing` `/contact`  
Company: `/about` `/security` `/careers` `/direct`  
Legal: `/legal` `/legal/data` `/legal/terms` `/legal/privacy-policy`

**Everything else:** Session, First Slice, Second Chair on `/pricing`. Standard on `/team` and `/careers`. Demo views inside `/demo`. Handover from `/about` and `/how-it-works`. Notices stays in Work. Hamza stays on legal pages.

---

## Three summaries

### 1. The ten that matter most

Ranked by impact over effort. If only ten get fixed:

| Rank | ID | Why |
|---|---|---|
| 1 | F-023 | Pricing lies about the Read form. One sentence. |
| 2 | F-097 + F-001 | Read is not one click from the places people land. |
| 3 | F-011 + F-012 | Homepage does not say what you do, then sells Check. |
| 4 | F-040 + F-041 | DeepIDV, the DM landing, leads with our file not their problem. |
| 5 | F-002 + F-098 | Pricing belongs in the bar. |
| 6 | F-075 | Vocabulary is the systemic conversion tax. Start with nav and lot heroes. |
| 7 | F-006 | PageClose on proof pages should offer Read. |
| 8 | F-064 | Security page is not a security page. |
| 9 | F-044 | 500 on unknown work/team slugs. |
| 10 | F-061 | Published diagnostic token. |

Part 0 already removed the $0 price, the Contact invoice, and the public Admin Access leak. Those would have been ranks 1 to 3 yesterday.

### 2. The systemic problems

These are one problem each, not thirty tickets.

**The site is written for us.** LOT, record, trace, signals, admitted, standing, deployment, ladder, rung. Consistent. Incomprehensible. The restraint system made this worse by refusing the usual "what we do" block.

**The default action is the Check.** Hero, masthead, PageClose, PageHero, home intake. The free Read is true and hidden. That is not a ladder. That is a single SKU with five other prices in a drawer.

**There is no persistent wayfinding.** Menu plus a huge footer. Pricing, Read, and Contact are footer-only. Persona 3 and persona 5 lose.

**The same thing is explained in full three times.** Gates on home, standard, careers. Ladder on home, pricing, session, slice. FAQ on home and pricing.

**Too many CTAs, one winner.** Forty-plus labels. Check wins. Strangers needed Read.

**Proof is process-first.** Lots are files. Team is a roster. Match is a lecture then a box. The client's problem is always one scroll too late.

**Trust is split.** Limits, notices, /legal/data, and "no client has bought Second Chair" are excellent. Draft legal, client metrics above their caveats, a public diagnostic token, and leftover $0 in edpulseTracks cut the other way.

**We did not watch a stranger, or a phone.** No Lighthouse, no axe, no 375 walk in this audit. Any visual sign-off would be a lie.

### 3. The customer journey, rewritten

**Ideal, from a LinkedIn DM to a paid Check**

1. DM lands on `/work/deepidv`. First screen: the client's stuck state in one sentence. What you did. What it is not. Action: Get a free read. Secondary: See all work.
2. `/read`. Specimen first. Then five questions you already admitted. One business day. No pitch.
3. Private `/read/[token]`. Honest limits. If they want more: Session or Check, priced, no pressure.
4. `/pricing` if they want the map. Routing table first. Six prices. No form to see them.
5. `/check` when they are ready. Reserve, not File. Invoice after a person confirms.
6. `/legal/data` and `/security` available from the footer in four links, not seventeen, for the person who must send this to counsel.

**Where the current site breaks it**

- Step 1 is a lot file with no free action.
- Step 2 is not in the header and is misdescribed on Pricing.
- Step 3 is fine when they get there.
- Step 4 is not in the header.
- Step 5 is offered too early, too often, as the only button.
- Step 6 is a thin security page and a draft register.

---

## Conflicts with things we decided

**Platform vocabulary.** We decided the site is a platform, not a brochure. That decision is costing strangers. Keep the concepts. Change the words on the glass. This is the case against complying.

**Check as the commercial default.** We decided gold and chrome sell the Check. Most traffic will not be ready. A published free rung that is not in the bar is a prop. Change the default to Read. Keep Check as the paid diagnostic.

**No accordion.** We decided everything visible. That is why gates and FAQs appear in full three times. Summarise and link when the thing has its own page. That is not an accordion. That is IA.

**One gold.** Still right. /match and home Terms break it. Fix those, do not drop the rule.

**No cards except objects.** Still right. /match coloured plates are the regression.

**No em dashes.** Still right. /security vendor lines still use one in code.

---

## What is good. Do not break it.

The ladder numbers, once they render, are one source and they match.

The Read pledge: no call, no pitch, we will not follow up twice. The specimen. The after section.

Limits on lots and reports, at equal weight, when the reader reaches them.

Crew-asserted lots saying so.

Second Chair saying it has not been bought.

/legal/data on Pakistan, SCC, TIA, and what you do not claim.

/notices, especially "What are you bad at?"

/about as a company page.

/demo labelled sample on every view.

Docket as one writing instrument.

robots and noindex on tokens and reports. No report index. Unguessable report suffix.

Named people. Initials instead of a grey box.

No competitor names.

The footer sentence: "The last twenty percent is where products get stuck. That is where we work." Put that where people start.

---

## Verify this audit

| Required | Done? |
|---|---|
| Every Part 3 route visited in code | Yes |
| Desktop and real phone | Code only. **No real phone.** F-104 |
| Five personas walked | Yes, above |
| Twelve lenses on every section | Applied in the findings. Not a grid of 12 × N cells. Patterns named instead of 400 duplicate rows |
| Every price, count, date, claim traced | Prices to ladder.ts. One-business-day mapped. Client metrics to lots.ts. Dates on specimens not re-verified |
| Lighthouse every route | **No** |
| axe every route | **No** |
| Every internal link crawled | Source crawl. Not a built-output crawler |
| Every finding has page, section, lens, severity, impact, fix | Yes |
| Three summaries | Yes |

**Open before anyone calls this complete:** real phone at 375, Lighthouse, axe, preview curl of /admin and admin APIs logged out, OG paste, description uniqueness table.

---

## Founder-blocked, still

Neon region. Resend domain. Upstash. Five Vercel env vars. `pnpm db:migrate`. Working preview URL. Photoshoot for Zaira and Mehak. Client logos with permission. Names and quotes with permission. Attribution on six deployments. A solicitor. Portal screenshots. The one-business-day inbox habit.

---

The site is carefully built and hard to arrive at. That is not a failure of craft. It is what happens when the same people write the product and never watch a stranger use it.

The list is the work. Agree it before anyone ships a seventh visual pass.
