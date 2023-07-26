"use client";
import React from "react";
import { ChannelsTable } from "@/lib/types";
import { useBoundStore } from "@/lib/store";

const ChannelItem = ({ channel }: { channel: ChannelsTable }) => {
  return <div>{channel.channel_name}</div>;
};

export const ChannelsList = ({
  channels,
}: {
  channels: ChannelsTable[] | [];
}) => {
  const currentServer = useBoundStore((state) => state.currentServer);
  return (
    <div>
      {channels
        .filter((channel) => channel.server_id === currentServer?.server_id)
        .map((channel) => (
          <ChannelItem key={channel.channel_id} channel={channel} />
        ))}
    </div>
  );
};