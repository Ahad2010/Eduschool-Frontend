import { useState } from "react";

const all = [
  { id:1, title:"Annual Sports Day will be held on 30 May 2025.", type:"School Notice", time:"2 hours ago",  icon:"🏃", color:"#2563eb" },
  { id:2, title:"Mid Term Exams will start from 10 June 2025.",   type:"Class Notice",  time:"1 day ago",    icon:"📝", color:"#dc2626" },
  { id:3, title:"Library books submission last date is 28 May 2025.", type:"School Notice", time:"3 days ago", icon:"📚", color:"#16a34a" },
  { id:4, title:"Parent Teacher Meeting on 5 June 2025.",          type:"Event",         time:"3 days ago",   icon:"👨‍👩‍👧", color:"#d97706" },
  { id:5, title:"School will remain closed on 1 June 2025 (Sunday).", type:"School Notice", time:"5 days ago",icon:"🏫", color:"#7c3aed" },
];

const tabs = ["All Notices","School Notices","Class Notices","Events"];

const typeColors = {
  "School Notice": { bg:"#eff6ff", color:"#2563eb" },
  "Class Notice":  { bg:"#fef2f2", color:"#dc2626" },
  "Event":         { bg:"#fffbeb", color:"#d97706" },
};

export default function StudentNotices() {
  const [activeTab, setActiveTab] = useState("All Notices");

  const filtered = activeTab === "All Notices" ? all
    : activeTab === "School Notices" ? all.filter(n=>n.type==="School Notice")
    : activeTab === "Class Notices"  ? all.filter(n=>n.type==="Class Notice")
    : all.filter(n=>n.type==="Event");

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Notices</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Notices</p>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)}
            style={{ padding:"8px 16px", borderRadius:20, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border:"1.5px solid", transition:"all .2s",
              background: activeTab===t ? "#4f46e5" : "var(--bg-card)",
              color:      activeTab===t ? "#fff"    : "var(--text-secondary)",
              borderColor:activeTab===t ? "#4f46e5" : "var(--border-input)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.map((n,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"16px 18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", display:"flex", alignItems:"flex-start", gap:14, transition:"transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
            <div style={{ width:40, height:40, borderRadius:11, background:`${typeColors[n.type]?.bg||"#f0f4ff"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{n.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:14, fontWeight:600, color:"var(--text-primary)", margin:"0 0 6px", lineHeight:1.4 }}>{n.title}</p>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20,
                  background:typeColors[n.type]?.bg||"#eef2ff",
                  color:typeColors[n.type]?.color||"#4f46e5" }}>{n.type}</span>
                <span style={{ fontSize:11, color:"var(--text-muted)" }}>🕐 {n.time}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{ textAlign:"center", padding:40, color:"var(--text-muted)" }}>No notices found.</div>
        )}
      </div>
    </div>
  );
}