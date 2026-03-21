import HeroSection from "@/components/HeroSection";
import FounderSection from "@/components/FounderSection";
import CompaniesSection from "@/components/CompaniesSection";
import IncorporationsSection from "@/components/IncorporationsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="section-below-fold">
        <FounderSection />
      </div>
      <div className="section-below-fold">
        <CompaniesSection />
      </div>
      <div className="section-below-fold">
        <IncorporationsSection />
      </div>
      <div className="section-below-fold">
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
