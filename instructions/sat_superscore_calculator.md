# SAT Superscore Calculator
## Product Requirements Document (PRD)

---

## 1. INTRODUCTION

### 1.1 Problem Statement
High school students take the SAT multiple times to improve their college admission chances, often achieving their best scores across different test dates. However, students lack a simple, free tool to calculate their superscore—the combination of their highest section scores from multiple SAT attempts. This creates confusion about:
- How to manually combine their best Math and Reading & Writing scores
- What their actual superscore is for college applications
- Which colleges accept superscores and how to strategically plan retakes

Current solutions either require payment, demand user registration, or lack educational context about superscoring policies.

### 1.2 Product Vision
Create the **most accessible, accurate, and SEO-optimized SAT Superscore Calculator** that:
- Requires zero sign-up or payment
- Provides instant, accurate superscore calculations
- Educates students about superscoring policies
- Ranks #1 on Google for target keywords
- Delivers exceptional user experience that encourages sharing and return visits

### 1.3 Success Metrics
- **SEO Goals:** Rank in top 3 Google results for primary keywords within 6 months
- **Traffic Goals:** 3,000-8,000 monthly organic visits within 12 months
- **Engagement:** Average time on page >3 minutes; bounce rate <50%
- **Conversion:** 30%+ calculator usage rate from page visitors

---

## 2. OBJECTIVES & GOALS

### 2.1 Primary Objectives
1. **SEO Dominance:** Capture organic traffic from students searching for SAT superscore calculators
2. **User Value:** Provide the most helpful, accurate superscoring tool available
3. **Educational Authority:** Position the site as a trusted resource for SAT score planning
4. **Zero Friction:** Enable instant calculations without barriers (no login, no payment, no email required)

### 2.2 Business Goals
- Generate 3,000-8,000 monthly organic visits
- Establish domain authority in SAT prep space
- Create linkable asset that attracts natural backlinks
- Build foundation for future monetization (ads, affiliate partnerships)

### 2.3 User Goals
- Quickly calculate SAT superscore across multiple test dates
- Understand what superscoring means
- Learn which colleges accept superscores
- Determine if retaking the SAT could improve their superscore
- Access tool on any device (mobile, tablet, desktop)

---

## 3. TARGET USERS & ROLES

### 3.1 Primary Users
**High School Students (Juniors & Seniors)**
- Age: 16-18 years old
- Taken SAT at least once, planning to retake or apply to colleges
- Tech-savvy, mobile-first users
- Need quick, trustworthy answers
- Pain points: Confusion about score policies, anxiety about college admissions

**Use Cases:**
- Calculate current superscore from 2-3 test attempts
- Determine if retaking SAT is worth it
- Compare superscore vs. single-sitting score
- Verify their manual calculations

### 3.2 Secondary Users
**Parents**
- Age: 40-55 years old
- Supporting children's college application process
- May be less familiar with SAT terminology
- Need clear, simple explanations

**College Counselors**
- Professional guidance providers
- Need quick tool to help multiple students
- Value accuracy and educational content

### 3.3 User Roles & Actions
| Role | Primary Actions | Success Criteria |
|------|----------------|------------------|
| Student | Enter scores, calculate superscore, read policies | Understand superscore in <2 min |
| Parent | Calculate child's superscore, learn about policies | Confidence in score interpretation |
| Counselor | Calculate superscores, reference college policies | Quick access to accurate tool |

---

## 4. CORE FEATURES FOR MVP (MoSCoW METHOD)

### 4.1 MUST HAVE (P0 - Critical for Launch)

#### Feature 1: SAT Superscore Calculator (Core Tool)
**Description:** Interactive calculator allowing students to input multiple SAT scores and instantly see their superscore.

**Functional Requirements:**
- Input fields for up to 4 test dates (covers 95% of use cases)
- Each test date includes:
  - Test date (optional, for student reference)
  - Math score (200-800)
  - Reading & Writing score (200-800)
  - Auto-calculated total for that sitting
- Real-time validation (scores must be 200-800, increments of 10)
- Automatic superscore calculation displayed prominently
- Visual indicator showing which scores were selected for superscore
- Clear formatting with section highlighting (e.g., green background for "best" scores)
- Mobile-responsive design

