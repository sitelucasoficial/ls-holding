import { Play } from "lucide-react";
import { bustCache } from "@/lib/imageUtils";

interface CompanyCardProps {
  company: {
    name: string;
    badge_label?: string;
    badge_color?: string;
    description?: string;
    logo_url?: string;
    button_label?: string;
    button_url?: string;
    show_play_icon?: boolean;
  };
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const bgUrl = company.logo_url ? bustCache(company.logo_url) : null;
  const showPlay = company.show_play_icon ?? true;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center bg-white/5 rounded-2xl overflow-hidden border border-white/5 group lg:min-h-[450px]">
      <div className="relative h-[200px] md:h-[250px] lg:h-full block">
        {bgUrl ? (
          <img
            src={bgUrl}
            alt={company.name}
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
};

export default CompanyCard;
