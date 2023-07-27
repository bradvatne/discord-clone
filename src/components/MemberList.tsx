"use client";
import { useBoundStore } from "@/lib/store";
import { Database, UsersTable } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export const MemberList = () => {
  const [users, setUsers] = useState<UsersTable[]>([]);
  const supabase = createClientComponentClient<Database>();
  const currentServer = useBoundStore(
    (state) => state.currentServer?.server_id
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("user_servers")
          .select("*, users (*)")
          .eq("server_id", currentServer ?? 0);
        if (error) {
          throw new Error(error.message);
        }
        if (data) {
          const users = data.map((item) => item.users) as UsersTable[];
          setUsers(users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    const subscription = supabase
      .channel("user_servers")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_servers",
          filter: `server_id=eq.${currentServer ?? 0}`,
        },
        (payload) => setUsers((state) => [...state, payload.new as UsersTable])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentServer, supabase]);
  return (
    <div className="flex flex-col">
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};
