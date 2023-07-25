"use client";

import { useBoundStore } from "@/lib/store";
import { Database } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Providers = () => {
  const supabase = createClientComponentClient<Database>();
  const [setSession] = useBoundStore((state) => [state.setSession]);

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
  }, [supabase.auth, setSession]);

  return <></>;
};
