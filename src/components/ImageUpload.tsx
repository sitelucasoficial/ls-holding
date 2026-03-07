import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/hooks/useCmsData";
import { toast } from "sonner";

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  folder?: string;
  label?: string;
}

const ImageUpload = ({ currentUrl, onUpload, folder = "general", label = "Imagem" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido. Use JPG, PNG, SVG ou WEBP.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const url = await uploadImage(file, folder);
      onUpload(url);
      toast.success("Imagem enviada com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao enviar imagem: " + err.message);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="flex items-center gap-4">
        {displayUrl && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
            <img src={displayUrl} alt="preview" className="w-full h-full object-cover" />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Enviando..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.svg,.webp"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