**User Flow:**
1. User enters Math + R&W scores for Test 1
2. User enters Math + R&W scores for Test 2 (and optionally Test 3, 4)
3. Calculator automatically identifies highest Math score across all tests
4. Calculator automatically identifies highest R&W score across all tests
5. Superscore (sum of best Math + best R&W) displays in large, prominent card
6. Side-by-side comparison shows: Best Single Sitting vs. Superscore

**UI Elements:**
- Clean, distraction-free calculator interface
- Large "Calculate Superscore" button (not needed if auto-calculating)
- Results displayed in prominent blue/green "success" card
- Reset button to clear all entries

#### Feature 2: Educational Content (SEO Foundation)
**Description:** Comprehensive content explaining SAT superscoring, optimized for target keywords.

**Required Sections (800-1000 words total):**

**Above Calculator:**
- H1: "SAT Superscore Calculator Free" (exact match keyword)
- Subheading: "Calculate your SAT superscore instantly. 100% free, no sign-up required."
- Brief intro (2-3 sentences) explaining what tool does

**Below Calculator:**
- **H2: "What Is SAT Superscoring?"**
  - Simple definition in plain language
  - Example scenario with actual numbers
  - Why superscoring benefits students

- **H2: "How to Calculate Your SAT Superscore"**
  - Step-by-step instructions (3 steps)
  - Emphasize ease of use
  - Internal link to calculator above

