# Instructions for AI/dev (“Droid”) for fixing Google Adsense site reject issue 

Below are task cards you can paste one by one. Each card includes: **Goal → Steps → Acceptance Criteria**. 
---

## Task 1 — Add top navigation & basic UX

**Goal:** Clear, review-friendly navigation.
**Steps:**

* Add a header nav with: **Calculator**, **Methodology**, **Guides**, **About**, **Contact**, **Privacy**, **Terms**.
* Add breadcrumbs on blog posts and a “Related posts” section at the bottom (same category or tag).
* Add a footer with copyright, nav duplicates, and contact email.

**Acceptance Criteria:**

* Every page shows the new header/footer.
* Blog posts show breadcrumbs + 3 related posts.
* No broken links; mobile nav works (hamburger on small screens).

**Prompt to Droid:**
“Update the site layout to include a top navigation (Calculator, Methodology, Guides, About, Contact, Privacy, Terms), breadcrumbs on blog posts, a related-posts block that shows 3 posts from the same category, and a footer with duplicated nav + copyright + contact email. Ensure mobile responsiveness and no CLS issues.”

---

## Task 2 — Create a Methodology page

**Goal:** Prove the calculator is unique and transparent.
**Steps:**

* New page at `/methodology`.
* Sections: Overview, Data sources, How raw → scaled score mapping works (your assumptions), Adaptive module explanation (with examples), Limitations, Worked examples (screenshots or tables), Update log.
* Link this page from the calculator and header.

**Acceptance Criteria:**

* `/methodology` loads, is linked in the header and from the calculator page.
* Page has a table of contents and at least two worked examples.

**Prompt to Droid:**
“Create `/methodology` with sections: Overview, Data Sources, Raw→Scaled Mapping, Adaptive Module Explanation (with example scenarios), Limitations, Worked Examples (tables), Update Log, and an auto-generated table of contents. Add a prominent link to this page from the calculator page and include it in the main nav.”

---

## Task 3 — Publish 10 foundational SAT guides

**Goal:** Add substantial, original content.
**Steps:**
Create posts (≥1,200 words each) with original examples, charts/tables you generate, and author bio at bottom. Suggested titles:

1. DSAT Adaptive Modules Explained (with error-pattern case studies)
2. Raw Score to Scaled Score: What Patterns Matter Most
3. Reading & Writing Module: Common traps and timing plans
4. Math Module: Mist-cluster patterns and score impact
5. Practice Test → Real Test: Why Scores Shift
6. Percentiles by Score Band (visual guide)
7. How Many Questions Can I Miss for a 1400/1500?
8. Section Timing Strategies (2–3 templates you can try)
9. Superscoring, Concordance & College Reporting
10. How to Use a Score Calculator Effectively (with examples)

**Acceptance Criteria:**

* 10 posts live under `/guides/slug`.
* Each has an author name + short bio, table of contents, and at least one original table or chart.
* Internal links between related posts.

**Prompt to Droid (repeat per post):**
“Create a markdown/MDX article at `/guides/<slug>` titled ‘<title>’. Include: table of contents, original tables/diagrams (SVG or HTML), 4–6 internal links to relevant pages, and an author box at the end. Avoid copying external text; write original explanations and worked examples.”

---

## Task 4 — Add a Blog/Guides index with categories and search

**Goal:** Make content discoverable.
**Steps:**

* Create `/guides` index page with category filters (Math, R&W, Strategy, Data/Charts) and a search box.
* Show excerpt, read time, last updated date.

**Acceptance Criteria:**

* `/guides` lists all posts with filters + search.
* Search returns relevant posts by title/content.

**Prompt to Droid:**
“Build `/guides` listing page with category filters (Math, Reading & Writing, Strategy, Data/Charts), a client-side search input, read-time, and last-updated labels. Use existing posts in `/guides` directory. Make cards linkable and responsive.”

---

## Task 5 — Consent banner (CMP) + Consent Mode v2

**Goal:** Comply with EU/UK rules.
**Steps:**

* Integrate a Google-certified CMP (e.g., CookieYes, OneTrust, or any TCF-certified CMP).
* Implement Consent Mode v2 (`ad_user_data`, `ad_personalization`) and store consent in localStorage/cookies.
* Update Privacy page: mention the CMP, what users can control, and ad personalisation basics.

**Acceptance Criteria:**

* In EU/UK, a banner appears before ad tags fire; consent choices are honored.
* Privacy page includes a “Manage consent” link that re-opens the banner.

