"use client";
import { Chatroom } from "@/components/Chatroom";
import { Login } from "@/components/Login";
import { MemberList } from "@/components/MemberList";
import { MessageInput } from "@/components/MessageInput";
import { ServerList } from "@/components/ServerList";
import { Database } from "@/util/types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [auth, setAuth] = useState<{ user: User } | { user: null }>({
    user: null,
  });
  const supabase = createClientComponentClient<Database>();
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setAuth(data);
    };
    getUser();
  }, [supabase.auth]);
  console.log("user test", auth);

  if (!auth.user) return <Login />;

  return (
    <div>
      <ServerList />
      <MemberList />
      <Chatroom />
      <MessageInput />
    </div>
  );
};

export default Home;
