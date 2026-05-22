import { useState, useEffect } from "react";
import { getTeachersAPI, updateTeacherAPI, deleteStudentAPI } from "../../services/api";
import API from "../../services/api";

const SUBJECTS = ["Mathematics","Physics","Chemistry","English","Urdu","Biology","Computer","Islamiat"];
const STATUSES = ["active","on_leave","inactive"];
const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="active"?"var(--bg-badge-green)":v==="on_leave"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="active"?"var(--text-green)"    :v==="on_leave"?"var(--text-amber)"    :"var(--text-red)" }}>
    {v==="on_leave"?"On Leave":v?.charAt(0).toUpperCase()+v?.slice(1)}
  </span>
);

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [editRow,  setEditRow]  = useState(null);
  const [form,     setForm]     = useState({});
  const [msg,      setMsg]      = useState("");

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await getTeachersAPI();
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const filtered = teachers.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (t) => {
    setForm({ name:t.name, email:t.email, phone:t.phone||"", subject:t.subject||"", qualification:t.qualification||"", status:t.status||"active" });
    setEditRow(t._id);
  };

  const handleSave = async () => {
    try {
      await updateTeacherAPI(editRow, form);
      setMsg("Teacher updated ✅");
      setEditRow(null);
      fetchTeachers();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Failed"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    try {
      await API.delete(`/teachers/${id}`);
      setMsg("Teacher deleted ✅");
      fetchTeachers();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Failed"));
    }
  };

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Teachers</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Teachers</p>
        </div>
        <button onClick={fetchTeachers} style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
          🔄 Refresh
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
            <input placeholder="Search teacher..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Total: {filtered.length}</span>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:48 }}>
            <p style={{ color:"var(--text-muted)" }}>Loading teachers...</p>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:600 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["#","Name","Subject","Email","Phone","Status","Action"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t,i)=>(
                  <tr key={t._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                    <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        {t.image
                          ? <img src={`http://localhost:5000${t.image}`} style={{ width:30, height:30, borderRadius:"50%", objectFit:"cover" }}/>
                          : <div style={{ width:30, height:30, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#4f46e5" }}>{t.name?.[0]}</div>
                        }
                        <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{t.subject||"N/A"}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{t.email}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{t.phone||"N/A"}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(t.status)}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <button title="Edit" onClick={()=>openEdit(t)}
                        style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button title="Delete" onClick={()=>handleDelete(t._id)}
                        style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#ef4444";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.querySelector("svg").style.stroke="#ef4444";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && (
                  <tr><td colSpan={7} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>No teachers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editRow && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
          onClick={()=>setEditRow(null)}>
          <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:420, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>✏️ Edit Teacher</h3>
              <button onClick={()=>setEditRow(null)} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            </div>
            {[
              { key:"name",          label:"Full Name"      },
              { key:"email",         label:"Email", type:"email" },
              { key:"phone",         label:"Phone"          },
              { key:"qualification", label:"Qualification"  },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:13 }}>
                <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                <input type={f.type||"text"} value={form[f.key]||""} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
              </div>
            ))}
            <div style={{ marginBottom:13 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Subject</label>
              <select value={form.subject||""} onChange={e=>setForm({...form,subject:e.target.value})} style={inp}>
                <option value="">Select Subject</option>
                {SUBJECTS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Status</label>
              <select value={form.status||"active"} onChange={e=>setForm({...form,status:e.target.value})} style={inp}>
                {STATUSES.map(s=><option key={s} value={s}>{s==="on_leave"?"On Leave":s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>setEditRow(null)} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}