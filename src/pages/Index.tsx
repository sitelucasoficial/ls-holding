import HeroSection from "@/components/HeroSection";
import FounderSection from "@/components/FounderSection";
import CompaniesSection from "@/components/CompaniesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FounderSection />
      <CompaniesSection />
      <FooterSection />
    </div>
  );
};

export default Index;
