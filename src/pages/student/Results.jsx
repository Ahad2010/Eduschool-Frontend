import { useState, useEffect } from "react";
import { getMyResultsAPI } from "../../services/api";

const gradeColor = g => ({"A+":"var(--text-green)","A":"var(--text-green)","B+":"var(--text-blue)","B":"var(--text-blue)","C":"var(--text-amber)","D":"var(--text-red)","F":"var(--text-red)"}[g]||"var(--text-primary)");

export default function StudentResults() {
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMyResultsAPI();
        setResults(res.data);
        if (res.data.length > 0) setSelected(res.data[0]);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Results</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Results</p>
        </div>
        {results.length > 0 && (
          <select value={selected?._id||""} onChange={e=>setSelected(results.find(r=>r._id===e.target.value))}
            style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
            {results.map(r=><option key={r._id} value={r._id}>{r.exam}</option>)}
          </select>
        )}
      </div>

      {loading ? (
        <p style={{ color:"var(--text-muted)", textAlign:"center", padding:48 }}>Loading...</p>
      ) : results.length === 0 ? (
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:48, border:"1px solid var(--border)", textAlign:"center" }}>
          <p style={{ fontSize:32, marginBottom:12 }}>📊</p>
          <p style={{ color:"var(--text-primary)", fontWeight:700 }}>No results yet</p>
          <p style={{ color:"var(--text-muted)", fontSize:13 }}>Results will appear once teacher uploads them.</p>
        </div>
      ) : selected && (
        <>
          {/* Summary cards */}
          <div className="res-stats">
            {[
              { label:"Total Marks",    value:selected.totalMarks,    color:"#4f46e5", icon:"📊" },
              { label:"Obtained Marks", value:selected.obtainedMarks, color:"#16a34a", icon:"✅" },
              { label:"Percentage",     value:`${selected.percentage}%`, color:"#d97706", icon:"📈" },
              { label:"Grade",          value:selected.grade,          color:gradeColor(selected.grade), icon:"🏆" },
            ].map((c,i)=>(
              <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
                <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
                <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
              </div>
            ))}
          </div>

          {/* Subjects table */}
          <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Subject-wise Results — {selected.exam}</h3>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:400 }}>
                <thead>
                  <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                    {["Subject","Total Marks","Obtained","Percentage"].map(h=>(
                      <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selected.subjects?.map((s,i)=>(
                    <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                      <td style={{ padding:"12px 14px", fontWeight:600, color:"var(--text-primary)" }}>{s.name}</td>
                      <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.total}</td>
                      <td style={{ padding:"12px 14px", fontWeight:600, color:"var(--text-primary)" }}>{s.obtained}</td>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ flex:1, height:6, background:"var(--border-input)", borderRadius:3, maxWidth:80 }}>
                            <div style={{ height:"100%", width:`${Math.round(s.obtained/s.total*100)}%`, background:"#4f46e5", borderRadius:3 }}/>
                          </div>
                          <span style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)" }}>{Math.round(s.obtained/s.total*100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <style>{`
        .res-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .res-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}