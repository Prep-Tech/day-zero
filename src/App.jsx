import { useState } from "react";

const PARTNERS = ["Partner A", "Partner B"];

const sections = [
  {
    id: "intro",
    label: "Day Zero Declaration",
    icon: "○",
    color: "#C8A96E",
    description: "Before beginning, both partners silently read and accept the premise.",
    intro: true,
  },
  {
    id: "vision-partner",
    label: "As a Partner",
    icon: "◇",
    color: "#7EB8C9",
    questions: [
      {
        id: "vp1",
        smart: "Specific",
        prompt: "The kind of partner I want to be",
        sentence: "Starting today, I want to show up as a partner who is ____, ____, and ____.",
        hint: "e.g. present, patient, affectionate",
        type: "fill",
        fields: ["Quality 1", "Quality 2", "Quality 3"],
      },
      {
        id: "vp2",
        smart: "Measurable",
        prompt: "How I will show love in concrete ways",
        sentence: "I will demonstrate love by doing ____ at least ____ times per ____.",
        hint: "e.g. leaving a note, once, week",
        type: "fill",
        fields: ["Action", "Frequency", "Time period"],
      },
      {
        id: "vp3",
        smart: "Achievable",
        prompt: "One realistic change I can commit to",
        sentence: "One thing I know I can genuinely change is ____. I've held back because ____, but I'm ready to try because ____.",
        hint: "Be honest and specific",
        type: "fill",
        fields: ["The change", "What held me back", "Why I'm ready now"],
      },
      {
        id: "vp4",
        smart: "Relevant",
        prompt: "What matters most to me in this relationship",
        sentence: "What I value most about us is ____. I want our relationship to be remembered as ____.",
        hint: "Think about your core 'why'",
        type: "fill",
        fields: ["What I value most", "How I want it remembered"],
      },
      {
        id: "vp5",
        smart: "Time-bound",
        prompt: "A 90-day vision for us",
        sentence: "In 90 days, I want us to be able to say that we ____. My first step this week is ____.",
        hint: "Make it achievable within 90 days",
        type: "fill",
        fields: ["90-day milestone", "First step this week"],
      },
    ],
  },
  {
    id: "vision-parent",
    label: "As a Parent",
    icon: "△",
    color: "#A8C5A0",
    questions: [
      {
        id: "pp1",
        smart: "Specific",
        prompt: "The parent I want to be",
        sentence: "I want my child(ren) to describe me as ____, ____, and ____. If I'm honest, I think they would say right now I am ____.",
        hint: "Picture how your child experiences you — not how you intend to be",
        type: "fill",
        fields: ["Ideal quality 1", "Ideal quality 2", "Ideal quality 3", "Honest current reality"],
      },
      {
        id: "pp2",
        smart: "Measurable",
        prompt: "How I will show up as a parent in concrete ways",
        sentence: "I will be more present as a parent by doing ____ at least ____ times per ____. I will know it's working when my child ____.",
        hint: "Think about specific moments — bedtime, school pick-up, weekends",
        type: "fill",
        fields: ["The action", "How often", "Time period", "How my child will show me it's working"],
      },
      {
        id: "pp3",
        smart: "Achievable",
        prompt: "What I will personally stop doing in front of my children",
        sentence: "I commit to no longer ____ in front of my child(ren). When I feel that urge rising, I will instead ____. I know this is possible because ____.",
        hint: "Own only your behaviour — not your partner's",
        type: "fill",
        fields: ["What I will stop", "What I'll do instead", "Why I believe I can do this"],
      },
      {
        id: "pp4",
        smart: "Relevant",
        prompt: "The emotional legacy I want to leave my children",
        sentence: "I want my child(ren) to feel ____ in our home. The thing I never want them to carry into adulthood because of how I showed up is ____. What I do want them to carry is ____.",
        hint: "Think about what your own childhood gave you — and what it didn't",
        type: "fill",
        fields: ["How I want them to feel", "What I don't want to pass on", "What I do want to pass on"],
      },
      {
        id: "pp5",
        smart: "Time-bound",
        prompt: "One parenting ritual I will start this month",
        sentence: "By the end of this month, I will personally establish ____ as a ritual with my child(ren). It will happen every ____ and I will protect that time by ____.",
        hint: "This is yours to own — not contingent on your partner",
        type: "fill",
        fields: ["My ritual", "How often", "How I will protect it"],
      },
    ],
  },
  {
    id: "shared",
    label: "Shared Vision",
    icon: "✦",
    color: "#C9A0C5",
    shared: true,
    questions: [
      {
        id: "sv1",
        smart: "Specific",
        prompt: "What I think our family needs most right now",
        sentence: "I think the most important thing for our family right now is ____. I feel this matters because ____.",
        hint: "Say what you genuinely believe — your partner will share theirs too",
        type: "fill",
        fields: ["What I think matters most", "Why I feel it matters"],
      },
      {
        id: "sv2",
        smart: "Measurable",
        prompt: "How I'll know things are getting better",
        sentence: "I think I'll feel we're improving when I start to notice ____. I'd feel comfortable checking in on this every ____.",
        hint: "Think about what a better dynamic would actually look and feel like to you",
        type: "fill",
        fields: ["The sign I'd notice", "Check-in frequency I'm comfortable with"],
      },
      {
        id: "sv3",
        smart: "Achievable",
        prompt: "One thing I believe we can realistically do together",
        sentence: "I think one thing we could actually achieve together is ____. I feel we'd need ____ to make it work.",
        hint: "Keep it small and winnable — momentum matters more than ambition right now",
        type: "fill",
        fields: ["What I think we can do", "What I feel we'd need"],
      },
      {
        id: "sv4",
        smart: "Relevant",
        prompt: "Why I think this relationship is still worth fighting for",
        sentence: "I think what still connects us is ____. I feel our children deserve to see us ____.",
        hint: "This is your 'why' — be honest with yourself first",
        type: "fill",
        fields: ["What I think still connects us", "What I feel our children deserve to see"],
      },
      {
        id: "sv5",
        smart: "Time-bound",
        prompt: "My commitment for the next 30 days",
        sentence: "I commit to ____ for the next 30 days. If I slip, I will ____ rather than give up. I'd like us to revisit this on ____.",
        hint: "Speak only for yourself — your partner will make their own commitment",
        type: "fill",
        fields: ["My personal commitment", "My recovery plan", "A date to revisit"],
      },
    ],
  },
];

