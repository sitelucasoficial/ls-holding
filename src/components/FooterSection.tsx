import { Mail, Phone, MapPin, Globe, Camera, Diamond } from "lucide-react";
import { useFooter } from "@/hooks/useCmsData";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const FooterSection = () => {
  useRealtimeSubscription("footer", ["footer"]);
  const { data: footer } = useFooter();

  const email = footer?.email || "atendimento@lsholdings.com.br";
  const phone1 = footer?.phone1 || "+55 (48) 99662-4084";
  const phone2 = footer?.phone2 || "(48) 3030-7322";
  const address = footer?.address || "Rua Raimundo Bridon, 223\nItaguaçu, Florianópolis - SC\nCEP: 88085-370";
  const instagramHandle = footer?.instagram_handle || "@ls.holding";
  const instagramUrl = footer?.instagram_url || "https://instagram.com/ls.holding";
  const workLabel = footer?.work_button_label || "TRABALHE CONOSCO";
  const workUrl = footer?.work_button_url || "https://forms.monday.com/forms/0b7c6651a7ffcc5da61f9fa588b1fbd8?r=use1";
  const copyright = footer?.copyright || "© 2025 LS Holdings. Todos os direitos reservados.";

  return (
    <footer className="bg-[hsl(30,10%,7%)] pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h5 className="text-white font-bold mb-8 text-sm uppercase tracking-widest gold-underline">Contatos</h5>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" />{email}</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" />{phone1}</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" />{phone2}</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 text-sm uppercase tracking-widest gold-underline">Endereço</h5>
            <p className="text-slate-400 leading-relaxed flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
              <span>{address.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</span>
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 text-sm uppercase tracking-widest gold-underline">Siga-nos</h5>
            <div className="flex gap-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all text-slate-400">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all text-slate-400">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <p className="text-slate-500 text-xs mb-4 text-left lg:text-right uppercase font-bold">Faça parte do nosso time</p>
            <a href={workUrl} target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors w-full lg:w-auto text-center">
              {workLabel}
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="flex items-center gap-2">
            {footer?.logo_url ? (
              <img src={`${footer.logo_url}?t=${Date.now()}`} alt="Logo" className="h-8 object-contain" />
            ) : (
              <>
                <Diamond className="w-5 h-5 text-gold" />
                <span className="text-white font-bold tracking-tighter">LS HOLDINGS</span>
              </>
            )}
          </div>
          <p className="text-slate-500 text-xs">{copyright}</p>
          <div className="flex gap-6 text-[10px] uppercase font-bold text-slate-500">
            <span>Feito por <a className="hover:text-white transition-colors" href="https://www.moadigital.com.br/" target="_blank" rel="noopener noreferrer">MOA Digital</a></span>
            <a className="hover:text-white transition-colors" href="/privacidade">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
