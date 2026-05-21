import { useAuth } from "../../context/AuthContext";

const subjects = [
  { name:"Mathematics",     score:89, color:"#4f46e5" },
  { name:"Physics",         score:85, color:"#2563eb" },
  { name:"Chemistry",       score:90, color:"#16a34a" },
  { name:"English",         score:78, color:"#7c3aed" },
  { name:"Computer Science",score:92, color:"#d97706" },
];

const upcomingClasses = [
  { time:"06:00 AM", subject:"Mathematics", teacher:"Mr. John Doe",  room:"101" },
  { time:"08:00 AM", subject:"Physics",     teacher:"Ms. Williams",  room:"102" },
  { time:"10:15 AM", subject:"Chemistry",   teacher:"Mrs. Emma",     room:"103" },
  { time:"11:30 AM", subject:"English",     teacher:"Mrs. Sophia",   room:"104" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString("en-US",{ day:"numeric", month:"long", year:"numeric" });

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:800, color:"var(--text-heading)", margin:0 }}>
            Welcome back, {user?.name || "Ahmed Khan"}! 👋
          </h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Here's what's happening with your academics.</p>
        </div>
        <div style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius:12, padding:"10px 16px", textAlign:"center", minWidth:120 }}>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:10, fontWeight:600, margin:"0 0 2px", textTransform:"uppercase" }}>Today's Date</p>
          <p style={{ color:"#fff", fontSize:13, fontWeight:700, margin:0 }}>{today}</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="std-stats">
        {[
          { label:"Attendance", value:"95%",    sub:"This Month",  icon:"📅", color:"#4f46e5", bg:"#eef2ff", trend:"+2%" },
          { label:"Results",    value:"88%",    sub:"Average",     icon:"📄", color:"#16a34a", bg:"#f0fdf4", trend:"+5%" },
          { label:"Fees Status",value:"Paid",   sub:"May 2025",    icon:"💰", color:"#d97706", bg:"#fffbeb", badge:true  },
          { label:"Notices",    value:"3 New",  sub:"Unread",      icon:"📢", color:"#dc2626", bg:"#fef2f2", new:true   },
        ].map((c,i) => (
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"16px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", cursor:"pointer", transition:"transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{c.icon}</div>
              {c.trend && <span style={{ fontSize:10, fontWeight:700, color:"#16a34a", background:"#f0fdf4", padding:"2px 7px", borderRadius:20 }}>{c.trend}</span>}
              {c.new && <span style={{ fontSize:10, fontWeight:700, color:"#dc2626", background:"#fef2f2", padding:"2px 7px", borderRadius:20 }}>New</span>}
            </div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{c.label}</p>
            <p style={{ fontSize:22, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
            <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:3 }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="std-main-grid">

        {/* Subject Overview */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Subject Overview</h3>
            <button style={{ fontSize:12, color:"#4f46e5", fontWeight:600, border:"none", background:"none", cursor:"pointer" }}>View All</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {subjects.map((s,i) => (
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:13, color:"var(--text-primary)", fontWeight:500 }}>{s.name}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.score}%</span>
                </div>
                <div style={{ height:6, background:"var(--border-input)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${s.score}%`, background:s.color, borderRadius:3, transition:"width 1s ease" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Upcoming Classes</h3>
            <button style={{ fontSize:12, color:"#4f46e5", fontWeight:600, border:"none", background:"none", cursor:"pointer" }}>View Timetable</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {upcomingClasses.map((c,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:"var(--bg-input)", borderRadius:10, border:"1px solid var(--border)" }}>
                <div style={{ textAlign:"center", minWidth:60 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#4f46e5", margin:0 }}>{c.time}</p>
                </div>
                <div style={{ width:1, height:32, background:"var(--border-input)" }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", margin:0 }}>{c.subject}</p>
                  <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{c.teacher} • Room {c.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .std-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .std-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 1023px) {
          .std-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .std-stats { grid-template-columns: repeat(2,1fr) !important; gap:10px !important; }
          .std-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}