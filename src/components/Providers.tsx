"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useBoundStore } from "@/lib/store";
import { Database } from "@/lib/types";

export function Providers({ children, ...props }: ThemeProviderProps) {
  const supabase = createClientComponentClient<Database>();
  const [setSession] = useBoundStore((state) => [state.setSession]);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, setSession]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
