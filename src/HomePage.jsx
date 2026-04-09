import React, { useState } from "react";

const section = (bg, children) => (
  <div style={{ background: bg, padding: "clamp(2.5rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </div>
);

const ctaBtn = (onClick, text) => (
  <button onClick={onClick} style={{
    background: "#3AAFB9", color: "#fff", border: "none",
    padding: "1rem 2.5rem", fontSize: "clamp(0.9rem, 3vw, 1rem)",
    letterSpacing: "0.2em", cursor: "pointer", borderRadius: 3,
    fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
  }}>
    {text}
  </button>
);

// Fake mockup of the questionnaire UI
const MockupCard = () => (
  <div style={{
    background: "#fff", border: "1px solid #e0dcd7", borderRadius: 6,
    padding: "1.5rem", maxWidth: 480, boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    transform: "none", margin: "0 auto",
  }}>
    {/* Stepper dots */}
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.2rem", justifyContent: "center" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3AAFB9", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem" }}>✓</div>
      <div style={{ width: 20, height: 1, background: "#3AAFB9" }} />
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#A06CD5", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.85rem" }}>⌂</div>
      <div style={{ width: 20, height: 1, background: "#ddd" }} />
      <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #ddd", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: "0.85rem" }}>∞</div>
    </div>
    {/* Section label */}
    <div style={{
      background: "#fff", borderLeft: "3px solid #A06CD5",
      padding: "0.6rem 0.8rem", marginBottom: "0.8rem",
      fontSize: "0.8rem", color: "#444",
    }}>
      <strong style={{ color: "#1a1a1a" }}>⌂ As a Parent —</strong> Focus on what you personally want to give your children...
    </div>
    {/* Question card */}
    <div style={{ border: "1px solid #A06CD5", borderLeft: "3px solid #A06CD5", padding: "0.8rem", marginBottom: "0.6rem" }}>
      <span style={{
        background: "#f4eaff", color: "#7f32fe", fontSize: "0.6rem",
        letterSpacing: "0.12em", fontWeight: 600, padding: "2px 6px", borderRadius: 3,
      }}>ACHIEVABLE</span>
      <div style={{ fontSize: "0.85rem", color: "#1a1a1a", marginTop: "0.4rem" }}>What I will personally stop doing in front of my children</div>
    </div>
    {/* Fill-in sentence */}
    <div style={{ background: "#F7F4EF", padding: "0.8rem", fontSize: "0.8rem", color: "#444", lineHeight: 1.6 }}>
      I commit to no longer <span style={{ borderBottom: "2px solid #A06CD5", color: "#A06CD5", fontStyle: "italic" }}>raising my voice</span> in front of my child(ren). When I feel that urge rising, I will instead <span style={{ borderBottom: "2px solid #A06CD5", color: "#A06CD5", fontStyle: "italic" }}>take a breath and step away</span>.
    </div>
  </div>
);

export default function HomePage({ onBegin, onSignUp, user }) {
  const [showModal, setShowModal] = useState(false);

  const handleCTA = () => {
    if (user) {
      onBegin();
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      {/* CTA Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999, padding: "1rem",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#fff", maxWidth: 460, width: "100%",
            padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: 6,
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}>
            <h3 style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", fontWeight: 600, color: "#1a1a1a" }}>Before you dive in...</h3>
            <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
              This framework has 15 questions across 3 sections. It can be a lot to do in one sitting.
            </p>
            <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
              Signing up lets you <strong>save your progress</strong> and come back whenever you're ready. No pressure, ever — it's completely free.
            </p>
            <button onClick={() => { setShowModal(false); onSignUp(); }} style={{
              background: "#3AAFB9", color: "#fff", border: "none",
              padding: "0.9rem 2rem", fontSize: "0.95rem", letterSpacing: "0.15em",
              cursor: "pointer", width: "100%", borderRadius: 3,
              fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
              marginBottom: "0.8rem",
            }}>
              SIGN UP TO SAVE PROGRESS
            </button>
            <button onClick={() => { setShowModal(false); onBegin(); }} style={{
              background: "transparent", color: "#3AAFB9", border: "1px solid #3AAFB9",
              padding: "0.9rem 2rem", fontSize: "0.95rem", letterSpacing: "0.15em",
              cursor: "pointer", width: "100%", borderRadius: 3,
              fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
            }}>
              JUST DIVE RIGHT IN
            </button>
            <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: "0.8rem", marginBottom: 0 }}>
              You can always sign up later from the header.
            </p>
          </div>
        </div>
      )}
      {/* ═══ HERO ═══ */}
      <div style={{
        background: "linear-gradient(135deg, #3AAFB9 0%, #2d8f97 100%)",
        padding: "clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)",
        textAlign: "center", color: "#fff",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(2rem, 6vw, 3.2rem)", margin: "0 0 1.2rem", lineHeight: 1.15 }}>
            What if you could start over — today?
          </h2>
          <p style={{ fontSize: "clamp(1.05rem, 3vw, 1.25rem)", lineHeight: 1.5, opacity: 0.92, margin: "0 0 0.5rem" }}>
            Day Zero is a guided framework that helps couples step out of the cycle of tension and into honest, independent reflection — on your own time, in your own words.
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", lineHeight: 1.5, opacity: 0.78, margin: "0 0 2rem" }}>
            No therapist required. No awkward silences. Just clarity.
          </p>
          {ctaBtn(handleCTA, "START YOUR DAY ZERO")}
        </div>
      </div>

      {/* ═══ THE PROBLEM ═══ */}
      {section("#fff", (
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", letterSpacing: "0.3em", color: "#3AAFB9", marginBottom: "0.8rem", fontWeight: 700 }}>THE PROBLEM</div>
          <h3 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 600, margin: "0 0 1.2rem", color: "#1a1a1a" }}>
            Important conversations deserve more than a heated moment
          </h3>
          <p style={{ color: "#555", fontSize: "clamp(1rem, 3vw, 1.12rem)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            When emotions are high, words come out wrong. You react instead of reflect. You defend instead of listen. And the things that matter most — your values, your vision for your family, your hopes — get lost in the noise.
          </p>
          <p style={{ color: "#555", fontSize: "clamp(1rem, 3vw, 1.12rem)", lineHeight: 1.6, margin: 0 }}>
            Day Zero gives you the space to think clearly, answer honestly, and share when <em>you're</em> ready — not when the argument demands it.
          </p>
        </div>
      ))}

      {/* ═══ HOW IT WORKS ═══ */}
      {section("#F7F4EF", (
        <>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
            <div style={{ fontSize: "0.9rem", letterSpacing: "0.3em", color: "#3AAFB9", marginBottom: "0.8rem", fontWeight: 700 }}>HOW IT WORKS</div>
            <h3 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
              Three sections. Fifteen questions. One fresh start.
            </h3>
          </div>
          <div className="steps-grid" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { num: "01", color: "#3AAFB9", title: "As a Partner", desc: "Define the kind of partner you want to be — your values, your commitments, your 90-day vision." },
              { num: "02", color: "#A06CD5", title: "As a Parent", desc: "Reflect on the parent you want to be — what to start, what to stop, and the legacy you want to leave." },
              { num: "03", color: "#C60F7B", title: "Shared Vision", desc: "Independently share what you think your family needs most — then sit together and read your answers aloud." },
            ].map((s) => (
              <div key={s.num} style={{
                flex: "1 1 280px", maxWidth: 340, background: "#fff",
                border: "1px solid #e0dcd7", borderTop: `3px solid ${s.color}`,
                padding: "1.5rem", borderRadius: "0 0 4px 4px",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: s.color, marginBottom: "0.4rem" }}>{s.num}</div>
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a1a" }}>{s.title}</h4>
                <p style={{ margin: 0, color: "#555", fontSize: "0.88rem", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* ═══ BENEFITS ═══ */}
      {section("#fff", (
        <>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
            <div style={{ fontSize: "0.9rem", letterSpacing: "0.3em", color: "#3AAFB9", marginBottom: "0.8rem", fontWeight: 700 }}>WHY IT WORKS</div>
            <h3 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
              Decouple the conversation from the conflict
            </h3>
          </div>
          <div className="benefits-grid" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { icon: "🪞", title: "Reflect without pressure", desc: "No one is watching. No one is waiting for an answer. You write what you actually think — not what the moment forces out of you." },
              { icon: "📄", title: "Share on your own terms", desc: "Export your answers as a PDF and hand it to your partner when you're both calm. No ambush. No being put on the spot." },
              { icon: "👂", title: "Hear without defending", desc: "When your partner shares their answers, you read — not react. There's no rebuttal. Just understanding what they actually want." },
              { icon: "📌", title: "Create a reference point", desc: "Months from now, you can both look back at what you committed to. It's not about being perfect — it's about having a shared starting point." },
            ].map((b, i) => (
              <div key={i} style={{
                flex: "1 1 240px", padding: "1.5rem",
                background: "#F7F4EF", borderRadius: 4,
              }}>
                <div style={{ fontSize: "1.5rem", color: "#3AAFB9", marginBottom: "0.5rem" }}>{b.icon}</div>
                <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a" }}>{b.title}</h4>
                <p style={{ margin: 0, color: "#555", fontSize: "0.88rem", lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* ═══ MOCKUP / PREVIEW ═══ */}
      {section("#F7F4EF", (
        <div className="preview-grid" style={{ display: "flex", gap: "clamp(1.5rem, 5vw, 3rem)", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <div style={{ fontSize: "0.9rem", letterSpacing: "0.3em", color: "#3AAFB9", marginBottom: "0.8rem", fontWeight: 700 }}>INSIDE DAY ZERO</div>
            <h3 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 600, margin: "0 0 1rem", color: "#1a1a1a" }}>
              Guided sentences, not blank pages
            </h3>
            <p style={{ color: "#555", fontSize: "clamp(0.95rem, 3vw, 1.08rem)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Each question uses the SMART goal framework with fill-in-the-blank sentences. You're not staring at an empty journal — you're completing thoughts that are already structured for clarity.
            </p>
            <p style={{ color: "#555", fontSize: "clamp(0.95rem, 3vw, 1.08rem)", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
              Colour-coded categories — <strong>Specific</strong>, <strong>Measurable</strong>, <strong>Achievable</strong>, <strong>Relevant</strong>, and <strong>Time-bound</strong> — ensure your intentions are concrete, not vague.
            </p>
            {ctaBtn(handleCTA, "TRY IT NOW — FREE")}
          </div>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <MockupCard />
          </div>
        </div>
      ))}

      {/* ═══ THE PREMISE ═══ */}
      {section("#fff", (
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", letterSpacing: "0.3em", color: "#3AAFB9", marginBottom: "0.8rem", fontWeight: 700 }}>THE PREMISE</div>
          <h3 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", fontWeight: 600, margin: "0 0 1.2rem", color: "#1a1a1a" }}>
            All past issues are forgiven and forgotten
          </h3>
          <div style={{
            borderLeft: "3px solid #3AAFB9", padding: "1rem 1.5rem",
            fontStyle: "italic", color: "#444", fontSize: "clamp(1.05rem, 3vw, 1.2rem)",
            lineHeight: 1.6, textAlign: "left", background: "#F7F4EF",
            margin: "0 auto 1.5rem", maxWidth: 600,
          }}>
            "If today was Day Zero — all past issues forgiven and forgotten — how do you see your life going forward?"
          </div>
          <p style={{ color: "#555", fontSize: "clamp(0.95rem, 3vw, 1.08rem)", lineHeight: 1.6, margin: "0 0 2rem" }}>
            That's the only question that matters. Everything in this framework is built to help you answer it — honestly, independently, and without fear.
          </p>
          {ctaBtn(handleCTA, "I ACCEPT THE PREMISE — BEGIN")}
          {!user && (
            <p style={{ color: "#3AAFB9", fontSize: "0.85rem", marginTop: "1rem", marginBottom: 0 }}>
              Want to save your progress? <button onClick={onSignUp} style={{ background: "none", border: "none", color: "#3AAFB9", fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", textDecoration: "underline", padding: 0 }}>Sign up for free</button>
            </p>
          )}
        </div>
      ))}

      {/* ═══ FOOTER ═══ */}
      <div style={{ background: "#2d8f97", color: "#fff", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>
          Day Zero — A Framework for Renewal &middot; day-zero.co.za
        </p>
      </div>
    </div>
  );
}
