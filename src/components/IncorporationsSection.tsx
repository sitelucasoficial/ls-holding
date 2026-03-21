import { useCompanies } from "@/hooks/useCmsData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import CompanyCard from "./CompanyCard";

const IncorporationsSection = () => {
  useRealtimeSubscription("companies", ["companies"]);
  const { data: companies, isLoading } = useCompanies();
  
  const incorporation = companies?.find(c => c.badge_label === "INCORPORAÇÕES") || {
    name: "LUSCH INCORPORAÇÕES",
    badge_label: "INCORPORAÇÕES",
    badge_color: "#1e3a5f",
    description: "Sua descrição de incorporações aparecerá aqui. Altere no CMS (Supabase).",
    logo_url: "",
    button_label: "VEJA MAIS",
    button_url: "#",
    show_play_icon: true
  };

  if (isLoading) {
    return (
      <section className="pb-10 bg-background">
        <div className="container mx-auto px-4 lg:px-20">
          <Skeleton className="h-[300px] rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section id="incorporacoes" className="pb-10 md:pb-16 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-20 -mt-10 md:-mt-16 lg:-mt-24 pt-8 md:pt-12">
        <CompanyCard company={incorporation} />
      </div>
    </section>
  );
};

export default IncorporationsSection;
