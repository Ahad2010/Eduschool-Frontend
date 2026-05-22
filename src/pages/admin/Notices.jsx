import { useState, useEffect } from "react";
import { getAllNoticesAPI, addNoticeAPI, updateNoticeAPI, deleteNoticeAPI } from "../../services/api";

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="Published"?"var(--bg-badge-green)":"var(--bg-badge-amber)",
    color:      v==="Published"?"var(--text-green)":"var(--text-amber)" }}>{v}</span>
);

export default function Notices() {
  const [data,     setData]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [showModal,setShowModal]= useState(false);
  const [editId,   setEditId]   = useState(null);
  const [msg,      setMsg]      = useState("");
  const [form,     setForm]     = useState({ title:"", category:"General", audience:"All", status:"Published" });

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getAllNoticesAPI();
      setData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const filtered = data.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ title:"", category:"General", audience:"All", status:"Published" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (n) => {
    setForm({ title:n.title, category:n.category, audience:n.audience, status:n.status });
    setEditId(n._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title) return;
    try {
      if (editId) await updateNoticeAPI(editId, form);
      else await addNoticeAPI(form);
      setMsg(editId ? "Notice updated ✅" : "Notice added ✅");
      setShowModal(false);
      fetch();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await deleteNoticeAPI(id);
      setMsg("Notice deleted ✅");
      fetch();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Notices</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Notices</p>
        </div>
        <button onClick={openAdd} style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
          ➕ Add Notice
        </button>
      </div>

      {msg && (
        <div style={{ background:msg.includes("Error")?"rgba(239,68,68,0.1)":"rgba(22,163,74,0.1)", border:`1px solid ${msg.includes("Error")?"rgba(239,68,68,0.2)":"rgba(22,163,74,0.2)"}`, borderRadius:10, padding:"10px 16px", marginBottom:16 }}>
          <p style={{ color:msg.includes("Error")?"#f87171":"#4ade80", fontSize:13, margin:0 }}>{msg}</p>
        </div>
      )}

      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", flex:1, maxWidth:280 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search notices..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Total: {filtered.length}</span>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:48 }}><p style={{ color:"var(--text-muted)" }}>Loading...</p></div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:560 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["#","Title","Category","Audience","Status","Date","Action"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((n,i)=>(
                  <tr key={n._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                    <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                    <td style={{ padding:"12px 14px", fontWeight:600, color:"var(--text-primary)", maxWidth:200 }}>{n.title}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{n.category}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{n.audience}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(n.status)}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{new Date(n.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <button title="Edit" onClick={()=>openEdit(n)}
                        style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button title="Delete" onClick={()=>handleDelete(n._id)}
                        style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#ef4444";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.querySelector("svg").style.stroke="#ef4444";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && (
                  <tr><td colSpan={7} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>No notices found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
          onClick={()=>setShowModal(false)}>
          <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:440, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{editId?"✏️ Edit Notice":"➕ Add Notice"}</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            </div>
            <div style={{ marginBottom:13 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Title</label>
              <input placeholder="Notice title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
            </div>
            {[
              { key:"category", label:"Category", opts:["Holiday","Event","Meeting","Exam","Fees","General"] },
              { key:"audience", label:"Audience",  opts:["All","Students","Teachers","Parents"] },
              { key:"status",   label:"Status",    opts:["Published","Draft"] },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:13 }}>
                <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                <select value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}>
                  {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:18 }}>
              <button onClick={()=>setShowModal(false)} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}