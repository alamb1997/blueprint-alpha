"use client";
import {useEffect,useState} from "react";import AppShell from "@/components/AppShell";import RequireAuth from "@/components/RequireAuth";import {createClient} from "@/lib/supabase-browser";
export default function TimelinePage(){
 const [rows,setRows]=useState<any[]>([]);
 useEffect(()=>{createClient().from("timeline_events").select("*").order("event_date",{ascending:false}).then(r=>setRows(r.data||[]))},[]);
 return <RequireAuth><AppShell><div className="eyebrow">Company memory</div><h1>Timeline.</h1><p className="lead">One chronological record of meaningful company activity.</p>
 <section className="section"><div className="card"><div className="list">{rows.length?rows.map(r=><div className="item" key={r.id}><div><div className="item-title">{r.title}</div><div className="meta">{r.description}</div></div><div className="small muted">{r.event_date}</div></div>):<div className="empty">No timeline events yet.</div>}</div></div></section>
 </AppShell></RequireAuth>
}
