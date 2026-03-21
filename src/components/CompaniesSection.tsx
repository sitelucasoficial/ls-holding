import { useCompanies } from "@/hooks/useCmsData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import CompanyCard from "./CompanyCard";

const defaultCompanies = [
  { name: "EMPREENDE BRAZIL", badge_label: "ECOSSISTEMA", badge_color: "#16a34a", description: "O maior ecossistema do empreendedor brasileiro.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://empreendebrazil.com.br/" },
  { name: "EMPREENDE BRAZIL CLUB", badge_label: "COMUNIDADE", badge_color: "#16a34a", description: "Um grupo seleto de empreendedores.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://empreendebrazil.com.br/ebclub/" },
  { name: "LUSCH GARDEN", badge_label: "EXPERIÊNCIA", badge_color: "#047857", description: "5.000m² de área verde à beira-mar em Florianópolis.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://luschgarden.com.br/" },
  { name: "LUSCH AGÊNCIA", badge_label: "MARKETING", badge_color: "#1e3a5f", description: "Agência de eventos 360°.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://luschagencia.com.br/" },
];

const CompaniesSection = () => {
  useRealtimeSubscription("companies", ["companies"]);
  const { data: companies, isLoading } = useCompanies();
  const list = (companies && companies.length > 0 ? companies : defaultCompanies)
    .filter((v: any) => v.badge_label !== "INCORPORAÇÕES");

  return (
    <section id="empresas" className="py-10 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-20">
        <h3 className="text-gold font-bold tracking-widest text-sm mb-10 md:mb-16 uppercase">
          Conheça nossas empresas
        </h3>

        <div className="space-y-8 md:space-y-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px] md:h-[300px] rounded-2xl" />
            ))
          ) : (
            list.map((company: any) => (
              <CompanyCard key={company.name} company={company} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
