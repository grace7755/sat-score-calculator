# PSAT to SAT Predictor
## Product Requirements Document (PRD)

---

## 1. INTRODUCTION

### 1.1 Problem Statement
High school students take the PSAT as a practice exam for the SAT, but struggle to understand what their PSAT score means for their actual SAT performance. Students need answers to critical questions:
- What SAT score can I expect based on my PSAT results?
- How much can I improve between PSAT and SAT?
- Which sections should I focus on studying?
- Is my PSAT score good enough for my target colleges?

Currently, students must manually look up conversion charts, lack context about score improvement potential, and don't understand the factors affecting prediction accuracy. This creates anxiety and prevents strategic SAT preparation.

### 1.2 Product Vision
Build the **most comprehensive and SEO-dominant PSAT to SAT Predictor** that:
- Instantly converts PSAT scores to predicted SAT scores with clear explanations
- Educates students about score improvement potential (60-100+ points)
- Provides personalized study recommendations based on PSAT performance
- Requires zero sign-up or payment (100% free access)
- Ranks #1 on Google for "PSAT to SAT predictor" and related keywords

### 1.3 Success Metrics
- **SEO Goals:** Top 3 Google rankings for primary keywords within 6 months
- **Traffic Goals:** 2,000-5,000 monthly organic visits within 12 months
- **Engagement:** Average time on page >3.5 minutes; bounce rate <45%
- **Tool Usage:** 40%+ prediction calculator usage rate from page visitors
- **Authority:** Generate 5+ quality backlinks from education sites within 6 months

---

## 2. OBJECTIVES & GOALS

### 2.1 Primary Objectives
1. **SEO Leadership:** Dominate search results for PSAT to SAT conversion queries
2. **Educational Value:** Provide most comprehensive PSAT-SAT guidance available online
3. **User Empowerment:** Help students set realistic SAT goals and create study plans
4. **Frictionless Access:** Deliver instant predictions without registration barriers

### 2.2 Business Goals
- Drive 2,000-5,000 monthly organic visits
- Establish authority in standardized test prep content
- Create valuable linkable asset for backlink acquisition
- Cross-promote other tools (GPA Calculator, College Admissions Calculator)
- Build foundation for future monetization (ads, affiliate partnerships)

### 2.3 User Goals
- **Understand PSAT results:** Know what PSAT score means for SAT
- **Set realistic targets:** Establish achievable SAT score goals
- **Plan preparation:** Identify which sections need most study focus
- **Reduce anxiety:** Gain confidence through clear predictions and guidance
- **Track improvement:** Understand score improvement potential with preparation

---

## 3. TARGET USERS & ROLES

### 3.1 Primary Users

**High School Sophomores & Juniors (Ages 15-17)**
- Just took PSAT 10 or PSAT/NMSQT
- Planning to take SAT in next 3-12 months
- Need to set SAT score goals for college planning
- Want to understand if they're on track for target colleges
- Anxious about standardized testing

**Pain Points:**
- "What does my 1200 PSAT mean for the SAT?"
- "Am I good enough for my dream schools?"
- "How much can I realistically improve?"
- "Should I focus more on Math or Reading/Writing?"

### 3.2 Secondary Users

**Parents (Ages 40-55)**
- Supporting children's college preparation
- Want to interpret PSAT results
- Need to set realistic expectations
- Determine if SAT tutoring is necessary

**College Counselors**
- Advising multiple students simultaneously
- Need quick, reliable prediction tool
- Must explain PSAT-SAT relationship to students/families
- Require accurate data for college list building

### 3.3 User Roles & Actions

| Role | Primary Actions | Success Criteria |
|------|----------------|------------------|
| Student | Enter PSAT scores → Get SAT prediction → Read improvement tips | Understand predicted SAT score + study plan in <3 min |
| Parent | Enter child's PSAT → Understand prediction → Assess tutoring needs | Gain clarity on child's SAT outlook |
| Counselor | Quick predictions for multiple students → Reference educational content | Efficient tool for advising sessions |

---

## 4. CORE FEATURES FOR MVP (MoSCoW METHOD)

### 4.1 MUST HAVE (P0 - Critical for Launch)

#### Feature 1: PSAT to SAT Score Predictor (Core Tool)

**Description:** Interactive calculator converting PSAT scores to predicted SAT score ranges with section-level predictions.

