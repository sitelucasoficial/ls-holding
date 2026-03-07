import { useState, useEffect } from "react";
import { useSiteConfig, useUpdateSiteConfig } from "@/hooks/useCmsData";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const AdminHeroEditor = () => {
  const { data: config, isLoading } = useSiteConfig();
  const mutation = useUpdateSiteConfig();
  const [headline, setHeadline] = useState("");
  const [highlightWord, setHighlightWord] = useState("");
  const [description, setDescription] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaLink, setCtaLink] = useState("");

  useEffect(() => {
    if (config) {
      setHeadline(config.hero_headline || "");
      setHighlightWord(config.hero_highlight_word || "");
      setDescription(config.hero_description || "");
      setCtaLabel(config.hero_cta_label || "");
      setCtaLink(config.hero_cta_link || "");
    }
  }, [config]);

  const handleSave = () => {
    mutation.mutate(
      { hero_headline: headline, hero_highlight_word: highlightWord, hero_description: description, hero_cta_label: ctaLabel, hero_cta_link: ctaLink },
      { onSuccess: () => toast.success("Hero salvo com sucesso!") }
    );
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Hero</h2>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Título principal</label>
        <textarea value={headline} onChange={(e) => setHeadline(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Palavra em destaque (gold)</label>
        <input value={highlightWord} onChange={(e) => setHighlightWord(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Texto do botão CTA</label>
          <input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Link do CTA</label>
          <input value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <button onClick={handleSave} disabled={mutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar
      </button>
    </div>
  );
};

export default AdminHeroEditor;
