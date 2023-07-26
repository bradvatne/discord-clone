import React from "react";
import { ServerIcon } from "./ServerIcon";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types";

export const ServerList = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const cookiesStore = cookies();
  const token = cookiesStore.getAll().map((cook) => console.log(cook));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: servers } = await supabase
    .from("user_servers")
    .select("server_id, servers (*)")
    .eq("user_id", user?.id);

  return (
    <div className="w-[80px] h-full flex flex-col gap-2 p-2">
      {servers?.map((server, idx) => (
        <ServerIcon key={idx} server={server} />
      ))}
    </div>
  );
};