**Functional Requirements:**

**Input Options:**
- PSAT Total Score (320-1520) OR
- PSAT Math Score (160-760) + Reading & Writing Score (160-760)
- Score validation (must be in valid range and increments of 10)
- Optional: Select PSAT version (PSAT 8/9, PSAT 10, PSAT/NMSQT)

**Prediction Algorithm:**
- Convert PSAT total score to predicted SAT total score
- Convert PSAT Math → Predicted SAT Math
- Convert PSAT R&W → Predicted SAT R&W
- Display prediction as **range** (e.g., "1270-1350") not exact number
- Account for typical 60-100 point improvement with preparation

**Output Display:**
- **Predicted SAT Score Range:** Large, prominent display (e.g., "1270-1350")
- **Best-Case Scenario:** "With focused preparation: 1320-1400"
- **Section Predictions:**
  - Math: [Range] (e.g., "640-700")
  - Reading & Writing: [Range] (e.g., "630-680")
- **Percentile Information:** "This puts you in approximately the 85th percentile"
- **College Readiness Indicator:** Color-coded (Green/Yellow/Red) based on college competitiveness

**Key Messages:**
- Prominent disclaimer: "This is an estimate. Your actual SAT score will depend on preparation and test-day performance."
- Positive reinforcement: "Most students improve 60-100 points with preparation!"
- Actionable next step: "Focus your prep on [weaker section] to maximize your score"

**UI/UX Requirements:**
- Single-page experience (no page reloads)
- Real-time calculations as user types
- Mobile-optimized input fields (large tap targets)
- Clear visual hierarchy: Input → Prediction → Recommendations
- Reset button to clear and start over
- "Share" or "Save" option for results

#### Feature 2: Comprehensive Educational Content (SEO Foundation)

**Description:** In-depth content explaining PSAT-SAT relationship, conversion methodology, and improvement strategies (900-1,100 words).

**Required Sections:**

**Above Calculator (100 words):**
- H1: "PSAT to SAT Predictor" (exact match keyword)
- Subheading: "Predict your SAT score based on PSAT results. Free, instant, accurate."
- Brief intro (3-4 sentences): What tool does + why it's valuable

**Below Calculator:**

**H2: "Understanding PSAT to SAT Score Conversion" (200 words)**
- Explain PSAT scale (320-1520) vs. SAT scale (400-1600)
- Why scores don't directly translate (PSAT is slightly easier)
- Section-by-section comparison table
- How conversion charts are created (College Board data)

**H2: "How Accurate Is This PSAT to SAT Prediction?" (200 words)**
- Accuracy factors: preparation, test conditions, individual improvement
- Average improvement statistics: 60-100 points typical
- Math scores more reliable than R&W predictions
- Higher scorers (1400+) see smaller gains
- Lower scorers can improve 150+ points with preparation
- Disclaimer: "Use as starting point, not guarantee"

**H2: "How Much Can I Improve From PSAT to SAT?" (150 words)**
- Breakdown by score range:
  - 800-1000: Potential for 100-150+ point gains
  - 1000-1200: Typical 80-120 point improvement
  - 1200-1400: Expect 60-100 point gains
  - 1400+: Smaller gains (40-80 points)
- Factors affecting improvement: study time, targeted prep, test-taking strategies
- Success stories/examples

**H2: "Using Your PSAT Score to Prepare for the SAT" (200 words)**
- Step-by-step action plan:
  1. Identify weak sections from PSAT score report
  2. Set realistic SAT goal (predicted score + 80 points)
  3. Create 8-12 week study plan
  4. Focus 60% time on weak areas, 40% on maintaining strengths
  5. Take practice tests to track progress
- Free resources: Khan Academy, College Board practice tests
- When to take SAT after PSAT (optimal timing)
- Link to SAT Score Calculator tool

**H2: "PSAT vs. SAT: Key Differences" (150 words)**
- Comparison table:
  - Score range
  - Test length (PSAT 2hr 45min vs. SAT 2hr 15min for digital)
  - Difficulty level
  - Content coverage
  - College reporting (PSAT not sent to colleges)
  - National Merit Scholarship (PSAT/NMSQT only)
- Both are adaptive digital tests

