import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ServerList } from "@/components/ServerList";
import { ChannelsList } from "@/components/ChannelsList";
import { Database } from "@/lib/types";
import { Chatroom } from "@/components/Chatroom";
import { MemberList } from "@/components/MemberList";

export const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const servers = await supabase.from("servers").select();
  const { data: channels } = await supabase.from("channels").select();

  if (!user) redirect("/login");
  return (
    <div className="flex w-full h-full">
      <ServerList />
      <ChannelsList channels={channels!} />
      <Chatroom />
      <MemberList />
    </div>
  );
};

export default Home;
