# Three directions

Written after `VISUAL-RESEARCH.md` was agreed. `src/` was not touched.

Open these in a browser, in this order or any order:

- `visual-directions/01-letter.html`
- `visual-directions/02-tariff.html`
- `visual-directions/03-login.html`

Launcher: `visual-directions/index.html`

Google Fonts load from the network. If a face fails, the stacks still read.

Every figure and sentence on the pages comes from `src/content` (`home.ts`, `ladder.ts`). No invented statistic. No photography. No client marketing screenshot. Portal chrome in direction 03 is the published sample rows from `pulseCopy`, set as type, not a captured product image.

Occupancy numbers below are impressions from the first-window composition at 1440, not histograms.

---

## 01 · Letter

**Bet.** The first window is a letter: type, space, one action, the proof line. Nothing else.

**Palette**

| Hex | Role | Occupancy (impression) |
|---|---|---|
| `#F4EFE6` | Page canvas | ~86% |
| `#1C1916` | Headlines, rules of emphasis, the Read button | ~8% (type + button) |
| `#3F3A33` | Body | ~4% |
| `#6B645A` | Kickers, proof line | ~1% |
| `#D4CDBF` | Hairlines | ~1% |
| `#FBF7F0` | Doubt card, text on the ink button | under 2% |

No gold. No second accent. The button is ink on paper.

**Type.** Source Serif 4 for the claim, the dek, and section titles: this product is a written Read, so the page is allowed to look like reading. IBM Plex Sans for navigation and the door list, so UI does not pretend to be literature. IBM Plex Mono for kickers, the proof line, and the offer names: those are facts.

**First window.** No object. Kicker, the 80% claim, the dek, one pill, the free-read proof line, four trust words. On 375 the pill is full width and the window is a single column with empty paper under it. On 1440 the sheet stays 720px. The right side is unused on purpose.

**Motion.** None. Hover underlines. Focus rings. `prefers-reduced-motion` turns off even smooth scroll.

**What it gives up.** Spectacle. A place to put the portal. A chromatic brand memory. Anyone who needs a picture to believe a studio exists will bounce. It also gives up the current habit of colouring the word "stuck."

**Contrast (computed)**

| Pair | Ratio | AA body |
|---|---|---|
| `#1C1916` on `#F4EFE6` | 15.28 | Pass |
| `#3F3A33` on `#F4EFE6` | 9.83 | Pass |
| `#6B645A` on `#F4EFE6` | 5.10 | Pass |
| `#FBF7F0` on `#1C1916` | 16.39 | Pass |

---

## 02 · Tariff

**Bet.** The first window is the published ladder. You can check every price before any story.

**Palette**

| Hex | Role | Occupancy (impression) |
|---|---|---|
| `#F6F7F4` | Page canvas | ~40% |
| `#FFFFFF` | Rung surfaces | ~35% |
| `#121410` | Headlines | ~6% |
| `#3A3D36` | Body on rungs | ~8% |
| `#5C6058` | Meters, labels | ~3% |
| `#D5D7CF` | Hairlines | ~5% |
| `#1F4D3A` | The Read button only | ~2% |
| `#FFFFFF` on the button | Label | (inside the 2%) |

Cool paper, not ivory. A deep green action, not gold and not Stripe indigo. Green is used once.

**Type.** One family: IBM Plex Sans at 300 for display, 400 for body, 500 for names. IBM Plex Mono for every price and every duration. No serif. A tariff should not look like a letter.

**First window.** The heading is "Every price, published." Then the same-for-everyone sentence. Then the six rungs from `ladder.ts`, with The Read marked recommended in words. On 375 each rung stacks: name, price, meter, body. On 1440 it becomes a ledger row. There is still no picture.

**Motion.** None, same rules as Letter.

**What it gives up.** The 80% recognition line as the first thing you see. Warmth. The feeling of being written to. A 50 year old CTO may prefer this. A 26 year old founder arriving mid-scroll from LinkedIn may not know, in the first two seconds, what we finish.

**Contrast (computed)**

