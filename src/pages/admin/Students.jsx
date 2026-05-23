import { useState, useEffect } from "react";
import { getStudentsAPI, deleteStudentAPI, updateStudentAPI } from "../../services/api";

const ITEMS_PER_PAGE = 8;
const CLASSES = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];
const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

// Skeleton row
const SkeletonRow = () => (
  <tr>
    {[1,2,3,4,5,6,7].map(i=>(
      <td key={i} style={{ padding:"14px 14px" }}>
        <div style={{ height:13, background:"var(--border-input)", borderRadius:6, animation:"pulse 1.5s ease-in-out infinite" }}/>
      </td>
    ))}
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
  </tr>
);

export default function Students() {
  const [students,    setStudents]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal,   setShowModal]   = useState(false);
  const [editRow,     setEditRow]     = useState(null);
  const [form,        setForm]        = useState({});
  const [msg,         setMsg]         = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudentsAPI();
      setStudents(res.data); // ✅ Only approved students from DB
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const filtered   = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.class?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);

  const openEdit = (s) => {
    setForm({ name:s.name, class:s.class, email:s.email, phone:s.phone||"", rollNo:s.rollNo||"" });
    setEditRow(s._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await updateStudentAPI(editRow, form);
      setMsg("Student updated ✅");
      setShowModal(false);
      fetchStudents();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudentAPI(id);
      setMsg("Student deleted ✅");
      fetchStudents();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const badge = (status) => (
    <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
      background: status==="approved"?"var(--bg-badge-green)":status==="rejected"?"var(--bg-badge-red)":"var(--bg-badge-amber)",
      color:      status==="approved"?"var(--text-green)":status==="rejected"?"var(--text-red)":"var(--text-amber)" }}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Students</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Students</p>
        </div>
        <button onClick={fetchStudents}
          style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
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
            <input placeholder="Search student..." value={search}
              onChange={e=>{setSearch(e.target.value);setCurrentPage(1);}}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Total: {filtered.length}</span>
        </div>

        {/* Desktop Table */}
        <div className="std-table-wrap">
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:600 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["#","Name","Class","Email","Phone","Status","Action"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({length:5}).map((_,i)=><SkeletonRow key={i}/>)
                  : paginated.map((s,i)=>(
                  <tr key={s._id}
                    style={{ background:i%2===0?"var(--bg-card)":"var(--bg-input)", borderBottom:"1px solid var(--border)", transition:"background .15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                    <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{(currentPage-1)*ITEMS_PER_PAGE+i+1}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        {s.image
                          ? <img src={`${import.meta.env.VITE_API_URL||"http://localhost:5000"}${s.image}`} style={{ width:30, height:30, borderRadius:"50%", objectFit:"cover" }}/>
                          : <div style={{ width:30, height:30, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name?.[0]}</div>
                        }
                        <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.class}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.email}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.phone||"N/A"}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(s.user?.status)}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <button title="Edit" onClick={()=>openEdit(s)}
                        style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button title="Delete" onClick={()=>handleDelete(s._id)}
                        style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#ef4444";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.querySelector("svg").style.stroke="#ef4444";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && paginated.length===0 && (
                  <tr><td colSpan={7} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>No students found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="std-cards-wrap" style={{ display:"none", flexDirection:"column", gap:12 }}>
          {loading
            ? Array.from({length:3}).map((_,i)=>(
              <div key={i} style={{ background:"var(--bg-input)", borderRadius:12, padding:"14px 16px", border:"1px solid var(--border)", height:100, animation:"pulse 1.5s ease-in-out infinite" }}/>
            ))
            : paginated.map((s)=>(
            <div key={s._id} style={{ background:"var(--bg-input)", borderRadius:12, padding:"14px 16px", border:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>{s.name?.[0]}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>{s.name}</p>
                    <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{s.email}</p>
                  </div>
                </div>
                {badge(s.user?.status)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                {[{label:"Class",val:s.class},{label:"Phone",val:s.phone||"N/A"}].map(d=>(
                  <div key={d.label} style={{ background:"var(--bg-card)", borderRadius:8, padding:"8px 10px", border:"1px solid var(--border)" }}>
                    <p style={{ fontSize:10, color:"var(--text-muted)", fontWeight:600, margin:"0 0 2px", textTransform:"uppercase" }}>{d.label}</p>
                    <p style={{ fontSize:13, color:"var(--text-primary)", margin:0 }}>{d.val}</p>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>openEdit(s)} style={{ flex:1, padding:"8px", background:"#eef2ff", border:"1px solid #c7d2fe", borderRadius:8, color:"#4f46e5", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>✏️ Edit</button>
                <button onClick={()=>handleDelete(s._id)} style={{ flex:1, padding:"8px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, color:"#dc2626", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:18, fontSize:13, color:"var(--text-muted)", flexWrap:"wrap", gap:10 }}>
            <span>Showing {(currentPage-1)*ITEMS_PER_PAGE+1}–{Math.min(currentPage*ITEMS_PER_PAGE,filtered.length)} of {filtered.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={()=>setCurrentPage(Math.max(1,currentPage-1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>‹</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setCurrentPage(p)} style={{ width:30,height:30,border:"none",borderRadius:7,cursor:"pointer",fontWeight:600,fontSize:13, background:p===currentPage?"#4f46e5":"var(--bg-input)", color:p===currentPage?"#fff":"var(--text-secondary)" }}>{p}</button>
              ))}
              <button onClick={()=>setCurrentPage(Math.min(totalPages,currentPage+1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
          onClick={()=>setShowModal(false)}>
          <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:420, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>✏️ Edit Student</h3>
              <button onClick={()=>setShowModal(false)} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            </div>
            {[{key:"name",label:"Full Name"},{key:"email",label:"Email",type:"email"},{key:"phone",label:"Phone"},{key:"rollNo",label:"Roll No"}].map(f=>(
              <div key={f.key} style={{ marginBottom:13 }}>
                <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                <input type={f.type||"text"} value={form[f.key]||""} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Class</label>
              <select value={form.class||""} onChange={e=>setForm({...form,class:e.target.value})} style={inp}>
                {CLASSES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>setShowModal(false)} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>Update</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .std-table-wrap { display:block; }
        .std-cards-wrap { display:none !important; }
        @media(max-width:768px){
          .std-table-wrap { display:none !important; }
          .std-cards-wrap { display:flex !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}