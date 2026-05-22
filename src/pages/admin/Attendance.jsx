import { useState, useEffect } from "react";
import { getAttendanceAPI, updateNoticeAPI } from "../../services/api";
import API from "../../services/api";

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

const badge = v => (
  <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
    background: v==="Present"?"var(--bg-badge-green)":v==="Late"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Present"?"var(--text-green)":v==="Late"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

export default function AdminAttendance() {
  const [data,     setData]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [selClass, setSelClass] = useState("");
  const [selDate,  setSelDate]  = useState("");
  const [editRow,  setEditRow]  = useState(null);
  const [msg,      setMsg]      = useState("");

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selClass) params.class = selClass;
      if (selDate)  params.date  = selDate;
      const res = await getAttendanceAPI(params);
      setData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAttendance(); }, [selClass, selDate]);

  const filtered = data.filter(a =>
    a.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.class?.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async () => {
    try {
      await API.put(`/attendance/${editRow._id}`, { status: editRow.status });
      setMsg("Updated ✅");
      setEditRow(null);
      fetchAttendance();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await API.delete(`/attendance/${id}`);
      setMsg("Deleted ✅");
      fetchAttendance();
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + err.message); }
  };

  const present = filtered.filter(a=>a.status==="Present").length;
  const absent  = filtered.filter(a=>a.status==="Absent").length;

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Attendance</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Attendance</p>
        </div>
        <button onClick={fetchAttendance}
          style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
          🔄 Refresh
        </button>
      </div>

      {msg && (
        <div style={{ background:msg.includes("Error")?"rgba(239,68,68,0.1)":"rgba(22,163,74,0.1)", border:`1px solid ${msg.includes("Error")?"rgba(239,68,68,0.2)":"rgba(22,163,74,0.2)"}`, borderRadius:10, padding:"10px 16px", marginBottom:16 }}>
          <p style={{ color:msg.includes("Error")?"#f87171":"#4ade80", fontSize:13, margin:0 }}>{msg}</p>
        </div>
      )}

      {/* Stats */}
      <div className="att-stats">
        {[
          { label:"Total",   value:filtered.length, color:"#4f46e5", icon:"📅" },
          { label:"Present", value:present,          color:"#16a34a", icon:"✅" },
          { label:"Absent",  value:absent,           color:"#dc2626", icon:"❌" },
          { label:"Rate",    value:filtered.length?`${Math.round(present/filtered.length*100)}%`:"0%", color:"#d97706", icon:"📊" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", flex:1, maxWidth:250 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search attendance..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)}
            style={{ padding:"9px 14px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}/>
          <select value={selClass} onChange={e=>setSelClass(e.target.value)}
            style={{ padding:"9px 14px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
            <option value="">All Classes</option>
            {["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"].map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>{filtered.length} of {data.length} entries</span>
        </div>

        {loading ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>No attendance records found.</p>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:560 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["#","Student","Class","Date","Status","Action"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a,i)=>(
                  <tr key={a._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                    <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{a.student?.name?.[0]||"?"}</div>
                        <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{a.student?.name||"N/A"}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{a.class}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{a.date}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(a.status)}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <button title="Edit" onClick={()=>setEditRow({...a})}
                        style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button title="Delete" onClick={()=>handleDelete(a._id)}
                        style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#ef4444";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.querySelector("svg").style.stroke="#ef4444";}}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editRow && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
          onClick={()=>setEditRow(null)}>
          <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:360, border:"1px solid var(--border)" }}
            onClick={e=>e.stopPropagation()}>
            <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>✏️ Edit Attendance</h3>
            <p style={{ color:"var(--text-primary)", fontWeight:600, marginBottom:16 }}>{editRow.student?.name} — {editRow.class}</p>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Status</label>
              <select value={editRow.status} onChange={e=>setEditRow({...editRow,status:e.target.value})} style={inp}>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
              </select>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>setEditRow(null)} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
              <button onClick={handleUpdate} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>Update</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .att-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .att-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}