import { Session, User } from "@supabase/auth-helpers-nextjs";
import { StateCreator } from "zustand";

export type AuthSlice = {
  user: User | null;
  session: Session | null;
  loginState: "LOGIN" | "REGISTER" | "LOADING" | "COMPLETE";
  setUser: (user: User) => void;
  setSession: (session: Session | null) => void;
  setLoginState: (state: "LOGIN" | "REGISTER" | "LOADING" | "COMPLETE") => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  session: null,
  loginState: "LOGIN",
  setUser: (user: User) => set(() => ({ user: user })),
  setSession: (session: Session | null) => set(() => ({ session: session })),
  setLoginState: (state: "LOGIN" | "REGISTER" | "LOADING" | "COMPLETE") =>
    set(() => ({ loginState: state })),
});
