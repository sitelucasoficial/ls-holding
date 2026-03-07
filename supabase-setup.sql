-- =============================================
-- EXECUTE THIS SQL IN YOUR SUPABASE SQL EDITOR
-- =============================================

-- 1. Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can read
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'site-assets');

-- Storage RLS: authenticated users can upload
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'site-assets');

-- 2. site_config table (key-value for header & hero)
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_config" ON public.site_config
FOR SELECT USING (true);

CREATE POLICY "Auth manage site_config" ON public.site_config
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed default values
INSERT INTO public.site_config (key, value) VALUES
  ('header_logo_url', ''),
  ('header_subtitle', 'PARTICIPAÇÕES & INVESTIMENTOS'),
  ('hero_headline', 'Impactar, potencializar e transformar a vida de pessoas e empresas.'),
  ('hero_highlight_word', 'transformar'),
  ('hero_description', 'Estratégias sólidas para o crescimento de negócios exponenciais. Fomentando o empreendedorismo com propósito.'),
  ('hero_cta_label', 'CONHEÇA NOSSAS EMPRESAS'),
  ('hero_cta_link', '#empresas')
ON CONFLICT (key) DO NOTHING;

-- 3. founder table
CREATE TABLE IF NOT EXISTS public.founder (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Lucas Schweitzer',
  photo_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  media_logos JSONB DEFAULT '[]'::jsonb,
  doc_label TEXT DEFAULT 'DOCUMENTÁRIO LS',
  doc_url TEXT DEFAULT '',
  site_label TEXT DEFAULT 'SITE LUCAS SCHWEITZER',
  site_url TEXT DEFAULT 'https://lucaschweitzer.com.br/',
  video_thumbnail_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  video_label TEXT DEFAULT 'VÍDEO CNBC',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.founder ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read founder" ON public.founder
FOR SELECT USING (true);

CREATE POLICY "Auth manage founder" ON public.founder
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed founder
INSERT INTO public.founder (name, bio, media_logos) VALUES (
  'Lucas Schweitzer',
  'Fundador do Grupo LS, empreendedor serial e investidor focado em transformar o ecossistema de negócios através de liderança e inovação. Criador do Empreende Brazil — a maior imersão em empreendedorismo da América Latina — e mentor com programa de 90 dias para empresários.

Já foi destaque em veículos como Forbes, Exame, SBT News, NSC Total e ND Mais. Suas imersões unem estratégia, networking e vivências práticas de transformação empreendedora.',
  '[{"name":"Forbes","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuAZGXiXkB5HtMFKHePF2CB4gUebGnPKcEYY1jnxSYn2KOqLmAumptZS5jf5rQCP50Wa2BQ0wMOxrmBWkZLwvVLi-ykIKcFyRihp_1nag-bZuhDx28WUL-5Q_rwfQyaUakVdSB8zWBuKg2LKkCnqW9BiMP93pX9TCavdP969LcvWixvg4Y3taRqeUMYBCppaJBGvGpiP8K29J4F9Qm9z0mJUQFYMcsbodcsQGxw74tR7IjRhpJ9McSTVPF5G4foKI5Qtfn0yjb07yxU"},{"name":"Fortune","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuCKrfMt6keLqy6I9uaMMJsBsZySxcgwC3Empwb8qyMi9YbQlpxgXfzR4azBUktV3lxlH1rq1hZAp0rwjC-vpc5DadGkIXXRd4cX0CsA0gzKl6CyjlfqlVrDqEIkSy25gMosLSBjrkgum-VDt3O1i67lOJ_w6WbX3-Cups4G1NvddNNiPpd43bKHjoojr_UDCd35rvfB0QPU5DiY3rFQoWGVYqiJdZ1KoF--C0IxJcWa60TU8xiAteAHKbWntbKwQwivaGpgd94uQtY"},{"name":"Inc","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuC2RSv2-Cuvag4BPyJ0cN2gqJbNGRfXw27QBIE9mgW7lusUFVFv9XzZk1nCxvYmgEk_sWyRLJWMq4tYwgUm8xJWu-4fl9wbB6SvkY4JqRKYEnW731VRaEoMTVgKq6ojUq9enw7GlMnSGahJF1kBq7CYEknS6xifU2k8Uy6HJB352J3dFbJZpRzYo6A0_tuU385T1m_w6IgE-vHZv5MZOiUWadngGNA9UzZMgit3NFRaxHhQMKO_2xkBoPGn7CsmEXP0KOBcd1Bn_7g"},{"name":"CNBC","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuAmRWvkNB3HqNPgEIuEX8SFFoTZ2WxONXrcDYX1pV-7eusjSOZGrJ1KUXpDaStqDP9muVd8e0gtwkvgimQFyhixo0qjbwbMEAExT5KDWd_q4Gpg8TIlECZwWU3uGiil5-W_cYZDDuDvnPbYtx9vbUiWvYbpDV9EDo7K_UWofACwUyjja_BLRYzTX9FQND92lLK-wKwcng0yizohWXz_LcIOr8gVT5ZX8Aj8jRPUWUG3eELFazyCnMKI11wv4WnlFUBeHxuWhRLsKfo"},{"name":"G1","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuA-P-DTvpnnLaLEdQh6BgO0pD6fueZqMBY6GFr14Tkcah5K9PABiJ3wiTuVtsqB5_lefCkroaM7D3QGIVpNfQ9jkEe70o6ueFmahXDgXmtzQF8EO-h2cL-78_zv5uLclbcWuqDXMH8Ah9fRd4uEo8_6XIiDDprTbncqGj0OZV-6H5kzbrTCuhRFYOp0DTZYwh5GNRWoukbq_Slwq70VBhlrzChiOnlqfv59eGtJs3jKvdhMXr0Jwz0OXnM4Le8-C97RGKpNXO325ZA"},{"name":"Exame","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuBrO0bNnUvsvaHgbQo_0KfqYFa4i4olmW6JPNp0W10dAmABHetY7lQ7UBhjcNd-f-Kihf8wI7t3OK2Uv18HmqNFHuZzWmzsSxxaluJo5RCtPFfJMqcCeoNqm2PiTMnTItRr0mkNn33W4B5h4QZnSCvNpn9ozXDbxOFT4Hh4oARg7RWVTneRuD9524j1V3hbqghf9HAge-547GMbLM7Ug_nXkolg4UQdrWRLbn_AcjvyujPz3fKHyCKpL1tiHIro2Su2DPKcc68QF88"},{"name":"SBT","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuAxXRiTHH4UtFG8QCoxNlFlFAqGF4P1WkTZk1C2j8-c5H7Kha6H_Y0hup8HIT6_RG-QraKF6iGtd53fcUtKhYoIj0VxOuXlpTb2Q4hbeQUv_b0DG9uZhZvSj18_mCRuxzltCVC0-R9j6gif5U3_NE4GUi_jw8qnEzTkvtmFHKMQBYg0xv-CTwGHZBHrGJKjyF_YsReWOiSmES_ycq2eATxIBD83Dl1Oq0wwsiu4j3znE1bpeqVwKZzbbaVh7FLk5HHeAio1lEFxE78"},{"name":"Record","src":"https://lh3.googleusercontent.com/aida-public/AB6AXuCCdisPQohsueTM7wV8dxnCWDb8zYto7P8bQDypZI31CAlRviYAUR6z4vUDDkubPUqINFUFzpjA4uLVrxqPCgNBXe_hn49dwJaqqka2pynvvEQXd0nq5My_p5dVWvCrd4-5PrsuFJX2EIgFiYGV_MYUp_lZU0KVEd993eA7g9rPz1LQhJLJ2o7qfm5dPB39_VNqvKfC3WdoDNaH41NVTvCbMC3S4c7NNX9zhrPzNDUAzo1Oz1fgnYqYeJfOSXw-aKMN2sT5OAkLim0"}]'::jsonb
);

-- 4. companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  badge_label TEXT DEFAULT '',
  badge_color TEXT DEFAULT '#16a34a',
  description TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  button_label TEXT DEFAULT 'VEJA MAIS',
  button_url TEXT DEFAULT '#',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read companies" ON public.companies
FOR SELECT USING (true);

CREATE POLICY "Auth manage companies" ON public.companies
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed companies
INSERT INTO public.companies (name, badge_label, badge_color, description, logo_url, button_url, display_order) VALUES
  ('EMPREENDE BRAZIL', 'ECOSSISTEMA', '#16a34a', 'O maior ecossistema do empreendedor brasileiro. Reúne conferências, clube de membros, mentorias e uma comunidade de alto impacto.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi_hPVNLBU3uDS3CN8IzqUyjPajss7Fr5lhsSbxqSYFLKJmCixsm5L4v3SSoI3AHKfWQf_ChGLFT4hmO9SWD4pej8jbjKgkVSwVg2zNkL_DBN6D4pKw85Wyf2RsI_cLNoSmIpPQMPt0hsPAB2EuGP4ZDKjwoDL1DJKCNoavHaJ14fVTJNLxrRfW_6FZlZK3aqRKCSVAznjHSNZHoP2A3HqT9D73Q2CkqkKVuEj11CTBXdg-b_y37XLHA3RzRHXGvFiyYiQfLnAG_M', 'https://empreendebrazil.com.br/', 0),
  ('EMPREENDE BRAZIL CLUB', 'COMUNIDADE', '#16a34a', 'Um grupo seleto de empreendedores, líderes, executivos e profissionais de alta performance.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_bVkqGkoqUxFN3q2wyYhWx5G5xofYHVaqVK1wjt2P2etaFhIIJf9Sp6OkilTDE7YsfTr8sPgi_XOUYS3ttDY5716KuWi4jCRlWh-MIhNSOVg3CpLSgSjD44ar_C659GlxSlgdvQeemD6kcuc7e54vW_LFAv12_NDKPPudkGuPfiBIGhz2YA34ClXE3jpuM5BKZUwvDVSKs6n4mhFPc42zNWqt-_zPsS9903AHltnBgW7055FOlrXn1aFuwpyKlscc0h1YcBEIjeo', 'https://empreendebrazil.com.br/ebclub/', 1),
  ('LUSCH GARDEN', 'EXPERIÊNCIA', '#047857', 'Situada em Florianópolis, a LUSCH Garden oferece 5.000m² de exuberante área verde à beira-mar.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM8rFAKRfX7ghqCjxNOeATO3wDNzYtr6hV7xFTTZr2QB7P5dNxP6ryvjgmhzN30c2fb7fhJsbRHTfbHOJWQTi-xsC-wnKYB5ZyCDWq0tKbFEUjK27BYHX0-BMiwjlzWN0A6UFjtAgwI_7IPHR4uzb7RPsADEd1wSJjvDwlMg5FXafJ1v5LetEBvRnmvSd6igg_oE42M_kEqQTXplQ5au9-k_Lht8n1SyZcT4jAD2F8TCeVSB63lu_rH1MeA7QRzBWLlqDT-6bi9RI', 'https://luschgarden.com.br/', 2),
  ('LUSCH AGÊNCIA', 'MARKETING', '#1e3a5f', 'Agência de eventos 360°, especializada em live marketing e organização de eventos.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQQl0Z3easX_bc309BDX1e_ZIeydMIzZHHSmxdS-AmPkL9ArnwJzdKs3nuAJBSAKi3EZy9i1wDFBqAJNZSV5usiwdMycRyMqewENRNAhcHVLR80d7YhsncrhpJS86CcCv9NzcMIMwTPJaqPpsnHY-h1Jwrxtql91RbnpJwWecnIiS8Yp1rFAgU55XqD7Uy1s6MRa8vn5i3itvwibxWybHjftCmBAFRe4Sv0PjjySYX7bNgdC9DOpKGP6KvOyAsv4p0Z8-wPYO7uD8', 'https://luschagencia.com.br/', 3);

-- 5. footer table
CREATE TABLE IF NOT EXISTS public.footer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  phone1 TEXT DEFAULT '+55 (48) 99662-4084',
  phone2 TEXT DEFAULT '(48) 3030-7322',
  email TEXT DEFAULT 'atendimento@lsholdings.com.br',
  address TEXT DEFAULT 'Rua Raimundo Bridon, 223, Itaguaçu, Florianópolis - SC, CEP: 88085-370',
  instagram_handle TEXT DEFAULT '@ls.holding',
  instagram_url TEXT DEFAULT 'https://instagram.com/ls.holding',
  work_button_label TEXT DEFAULT 'TRABALHE CONOSCO',
  work_button_url TEXT DEFAULT 'https://forms.monday.com/forms/0b7c6651a7ffcc5da61f9fa588b1fbd8?r=use1',
  copyright TEXT DEFAULT '© 2025 LS Holdings. Todos os direitos reservados.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.footer ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read footer" ON public.footer
FOR SELECT USING (true);

CREATE POLICY "Auth manage footer" ON public.footer
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed footer
INSERT INTO public.footer (email) VALUES ('atendimento@lsholdings.com.br');
