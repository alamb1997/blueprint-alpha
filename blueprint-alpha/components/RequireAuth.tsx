"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [ready,setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({data}) => {
      if (!data.session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  if (!ready) return <div className="login-wrap"><div className="muted">Opening Blueprint…</div></div>;
  return <>{children}</>;
}
