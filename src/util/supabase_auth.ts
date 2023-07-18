import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
  supabaseUrl: "https://rmjvztpdjztlqepykizl.supabase.co",
});
