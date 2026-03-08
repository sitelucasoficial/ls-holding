import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useRealtimeSubscription(tableName: string, queryKey: string[]) {
  const queryClient = useQueryClient();
  const stableKey = useMemo(() => queryKey, [queryKey.join(",")]);

  useEffect(() => {
    const channel = supabase
      .channel(`${tableName}-realtime`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableName },
        () => {
          queryClient.invalidateQueries({ queryKey: stableKey });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, queryClient, stableKey]);
}