**Prompt to Droid:**
“Integrate a Google-certified CMP with IAB TCF support and wire up Consent Mode v2. Only load AdSense/ads scripts after consent. Add a ‘Manage consent’ link to the Privacy page that re-opens the banner. Document where consent is stored.”

---

## Task 6 — Add AdSense code snippet (verification) to key pages

**Goal:** Let AdSense verify the site.
**Steps:**

* Insert the AdSense verification script (from your AdSense account) on: `/` (home), `/guides`, two individual guide pages, and `/methodology`.
* Load it in a non-blocking way.

**Acceptance Criteria:**

* The script is present on those pages (view source check).
* No console errors; pages remain fast.

**Prompt to Droid:**
“Add the AdSense account verification script (I will paste the snippet) to the following routes: `/`, `/guides`, at least two guide pages, and `/methodology`. Ensure it’s non-blocking and does not break Core Web Vitals.”

---

## Task 7 — robots.txt + sitemap.xml + Search Console

**Goal:** Ensure Google can discover all pages.
**Steps:**

* Create `/robots.txt` allowing all public pages; block only admin/temp.
* Generate `/sitemap.xml` including home, calculator, methodology, guides, and legal pages.
* Add the sitemap URL in Google Search Console.

**Acceptance Criteria:**

* `https://satscorecalculator.io/robots.txt` is reachable and sensible.
* `https://satscorecalculator.io/sitemap.xml` lists all important URLs.
* You can submit the sitemap in GSC without errors.

**Prompt to Droid:**
“Generate `/robots.txt` that allows crawling of all public pages and disallows non-public routes. Generate a dynamic `/sitemap.xml` that includes home, calculator, methodology, all guides, about/contact/privacy/terms. Ensure it updates when new guides are added.”

---

## Task 8 — Performance & mobile checks

**Goal:** Smooth, ad-friendly UX.
**Steps:**

* Fix layout shifts (CLS) from lazy-loaded images/nav.
* Limit sticky elements that overlap content.
* Ensure tap targets are big enough on mobile.

**Acceptance Criteria:**

* Lighthouse: CLS ≤ 0.1, LCP ≤ ~2.5–3.0s on 4G, no overlapping UI.

**Prompt to Droid:**
“Run Lighthouse on mobile and fix CLS/LCP issues. Ensure images have width/height or aspect-ratio, avoid layout jumps, and keep interactive elements accessible. Share before/after metrics.”

---

## Task 9 — ads.txt (after approval)

**Goal:** Revenue integrity.
**Steps:**

* After AdSense approval, create `/ads.txt` with your publisher line (from AdSense).

**Acceptance Criteria:**

* `https://satscorecalculator.io/ads.txt` is reachable and contains your `pub-XXXX` line.

**Prompt to Droid:**
“Once I provide the publisher ID, create `/ads.txt` at the domain root with the exact line from AdSense.”

---

## Task 10 — Re-apply checklist

**Goal:** Only re-apply when ready.
**Steps:**

* Confirm: Methodology page live; 10+ substantial guides live; nav/breadcrumbs/related posts done; CMP banner + Consent Mode v2 working; AdSense snippet present on multiple pages; sitemap + robots live; Lighthouse looks good.

**Acceptance Criteria:**

* All boxes checked.
* Request review in AdSense.

**Prompt to Droid:**
“Create a README checklist in the repo root called `ADSENSE-READINESS.md` listing all items above. Mark each as DONE with links to pages and screenshots where relevant.”

---

# Bonus: quick outlines you can hand to the writer/AI

### Methodology page outline

* What the calculator does (1–2 paragraphs)
* Data inputs & sources (bullet list)
* How raw scores map to scaled scores (step-by-step)
* Adaptive module logic—common paths (3 example tables)
* Edge cases & limitations (transparent notes)
* Worked examples (2–3 tables: “miss X questions here → result Y”)
* Update log (dated entries when you adjust assumptions)

### Each guide template (repeatable)

* Summary (2–3 bullets)
* Why this matters
* The concept, explained simply
* Worked examples (tables/diagrams)
* Common mistakes & fixes
* Quick checklist
* FAQ (5–8 questions)

---

# When to hit “Request review”

* After the 10 guides + Methodology are live, consent banner works in EU/UK, AdSense snippet is present, and the site feels like a small “SAT resource hub,” not just a calculator. That’s the tipping point.