| Pair | Ratio | AA body |
|---|---|---|
| `#121410` on `#F6F7F4` | 17.23 | Pass |
| `#3A3D36` on `#F6F7F4` | 10.27 | Pass |
| `#5C6058` on `#F6F7F4` | 5.97 | Pass |
| `#FFFFFF` on `#1F4D3A` | 9.63 | Pass |

---

## 03 · Login

**Bet.** The first window is the room you get. The portal is the floor. The Read is the only light.

**Palette**

| Hex | Role | Occupancy (impression) |
|---|---|---|
| `#141413` | First-window room | ~55% of the first screen |
| `#1C1B18` | Portal panel | ~20% |
| `#33302A` | Hairlines in the room | ~3% |
| `#F3EFE6` | Type in the room | ~8% |
| `#B8B2A4` | Mute in the room | ~4% |
| `#E6B325` | The Read button only | under 2% |
| `#141413` on gold | Button label | (inside the 2%) |
| `#F7F4EC` | Page after the room | later sections, ~0% above the fold on 1440 |
| `#3D3A33` / `#6B665C` / `#D8D2C4` | Body, mute, rules on paper | later sections |

Gold is back. Only as the action chip. Never as a section fill, never as a link hover, never as a card.

**Type.** Source Sans 3 for the claim: a person talking in a dark room, not a terminal theme. IBM Plex Mono for the portal chrome, the URL, and the prices later: that is the login.

**First window.** Type first, then the portal as a full-width floor, not a right-hand object. The panel uses only `pulseCopy` rows. No traffic-light browser chrome. On 375 the claim and the gold pill come first; the panel is the next screen, not a squeezed companion.

**Motion.** One thing: the word "watching" breathes. It stops under `prefers-reduced-motion`. Nothing else moves.

**What it gives up.** The agreed light default in the first ninety seconds. Quiet. The possibility that this is the portal-card failure again, only larger. A phone at night now opens on black, which can look like every other developer tool. It also spends gold, so gold has to keep earning the button forever.

**Contrast (computed)**

| Pair | Ratio | AA body |
|---|---|---|
| `#F3EFE6` on `#141413` | 16.06 | Pass |
| `#B8B2A4` on `#141413` | 8.73 | Pass |
| `#141413` on `#E6B325` | 9.51 | Pass |
| `#141413` on `#F7F4EC` | 16.77 | Pass |
| `#3D3A33` on `#F7F4EC` | 10.32 | Pass |
| `#6B665C` on `#F7F4EC` | 5.19 | Pass |

---

## How they differ

| | Letter | Tariff | Login |
|---|---|---|---|
| Ground of the first window | Warm paper | Cool paper | Near-black room |
| Type | Serif + grotesque + mono | Grotesque + mono | Grotesque + mono |
| First window | Claim, no object | The six prices | Claim over the portal floor |
| Action colour | Ink | Forest `#1F4D3A` | Gold `#E6B325` |
| Sacrifices | Picture, brand colour | The 80% hook | Light, quiet, gold restraint |

If those three sentences had sounded like "premium, checkable, calm," one would have been wasted. They do not.

---

## Ranking

**1. Letter.** This is the one I would ship. It is the least conventionally impressive. It is also the only one that cannot fail the way the last three heroes failed, because there is nothing on the right to get wrong. It matches the line you adopted. It survives the two facts we have to design around: no photography worth using, and no client screenshot that is our work. On a phone at night it is a readable column. A 26 year old and a 50 year old can both stand it. The leak you named is confidence, not recognition, and this page does not spend the first window on confidence theatre.

**2. Tariff.** The strongest argument for "being able to check everything we claim." If the LinkedIn click is a sceptical CTO, this may convert better than Letter. I rank it second because it postpones the sentence that tells the buyer this page is for them. Prices without the stall can look like a rate card from a shop they did not intend to enter.

**3. Login.** The most designed. The only one that uses the portal, which is the only real visual asset. I still put it last. We have already learned that a portal object in the first window is a weak place to spend attention, and making it the floor does not remove the object. It also breaks the light default in the first ninety seconds and reintroduces gold. If you pick this, pick it because you want the login to be the brand, not because it looks more finished in a tab.

If Letter wins, section 03 (Visibility) can still be the tall portal later. That is the right home for the asset.

---

## Stop

These are proposals. I have not built them into the site. I have not touched `src/`.
