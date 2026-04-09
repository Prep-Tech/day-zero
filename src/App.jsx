import React, { useState } from "react";

const sections = [
  {
    id: "vision-partner",
    label: "As a Partner",
    icon: "◇",
    color: "#588157",
    description: "This section is about you as a partner — not as a parent, not as a co-parent. Just you, and the person you want to show up as in this relationship. Answer honestly and speak only for yourself.",
    questions: [
      {
        id: "vp1", smart: "Specific",
        prompt: "The kind of partner I want to be",
        sentence: "Starting today, I want to show up as a partner who is ____, ____, and ____.",
        hint: "e.g. present, patient, affectionate",
        fields: ["Quality 1", "Quality 2", "Quality 3"],
      },
      {
        id: "vp2", smart: "Measurable",
        prompt: "How I will show love in concrete ways",
        sentence: "I will demonstrate love by ____ at least ____ times per ____.",
        hint: "e.g. leaving a note, once, week",
        fields: ["Action", "Frequency", "Time period"],
      },
      {
        id: "vp3", smart: "Achievable",
        prompt: "One realistic change I can commit to",
        sentence: "One thing I know I can genuinely change is ____. I've held back because ____, but I'm ready to try because ____.",
        hint: "Be honest and specific",
        fields: ["The change", "What held me back", "Why I'm ready now"],
      },
      {
        id: "vp4", smart: "Relevant",
        prompt: "What matters most to me in this relationship",
        sentence: "What I value most about us is ____. I want our relationship to be remembered as ____.",
        hint: "Think about your core 'why'",
        fields: ["What I value most", "How I want it remembered"],
      },
      {
        id: "vp5", smart: "Time-bound",
        prompt: "A 90-day vision for us",
        sentence: "In 90 days, I want us to be able to say that we ____. My first step this week is ____.",
        hint: "Make it achievable within 90 days",
        fields: ["90-day milestone", "First step this week"],
      },
    ],
  },
  {
    id: "vision-parent",
    label: "As a Parent",
    icon: "△",
    color: "#A3B18A",
    description: "This section is about you as an individual parent — not about co-parenting, not about your partner's role. Focus on what you personally want to give your children, what you want to stop, and the legacy you want to leave them.",
    questions: [
      {
        id: "pp1", smart: "Specific",
        prompt: "The parent I want to be",
        sentence: "I want my child(ren) to describe me as ____, ____, and ____. If I'm honest, I think they would say right now I am ____.",
        hint: "Picture how your child experiences you — not how you intend to be",
        fields: ["Ideal quality 1", "Ideal quality 2", "Ideal quality 3", "Honest current reality"],
      },
      {
        id: "pp2", smart: "Measurable",
        prompt: "How I will show up as a parent in concrete ways",
        sentence: "I will be more present as a parent by ____ at least ____ times per ____. I will know it's working when my child ____.",
        hint: "Think about specific moments — bedtime, school pick-up, weekends",
        fields: ["The action", "How often", "Time period", "How my child will show me it's working"],
      },
      {
        id: "pp3", smart: "Achievable",
        prompt: "What I will personally stop doing in front of my children",
        sentence: "I commit to no longer ____ in front of my child(ren). When I feel that urge rising, I will instead ____. I know this is possible because ____.",
        hint: "Own only your behaviour — not your partner's",
        fields: ["What I will stop", "What I'll do instead", "Why I believe I can do this"],
      },
      {
        id: "pp4", smart: "Relevant",
        prompt: "The emotional legacy I want to leave my children",
        sentence: "I want my child(ren) to feel ____ in our home. The thing I never want them to carry into adulthood because of how I showed up is ____. What I do want them to carry is ____.",
        hint: "Think about what your own childhood gave you — and what it didn't",
        fields: ["How I want them to feel", "What I don't want to pass on", "What I do want to pass on"],
      },
      {
        id: "pp5", smart: "Time-bound",
        prompt: "One parenting ritual I will start this month",
        sentence: "By the end of this month, I will personally establish ____ as a ritual with my child(ren). It will happen every ____ and I will protect that time by ____.",
        hint: "This is yours to own — not contingent on your partner",
        fields: ["My ritual", "How often", "How I will protect it"],
      },
    ],
  },
  {
    id: "shared",
    label: "Shared Vision",
    icon: "✦",
    color: "#3A5A40",
    shared: true,
    description: "This final section is still answered individually — each partner completes it separately using 'I think' and 'I feel' language. Once both of you are done, sit together and take turns reading your answers out loud. Listen without interrupting.",
    questions: [
      {
        id: "sv1", smart: "Specific",
        prompt: "What I think our family needs most right now",
        sentence: "I think the most important thing for our family right now is ____. I feel this matters because ____.",
        hint: "Say what you genuinely believe — your partner will share theirs too",
        fields: ["What I think matters most", "Why I feel it matters"],
      },
      {
        id: "sv2", smart: "Measurable",
        prompt: "How I'll know things are getting better",
        sentence: "I think I'll feel we're improving when I start to notice ____. I'd feel comfortable checking in on this every ____.",
        hint: "Think about what a better dynamic would actually look and feel like to you",
        fields: ["The sign I'd notice", "Check-in frequency I'm comfortable with"],
      },
      {
        id: "sv3", smart: "Achievable",
        prompt: "One thing I believe we can realistically do together",
        sentence: "I think one thing we could actually achieve together is ____. I feel we'd need ____ to make it work.",
        hint: "Keep it small and winnable — momentum matters more than ambition right now",
        fields: ["What I think we can do", "What I feel we'd need"],
      },
      {
        id: "sv4", smart: "Relevant",
        prompt: "Why I think this relationship is still worth fighting for",
        sentence: "I think what still connects us is ____. I feel our children deserve to see us ____.",
        hint: "This is your 'why' — be honest with yourself first",
        fields: ["What I think still connects us", "What I feel our children deserve to see"],
      },
      {
        id: "sv5", smart: "Time-bound",
        prompt: "My commitment for the next 30 days",
        sentence: "I commit to ____ for the next 30 days. If I slip, I will ____ rather than give up. I'd like us to revisit this on ____.",
        hint: "Speak only for yourself — your partner will make their own commitment",
        fields: ["My personal commitment", "My recovery plan", "A date to revisit"],
      },
    ],
  },
];

