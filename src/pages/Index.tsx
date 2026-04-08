import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LearningPaths } from "@/components/LearningPaths";
import { ChallengesSection } from "@/components/ChallengesSection";
import { AboutSection } from "@/components/AboutSection";
import { FAQSection } from "@/components/FAQSection";
import { DiogenesChatbot } from "@/components/DiogenesChatbot";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <LearningPaths />
        <ChallengesSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
      <DiogenesChatbot />
    </div>
  );
};

export default Index;
