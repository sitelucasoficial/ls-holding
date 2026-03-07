import { ExternalLink, Quote, Play } from "lucide-react";

const mediaLogos = [
  { name: "Forbes", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZGXiXkB5HtMFKHePF2CB4gUebGnPKcEYY1jnxSYn2KOqLmAumptZS5jf5rQCP50Wa2BQ0wMOxrmBWkZLwvVLi-ykIKcFyRihp_1nag-bZuhDx28WUL-5Q_rwfQyaUakVdSB8zWBuKg2LKkCnqW9BiMP93pX9TCavdP969LcvWixvg4Y3taRqeUMYBCppaJBGvGpiP8K29J4F9Qm9z0mJUQFYMcsbodcsQGxw74tR7IjRhpJ9McSTVPF5G4foKI5Qtfn0yjb07yxU" },
  { name: "Fortune", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKrfMt6keLqy6I9uaMMJsBsZySxcgwC3Empwb8qyMi9YbQlpxgXfzR4azBUktV3lxlH1rq1hZAp0rwjC-vpc5DadGkIXXRd4cX0CsA0gzKl6CyjlfqlVrDqEIkSy25gMosLSBjrkgum-VDt3O1i67lOJ_w6WbX3-Cups4G1NvddNNiPpd43bKHjoojr_UDCd35rvfB0QPU5DiY3rFQoWGVYqiJdZ1KoF--C0IxJcWa60TU8xiAteAHKbWntbKwQwivaGpgd94uQtY" },
  { name: "Inc", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2RSv2-Cuvag4BPyJ0cN2gqJbNGRfXw27QBIE9mgW7lusUFVFv9XzZk1nCxvYmgEk_sWyRLJWMq4tYwgUm8xJWu-4fl9wbB6SvkY4JqRKYEnW731VRaEoMTVgKq6ojUq9enw7GlMnSGahJF1kBq7CYEknS6xifU2k8Uy6HJB352J3dFbJZpRzYo6A0_tuU385T1m_w6IgE-vHZv5MZOiUWadngGNA9UzZMgit3NFRaxHhQMKO_2xkBoPGn7CsmEXP0KOBcd1Bn_7g" },
  { name: "CNBC", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmRWvkNB3HqNPgEIuEX8SFFoTZ2WxONXrcDYX1pV-7eusjSOZGrJ1KUXpDaStqDP9muVd8e0gtwkvgimQFyhixo0qjbwbMEAExT5KDWd_q4Gpg8TIlECZwWU3uGiil5-W_cYZDDuDvnPbYtx9vbUiWvYbpDV9EDo7K_UWofACwUyjja_BLRYzTX9FQND92lLK-wKwcng0yizohWXz_LcIOr8gVT5ZX8Aj8jRPUWUG3eELFazyCnMKI11wv4WnlFUBeHxuWhRLsKfo" },
  { name: "G1", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-P-DTvpnnLaLEdQh6BgO0pD6fueZqMBY6GFr14Tkcah5K9PABiJ3wiTuVtsqB5_lefCkroaM7D3QGIVpNfQ9jkEe70o6ueFmahXDgXmtzQF8EO-h2cL-78_zv5uLclbcWuqDXMH8Ah9fRd4uEo8_6XIiDDprTbncqGj0OZV-6H5kzbrTCuhRFYOp0DTZYwh5GNRWoukbq_Slwq70VBhlrzChiOnlqfv59eGtJs3jKvdhMXr0Jwz0OXnM4Le8-C97RGKpNXO325ZA" },
  { name: "Exame", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrO0bNnUvsvaHgbQo_0KfqYFa4i4olmW6JPNp0W10dAmABHetY7lQ7UBhjcNd-f-Kihf8wI7t3OK2Uv18HmqNFHuZzWmzsSxxaluJo5RCtPFfJMqcCeoNqm2PiTMnTItRr0mkNn33W4B5h4QZnSCvNpn9ozXDbxOFT4Hh4oARg7RWVTneRuD9524j1V3hbqghf9HAge-547GMbLM7Ug_nXkolg4UQdrWRLbn_AcjvyujPz3fKHyCKpL1tiHIro2Su2DPKcc68QF88" },
  { name: "SBT", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxXRiTHH4UtFG8QCoxNlFlFAqGF4P1WkTZk1C2j8-c5H7Kha6H_Y0hup8HIT6_RG-QraKF6iGtd53fcUtKhYoIj0VxOuXlpTb2Q4hbeQUv_b0DG9uZhZvSj18_mCRuxzltCVC0-R9j6gif5U3_NE4GUi_jw8qnEzTkvtmFHKMQBYg0xv-CTwGHZBHrGJKjyF_YsReWOiSmES_ycq2eATxIBD83Dl1Oq0wwsiu4j3znE1bpeqVwKZzbbaVh7FLk5HHeAio1lEFxE78" },
  { name: "Record", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCdisPQohsueTM7wV8dxnCWDb8zYto7P8bQDypZI31CAlRviYAUR6z4vUDDkubPUqINFUFzpjA4uLVrxqPCgNBXe_hn49dwJaqqka2pynvvEQXd0nq5My_p5dVWvCrd4-5PrsuFJX2EIgFiYGV_MYUp_lZU0KVEd993eA7g9rPz1LQhJLJ2o7qfm5dPB39_VNqvKfC3WdoDNaH41NVTvCbMC3S4c7NNX9zhrPzNDUAzo1Oz1fgnYqYeJfOSXw-aKMN2sT5OAkLim0" },
];

const FounderSection = () => {
  return (
    <section className="py-24 bg-[hsl(30,10%,7%)]/50">
      <div className="container mx-auto px-6">
        <h3 className="text-gold font-bold tracking-widest text-sm mb-12 uppercase">
          Conheça nosso fundador
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Photo */}
          <div className="relative group">
            <div className="aspect-[3/4] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                alt="Lucas Schweitzer"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDya_C15af_g1ddWLNngXlro3JXKlO1ZUtoK6JMYq5KiCnaRPY8pGWkkMfusMSrpCJ3WqhfhqCEyNLjl863i5Tcy4ShBK18V1Oa5ngIcTgAvk96ljGhBk73ceVfTV6xEuvrmNuWJ5V4fUQXs9qreQQO_Vgw6Vpm_urDgGhyljsHTpyqHFHBW0K6aM2sHk7X7o7njfv7m0wAsCR7bhG4Hy7L8LjHjhJ__MPzDiMGfb4kEXuU4GjRwmzRSUJv2bSAjbnU_vzW4sIh19c"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold p-4 rounded-lg">
              <Quote className="w-7 h-7 text-black" />
            </div>
          </div>

          {/* CENTER: Bio & Logos */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-3xl font-bold text-gold mb-6">Lucas Schweitzer</h4>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Fundador da LS Holdings, empreendedor e investidor focado em transformar o ecossistema de negócios através de liderança e inovação.
                </p>
                <p>
                  Especialista em expansão de negócios e gestão estratégica com foco em resultados exponenciais.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                Mídia & Reconhecimento
              </p>
              <div className="grid grid-cols-4 gap-4 opacity-40 grayscale contrast-125">
                {mediaLogos.map((logo) => (
                  <img key={logo.name} alt={logo.name} src={logo.src} className="w-full h-auto" />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Cards & Video */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-white tracking-tight">DOCUMENTÁRIO LS</h5>
                <ExternalLink className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <a
              href="https://lucaschweitzer.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group block"
            >
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-white tracking-tight">SITE LUCAS SCHWEITZER</h5>
                <ExternalLink className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <div className="relative mt-auto aspect-video rounded-xl overflow-hidden group cursor-pointer">
              <img
                alt="Business building"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRzCiKM2E1nUEVwP74KxD6CuiFkgMDYKGR7CJCTlBQIImEChHeE5PeV0O6397w-7IEFD7bUja00jOLL663GRT2k8ASddublMs_TNg6SqNTujsuYY01hNaZUudRQJ64W2FhVG04v1Hi_zezYYAOgxVgYEoszG7RDqQ7YSoaI7Kd7XGfJREDYBoXUt-p_Xji8ldR-XIrwK87O2gwYUZ-CJr86esmviGg-4yc0uE_ppOQ05PJvp7fvTZPwrGX-s299_eDsaA195MV2pE"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black mb-2">
                  <Play className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white tracking-[0.2em]">VÍDEO CNBC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