const smartColors = {
  Specific: "#588157",
  Measurable: "#3A5A40",
  Achievable: "#A3B18A",
  Relevant: "#344E41",
  "Time-bound": "#DAD7CD",
};

// Must be outside component to preserve input focus
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false
  );
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const AutoInput = ({ placeholder, value, onChange, color }) => {
  const isMobile = useIsMobile();
  const spanRef = React.useRef(null);
  const [desktopWidth, setDesktopWidth] = React.useState(150);

  React.useEffect(() => {
    if (!isMobile && spanRef.current) {
      setDesktopWidth(Math.max(150, spanRef.current.offsetWidth + 24));
    }
  }, [value, placeholder, isMobile]);

  if (isMobile) {
    return (
      <span style={{ display: "block", margin: "0.3rem 0" }}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            border: "none",
            borderBottom: `2px solid ${color || "#588157"}`,
            background: "transparent",
            padding: "4px 4px",
            fontSize: "1.1rem",
            fontFamily: "'Montserrat', sans-serif",
            color: "#1a1a1a",
            width: "100%",
            outline: "none",
            textAlign: "left",
          }}
        />
      </span>
    );
  }

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={spanRef} style={{
        position: "absolute", visibility: "hidden", whiteSpace: "pre",
        fontSize: "1.22rem", fontFamily: "'Montserrat', sans-serif", padding: "2px 6px",
      }}>
        {value || placeholder}
      </span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          border: "none",
          borderBottom: `2px solid ${color || "#588157"}`,
          background: "transparent",
          padding: "2px 6px",
          fontSize: "1.22rem",
          fontFamily: "'Montserrat', sans-serif",
          color: "#1a1a1a",
          width: desktopWidth,
          outline: "none",
          textAlign: "center",
          transition: "width 0.1s",
        }}
      />
    </span>
  );
};

