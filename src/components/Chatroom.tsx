"use client";
import { useBoundStore } from "@/lib/store";
import { Database, MessagesTable } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";

export const Chatroom = () => {
  const [messages, setMessages] = useState<MessagesTable[]>([]);
  const supabase = createClientComponentClient<Database>();
  const currentChannel = useBoundStore(
    (state) => state.currentChannel?.channel_id
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select()
          .eq("channel_id", currentChannel ?? 0);
        if (error) {
          throw new Error(error.message);
        }

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${currentChannel ?? 0}`,
        },
        (payload) =>
          setMessages((state) => [...state, payload.new as MessagesTable])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentChannel, supabase]);

  return (
    <div className="flex flex-col mx-8">
      {messages &&
        messages.map((item) => <div key={item.message_id}>{item.message}</div>)}
      <ChatInput />
    </div>
  );
};
