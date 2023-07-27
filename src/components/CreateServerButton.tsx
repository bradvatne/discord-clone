"use client";
import React, { FormEvent, useState } from "react";
import { DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types";
import { FormSubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useBoundStore } from "@/lib/store";

export const CreateServerButton = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const session = useBoundStore((state) => state.session);
  const [loading, setLoading] = useState(false);

  const createServer = async (e: FormEvent) => {
    console.log("started");
    console.log(text.length);
    console.log(session);
    e.preventDefault();
    if (text.length < 1 || !session) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("servers")
        .insert({ owner_id: session.user.id!, server_name: text });
      if (error) throw new Error(error.message);
      setLoading(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-full w-[50px] h-[50px] bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-medium hover:cursor-pointer">
          +
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Harmony server</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4 pt-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="Name of your server"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              onClick={(e) => createServer(e)}
            >
              Deploy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
