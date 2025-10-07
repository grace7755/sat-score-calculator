# Master GPA Calculator
## Product Requirements Document (PRD)

---

## 1. INTRODUCTION

### 1.1 Problem Statement
Students across middle school, high school, and college need to calculate their GPA but face fragmented, limited tools that force them to:
- Search for separate calculators for different scenarios (semester vs. cumulative, high school vs. college)
- Manually convert between percentage grades and letter grades
- Navigate different regional grading scales (USA vs. Canada)
- Calculate transfer GPA across multiple institutions without guidance
- Choose between weighted and unweighted GPA calculators
- Find calculators that work without credit hours (middle school use case)

**Current pain points:**
- "How do I calculate my cumulative GPA across all my semesters?"
- "What's my GPA from percentage grades?"
- "How do I combine GPAs from community college and university?"
- "What's my weighted GPA with AP classes?"
- "I can't find a GPA calculator for middle school without credits"

### 1.2 Product Vision
Build the **most comprehensive, SEO-dominant Master GPA Calculator** that:
- Consolidates 11+ GPA calculator variations into ONE powerful tool
- Adapts to any student's needs through intelligent toggles (grade level, region, credit system)
- Handles all use cases: semester, cumulative, weighted, transfer, percentage-to-GPA
- Requires zero registration and provides instant results
- Ranks #1 on Google for 50+ GPA-related keywords
- Drives 20,000-40,000 monthly organic visits

### 1.3 Success Metrics
- **SEO Goals:** Top 3 rankings for primary keywords within 6 months
- **Traffic Goals:** 20,000-40,000 monthly organic visits within 12 months
- **Engagement:** Average time on page >4 minutes; bounce rate <40%
- **Tool Usage:** 45%+ calculator usage rate from page visitors
- **Versatility:** Support 8+ distinct calculation scenarios seamlessly

---

## 2. OBJECTIVES & GOALS

### 2.1 Primary Objectives
1. **SEO Dominance:** Capture organic traffic for 50+ GPA calculator keyword variations
2. **Universal Solution:** Create ONE tool replacing 10+ separate calculators
3. **User Empowerment:** Help students calculate GPA accurately for any scenario
4. **Educational Authority:** Establish site as #1 GPA resource online

### 2.2 Business Goals
- Generate 20,000-40,000 monthly organic visits (highest traffic tool)
- Establish domain authority in education/academic planning space
- Create premier linkable asset attracting natural backlinks
- Cross-promote other tools (College Admissions Calculator, SAT tools)
- Build foundation for monetization (ads, affiliate partnerships with tutoring services)

### 2.3 User Goals
- **Calculate any GPA type:** Semester, cumulative, weighted, transfer, without credits
- **Understand GPA:** Learn how GPA works and what theirs means
- **Plan improvements:** Set GPA goals and understand how future grades impact overall GPA
- **Adapt to context:** Switch between grade levels, regions, and calculation types seamlessly
- **Save time:** Use one tool instead of searching for multiple calculators

---

## 3. TARGET USERS & ROLES

### 3.1 Primary Users

**High School Students (Ages 14-18) - 50% of users**
- Calculate weighted/unweighted GPA for college applications
- Need cumulative GPA across multiple years
- Taking AP/Honors courses requiring weighted GPA
- Converting percentage grades to 4.0 scale
- Setting target GPAs for college admissions

**College/University Students (Ages 18-24) - 40% of users**
- Calculate semester and cumulative GPA
- Track GPA for scholarships, graduation requirements, Dean's List
- Transfer students combining GPAs from multiple institutions
- Graduate school applicants needing precise GPA calculations

**Middle School Students/Parents (Ages 11-13) - 10% of users**
- Calculate GPA without credit hours
- Early GPA tracking and understanding
- Simpler grading systems (basic letter grades)

### 3.2 Secondary Users
- **Parents:** Monitoring children's academic performance, understanding GPA requirements
- **School Counselors:** Quick calculations for multiple students, advising on GPA improvement
- **International Students:** Converting Canadian/other grades to US 4.0 scale
- **Transfer Students:** Combining GPAs from community college + university

### 3.3 User Roles & Actions