- **H2: "Which Colleges Superscore the SAT?"**
  - Brief overview (most top colleges do)
  - List 10-15 popular colleges that superscore (MIT, Stanford, Cornell, etc.)
  - Mention exceptions (Harvard, Princeton note highest section scores but don't technically superscore)
  - Disclaimer to check individual college policies
  - External link to College Board's score-use policies

- **H2: "SAT Superscore vs. Single Sitting Score"**
  - Table comparison
  - When superscore matters most
  - Strategic retake advice

- **H2: "Frequently Asked Questions"**
  - 5-7 common questions with concise answers
  - Examples: "Do all colleges accept superscores?" "How many times should I take the SAT?" "Does superscoring work between digital and paper SAT?"

**SEO Requirements:**
- Naturally include primary and secondary keywords
- Use semantic keywords (e.g., "highest section scores," "multiple test dates")
- Include question-based headers for featured snippet opportunities
- Add FAQ schema markup
- Internal links to other tools (GPA Calculator, College Admissions Calculator)

#### Feature 3: Mobile-First Responsive Design
**Description:** Fully responsive, fast-loading design optimized for mobile users (60%+ of traffic).

**Technical Requirements:**
- Mobile-first CSS framework (Tailwind or Bootstrap)
- Touch-friendly input fields (large buttons, adequate spacing)
- Vertical layout on mobile, horizontal on desktop
- Page load time <2 seconds
- Lazy-load non-critical content
- Accessible (WCAG 2.1 AA compliance)

#### Feature 4: SEO Technical Foundation
**Description:** On-page SEO optimization to maximize organic visibility.

**Required Elements:**
- **Title Tag:** "SAT Superscore Calculator Free & No Sign Up Required | [Brand]" (60 chars)
- **Meta Description:** "Free SAT superscore calculator. Calculate your highest combined SAT score across multiple test dates. No sign-up required. Instant results for college applications." (155 chars)
- **URL Slug:** `/sat-superscore-calculator`
- **H1 Tag:** "SAT Superscore Calculator Free" (exact match keyword)
- **Image Alt Text:** Descriptive alt text for any images/graphics
- **Schema Markup:**
  - HowTo schema for calculation steps
  - FAQ schema for Q&A section
  - WebApplication schema for the calculator
- **Internal Linking:**
  - Link to GPA Calculator
  - Link to College Admissions Calculator
  - Link to PSAT to SAT Predictor (when live)
- **External Linking:**
  - 2-3 authoritative links (College Board, university websites)
- **Open Graph Tags:** For social sharing optimization
- **Canonical Tag:** Self-referencing canonical to avoid duplicate content

---

## 5. CONTENT STRATEGY FOR SEO

### 5.1 Primary Keywords (Must Target)
- **SAT superscore calculator** (exact match in H1, title tag, URL)
- **SAT superscore calculator free** (emphasized in subheading)
- **How to calculate SAT superscore** (H2 header)
- **SAT superscore** (throughout content, naturally)

### 5.2 Secondary Keywords (Include Naturally)
- calculate my SAT superscore
- SAT section superscore calculator
- digital SAT superscore calculator
- SAT superscore calculator 2025
- combine SAT scores calculator
- best SAT score from multiple tests
- highest section scores calculator
- SAT superscore calculator College Board

### 5.3 Long-Tail Keywords (For FAQ Section)
- how does SAT superscoring work
- do colleges superscore the SAT
- which colleges superscore SAT scores
- is SAT superscoring automatic
- can I superscore digital and paper SAT

### 5.4 Content-to-Keyword Mapping
| Section | Primary Keywords | Word Count |
|---------|-----------------|------------|
| Above calculator | SAT superscore calculator free | 50-75 |
| What is superscoring | SAT superscore, superscoring | 150-200 |
| How to calculate | calculate SAT superscore, how to | 150-200 |
| Which colleges | colleges superscore SAT | 200-250 |
| FAQ | long-tail question keywords | 250-300 |
| **Total** | | **800-1,025** |

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1 Technology Stack
- **Frontend:** HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript or React
- **Hosting:** Fast CDN-enabled hosting (Vercel, Netlify, or Cloudflare Pages)
- **Analytics:** Google Analytics 4 + Google Search Console
- **Schema:** JSON-LD structured data

### 6.2 Performance Requirements
- **Page Load:** <2 seconds (mobile)
- **Lighthouse Score:** >90 (Performance, SEO, Accessibility)
- **Mobile-Friendly:** Pass Google Mobile-Friendly Test
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

### 6.3 Browser Support
- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

---

## 7. SUCCESS CRITERIA & METRICS

### 7.1 Launch Readiness Checklist
- [ ] Calculator accurately calculates superscores (tested with 20+ scenarios)
- [ ] All P0 features implemented and tested
- [ ] Mobile-responsive on 5+ device sizes
- [ ] Page load time <2 seconds on 3G
- [ ] SEO elements implemented (title, meta, schema, etc.)
- [ ] Content proofread and optimized for keywords
- [ ] Analytics tracking configured
- [ ] Cross-browser testing complete
- [ ] Accessibility audit passed (WCAG 2.1 AA)

### 7.2 Post-Launch KPIs (Track Weekly)
**SEO Metrics:**
- Google Search Console impressions + clicks
- Average keyword rankings (target: top 10 within 3 months)
- Backlinks acquired (target: 5+ within 6 months)

**Engagement Metrics:**
- Calculator usage rate (interactions / page views)
- Average time on page (target: >3 minutes)
- Bounce rate (target: <50%)
- Scroll depth (target: 70%+ scroll to bottom)

**Traffic Metrics:**
- Organic traffic growth (week-over-week)
- Returning visitors (target: 20%+ within 6 months)
- Geographic distribution (U.S. should be 80%+)

---

## 8. RISK ASSESSMENT & MITIGATION

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|---------------------|
| Low initial traffic | High | Medium | Invest in backlink outreach, share on social media, Reddit |
| Competitors rank higher | Medium | High | Superior content quality, faster page speed, better UX |
| Score calculation errors | Low | Critical | Extensive QA testing, user feedback loop |
| Mobile usability issues | Low | High | Mobile-first design approach, test on real devices |
| Google algorithm changes | Medium | Medium | Follow white-hat SEO best practices, focus on user value |

---

## APPENDIX: COMPETITOR ANALYSIS

**Top Competitors:**
1. **Albert.io** - Interactive sliders, good UX, but complex interface
2. **PrepScholar** - Comprehensive guide + calculator, but behind paywall for advanced features
3. **CollegeVine** - Calculator + college matching, but requires sign-up
4. **Crimson Education** - Great content, but calculator is secondary

**Our Competitive Advantages:**
- ✅ Completely free, no sign-up
- ✅ Faster page load times
- ✅ Cleaner, simpler interface
- ✅ Better mobile experience
- ✅ Superior educational content (more comprehensive FAQ)
- ✅ First-to-market with specific SEO keywords ("free no sign up")

---