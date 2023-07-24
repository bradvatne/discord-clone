"use client";
import { useBoundStore } from "@/lib/store";
import React, { FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types";

const LoginForm = () => {
  const setLoginState = useBoundStore((state) => state.setLoginState);
  const supabase = createClientComponentClient<Database>();
  const loginFormSchema = z.object({
    email: z.string().email().min(5),
  });
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginState("LOADING");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        setLoginState("COMPLETE");
        return;
      }
    } catch (err) {
      console.log(err);
      setLoginState("LOGIN");
      return;
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email address</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>secure login with magic link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">login</Button>
      </form>
    </Form>
  );
};

export const Login = () => {
  const loginState = useBoundStore((state) => state.loginState);
  return (
    <div className="flex w-full h-full items-center justify-center">
      {loginState === "LOGIN" && <LoginForm />}
      {loginState === "LOADING" && <div>Please Wait</div>}
      {loginState === "COMPLETE" && <div>Login Complete... now SCRAM</div>}
    </div>
  );
};

export default Login;
