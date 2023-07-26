import { Session, User } from "@supabase/auth-helpers-nextjs";
import { StateCreator } from "zustand";
import { ChannelsTable } from "../types";

export type ChannelSlice = {
  currentChannel: ChannelsTable | null;
  setCurrentChannel: (channel: ChannelsTable | null) => void;
};

export const createAuthSlice: StateCreator<ChannelSlice> = (set) => ({
  currentChannel: null,
  setCurrentChannel: (channel: ChannelsTable | null) =>
    set(() => ({ currentChannel: channel })),
});
