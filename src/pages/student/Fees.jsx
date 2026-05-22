import { useState, useEffect } from "react";
import { getMyFeesAPI } from "../../services/api";

const badge = v => (
  <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
    background: v==="Paid"?"var(--bg-badge-green)":v==="Partial"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Paid"?"var(--text-green)":v==="Partial"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

export default function StudentFees() {
  const [fees,    setFees]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMyFeesAPI();
        setFees(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const totalAmount = fees.reduce((a,f)=>a+f.totalAmount,0);
  const paidAmount  = fees.reduce((a,f)=>a+f.paidAmount, 0);
  const dueAmount   = fees.reduce((a,f)=>a+f.dueAmount,  0);
  const pct         = totalAmount ? Math.round(paidAmount/totalAmount*100) : 0;

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Fees</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Fees</p>
      </div>

      {/* Overview */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:20 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Fees Overview</h3>
        <div className="fees-grid">
          {[
            { label:"Total Fees",  value:`$${totalAmount}`, color:"#4f46e5", icon:"💰" },
            { label:"Paid Fees",   value:`$${paidAmount}`,  color:"#16a34a", icon:"✅" },
            { label:"Due Fees",    value:`$${dueAmount}`,   color:"#dc2626", icon:"⏳" },
            { label:"Status",      value:`${pct}% Paid`,    color:"#d97706", icon:"📊" },
          ].map((c,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px", background:"var(--bg-input)", borderRadius:12, border:"1px solid var(--border)" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{c.icon}</div>
              <div>
                <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase" }}>{c.label}</p>
                <p style={{ fontSize:20, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Fees History</h3>
        {loading ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>Loading...</p>
        ) : fees.length === 0 ? (
          <p style={{ color:"var(--text-muted)", textAlign:"center", padding:32 }}>No fee records yet.</p>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:460 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                  {["Month","Total","Paid","Due","Status"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fees.map((f,i)=>(
                  <tr key={f._id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                    <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:500 }}>{f.month||"N/A"}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>${f.totalAmount}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>${f.paidAmount}</td>
                    <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>${f.dueAmount}</td>
                    <td style={{ padding:"12px 14px" }}>{badge(f.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`
        .fees-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        @media(max-width:900px){ .fees-grid{ grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}