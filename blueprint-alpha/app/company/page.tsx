"use client";

import { useEffect,useState } from "react";
import AppShell from "@/components/AppShell";
import RequireAuth from "@/components/RequireAuth";
import { createClient } from "@/lib/supabase-browser";

export default function CompanyPage(){
  const [functions,setFunctions]=useState<any[]>([]);
  const [platforms,setPlatforms]=useState<any[]>([]);
  useEffect(()=>{
    const s=createClient();
    s.from("company_functions").select("*").order("sort_order").then(r=>setFunctions(r.data||[]));
    s.from("platforms").select("*").order("name").then(r=>setPlatforms(r.data||[]));
  },[]);
  return <RequireAuth><AppShell>
    <div className="eyebrow">Company</div>
    <h1>1606 Corp.</h1>
    <p className="lead">The parent company owns infrastructure platforms and supports power, data center, and future digital infrastructure operating entities.</p>

    <section className="section">
      <div className="section-title"><h2>Corporate functions</h2></div>
      <div className="grid">
        {functions.map(x=><div className="card" key={x.id}><h3>{x.name}</h3><p className="meta">{x.description}</p><span className="badge active">{x.status}</span></div>)}
      </div>
    </section>
    <section className="section">
      <div className="section-title"><h2>Platforms</h2></div>
      {platforms.map(x=><div className="card" key={x.id}>
        <div className="row"><div><h2>{x.name}</h2><p className="meta">{x.description}</p></div><span className="badge active">{x.stage}</span></div>
        <div className="divider"/>
        <div className="grid">
          <div><div className="small muted">Shared asset</div><div>132 acres and infrastructure</div></div>
          <div><div className="small muted">Future entity</div><div>Power operating company</div></div>
          <div><div className="small muted">Future entity</div><div>Data center entity / JV</div></div>
        </div>
      </div>)}
    </section>
  </AppShell></RequireAuth>;
}
