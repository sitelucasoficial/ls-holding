import { useState, useEffect } from "react";
import { useFooter, useUpdateFooter } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const AdminFooterEditor = () => {
  const { data: footer, isLoading } = useFooter();
  const mutation = useUpdateFooter();
  const [form, setForm] = useState({
    logo_url: "", tagline: "", phone1: "", phone2: "", email: "",
    address: "", instagram_handle: "", instagram_url: "",
    work_button_label: "", work_button_url: "", copyright: "",
  });

  useEffect(() => {
    if (footer) {
      setForm({
        logo_url: footer.logo_url || "",
        tagline: footer.tagline || "",
        phone1: footer.phone1 || "",
        phone2: footer.phone2 || "",
        email: footer.email || "",
        address: footer.address || "",
        instagram_handle: footer.instagram_handle || "",
        instagram_url: footer.instagram_url || "",
        work_button_label: footer.work_button_label || "",
        work_button_url: footer.work_button_url || "",
        copyright: footer.copyright || "",
      });
    }
  }, [footer]);

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    mutation.mutate(form, { onSuccess: () => toast.success("Footer salvo com sucesso!") });
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  const fields = [
    { key: "phone1", label: "Telefone 1" },
    { key: "phone2", label: "Telefone 2" },
    { key: "email", label: "Email" },
    { key: "instagram_handle", label: "Instagram Handle" },
    { key: "instagram_url", label: "Instagram URL" },
    { key: "work_button_label", label: "Texto botão Trabalhe Conosco" },
    { key: "work_button_url", label: "URL botão Trabalhe Conosco" },
    { key: "copyright", label: "Copyright" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Footer</h2>
      <ImageUpload currentUrl={form.logo_url} onUpload={(url) => updateField("logo_url", url)} folder="footer" label="Logo do Footer" />
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Tagline</label>
        <input value={form.tagline} onChange={(e) => updateField("tagline", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Endereço completo</label>
        <textarea value={form.address} onChange={(e) => updateField("address", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{f.label}</label>
            <input value={(form as any)[f.key]} onChange={(e) => updateField(f.key, e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={mutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar
      </button>
    </div>
  );
};

export default AdminFooterEditor;
