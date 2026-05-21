import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const notices = [
  { icon:"📢", title:"School will remain closed on May 25, 2025", time:"Today",      dot:"#60a5fa" },
  { icon:"🏃", title:"Annual Sports Day on May 30, 2025",         time:"2 days ago", dot:"#4ade80" },
  { icon:"👨‍👩‍👧", title:"Parents Meeting on June 5, 2025",           time:"5 days ago", dot:"#c084fc" },
  { icon:"📅", title:"Exam Schedule Released for Summer Term",    time:"1 week ago", dot:"#fbbf24" },
];

const students = [
  { name:"Ahmed Khan",  cls:"10-A", roll:"01", status:"Present" },
  { name:"Ali Raza",    cls:"10-A", roll:"02", status:"Present" },
  { name:"Hamza Ali",   cls:"10-B", roll:"03", status:"Absent"  },
  { name:"Saad Ahmed",  cls:"9-A",  roll:"04", status:"Present" },
  { name:"Usman Khan",  cls:"9-B",  roll:"05", status:"Present" },
];

const quickActions = [
  { label:"Add Student",     emoji:"👨‍🎓", color:"#7c3aed", bg:"#f3f0ff" },
  { label:"Add Teacher",     emoji:"👨‍🏫", color:"#2563eb", bg:"#eff6ff" },
  { label:"Add Class",       emoji:"🏫",  color:"#16a34a", bg:"#f0fdf4" },
  { label:"Upload Notice",   emoji:"📢",  color:"#d97706", bg:"#fffbeb" },
  { label:"Send Email",      emoji:"📧",  color:"#dc2626", bg:"#fef2f2" },
  { label:"Generate Report", emoji:"📊",  color:"#4f46e5", bg:"#eef2ff" },
];

