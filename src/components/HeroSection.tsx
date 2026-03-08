import { ArrowRight, Diamond } from "lucide-react";
import { useSiteConfig } from "@/hooks/useCmsData";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

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

  // Split headline around the highlight word
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
      <header className="w-full border-b border-white/10 bg-background py-8">
        <div className="container mx-auto px-6 flex flex-col items-center">
          {logoUrl ? (
            <img src={logoUrl} alt="LS Holdings" className="h-12 w-auto" loading="lazy" />
          ) : (
            <>
              <div className="flex items-center gap-3 mb-1">
                <Diamond className="w-7 h-7 text-gold" />
                <h1 className="text-3xl font-black tracking-tighter text-white">LS HOLDINGS</h1>
              </div>
              <p className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground uppercase">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] text-white">
                {renderHeadline()}
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start gap-8">
              <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-gold pl-6">
                {description}
              </p>
              <a
                href={ctaLink}
                className="bg-gold hover:bg-gold-light transition-colors text-black font-bold py-4 px-10 rounded-lg flex items-center gap-2 group"
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
