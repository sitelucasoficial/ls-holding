import { useState, useEffect } from "react";
import { useCompanies, useUpdateCompany, useCreateCompany, useDeleteCompany } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, GripVertical } from "lucide-react";

interface CompanyForm {
  id?: string;
  name: string;
  badge_label: string;
  badge_color: string;
  description: string;
  logo_url: string;
  video_url: string;
  button_label: string;
  button_url: string;
  display_order: number;
}

const emptyCompany: CompanyForm = {
  name: "", badge_label: "", badge_color: "#16a34a", description: "",
  logo_url: "", video_url: "", button_label: "VEJA MAIS", button_url: "", display_order: 0,
};

const AdminCompaniesEditor = () => {
  const { data: companies, isLoading } = useCompanies();
  const updateMutation = useUpdateCompany();
  const createMutation = useCreateCompany();
  const deleteMutation = useDeleteCompany();
  const [forms, setForms] = useState<CompanyForm[]>([]);
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    if (companies) {
      setForms(companies.map((c: any) => ({
        id: c.id, name: c.name, badge_label: c.badge_label, badge_color: c.badge_color,
        description: c.description, logo_url: c.logo_url, video_url: c.video_url,
        button_label: c.button_label, button_url: c.button_url, display_order: c.display_order,
      })));
    }
  }, [companies]);

  const updateField = (idx: number, field: string, value: string | number) => {
    setForms(prev => prev.map((f, i) => i === idx ? { ...f, [field]: value } : f));
  };

  const handleSave = (idx: number) => {
    const form = forms[idx];
    if (form.id) {
      updateMutation.mutate(form, { onSuccess: () => toast.success(`${form.name} salvo!`) });
    } else {
      createMutation.mutate(form, { onSuccess: () => toast.success(`${form.name} criado!`) });
    }
  };

  const handleDelete = (idx: number) => {
    const form = forms[idx];
    if (form.id && confirm(`Excluir ${form.name}?`)) {
      deleteMutation.mutate(form.id, { onSuccess: () => toast.success("Empresa excluída!") });
    }
  };

  const handleAdd = () => {
    setForms(prev => [...prev, { ...emptyCompany, display_order: prev.length }]);
    setEditing(forms.length);
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Empresas</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <div className="space-y-4">
        {forms.map((form, idx) => (
          <div key={form.id || idx} className="border border-border rounded-xl overflow-hidden bg-card">
            <button
              onClick={() => setEditing(editing === idx ? null : idx)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold text-foreground">{form.name || "Nova Empresa"}</span>
                {form.badge_label && (
                  <span className="text-[10px] px-2 py-0.5 rounded text-white font-bold" style={{ backgroundColor: form.badge_color }}>
                    {form.badge_label}
                  </span>
                )}
              </div>
            </button>

            {editing === idx && (
              <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Nome</label>
                    <input value={form.name} onChange={(e) => updateField(idx, "name", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Ordem</label>
                    <input type="number" value={form.display_order} onChange={(e) => updateField(idx, "display_order", parseInt(e.target.value))} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Badge Label</label>
                    <input value={form.badge_label} onChange={(e) => updateField(idx, "badge_label", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Cor do Badge</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.badge_color} onChange={(e) => updateField(idx, "badge_color", e.target.value)} className="w-12 h-12 rounded cursor-pointer border-0" />
                      <input value={form.badge_color} onChange={(e) => updateField(idx, "badge_color", e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
                  <textarea value={form.description} onChange={(e) => updateField(idx, "description", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none" />
                </div>
                <ImageUpload currentUrl={form.logo_url} onUpload={(url) => updateField(idx, "logo_url", url)} folder="companies" label="Imagem de fundo" />
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">URL do vídeo</label>
                  <input value={form.video_url} onChange={(e) => updateField(idx, "video_url", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Texto do botão</label>
                    <input value={form.button_label} onChange={(e) => updateField(idx, "button_label", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Link do botão</label>
                    <input value={form.button_url} onChange={(e) => updateField(idx, "button_url", e.target.value)} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleSave(idx)} disabled={updateMutation.isPending || createMutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                    {(updateMutation.isPending || createMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar
                  </button>
                  {form.id && (
                    <button onClick={() => handleDelete(idx)} className="flex items-center gap-2 px-6 py-3 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors font-bold">
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompaniesEditor;
