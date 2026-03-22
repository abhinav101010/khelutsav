import { useTheme } from "../../context/ThemeContext";
import EventsSection from "../home/EventsSection";

export default function EventsPage() {
  const { T } = useTheme();
  return (
    <div style={{ paddingTop:"1rem", background:T.bg }}>
      <EventsSection />
    </div>
  );
}