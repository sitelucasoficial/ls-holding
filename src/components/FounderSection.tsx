import { ExternalLink, Play } from "lucide-react";
import { useFounder, useFounderMedia } from "@/hooks/useCmsData";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { bustCache, handleImgError } from "@/lib/imageUtils";
import { Skeleton } from "@/components/ui/skeleton";

const defaultMediaLogos = [
  { name: "Forbes", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZGXiXkB5HtMFKHePF2CB4gUebGnPKcEYY1jnxSYn2KOqLmAumptZS5jf5rQCP50Wa2BQ0wMOxrmBWkZLwvVLi-ykIKcFyRihp_1nag-bZuhDx28WUL-5Q_rwfQyaUakVdSB8zWBuKg2LKkCnqW9BiMP93pX9TCavdP969LcvWixvg4Y3taRqeUMYBCppaJBGvGpiP8K29J4F9Qm9z0mJUQFYMcsbodcsQGxw74tR7IjRhpJ9McSTVPF5G4foKI5Qtfn0yjb07yxU" },
  { name: "Fortune", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKrfMt6keLqy6I9uaMMJsBsZySxcgwC3Empwb8qyMi9YbQlpxgXfzR4azBUktV3lxlH1rq1hZAp0rwjC-vpc5DadGkIXXRd4cX0CsA0gzKl6CyjlfqlVrDqEIkSy25gMosLSBjrkgum-VDt3O1i67lOJ_w6WbX3-Cups4G1NvddNNiPpd43bKHjoojr_UDCd35rvfB0QPU5DiY3rFQoWGVYqiJdZ1KoF--C0IxJcWa60TU8xiAteAHKbWntbKwQwivaGpgd94uQtY" },
  { name: "Inc", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2RSv2-Cuvag4BPyJ0cN2gqJbNGRfXw27QBIE9mgW7lusUFVFv9XzZk1nCxvYmgEk_sWyRLJWMq4tYwgUm8xJWu-4fl9wbB6SvkY4JqRKYEnW731VRaEoMTVgKq6ojUq9enw7GlMnSGahJF1kBq7CYEknS6xifU2k8Uy6HJB352J3dFbJZpRzYo6A0_tuU385T1m_w6IgE-vHZv5MZOiUWadngGNA9UzZMgit3NFRaxHhQMKO_2xkBoPGn7CsmEXP0KOBcd1Bn_7g" },
  { name: "CNBC", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmRWvkNB3HqNPgEIuEX8SFFoTZ2WxONXrcDYX1pV-7eusjSOZGrJ1KUXpDaStqDP9muVd8e0gtwkvgimQFyhixo0qjbwbMEAExT5KDWd_q4Gpg8TIlECZwWU3uGiil5-W_cYZDDuDvnPbYtx9vbUiWvYbpDV9EDo7K_UWofACwUyjja_BLRYzTX9FQND92lLK-wKwcng0yizohWXz_LcIOr8gVT5ZX8Aj8jRPUWUG3eELFazyCnMKI11wv4WnlFUBeHxuWhRLsKfo" },
  { name: "G1", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-P-DTvpnnLaLEdQh6BgO0pD6fueZqMBY6GFr14Tkcah5K9PABiJ3wiTuVtsqB5_lefCkroaM7D3QGIVpNfQ9jkEe70o6ueFmahXDgXmtzQF8EO-h2cL-78_zv5uLclbcWuqDXMH8Ah9fRd4uEo8_6XIiDDprTbncqGj0OZV-6H5kzbrTCuhRFYOp0DTZYwh5GNRWoukbq_Slwq70VBhlrzChiOnlqfv59eGtJs3jKvdhMXr0Jwz0OXnM4Le8-C97RGKpNXO325ZA" },
  { name: "Exame", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrO0bNnUvsvaHgbQo_0KfqYFa4i4olmW6JPNp0W10dAmABHetY7lQ7UBhjcNd-f-Kihf8wI7t3OK2Uv18HmqNFHuZzWmzsSxxaluJo5RCtPFfJMqcCeoNqm2PiTMnTItRr0mkNn33W4B5h4QZnSCvNpn9ozXDbxOFT4Hh4oARg7RWVTneRuD9524j1V3hbqghf9HAge-547GMbLM7Ug_nXkolg4UQdrWRLbn_AcjvyujPz3fKHyCKpL1tiHIro2Su2DPKcc68QF88" },
  { name: "SBT", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxXRiTHH4UtFG8QCoxNlFlFAqGF4P1WkTZk1C2j8-c5H7Kha6H_Y0hup8HIT6_RG-QraKF6iGtd53fcUtKhYoIj0VxOuXlpTb2Q4hbeQUv_b0DG9uZhZvSj18_mCRuxzltCVC0-R9j6gif5U3_NE4GUi_jw8qnEzTkvtmFHKMQBYg0xv-CTwGHZBHrGJKjyF_YsReWOiSmES_ycq2eATxIBD83Dl1Oq0wwsiu4j3znE1bpeqVwKZzbbaVh7FLk5HHeAio1lEFxE78" },
  { name: "Record", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCdisPQohsueTM7wV8dxnCWDb8zYto7P8bQDypZI31CAlRviYAUR6z4vUDDkubPUqINFUFzpjA4uLVrxqPCgNBXe_hn49dwJaqqka2pynvvEQXd0nq5My_p5dVWvCrd4-5PrsuFJX2EIgFiYGV_MYUp_lZU0KVEd993eA7g9rPz1LQhJLJ2o7qfm5dPB39_VNqvKfC3WdoDNaH41NVTvCbMC3S4c7NNX9zhrPzNDUAzo1Oz1fgnYqYeJfOSXw-aKMN2sT5OAkLim0" },
];

const defaultBio = "Fundador do Grupo LS, empreendedor serial e investidor focado em transformar o ecossistema de negócios através de liderança e inovação. Criador do Empreende Brazil — a maior imersão em empreendedorismo da América Latina — e mentor com programa de 90 dias para empresários.\n\nJá foi destaque em veículos como Forbes, Exame, SBT News, NSC Total e ND Mais. Suas imersões unem estratégia, networking e vivências práticas de transformação empreendedora.";
const defaultPhoto = "https://lh3.googleusercontent.com/aida-public/AB6AXuDya_C15af_g1ddWLNngXlro3JXKlO1ZUtoK6JMYq5KiCnaRPY8pGWkkMfusMSrpCJ3WqhfhqCEyNLjl863i5Tcy4ShBK18V1Oa5ngIcTgAvk96ljGhBk73ceVfTV6xEuvrmNuWJ5V4fUQXs9qreQQO_Vgw6Vpm_urDgGhyljsHTpyqHFHBW0K6aM2sHk7X7o7njfv7m0wAsCR7bhG4Hy7L8LjHjhJ__MPzDiMGfb4kEXuU4GjRwmzRSUJv2bSAjbnU_vzW4sIh19c";
const defaultVideoThumb = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRzCiKM2E1nUEVwP74KxD6CuiFkgMDYKGR7CJCTlBQIImEChHeE5PeV0O6397w-7IEFD7bUja00jOLL663GRT2k8ASddublMs_TNg6SqNTujsuYY01hNaZUudRQJ64W2FhVG04v1Hi_zezYYAOgxVgYEoszG7RDqQ7YSoaI7Kd7XGfJREDYBoXUt-p_Xji8ldR-XIrwK87O2gwYUZ-CJr86esmviGg-4yc0uE_ppOQ05PJvp7fvTZPwrGX-s299_eDsaA195MV2pE";

const FounderSection = () => {
  useRealtimeSubscription("founder", ["founder"]);
  useRealtimeSubscription("founder_media", ["founder_media"]);
  const { data: founder, isLoading } = useFounder();
  const { data: founderMedia } = useFounderMedia();

  const name = founder?.name || "Lucas Schweitzer";
  const photo = founder?.photo_url || defaultPhoto;
  const bio = founder?.bio || defaultBio;
  const hasDbMedia = founderMedia && founderMedia.length > 0;
  const mediaLogos = hasDbMedia ? founderMedia : (founder?.media_logos as any[]) || defaultMediaLogos;
  const docLabel = founder?.doc_label || "DOCUMENTÁRIO LS";
  const docUrl = founder?.doc_url || "";
  const siteLabel = founder?.site_label || "SITE LUCAS SCHWEITZER";
  const siteUrl = founder?.site_url || "https://lucaschweitzer.com.br/";
  const videoThumb = founder?.video_thumbnail_url || defaultVideoThumb;
  const videoUrl = founder?.video_url || "";
  const videoLabel = founder?.video_label || "VÍDEO CNBC";

  if (isLoading) {
    return (
      <section className="py-10 md:py-16 lg:py-24 bg-[hsl(var(--neutral-dark))]/50">
        <div className="container mx-auto px-4 md:px-6">
          <Skeleton className="h-6 w-48 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <Skeleton className="aspect-[3/4] rounded-xl" />
            <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-32 w-full" /></div>
            <div className="space-y-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /><Skeleton className="aspect-video w-full rounded-xl" /></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[hsl(var(--neutral-dark))]/50">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-gold font-bold tracking-widest text-sm mb-8 md:mb-12 uppercase">
          Conheça nosso fundador
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Photo */}
          <div className="relative group flex justify-center md:justify-start md:col-span-1">
            <div className="aspect-[3/4] rounded-xl overflow-hidden transition-all duration-500 w-full max-w-[280px] md:max-w-none">
              <img
                alt={name}
                className="w-full h-full object-cover"
                src={bustCache(photo)}
                loading="lazy"
                onError={handleImgError}
                width={400}
                height={533}
              />
            </div>
          </div>

          {/* Bio + Media */}
          <div className="flex flex-col justify-between md:col-span-1">
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-gold mb-4 md:mb-6">{name}</h4>
              <div className="space-y-4 text-slate-300 leading-relaxed text-[15px] md:text-base">
                {bio.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="mt-8 lg:mt-12">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                Mídia & Reconhecimento
              </p>
              <div className="grid grid-cols-4 md:grid-cols-2 gap-x-2 gap-y-0 opacity-40 grayscale contrast-125 items-center">
                {mediaLogos.map((logo: any) => {
                  const imgSrc = logo.image_url || logo.src;
                  const imgAlt = logo.label || logo.name;
                  const link = logo.external_link;
                  const Wrapper = link ? 'a' : 'div';
                  const wrapperProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};
                  return (
                    <Wrapper key={logo.id || imgAlt} {...wrapperProps as any} className="hover:opacity-80 transition-opacity py-1 min-h-[44px] flex items-center">
                      <img
                        alt={imgAlt}
                        src={bustCache(imgSrc)}
                        className="w-full object-contain"
                        style={{ height: '60px' }}
                        loading="lazy"
                        onError={handleImgError}
                        width={120}
                        height={60}
                      />
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Banners + Video */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-2 lg:col-span-1">
            <a href={docUrl || "#"} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-xl hover:bg-white/10 transition-colors group block min-h-[44px]">
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-white tracking-tight">{docLabel}</h5>
                <ExternalLink className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-xl hover:bg-white/10 transition-colors group block min-h-[44px]">
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-white tracking-tight">{siteLabel}</h5>
                <ExternalLink className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a href={videoUrl || "#"} target="_blank" rel="noopener noreferrer" className="relative mt-auto aspect-video rounded-xl overflow-hidden group cursor-pointer block">
              <img
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src={bustCache(videoThumb)}
                loading="lazy"
                onError={handleImgError}
                width={640}
                height={360}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black mb-2">
                  <Play className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white tracking-[0.2em]">{videoLabel}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
