import React from "react";
import { ServerIcon } from "./ServerIcon";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/types";
import { CreateServerButton } from "./CreateServerButton";
export const revalidate = 0;
export const ServerList = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: servers } = await supabase
    .from("user_servers")
    .select("server_id, servers (*)")
    .eq("user_id", user?.id);

  return (
    <div className="w-[80px] h-full flex flex-col  p-2 justify-between">
      <div className="flex-col flex gap-2">
        {servers?.map((server, idx) => (
          <ServerIcon key={idx} server={server} />
        ))}
      </div>
      <CreateServerButton />
    </div>
  );
};