const smartColors = {
  Specific: "#E8A87C",
  Measurable: "#7EB8C9",
  Achievable: "#A8C5A0",
  Relevant: "#C8A96E",
  "Time-bound": "#C9A0C5",
};

const printStyles = `
@media print {
  body { background: #fff !important; }
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  .print-page { page-break-after: always; }
  .print-section { page-break-inside: avoid; margin-bottom: 2rem; }
}
@media screen {
  .print-only { display: none; }
}
`;

function buildPrintContent(partnerName, answers) {
  const getKey = (pid, qid, fi) => `${pid}__${qid}__${fi}`;
  const getValue = (pid, qid, fi) => answers[getKey(pid, qid, fi)] || "";

  const contentSections = sections.slice(1);

  return contentSections.map((section) => {
    const questions = section.questions || [];
    return `
      <div class="print-section">
        <div style="font-size:0.7rem;letter-spacing:0.25em;color:#888;margin-bottom:0.3rem;text-transform:uppercase;">
          ${section.icon} ${section.label}
        </div>
        ${questions.map((q) => {
          const parts = q.sentence.split(/____/);
          let filledSentence = "";
          parts.forEach((part, i) => {
            filledSentence += part;
            if (i < q.fields.length) {
              const val = getValue(partnerName, q.id, i);
              filledSentence += val
                ? `<span style="border-bottom:2px solid #C8A96E;padding:0 4px;font-style:italic;">${val}</span>`
                : `<span style="border-bottom:2px solid #ddd;padding:0 20px;color:#ccc;">...</span>`;
            }
          });
          const notes = getValue(partnerName, q.id, "notes");
          return `
            <div style="margin-bottom:1.2rem;padding:0.8rem 1rem;border-left:3px solid ${smartColors[q.smart]};background:#fafafa;">
              <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.5rem;">
                <span style="background:${smartColors[q.smart]};color:#fff;font-size:0.6rem;letter-spacing:0.15em;padding:2px 6px;">${q.smart.toUpperCase()}</span>
                <strong style="font-size:0.85rem;">${q.prompt}</strong>
              </div>
              <div style="font-family:Georgia,serif;font-size:0.95rem;line-height:2;">${filledSentence}</div>
              ${notes ? `<div style="margin-top:0.6rem;font-size:0.85rem;color:#555;font-style:italic;border-top:1px solid #eee;padding-top:0.5rem;">${notes}</div>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("");
}

function exportToPDF(partnerName, answers) {
  const content = buildPrintContent(partnerName, answers);
  const date = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Day Zero — ${partnerName}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Palatino Linotype', Palatino, serif; color: #1a1a1a; background: #fff; padding: 2.5rem; max-width: 750px; margin: 0 auto; }
        @media print {
          body { padding: 1.5rem; }
          @page { margin: 1.5cm; }
        }
      </style>
    </head>
    <body>
      <div style="text-align:center;border-bottom:2px solid #C8A96E;padding-bottom:1.5rem;margin-bottom:2rem;">
        <div style="font-size:0.7rem;letter-spacing:0.3em;color:#888;margin-bottom:0.4rem;">A FRAMEWORK FOR RENEWAL</div>
        <h1 style="font-size:2rem;font-weight:400;color:#C8A96E;margin-bottom:0.3rem;">Day Zero</h1>
        <div style="font-size:0.85rem;color:#888;font-style:italic;">All past issues are forgiven and forgotten. Today we begin again.</div>
        <div style="margin-top:1rem;font-size:0.9rem;color:#444;">
          <strong>${partnerName}</strong> &nbsp;·&nbsp; ${date}
        </div>
      </div>
      ${content}
      <div style="text-align:center;margin-top:3rem;padding-top:1rem;border-top:1px solid #eee;font-size:0.75rem;color:#aaa;font-style:italic;">
        This document is private and personal. Share only when you are ready.
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
}

export default function DayZeroFramework() {
  const [activePartner, setActivePartner] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [accepted, setAccepted] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [exportPartner, setExportPartner] = useState(0);
  const [showExport, setShowExport] = useState(false);

  const activeSection = sections[activeSectionIdx];
  const isShared = activeSection.shared;

  const getKey = (partnerId, questionId, fieldIdx) =>
    `${partnerId}__${questionId}__${fieldIdx}`;

  const getValue = (partnerId, questionId, fieldIdx) =>
    answers[getKey(partnerId, questionId, fieldIdx)] || "";

  const setValue = (partnerId, questionId, fieldIdx, val) => {
    setAnswers((prev) => ({
      ...prev,
      [getKey(partnerId, questionId, fieldIdx)]: val,
    }));
  };

  const getCompletionCount = (partnerName) => {
    let count = 0;
    sections.slice(1).forEach((s) => {
      s.questions?.forEach((q) => {
        if (q.fields.some((_, fi) => answers[getKey(partnerName, q.id, fi)]?.length > 0)) count++;
      });
    });
    return count;
  };

  const totalQuestions = sections.slice(1).reduce((acc, s) => acc + (s.questions?.length || 0), 0);

  const renderSentence = (question, partnerId) => {
    const parts = question.sentence.split(/____/);
    return (
      <div style={{ lineHeight: "2.2", fontSize: "1.05rem", color: "#2a2a2a", fontFamily: "'Georgia', serif" }}>
        {parts.map((part, i) => (
          <span key={i}>
            <span>{part}</span>
            {i < question.fields.length && (
              <input
                placeholder={question.fields[i]}
                value={getValue(partnerId, question.id, i)}
                onChange={(e) => setValue(partnerId, question.id, i, e.target.value)}
                style={{
                  border: "none",
                  borderBottom: `2px solid ${activeSection.color || "#C8A96E"}`,
                  background: "transparent",
                  padding: "2px 6px",
                  fontSize: "1rem",
                  fontFamily: "'Georgia', serif",
                  color: "#1a1a1a",
                  minWidth: "120px",
                  maxWidth: "220px",
                  outline: "none",
                  textAlign: "center",
                }}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Palatino Linotype', 'Palatino', serif", color: "#1a1a1a" }}>
      <style>{printStyles}</style>

      {/* Header */}
      <div style={{ background: "#1C1C1C", color: "#C8A96E", padding: "2rem 2rem 1.5rem", textAlign: "center", letterSpacing: "0.12em" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#888", marginBottom: "0.5rem" }}>A FRAMEWORK FOR RENEWAL</div>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "400", color: "#C8A96E" }}>Day Zero</h1>
        <p style={{ margin: "0.5rem 0 0", color: "#aaa", fontSize: "0.9rem", fontStyle: "italic" }}>
          All past issues are forgiven and forgotten. Today we begin again.
        </p>
      </div>

      {/* Intro acceptance */}
      {!accepted && (
        <div style={{ maxWidth: 640, margin: "3rem auto", background: "#fff", borderRadius: 2, padding: "2.5rem", boxShadow: "0 2px 24px rgba(0,0,0,0.07)", border: "1px solid #E5DDD0" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#C8A96E", marginBottom: "1rem" }}>BEFORE YOU BEGIN</div>
          <h2 style={{ fontWeight: 400, fontSize: "1.4rem", marginTop: 0 }}>The Day Zero Premise</h2>
          <p style={{ color: "#555", lineHeight: 1.8 }}>
            This exercise asks both of you to do something genuinely difficult: set aside everything that has happened and answer honestly about the future you <em>want</em> — not the past you're carrying.
          </p>
          <p style={{ color: "#555", lineHeight: 1.8 }}>
            There are no right answers. There is no winner. The only goal is clarity — for yourself, and then for each other.
          </p>
          <ul style={{ color: "#555", lineHeight: 2, paddingLeft: "1.2rem" }}>
            <li>Each partner completes their sections <strong>independently</strong></li>
            <li>Use the fill-in sentences to guide, not limit, what you want to say</li>
            <li>SMART goals keep intentions <strong>concrete and actionable</strong></li>
            <li>Export your answers as a PDF when you're ready to share</li>
          </ul>
          <div style={{ background: "#F7F4EF", borderLeft: "3px solid #C8A96E", padding: "1rem 1.2rem", margin: "1.5rem 0", fontStyle: "italic", color: "#555" }}>
            "If today was Day Zero — all past issues forgiven and forgotten — how do you see your life going forward?"
          </div>
          <button
            onClick={() => setAccepted(true)}
            style={{ background: "#1C1C1C", color: "#C8A96E", border: "none", padding: "0.9rem 2.5rem", fontSize: "0.85rem", letterSpacing: "0.2em", cursor: "pointer", width: "100%", marginTop: "0.5rem" }}
          >
            I ACCEPT THE PREMISE — BEGIN
          </button>
        </div>
      )}

      {accepted && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>

          {/* Section nav */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {sections.slice(1).map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActiveSectionIdx(i + 1); setActiveQ(null); setShowExport(false); }}
                style={{
                  background: activeSectionIdx === i + 1 ? "#1C1C1C" : "#fff",
                  color: activeSectionIdx === i + 1 ? s.color : "#555",
                  border: `1px solid ${activeSectionIdx === i + 1 ? "#1C1C1C" : "#ddd"}`,
                  padding: "0.5rem 1.2rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  borderRadius: 1,
                }}
              >
                {s.icon} {s.label.toUpperCase()}
              </button>
            ))}
            <button
              onClick={() => { setShowExport(true); setActiveSectionIdx(-1); }}
              style={{
                background: showExport ? "#C8A96E" : "#fff",
                color: showExport ? "#fff" : "#C8A96E",
                border: "1px solid #C8A96E",
                padding: "0.5rem 1.2rem",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                cursor: "pointer",
                borderRadius: 1,
              }}
            >
              ↓ EXPORT PDF
            </button>
          </div>

          {/* Export panel */}
          {showExport && (
            <div style={{ background: "#fff", border: "1px solid #C8A96E", padding: "2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C8A96E", marginBottom: "1rem" }}>EXPORT YOUR ANSWERS</div>
              <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Each partner exports their own answers as a private PDF. Share it with each other — or with a counsellor — when you feel ready.
              </p>

              {PARTNERS.map((p, i) => {
                const count = getCompletionCount(p);
                return (
                  <div key={p} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.2rem", border: "1px solid #E5DDD0", marginBottom: "0.8rem", background: "#F7F4EF" }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: "0.2rem" }}>{p}</div>
                      <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                        {count} of {totalQuestions} questions answered
                      </div>
                      <div style={{ marginTop: "0.4rem", height: 4, background: "#eee", width: 180, borderRadius: 2 }}>
                        <div style={{ height: 4, background: "#C8A96E", borderRadius: 2, width: `${(count / totalQuestions) * 100}%`, transition: "width 0.4s" }} />
                      </div>
                    </div>
                    <button
                      onClick={() => exportToPDF(p, answers)}
                      style={{
                        background: "#1C1C1C",
                        color: "#C8A96E",
                        border: "none",
                        padding: "0.7rem 1.5rem",
                        fontSize: "0.8rem",
                        letterSpacing: "0.15em",
                        cursor: "pointer",
                      }}
                    >
                      EXPORT PDF
                    </button>
                  </div>
                );
              })}

              <p style={{ fontSize: "0.78rem", color: "#aaa", fontStyle: "italic", marginTop: "1rem", lineHeight: 1.7 }}>
                The PDF opens in a new tab — use your browser's print dialog and choose "Save as PDF". Your answers never leave your device.
              </p>
            </div>
          )}

          {/* Questions panel */}
          {!showExport && (
            <>
              {/* Partner toggle (not for shared) */}
              {!isShared && (
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {PARTNERS.map((p, i) => (
                    <button
                      key={p}
                      onClick={() => setActivePartner(i)}
                      style={{
                        background: activePartner === i ? activeSection.color : "transparent",
                        color: activePartner === i ? "#fff" : "#888",
                        border: `1px solid ${activeSection.color}`,
                        padding: "0.4rem 1.2rem",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        borderRadius: 1,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {isShared && (
                <>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    {PARTNERS.map((p, i) => (
                      <button
                        key={p}
                        onClick={() => setActivePartner(i)}
                        style={{
                          background: activePartner === i ? "#C9A0C5" : "transparent",
                          color: activePartner === i ? "#fff" : "#888",
                          border: "1px solid #C9A0C5",
                          padding: "0.4rem 1.2rem",
                          fontSize: "0.8rem",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                          borderRadius: 1,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <div style={{ background: "#F0EBF4", border: "1px solid #C9A0C5", padding: "0.8rem 1.2rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#6a4e6a", fontStyle: "italic" }}>
                    ✦ Each person answers independently using "I think / I feel" — then share your answers and listen without interrupting.
                  </div>
                </>
              )}

              {/* Questions */}
              {activeSection.questions?.map((q) => {
                const isOpen = activeQ === q.id;
                const partnerId = PARTNERS[activePartner];
                const hasContent = q.fields.some((_, fi) => getValue(partnerId, q.id, fi).length > 0);

                return (
                  <div
                    key={q.id}
                    style={{
                      background: "#fff",
                      border: `1px solid ${isOpen ? activeSection.color : "#E5DDD0"}`,
                      borderLeft: `4px solid ${isOpen ? activeSection.color : "#E5DDD0"}`,
                      marginBottom: "1rem",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <button
                      onClick={() => setActiveQ(isOpen ? null : q.id)}
                      style={{ width: "100%", background: "none", border: "none", padding: "1.2rem 1.5rem", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}
                    >
                      <span style={{ background: smartColors[q.smart], color: "#fff", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "2px 8px", borderRadius: 1, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {q.smart.toUpperCase()}
                      </span>
                      <span style={{ fontSize: "0.95rem", color: "#1a1a1a", flex: 1 }}>{q.prompt}</span>
                      {hasContent && <span style={{ color: "#A8C5A0", fontSize: "1rem" }}>✓</span>}
                      <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: "0 1.5rem 1.5rem" }}>
                        {q.hint && (
                          <div style={{ fontSize: "0.78rem", color: "#aaa", marginBottom: "1rem", fontStyle: "italic" }}>
                            Guiding thought: {q.hint}
                          </div>
                        )}
                        <div style={{ background: "#F7F4EF", padding: "1.2rem 1.5rem", borderRadius: 1, marginBottom: "1rem" }}>
                          {renderSentence(q, partnerId)}
                        </div>
                        <textarea
                          placeholder="Any additional thoughts you want to express beyond the sentence above..."
                          value={getValue(partnerId, q.id, "notes")}
                          onChange={(e) => setValue(partnerId, q.id, "notes", e.target.value)}
                          rows={3}
                          style={{ width: "100%", border: "1px solid #E5DDD0", padding: "0.8rem", fontSize: "0.9rem", fontFamily: "inherit", color: "#333", background: "#fafafa", resize: "vertical", boxSizing: "border-box", outline: "none" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* SMART legend */}
              <div style={{ marginTop: "2rem", padding: "1.2rem 1.5rem", background: "#fff", border: "1px solid #E5DDD0" }}>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#aaa", marginBottom: "0.8rem" }}>SMART GOAL FRAMEWORK</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                  {Object.entries(smartColors).map(([label, color]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <div style={{ width: 10, height: 10, background: color, borderRadius: "50%" }} />
                      <span style={{ fontSize: "0.78rem", color: "#555" }}><strong>{label[0]}</strong>{label.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <div style={{ textAlign: "center", marginTop: "2rem", color: "#aaa", fontSize: "0.8rem", fontStyle: "italic", lineHeight: 1.8 }}>
                Your answers are private until you choose to share them.<br />
                This framework is a starting point — not a contract. Be honest. Be kind.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
