const history = [
  { date:"23 May 2025", day:"Friday",    subject:"Mathematics",     status:"Present", time:"08:00 AM" },
  { date:"22 May 2025", day:"Thursday",  subject:"Physics",         status:"Present", time:"09:00 AM" },
  { date:"21 May 2025", day:"Wednesday", subject:"Chemistry",       status:"Absent",  time:"10:15 AM" },
  { date:"20 May 2025", day:"Tuesday",   subject:"English",         status:"Present", time:"11:00 AM" },
  { date:"19 May 2025", day:"Monday",    subject:"Computer Science",status:"Present", time:"12:30 PM" },
  { date:"18 May 2025", day:"Friday",    subject:"Mathematics",     status:"Present", time:"08:00 AM" },
  { date:"17 May 2025", day:"Thursday",  subject:"Physics",         status:"Late",    time:"09:00 AM" },
  { date:"16 May 2025", day:"Wednesday", subject:"Chemistry",       status:"Present", time:"10:15 AM" },
];

const badge = v => (
  <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
    background: v==="Present"?"var(--bg-badge-green)":v==="Late"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Present"?"var(--text-green)":v==="Late"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

export default function StudentAttendance() {
  const present = history.filter(h=>h.status==="Present").length;
  const absent  = history.filter(h=>h.status==="Absent").length;
  const late    = history.filter(h=>h.status==="Late").length;
  const pct     = Math.round((present/history.length)*100);

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Attendance</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Attendance</p>
      </div>

      {/* Overview Cards */}
      <div className="att-stats">
        {[
          { label:"Total Days",  value:history.length, color:"#4f46e5", bg:"#eef2ff", icon:"📅" },
          { label:"Present",     value:present,        color:"#16a34a", bg:"#f0fdf4", icon:"✅" },
          { label:"Absent",      value:absent,         color:"#dc2626", bg:"#fef2f2", icon:"❌" },
          { label:"Attendance",  value:`${pct}%`,      color:"#d97706", bg:"#fffbeb", icon:"📊" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, margin:"0 auto 10px" }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:26, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:8 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Attendance Overview</h3>
          <span style={{ fontSize:13, fontWeight:700, color:"#4f46e5" }}>{pct}% Present</span>
        </div>
        <div style={{ height:10, background:"var(--border-input)", borderRadius:5, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius:5 }}/>
        </div>
        <div style={{ display:"flex", gap:20, marginTop:10, flexWrap:"wrap" }}>
          {[
            { label:"Present", val:present, color:"#4f46e5" },
            { label:"Absent",  val:absent,  color:"#f87171" },
            { label:"Late",    val:late,    color:"#fbbf24" },
          ].map(s=>(
            <div key={s.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:s.color, display:"inline-block" }}/>
              <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{s.label}: <strong style={{color:"var(--text-primary)"}}>{s.val}</strong></span>
            </div>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Attendance History</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:500 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["Date","Day","Subject","Status","Time"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  <td style={{ padding:"11px 14px", color:"var(--text-primary)", fontWeight:500, fontSize:12 }}>{h.date}</td>
                  <td style={{ padding:"11px 14px", color:"var(--text-secondary)", fontSize:12 }}>{h.day}</td>
                  <td style={{ padding:"11px 14px", color:"var(--text-primary)", fontWeight:500 }}>{h.subject}</td>
                  <td style={{ padding:"11px 14px" }}>{badge(h.status)}</td>
                  <td style={{ padding:"11px 14px", color:"var(--text-secondary)", fontSize:12 }}>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .att-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .att-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}