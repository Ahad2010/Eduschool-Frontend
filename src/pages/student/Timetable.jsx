const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const timetable = [
  { period:1, time:"06:00 AM - 08:45 AM", subjects:{ Monday:"Mathematics", Tuesday:"Physics",     Wednesday:"Chemistry",      Thursday:"English",       Friday:"Computer Sc.",  Saturday:"Mathematics" }, teachers:{ Monday:"Mr. John Doe", Tuesday:"Ms. Williams", Wednesday:"Mrs. Emma", Thursday:"Mrs. Sophia", Friday:"Mr. David", Saturday:"Mr. John Doe" }, rooms:{ Monday:"101", Tuesday:"102", Wednesday:"103", Thursday:"104", Friday:"105", Saturday:"101" } },
  { period:2, time:"09:00 AM - 09:45 AM", subjects:{ Monday:"Physics",     Tuesday:"Mathematics", Wednesday:"English",        Thursday:"Chemistry",     Friday:"Mathematics",   Saturday:"Physics"     }, teachers:{ Monday:"Ms. Williams", Tuesday:"Mr. John Doe", Wednesday:"Mrs. Sophia", Thursday:"Mrs. Emma", Friday:"Mr. John Doe", Saturday:"Ms. Williams" }, rooms:{ Monday:"102", Tuesday:"101", Wednesday:"104", Thursday:"103", Friday:"101", Saturday:"102" } },
  { period:3, time:"10:15 AM - 11:00 AM", subjects:{ Monday:"Chemistry",   Tuesday:"English",     Wednesday:"Mathematics",    Thursday:"Computer Sc.",  Friday:"English",       Saturday:"Chemistry"   }, teachers:{ Monday:"Mrs. Emma", Tuesday:"Mrs. Sophia", Wednesday:"Mr. John Doe", Thursday:"Mr. David", Friday:"Mrs. Sophia", Saturday:"Mrs. Emma" }, rooms:{ Monday:"103", Tuesday:"104", Wednesday:"101", Thursday:"105", Friday:"104", Saturday:"103" } },
  { period:4, time:"11:30 AM - 12:15 PM", subjects:{ Monday:"English",     Tuesday:"Chemistry",   Wednesday:"Computer Sc.",   Thursday:"Mathematics",   Friday:"Physics",       Saturday:"English"     }, teachers:{ Monday:"Mrs. Sophia", Tuesday:"Mrs. Emma", Wednesday:"Mr. David", Thursday:"Mr. John Doe", Friday:"Ms. Williams", Saturday:"Mrs. Sophia" }, rooms:{ Monday:"104", Tuesday:"103", Wednesday:"105", Thursday:"101", Friday:"102", Saturday:"104" } },
  { period:5, time:"12:30 PM - 01:15 PM", subjects:{ Monday:"Computer Sc.",Tuesday:"Urdu",        Wednesday:"Physics",        Thursday:"Urdu",          Friday:"Chemistry",     Saturday:"Urdu"        }, teachers:{ Monday:"Mr. David", Tuesday:"Mrs. Fatima", Wednesday:"Ms. Williams", Thursday:"Mrs. Fatima", Friday:"Mrs. Emma", Saturday:"Mrs. Fatima" }, rooms:{ Monday:"105", Tuesday:"106", Wednesday:"102", Thursday:"106", Friday:"103", Saturday:"106" } },
  { period:6, time:"01:30 PM - 02:15 PM", subjects:{ Monday:"Urdu",        Tuesday:"Computer Sc.",Wednesday:"Urdu",           Thursday:"Physics",       Friday:"Urdu",          Saturday:"-"           }, teachers:{ Monday:"Mrs. Fatima", Tuesday:"Mr. David", Wednesday:"Mrs. Fatima", Thursday:"Ms. Williams", Friday:"Mrs. Fatima", Saturday:"-" }, rooms:{ Monday:"106", Tuesday:"105", Wednesday:"106", Thursday:"102", Friday:"106", Saturday:"-" } },
];

const subjectColors = { Mathematics:"#4f46e5", Physics:"#2563eb", Chemistry:"#16a34a", English:"#7c3aed", "Computer Sc.":"#d97706", "Computer Science":"#d97706", Urdu:"#dc2626", "-":"#94a3b8" };
const [activeDay, setActiveDay] = ["Monday", null];

import { useState } from "react";

export default function StudentTimetable() {
  const [activeDay, setActiveDay] = useState("Monday");

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>My Timetable</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Timetable</p>
      </div>

      {/* Day Tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
        {days.map(d=>(
          <button key={d} onClick={()=>setActiveDay(d)}
            style={{ padding:"8px 16px", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border:"1.5px solid", transition:"all .2s", whiteSpace:"nowrap",
              background: activeDay===d ? "#4f46e5" : "var(--bg-card)",
              color:      activeDay===d ? "#fff"    : "var(--text-secondary)",
              borderColor:activeDay===d ? "#4f46e5" : "var(--border-input)" }}>
            {d}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="tt-desktop" style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:700 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                <th style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", width:50 }}>#</th>
                <th style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>Time</th>
                {days.map(d=>(
                  <th key={d} style={{ textAlign:"left", padding:"10px 14px", background: d===activeDay?"rgba(79,70,229,0.1)":"var(--bg-input)", color: d===activeDay?"#4f46e5":"var(--text-muted)", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{row.period}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12, whiteSpace:"nowrap" }}>{row.time}</td>
                  {days.map(d=>(
                    <td key={d} style={{ padding:"10px 14px", background: d===activeDay?"rgba(79,70,229,0.04)":"transparent" }}>
                      {row.subjects[d] && row.subjects[d]!=="-" ? (
                        <div>
                          <p style={{ fontSize:12, fontWeight:600, color:subjectColors[row.subjects[d]]||"#4f46e5", margin:"0 0 2px" }}>{row.subjects[d]}</p>
                          <p style={{ fontSize:11, color:"var(--text-muted)", margin:"0 0 1px" }}>{row.teachers[d]}</p>
                          <p style={{ fontSize:10, color:"var(--text-muted)", margin:0 }}>Room {row.rooms[d]}</p>
                        </div>
                      ) : <span style={{ color:"var(--text-muted)", fontSize:12 }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="tt-mobile" style={{ display:"none", flexDirection:"column", gap:10 }}>
        {timetable.map((row,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:12, padding:"14px 16px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ textAlign:"center", minWidth:50 }}>
              <p style={{ fontSize:10, color:"var(--text-muted)", margin:0, fontWeight:600 }}>Period</p>
              <p style={{ fontSize:20, fontWeight:800, color:"#4f46e5", margin:0 }}>{row.period}</p>
            </div>
            <div style={{ width:1, height:44, background:"var(--border-input)" }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13, fontWeight:700, color:subjectColors[row.subjects[activeDay]]||"#4f46e5", margin:"0 0 2px" }}>{row.subjects[activeDay]||"—"}</p>
              <p style={{ fontSize:11, color:"var(--text-secondary)", margin:"0 0 1px" }}>{row.teachers[activeDay]||""}</p>
              <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{row.time} • Room {row.rooms[activeDay]||"—"}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          .tt-desktop{ display:none !important; }
          .tt-mobile{ display:flex !important; }
        }
      `}</style>
    </div>
  );
}