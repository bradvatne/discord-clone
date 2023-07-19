"use client";
import { useBoundStore } from "@/lib/store";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormSubmitHandler, useForm } from "react-hook-form";
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

export const RegisterForm = () => {
  const setLoginState = useBoundStore((state) => state.setLoginState);
  const supabase = createClientComponentClient<Database>();
  const loginFormSchema = z.object({
    email: z.string().email().min(5),
    username: z.string().min(4).max(20),
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
    const username = formData.get("username") as string;

    try {
      console.log("trying to find email", email);
      const { data } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();
      console.log();
      if (!data) {
        setLoginState("REGISTER");
        return;
      }
    } catch (err) {
      console.log(err);
      setLoginState("LOGIN");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            username: username,
          },
        },
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email address</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} autoComplete="off" />
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
