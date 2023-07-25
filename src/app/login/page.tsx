"use client";
import { LoginCard } from "@/components/LoginCard";
import { RegistrationCard } from "@/components/RegistrationCard";
import { useBoundStore } from "@/lib/store";
import React, { ReactNode, useState } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
};

export const Login = () => {
  const [view, setView] = useState<"LOGIN" | "REGISTER">("LOGIN");
  return view === "LOGIN" ? (
    <Container>
      <LoginCard />
    </Container>
  ) : (
    <Container>
      <RegistrationCard />
    </Container>
  );
};

export default Login;
