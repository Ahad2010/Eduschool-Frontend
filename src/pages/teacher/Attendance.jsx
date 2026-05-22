import { useState, useEffect } from "react";
import { getStudentsAPI, markAttendanceAPI, getAttendanceAPI } from "../../services/api";

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

export default function TeacherAttendance() {
  const [students,  setStudents]  = useState([]);
  const [attendance,setAttendance]= useState({}); // { studentId: "Present"/"Absent" }
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [msg,       setMsg]       = useState("");
  const [selClass,  setSelClass]  = useState("");
  const [date,      setDate]      = useState(new Date().toISOString().split("T")[0]);
  const [classes,   setClasses]   = useState([]);

  // ✅ Fetch all students from DB
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudentsAPI();
        setStudents(res.data);
        // Get unique classes
        const uniqueClasses = [...new Set(res.data.map(s => s.class).filter(Boolean))];
        setClasses(uniqueClasses);
        if (uniqueClasses.length > 0) setSelClass(uniqueClasses[0]);
        // Default all Present
        const att = {};
        res.data.forEach(s => att[s._id] = "Present");
        setAttendance(att);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => s.class === selClass);

  const toggle = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present"
    }));
  };

  const setStatus = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  // ✅ Mark All Present
  const markAllPresent = () => {
    const att = { ...attendance };
    filteredStudents.forEach(s => att[s._id] = "Present");
    setAttendance(att);
  };

  // ✅ Save attendance to DB
  const handleSave = async () => {
    setSaving(true);
    try {
      const records = filteredStudents.map(s => ({
        studentId: s._id,
        status:    attendance[s._id] || "Present",
        time:      new Date().toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" }),
      }));
      await markAttendanceAPI({ records, date, class: selClass });
      setMsg("Attendance saved ✅");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Failed"));
    } finally {
      setSaving(false);
    }
  };

  const present = filteredStudents.filter(s => attendance[s._id] === "Present").length;
  const absent  = filteredStudents.filter(s => attendance[s._id] === "Absent").length;
  const pct     = filteredStudents.length ? Math.round(present / filteredStudents.length * 100) : 0;

  const badge = v => (
    <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
      background: v==="Present"?"var(--bg-badge-green)":"var(--bg-badge-red)",
      color:      v==="Present"?"var(--text-green)":"var(--text-red)" }}>{v}</span>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Attendance</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Attendance</p>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={markAllPresent}
            style={{ padding:"9px 16px", background:"var(--bg-card)", color:"var(--text-secondary)", border:"1px solid var(--border-input)", borderRadius:9, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            ✅ All Present
          </button>
          <button onClick={handleSave} disabled={saving}
            style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            {saving ? "Saving..." : "💾 Save Attendance"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}/>
        <select value={selClass} onChange={e=>setSelClass(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
          {classes.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {msg && (
        <div style={{ background:msg.includes("Error")?"rgba(239,68,68,0.1)":"rgba(22,163,74,0.1)", border:`1px solid ${msg.includes("Error")?"rgba(239,68,68,0.2)":"rgba(22,163,74,0.2)"}`, borderRadius:10, padding:"10px 16px", marginBottom:16 }}>
          <p style={{ color:msg.includes("Error")?"#f87171":"#4ade80", fontSize:13, margin:0 }}>{msg}</p>
        </div>
      )}

      {/* Stats */}
      <div className="ta-stats">
        {[
          { label:"Total Students", value:filteredStudents.length, color:"#4f46e5", icon:"👥" },
          { label:"Present",        value:present,                 color:"#16a34a", icon:"✅" },
          { label:"Absent",         value:absent,                  color:"#dc2626", icon:"❌" },
          { label:"Attendance",     value:`${pct}%`,               color:"#d97706", icon:"📊" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>
          Class {selClass} — {date}
        </h3>

        {loading ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>No students in this class.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="att-table-wrap">
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:500 }}>
                  <thead>
                    <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                      {["#","Student Name","Class","Status","Mark"].map(h=>(
                        <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s,i)=>(
                      <tr key={s._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                        <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{ width:28, height:28, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name?.[0]}</div>
                            <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.class}</td>
                        <td style={{ padding:"12px 14px" }}>{badge(attendance[s._id]||"Present")}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <button onClick={()=>toggle(s._id)}
                            style={{ padding:"6px 14px", border:"none", borderRadius:7, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all .2s",
                              background: attendance[s._id]==="Present"?"#fef2f2":"#f0fdf4",
                              color:      attendance[s._id]==="Present"?"#dc2626":"#16a34a" }}>
                            {attendance[s._id]==="Present" ? "Mark Absent" : "Mark Present"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="att-cards-wrap" style={{ display:"none", flexDirection:"column", gap:10 }}>
              {filteredStudents.map((s,i)=>(
                <div key={s._id} style={{ background:"var(--bg-input)", borderRadius:12, padding:"12px 14px", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#4f46e5" }}>{s.name?.[0]}</div>
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", margin:0 }}>{s.name}</p>
                      <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{s.class}</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    {badge(attendance[s._id]||"Present")}
                    <button onClick={()=>toggle(s._id)}
                      style={{ padding:"5px 10px", border:"none", borderRadius:7, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit",
                        background: attendance[s._id]==="Present"?"#fef2f2":"#f0fdf4",
                        color:      attendance[s._id]==="Present"?"#dc2626":"#16a34a" }}>
                      {attendance[s._id]==="Present"?"Absent":"Present"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .ta-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .att-table-wrap { display:block; }
        .att-cards-wrap { display:none !important; }
        @media(max-width:768px){
          .ta-stats { grid-template-columns:repeat(2,1fr) !important; gap:10px !important; }
          .att-table-wrap { display:none !important; }
          .att-cards-wrap { display:flex !important; }
        }
      `}</style>
    </div>
  );
}