| Role | Primary Actions | Success Criteria |
|------|----------------|------------------|
| HS Student | Calculate weighted GPA, track cumulative GPA, plan improvements | Understand GPA for college apps in <3 min |
| College Student | Calculate semester/cumulative GPA, track progress | Quick GPA calculation + understand impact of future grades |
| Transfer Student | Combine GPAs from 2+ schools | Accurate cumulative GPA across institutions |
| Middle School Student | Calculate GPA without credits | Simple GPA calculation from letter grades |

---

## 4. CORE FEATURES FOR MVP (MoSCoW METHOD)

### 4.1 MUST HAVE (P0 - Critical for Launch)

#### Feature 1: Adaptive GPA Calculator (Core Engine)

**Description:** One intelligent calculator that adapts to user's specific scenario through toggle options.

**Mode Selection (Primary Toggle):**

**Option A: Grade Level Selector**
- Middle School (simple, no credits typically)
- High School (supports weighted/unweighted)
- College/University (credit-based, cumulative)

**Option B: Calculation Type Selector**
- **Semester/Term GPA** (single term calculation)
- **Cumulative GPA** (all terms combined)
- **Transfer GPA** (combine from multiple schools)

**Configuration Toggles:**

1. **Credit System Toggle:**
   - "With Credit Hours" (default for college/high school)
   - "Without Credit Hours" (for middle school or simple calculations)

2. **Weighting Toggle:** (High School only)
   - "Unweighted GPA" (standard 4.0 scale)
   - "Weighted GPA" (accounts for AP/Honors: 5.0/4.5 scale)

3. **Grade Format Toggle:**
   - "Letter Grades (A, B, C...)"
   - "Percentage (0-100%)"
   - Auto-converts percentages to letter grades

4. **Regional Scale Toggle:**
   - "USA (4.0 scale)" (default)
   - "Canada (4.0 or 4.33 scale)" (selectable)

**Functional Requirements:**

**Input Fields (Dynamic based on selections):**
- Course Name (optional, for reference)
- Grade (dropdown for letters OR number input for percentage)
- Credit Hours (if "With Credits" selected)
- Course Type (if Weighted selected): Regular, Honors, AP/IB
- "Add Course" button (dynamically add rows)
- "Add Semester" button (for cumulative calculations)

**For Cumulative GPA Mode:**
- Input field: "Current Cumulative GPA" (optional, for students who know it)
- Input field: "Total Credits Completed" (if applicable)
- Then add current semester courses
- Calculator combines previous + current GPA

**For Transfer GPA Mode:**
- **School 1:** GPA + Credits
- **School 2:** GPA + Credits
- **Current School:** Add current courses
- Auto-calculates combined GPA weighted by credits

**Calculation Logic:**

**Standard GPA Formula:**
```
GPA = Σ(Grade Points × Credits) ÷ Total Credits
```

**Without Credits:**
```
GPA = Σ(Grade Points) ÷ Number of Courses
```

**Weighted GPA Points:**
- Regular Classes: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0
- Honors Classes: A=4.5, B=3.5, C=2.5, D=1.5, F=0.0
- AP/IB Classes: A=5.0, B=4.0, C=3.0, D=2.0, F=0.0

**Output Display:**
- **Current/Semester GPA:** Large, prominent display (e.g., "3.67")
- **Cumulative GPA:** (if applicable)
- **Grade Point Breakdown:** Table showing each course contribution
- **GPA Context:** "This is a B+ average" or "Dean's List (3.5+)"
- **Class Rank Estimate:** "Top 25% of students typically have 3.5+ GPA"

**Visual Enhancements:**
- Progress bar showing GPA on 0.0-4.0 scale
- Color coding: Green (3.5-4.0), Yellow (2.5-3.49), Red (<2.5)
- Clear reset button to start over

#### Feature 2: Comprehensive Educational Content (SEO Foundation)

**Description:** In-depth content explaining all GPA types, calculations, and strategies (1,200-1,400 words).

**Required Sections:**

**Above Calculator (100 words):**
- H1: "GPA Calculator - High School, College & Cumulative GPA" (multi-keyword optimization)
- Subheading: "Calculate your GPA instantly. Supports weighted, unweighted, semester, cumulative, and transfer GPA. Free, no sign-up required."
- Brief intro: What tool does + why it's the most comprehensive

**Below Calculator:**

**H2: "How to Calculate Your GPA" (250 words)**
- Step-by-step explanation of GPA calculation
- Formula breakdown with example
- Difference between weighted and unweighted
- Credit hours explained
- Why GPA matters (college admissions, scholarships, graduation)

