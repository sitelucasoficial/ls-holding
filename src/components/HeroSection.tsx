import { ArrowRight, Diamond } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-background py-8">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-1">
            <Diamond className="w-7 h-7 text-gold" />
            <h1 className="text-3xl font-black tracking-tighter text-white">LS HOLDINGS</h1>
          </div>
          <p className="text-[10px] tracking-[0.3em] font-bold text-slate-400 uppercase">
            Participações & Investimentos
          </p>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] text-white">
                Impactar, potencializar e{" "}
                <span className="text-gold">transformar</span> a vida de pessoas e empresas.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start gap-8">
              <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-gold pl-6">
                Estratégias sólidas para o crescimento de negócios exponenciais. Fomentando o empreendedorismo com propósito.
              </p>
              <a
                href="#empresas"
                className="bg-gold hover:bg-gold-light transition-colors text-black font-bold py-4 px-10 rounded-lg flex items-center gap-2 group"
              >
                CONHEÇA NOSSAS EMPRESAS
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
