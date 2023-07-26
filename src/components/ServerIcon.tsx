"use client";
import { useBoundStore } from "@/lib/store";
import React from "react";

type ServerIconProps = {
  server_id: number;
  servers: {
    created_at: string;
    owner_id: string;
    server_id: number;
    server_name: string;
    updated_at: string;
  } | null;
};

export const ServerIcon = ({ server }: { server: ServerIconProps }) => {
  const setCurrentServer = useBoundStore((state) => state.setCurrentServer);
  const serverData: {
    created_at: string;
    owner_id: string;
    server_id: number;
    server_name: string;
    updated_at: string;
  } | null = server.servers;
  return (
    <button
      className="rounded-full w-[50px] h-[50px] bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-medium"
      onClick={() => setCurrentServer(serverData)}
    >
      {server.servers?.server_name.charAt(0)}
    </button>
  );
};
