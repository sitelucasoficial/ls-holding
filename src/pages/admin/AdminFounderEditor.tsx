import { useState, useEffect } from "react";
import { useFounder, useUpdateFounder, useFounderMedia, useCreateFounderMedia, useUpdateFounderMedia, useDeleteFounderMedia } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, Pencil, GripVertical, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const inputClass = "w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary";

const AdminFounderEditor = () => {
  const { data: founder, isLoading } = useFounder();
  const mutation = useUpdateFounder();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [docLabel, setDocLabel] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [siteLabel, setSiteLabel] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLabel, setVideoLabel] = useState("");

  useEffect(() => {
    if (founder) {
      setName(founder.name || "");
      setPhotoUrl(founder.photo_url || "");
      setBio(founder.bio || "");
      setDocLabel(founder.doc_label || "");
      setDocUrl(founder.doc_url || "");
      setSiteLabel(founder.site_label || "");
      setSiteUrl(founder.site_url || "");
      setVideoThumb(founder.video_thumbnail_url || "");
      setVideoUrl(founder.video_url || "");
      setVideoLabel(founder.video_label || "");
    }
  }, [founder]);

  const handleSave = () => {
    mutation.mutate(
      { name, photo_url: photoUrl, bio, doc_label: docLabel, doc_url: docUrl, site_label: siteLabel, site_url: siteUrl, video_thumbnail_url: videoThumb, video_url: videoUrl, video_label: videoLabel },
      { onSuccess: () => toast.success("Fundador salvo com sucesso!"), onError: (e: any) => toast.error("Erro: " + e.message) }
    );
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Fundador</h2>
      <ImageUpload currentUrl={photoUrl} onUpload={setPhotoUrl} folder="founder" label="Foto do Fundador" />
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Biografia</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={6} className={inputClass + " resize-none"} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label Documentário</label>
          <input value={docLabel} onChange={(e) => setDocLabel(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL Documentário</label>
          <input value={docUrl} onChange={(e) => setDocUrl(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label Site Pessoal</label>
          <input value={siteLabel} onChange={(e) => setSiteLabel(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL Site Pessoal</label>
          <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className={inputClass} />
        </div>
      </div>
      <ImageUpload currentUrl={videoThumb} onUpload={setVideoThumb} folder="founder" label="Thumbnail do Vídeo" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label do Vídeo</label>
          <input value={videoLabel} onChange={(e) => setVideoLabel(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL do Vídeo</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} />
        </div>
      </div>
      <button onClick={handleSave} disabled={mutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar Fundador
      </button>

      <hr className="border-border my-8" />

      <FounderMediaManager />
    </div>
  );
};

// ---- Media Manager Sub-component ----

interface MediaItem {
  id: string;
  image_url: string;
  external_link: string;
  label: string;
  display_order: number;
}

const FounderMediaManager = () => {
  const { data: mediaItems, isLoading, isError } = useFounderMedia();
  const createMutation = useCreateFounderMedia();
  const updateMutation = useUpdateFounderMedia();
  const deleteMutation = useDeleteFounderMedia();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formLabel, setFormLabel] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formOrder, setFormOrder] = useState(0);

  const resetForm = () => {
    setFormLabel("");
    setFormLink("");
    setFormImageUrl("");
    setFormOrder(0);
    setEditingId(null);
    setShowForm(false);
  };

  const openEdit = (item: MediaItem) => {
    setEditingId(item.id);
    setFormLabel(item.label || "");
    setFormLink(item.external_link || "");
    setFormImageUrl(item.image_url || "");
    setFormOrder(item.display_order || 0);
    setShowForm(true);
  };

  const handleSaveMedia = () => {
    const payload = { image_url: formImageUrl, external_link: formLink, label: formLabel, display_order: formOrder };
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...payload }, {
        onSuccess: () => { toast.success("Mídia atualizada!"); resetForm(); },
        onError: (e: any) => toast.error("Erro: " + e.message),
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { toast.success("Mídia adicionada!"); resetForm(); },
        onError: (e: any) => toast.error("Erro: " + e.message),
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Mídia removida!"),
      onError: (e: any) => toast.error("Erro: " + e.message),
    });
  };

  const moveItem = (items: MediaItem[], index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    updateMutation.mutate({ id: a.id, display_order: b.display_order });
    updateMutation.mutate({ id: b.id, display_order: a.display_order });
  };

  if (isLoading) return <Loader2 className="w-5 h-5 animate-spin text-primary" />;

  if (isError) {
    return (
      <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
        <p className="font-bold">Tabela "founder_media" não encontrada.</p>
        <p className="text-sm mt-1">Execute o SQL fornecido no Supabase para criar a tabela.</p>
      </div>
    );
  }

  const sorted = [...(mediaItems || [])].sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)) as MediaItem[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Mídia & Reconhecimento</h3>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
          <Plus className="w-4 h-4" /> Adicionar Mídia
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground">{editingId ? "Editar" : "Nova"} Mídia</h4>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <ImageUpload currentUrl={formImageUrl} onUpload={setFormImageUrl} folder="founder-media" label="Imagem / Logo" />
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Nome / Label</label>
            <input value={formLabel} onChange={(e) => setFormLabel(e.target.value)} className={inputClass} placeholder="Ex: Forbes" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Link externo</label>
            <input value={formLink} onChange={(e) => setFormLink(e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Ordem de exibição</label>
            <input type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))} className={inputClass + " w-32"} />
          </div>
          <button onClick={handleSaveMedia} disabled={createMutation.isPending || updateMutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
            {(createMutation.isPending || updateMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </button>
        </div>
      )}

      {/* Grid */}
      {sorted.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma mídia cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sorted.map((item, idx) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-border bg-card aspect-square flex items-center justify-center">
              {item.image_url ? (
                <img src={item.image_url} alt={item.label} className="w-full h-full object-cover" />
              ) : (
                <div className="text-muted-foreground text-xs">Sem imagem</div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <span className="text-white text-xs font-medium text-center px-2">{item.label}</span>
                <div className="flex gap-2">
                  <button onClick={() => moveItem(sorted, idx, -1)} disabled={idx === 0} className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"><GripVertical className="w-3.5 h-3.5" /></button>
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white"><Pencil className="w-3.5 h-3.5" /></button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-1.5 rounded bg-destructive/20 hover:bg-destructive/40 text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir "{item.label}"?</AlertDialogTitle>
                        <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Excluir</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFounderEditor;
