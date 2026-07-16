"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import {
  LayoutDashboard, Upload, Building2, Users, CheckSquare,
  Clock3, DollarSign, History, Search, LogOut
} from "lucide-react";

const nav = [
  ["/dashboard","Today",LayoutDashboard],
  ["/upload","Upload",Upload],
  ["/company","Company",Building2],
  ["/relationships","Relationships",Users],
  ["/tasks","Tasks",CheckSquare],
  ["/waiting","Waiting On",Clock3],
  ["/finance","Finance",DollarSign],
  ["/timeline","Timeline",History],
  ["/search","Search",Search],
] as const;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/login");
  }

  return (
    <div className="shell">
      <header className="topbar">
        <Link href="/dashboard" className="brand">Blueprint</Link>
        <div className="top-actions">
          <Link href="/upload" className="button primary"><Upload size={16}/> Upload</Link>
          <button className="button ghost" onClick={signOut}><LogOut size={16}/></button>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <nav className="nav">
            {nav.map(([href,label,Icon]) => (
              <Link key={href} href={href} style={pathname===href ? {background:"#f0f1ee",color:"#1f2328"} : undefined}>
                <span style={{display:"inline-flex",gap:9,alignItems:"center"}}><Icon size={16}/>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
