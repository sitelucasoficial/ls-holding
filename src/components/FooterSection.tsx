import { Mail, Phone, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-navy-deep border-t border-border py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              LS <span className="text-gold">HOLDINGS</span>
            </h3>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Participações & Investimentos
            </p>
            <p className="text-sm text-muted-foreground">
              Impactar, potencializar e transformar a vida de pessoas e empresas.
            </p>
          </div>

          {/* Contatos */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Contatos
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+55 (48) 99662-4084</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>(48) 3030-7322</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>atendimento@lsholdings.com.br</span>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Endereço
            </h4>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <span>
                Rua Raimundo Bridon, 223 — Itaguaçu, Florianópolis - SC — CEP 88085-370
              </span>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="https://instagram.com/ls.holding"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gold transition-colors"
              >
                Instagram @ls.holding
              </a>
              <a
                href="https://forms.monday.com/forms/0b7c6651a7ffcc5da61f9fa588b1fbd8?r=use1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-5 py-2 border border-gold text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-primary-foreground transition-colors"
              >
                Trabalhe Conosco
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 LS Holdings. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
