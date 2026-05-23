import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentsAPI, getAttendanceAPI } from "../../services/api";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [students,  setStudents]  = useState([]);
  const [attendance,setAttendance]= useState([]);
  const [loading,   setLoading]   = useState(true);
  const today = new Date().toLocaleDateString("en-US",{ weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studRes, attRes] = await Promise.all([
          getStudentsAPI(),
          getAttendanceAPI({ date: todayDate }),
        ]);
        setStudents(studRes.data);
        setAttendance(attRes.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // ✅ Real stats from DB
  const totalStudents = students.length;
  const presentToday  = attendance.filter(a=>a.status==="Present").length;
  const absentToday   = attendance.filter(a=>a.status==="Absent").length;
  const attPct        = attendance.length ? Math.round(presentToday/attendance.length*100) : 0;

  // Unique classes
  const classes = [...new Set(students.map(s=>s.class).filter(Boolean))];

  // Recent students (last 5)
  const recentStudents = students.slice(0, 5);

  // Today's schedule (static — can be made dynamic later)
  const schedule = [
    { time:"09:00 AM", class:"Class 10-A", subject:"Physics",        room:"101" },
    { time:"10:00 AM", class:"Class 9-B",  subject:"Physics",        room:"102" },
    { time:"10:15 AM", class:"Class 8-A",  subject:"Science",        room:"103" },
    { time:"11:30 AM", class:"Class 7-C",  subject:"General Science",room:"104" },
  ];

  const SkeletonCard = () => (
    <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)" }}>
      <div style={{ height:44, width:44, borderRadius:12, background:"var(--border-input)", marginBottom:12, animation:"pulse 1.5s infinite" }}/>
      <div style={{ height:10, background:"var(--border-input)", borderRadius:4, marginBottom:8, animation:"pulse 1.5s infinite" }}/>
      <div style={{ height:22, background:"var(--border-input)", borderRadius:4, width:"50%", animation:"pulse 1.5s infinite" }}/>
    </div>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:800, color:"var(--text-heading)", margin:0 }}>
            Welcome back, {user?.name || "Teacher"}! 👋
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
        {loading ? (
          Array.from({length:4}).map((_,i)=><SkeletonCard key={i}/>)
        ) : (
          [
            { label:"Total Students",  value:totalStudents, sub:"All Classes",    icon:"👥", color:"#4f46e5", bg:"#eef2ff" },
            { label:"Classes",         value:classes.length,sub:"Your classes",   icon:"🏫", color:"#16a34a", bg:"#f0fdf4" },
            { label:"Present Today",   value:presentToday,  sub:`of ${attendance.length}`, icon:"✅", color:"#2563eb", bg:"#eff6ff" },
            { label:"Absent Today",    value:absentToday,   sub:"Need attention", icon:"❌", color:"#d97706", bg:"#fffbeb" },
          ].map((c,i)=>(
            <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 16px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", cursor:"pointer", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:12 }}>{c.icon}</div>
              <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase" }}>{c.label}</p>
              <p style={{ fontSize:26, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
              <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:3 }}>{c.sub}</p>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM GRID */}
      <div className="t-grid">

        {/* Today's Schedule */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Today's Schedule</h3>
            <span style={{ fontSize:11, color:"var(--text-muted)" }}>{schedule.length} Classes</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {schedule.map((s,i)=>(
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

        {/* Recent Students */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>My Students</h3>
            <span style={{ fontSize:12, color:"#4f46e5", fontWeight:600 }}>Total: {totalStudents}</span>
          </div>
          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {Array.from({length:4}).map((_,i)=>(
                <div key={i} style={{ height:44, background:"var(--border-input)", borderRadius:10, animation:"pulse 1.5s infinite" }}/>
              ))}
            </div>
          ) : recentStudents.length === 0 ? (
            <p style={{ color:"var(--text-muted)", textAlign:"center", padding:24, fontSize:13 }}>No students yet.</p>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {recentStudents.map((s,i)=>(
                <div key={s._id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:"var(--bg-input)", borderRadius:10, border:"1px solid var(--border)" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>{s.name?.[0]}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</p>
                    <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>Class {s.class}</p>
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, padding:"2px 10px", borderRadius:20, background:"#eef2ff", color:"#4f46e5", whiteSpace:"nowrap" }}>
                    {attendance.find(a=>a.student?._id===s._id)?.status || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .t-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .t-grid  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:1023px){ .t-stats{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:640px){
          .t-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; }
          .t-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}