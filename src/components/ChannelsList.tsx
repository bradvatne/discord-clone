"use client";
import React from "react";
import { ChannelsTable } from "@/lib/types";
import { useBoundStore } from "@/lib/store";

const ChannelItem = ({ channel }: { channel: ChannelsTable }) => {
  const setCurrentChannel = useBoundStore((state) => state.setCurrentChannel);
  return (
    <button onClick={() => setCurrentChannel(channel)} className="text-left">
      {channel.channel_name}
    </button>
  );
};

export const ChannelsList = ({
  channels,
}: {
  channels: ChannelsTable[] | [];
}) => {
  const currentServer = useBoundStore((state) => state.currentServer);
  return (
    <div className="flex flex-col gap-2 w-[100px]">
      {channels
        .filter((channel) => channel.server_id === currentServer?.server_id)
        .map((channel) => (
          <ChannelItem key={channel.channel_id} channel={channel} />
        ))}
    </div>
  );
};
