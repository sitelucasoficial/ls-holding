const mediaLogos = [
  "Forbes", "FORTUNE", "Inc.", "SUCCESS", "CNBC", "G1",
  "Exame", "SBT", "Jovem Pan", "CBN", "Record",
];

const FounderSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-accent uppercase mb-12 tracking-wide">
          Conheça Nosso Fundador
        </h2>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Photo placeholder */}
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] bg-secondary rounded-sm flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <div className="text-6xl mb-4">👤</div>
                <p className="text-sm font-medium uppercase tracking-widest">Foto</p>
                <p className="text-lg font-bold text-foreground mt-1">Lucas Schweitzer</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold text-gold mb-4">Lucas Schweitzer</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fundador do Grupo LS, empreendedor serial com mais de 15 anos de
              experiência, Lucas Schweitzer é reconhecido por criar negócios de
              impacto nas áreas de eventos, educação empreendedora e espaços
              experienciais. Já foi destaque em veículos como Forbes, Fortune,
              Inc., SUCCESS, CNBC, G1, Exame, SBT, Jovem Pan, CBN e Record.
            </p>

            {/* Media strip */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Imprensa
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                {mediaLogos.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Banners + video */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-secondary border border-border rounded-sm p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider">
                Documentário LS
              </p>
              <p className="text-xs text-muted-foreground mt-1">Em breve</p>
            </div>

            <a
              href="https://lucaschweitzer.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary border border-border rounded-sm p-6 text-center hover:border-gold/50 transition-colors block"
            >
              <p className="text-sm font-bold text-foreground uppercase tracking-wider">
                Site Lucas Schweitzer
              </p>
              <p className="text-xs text-muted-foreground mt-1">lucaschweitzer.com.br</p>
            </a>

            {/* Video placeholder */}
            <div className="aspect-video bg-secondary border border-border rounded-sm flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-3xl mb-2">▶</div>
                <p className="text-xs uppercase tracking-widest">Vídeo CNBC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