**H2: "GPA Calculator by Grade Level" (200 words)**
- **Middle School GPA:** Simple calculation, usually unweighted, often no credits
- **High School GPA:** Weighted vs. unweighted, importance for college applications, AP/Honors impact
- **College GPA:** Credit-based, cumulative tracking, Dean's List requirements, graduation minimums
- Internal navigation: "Select your grade level above to customize calculator"

**H2: "Understanding Weighted vs. Unweighted GPA" (200 words)**
- What weighted GPA means
- How AP/Honors courses add points
- Typical scales: 4.0 (unweighted) vs. 5.0 (weighted)
- Which colleges use which (most recalculate)
- When to use weighted GPA (high school planning)
- Comparison table

**H2: "How to Calculate Cumulative GPA" (150 words)**
- Definition: GPA across all semesters
- Formula: Combine all grade points and credits from all terms
- Example calculation
- Why cumulative GPA matters more than semester GPA
- How to improve cumulative GPA over time

**H2: "Transfer GPA Calculator: Combining Multiple Schools" (150 words)**
- How to calculate GPA from 2+ institutions
- Weighted by credit hours from each school
- Example: Community college (3.5 GPA, 45 credits) + University (3.8 GPA, 30 credits)
- Formula: [(3.5 × 45) + (3.8 × 30)] ÷ 75 = 3.62
- Important for transfer applications to 4-year universities

**H2: "GPA Scales: USA vs. Canada" (100 words)**
- USA: Standard 4.0 scale (A=4.0)
- Canada: Varies by province (4.0, 4.33, percentage-based)
- Conversion basics
- Percentage to GPA conversion table
- Link to toggle option in calculator

**H2: "What is a Good GPA?" (150 words)**
- Context-dependent answer
- High School: 3.5+ competitive for selective colleges, 3.0+ for most colleges
- College: 3.5+ for Dean's List, 3.0+ for good standing, 2.0+ to avoid probation
- By goal: Ivy League (3.9+), Scholarships (3.5+), Graduation (2.0+)
- Reminder: GPA is one factor among many

**H2: "Frequently Asked Questions" (200 words + 8-10 Q&As)**
- What is a 3.5 GPA in percentage?
- How is cumulative GPA calculated?
- Do all colleges use weighted GPA?
- How do I calculate GPA without credits?
- What's the difference between semester and cumulative GPA?
- Can I raise my GPA significantly in one semester?
- How do transfer credits affect GPA?
- What GPA do I need for college?

**SEO Requirements:**
- Natural keyword integration (primary + secondary keywords)
- Question-based headers for featured snippets
- Schema markup: HowTo, FAQ, WebApplication
- Internal links to College Admissions Calculator, SAT tools
- External links: College Board, university admissions pages

#### Feature 3: Grade Conversion Reference Tables

**Description:** Visual tables for quick reference and SEO value.

**Table 1: Letter Grade to GPA Conversion**
| Letter Grade | Percentage | GPA (4.0) | GPA (Weighted Honors) | GPA (Weighted AP) |
|--------------|------------|-----------|----------------------|-------------------|
| A+ | 97-100% | 4.0 | 4.5 | 5.0 |
| A | 93-96% | 4.0 | 4.5 | 5.0 |
| A- | 90-92% | 3.7 | 4.2 | 4.7 |
| B+ | 87-89% | 3.3 | 3.8 | 4.3 |
| B | 83-86% | 3.0 | 3.5 | 4.0 |
| ... | ... | ... | ... | ... |

**Table 2: GPA Interpretation Guide**
| GPA Range | Letter Grade | College Competitiveness |
|-----------|--------------|------------------------|
| 3.9-4.0 | A+ | Top tier (Ivy League) |
| 3.7-3.89 | A | Highly competitive |
| 3.5-3.69 | A- | Competitive |
| 3.3-3.49 | B+ | Above average |
| 3.0-3.29 | B | Average |
| < 3.0 | B- or lower | Below average |

**Table 3: Percentage to GPA (Canada)**
| Percentage | Letter | GPA (4.0) | GPA (4.33) |
|------------|--------|-----------|------------|
| 90-100% | A+ | 4.0 | 4.33 |
| 85-89% | A | 4.0 | 4.0 |
| 80-84% | A- | 3.7 | 3.7 |
| ... | ... | ... | ... |

