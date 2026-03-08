import { Mail, Phone, MapPin, Camera, Diamond } from "lucide-react";
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
    <footer className="bg-[hsl(30,10%,7%)] pt-10 md:pt-16 lg:pt-24 pb-8 md:pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 md:gap-y-12 mb-12 md:mb-20 items-start">
          <div className="text-center md:text-left">
            <h5 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest gold-underline inline-block md:block">Contatos</h5>
            <ul className="space-y-1 text-slate-400 leading-relaxed">
              <li className="flex items-center justify-center md:justify-start gap-3"><Mail className="w-4 h-4 text-gold shrink-0" />{email}</li>
              <li className="flex items-center justify-center md:justify-start gap-3"><Phone className="w-4 h-4 text-gold shrink-0" /><a href="https://api.whatsapp.com/send/?phone=5548996624084&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{phone1}</a></li>
              <li className="flex items-center justify-center md:justify-start gap-3"><Phone className="w-4 h-4 text-gold shrink-0" />{phone2}</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h5 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest gold-underline inline-block md:block">Endereço</h5>
            <p className="text-slate-400 leading-relaxed flex items-start justify-center md:justify-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
              <span>{address.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h5 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest gold-underline whitespace-nowrap">Faça parte do nosso time</h5>
            <a href={workUrl} target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors w-full md:w-auto text-center min-h-[44px]">
              {workLabel}
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h5 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest gold-underline inline-block md:block">Siga-nos</h5>
            <div className="flex gap-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all text-slate-400">
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {footer?.logo_url ? (
                <img src={`${footer.logo_url}?t=${Date.now()}`} alt="Logo" className="h-8 object-contain" />
              ) : (
                <div className="flex items-center gap-2">
                  <Diamond className="w-5 h-5 text-gold" />
                  <span className="text-white font-bold tracking-tighter">LS HOLDINGS</span>
                </div>
              )}
              <p className="text-slate-500 text-xs leading-none m-0">{copyright}</p>
            </div>
            <div className="flex gap-6 text-[10px] uppercase font-bold text-slate-500">
              <span>Feito por <a className="hover:text-white transition-colors" href="https://www.moadigital.com.br/" target="_blank" rel="noopener noreferrer">MOA Digital</a></span>
              <a className="hover:text-white transition-colors" href="/privacidade">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
