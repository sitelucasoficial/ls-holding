import { useState, useEffect } from "react";
import { useCompanies, useUpdateCompany, useCreateCompany, useDeleteCompany } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  show_play_icon: boolean;
}

const emptyCompany: CompanyForm = {
  name: "",
  badge_label: "",
  badge_color: "#16a34a",
  description: "",
  logo_url: "",
  video_url: "",
  button_label: "VEJA MAIS",
  button_url: "",
  display_order: 0,
};

const AdminCompaniesEditor = () => {
  const { data: companies, isLoading, isError, error, refetch } = useCompanies();
  const updateMutation = useUpdateCompany();
  const createMutation = useCreateCompany();
  const deleteMutation = useDeleteCompany();
  const [forms, setForms] = useState<CompanyForm[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ idx: number; name: string } | null>(null);

  useEffect(() => {
    if (companies && companies.length > 0) {
      setForms(
        companies.map((c: any) => ({
          id: c.id,
          name: c.name || "",
          badge_label: c.badge_label || "",
          badge_color: c.badge_color || "#16a34a",
          description: c.description || "",
          logo_url: c.logo_url || "",
          video_url: c.video_url || "",
          button_label: c.button_label || "VEJA MAIS",
          button_url: c.button_url || "",
          display_order: c.display_order ?? 0,
        }))
      );
    }
  }, [companies]);

  const updateField = (idx: number, field: keyof CompanyForm, value: string | number) => {
    setForms((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
  };

  const handleSave = async (idx: number) => {
    const form = forms[idx];
    try {
      if (form.id) {
        await updateMutation.mutateAsync(form);
        toast.success(`"${form.name}" salvo com sucesso!`);
      } else {
        const { id, ...rest } = form;
        await createMutation.mutateAsync(rest);
        toast.success(`"${form.name}" criado com sucesso!`);
      }
    } catch (err: any) {
      toast.error(`Erro ao salvar: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const form = forms[deleteTarget.idx];
    if (!form.id) {
      setForms((prev) => prev.filter((_, i) => i !== deleteTarget.idx));
      setDeleteTarget(null);
      return;
    }
    try {
      await deleteMutation.mutateAsync(form.id);
      toast.success(`"${form.name}" excluída!`);
      setExpandedIdx(null);
    } catch (err: any) {
      toast.error(`Erro ao excluir: ${err.message}`);
    }
    setDeleteTarget(null);
  };

  const handleAdd = () => {
    const newOrder = forms.length;
    setForms((prev) => [...prev, { ...emptyCompany, display_order: newOrder }]);
    setExpandedIdx(forms.length);
  };

  const moveCompany = async (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= forms.length) return;

    const newForms = [...forms];
    const temp = newForms[idx];
    newForms[idx] = newForms[targetIdx];
    newForms[targetIdx] = temp;

    // Update display_order
    newForms.forEach((f, i) => (f.display_order = i));
    setForms(newForms);

    // Save both reordered items
    try {
      if (newForms[idx].id) {
        await updateMutation.mutateAsync({ ...newForms[idx], display_order: idx });
      }
      if (newForms[targetIdx].id) {
        await updateMutation.mutateAsync({ ...newForms[targetIdx], display_order: targetIdx });
      }
      toast.success("Ordem atualizada!");
    } catch (err: any) {
      toast.error("Erro ao reordenar: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Carregando empresas...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-destructive font-medium">Erro ao carregar empresas</p>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          {(error as any)?.message || "Verifique se a tabela 'companies' existe no Supabase e se o SQL de setup foi executado."}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Empresas</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {forms.length} empresa{forms.length !== 1 ? "s" : ""} cadastrada{forms.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      {forms.length === 0 && (
        <div className="border border-dashed border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-4">Nenhuma empresa cadastrada ainda.</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Adicionar primeira empresa
          </button>
        </div>
      )}

      <div className="space-y-4">
        {forms.map((form, idx) => (
          <div key={form.id || `new-${idx}`} className="border border-border rounded-xl overflow-hidden bg-card">
            {/* Header */}
            <div className="flex items-center">
              {/* Reorder buttons */}
              <div className="flex flex-col border-r border-border">
                <button
                  onClick={() => moveCompany(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 hover:bg-muted/50 disabled:opacity-20 text-muted-foreground"
                  title="Mover para cima"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveCompany(idx, "down")}
                  disabled={idx === forms.length - 1}
                  className="p-2 hover:bg-muted/50 disabled:opacity-20 text-muted-foreground"
                  title="Mover para baixo"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="flex-1 flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  {form.logo_url && (
                    <img src={form.logo_url} alt="" className="w-10 h-10 rounded object-cover border border-border" />
                  )}
                  <span className="font-bold text-foreground">{form.name || "Nova Empresa"}</span>
                  {form.badge_label && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded text-white font-bold uppercase tracking-wider"
                      style={{ backgroundColor: form.badge_color }}
                    >
                      {form.badge_label}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${expandedIdx === idx ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Expanded editor */}
            {expandedIdx === idx && (
              <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
                {/* Name & Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Nome da empresa</label>
                    <input
                      value={form.name}
                      onChange={(e) => updateField(idx, "name", e.target.value)}
                      placeholder="Ex: EMPREENDE BRAZIL"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Ordem de exibição</label>
                    <input
                      type="number"
                      value={form.display_order}
                      onChange={(e) => updateField(idx, "display_order", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Badge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Badge (etiqueta)</label>
                    <input
                      value={form.badge_label}
                      onChange={(e) => updateField(idx, "badge_label", e.target.value)}
                      placeholder="Ex: ECOSSISTEMA"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Cor do badge</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={form.badge_color}
                        onChange={(e) => updateField(idx, "badge_color", e.target.value)}
                        className="w-12 h-12 rounded cursor-pointer border border-border bg-transparent"
                      />
                      <input
                        value={form.badge_color}
                        onChange={(e) => updateField(idx, "badge_color", e.target.value)}
                        placeholder="#16a34a"
                        className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      />
                      <div
                        className="px-3 py-1 rounded text-white text-[10px] font-bold tracking-wider"
                        style={{ backgroundColor: form.badge_color }}
                      >
                        {form.badge_label || "PREVIEW"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField(idx, "description", e.target.value)}
                    placeholder="Descreva a empresa..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Image upload */}
                <ImageUpload
                  currentUrl={form.logo_url}
                  onUpload={(url) => updateField(idx, "logo_url", url)}
                  folder="companies"
                  label="Imagem de fundo / Logo"
                />

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">URL do vídeo de fundo</label>
                  <input
                    value={form.video_url}
                    onChange={(e) => updateField(idx, "video_url", e.target.value)}
                    placeholder="https://exemplo.com/video.mp4"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  {form.video_url && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-border">
                      <video src={form.video_url} className="w-full max-h-40 object-cover" muted />
                    </div>
                  )}
                </div>

                {/* Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Texto do botão</label>
                    <input
                      value={form.button_label}
                      onChange={(e) => updateField(idx, "button_label", e.target.value)}
                      placeholder="VEJA MAIS"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Link do botão</label>
                    <input
                      value={form.button_url}
                      onChange={(e) => updateField(idx, "button_url", e.target.value)}
                      placeholder="https://exemplo.com"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleSave(idx)}
                    disabled={updateMutation.isPending || createMutation.isPending}
                    className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {updateMutation.isPending || createMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Salvar
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ idx, name: form.name || "Nova Empresa" })}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors font-bold"
                  >
                    <Trash2 className="w-4 h-4" /> Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir empresa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deleteTarget?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCompaniesEditor;
