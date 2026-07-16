"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import RequireAuth from "@/components/RequireAuth";
import { createClient } from "@/lib/supabase-browser";

export default function UploadPage() {
  const [note,setNote]=useState("");
  const [title,setTitle]=useState("");
  const [message,setMessage]=useState("");

  async function save(e:React.FormEvent){
    e.preventDefault();
    const {error}=await createClient().from("uploads").insert({
      title:title || "Untitled capture",
      raw_text:note,
      upload_type:"Note / pasted text",
      status:"Needs Review"
    });
    setMessage(error?error.message:"Saved to the Blueprint inbox.");
    if(!error){setTitle("");setNote("");}
  }

  return <RequireAuth><AppShell>
    <div className="eyebrow">Universal Upload</div>
    <h1>Upload anything.</h1>
    <p className="lead">Save first. Organize second. Paste an email, meeting note, document request, promise, invoice detail, or anything you do not want missed.</p>
    <section className="section">
      <div className="upload-zone">
        <h2 style={{marginBottom:10}}>Drop files here</h2>
        <div className="muted">File storage will be enabled after the first deployment. Text capture works immediately.</div>
      </div>
    </section>
    <section className="section">
      <form className="card form" onSubmit={save}>
        <div className="field"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Morgan Stanley appraisal request"/></div>
        <div className="field"><label>Paste or write anything</label><textarea value={note} onChange={e=>setNote(e.target.value)} required placeholder="Paste an email, call note, meeting note, invoice, or reminder…"/></div>
        {message && <div className="small muted">{message}</div>}
        <button className="button primary" type="submit">Save to inbox</button>
      </form>
    </section>
  </AppShell></RequireAuth>;
}
