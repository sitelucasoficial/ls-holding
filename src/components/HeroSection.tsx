import { ArrowRight, Diamond } from "lucide-react";
import { useSiteConfig } from "@/hooks/useCmsData";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { bustCache, handleImgError } from "@/lib/imageUtils";

const HeroSection = () => {
  useRealtimeSubscription("site_config", ["site_config"]);
  const { data: config } = useSiteConfig();

  const headline = config?.hero_headline || "Impactar, potencializar e transformar a vida de pessoas e empresas.";
  const highlightWord = config?.hero_highlight_word || "transformar";
  const description = config?.hero_description || "Estratégias sólidas para o crescimento de negócios exponenciais. Fomentando o empreendedorismo com propósito.";
  const ctaLabel = config?.hero_cta_label || "CONHEÇA NOSSAS EMPRESAS";
  const ctaLink = config?.hero_cta_link || "#empresas";
  const subtitle = config?.header_subtitle || "Participações & Investimentos";
  const logoUrl = config?.header_logo_url;

  const renderHeadline = () => {
    if (!highlightWord) return <>{headline}</>;
    const parts = headline.split(highlightWord);
    if (parts.length < 2) return <>{headline}</>;
    return (
      <>
        {parts[0]}
        <span className="text-gold">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      <header className="w-full border-b border-white/10 bg-background py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          {logoUrl ? (
            <img src={bustCache(logoUrl)} alt="LS Holdings" className="h-16 md:h-20 lg:h-24 w-auto" loading="lazy" onError={handleImgError} />
          ) : (
            <>
              <div className="flex items-center gap-3 mb-1">
                <Diamond className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white">LS HOLDINGS</h1>
              </div>
              <p className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground uppercase">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </header>

      <section className="relative py-10 md:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black leading-[1.1] text-white">
                {renderHeadline()}
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:gap-8">
              <p className="text-base md:text-lg text-slate-400 leading-relaxed border-l-2 border-gold pl-6">
                {description}
              </p>
              <a
                href={ctaLink}
                className="bg-gold hover:bg-gold-light transition-colors text-black font-bold py-4 px-10 rounded-lg flex items-center justify-center gap-2 group w-full md:w-auto"
              >
                {ctaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
