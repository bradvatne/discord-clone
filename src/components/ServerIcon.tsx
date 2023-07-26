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
  return (
    <div className="rounded-full w-[50px] h-[50px] bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-medium">
      {server.servers?.server_name.charAt(0)}
    </div>
  );
};
