import { useAuth } from "../../context/AuthContext";

const schedule = [
  { time:"09:00 AM", class:"Class 10-A", subject:"Physics",       room:"101" },
  { time:"10:00 AM", class:"Class 9-B",  subject:"Physics",       room:"102" },
  { time:"10:15 AM", class:"Class 8-A",  subject:"Science",       room:"103" },
  { time:"11:30 AM", class:"Class 7-C",  subject:"General Science",room:"104" },
];

const performance = [
  { subject:"Physics",         score:90, color:"#4f46e5" },
  { subject:"Chemistry",       score:85, color:"#2563eb" },
  { subject:"Biology",         score:78, color:"#16a34a" },
  { subject:"Science",         score:88, color:"#d97706" },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString("en-US",{ weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:800, color:"var(--text-heading)", margin:0 }}>
            Welcome back, {user?.name || "John Doe"}! 👋
          </h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Here's what's happening today.</p>
        </div>
        <div style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius:12, padding:"10px 16px", textAlign:"center", minWidth:130 }}>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:10, fontWeight:600, margin:"0 0 2px", textTransform:"uppercase" }}>📅 Today</p>
          <p style={{ color:"#fff", fontSize:12, fontWeight:700, margin:0 }}>{today}</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="t-stats">
        {[
          { label:"Total Classes",   value:"8",    sub:"Today",      icon:"🏫", color:"#4f46e5", bg:"#eef2ff" },
          { label:"Total Students",  value:"128",  sub:"All Classes", icon:"👥", color:"#16a34a", bg:"#f0fdf4" },
          { label:"Attendance",      value:"92%",  sub:"Average",     icon:"✅", color:"#2563eb", bg:"#eff6ff" },
          { label:"Pending Tasks",   value:"5",    sub:"To Review",   icon:"📋", color:"#d97706", bg:"#fffbeb" },
        ].map((c,i) => (
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 16px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", cursor:"pointer", transition:"transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.icon}</div>
            </div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{c.label}</p>
            <p style={{ fontSize:26, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
            <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:3 }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM GRID */}
      <div className="t-grid">

        {/* Today's Schedule */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Today's Schedule</h3>
            <button style={{ fontSize:12, color:"#4f46e5", fontWeight:600, border:"none", background:"none", cursor:"pointer" }}>View Full Timetable</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {schedule.map((s,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", background:"var(--bg-input)", borderRadius:10, border:"1px solid var(--border)" }}>
                <div style={{ minWidth:72 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#4f46e5", margin:0 }}>{s.time}</p>
                </div>
                <div style={{ width:1, height:32, background:"var(--border-input)" }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", margin:0 }}>{s.class}</p>
                  <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{s.subject} • Room {s.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Performance */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Class Performance</h3>
            <span style={{ fontSize:11, color:"var(--text-muted)" }}>This Month</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {performance.map((p,i) => (
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:13, color:"var(--text-primary)", fontWeight:500 }}>{p.subject}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:p.color }}>{p.score}%</span>
                </div>
                <div style={{ height:8, background:"var(--border-input)", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${p.score}%`, background:p.color, borderRadius:4 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .t-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .t-grid  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:1023px){ .t-stats{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:640px){
          .t-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; }
          .t-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}