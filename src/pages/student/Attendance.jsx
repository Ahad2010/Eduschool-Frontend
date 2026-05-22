import { useState, useEffect } from "react";
import { getMyAttendanceAPI } from "../../services/api";

const badge = v => (
  <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
    background: v==="Present"?"var(--bg-badge-green)":v==="Late"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Present"?"var(--text-green)":v==="Late"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

export default function StudentAttendance() {
  const [history,  setHistory]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMyAttendanceAPI();
        setHistory(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const present = history.filter(h=>h.status==="Present").length;
  const absent  = history.filter(h=>h.status==="Absent").length;
  const late    = history.filter(h=>h.status==="Late").length;
  const pct     = history.length ? Math.round((present/history.length)*100) : 0;

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Attendance</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Attendance</p>
      </div>

      {/* Stats */}
      <div className="att-stats">
        {[
          { label:"Total Days",  value:history.length, color:"#4f46e5", icon:"📅" },
          { label:"Present",     value:present,        color:"#16a34a", icon:"✅" },
          { label:"Absent",      value:absent,         color:"#dc2626", icon:"❌" },
          { label:"Attendance",  value:`${pct}%`,      color:"#d97706", icon:"📊" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:26, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Attendance Overview</h3>
          <span style={{ fontSize:13, fontWeight:700, color:"#4f46e5" }}>{pct}%</span>
        </div>
        <div style={{ height:10, background:"var(--border-input)", borderRadius:5, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius:5 }}/>
        </div>
        <div style={{ display:"flex", gap:20, marginTop:10, flexWrap:"wrap" }}>
          {[{label:"Present",val:present,color:"#4f46e5"},{label:"Absent",val:absent,color:"#f87171"},{label:"Late",val:late,color:"#fbbf24"}].map(s=>(
            <div key={s.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:s.color, display:"inline-block" }}/>
              <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{s.label}: <strong style={{color:"var(--text-primary)"}}>{s.val}</strong></span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Attendance History</h3>
        {loading ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>Loading...</p>
        ) : history.length === 0 ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>No attendance records yet.</p>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:420 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["Date","Class","Status","Time"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((h,i)=>(
                  <tr key={h._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                    <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:500, fontSize:12 }}>{new Date(h.date).toLocaleDateString()}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{h.class}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(h.status)}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{h.time||"N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`
        .att-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .att-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}