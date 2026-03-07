import { useState, useEffect } from "react";
import { useFounder, useUpdateFounder } from "@/hooks/useCmsData";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

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
      { onSuccess: () => toast.success("Fundador salvo com sucesso!") }
    );
  };

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Fundador</h2>
      <ImageUpload currentUrl={photoUrl} onUpload={setPhotoUrl} folder="founder" label="Foto do Fundador" />
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Biografia</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label Documentário</label>
          <input value={docLabel} onChange={(e) => setDocLabel(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL Documentário</label>
          <input value={docUrl} onChange={(e) => setDocUrl(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label Site Pessoal</label>
          <input value={siteLabel} onChange={(e) => setSiteLabel(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL Site Pessoal</label>
          <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <ImageUpload currentUrl={videoThumb} onUpload={setVideoThumb} folder="founder" label="Thumbnail do Vídeo" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Label do Vídeo</label>
          <input value={videoLabel} onChange={(e) => setVideoLabel(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">URL do Vídeo</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <button onClick={handleSave} disabled={mutation.isPending} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar
      </button>
    </div>
  );
};

export default AdminFounderEditor;
