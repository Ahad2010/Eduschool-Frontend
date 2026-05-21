import { useState } from "react";

export default function Reports() {
  const stats = [
    { label:"Total Students",   value:"1,250", icon:"👥", color:"#4f46e5", bg:"#eef2ff"  },
    { label:"Total Teachers",   value:"85",    icon:"👨‍🏫", color:"#2563eb", bg:"#eff6ff"  },
    { label:"Attendance Rate",  value:"92.5%", icon:"✅", color:"#16a34a", bg:"#f0fdf4"  },
    { label:"Pass Rate",        value:"96.2%", icon:"📊", color:"#d97706", bg:"#fffbeb"  },
    { label:"Fees Collected",   value:"94%",   icon:"💰", color:"#7c3aed", bg:"#f5f3ff"  },
    { label:"Active Classes",   value:"40",    icon:"🏫", color:"#dc2626", bg:"#fef2f2"  },
  ];

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"28px 24px", transition:"background .3s" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Reports</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Reports</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 }}>
        {stats.map((s,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:16, padding:20, border:"1px solid var(--border)", boxShadow:"var(--shadow)", transition:"transform .2s", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <div style={{ width:46, height:46, borderRadius:13, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{s.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px", margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:26, fontWeight:800, color:s.color, margin:0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:24, border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ color:"var(--text-heading)", fontSize:15, fontWeight:700, margin:"0 0 16px" }}>Monthly Summary</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["Month","Students","Attendance","Fees Collected","Pass Rate"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["January 2025","1,210","91.2%","Rs. 890,000","95.1%"],
                ["February 2025","1,220","92.0%","Rs. 910,000","96.0%"],
                ["March 2025",   "1,235","91.8%","Rs. 920,000","95.8%"],
                ["April 2025",   "1,245","93.1%","Rs. 935,000","96.5%"],
                ["May 2025",     "1,250","92.5%","Rs. 940,000","96.2%"],
              ].map((row,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  {row.map((cell,j)=>(
                    <td key={j} style={{ padding:"12px 14px", color:j===0?"var(--text-primary)":"var(--text-secondary)", fontWeight:j===0?600:400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}