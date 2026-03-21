import { Play } from "lucide-react";
import { useCompanies } from "@/hooks/useCmsData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { bustCache } from "@/lib/imageUtils";

const IncorporationsSection = () => {
  useRealtimeSubscription("companies", ["companies"]);
  const { data: companies, isLoading } = useCompanies();
  
  const incorporation = companies?.find(c => c.badge_label === "INCORPORAÇÕES") || {
    name: "LUSCH INCORPORAÇÕES",
    badge_label: "INCORPORAÇÕES",
    badge_color: "#1e3a5f",
    description: "Seu olhar, um horizonte de possibilidades.",
    logo_url: "",
    button_label: "SAIBA MAIS",
    button_url: "#",
    show_play_icon: false
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

  const bgUrl = incorporation.logo_url ? bustCache(incorporation.logo_url) : null;
  const showPlay = incorporation.show_play_icon ?? false;

  return (
    <section id="incorporacoes" className="pb-10 md:pb-16 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-20 -mt-10 md:-mt-16 lg:-mt-24 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center bg-white/5 rounded-2xl overflow-hidden border border-white/5 group">
          <div className="relative h-[200px] md:h-[250px] lg:h-full lg:min-h-[300px] block">
            {bgUrl ? (
              <img
                src={bgUrl}
                alt={incorporation.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              {showPlay && (
                <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              )}
            </div>
            <div
              className="absolute top-4 left-4 md:top-6 md:left-6 text-[10px] font-bold px-3 py-1 rounded text-white tracking-widest uppercase"
              style={{ backgroundColor: incorporation.badge_color || "#1e3a5f" }}
            >
              {incorporation.badge_label}
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-16">
            <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6">{incorporation.name}</h4>
            <p className="text-slate-400 mb-6 md:mb-10 leading-relaxed max-w-md text-[15px] md:text-base">{incorporation.description}</p>
            <a
              href={incorporation.button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-bold px-8 py-3 rounded-lg hover:bg-gold hover:text-black transition-all block md:inline-block text-center min-h-[44px] leading-[44px] md:leading-normal"
            >
              {incorporation.button_label || "VEJA MAIS"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncorporationsSection;
