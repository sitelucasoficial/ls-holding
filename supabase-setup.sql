-- =============================================
-- EXECUTE THIS SQL IN YOUR SUPABASE SQL EDITOR
-- Garante bucket, tabelas e políticas para TODO o CMS
-- =============================================

-- 1. STORAGE BUCKET (para TODAS as imagens do CMS)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Limpa políticas antigas para recriar sem conflito
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated update" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Leitura pública de todos os assets
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'site-assets');

-- Upload por usuários autenticados
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');

-- Atualização por usuários autenticados
CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'site-assets');

-- Deleção por usuários autenticados
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'site-assets');

-- 2. site_config (header_logo_url, hero images, etc.)
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read site_config" ON public.site_config;
  DROP POLICY IF EXISTS "Auth manage site_config" ON public.site_config;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
CREATE POLICY "Public read site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Auth manage site_config" ON public.site_config FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_config (key, value) VALUES
  ('header_logo_url', ''),
  ('header_subtitle', 'PARTICIPAÇÕES & INVESTIMENTOS'),
  ('hero_headline', 'Impactar, potencializar e transformar a vida de pessoas e empresas.'),
  ('hero_highlight_word', 'transformar'),
  ('hero_description', 'Estratégias sólidas para o crescimento de negócios exponenciais. Fomentando o empreendedorismo com propósito.'),
  ('hero_cta_label', 'CONHEÇA NOSSAS EMPRESAS'),
  ('hero_cta_link', '#empresas')
ON CONFLICT (key) DO NOTHING;

-- 3. founder (foto do fundador, thumbnail do vídeo)
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
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read founder" ON public.founder;
  DROP POLICY IF EXISTS "Auth manage founder" ON public.founder;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
CREATE POLICY "Public read founder" ON public.founder FOR SELECT USING (true);
CREATE POLICY "Auth manage founder" ON public.founder FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. founder_media (imagens de mídia/reconhecimento)
CREATE TABLE IF NOT EXISTS public.founder_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT DEFAULT '',
  external_link TEXT DEFAULT '',
  label TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.founder_media ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read founder_media" ON public.founder_media;
  DROP POLICY IF EXISTS "Auth manage founder_media" ON public.founder_media;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
CREATE POLICY "Public read founder_media" ON public.founder_media FOR SELECT USING (true);
CREATE POLICY "Auth manage founder_media" ON public.founder_media FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. companies (logos e imagens de fundo das empresas)
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
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read companies" ON public.companies;
  DROP POLICY IF EXISTS "Auth manage companies" ON public.companies;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
CREATE POLICY "Public read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Auth manage companies" ON public.companies FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. footer (logo do footer)
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
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read footer" ON public.footer;
  DROP POLICY IF EXISTS "Auth manage footer" ON public.footer;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
CREATE POLICY "Public read footer" ON public.footer FOR SELECT USING (true);
CREATE POLICY "Auth manage footer" ON public.footer FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed footer se vazio
INSERT INTO public.footer (email)
SELECT 'atendimento@lsholdings.com.br'
WHERE NOT EXISTS (SELECT 1 FROM public.footer LIMIT 1);

-- Seed founder se vazio
INSERT INTO public.founder (name, bio)
SELECT 'Lucas Schweitzer', 'Fundador do Grupo LS'
WHERE NOT EXISTS (SELECT 1 FROM public.founder LIMIT 1);
