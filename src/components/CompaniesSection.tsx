import { Play } from "lucide-react";
import { useCompanies } from "@/hooks/useCmsData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { bustCache, PLACEHOLDER_IMG } from "@/lib/imageUtils";

const defaultCompanies = [
  { name: "EMPREENDE BRAZIL", badge_label: "ECOSSISTEMA", badge_color: "#16a34a", description: "O maior ecossistema do empreendedor brasileiro.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://empreendebrazil.com.br/" },
  { name: "EMPREENDE BRAZIL CLUB", badge_label: "COMUNIDADE", badge_color: "#16a34a", description: "Um grupo seleto de empreendedores.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://empreendebrazil.com.br/ebclub/" },
  { name: "LUSCH GARDEN", badge_label: "EXPERIÊNCIA", badge_color: "#047857", description: "5.000m² de área verde à beira-mar em Florianópolis.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://luschgarden.com.br/" },
  { name: "LUSCH AGÊNCIA", badge_label: "MARKETING", badge_color: "#1e3a5f", description: "Agência de eventos 360°.", logo_url: "", button_label: "VEJA MAIS", button_url: "https://luschagencia.com.br/" },
];

const CompaniesSection = () => {
  useRealtimeSubscription("companies", ["companies"]);
  const { data: companies, isLoading } = useCompanies();
  const list = companies && companies.length > 0 ? companies : defaultCompanies;

  return (
    <section id="empresas" className="py-10 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-gold font-bold tracking-widest text-sm mb-10 md:mb-16 uppercase">
          Conheça nossas empresas
        </h3>

        <div className="space-y-8 md:space-y-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px] md:h-[300px] rounded-2xl" />
            ))
          ) : (
            list.map((company: any) => {
              const bgUrl = company.logo_url ? bustCache(company.logo_url) : null;
              return (
                <div
                  key={company.name}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center bg-white/5 rounded-2xl overflow-hidden border border-white/5 group"
                >
                  <div className="relative aspect-video lg:aspect-auto h-[200px] md:h-[250px] lg:h-full lg:min-h-[300px]">
                    {bgUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${bgUrl}')` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {(company.show_play_icon ?? true) && (
                        <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                      )}
                    </div>
                    <div
                      className="absolute top-4 left-4 md:top-6 md:left-6 text-[10px] font-bold px-3 py-1 rounded text-white tracking-widest"
                      style={{ backgroundColor: company.badge_color || "#16a34a" }}
                    >
                      {company.badge_label}
                    </div>
                  </div>

                  <div className="p-6 md:p-10 lg:p-16">
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6">{company.name}</h4>
                    <p className="text-slate-400 mb-6 md:mb-10 leading-relaxed max-w-md text-[15px] md:text-base">{company.description}</p>
                    <a
                      href={company.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gold text-gold font-bold px-8 py-3 rounded-lg hover:bg-gold hover:text-black transition-all block md:inline-block text-center min-h-[44px] leading-[44px] md:leading-normal"
                    >
                      {company.button_label || "VEJA MAIS"}
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
