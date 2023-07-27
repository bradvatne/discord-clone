"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types";
import { useBoundStore } from "@/lib/store";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const supabase = createClientComponentClient<Database>();
  const channel_id = useBoundStore((state) => state.currentChannel?.channel_id);
  const sendMessage = async () => {
    try {
      const user_id = (await supabase.auth.getUser()).data.user?.id;
      if (!user_id || !channel_id) throw new Error("Error finding user id");
      const newMessage = {
        channel_id,
        user_id,
        message,
      };
      const { error } = await supabase.from("messages").insert(newMessage);
      if (error) throw new Error(error.message);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage();
  };
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2">
        <Input
          type="text"
          placeholder="enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">send</Button>
      </form>
    </div>
  );
};