**H2: "Frequently Asked Questions" (100 words + 6-8 Q&As)**
- Is a 1200 PSAT good?
- What SAT score will I get if I got [X] on PSAT?
- Can I get a perfect SAT score with a 1520 PSAT?
- How many times should I take the SAT?
- Do colleges see PSAT scores?
- What PSAT score do I need for National Merit?
- Should I take ACT instead based on my PSAT?

**SEO Requirements:**
- Natural keyword integration (avoid keyword stuffing)
- Question-based headers for featured snippets
- Schema markup: HowTo, FAQ, WebApplication
- Internal links to related tools
- 2-3 authoritative external links (College Board, Khan Academy)

#### Feature 3: PSAT-SAT Conversion Reference Chart

**Description:** Visual table showing PSAT-to-SAT score conversions for easy reference.

**Table Structure:**
- Column 1: PSAT Total Score (320, 340, 360...1520)
- Column 2: Predicted SAT Score Range (e.g., 400-480)
- Column 3: SAT Percentile (approximate)
- Highlight common score milestones (1000, 1200, 1400, 1520)
- Include note: "Scores show typical range; preparation can increase by 60-100+ points"

**Display Options:**
- Collapsible/expandable section (reduce page length)
- Downloadable PDF version
- Mobile-optimized scrollable table

#### Feature 4: Mobile-First Responsive Design

**Description:** Fast-loading, mobile-optimized design for 60%+ mobile users.

**Technical Requirements:**
- Touch-friendly inputs (large buttons, adequate spacing)
- Single-column layout on mobile
- Sticky "Calculate" button on mobile
- Fast page load (<2 seconds on 3G)
- Progressive enhancement (works without JS)
- Accessible (WCAG 2.1 AA standards)
- Font sizes readable on small screens (16px minimum)

#### Feature 5: SEO Technical Optimization

**Description:** Complete on-page SEO implementation for maximum organic visibility.

**SEO Elements:**
- **Title Tag:** "PSAT to SAT Predictor - Convert Your PSAT Score to SAT | Free Tool" (60 chars)
- **Meta Description:** "Free PSAT to SAT score predictor. Instantly estimate your SAT score based on PSAT results. Includes conversion chart, improvement tips, and study recommendations." (155 chars)
- **URL Slug:** `/psat-to-sat-predictor`
- **H1:** "PSAT to SAT Predictor" (exact match keyword)
- **Canonical Tag:** Self-referencing
- **Open Graph Tags:** For social sharing (title, description, image)
- **Schema Markup:**
  - HowTo schema (how to predict SAT score from PSAT)
  - FAQ schema (Q&A section)
  - WebApplication schema (for the calculator)
  - BreadcrumbList schema (if applicable)
- **Image Optimization:**
  - Alt text for all images
  - Compression for fast loading
  - Descriptive filenames (e.g., "psat-to-sat-conversion-chart.jpg")
- **Internal Linking:**
  - Link to GPA Calculator ("Calculate your GPA for college applications")
  - Link to SAT Superscore Calculator ("Already took SAT? Calculate your superscore")
  - Link to College Admissions Calculator (when live)
- **External Linking:**
  - College Board PSAT information page
  - Khan Academy SAT prep resources
  - National Merit Scholarship Program (if mentioning NMSQT)

---

## 5. CONTENT STRATEGY FOR SEO

### 5.1 Primary Keywords (Must Target)
- **PSAT to SAT predictor** (H1, title tag, URL, 5-7x in content)
- **PSAT to SAT conversion** (H2, naturally throughout)
- **predict SAT score from PSAT** (H2 header)
- **PSAT to SAT score converter** (alt keyword variant)

### 5.2 Secondary Keywords
- PSAT to SAT conversion chart
- PSAT SAT comparison
- estimate SAT score from PSAT
- how accurate is PSAT for predicting SAT
- PSAT vs SAT scoring
- convert PSAT score to SAT
- PSAT to SAT equivalency

### 5.3 Long-Tail Keywords (FAQ Section)
- what SAT score will I get based on PSAT
- is PSAT score same as SAT
- PSAT 1200 equals what SAT score
- can you get 1600 SAT from 1520 PSAT
- how much do SAT scores improve from PSAT
- do colleges see PSAT scores

