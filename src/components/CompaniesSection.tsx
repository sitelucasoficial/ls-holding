const companies = [
  {
    name: "Empreende Brazil",
    labelColor: "bg-emerald-600",
    url: "https://empreendebrazil.com.br/",
    description:
      "O maior ecossistema do empreendedor brasileiro. Reúne conferências, clube de membros, mentorias e uma comunidade com mais de 5 milhões de pessoas impactadas. Criador da maior imersão em empreendedorismo da América Latina.",
  },
  {
    name: "Empreende Brazil Club",
    labelColor: "bg-green-500",
    url: "https://empreendebrazil.com.br/ebclub/",
    description:
      "Sua chave de acesso ao próximo nível. Uma agenda anual de alta frequência com eventos exclusivos, networking e conteúdo para acelerar o crescimento do empreendedor.",
  },
  {
    name: "LUSCH Garden",
    labelColor: "bg-teal-500",
    url: "https://luschgarden.com.br/",
    description:
      "Espaço de eventos único, frente ao mar, em Florianópolis. São 5.000m² de área arborizada com ambientes exclusivos para casamentos, eventos corporativos, confraternizações e mais.",
  },
  {
    name: "LUSCH Agência",
    labelColor: "bg-blue-800",
    url: "https://luschagencia.com.br/",
    description:
      "Agência criadora do Empreende Brazil e vencedora do Prêmio Caio 2022. Especialistas em eventos 360°, live marketing, brand experience, convenções e muito mais. Mais de 5 milhões de pessoas já impactadas.",
  },
  {
    name: "LUSCH Incorp",
    labelColor: "bg-gray-600",
    url: "#",
    description:
      "Em breve. Novo braço do Grupo LS voltado para incorporação e desenvolvimento imobiliário.",
  },
];

const CompaniesSection = () => {
  return (
    <section id="empresas" className="py-20 bg-card">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-accent uppercase mb-12 tracking-wide">
          Conheça Nossas Empresas
        </h2>

        <div className="space-y-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="grid md:grid-cols-2 border border-border rounded-sm overflow-hidden hover:border-gold/30 transition-colors"
            >
              {/* Video placeholder */}
              <div className="relative aspect-video md:aspect-auto bg-secondary flex items-center justify-center min-h-[240px]">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-secondary" />
                <div className="relative text-center">
                  <div className="text-4xl text-muted-foreground mb-3">▶</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Vídeo de fundo
                  </p>
                </div>
                <span
                  className={`absolute bottom-4 left-4 ${company.labelColor} text-foreground text-sm font-bold px-4 py-1.5 rounded-sm uppercase tracking-wider`}
                >
                  {company.name}
                </span>
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-center bg-background">
                {/* Logo placeholder */}
                <div className="w-40 h-10 bg-secondary rounded-sm flex items-center justify-center mb-4 border border-border">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    Logo
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {company.description}
                </p>
                <div>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 border border-gold text-gold font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-gold hover:text-primary-foreground transition-colors"
                  >
                    Veja Mais
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
