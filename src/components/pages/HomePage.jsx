import { useTheme } from "../../context/ThemeContext";
import HeroSection from "../home/HeroSection";
import Countdown from "../home/Countdown";
import EventsSection from "../home/EventsSection";
import SponsorsSection from "../home/SponsorsSection";

export default function HomePage() {
  const { T } = useTheme();
  return (
    <>
      <HeroSection />
      <Countdown />
      <EventsSection />
      <SponsorsSection />
    </>
  );
}