import HeroSection from "../home/HeroSection";
import EventsSection from "../home/EventsSection";
import SponsorsSection from "../home/SponsorsSection";

export default function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <EventsSection />
      <SponsorsSection />
    </>
  );
}