export default function DayZeroFramework() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [accepted, setAccepted] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const activeSection = sections[activeSectionIdx];
  const isLastSection = activeSectionIdx === sections.length - 1;

  const getKey = (qid, fi) => `Me__${qid}__${fi}`;
  const getValue = (qid, fi) => answers[getKey(qid, fi)] || "";
  const setValue = (qid, fi, val) =>
    setAnswers((prev) => ({ ...prev, [getKey(qid, fi)]: val }));

  const getCompletionCount = () => {
    let count = 0;
    sections.forEach((s) =>
      s.questions?.forEach((q) => {
        if (q.fields.some((_, fi) => answers[getKey(q.id, fi)]?.length > 0)) count++;
      })
    );
    return count;
  };
  const totalQuestions = sections.reduce((acc, s) => acc + (s.questions?.length || 0), 0);

  const handleNext = () => {
    if (activeSectionIdx < sections.length - 1) {
      setActiveSectionIdx((i) => i + 1);
      setActiveQ(null);
      setShowExport(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowExport(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleExport = async () => {
    const displayName = userName.trim() || "My";
    const { jsPDF } = await import("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18;
    const usableW = pageW - margin * 2;
    let y = margin;

    const addPageIfNeeded = (height) => {
      if (y + height > pageH - margin) { doc.addPage(); y = margin; }
    };

    doc.setFillColor(52, 78, 65);
    doc.rect(0, 0, pageW, 28, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(163, 177, 138);
    doc.text("A FRAMEWORK FOR RENEWAL", pageW / 2, 10, { align: "center" });
    doc.setFontSize(20);
    doc.setTextColor(218, 215, 205);
    doc.text("Day Zero", pageW / 2, 20, { align: "center" });
    y = 36;

    const date = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`${displayName}  ·  ${date}`, pageW / 2, y, { align: "center" });
    y += 4;

    doc.setDrawColor(88, 129, 87);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    const sectionColors = {
      "As a Partner": [88, 129, 87],
      "As a Parent": [163, 177, 138],
      "Shared Vision": [58, 90, 64],
    };
    const smartBg = {
      Specific: [88, 129, 87],
      Measurable: [58, 90, 64],
      Achievable: [163, 177, 138],
      Relevant: [52, 78, 65],
      "Time-bound": [218, 215, 205],
    };

    sections.forEach((section) => {
      addPageIfNeeded(14);
      const sc = sectionColors[section.label] || [180, 180, 180];
      doc.setFillColor(...sc);
      doc.rect(margin, y, usableW, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(`${section.icon}  ${section.label.toUpperCase()}`, margin + 3, y + 5.5);
      y += 12;

      (section.questions || []).forEach((q) => {
        addPageIfNeeded(10);
        const sb = smartBg[q.smart] || [200, 200, 200];
        doc.setFillColor(...sb);
        doc.roundedRect(margin, y, 28, 5.5, 1, 1, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(...(q.smart === "Time-bound" ? [52, 78, 65] : [255, 255, 255]));
        doc.text(q.smart.toUpperCase(), margin + 14, y + 3.8, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(30, 30, 30);
        doc.text(q.prompt, margin + 32, y + 3.8);
        y += 8;

        const parts = q.sentence.split(/____/);
        let sentenceLine = parts.map((part, i) => {
          if (i >= q.fields.length) return part;
          const val = answers[`Me__${q.id}__${i}`] || `(${q.fields[i]})`;
          return part + val;
        }).join("");

        addPageIfNeeded(8);
        doc.setFillColor(247, 244, 239);
        const lines = doc.splitTextToSize(sentenceLine, usableW - 6);
        const boxH = lines.length * 5.5 + 5;
        addPageIfNeeded(boxH);
        doc.rect(margin, y, usableW, boxH, "F");
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        doc.text(lines, margin + 3, y + 4.5);
        y += boxH + 2;

        const notes = answers[`Me__${q.id}__notes`];
        if (notes) {
          const noteLines = doc.splitTextToSize(notes, usableW - 6);
          const noteH = noteLines.length * 5 + 4;
          addPageIfNeeded(noteH);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          doc.text(noteLines, margin + 3, y + 3.5);
          y += noteH + 2;
        }
        y += 3;
      });
      y += 4;
    });

    addPageIfNeeded(10);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    doc.text("This document is private and personal. Share only when you are ready.", pageW / 2, y, { align: "center" });

    doc.save(`day-zero-${displayName.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };

  const renderSentence = (question) => {
    const parts = question.sentence.split(/____/);
    return (
      <div style={{ lineHeight: "2.6", fontSize: "1.22rem", color: "#2a2a2a", fontFamily: "'Montserrat', sans-serif" }}>
        {parts.map((part, i) => (
          <span key={i}>
            <span>{part}</span>
            {i < question.fields.length && (
              <AutoInput
                placeholder={question.fields[i]}
                value={getValue(question.id, i)}
                onChange={(e) => setValue(question.id, i, e.target.value)}
                color={activeSection.color}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  const count = getCompletionCount();
  const pct = Math.round((count / totalQuestions) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a" }}>

      {/* Mobile-first global styles */}
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }
        input, textarea, button { -webkit-appearance: none; border-radius: 0; }
        @media (max-width: 480px) {
          .stepper-label { display: none; }
          .section-desc { font-size: 0.95rem !important; }
          .question-prompt { font-size: 0.9rem !important; }
          .smart-badge { font-size: 0.6rem !important; padding: 2px 5px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "#344E41", color: "#DAD7CD", padding: "1.5rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.94rem", letterSpacing: "0.3em", color: "#A3B18A", marginBottom: "0.4rem" }}>A FRAMEWORK FOR RENEWAL</div>
        <h1 style={{ margin: 0, fontSize: "clamp(2.72rem, 7vw, 3.37rem)", fontWeight: "400", color: "#DAD7CD" }}>Day Zero</h1>
        <p style={{ margin: "0.4rem 0 0", color: "#aaa", fontSize: "clamp(0.82rem, 3vw, 0.95rem)", fontStyle: "italic" }}>
          All past issues are forgiven and forgotten. Today we begin again.
        </p>
      </div>

      {/* Intro */}
      {!accepted && (
        <div style={{ maxWidth: 620, margin: "2rem auto", background: "#fff", padding: "clamp(1.2rem, 5vw, 2.5rem)", border: "1px solid #DAD7CD" }}>
          <div style={{ fontSize: "0.84rem", letterSpacing: "0.3em", color: "#588157", marginBottom: "1.1rem" }}>BEFORE YOU BEGIN</div>
          <h2 style={{ fontWeight: 400, fontSize: "clamp(1.35rem, 5vw, 1.65rem)", marginTop: 0 }}>The Day Zero Premise</h2>
          <p style={{ color: "#555", lineHeight: 1.8, fontSize: "clamp(1.02rem, 3.5vw, 1.12rem)" }}>
            This exercise asks both of you to set aside everything that has happened and answer honestly about the future you <em>want</em> — not the past you're carrying.
          </p>
          <p style={{ color: "#555", lineHeight: 1.8, fontSize: "clamp(1.02rem, 3.5vw, 1.12rem)" }}>There are no right answers. There is no winner. The only goal is clarity — for yourself, and then for each other.</p>
          <ul style={{ color: "#555", lineHeight: 2, paddingLeft: "1.2rem", fontSize: "clamp(1rem, 3.5vw, 1.12rem)" }}>
            <li>Each partner completes all three sections <strong>independently</strong></li>
            <li>Use the fill-in sentences to guide, not limit, what you want to say</li>
            <li>SMART goals keep intentions <strong>concrete and actionable</strong></li>
            <li>Save your answers as a PDF when you're ready to share</li>
          </ul>
          <div style={{ background: "#F7F4EF", borderLeft: "3px solid #588157", padding: "1rem 1.2rem", margin: "1.5rem 0", fontStyle: "italic", color: "#555", fontSize: "clamp(1rem, 3.5vw, 1.12rem)" }}>
            "If today was Day Zero — all past issues forgiven and forgotten — how do you see your life going forward?"
          </div>
          <button onClick={() => setAccepted(true)} style={{ background: "#344E41", color: "#DAD7CD", border: "none", padding: "1rem 2rem", fontSize: "clamp(0.92rem, 3vw, 1.02rem)", letterSpacing: "0.2em", cursor: "pointer", width: "100%" }}>
            I ACCEPT THE PREMISE — BEGIN
          </button>
        </div>
      )}

      {accepted && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "1.5rem clamp(0.8rem, 4vw, 1rem)" }}>

          {/* Name entry */}
          {!nameSubmitted && (
            <div style={{ maxWidth: 480, margin: "0 auto 2rem", background: "#fff", border: "1px solid #DAD7CD", padding: "clamp(1.35rem, 5vw, 2.12rem)" }}>
              <div style={{ fontSize: "1rem", letterSpacing: "0.25em", color: "#588157", marginBottom: "0.8rem" }}>BEFORE YOU BEGIN</div>
              <h2 style={{ fontWeight: 400, fontSize: "clamp(1.35rem, 5vw, 1.65rem)", marginBottom: "0.5rem" }}>What is your name?</h2>
              <p style={{ color: "#777", fontSize: "clamp(1rem, 3.5vw, 1.12rem)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Your name will appear on your exported PDF so your partner knows whose answers they're reading.
              </p>
              <input
                autoFocus
                placeholder="Your first name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && userName.trim()) setNameSubmitted(true); }}
                style={{
                  width: "100%", border: "none", borderBottom: "2px solid #588157",
                  background: "transparent", padding: "0.6rem 0.3rem",
                  fontSize: "clamp(1.25rem, 5vw, 1.45rem)",
                  fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a", outline: "none",
                  marginBottom: "1.5rem",
                }}
              />
              <button
                onClick={() => { if (userName.trim()) setNameSubmitted(true); }}
                disabled={!userName.trim()}
                style={{
                  background: userName.trim() ? "#344E41" : "#ddd",
                  color: userName.trim() ? "#DAD7CD" : "#aaa",
                  border: "none", padding: "1rem 2rem",
                  fontSize: "clamp(0.92rem, 3vw, 1.02rem)",
                  letterSpacing: "0.2em", cursor: userName.trim() ? "pointer" : "default", width: "100%",
                }}
              >
                BEGIN →
              </button>
            </div>
          )}

          {nameSubmitted && (
            <div>
              {/* Progress stepper */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                {sections.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                      <button
                        onClick={() => { setActiveSectionIdx(i); setActiveQ(null); setShowExport(false); }}
                        style={{
                          background: showExport ? "#eee" : activeSectionIdx === i ? s.color : activeSectionIdx > i ? "#344E41" : "#fff",
                          color: showExport ? "#aaa" : activeSectionIdx === i ? "#fff" : activeSectionIdx > i ? s.color : "#bbb",
                          border: `2px solid ${!showExport && activeSectionIdx >= i ? s.color : "#ddd"}`,
                          borderRadius: "50%", width: 36, height: 36,
                          fontSize: "1rem", cursor: "pointer", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {!showExport && activeSectionIdx > i ? "✓" : s.icon}
                      </button>
                      <div className="stepper-label" style={{ fontSize: "0.94rem", letterSpacing: "0.1em", color: !showExport && activeSectionIdx === i ? s.color : "#aaa", whiteSpace: "nowrap", textAlign: "center" }}>
                        {s.label.toUpperCase()}
                      </div>
                    </div>
                    <div style={{ width: "clamp(16px, 4vw, 36px)", height: 1, background: activeSectionIdx > i && !showExport ? "#588157" : "#ddd", margin: "0 2px", marginBottom: "1.2rem", flexShrink: 0 }} />
                  </div>
                ))}
                {/* PDF step */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", flexShrink: 0 }}>
                  <button
                    onClick={() => setShowExport(true)}
                    style={{
                      background: showExport ? "#588157" : "#fff",
                      color: showExport ? "#fff" : "#aaa",
                      border: `2px solid ${showExport ? "#588157" : "#ddd"}`,
                      borderRadius: "50%", width: 36, height: 36,
                      fontSize: "0.97rem", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    ↓
                  </button>
                  <div className="stepper-label" style={{ fontSize: "0.94rem", letterSpacing: "0.1em", color: showExport ? "#588157" : "#aaa", whiteSpace: "nowrap" }}>
                    SAVE PDF
                  </div>
                </div>
              </div>

              {/* Export panel */}
              {showExport && (
                <div style={{ background: "#fff", border: "1px solid #588157", padding: "clamp(1.35rem, 5vw, 2.12rem)", marginBottom: "2rem" }}>
                  <div style={{ fontSize: "0.84rem", letterSpacing: "0.25em", color: "#588157", marginBottom: "0.5rem" }}>SAVE YOUR ANSWERS</div>
                  <h2 style={{ fontWeight: 400, fontSize: "clamp(1.1rem, 5vw, 1.4rem)", marginBottom: "0.8rem" }}>
                    Ready to share, {userName}?
                  </h2>
                  <p style={{ color: "#555", fontSize: "clamp(1rem, 3.5vw, 1.12rem)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                    Your answers will be saved as a PDF. Share it with your partner — or a counsellor — when you feel ready.
                  </p>

                  {/* Progress + button stacked on mobile */}
                  <div style={{ background: "#F7F4EF", border: "1px solid #DAD7CD", padding: "1.2rem", marginBottom: "0.8rem" }}>
                    <div style={{ fontSize: "clamp(0.94rem, 3.5vw, 1.02rem)", color: "#555", marginBottom: "0.8rem" }}>
                      <strong>{userName}</strong> — {count} of {totalQuestions} questions answered
                    </div>
                    <div style={{ height: 6, background: "#eee", borderRadius: 3, marginBottom: "1.2rem" }}>
                      <div style={{ height: 6, background: "#588157", borderRadius: 3, width: `${pct}%`, transition: "width 0.4s" }} />
                    </div>
                    <button
                      onClick={handleExport}
                      style={{
                        background: "#344E41", color: "#DAD7CD", border: "none",
                        padding: "0.9rem 1.5rem", fontSize: "clamp(0.92rem, 3vw, 1rem)",
                        letterSpacing: "0.15em", cursor: "pointer", width: "100%",
                      }}
                    >
                      ↓ SAVE AS PDF
                    </button>
                  </div>
                </div>
              )}

              {/* Questions panel */}
              {!showExport && activeSection && (
                <>
                  {/* Section description */}
                  <div style={{
                    background: "#fff", borderLeft: `4px solid ${activeSection.color}`,
                    padding: "1rem 1.2rem", marginBottom: "1.2rem",
                    fontSize: "clamp(1rem, 3.5vw, 1.08rem)", color: "#555", lineHeight: 1.8,
                  }} className="section-desc">
                    <strong style={{ color: "#1a1a1a" }}>{activeSection.icon} {activeSection.label} — </strong>
                    {activeSection.description}
                  </div>

                  {/* Questions */}
                  {activeSection.questions.map((q) => {
                    const isOpen = activeQ === q.id;
                    const hasContent = q.fields.some((_, fi) => getValue(q.id, fi).length > 0);
                    return (
                      <div key={q.id} style={{
                        background: "#fff",
                        border: `1px solid ${isOpen ? activeSection.color : "#DAD7CD"}`,
                        borderLeft: `4px solid ${isOpen ? activeSection.color : "#DAD7CD"}`,
                        marginBottom: "0.8rem", transition: "border-color 0.2s",
                      }}>
                        <button onClick={() => setActiveQ(isOpen ? null : q.id)} style={{
                          width: "100%", background: "none", border: "none",
                          padding: "1rem clamp(0.8rem, 3vw, 1.2rem)",
                          textAlign: "left", cursor: "pointer",
                          display: "flex", flexDirection: "column", gap: "0.4rem",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <span className="smart-badge" style={{
                              background: smartColors[q.smart], color: q.smart === "Time-bound" ? "#344E41" : "#fff",
                              fontSize: "0.77rem", letterSpacing: "0.15em",
                              padding: "3px 9px", borderRadius: 1, whiteSpace: "nowrap",
                            }}>
                              {q.smart.toUpperCase()}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              {hasContent && <span style={{ color: "#588157", fontSize: "1.1rem" }}>✓</span>}
                              <span style={{ color: "#aaa", fontSize: "1rem" }}>{isOpen ? "▲" : "▼"}</span>
                            </div>
                          </div>
                          <span className="question-prompt" style={{ fontSize: "clamp(1rem, 3.5vw, 1.08rem)", color: "#1a1a1a", lineHeight: 1.4, display: "block" }}>{q.prompt}</span>
                        </button>

                        {isOpen && (
                          <div style={{ padding: "0 clamp(0.8rem, 3vw, 1.5rem) 1.2rem" }}>
                            {q.hint && (
                              <div style={{ fontSize: "clamp(0.8rem, 3vw, 0.85rem)", color: "#aaa", marginBottom: "0.8rem", fontStyle: "italic" }}>
                                Guiding thought: {q.hint}
                              </div>
                            )}
                            <div style={{ background: "#F7F4EF", padding: "clamp(0.8rem, 3vw, 1.2rem)", marginBottom: "0.8rem", overflowX: "hidden" }}>
                              {renderSentence(q)}
                            </div>
                            <textarea
                              placeholder="Any additional thoughts beyond the sentence above..."
                              value={getValue(q.id, "notes")}
                              onChange={(e) => setValue(q.id, "notes", e.target.value)}
                              rows={3}
                              style={{
                                width: "100%", border: "1px solid #DAD7CD",
                                padding: "0.8rem", fontSize: "clamp(1rem, 3.5vw, 1.08rem)",
                                fontFamily: "inherit", color: "#333", background: "#fafafa",
                                resize: "vertical", outline: "none",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* SMART legend */}
                  <div style={{ marginTop: "1.2rem", padding: "1.1rem", background: "#fff", border: "1px solid #DAD7CD" }}>
                    <div style={{ fontSize: "0.94rem", letterSpacing: "0.2em", color: "#aaa", marginBottom: "0.72rem" }}>SMART GOAL FRAMEWORK</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {Object.entries(smartColors).map(([label, color]) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <div style={{ width: 9, height: 9, background: color, borderRadius: "50%", flexShrink: 0 }} />
                          <span style={{ fontSize: "clamp(0.87rem, 3vw, 0.94rem)", color: "#555" }}><strong>{label[0]}</strong>{label.slice(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.2rem" }}>
                    <button
                      onClick={handleNext}
                      style={{
                        background: "#344E41",
                        color: isLastSection ? "#DAD7CD" : "#fff",
                        border: "none",
                        padding: "clamp(0.92rem, 3vw, 1.02rem) clamp(1.2rem, 5vw, 2.5rem)",
                        fontSize: "clamp(0.78rem, 3vw, 0.88rem)",
                        letterSpacing: "0.2em", cursor: "pointer", width: "100%",
                      }}
                    >
                      {isLastSection ? "↓ SAVE TO PDF" : `NEXT: ${sections[activeSectionIdx + 1].label.toUpperCase()} →`}
                    </button>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "1.2rem", color: "#aaa", fontSize: "clamp(0.9rem, 3vw, 0.97rem)", fontStyle: "italic", lineHeight: 1.8, paddingBottom: "2rem" }}>
                    Your answers are private until you choose to share them.<br />
                    This framework is a starting point — not a contract. Be honest. Be kind.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