### 5.4 Keyword Mapping
| Section | Primary Keywords | Frequency |
|---------|-----------------|-----------|
| Above calculator | PSAT to SAT predictor | 2x |
| Conversion explanation | PSAT to SAT conversion | 3-4x |
| Accuracy section | predict SAT from PSAT | 2-3x |
| Improvement tips | PSAT SAT score improvement | 2-3x |
| FAQ | Long-tail questions | 1x per Q |

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1 Technology Stack
- **Frontend:** HTML5, CSS3 (Tailwind or Bootstrap), Vanilla JavaScript (lightweight)
- **Alternative:** React for calculator component (if building as SPA)
- **Hosting:** Fast CDN (Vercel, Netlify, Cloudflare Pages)
- **Analytics:** Google Analytics 4, Google Search Console
- **Schema:** JSON-LD structured data

### 6.2 Prediction Algorithm Logic

```javascript
// Simplified conversion logic (adjust based on College Board data)
function predictSATFromPSAT(psatScore) {
  // Account for scale difference and typical improvement
  let baseConversion = psatScore * 1.05; // Approximate scaling
  let minScore = Math.round(baseConversion - 40);
  let maxScore = Math.round(baseConversion + 60);
  
  // Cap at SAT maximum
  maxScore = Math.min(maxScore, 1600);
  minScore = Math.max(minScore, 400);
  
  return {
    min: minScore,
    max: maxScore,
    typical: Math.round((minScore + maxScore) / 2)
  };
}
```

### 6.3 Performance Requirements
- **Page Load:** <2 seconds on 3G mobile
- **Lighthouse Scores:** >90 (Performance, SEO, Accessibility, Best Practices)
- **Core Web Vitals:**
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1
- **Mobile-Friendly:** Pass Google's Mobile-Friendly Test
- **Browser Support:** Last 2 versions of major browsers

---

## 7. SUCCESS CRITERIA & METRICS

### 7.1 Launch Checklist
- [ ] Prediction algorithm tested with 30+ PSAT-SAT data points
- [ ] All P0 features implemented and QA tested
- [ ] Responsive on 5+ device sizes (mobile, tablet, desktop)
- [ ] Content optimized with all primary keywords
- [ ] Schema markup validated (Google Rich Results Test)
- [ ] Page load <2s on 3G
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Cross-browser testing complete
- [ ] Analytics tracking configured and tested

### 7.2 Post-Launch KPIs

**SEO Metrics (Track Weekly):**
- Google Search Console: Impressions, clicks, CTR, average position
- Target: Top 10 rankings for primary keywords within 3 months
- Target: Top 5 rankings within 6 months
- Backlink acquisition: 5+ quality backlinks within 6 months

**Engagement Metrics:**
- Calculator usage rate: 40%+ of page visitors
- Average time on page: >3.5 minutes
- Bounce rate: <45%
- Scroll depth: 75%+ read full content

**Traffic Metrics:**
- Organic traffic growth: Month-over-month increase
- Target: 500 visits/month within 3 months
- Target: 2,000-5,000 visits/month within 12 months
- Geographic distribution: 85%+ U.S. traffic

---

## 8. RISK ASSESSMENT & MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Low initial traffic | High | Medium | Aggressive backlink outreach, Reddit/forum promotion |
| Prediction accuracy concerns | Medium | High | Clear disclaimers, show as ranges not exact scores, cite data sources |
| Competitors rank higher | Medium | High | Superior content depth, better UX, faster page speed |
| Algorithm errors | Low | Critical | Extensive testing with real PSAT-SAT score pairs, user feedback loop |
| Mobile usability issues | Low | Medium | Mobile-first design, test on real devices |

---

## APPENDIX: COMPETITOR ANALYSIS

**Top Competitors:**
1. **CollegeVine** - Has conversion chart + educational content, but buried on blog
2. **Scholarships360** - Interactive converter, but limited educational context
3. **PrepScholar** - Comprehensive guide, but no dedicated prediction tool
4. **Bold.org** - Conversion chart, basic explanation, lacks depth

**Our Competitive Advantages:**
- ✅ Most comprehensive prediction tool (ranges + section breakdowns)
- ✅ Personalized improvement recommendations
- ✅ Clear, student-friendly explanations
- ✅ Faster page load than competitors
- ✅ Better mobile experience
- ✅ Superior SEO optimization (first-to-market for specific long-tail keywords)
- ✅ 100% free, no email required

---