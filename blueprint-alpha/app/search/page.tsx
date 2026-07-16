"use client";
import {useState} from "react";import AppShell from "@/components/AppShell";import RequireAuth from "@/components/RequireAuth";import {createClient} from "@/lib/supabase-browser";
export default function SearchPage(){
 const [q,setQ]=useState(""),[results,setResults]=useState<any[]>([]);
 async function search(e:React.FormEvent){e.preventDefault();const s=createClient();const [a,b,c,d]=await Promise.all([
  s.from("relationships").select("id,name,relationship_type").ilike("name",`%${q}%`),
  s.from("tasks").select("id,title,priority").ilike("title",`%${q}%`),
  s.from("waiting_items").select("id,title,counterparty").ilike("title",`%${q}%`),
  s.from("uploads").select("id,title,status").ilike("title",`%${q}%`)
 ]);setResults([...(a.data||[]).map(x=>({...x,kind:"Relationship",label:x.name})),...(b.data||[]).map(x=>({...x,kind:"Task",label:x.title})),...(c.data||[]).map(x=>({...x,kind:"Waiting On",label:x.title})),...(d.data||[]).map(x=>({...x,kind:"Upload",label:x.title}))])}
 return <RequireAuth><AppShell><div className="eyebrow">Search</div><h1>Find anything.</h1><p className="lead">Search across relationships, tasks, waiting items, and captured uploads.</p>
 <section className="section"><form className="row" onSubmit={search}><input style={{flex:1,padding:14,border:"1px solid var(--line)",borderRadius:12}} value={q} onChange={e=>setQ(e.target.value)} placeholder="Morgan Stanley appraisal"/><button className="button primary">Search</button></form></section>
 <section className="section"><div className="card"><div className="list">{results.length?results.map((r,i)=><div className="item" key={r.id+i}><div><div className="item-title">{r.label}</div><div className="meta">{r.kind}</div></div><span className="badge">{r.kind}</span></div>):<div className="empty">Search results will appear here.</div>}</div></div></section>
 </AppShell></RequireAuth>
}
