import { useState, useEffect } from "react";
import { useSiteConfig, useUpdateSiteConfig } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const AdminHeaderEditor = () => {
  const { data: config, isLoading } = useSiteConfig();
  const mutation = useUpdateSiteConfig();
  const [logoUrl, setLogoUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (config) {
      setLogoUrl(config.header_logo_url || "");
      setSubtitle(config.header_subtitle || "");
    }
  }, [config]);

  const handleSave = () => {
    mutation.mutate(
      { header_logo_url: logoUrl, header_subtitle: subtitle },
      { onSuccess: () => toast.success("Header salvo com sucesso!") }
    );
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Header</h2>
      <ImageUpload currentUrl={logoUrl} onUpload={setLogoUrl} folder="header" label="Logo LS Holdings" />
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Subtítulo</label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button onClick={handleSave} disabled={mutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar
      </button>
    </div>
  );
};

export default AdminHeaderEditor;
