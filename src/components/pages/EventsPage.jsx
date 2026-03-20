import N from "../../theme";
import { EVENTS } from "../../data/sportsData";
import EventCard from "../home/EventCard";

export default function EventsPage() {
  return (
    <div style={{ padding: "4rem 2.5rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          color: N.accent, textTransform: "uppercase", marginBottom: 8,
        }}>WHAT'S ON</div>
        <h2 style={{ fontFamily: "'Black Ops One', cursive", fontSize: "2.8rem", color: N.text, lineHeight: 1.1 }}>
          All Events
        </h2>
        <p style={{ color: N.text2, marginTop: 10, fontWeight: 600 }}>
          12 events across Individual &amp; Team categories. Register before slots fill up!
        </p>
      </div>

      {/* Cards grid — reuses the same EventCard */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20, maxWidth: 1100, margin: "0 auto",
      }}>
        {EVENTS.map((ev, i) => (
          <EventCard key={i} event={ev} />
        ))}
      </div>
    </div>
  );
}
