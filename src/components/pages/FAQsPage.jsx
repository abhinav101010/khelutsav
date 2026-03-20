import N from "../../theme";
import { FAQS } from "../../data/sportsData";
import FAQItem from "./FAQItem";

export default function FAQsPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 2rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          color: N.accent, textTransform: "uppercase", marginBottom: 8,
        }}>GOT QUESTIONS?</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text }}>
          FAQs
        </h2>
      </div>

      {/* Accordion list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {FAQS.map(([q, a], i) => (
          <FAQItem key={i} question={q} answer={a} />
        ))}
      </div>
    </div>
  );
}
