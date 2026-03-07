const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient placeholder for video */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-secondary" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-20">
        {/* Logo top right */}
        <div className="absolute top-8 right-6 lg:right-16 text-right">
          <h2 className="text-xl lg:text-2xl font-bold tracking-wider text-foreground">
            LS <span className="text-gold">HOLDINGS</span>
          </h2>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            Participações & Investimentos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20 lg:mt-0">
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Impactar, potencializar e{" "}
              <span className="text-gold">transformar</span> a vida de pessoas
              e empresas.
            </h1>
          </div>
          <div className="lg:pl-8">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Somos a Holding responsável pela Gestão dos Grupos Empresariais da
              LUSCH e Empreende Brazil.
            </p>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Você está pronto para viver momentos inesquecíveis conosco?
            </p>
            <div className="mt-8">
              <a
                href="#empresas"
                className="inline-block px-8 py-3 bg-gold text-primary-foreground font-semibold rounded-sm hover:bg-gold-light transition-colors tracking-wide"
              >
                CONHEÇA NOSSAS EMPRESAS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