#### Feature 4: Mobile-First Responsive Design

**Description:** Fast, intuitive mobile experience for 60%+ mobile users.

**Technical Requirements:**
- Single-column layout on mobile
- Large touch targets (buttons, dropdowns)
- Sticky "Calculate GPA" button on mobile
- Collapsible sections for toggles (expand/collapse)
- Fast page load (<2.5 seconds on 3G)
- Progressive web app capabilities
- Offline functionality for core calculator

#### Feature 5: SEO Technical Optimization

**Description:** Complete SEO implementation for maximum organic visibility.

**SEO Elements:**
- **Title Tag:** "GPA Calculator - Free High School, College & Cumulative GPA Calculator" (60 chars)
- **Meta Description:** "Free GPA calculator for high school, college, and transfer students. Calculate semester, cumulative, and weighted GPA. Supports percentage grades and multiple grading scales. No sign-up required." (160 chars)
- **URL Slug:** `/gpa-calculator`
- **H1:** "GPA Calculator - High School, College & Cumulative GPA"
- **Canonical Tag:** Self-referencing
- **Schema Markup:**
  - HowTo schema (how to calculate GPA)
  - FAQ schema (Q&A section)
  - WebApplication schema
  - EducationalOrganization schema (if applicable)
- **Internal Linking:**
  - Link to College Admissions Calculator
  - Link to SAT Superscore Calculator
  - Link to PSAT to SAT Predictor
  - Create GPA-related blog posts to link back
- **External Linking:**
  - College Board GPA information
  - University admissions requirements pages
  - National Center for Education Statistics

---

## 5. CONTENT STRATEGY FOR SEO

### 5.1 Primary Keywords (Must Target - from your document)
- **GPA calculator** (H1, title, URL, 8-10x naturally)
- **cumulative GPA calculator** (H2, 3-4x)
- **high school GPA calculator** (H2, 3-4x)
- **college GPA calculator** (content, 3-4x)
- **weighted GPA calculator** (H2, 3-4x)

### 5.2 Secondary Keywords (from your document)
- cumulative gpa calculator college
- cumulative gpa calculator high school
- cumulative gpa calculator by semester
- gpa calculator middle school
- gpa calculator without credits
- cumulative gpa calculator percentage
- cumulative gpa calculator Canada
- transfer gpa calculator
- weighted gpa calculator honors AP

### 5.3 Long-Tail Keywords
- how to calculate cumulative gpa
- how to calculate gpa from percentage
- how to calculate weighted gpa
- gpa calculator from different colleges
- calculate my gpa
- what is my gpa

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1 Technology Stack
- **Frontend:** HTML5, CSS3 (Tailwind CSS), JavaScript (React for complex state management)
- **Storage:** Browser localStorage (no backend required)
- **Hosting:** Fast CDN (Vercel, Netlify)
- **Analytics:** GA4, Search Console
- **Schema:** JSON-LD

### 6.2 Performance
- Page load: <2.5s on 3G
- Lighthouse: >90 all metrics
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

---

## 7. SUCCESS CRITERIA

### 7.1 Launch Checklist
- [ ] All P0 features tested with 50+ calculation scenarios
- [ ] Toggle system works seamlessly across all combinations
- [ ] Responsive on 6+ device sizes
- [ ] Content includes all primary keywords
- [ ] Schema markup validated
- [ ] Cross-browser testing complete

### 7.2 KPIs
- **SEO:** Top 10 for 20+ keywords within 3 months
- **Traffic:** 20,000-40,000 monthly visits within 12 months
- **Engagement:** >4 min avg time, <40% bounce rate
- **Usage:** 45%+ calculator interaction rate

---

## COMPETITIVE ADVANTAGE

**vs. GPACalculator.net / Calculator.net:**
- ✅ ONE tool vs. their multiple separate calculators
- ✅ Supports ALL scenarios (weighted, transfer, no credits, Canada)
- ✅ Better UX with intelligent toggles
- ✅ More comprehensive educational content
- ✅ Faster, more mobile-friendly
- ✅ Better SEO optimization

**Our Unique Value:**
- Most versatile GPA calculator online
- Consolidates 10+ tools into one
- Smarter interface with adaptive options
- Superior content depth and SEO

---