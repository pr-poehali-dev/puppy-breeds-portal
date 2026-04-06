import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BreedsSection from "@/components/sections/BreedsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactsSection from "@/components/sections/ContactsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <BreedsSection />
      <ReviewsSection />
      <ContactsSection />
      <FooterSection />
    </div>
  );
}