import { Play } from "lucide-react";

const companies = [
  {
    name: "EMPREENDE BRAZIL",
    label: "ECOSSISTEMA",
    labelColor: "bg-green-600",
    url: "https://empreendebrazil.com.br/",
    description:
      "O maior ecossistema do empreendedor brasileiro. Reúne conferências, clube de membros, mentorias e uma comunidade de alto impacto. Criador da maior imersão em empreendedorismo da América Latina, onde marcas e pessoas se potencializam através da troca de experiências, conhecimento e networking.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDi_hPVNLBU3uDS3CN8IzqUyjPajss7Fr5lhsSbxqSYFLKJmCixsm5L4v3SSoI3AHKfWQf_ChGLFT4hmO9SWD4pej8jbjKgkVSwVg2zNkL_DBN6D4pKw85Wyf2RsI_cLNoSmIpPQMPt0hsPAB2EuGP4ZDKjwoDL1DJKCNoavHaJ14fVTJNLxrRfW_6FZlZK3aqRKCSVAznjHSNZHoP2A3HqT9D73Q2CkqkKVuEj11CTBXdg-b_y37XLHA3RzRHXGvFiyYiQfLnAG_M",
  },
  {
    name: "EMPREENDE BRAZIL CLUB",
    label: "COMUNIDADE",
    labelColor: "bg-green-600",
    url: "https://empreendebrazil.com.br/ebclub/",
    description:
      "Um grupo seleto de empreendedores, líderes, executivos e profissionais de alta performance. Através de uma programação anual estrategicamente elaborada, você tem acesso a experiências que potencializam seus resultados, aceleram seu negócio e fortalecem seu networking.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_bVkqGkoqUxFN3q2wyYhWx5G5xofYHVaqVK1wjt2P2etaFhIIJf9Sp6OkilTDE7YsfTr8sPgi_XOUYS3ttDY5716KuWi4jCRlWh-MIhNSOVg3CpLSgSjD44ar_C659GlxSlgdvQeemD6kcuc7e54vW_LFAv12_NDKPPudkGuPfiBIGhz2YA34ClXE3jpuM5BKZUwvDVSKs6n4mhFPc42zNWqt-_zPsS9903AHltnBgW7055FOlrXn1aFuwpyKlscc0h1YcBEIjeo",
  },
  {
    name: "LUSCH GARDEN",
    label: "EXPERIÊNCIA",
    labelColor: "bg-emerald-700",
    url: "https://luschgarden.com.br/",
    description:
      "Situada em Florianópolis, a LUSCH Garden oferece 5.000m² de exuberante área verde à beira-mar, criando um cenário exclusivo e encantador para eventos memoráveis. Com três ambientes distintos e infraestrutura completa, é o espaço perfeito para transformar ocasiões especiais em momentos inesquecíveis.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM8rFAKRfX7ghqCjxNOeATO3wDNzYtr6hV7xFTTZr2QB7P5dNxP6ryvjgmhzN30c2fb7fhJsbRHTfbHOJWQTi-xsC-wnKYB5ZyCDWq0tKbFEUjK27BYHX0-BMiwjlzWN0A6UFjtAgwI_7IPHR4uzb7RPsADEd1wSJjvDwlMg5FXafJ1v5LetEBvRnmvSd6igg_oE42M_kEqQTXplQ5au9-k_Lht8n1SyZcT4jAD2F8TCeVSB63lu_rH1MeA7QRzBWLlqDT-6bi9RI",
  },
  {
    name: "LUSCH AGÊNCIA",
    label: "MARKETING",
    labelColor: "bg-blue-900",
    url: "https://luschagencia.com.br/",
    description:
      "Agência de eventos 360°, especializada em live marketing e organização de eventos. Com mais de 10 anos de história e vencedora do Prêmio Caio 2022, entrega projetos em forma de experiência — com criação, design, vídeos, planejamento estratégico e produção encantadora para conectar e potencializar marcas e pessoas.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQQl0Z3easX_bc309BDX1e_ZIeydMIzZHHSmxdS-AmPkL9ArnwJzdKs3nuAJBSAKi3EZy9i1wDFBqAJNZSV5usiwdMycRyMqewENRNAhcHVLR80d7YhsncrhpJS86CcCv9NzcMIMwTPJaqPpsnHY-h1Jwrxtql91RbnpJwWecnIiS8Yp1rFAgU55XqD7Uy1s6MRa8vn5i3itvwibxWybHjftCmBAFRe4Sv0PjjySYX7bNgdC9DOpKGP6KvOyAsv4p0Z8-wPYO7uD8",
  },
  {
    name: "LUSCH INCORP",
    label: "EM BREVE",
    labelColor: "bg-gray-600",
    url: "#",
    description:
      "Em breve. Novo braço do Grupo LS voltado para incorporação e desenvolvimento imobiliário.",
    image: "",
  },
];

const CompaniesSection = () => {
  return (
    <section id="empresas" className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="text-gold font-bold tracking-widest text-sm mb-16 uppercase">
          Conheça nossas empresas
        </h3>

        <div className="space-y-12">
          {companies.map((company) => (
            <div
              key={company.name}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/5 rounded-2xl overflow-hidden border border-white/5 group"
            >
              {/* Image / Video placeholder */}
              <div className="relative aspect-video lg:aspect-auto h-full min-h-[300px]">
                {company.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${company.image}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8" />
                  </div>
                </div>
                <div
                  className={`absolute top-6 left-6 ${company.labelColor} text-[10px] font-bold px-3 py-1 rounded text-white tracking-widest`}
                >
                  {company.label}
                </div>
              </div>

              {/* Info */}
              <div className="p-10 lg:p-16">
                <h4 className="text-3xl font-black text-white mb-6">{company.name}</h4>
                <p className="text-slate-400 mb-10 leading-relaxed max-w-md">
                  {company.description}
                </p>
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold text-gold font-bold px-8 py-3 rounded-lg hover:bg-gold hover:text-black transition-all inline-block"
                >
                  VEJA MAIS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
