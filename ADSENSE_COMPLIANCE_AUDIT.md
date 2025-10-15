# AdSense Compliance Audit — satscorecalculator.io

Date: 2025-10-15

This audit reviews the codebase and the live site at https://satscorecalculator.io/ for readiness against Google AdSense requirements, with emphasis on consent, required pages, technical setup, and ad tag behavior.

## Executive Summary

- Overall status: Good foundation (policy pages, ads.txt, sitemap, content, methodology) with critical consent/ad-loading gaps.
- Major blockers for AdSense (esp. EU/UK):
  1) No Google-certified CMP (IAB TCF) in use; current banner is custom and non‑TCF.
  2) AdSense script loads pre‑consent on multiple pages, and ad requests are made before consent is given.
  3) Inconsistent consent UI/logic across pages; a custom “Customize” flow on some pages doesn’t actually grant ad consent due to key mismatches.

If approval targets non‑EU only, item 1 may not hard‑block approval, but it is still required for serving ads to EU/UK users per Google policy. Items 2 and 3 should be fixed regardless.

## What’s Correct and Confirmed

- Required pages present and linked: About, Contact, Privacy Policy (with Consent Mode v2 language), Terms.
- Methodology page implemented and linked; content is substantial and transparent.
- ads.txt exists and is correct: `google.com, pub-6578959056593527, DIRECT, f08c47fec0942fa0` (live verified).
- robots.txt allows crawling and references sitemap; sitemap.xml includes homepage, required pages, tools, and blog posts.
- Consent Mode v2 defaults to denied and GA4 loads only after analytics consent (verified via code and live network: no gtag/js before consent).
- Navigation, internal content, and tools pages are functional and consistent.

## Issues Found (with evidence and fixes)

1) Missing Google‑certified CMP (IAB TCF)
- Evidence: The site uses a custom consent banner (`consent-config.js`, inline banner HTML). No TCF string generation or certified CMP script present.
- Impact: For EU/UK traffic, Google requires a certified CMP for AdSense. Without it, ads may be limited or disallowed in those regions, and approval can be affected.
- Fix: Integrate a Google‑certified CMP (e.g., CookieYes/OneTrust/Cookiebot with TCF v2.2), wire it to Consent Mode v2, and ensure a TCF string is passed to Google tags. Keep the “Manage Consent” entry points.

2) AdSense loads pre‑consent and makes ad requests
- Evidence (code): Direct AdSense tag present in many pages, e.g. `index.html`, `methodology.html`, blog pages, tools pages:
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578959056593527`
- Evidence (live network): On first load (before clicking the banner), the browser fetched `adsbygoogle.js` and made requests to `googleads.g.doubleclick.net/pagead/ads?...`.
- Impact: Ads script and ad requests occur before the user’s consent choice, contradicting the stated intent to gate ads behind consent; may affect compliance and user trust.
- Fix: Remove all direct AdSense script tags from every page and load AdSense only via `ConsentManager.loadAdSense()` after ads consent is granted. Keep Consent Mode defaults denied until user action.

3) Inconsistent consent UI/logic; “Customize” saves don’t enable ads on some pages
- Evidence (code): `consent-config.js` expects preference keys `analytics`, `ads`, `personalization`. Some pages use a legacy modal that sets `{ analytics, advertising, functional }` via `saveCustomConsent()`, then calls `ConsentManager.saveCustom(preferences)`. Because `advertising !== ads`, `updateGoogleConsent` interprets ads as false/undefined.
- Impact: Users who toggle “Advertising” on legacy pages won’t actually grant ad consent; ads remain denied. Behavior differs between pages that use `consent-settings-modal` vs legacy `consent-modal`.
- Fix: Standardize on one consent UI and ensure the keys match `ads` and `personalization`. Update legacy pages’ element IDs and `saveCustomConsent()` mapping to use `{ analytics, ads, personalization }`.

4) Duplicate AdSense load path
- Evidence: `consent-config.js` can load AdSense post‑consent, but pages also include a direct AdSense `<script>`; this risks double-loading and defeats gating.
- Fix: After fixing (2), keep only the consent‑controlled load; remove all direct `<script ... adsbygoogle.js>` tags.

5) No ad unit placeholders yet
- Evidence: No `<ins class="adsbygoogle" ...>` or `data-ad-slot` placements found in the codebase.
- Impact: Not required for approval, but after approval no ads will render without units; also prevents validating layout stability around ads.
- Fix: After approval, add ad unit containers with stable dimensions (to avoid CLS) and load them only when consent allows ads.

6) Minor: Potential header misconfiguration
- Evidence: `vercel.json` sets `Content-Encoding: gzip` for `js|css` files. Unless assets are pre‑compressed, this header can corrupt delivery or bypass Vercel’s automatic compression.
- Impact: Possible breakage for some clients/CDNs; not an AdSense blocker.
- Fix: Remove manual `Content-Encoding` unless you ship pre‑gzipped assets and matching file names.

## Page‑by‑Page Checks (high level)

- Homepage (`/`, `index.html`): Consent banner visible; GA gated; AdSense script present directly — remove and gate behind consent.
- Methodology (`/methodology.html`): Content strong; consent banner present; direct AdSense script present — remove.
- Blog index and posts: Consent script included; some use legacy modal/handlers — unify keys/UI; direct AdSense present — remove.
- Tools pages (`/tools/*`): Functional; direct AdSense present — remove; consent script included.
- Policy pages (`/privacy-policy.html`, `/terms.html`): Present and comprehensive; “Manage Cookie Preferences” works; keep updated after CMP integration.
- robots.txt and sitemap.xml: Present and correct; sitemap lists key pages and tools. Keep lastmod dates current.
- ads.txt: Correct and reachable (live verified).

## Recommended Fix List (prioritized)

1) CMP compliance (Critical)
- Integrate a Google‑certified CMP with IAB TCF support; ensure TCF string is provided to Google tags for EU/UK.

2) Gate AdSense correctly (Critical)
- Remove all direct `adsbygoogle.js?...` `<script>` tags across the site.
- Load AdSense only via `ConsentManager.loadAdSense()` once `ads` consent is granted.

3) Unify and fix consent UI/keys (High)
- Standardize on one consent modal (`consent-settings-modal`).
- Update legacy pages to use IDs `consent-analytics`, `consent-ads`, `consent-personalization` and ensure `saveCustom()` sends `{ analytics, ads, personalization }`.

4) Post‑approval ad units (Medium)
- Add `<ins class="adsbygoogle">` units with fixed sizes/containers on appropriate pages; initialize only after ads consent. Verify no CLS.

5) Headers cleanup (Low)
- Remove manual `Content-Encoding` from `vercel.json` unless assets are pre‑compressed.

## Conclusion

You’ve implemented the required structure, content, policy pages, Consent Mode defaults, and `ads.txt` correctly. The primary gaps are CMP compliance (TCF) and ensuring no AdSense loads/ad requests occur before consent, plus fixing the legacy “Customize” path so ad consent actually updates. Addressing these will align the site with AdSense approval expectations, especially for EU/UK policy compliance.
