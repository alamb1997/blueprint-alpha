"use client";
import {useEffect,useState} from "react";import AppShell from "@/components/AppShell";import RequireAuth from "@/components/RequireAuth";import {createClient} from "@/lib/supabase-browser";
export default function WaitingPage(){
 const [rows,setRows]=useState<any[]>([]),[title,setTitle]=useState(""),[party,setParty]=useState(""),[follow,setFollow]=useState("");
 async function load(){const r=await createClient().from("waiting_items").select("*").order("follow_up_date");setRows(r.data||[])} useEffect(()=>{load()},[]);
 async function add(e:React.FormEvent){e.preventDefault();await createClient().from("waiting_items").insert({title,counterparty:party,follow_up_date:follow||null,status:"Open"});setTitle("");setParty("");setFollow("");load()}
 return <RequireAuth><AppShell><div className="eyebrow">Follow-up</div><h1>Waiting on.</h1><p className="lead">Everything another person or organization owes 1606.</p>
 <section className="section"><form className="card form" onSubmit={add}><div className="grid"><div className="field"><label>Item</label><input value={title} onChange={e=>setTitle(e.target.value)} required/></div><div className="field"><label>Counterparty</label><input value={party} onChange={e=>setParty(e.target.value)}/></div><div className="field"><label>Follow-up date</label><input type="date" value={follow} onChange={e=>setFollow(e.target.value)}/></div></div><button className="button primary">Add item</button></form></section>
 <section className="section"><div className="card"><table className="table"><thead><tr><th>Item</th><th>Counterparty</th><th>Follow-up</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.title}<div className="meta">{r.impact}</div></td><td>{r.counterparty||"—"}</td><td>{r.follow_up_date||"—"}</td><td><span className="badge">{r.status}</span></td></tr>)}</tbody></table></div></section>
 </AppShell></RequireAuth>
}
