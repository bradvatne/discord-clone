import { Session, User } from "@supabase/auth-helpers-nextjs";
import { StateCreator } from "zustand";
import { ChannelsTable, ServersTable } from "../types";

//NavSlice contains the state of user's navigation through the UI
export type NavSlice = {
  currentChannel: ChannelsTable | null;
  currentServer: ServersTable | null;
  channelsList: ChannelsTable[] | null;
  setCurrentChannel: (channel: ChannelsTable | null) => void;
  setCurrentServer: (server: ServersTable | null) => void;
  setChannelsList: (channels: ChannelsTable[] | null) => void;
};

export const createNavSlice: StateCreator<NavSlice> = (set) => ({
  currentChannel: null,
  currentServer: null,
  channelsList: null,
  setChannelsList: (channels: ChannelsTable[] | null) =>
    set(() => ({ channelsList: channels })),
  setCurrentChannel: (channel: ChannelsTable | null) =>
    set(() => ({ currentChannel: channel })),
  setCurrentServer: (server: ServersTable | null) =>
    set(() => ({ currentServer: server })),
});
