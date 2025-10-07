## SAT Score Calculator — Theme Design Guidelines

These guidelines codify the current design system used in the project and define how to extend it consistently. They are aligned with the live experience referenced here: [satscorecalculator.io](https://satscorecalculator.io/).


### 1) Design Principles
- **Clarity first**: prioritize readability, high contrast, clear hierarchy.
- **Calm aesthetics**: minimal chrome; neutral surfaces with a single accent.
- **Mobile‑first**: scale up progressively from small screens.
- **Accessible by default**: visible focus, reduced motion support, high-contrast support.
- **Tokenized**: all styles flow from CSS custom properties; never hard‑code colors or sizes.


### 2) Core Design Tokens
All tokens are declared in `:root` for light theme and overridden under `[data-theme="dark"]`.

```css
:root {
  /* Colors */
  --primary-color: #000000;
  --secondary-color: #666666;
  --background-color: #fafafa;
  --text-color: #111111;
  --border-color: #eaeaea;
  --input-text: #000000;
  --error-color: #ff0000;
  --success-color: #0070f3;
  --hover-color: #0070f3;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  --header-bg: #fafafa;
  --card-bg: #ffffff;
  --chart-text: #111111;
  --gradient-start: #000000;
  --gradient-end: #333333;
  --info-text: #111111;
  --content-text: #111111;
  --heading-text: #111111;

  /* Spacing */
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-xxl: 3rem;    /* 48px */

  /* Typography scale */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-md: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-xxl: 1.5rem;   /* 24px */
  --font-size-3xl: 2rem;     /* 32px */
  --font-size-4xl: 2.5rem;   /* 40px */

  /* Layout widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
}

[data-theme="dark"] {
  --primary-color: #60a5fa;
  --secondary-color: #94a3b8;
  --background-color: #0f172a;
  --text-color: #f1f5f9;
  --border-color: #1e293b;
  --input-text: #f1f5f9;
  --error-color: #ef4444;
  --success-color: #22c55e;
  --hover-color: #60a5fa;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --header-bg: #1e293b;
  --card-bg: #1e293b;
  --chart-text: #f1f5f9;
  --gradient-start: #60a5fa;
  --gradient-end: #3b82f6;
  --info-text: #f1f5f9;
  --content-text: #f1f5f9;
  --heading-text: #ffffff;
}
```

- **Brand accent**: `--primary-color` doubles as accent, gradient endpoints, and hover color fallback.
- **Surfaces**: `--background-color` (page) vs `--card-bg` (elevated cards/sections).
- **Text**: `--text-color` body, `--heading-text` headings, `--content-text` longform.
- **Feedback**: `--error-color`, `--success-color`.
- **Borders/Elevation**: `--border-color`, `--card-shadow`.


### 3) Typography
- **Font stack**: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif.
- **Base**: html 16px; body uses `--font-size-md` with line-height 1.6.
- **Headings**: strong weight and tighter letter-spacing; `h1` uses gradient text on landing.
- **Scaling**: at ≥768px increase `h1`, `h2`, `h3` sizes (see `styles.css`).


### 4) Spacing & Layout
- **Spacing scale**: use `--space-*` tokens; avoid explicit pixel values.
- **Containers**: `.container` is fluid and capped by `--container-…` per breakpoint.
- **Cards/Sections**: radius 12px; padding `--space-lg` → `--space-xl` on tablet+; subtle shadow.


### 5) Interactive States
- **Hover**: links/buttons use `--hover-color`; nav links invert to white on hover.
- **Focus visible**: 2px outline in `--primary-color` with 2px offset for all interactive elements.
- **Invalid**: form inputs use `--error-color` border and inline error text.
- **Reduced motion**: honor `prefers-reduced-motion: reduce` (animations duration ~0ms).


### 6) Color & Contrast
- Light theme maintains WCAG AA contrast on text over `--background-color` and `--card-bg`.
- Dark theme uses slate backgrounds with blue accents; ensure minimum 4.5:1 for body text.
- High-contrast mode adjusts `--border-color` and `--card-shadow` to stronger values.


### 7) Theming Model
- The theme is toggled by setting `data-theme` on `<html>`; JS persists to `localStorage`.
- Do not write component‑level color values; always reference tokens to inherit theme.

Example theme toggle usage:
```js
document.documentElement.setAttribute('data-theme', 'dark');
// or 'light'
```


### 8) Components — Visual Specs
- **Header (`.site-header`)**: sticky, blurred background, 1px bottom border, `--header-bg` surface.
  - App name uses `--text-color`; nav links use neutral text → accent hover.
  - Theme switch: fixed size 54×30, rounded track; knob translates 24px when checked.
  - Language select: compact, neutral surface, 8px radius.

- **Breadcrumb (`.breadcrumb`)**: neutral background, subtle divider, small type, low‑emphasis links.

- **Inputs (`.input-group input`)**: 8px radius; 1px border; focus shows subtle glow and accent border.

- **Score cards (`.score-item`)**: center stack, large numeric weight 800; `.total` uses gradient background.

- **Chart**: custom bar chart in a card container; bar colors adapt to theme (dark: blue translucency, light: near‑black translucency).

- **Info icon (`.info-icon`)**: circular, secondary background with white glyph; tooltip appears on hover with dark slate surface.

- **Content sections**: intro uses secondary color; details in grid that becomes 2 columns on ≥768px.

- **Footer**: neutral background, top border, small type; links underline on hover.

- **Blog**: larger comfortable line-height; featured image with radius 12px and card shadow; section dividers for `h2`.


### 9) Breakpoints
- 640px: container widens; inputs align horizontally.
- 768px: typography scales; section paddings increase; grids move to 2 columns; chart height grows.
- 1024px / 1200px: container max-width increases for desktop.


### 10) Accessibility & Internationalization
- Visible focus for keyboard users across controls and links.
- `prefers-reduced-motion` honored throughout.
- High‑contrast media query improves borders/shadows.
- i18n uses `data-i18n` keys; do not bake copy into components.


### 11) Implementation Patterns
- Never hard‑code values like `#fff` or pixel sizes; instead map to tokens.
- For new components, create semantic variables only if needed; otherwise reuse existing tokens.
- Use the gradient pair (`--gradient-start`, `--gradient-end`) only for key highlights (e.g., title, total card, CTA).

Example: New primary button (if/when introduced)
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover { transform: translateY(-2px); }
.btn-primary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
```


### 12) Extending the System
When introducing new design needs:
1. **Check existing tokens**: can an existing semantic token represent the need?
2. **Add token in both themes**: update `:root` and `[data-theme="dark"]` consistently.
3. **Respect scales**: prefer existing spacing and type steps; avoid one‑offs.
4. **Validate contrast**: ensure ≥4.5:1 for body text, ≥3:1 for large text/UI elements.
5. **Test modes**: light, dark, high‑contrast, reduced motion.

Token addition example:
```css
/* In styles.css */
:root { --warning-color: #f59e0b; }
[data-theme="dark"] { --warning-color: #fbbf24; }
```


### 13) Content & Tone
- Keep copy concise and student‑friendly.
- Use short headings, active verbs, and supportive microcopy.
- Consistent capitalization: Title Case for headings; sentence case for body.


### 14) Performance Considerations
- Inline only critical CSS needed to prevent CLS; defer the rest (as implemented).
- Avoid font flashes by keeping system font stack.
- Minimize reflows: use `requestAnimationFrame` for chart updates and theme changes.


### 15) Quick Reference (Do / Don’t)
- **Do** use `--space-*` and `--font-size-*` tokens for layout and type.
- **Do** apply `--hover-color` for link hovers and interactive accents.
- **Do** use `--card-bg` for elevated surfaces and `--background-color` for page.
- **Don’t** hard‑code hex colors or pixel sizes.
- **Don’t** introduce new shadows/radii unless required; match existing style.


---
If you need to deviate from these guidelines (e.g., new visualization type), document the decision here and add any new tokens with rationale.


