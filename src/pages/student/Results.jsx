import { useState } from "react";

const results = [
  { subject:"Mathematics",     total:100, obtained:90, pct:90, grade:"A+"  },
  { subject:"Physics",         total:100, obtained:85, pct:85, grade:"A"   },
  { subject:"Chemistry",       total:100, obtained:88, pct:88, grade:"A"   },
  { subject:"English",         total:100, obtained:78, pct:78, grade:"B+"  },
  { subject:"Computer Science",total:100, obtained:92, pct:92, grade:"A+"  },
];

const gradeColor = g => ({ "A+":"#16a34a","A":"#16a34a","B+":"#2563eb","B":"#2563eb","C":"#d97706","D":"#dc2626","F":"#dc2626" }[g]||"#4f46e5");

export default function StudentResults() {
  const total    = results.reduce((a,r)=>a+r.total,0);
  const obtained = results.reduce((a,r)=>a+r.obtained,0);
  const avg      = Math.round(obtained/total*100);

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Results</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Results</p>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <select style={{ padding:"8px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
            <option>Annual Exam 2025</option><option>Mid Term 2025</option>
          </select>
          <select style={{ padding:"8px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
            <option>All Subjects</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="res-stats">
        {[
          { label:"Total Marks",    value:total,   color:"#4f46e5", icon:"📊" },
          { label:"Obtained Marks", value:obtained,color:"#16a34a", icon:"✅" },
          { label:"Percentage",     value:`${avg}%`,color:"#d97706",icon:"📈" },
          { label:"Grade",          value:"A",     color:"#7c3aed", icon:"🏆" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Results Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Subject-wise Results</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:480 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["Subject","Total Marks","Obtained Marks","Percentage","Grade"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:600 }}>{r.subject}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{r.total}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:600 }}>{r.obtained}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, height:6, background:"var(--border-input)", borderRadius:3, maxWidth:80 }}>
                        <div style={{ height:"100%", width:`${r.pct}%`, background:"#4f46e5", borderRadius:3 }}/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)" }}>{r.pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ fontSize:13, fontWeight:800, color:gradeColor(r.grade) }}>{r.grade}</span>
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop:"2px solid var(--border-input)", background:"var(--bg-input)" }}>
                <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:800 }}>Total</td>
                <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:700 }}>{total}</td>
                <td style={{ padding:"12px 14px", color:"#4f46e5", fontWeight:700 }}>{obtained}</td>
                <td style={{ padding:"12px 14px", color:"#4f46e5", fontWeight:700 }}>{avg}%</td>
                <td style={{ padding:"12px 14px", color:"#16a34a", fontWeight:800 }}>A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .res-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .res-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}