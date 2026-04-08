import { Helmet } from "react-helmet-async";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BreedsSection from "@/components/sections/BreedsSection";
import GallerySection from "@/components/sections/GallerySection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactsSection from "@/components/sections/ContactsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <Helmet>
        <title>Питомник «Из Поместья Мелешко» — Купить щенка мальтипу, йорка, пуделя с документами</title>
        <meta name="description" content="Семейный питомник декоративных собак в Беларуси. Мальтипу, йоркширский терьер, бивер-йорк, той-пудель, кавапу, пушон. Документы UCI, прививки, микрочип. Доставка по России, Беларуси и СНГ." />
        <meta property="og:title" content="Питомник «Из Поместья Мелешко» — щенки с документами" />
        <meta property="og:description" content="Мальтипу, йорк, бивер-йорк, той-пудель — домашнее воспитание, документы UCI, доставка по СНГ." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://puppy-breeds-portal.poehali.dev/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Питомник Из Поместья Мелешко",
          "url": "https://puppy-breeds-portal.poehali.dev/",
          "description": "Семейный питомник декоративных собак в Беларуси. Мальтипу, йоркширский терьер, бивер-йорк, той-пудель, кавапу, пушон.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BY"
          },
          "sameAs": [],
          "knowsAbout": ["мальтипу", "йоркширский терьер", "бивер-йорк", "той-пудель", "кавапу", "пушон"]
        })}</script>
      </Helmet>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <BreedsSection />
      <GallerySection />
      <ReviewsSection />
      <ContactsSection />
      <FooterSection />
    </div>
  );
}