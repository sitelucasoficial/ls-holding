import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ALL_CMS_KEYS = [["site_config"], ["founder"], ["founder_media"], ["companies"], ["footer"]];

function useInvalidateAll() {
  const qc = useQueryClient();
  return () => {
    ALL_CMS_KEYS.forEach((key) => qc.invalidateQueries({ queryKey: key }));
  };
}

// ---- Site Config (key-value) ----
export function useSiteConfig() {
  return useQuery({
    queryKey: ["site_config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_config").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((row: any) => { map[row.key] = row.value; });
      return map;
    },
  });
}

export function useUpdateSiteConfig() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (updates: Record<string, string>) => {
      for (const [key, value] of Object.entries(updates)) {
        const { error } = await supabase
          .from("site_config")
          .upsert(
            { key, value, updated_at: new Date().toISOString() },
            { onConflict: "key" }
          );
        if (error) throw error;
      }
    },
    onSuccess: invalidateAll,
  });
}

// ---- Founder ----
export function useFounder() {
  return useQuery({
    queryKey: ["founder"],
    queryFn: async () => {
      const { data, error } = await supabase.from("founder").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateFounder() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (updates: any) => {
      const { data: existing } = await supabase.from("founder").select("id").limit(1).single();
      if (existing) {
        const { error } = await supabase.from("founder").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", existing.id);
        if (error) throw error;
      }
    },
    onSuccess: invalidateAll,
  });
}

// ---- Companies ----
export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("companies").select("*").order("display_order");
      if (error) throw error;
      return data || [];
    },
  });
}

export function useUpdateCompany() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase.from("companies").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

export function useCreateCompany() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (company: any) => {
      const { error } = await supabase.from("companies").insert(company);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

export function useDeleteCompany() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("companies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

// ---- Footer ----
export function useFooter() {
  return useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const { data, error } = await supabase.from("footer").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateFooter() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (updates: any) => {
      const { data: existing } = await supabase.from("footer").select("id").limit(1).single();
      if (existing) {
        const { error } = await supabase.from("footer").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", existing.id);
        if (error) throw error;
      }
    },
    onSuccess: invalidateAll,
  });
}

// ---- Founder Media ----
export function useFounderMedia() {
  return useQuery({
    queryKey: ["founder_media"],
    queryFn: async () => {
      const { data, error } = await supabase.from("founder_media").select("*").order("display_order");
      if (error) throw error;
      return data || [];
    },
  });
}

export function useCreateFounderMedia() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (item: any) => {
      const { error } = await supabase.from("founder_media").insert(item);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

export function useUpdateFounderMedia() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase.from("founder_media").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

export function useDeleteFounderMedia() {
  const invalidateAll = useInvalidateAll();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("founder_media").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidateAll,
  });
}

// ---- Image Upload ----
export async function uploadImage(file: File, path: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const filePath = `${path}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("site-assets").upload(filePath, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);
  return data.publicUrl;
}
