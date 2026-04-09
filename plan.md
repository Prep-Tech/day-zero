# Plan: Contextual Quotes for Each Question

## Overview

Add 15 carefully chosen quotes — one for each question — that appear in the right column (`quote-column`) when a user clicks into (opens) a question. The quotes should inspire reflection and help the user think more deeply about their answer.

## Data Structure

Add a `quote` field to each question object in the `sections` array in `App.jsx`. Each quote has `text` and `author`.

## The 15 Quotes

### Section 1: As a Partner (vp1–vp5)

**vp1 — "The kind of partner I want to be"**
> "The beginning of love is the will to let those we love be perfectly themselves, the resolution not to twist them to fit our own image."
> — Thomas Merton

**vp2 — "How I will show love in concrete ways"**
> "Love is a verb. Love — the feeling — is the fruit of love the verb. So love her. Sacrifice. Listen. Empathise. Appreciate. Affirm."
> — Stephen Covey

**vp3 — "One realistic change I can commit to"**
> "When we are no longer able to change a situation, we are challenged to change ourselves."
> — Viktor Frankl

**vp4 — "What matters most to me in this relationship"**
> "The greatest thing you'll ever learn is just to love and be loved in return."
> — Eden Ahbez

**vp5 — "A 90-day vision for us"**
> "A year from now you will wish you had started today."
> — Karen Lamb

### Section 2: As a Parent (pp1–pp5)

**pp1 — "The parent I want to be"**
> "Children have never been very good at listening to their elders, but they have never failed to imitate them."
> — James Baldwin

**pp2 — "How I will show up as a parent in concrete ways"**
> "The most important thing a father can do for his children is to love their mother."
> — Theodore Hesburgh

**pp3 — "What I will personally stop doing in front of my children"**
> "Children are great imitators. So give them something great to imitate."
> — Anonymous

**pp4 — "The emotional legacy I want to leave my children"**
> "Your children will become what you are; so be what you want them to be."
> — David Bly

**pp5 — "One parenting ritual I will start this month"**
> "In every dispute between parent and child, both cannot be right, but they may be, and usually are, both wrong. It is this situation which gives family life its peculiar hysterical charm."
> — Isaac Rosenfeld

### Section 3: Shared Vision (sv1–sv5)

**sv1 — "What I think our family needs most right now"**
> "Family is not an important thing. It's everything."
> — Michael J. Fox

**sv2 — "How I'll know things are getting better"**
> "Trust is built in very small moments."
> — Brené Brown

**sv3 — "One thing I believe we can realistically do together"**
> "Alone we can do so little; together we can do so much."
> — Helen Keller

**sv4 — "Why I think this relationship is still worth fighting for"**
> "The couples that are meant to be are the ones who go through everything that is designed to tear them apart, and come out even stronger."
> — Unknown

**sv5 — "My commitment for the next 30 days"**
> "It does not matter how slowly you go as long as you do not stop."
> — Confucius

## Implementation

### Step 1: Add quote data to each question object

In `App.jsx`, add a `quote` property to each question in the `sections` array:
```js
{
  id: "vp1", smart: "Specific",
  prompt: "The kind of partner I want to be",
  quote: {
    text: "The beginning of love is the will to let those we love be perfectly themselves...",
    author: "Thomas Merton"
  },
  // ... rest of question
}
```

### Step 2: Populate the right column

Replace the empty `quote-column` div (line 967) with a component that reads the currently active question (`activeQ`) and displays its quote.

Logic:
- Find the active question: `activeSection.questions.find(q => q.id === activeQ)`
- If found and has a quote, render it
- If no question is open, show a default section-level message

The quote display should be a sticky card:
```jsx
<div className="quote-column" style={{ flex: "1 1 260px", minWidth: 0, position: "sticky", top: "1rem", alignSelf: "flex-start" }}>
  {activeQuestion?.quote ? (
    <div style={{
      background: "#fff",
      border: "1px solid #e0dcd7",
      borderLeft: `3px solid ${activeSection.color}`,
      padding: "1.5rem",
      borderRadius: 4,
    }}>
      <div style={{ fontSize: "1.8rem", color: activeSection.color, lineHeight: 1, marginBottom: "0.5rem" }}>"</div>
      <p style={{
        fontStyle: "italic", color: "#444",
        fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
        lineHeight: 1.6, margin: "0 0 1rem",
      }}>
        {activeQuestion.quote.text}
      </p>
      <div style={{ fontSize: "0.85rem", color: "#aaa" }}>
        — {activeQuestion.quote.author}
      </div>
    </div>
  ) : (
    <div style={{
      background: "#fff",
      border: "1px solid #e0dcd7",
      borderLeft: `3px solid ${activeSection.color}`,
      padding: "1.5rem",
      borderRadius: 4,
      color: "#aaa",
      fontStyle: "italic",
      fontSize: "0.95rem",
    }}>
      Click a question to see an inspiring thought to guide your reflection.
    </div>
  )}
</div>
```

### Step 3: Keep hidden on mobile

The existing CSS rule `.quote-column { display: none !important; }` at the 480px breakpoint already handles this — no changes needed.

### Files to modify

- `src/App.jsx` — add `quote` field to all 15 questions, replace the empty `quote-column` div with the quote display component

### No new files or dependencies needed.
