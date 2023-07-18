"use client";

import { useBoundStore } from "@/lib/store";
import { Database } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactNode, useEffect } from "react";
import { Login } from "./Login";

export const Providers = ({ children }: { children: ReactNode }) => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useBoundStore((state) => [
    state.session,
    state.setSession,
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) return <Login />;
  return <>{children}</>;
};
