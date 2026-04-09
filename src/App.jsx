import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./Auth";
import HomePage from "./HomePage";

const sections = [
  {
    id: "vision-partner",
    label: "As a Partner",
    icon: "♡",
    color: "#3AAFB9",
    description: "This section is about you as a partner — not as a parent, not as a co-parent. Just you, and the person you want to show up as in this relationship. Answer honestly and speak only for yourself.",
    questions: [
      {
        id: "vp1", smart: "Specific",
        prompt: "The kind of partner I want to be",
        quote: { text: "The beginning of love is the will to let those we love be perfectly themselves, the resolution not to twist them to fit our own image.", author: "Thomas Merton" },
        sentence: "Starting today, I want to show up as a partner who is ____, ____, and ____.",
        hint: "e.g. present, patient, affectionate",
        fields: ["Quality 1", "Quality 2", "Quality 3"],
      },
      {
        id: "vp2", smart: "Measurable",
        prompt: "How I will show love in concrete ways",
        quote: { text: "Love is a verb. Love — the feeling — is the fruit of love the verb. So love her. Sacrifice. Listen. Empathise. Appreciate. Affirm.", author: "Stephen Covey" },
        sentence: "I will demonstrate love by ____ at least ____ times per ____.",
        hint: "e.g. leaving a note, once, week",
        fields: ["Action", "Frequency", "Time period"],
      },
      {
        id: "vp3", smart: "Achievable",
        prompt: "One realistic change I can commit to",
        quote: { text: "When we are no longer able to change a situation, we are challenged to change ourselves.", author: "Viktor Frankl" },
        sentence: "One thing I know I can genuinely change is ____. I've held back because ____, but I'm ready to try because ____.",
        hint: "Be honest and specific",
        fields: ["The change", "What held me back", "Why I'm ready now"],
      },
      {
        id: "vp4", smart: "Relevant",
        prompt: "What matters most to me in this relationship",
        quote: { text: "The greatest thing you'll ever learn is just to love and be loved in return.", author: "Eden Ahbez" },
        sentence: "What I value most about us is ____. I want our relationship to be remembered as ____.",
        hint: "Think about your core 'why'",
        fields: ["What I value most", "How I want it remembered"],
      },
      {
        id: "vp5", smart: "Time-bound",
        prompt: "A 90-day vision for us",
        quote: { text: "A year from now you will wish you had started today.", author: "Karen Lamb" },
        sentence: "In 90 days, I want us to be able to say that we ____. My first step this week is ____.",
        hint: "Make it achievable within 90 days",
        fields: ["90-day milestone", "First step this week"],
      },
    ],
  },
  {
    id: "vision-parent",
    label: "As a Parent",
    icon: "⌂",
    color: "#A06CD5",
    description: "This section is about you as an individual parent — not about co-parenting, not about your partner's role. Focus on what you personally want to give your children, what you want to stop, and the legacy you want to leave them.",
    questions: [
      {
        id: "pp1", smart: "Specific",
        prompt: "The parent I want to be",
        quote: { text: "Children have never been very good at listening to their elders, but they have never failed to imitate them.", author: "James Baldwin" },
        sentence: "I want my child(ren) to describe me as ____, ____, and ____. If I'm honest, I think they would say right now I am ____.",
        hint: "Picture how your child experiences you — not how you intend to be",
        fields: ["Ideal quality 1", "Ideal quality 2", "Ideal quality 3", "Honest current reality"],
      },
      {
        id: "pp2", smart: "Measurable",
        prompt: "How I will show up as a parent in concrete ways",
        quote: { text: "The most important thing a father can do for his children is to love their mother.", author: "Theodore Hesburgh" },
        sentence: "I will be more present as a parent by ____ at least ____ times per ____. I will know it's working when my child ____.",
        hint: "Think about specific moments — bedtime, school pick-up, weekends",
        fields: ["The action", "How often", "Time period", "How my child will show me it's working"],
      },
      {
        id: "pp3", smart: "Achievable",
        prompt: "What I will personally stop doing in front of my children",
        quote: { text: "Children are great imitators. So give them something great to imitate.", author: "Anonymous" },
        sentence: "I commit to no longer ____ in front of my child(ren). When I feel that urge rising, I will instead ____. I know this is possible because ____.",
        hint: "Own only your behaviour — not your partner's",
        fields: ["What I will stop", "What I'll do instead", "Why I believe I can do this"],
      },
      {
        id: "pp4", smart: "Relevant",
        prompt: "The emotional legacy I want to leave my children",
        quote: { text: "Your children will become what you are; so be what you want them to be.", author: "David Bly" },
        sentence: "I want my child(ren) to feel ____ in our home. The thing I never want them to carry into adulthood because of how I showed up is ____. What I do want them to carry is ____.",
        hint: "Think about what your own childhood gave you — and what it didn't",
        fields: ["How I want them to feel", "What I don't want to pass on", "What I do want to pass on"],
      },
      {
        id: "pp5", smart: "Time-bound",
        prompt: "One parenting ritual I will start this month",
        quote: { text: "The days are long, but the years are short.", author: "Gretchen Rubin" },
        sentence: "By the end of this month, I will personally establish ____ as a ritual with my child(ren). It will happen every ____ and I will protect that time by ____.",
        hint: "This is yours to own — not contingent on your partner",
        fields: ["My ritual", "How often", "How I will protect it"],
      },
    ],
  },
  {
    id: "shared",
    label: "Shared Vision",
    icon: "∞",
    color: "#C60F7B",
    shared: true,
    description: "This final section is still answered individually — each partner completes it separately using 'I think' and 'I feel' language. Once both of you are done, sit together and take turns reading your answers out loud. Listen without interrupting.",
    questions: [
      {
        id: "sv1", smart: "Specific",
        prompt: "What I think our family needs most right now",
        quote: { text: "Family is not an important thing. It's everything.", author: "Michael J. Fox" },
        sentence: "I think the most important thing for our family right now is ____. I feel this matters because ____.",
        hint: "Say what you genuinely believe — your partner will share theirs too",
        fields: ["What I think matters most", "Why I feel it matters"],
      },
      {
        id: "sv2", smart: "Measurable",
        prompt: "How I'll know things are getting better",
        quote: { text: "Trust is built in very small moments.", author: "Brené Brown" },
        sentence: "I think I'll feel we're improving when I start to notice ____. I'd feel comfortable checking in on this every ____.",
        hint: "Think about what a better dynamic would actually look and feel like to you",
        fields: ["The sign I'd notice", "Check-in frequency I'm comfortable with"],
      },
      {
        id: "sv3", smart: "Achievable",
        prompt: "One thing I believe we can realistically do together",
        quote: { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
        sentence: "I think one thing we could actually achieve together is ____. I feel we'd need ____ to make it work.",
        hint: "Keep it small and winnable — momentum matters more than ambition right now",
        fields: ["What I think we can do", "What I feel we'd need"],
      },
      {
        id: "sv4", smart: "Relevant",
        prompt: "Why I think this relationship is still worth fighting for",
        quote: { text: "The couples that are meant to be are the ones who go through everything that is designed to tear them apart, and come out even stronger.", author: "Unknown" },
        sentence: "I think what still connects us is ____. I feel our children deserve to see us ____.",
        hint: "This is your 'why' — be honest with yourself first",
        fields: ["What I think still connects us", "What I feel our children deserve to see"],
      },
      {
        id: "sv5", smart: "Time-bound",
        prompt: "My commitment for the next 30 days",
        quote: { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        sentence: "I commit to ____ for the next 30 days. If I slip, I will ____ rather than give up. I'd like us to revisit this on ____.",
        hint: "Speak only for yourself — your partner will make their own commitment",
        fields: ["My personal commitment", "My recovery plan", "A date to revisit"],
      },
    ],
  },
];

const smartColors = {
  Specific: "#02b7d6",
  Measurable: "#ec4799",
  Achievable: "#7f32fe",
  Relevant: "#22c55f",
  "Time-bound": "#fa7417",
};
const smartBgColors = {
  Specific: "#d1fafe",
  Measurable: "#fee7f4",
  Achievable: "#f4eaff",
  Relevant: "#dcfce9",
  "Time-bound": "#ffecd5",
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
            borderBottom: `2px solid ${color || "#3AAFB9"}`,
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
          borderBottom: `2px solid ${color || "#3AAFB9"}`,
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

  // Auth state
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetError, setResetError] = useState("");

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        setUser(s.user);
        setUserName(s.user.user_metadata?.display_name || "");
        setNameSubmitted(true);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setUser(s?.user || null);
      if (event === "PASSWORD_RECOVERY") {
        setResetMode(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load saved progress when user logs in
  useEffect(() => {
    if (!user) return;
    const loadProgress = async () => {
      const { data } = await supabase
        .from("progress")
        .select("answers, section_idx, accepted")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setAnswers(data.answers || {});
        setActiveSectionIdx(data.section_idx || 0);
        setAccepted(data.accepted || false);
      }
    };
    loadProgress();
  }, [user]);

  const handleAuth = (u, s) => {
    setUser(u);
    setSession(s);
    setUserName(u.user_metadata?.display_name || "");
    setNameSubmitted(true);
    setShowAuthPage(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setAnswers({});
    setAccepted(false);
    setActiveSectionIdx(0);
    setActiveQ(null);
    setShowExport(false);
    setUserName("");
    setNameSubmitted(false);
  };

  const handleSave = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    setSaveMsg("");
    const { error } = await supabase
      .from("progress")
      .upsert({
        user_id: user.id,
        answers,
        section_idx: activeSectionIdx,
        accepted,
      }, { onConflict: "user_id" });
    setSaving(false);
    setSaveMsg(error ? "Failed to save. Try again." : "Progress saved!");
    if (!error) setTimeout(() => setSaveMsg(""), 3000);
  }, [user, answers, activeSectionIdx, accepted]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetMsg("");
    if (newPassword.length < 6) return setResetError("Password must be at least 6 characters.");
    if (newPassword !== confirmNewPassword) return setResetError("Passwords do not match.");

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setResetError(error.message);
    } else {
      setResetMsg("Password updated! Redirecting...");
      setTimeout(() => {
        setResetMode(false);
        setNewPassword("");
        setConfirmNewPassword("");
        setResetMsg("");
        window.history.replaceState({}, "", "/");
      }, 2000);
    }
  };

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

  // Check if ALL questions in a section have at least one field filled
  const isSectionComplete = (sectionIdx) => {
    const s = sections[sectionIdx];
    if (!s?.questions) return false;
    return s.questions.every((q) =>
      q.fields.every((_, fi) => answers[getKey(q.id, fi)]?.length > 0)
    );
  };

  // Check if a section has ANY content at all
  const isSectionStarted = (sectionIdx) => {
    const s = sections[sectionIdx];
    if (!s?.questions) return false;
    return s.questions.some((q) =>
      q.fields.some((_, fi) => answers[getKey(q.id, fi)]?.length > 0)
    );
  };

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

    doc.setFillColor(58, 175, 185);
    doc.rect(0, 0, pageW, 28, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Day Zero", pageW / 2, 14, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("A FRAMEWORK FOR RENEWAL", pageW / 2, 23, { align: "center" });
    y = 36;

    const date = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`${displayName}  ·  ${date}`, pageW / 2, y, { align: "center" });
    y += 4;

    doc.setDrawColor(58, 175, 185);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    const sectionColors = {
      "As a Partner": [58, 175, 185],
      "As a Parent": [160, 108, 213],
      "Shared Vision": [198, 15, 123],
    };
    const smartBg = {
      Specific: [209, 250, 254],
      Measurable: [254, 231, 244],
      Achievable: [244, 234, 255],
      Relevant: [220, 252, 233],
      "Time-bound": [255, 236, 213],
    };
    const smartText = {
      Specific: [2, 183, 214],
      Measurable: [236, 71, 153],
      Achievable: [127, 50, 254],
      Relevant: [34, 197, 95],
      "Time-bound": [250, 116, 23],
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
        doc.setTextColor(...(smartText[q.smart] || [0, 0, 0]));
        doc.text(q.smart.toUpperCase(), margin + 14, y + 3.8, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(26, 26, 26);
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
        doc.setTextColor(26, 26, 26);
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
      <div style={{ lineHeight: "2.2", fontSize: "1.22rem", color: "#1a1a1a", fontFamily: "'Montserrat', sans-serif" }}>
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

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F4EF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ color: "#3AAFB9", fontSize: "1.1rem" }}>Loading...</div>
      </div>
    );
  }

  if (resetMode) {
    const rpInput = {
      width: "100%", border: "1px solid #e0dcd7", background: "#fff",
      padding: "0.75rem", fontSize: "1rem", fontFamily: "'Montserrat', sans-serif",
      color: "#1a1a1a", outline: "none", marginBottom: "0.8rem", borderRadius: 2,
    };
    return (
      <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a" }}>
        <div style={{ background: "#3AAFB9", color: "#fff", padding: "1.5rem 1rem", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(2.72rem, 7vw, 3.37rem)", fontWeight: "700", color: "#fff" }}>Day Zero</h1>
          <div style={{ fontSize: "0.94rem", letterSpacing: "0.3em", color: "#fff", marginTop: "0.4rem", opacity: 0.85 }}>A FRAMEWORK FOR RENEWAL</div>
        </div>
        <div style={{ maxWidth: 420, margin: "2rem auto", background: "#fff", border: "1px solid #e0dcd7", padding: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          <h2 style={{ fontWeight: 400, fontSize: "1.3rem", marginTop: 0, marginBottom: "1rem" }}>Choose a new password</h2>
          <form onSubmit={handleResetPassword}>
            <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>New password</label>
            <input type="password" placeholder="At least 6 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={rpInput} autoFocus />
            <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Confirm new password</label>
            <input type="password" placeholder="Re-enter password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} style={rpInput} />
            {resetError && <div style={{ color: "#e53e3e", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{resetError}</div>}
            {resetMsg && <div style={{ color: "#3AAFB9", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{resetMsg}</div>}
            <button type="submit" style={{
              background: "#3AAFB9", color: "#fff", border: "none", padding: "0.9rem",
              fontSize: "0.95rem", letterSpacing: "0.15em", cursor: "pointer", width: "100%",
              fontFamily: "'Montserrat', sans-serif",
            }}>
              UPDATE PASSWORD
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a" }}>

      {/* Mobile-first global styles */}
      <style>{`
        * { box-sizing: border-box; }
        @keyframes quoteFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes geoFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.12; }
          50% { transform: translate(6px, -10px) rotate(15deg); opacity: 0.2; }
        }
        @keyframes geoFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
          50% { transform: translate(-8px, 8px) rotate(-10deg); opacity: 0.18; }
        }
        @keyframes geoFloat3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.08; }
          50% { transform: translate(4px, 12px) rotate(20deg); opacity: 0.16; }
        }
        @keyframes quoteFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html, body { margin: 0; padding: 0; max-width: 100vw; }
        html { overflow-x: clip; }
        input, textarea, button { -webkit-appearance: none; border-radius: 0; }
        @media (max-width: 480px) {
          .stepper-label { display: none; }
          .section-desc { font-size: 0.95rem !important; }
          .question-prompt { font-size: 0.9rem !important; }
          .smart-badge { font-size: 0.6rem !important; padding: 2px 5px !important; }
          .smart-legend { flex-direction: column; }
          .premise-grid { flex-direction: column; }
          .form-layout { flex-direction: column !important; }
          .quote-column { display: none !important; }
          .steps-grid { flex-direction: column; align-items: stretch !important; }
          .benefits-grid { flex-direction: column; }
          .preview-grid { flex-direction: column; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "#3AAFB9", color: "#fff", padding: "0.6rem clamp(0.8rem, 3vw, 1.2rem)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 onClick={() => { setAccepted(false); setShowAuthPage(false); setShowExport(false); window.scrollTo({ top: 0 }); }} style={{ margin: 0, fontSize: "clamp(1.3rem, 4vw, 1.7rem)", fontWeight: "700", color: "#fff", lineHeight: 1.2, cursor: "pointer" }}>Day Zero</h1>
            <div style={{ fontSize: "clamp(0.5rem, 1.5vw, 0.68rem)", letterSpacing: "0.2em", color: "#fff", opacity: 0.85, marginTop: "0.15rem" }}>A FRAMEWORK FOR RENEWAL</div>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
            {user ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "rgba(255,255,255,0.2)", color: "#fff", border: "none",
                  padding: "0.35rem 0.7rem", fontSize: "0.7rem", letterSpacing: "0.1em",
                  cursor: "pointer", fontFamily: "'Montserrat', sans-serif", borderRadius: 2,
                }}
              >
                LOG OUT
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowAuthPage(true)}
                  style={{
                    background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)",
                    padding: "0.35rem 0.7rem", fontSize: "0.7rem", letterSpacing: "0.1em",
                    cursor: "pointer", fontFamily: "'Montserrat', sans-serif", borderRadius: 2,
                  }}
                >
                  LOG IN
                </button>
                <button
                  onClick={() => setShowAuthPage(true)}
                  style={{
                    background: "#fff", color: "#3AAFB9", border: "none",
                    padding: "0.35rem 0.7rem", fontSize: "0.7rem", letterSpacing: "0.1em",
                    cursor: "pointer", fontFamily: "'Montserrat', sans-serif", borderRadius: 2, fontWeight: 600,
                  }}
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth page — separate full page */}
      {showAuthPage && !user && (
        <div style={{ maxWidth: 620, margin: "2rem auto", padding: "0 clamp(0.8rem, 4vw, 1rem)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p style={{ color: "#444", fontStyle: "italic", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              All past issues are forgiven and forgotten. Today we begin again.
            </p>
          </div>
          <Auth onAuth={handleAuth} />
          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <button
              onClick={() => setShowAuthPage(false)}
              style={{
                background: "none", border: "none", color: "#3AAFB9", fontSize: "0.9rem",
                cursor: "pointer", fontFamily: "'Montserrat', sans-serif", textDecoration: "underline",
              }}
            >
              Continue without an account
            </button>
          </div>
        </div>
      )}

      {/* Full homepage */}
      {!accepted && !showAuthPage && (
        <HomePage
          onBegin={() => setAccepted(true)}
          onSignUp={() => setShowAuthPage(true)}
          user={user}
        />
      )}

      {accepted && !showAuthPage && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem clamp(0.8rem, 4vw, 2rem)" }}>

          {/* Guest name prompt — centered, before the questionnaire */}
          {!user && !nameSubmitted && (
            <div style={{ maxWidth: 480, margin: "0 auto 1.5rem", background: "#fff", border: "1px solid #e0dcd7", padding: "clamp(1.2rem, 5vw, 2rem)" }}>
              <h2 style={{ fontWeight: 400, fontSize: "clamp(1.2rem, 4vw, 1.4rem)", marginTop: 0, marginBottom: "0.5rem" }}>What should we call you?</h2>
              <p style={{ color: "#777", fontSize: "clamp(0.9rem, 3vw, 1rem)", lineHeight: 1.2, marginBottom: "1rem" }}>
                Enter your name or nickname. This is how your answers will be signed.
              </p>
              <input
                autoFocus
                placeholder="Name or nickname"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && userName.trim()) setNameSubmitted(true); }}
                style={{
                  width: "100%", border: "none", borderBottom: "2px solid #3AAFB9",
                  background: "transparent", padding: "0.6rem 0.3rem",
                  fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
                  fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a", outline: "none",
                  marginBottom: "1.2rem",
                }}
              />
              <button
                onClick={() => { if (userName.trim()) setNameSubmitted(true); }}
                disabled={!userName.trim()}
                style={{
                  background: userName.trim() ? "#3AAFB9" : "#ddd",
                  color: userName.trim() ? "#fff" : "#aaa",
                  border: "none", padding: "0.8rem 2rem",
                  fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
                  letterSpacing: "0.2em", cursor: userName.trim() ? "pointer" : "default", width: "100%",
                }}
              >
                CONTINUE
              </button>
            </div>
          )}

          {(user || nameSubmitted) && (
          <>

          {/* Save button bar — only for logged-in users */}
          {user && !showExport && (
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
              {saveMsg && <span style={{ fontSize: "0.85rem", color: saveMsg.includes("Failed") ? "#e53e3e" : "#3AAFB9" }}>{saveMsg}</span>}
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: "#fff", color: "#3AAFB9", border: "1px solid #3AAFB9",
                  padding: "0.5rem 1.2rem", fontSize: "0.85rem", letterSpacing: "0.1em",
                  cursor: saving ? "default" : "pointer", fontFamily: "'Montserrat', sans-serif",
                  opacity: saving ? 0.6 : 1, borderRadius: 2,
                }}
              >
                {saving ? "SAVING..." : "SAVE PROGRESS"}
              </button>
            </div>
          )}

          <div>
              {/* Progress stepper */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                {sections.map((s, i) => {
                  const isPast = !showExport && activeSectionIdx > i;
                  const isCurrent = !showExport && activeSectionIdx === i;
                  const complete = isSectionComplete(i);
                  return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                      <button
                        onClick={() => { setActiveSectionIdx(i); setActiveQ(null); setShowExport(false); }}
                        style={{
                          background: showExport ? "#eee" : isCurrent ? s.color : isPast ? s.color : "#fff",
                          color: showExport ? "#aaa" : isCurrent ? "#fff" : isPast ? "#fff" : "#bbb",
                          border: `2px solid ${!showExport && (isCurrent || isPast) ? s.color : "#ddd"}`,
                          borderRadius: "50%", width: 36, height: 36,
                          fontSize: isPast ? "0.85rem" : "1rem", cursor: "pointer", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {isPast ? (complete ? "✓" : "●") : s.icon}
                      </button>
                      <div className="stepper-label" style={{ fontSize: "0.94rem", letterSpacing: "0.1em", color: isCurrent || isPast ? s.color : "#aaa", whiteSpace: "nowrap", textAlign: "center" }}>
                        {s.label.toUpperCase()}
                      </div>
                    </div>
                    <div style={{ width: "clamp(16px, 4vw, 36px)", height: 1, background: isPast && !showExport ? s.color : "#ddd", margin: "0 2px", marginBottom: "1.2rem", flexShrink: 0 }} />
                  </div>
                  );
                })}
                {/* PDF step */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", flexShrink: 0 }}>
                  <button
                    onClick={() => setShowExport(true)}
                    style={{
                      background: showExport ? "#3AAFB9" : "#fff",
                      color: showExport ? "#fff" : "#aaa",
                      border: `2px solid ${showExport ? "#3AAFB9" : "#ddd"}`,
                      borderRadius: "50%", width: 36, height: 36,
                      fontSize: "0.97rem", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    ↓
                  </button>
                  <div className="stepper-label" style={{ fontSize: "0.94rem", letterSpacing: "0.1em", color: showExport ? "#3AAFB9" : "#aaa", whiteSpace: "nowrap" }}>
                    SAVE PDF
                  </div>
                </div>
              </div>

              {/* Export panel */}
              {showExport && (
                <div style={{ maxWidth: 620, margin: "0 auto 2rem", background: "#fff", border: "1px solid #3AAFB9", padding: "clamp(1.35rem, 5vw, 2.12rem)" }}>
                  <div style={{ fontSize: "0.84rem", letterSpacing: "0.25em", color: "#3AAFB9", marginBottom: "0.5rem" }}>SAVE YOUR ANSWERS</div>
                  <h2 style={{ fontWeight: 400, fontSize: "clamp(1.1rem, 5vw, 1.4rem)", marginBottom: "0.8rem" }}>
                    Ready to share, {userName}?
                  </h2>
                  <p style={{ color: "#444", fontSize: "clamp(1rem, 3.5vw, 1.12rem)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                    Your answers will be saved as a PDF. Share it with your partner — or a counsellor — when you feel ready.
                  </p>
                  <div style={{ background: "#F7F4EF", border: "1px solid #e0dcd7", padding: "1.2rem", marginBottom: "0.8rem" }}>
                    <div style={{ fontSize: "clamp(0.94rem, 3.5vw, 1.02rem)", color: "#444", marginBottom: "0.8rem" }}>
                      <strong>{userName}</strong> — {count} of {totalQuestions} questions answered
                    </div>
                    <div style={{ height: 6, background: "#eee", borderRadius: 3, marginBottom: "1.2rem" }}>
                      <div style={{ height: 6, background: "#3AAFB9", borderRadius: 3, width: `${pct}%`, transition: "width 0.4s" }} />
                    </div>
                    <button
                      onClick={handleExport}
                      style={{
                        background: "#3AAFB9", color: "#fff", border: "none",
                        padding: "0.9rem 1.5rem", fontSize: "clamp(0.92rem, 3vw, 1rem)",
                        letterSpacing: "0.15em", cursor: "pointer", width: "100%",
                      }}
                    >
                      ↓ SAVE AS PDF
                    </button>
                  </div>
                </div>
              )}

          </div>

          {/* Questions panel — in flex layout */}
          {!showExport && activeSection && (
            <div className="form-layout" style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 0%", minWidth: 0 }}>
                <>
                  {/* Section description */}
                  <div style={{
                    background: "#fff", borderLeft: `4px solid ${activeSection.color}`,
                    padding: "1rem 1.2rem", marginBottom: "1.2rem",
                    fontSize: "clamp(1rem, 3.5vw, 1.08rem)", color: "#444", lineHeight: 1.2,
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
                        border: `1px solid ${isOpen ? activeSection.color : "#e0dcd7"}`,
                        borderLeft: `4px solid ${isOpen ? activeSection.color : "#e0dcd7"}`,
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
                              background: smartBgColors[q.smart], color: smartColors[q.smart],
                              fontSize: "0.77rem", letterSpacing: "0.15em", fontWeight: 600,
                              padding: "3px 9px", borderRadius: 3, whiteSpace: "nowrap",
                            }}>
                              {q.smart.toUpperCase()}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              {hasContent && <span style={{ color: "#3AAFB9", fontSize: "1.1rem" }}>✓</span>}
                              <span style={{ color: "#aaa", fontSize: "1rem" }}>{isOpen ? "▲" : "▼"}</span>
                            </div>
                          </div>
                          <span className="question-prompt" style={{ fontSize: "clamp(1rem, 3.5vw, 1.08rem)", color: "#1a1a1a", lineHeight: 1.2, display: "block" }}>{q.prompt}</span>
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
                                width: "100%", border: "1px solid #e0dcd7",
                                padding: "0.8rem", fontSize: "clamp(1rem, 3.5vw, 1.08rem)",
                                fontFamily: "inherit", color: "#1a1a1a", background: "#fafafa",
                                resize: "vertical", outline: "none",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* SMART legend */}
                  <div style={{ marginTop: "1.2rem", padding: "1.1rem", background: "#fff", border: "1px solid #e0dcd7" }}>
                    <div style={{ fontSize: "0.94rem", letterSpacing: "0.2em", color: "#aaa", marginBottom: "0.72rem" }}>SMART GOAL FRAMEWORK</div>
                    <div className="smart-legend" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.2rem" }}>
                      {Object.entries(smartColors).map(([label, color]) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <div style={{ width: 9, height: 9, background: color, borderRadius: "50%", flexShrink: 0 }} />
                          <span style={{ fontSize: "clamp(0.78rem, 2.5vw, 0.85rem)", color }}><strong>{label[0]}</strong>{label.slice(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.2rem" }}>
                    <button
                      onClick={handleNext}
                      style={{
                        background: "#3AAFB9",
                        color: "#fff",
                        border: "none",
                        padding: "clamp(0.92rem, 3vw, 1.02rem) clamp(1.2rem, 5vw, 2.5rem)",
                        fontSize: "clamp(0.78rem, 3vw, 0.88rem)",
                        letterSpacing: "0.2em", cursor: "pointer", width: "100%",
                      }}
                    >
                      {isLastSection ? "↓ SAVE TO PDF" : `NEXT: ${sections[activeSectionIdx + 1].label.toUpperCase()} →`}
                    </button>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "1.2rem", color: "#aaa", fontSize: "clamp(0.9rem, 3vw, 0.97rem)", fontStyle: "italic", lineHeight: 1.2, paddingBottom: "2rem" }}>
                    Your answers are private until you choose to share them.<br />
                    This framework is a starting point — not a contract. Be honest. Be kind.
                  </div>
                </>
            </div>
            {/* Right column — placeholder for quotes (next step) */}
            {/* Right column — contextual quote */}
            <div className="quote-column" style={{ width: 300, flexShrink: 0, position: "sticky", top: "1rem", alignSelf: "flex-start" }}>
              {(() => {
                const activeQuestion = activeSection?.questions?.find(q => q.id === activeQ);
                const color = activeSection?.color || "#3AAFB9";
                return (
                  <div key={activeQ || "default"} style={{
                    position: "relative", overflow: "hidden",
                    animation: "quoteFadeIn 0.4s ease-out",
                  }}>
                    {/* Geometric floating SVGs */}
                    <svg width="40" height="40" viewBox="0 0 40 40" style={{ position: "absolute", top: 8, right: 12, animation: "geoFloat1 6s ease-in-out infinite" }}>
                      <circle cx="20" cy="20" r="18" fill="none" stroke={color} strokeWidth="0.8" />
                    </svg>
                    <svg width="32" height="32" viewBox="0 0 32 32" style={{ position: "absolute", bottom: 40, left: 10, animation: "geoFloat2 8s ease-in-out infinite" }}>
                      <rect x="4" y="4" width="24" height="24" fill="none" stroke={color} strokeWidth="0.7" rx="2" />
                    </svg>
                    <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: "absolute", top: "50%", right: 8, animation: "geoFloat3 7s ease-in-out infinite" }}>
                      <polygon points="14,2 26,26 2,26" fill="none" stroke={color} strokeWidth="0.7" />
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" style={{ position: "absolute", bottom: 12, right: "40%", animation: "geoFloat1 9s ease-in-out infinite" }}>
                      <line x1="0" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.6" />
                      <line x1="10" y1="0" x2="10" y2="20" stroke={color} strokeWidth="0.6" />
                    </svg>

                    {/* Quote card */}
                    <div style={{
                      background: "#fff",
                      border: "1px solid #e0dcd7",
                      borderLeft: `3px solid ${color}`,
                      padding: "2rem 1.5rem 1.5rem",
                      borderRadius: 4,
                      animation: "quoteFloat 6s ease-in-out infinite",
                      position: "relative", zIndex: 1,
                    }}>
                      {/* Big quote mark */}
                      <div style={{
                        fontSize: "4.5rem", lineHeight: 0.8, fontFamily: "Georgia, serif",
                        color, opacity: 0.2, marginBottom: "0.2rem",
                        userSelect: "none",
                      }}>
                        &ldquo;
                      </div>

                      {activeQuestion?.quote ? (
                        <>
                          <p style={{
                            fontStyle: "italic", color: "#444",
                            fontSize: "clamp(0.95rem, 2.5vw, 1.08rem)",
                            lineHeight: 1.6, margin: "0 0 1.2rem",
                          }}>
                            {activeQuestion.quote.text}
                          </p>
                          <div style={{
                            fontSize: "0.85rem", color: "#aaa",
                            borderTop: "1px solid #f0ece7", paddingTop: "0.8rem",
                          }}>
                            — {activeQuestion.quote.author}
                          </div>
                        </>
                      ) : (
                        <p style={{
                          color: "#aaa", fontStyle: "italic",
                          fontSize: "0.95rem", lineHeight: 1.6, margin: 0,
                        }}>
                          Open a question to see an inspiring thought to guide your reflection.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
            </div>
          )}

          </>
          )}
        </div>
      )}
    </div>
  );
}