export default function AdminDashboard() {
  const growthRef  = useRef(null);
  const donutRef   = useRef(null);
  const gChart     = useRef(null);
  const dChart     = useRef(null);

  const today = new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });

  useEffect(() => {
    gChart.current?.destroy();
    dChart.current?.destroy();

    gChart.current = new Chart(growthRef.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun"],
        datasets: [{
          data: [800,1000,950,1100,1400,1250],
          borderColor: "#4f46e5",
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0,0,0,200);
            g.addColorStop(0,"rgba(79,70,229,0.18)");
            g.addColorStop(1,"rgba(79,70,229,0)");
            return g;
          },
          borderWidth:2.5, pointBackgroundColor:"#fff",
          pointBorderColor:"#4f46e5", pointBorderWidth:2,
          pointRadius:5, fill:true, tension:0.45,
        }]
      },
      options: {
        responsive:true, maintainAspectRatio:true,
        plugins: { legend:{display:false}, tooltip:{backgroundColor:"#1e293b",titleColor:"#f1f5f9",bodyColor:"#94a3b8",padding:10,cornerRadius:8} },
        scales: {
          x: { grid:{display:false}, ticks:{color:"#94a3b8",font:{size:10}}, border:{display:false} },
          y: { grid:{color:"rgba(148,163,184,0.1)"}, ticks:{color:"#94a3b8",font:{size:10}}, border:{display:false} },
        },
      },
    });

    dChart.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: ["Present","Absent","Leave"],
        datasets: [{ data:[92.5,5.5,2], backgroundColor:["#4f46e5","#fbbf24","#f87171"], borderWidth:0, hoverOffset:4 }]
      },
      options: {
        cutout:"78%", responsive:false,
        plugins: { legend:{display:false}, tooltip:{backgroundColor:"#1e293b",titleColor:"#f1f5f9",bodyColor:"#94a3b8",padding:10,cornerRadius:8} },
      },
    });

    return () => { gChart.current?.destroy(); dChart.current?.destroy(); };
  }, []);

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>

      {/* ── HEADER ── */}
      <div className="dash-header">
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Dashboard</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:3 }}>Welcome back, Admin! Here's what's happening.</p>
        </div>
        <div className="dash-date" style={{ display:"flex", alignItems:"center", gap:6, background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:10, padding:"7px 12px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:14,height:14,flexShrink:0}}>
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", whiteSpace:"nowrap" }}>{today}</span>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="dash-stats">
        {[
          { title:"Total Students",   value:"1,250", change:"+12 this month", iconBg:"#f3f0ff", emoji:"👥"  },
          { title:"Total Teachers",   value:"85",    change:"+3 this month",  iconBg:"#eff6ff", emoji:"👨‍🏫" },
          { title:"Attendance Today", value:"92.5%", change:"+4.5% this month",iconBg:"#f0fdf4",emoji:"✅"  },
          { title:"Total Classes",    value:"40",    change:"+2 this month",  iconBg:"#fff7ed", emoji:"🏫"  },
        ].map((c,i) => (
          <div key={i} className="stat-card" style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 16px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.emoji}</div>
              <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20, background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0" }}>↑</span>
            </div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, marginBottom:3, textTransform:"uppercase", letterSpacing:"0.5px" }}>{c.title}</p>
            <p style={{ fontSize:24, fontWeight:800, color:"var(--text-primary)", margin:0 }}>{c.value}</p>
            <p style={{ fontSize:11, color:"#22c55e", marginTop:3, fontWeight:500 }}>{c.change}</p>
          </div>
        ))}
      </div>

      {/* ── CHARTS ── */}
      <div className="dash-charts">
        {/* Growth */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Student Growth</p>
              <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>Monthly enrollment</p>
            </div>
            <select style={{ fontSize:11, border:"1px solid var(--border-input)", borderRadius:7, padding:"5px 10px", outline:"none", color:"var(--text-secondary)", fontFamily:"inherit", background:"var(--bg-input)" }}>
              <option>This Year</option><option>Last Year</option>
            </select>
          </div>
          <canvas ref={growthRef} style={{ width:"100% !important", maxHeight:180 }}/>
        </div>

        {/* Donut */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 14px" }}>Attendance</p>
          <div style={{ position:"relative", display:"flex", justifyContent:"center", marginBottom:14 }}>
            <canvas ref={donutRef} width="150" height="150"/>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
              <p style={{ fontSize:18, fontWeight:800, color:"var(--text-primary)", margin:0 }}>92.5%</p>
              <p style={{ fontSize:10, color:"var(--text-muted)", margin:0 }}>Total</p>
            </div>
          </div>
          {[
            { label:"Present", val:"92.5%", color:"#4f46e5", w:"92%" },
            { label:"Absent",  val:"5.5%",  color:"#fbbf24", w:"5.5%" },
            { label:"Leave",   val:"2.0%",  color:"#f87171", w:"2%" },
          ].map(item => (
            <div key={item.label} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:item.color, display:"inline-block" }}/>
                  <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{item.label}</span>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:"var(--text-primary)" }}>{item.val}</span>
              </div>
              <div style={{ height:5, background:"var(--border-input)", borderRadius:3 }}>
                <div style={{ height:"100%", background:item.color, borderRadius:3, width:item.w }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Notices */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Recent Notices</p>
            <button style={{ fontSize:12, color:"#4f46e5", fontWeight:600, border:"none", background:"none", cursor:"pointer" }}>View All</button>
          </div>
          {notices.map((n,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"9px 0", borderBottom: i < notices.length-1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width:32, height:32, borderRadius:9, background:"var(--bg-input)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{n.icon}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)", margin:0, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n.title}</p>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:n.dot, display:"inline-block", flexShrink:0 }}/>
                  <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:20 }}>
        <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 14px" }}>Quick Actions</p>
        <div className="dash-actions">
          {quickActions.map((a,i) => (
            <button key={i} className="action-btn" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"14px 8px", background:a.bg, borderRadius:12, border:"1.5px solid transparent", cursor:"pointer", fontFamily:"inherit", transition:"all .2s", width:"100%" }}>
              <span style={{ fontSize:22 }}>{a.emoji}</span>
              <span style={{ fontSize:11, fontWeight:600, color:a.color, textAlign:"center", lineHeight:1.3 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div>
            <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Recent Students</p>
            <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>Latest enrolled</p>
          </div>
          <button style={{ padding:"8px 14px", background:"#4f46e5", color:"#fff", border:"none", borderRadius:9, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>+ Add New</button>
        </div>
        {/* Desktop Table */}
        <div className="dash-table-wrap">
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:480 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["#","Name","Class","Roll","Status","Action"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"9px 12px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s,i) => (
                  <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                    <td style={{ padding:"11px 12px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                    <td style={{ padding:"11px 12px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:8, background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                        <span style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"11px 12px", fontSize:12, color:"var(--text-secondary)" }}>{s.cls}</td>
                    <td style={{ padding:"11px 12px", fontSize:12, color:"var(--text-secondary)" }}>{s.roll}</td>
                    <td style={{ padding:"11px 12px" }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:s.status==="Present"?"var(--bg-badge-green)":"var(--bg-badge-red)", color:s.status==="Present"?"var(--text-green)":"var(--text-red)" }}>{s.status}</span>
                    </td>
                    <td style={{ padding:"11px 12px" }}>
                      <button style={{ fontSize:11, fontWeight:600, color:"#4f46e5", border:"none", background:"none", cursor:"pointer" }}>View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ Mobile Cards */}
        <div className="dash-cards-wrap" style={{ display:"none", flexDirection:"column", gap:10 }}>
          {students.map((s,i) => (
            <div key={i} style={{ background:"var(--bg-input)", borderRadius:12, padding:"12px 14px", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>{s.name[0]}</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)", margin:0 }}>{s.name}</p>
                  <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>Class {s.cls} &nbsp;•&nbsp; Roll {s.roll}</p>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:s.status==="Present"?"var(--bg-badge-green)":"var(--bg-badge-red)", color:s.status==="Present"?"var(--text-green)":"var(--text-red)", whiteSpace:"nowrap" }}>{s.status}</span>
                <button style={{ fontSize:11, fontWeight:600, color:"#4f46e5", border:"1px solid #c7d2fe", background:"#eef2ff", padding:"3px 10px", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap" }}>View →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .dash-charts {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .dash-actions {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .stat-card {
          transition: transform .2s, box-shadow .2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important;
        }

        /* Tablet */
        @media (max-width: 1023px) {
          .dash-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dash-charts {
            grid-template-columns: 1fr 1fr !important;
          }
          .dash-actions {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .dash-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .dash-charts {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .dash-actions {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          .dash-date {
            display: none !important;
          }
          .stat-card { padding: 14px 12px !important; }
        }

        /* Very small */
        @media (max-width: 400px) {
          .dash-actions {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Table → Cards on mobile */
        .dash-table-wrap { display: block; }
        .dash-cards-wrap { display: none !important; }
        @media (max-width: 768px) {
          .dash-table-wrap { display: none !important; }
          .dash-cards-wrap { display: flex !important; }
        }
      `}</style>
    </div>
  );
}