"use client";
import {useEffect,useState} from "react";
import AppShell from "@/components/AppShell";import RequireAuth from "@/components/RequireAuth";import {createClient} from "@/lib/supabase-browser";
export default function TasksPage(){
 const [rows,setRows]=useState<any[]>([]),[title,setTitle]=useState(""),[priority,setPriority]=useState("High"),[due,setDue]=useState("");
 async function load(){const r=await createClient().from("tasks").select("*").order("due_date");setRows(r.data||[])} useEffect(()=>{load()},[]);
 async function add(e:React.FormEvent){e.preventDefault();await createClient().from("tasks").insert({title,priority,status:"Not Started",due_date:due||null});setTitle("");setDue("");load()}
 async function status(id:string,status:string){await createClient().from("tasks").update({status}).eq("id",id);load()}
 return <RequireAuth><AppShell><div className="eyebrow">Work</div><h1>Tasks.</h1><p className="lead">Everything 1606 needs to complete, with a clear owner, next action, and due date.</p>
 <section className="section"><form className="card form" onSubmit={add}><div className="grid">
 <div className="field"><label>Task</label><input value={title} onChange={e=>setTitle(e.target.value)} required/></div>
 <div className="field"><label>Priority</label><select value={priority} onChange={e=>setPriority(e.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
 <div className="field"><label>Due date</label><input type="date" value={due} onChange={e=>setDue(e.target.value)}/></div></div><button className="button primary">Add task</button></form></section>
 <section className="section"><div className="card"><table className="table"><thead><tr><th>Task</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.title}<div className="meta">{r.next_action}</div></td><td><span className={"badge "+r.priority.toLowerCase()}>{r.priority}</span></td><td>{r.due_date||"—"}</td><td><select value={r.status} onChange={e=>status(r.id,e.target.value)}><option>Not Started</option><option>In Progress</option><option>Waiting</option><option>Needs Review</option><option>Completed</option></select></td></tr>)}</tbody></table></div></section>
 </AppShell></RequireAuth>
}
