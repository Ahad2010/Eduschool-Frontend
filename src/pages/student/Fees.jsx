const feesHistory = [
  { inv:"INV-001", date:"01 Jan 2025", desc:"Tuition Fee (Jan)", amount:1000, status:"Paid"    },
  { inv:"INV-002", date:"01 Feb 2025", desc:"Tuition Fee (Feb)", amount:1000, status:"Paid"    },
  { inv:"INV-003", date:"01 Mar 2025", desc:"Tuition Fee (Mar)", amount:1000, status:"Paid"    },
  { inv:"INV-004", date:"01 Apr 2025", desc:"Tuition Fee (Apr)", amount:1000, status:"Paid"    },
  { inv:"INV-005", date:"01 May 2025", desc:"Tuition Fee (May)", amount:1000, status:"Partial" },
];

const badge = v => (
  <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
    background: v==="Paid"?"var(--bg-badge-green)":v==="Partial"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Paid"?"var(--text-green)":v==="Partial"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

export default function StudentFees() {
  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Fees</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Fees</p>
      </div>

      {/* Overview */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", marginBottom:20 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Fees Overview</h3>
        <div className="fees-ov-grid">
          {[
            { label:"Total Fees", value:"$5000", color:"#4f46e5", bg:"#eef2ff", icon:"💰" },
            { label:"Paid Fees",  value:"$4400", color:"#16a34a", bg:"#f0fdf4", icon:"✅" },
            { label:"Due Fees",   value:"$600",  color:"#dc2626", bg:"#fef2f2", icon:"⏳" },
          ].map((c,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px", background:"var(--bg-input)", borderRadius:12, border:"1px solid var(--border)" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{c.icon}</div>
              <div>
                <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase" }}>{c.label}</p>
                <p style={{ fontSize:22, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px", background:"var(--bg-input)", borderRadius:12, border:"1px solid var(--border)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"#fffbeb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>📊</div>
            <div>
              <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 3px", textTransform:"uppercase" }}>Status</p>
              <p style={{ fontSize:22, fontWeight:800, color:"#d97706", margin:0 }}>88% <span style={{fontSize:14}}>Paid</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>Fees History</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:460 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["Invoice No.","Date","Description","Amount","Status"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feesHistory.map((f,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  <td style={{ padding:"12px 14px", color:"#4f46e5", fontWeight:600, fontSize:12 }}>{f.inv}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{f.date}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontSize:13 }}>{f.desc}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:600 }}>${f.amount}</td>
                  <td style={{ padding:"12px 14px" }}>{badge(f.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .fees-ov-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        @media(max-width:900px){ .fees-ov-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:500px){ .fees-ov-grid{ grid-template-columns:1fr 1fr !important; } }
      `}</style>
    </div>
  );
}