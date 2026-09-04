# Founder confirm — lot attribution

Do not fill these from inference. Confirm or leave blank.

Each lot now has `attribution.type`. `confirmedOn` is empty on every lot. A type of `crew-asserted` shows the figures with a visible “crew-reported, unverified” tag. DeepIDV figures stay on the lot page only.

| Lot | What you must confirm | Current type (provisional, from existing sources) |
|---|---|---|
| DeepIDV | Confirm you still want 211+ / sub-150ms cited. Site resolved 5 Sep 2026 and still states both. Set `confirmedOn` if you accept that check date. | `client-listing` · sourceUrl deepidv.com · `confirmedOn` empty |
| Sully.ai | Do 450+ orgs and 5M+ clinical tasks still appear on sully.ai? Date you last checked? | `client-listing` · sourceUrl sully.ai · `confirmedOn` empty |
| myUsta | Confirm live iOS + Android and Albania-wide is still the claim you will stand behind. App Store / Play URLs if you want them cited. | `client-listing` · sourceUrl app.myusta.al · `confirmedOn` empty |
| WearMeOut.ai | Any client-visible figure, or keep crew-asserted? Confirm the Render URL is still the listing. | `crew-asserted` |
| Mythos Archive | Any usage figure, or keep crew-asserted? Confirm mythosarchive.org is yours to cite. | `crew-asserted` |
| SBA 504 Loan Hub | Any traffic or lead figure, or keep crew-asserted? Confirm sba504loanhub.com. | `crew-asserted` |
| Clearance.ai | Any client-reported figure? Confirm clearance.ai resolves and is the listing. | `crew-asserted` |
| Evidero | Any client-reported figure? Confirm evidero.com. | `crew-asserted` |
| Fullscript | Was this a staffed engagement we may list, or a crew-asserted portfolio line? Confirm fullscript.com as source. | `crew-asserted` |

Also confirm, not lots:

- Database region (EU or US) so `/security` can state it.
- Resend sending domain.
- Vercel env: `DATABASE_URL`, `RESEND_API_KEY`, `FOUNDER_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- Client logos in `/public/logos` — keep only those the client shipped or confirmed.
