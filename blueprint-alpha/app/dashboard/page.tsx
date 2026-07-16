"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import RequireAuth from "@/components/RequireAuth";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

export default function DashboardPage() {
  const [counts,setCounts] = useState({tasks:0,waiting:0,finance:0,uploads:0});
  const [tasks,setTasks] = useState<any[]>([]);
  const [waiting,setWaiting] = useState<any[]>([]);

  useEffect(() => {
    const s=createClient();
    Promise.all([
      s.from("tasks").select("*",{count:"exact",head:true}).neq("status","Completed"),
      s.from("waiting_items").select("*",{count:"exact",head:true}).neq("status","Resolved"),
      s.from("finance_items").select("*",{count:"exact",head:true}).neq("status","Paid"),
      s.from("uploads").select("*",{count:"exact",head:true}).eq("status","Needs Review"),
      s.from("tasks").select("*").neq("status","Completed").order("due_date",{ascending:true}).limit(5),
      s.from("waiting_items").select("*").neq("status","Resolved").order("follow_up_date",{ascending:true}).limit(5)
    ]).then(([a,b,c,d,e,f])=>{
      setCounts({tasks:a.count||0,waiting:b.count||0,finance:c.count||0,uploads:d.count||0});
      setTasks(e.data||[]); setWaiting(f.data||[]);
    });
  },[]);

  return <RequireAuth><AppShell>
    <div className="eyebrow">Mission Control</div>
    <h1>Good morning, Austen.</h1>
    <p className="lead">Review new requests, what needs to go out, meetings, follow-ups, and payments before you begin.</p>
    <div style={{marginTop:24}}>
      <Link href="/dashboard#start" className="button primary">Start my day</Link>
    </div>

    <section className="section">
      <div className="grid">
        <div className="card"><div className="metric">{counts.uploads}</div><div className="muted small">Uploads to review</div></div>
        <div className="card"><div className="metric">{counts.tasks}</div><div className="muted small">Open tasks</div></div>
        <div className="card"><div className="metric">{counts.waiting}</div><div className="muted small">Waiting on</div></div>
        <div className="card"><div className="metric">{counts.finance}</div><div className="muted small">Finance items open</div></div>
      </div>
    </section>

    <section id="start" className="section">
      <div className="section-title"><h2>Today</h2></div>
      <div className="grid-2">
        <div className="card">
          <div className="row"><h3>Priority work</h3><Link className="small muted" href="/tasks">View all</Link></div>
          <div className="list" style={{marginTop:18}}>
            {tasks.length ? tasks.map(t=><div className="item" key={t.id}>
              <div><div className="item-title">{t.title}</div><div className="meta">{t.next_action || "No next action entered"}</div></div>
              <span className={"badge "+(t.priority||"").toLowerCase()}>{t.priority}</span>
            </div>) : <div className="empty">No open tasks.</div>}
          </div>
        </div>
        <div className="card">
          <div className="row"><h3>Waiting on</h3><Link className="small muted" href="/waiting">View all</Link></div>
          <div className="list" style={{marginTop:18}}>
            {waiting.length ? waiting.map(w=><div className="item" key={w.id}>
              <div><div className="item-title">{w.title}</div><div className="meta">{w.counterparty || "No counterparty"} · Follow up {w.follow_up_date || "not set"}</div></div>
              <span className="badge">{w.status}</span>
            </div>) : <div className="empty">Nothing is currently waiting.</div>}
          </div>
        </div>
      </div>
    </section>
  </AppShell></RequireAuth>;
}
