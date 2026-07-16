"use client";
import {useEffect,useState} from "react";
import AppShell from "@/components/AppShell";
import RequireAuth from "@/components/RequireAuth";
import {createClient} from "@/lib/supabase-browser";

export default function RelationshipsPage(){
 const [rows,setRows]=useState<any[]>([]),[name,setName]=useState(""),[type,setType]=useState("Lender / Investor");
 async function load(){const r=await createClient().from("relationships").select("*").order("name");setRows(r.data||[])}
 useEffect(()=>{load()},[]);
 async function add(e:React.FormEvent){e.preventDefault();await createClient().from("relationships").insert({name,relationship_type:type,status:"Active"});setName("");load()}
 return <RequireAuth><AppShell>
  <div className="eyebrow">Relationships</div><h1>Organizations and people.</h1><p className="lead">Relationships are company-wide and can connect to multiple platforms, initiatives, documents, and meetings.</p>
  <section className="section"><form className="card form" onSubmit={add}>
   <div className="grid-2"><div className="field"><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required/></div>
   <div className="field"><label>Type</label><select value={type} onChange={e=>setType(e.target.value)}><option>Lender / Investor</option><option>Seller</option><option>Data Center</option><option>JV / Partner</option><option>Legal</option><option>Engineering</option><option>Vendor</option><option>Other</option></select></div></div>
   <button className="button primary">Add relationship</button></form></section>
  <section className="section"><div className="card"><table className="table"><thead><tr><th>Name</th><th>Type</th><th>Status</th><th>Last contact</th></tr></thead><tbody>
   {rows.map(r=><tr key={r.id}><td>{r.name}</td><td>{r.relationship_type}</td><td><span className="badge active">{r.status}</span></td><td>{r.last_contact || "—"}</td></tr>)}
  </tbody></table></div></section>
 </AppShell></RequireAuth>
}
