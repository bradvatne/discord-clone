import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { NavSlice, createNavSlice } from "./navSlice";

export const useBoundStore = create<AuthSlice & NavSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createNavSlice(...a),
}));
