"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChannelsTable, Database } from "@/lib/types";
import { useBoundStore } from "@/lib/store";

export const ExporeServersButton = () => {
  const setCurrentChannel = useBoundStore((state) => state.setCurrentChannel);
  const channel: ChannelsTable = {
    channel_id: -1,
    channel_name: "Explore Channels",
    created_at: new Date().toDateString(),
    server_id: -1,
    updated_at: new Date().toDateString(),
  };
  return (
    <div
      className="rounded-full w-[50px] h-[50px] bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-medium hover:cursor-pointer"
      onClick={() => setCurrentChannel(channel)}
    >
      -
    </div>
  );
};
