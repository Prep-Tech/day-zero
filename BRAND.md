# Day Zero — Brand Guidelines

## Overview

Day Zero is a guided renewal framework for couples. It helps partners independently answer structured questions about their relationship, parenting, and shared future — then share their answers on their own terms via PDF.

**Tagline:** A Framework for Renewal

**Domain:** day-zero.co.za

---

## Typography

**Primary Font:** Montserrat (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
```

| Use | Weight | Size |
|-----|--------|------|
| Hero title (Day Zero) | 700 | clamp(2.5rem, 7vw, 3.5rem) |
| Hero headline | 700 | 30px |
| Section labels (HOW IT WORKS, etc.) | 700 | 18px, letter-spacing 0.3em |
| Section headings | 600 | 24px |
| Body text | 400 | clamp(0.95rem–1.12rem) |
| Small labels / captions | 400–600 | 0.8rem–0.85rem |
| Button text | 600 | 0.9rem–1rem, letter-spacing 0.15em–0.2em |

**Line height:** 1.2 for body text, 1.15 for headings, 1.5–1.6 for long-form paragraphs on the homepage.

**Heading style:** Title Case for section h3 headings (e.g., "Important Conversations Deserve More Than A Heated Moment").

---

## Colour Palette

### Primary

| Name | Hex | Usage |
|------|-----|-------|
| **Brand Teal** | `#3AAFB9` | Header, buttons, primary accents, CTA, progress bar |
| **Dark Teal** | `#2d8f97` | Gradient end, trust strip, footer |
| **Cream** | `#F7F4EF` | Page background, light fill areas |

### Neutrals

| Name | Hex | Usage |
|------|-----|-------|
| **Black** | `#1a1a1a` | Body text, headings |
| **Dark Gray** | `#444` | Secondary body text, paragraph text |
| **Medium Gray** | `#777` | Helper text, descriptions |
| **Light Gray** | `#aaa` | Muted text, placeholders, icons |
| **Border** | `#e0dcd7` | Card borders, dividers |
| **White** | `#fff` | Card backgrounds |
| **Off-white** | `#fafafa` | Textarea backgrounds |

### Section Colours

| Section | Hex | Icon | Usage |
|---------|-----|------|-------|
| As a Partner | `#3AAFB9` | ♡ | Stepper, borders, accents |
| As a Parent | `#A06CD5` | ⌂ | Stepper, borders, accents |
| Shared Vision | `#C60F7B` | ∞ | Stepper, borders, accents |

### SMART Badge Colours (pastel bg + dark text)

| Category | Text | Background |
|----------|------|------------|
| Specific | `#02b7d6` | `#d1fafe` |
| Measurable | `#ec4799` | `#fee7f4` |
| Achievable | `#7f32fe` | `#f4eaff` |
| Relevant | `#22c55f` | `#dcfce9` |
| Time-bound | `#fa7417` | `#ffecd5` |

---

## Gradients

**Hero gradient:**
```css
background: linear-gradient(135deg, #3AAFB9 0%, #2d8f97 100%);
```

---

## Buttons

### Primary CTA
```css
background: #3AAFB9;
color: #fff;
border: none;
padding: 1rem 2.5rem;
font-size: 1rem;
letter-spacing: 0.2em;
font-weight: 600;
border-radius: 3px;
```

### Outline / Secondary
```css
background: transparent;
color: #3AAFB9;
border: 1px solid #3AAFB9;
padding: 0.9rem 2rem;
font-weight: 600;
border-radius: 3px;
```

### Header Button (on teal bg)
```css
/* Ghost */
background: transparent;
color: #fff;
border: 1px solid rgba(255,255,255,0.5);

/* Solid */
background: #fff;
color: #3AAFB9;
font-weight: 600;
```

---

## Cards

### Standard card
```css
background: #fff;
border: 1px solid #e0dcd7;
padding: 1.5rem;
border-radius: 4px;
```

### Accent card (with section colour)
```css
border-left: 3px solid {sectionColor};
/* or */
border-top: 3px solid {sectionColor};
```

### Elevated card
```css
box-shadow: 0 2px 12px rgba(0,0,0,0.06);
/* or for mockups */
box-shadow: 0 8px 30px rgba(0,0,0,0.08);
```

---

## Layout

| Element | Max Width |
|---------|-----------|
| Homepage sections | 1100px |
| Questionnaire container | 1100px |
| Hero text | 780px |
| Centered cards (name, export) | 480–620px |

**Responsive breakpoint:** 480px (mobile)

**Desktop layout:** Two-column flex — left column (questions, flex: 1 1 0%), right column (quote card, fixed 300px width, sticky at `calc(50vh - 120px)`).

**Mobile:** Single column, right quote column hidden.

---

## Animations

### Quote card float
```css
@keyframes quoteFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
/* Applied: animation: quoteFloat 6s ease-in-out infinite */
```

### Quote fade-in (on question switch)
```css
@keyframes quoteFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Applied: animation: quoteFadeIn 0.4s ease-out */
```

### Geometric floating SVGs
```css
@keyframes geoFloat1 { /* 6s */ }
@keyframes geoFloat2 { /* 8s */ }
@keyframes geoFloat3 { /* 7s */ }
```
Four thin-line SVG shapes (circle, square, triangle, cross) in the section colour with low opacity (0.08–0.2), floating independently around the quote card.

### Header slide-in
```css
transform: translateY(-100%); /* hidden */
transform: translateY(0);     /* visible */
transition: transform 0.3s ease;
```
Header is hidden on homepage, slides in after 80px scroll. Always visible on questionnaire pages.

---

## Stepper / Progress Indicators

- **Active step:** Solid section colour background, white icon
- **Completed step (all fields filled):** Solid section colour, white ✓
- **Completed step (partial):** Solid section colour, white ●
- **Future step:** White background, gray border, gray icon
- **Connector line (past):** Section colour
- **Connector line (future):** `#ddd`

---

## Quote Card Design

- Large decorative `"` quotation mark (4.5rem, Georgia serif, section colour, 20% opacity)
- Italic quote text, `#444`, 1.05rem
- Author attribution below a subtle `#f0ece7` divider, `#aaa`, 0.85rem
- Left border in section colour (3px solid)
- White background, subtle border
- Surrounded by 4 floating geometric SVGs

---

## Email Branding

**Sender:** Day Zero <hello@day-zero.co.za>

**Email structure:**
1. Teal header bar (`#3AAFB9`) with white "Day Zero" title + tagline
2. Cream body (`#F7F4EF`) with content
3. Teal CTA button
4. Footer with domain

**Emails:**
- Welcome email (after signup)
- Password reset email

---

## Tech Stack

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting + deployment |
| **Supabase** | Auth + database (PostgreSQL) |
| **Resend** | Transactional emails |
| **Cloudflare** | DNS |
| **React + Vite** | Frontend framework |

**Supabase project ID:** `omwffvowdzjpxivrjfcx`
**Region:** eu-central-1

---

## Tone of Voice

- Warm, honest, non-judgmental
- Direct but gentle
- Never clinical or corporate
- Speaks to the person, not at them
- Acknowledges difficulty without dramatising
- Examples: "Be honest. Be kind." / "No pressure, ever." / "This is your starting point — not a contract."
