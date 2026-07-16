"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const router = useRouter();

  async function submit(e:React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const { error } = await createClient().auth.signInWithPassword({email,password});
    if (error) setMessage(error.message);
    else router.push("/dashboard");
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="eyebrow">1606 Corp.</div>
        <h2 style={{marginBottom:8}}>Blueprint</h2>
        <p className="muted" style={{marginTop:0}}>Your private company command center.</p>
        <div className="divider"/>
        <form className="form" onSubmit={submit}>
          <div className="field"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div className="field"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          {message && <div className="small" style={{color:"var(--danger)"}}>{message}</div>}
          <button className="button primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
