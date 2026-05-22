import { useState, useEffect } from "react";
import { getNoticesAPI } from "../../services/api";

const tabs = ["All Notices","School Notices","Class Notices","Events"];

const typeColors = {
  "Holiday":  { bg:"#eff6ff", color:"#2563eb" },
  "Event":    { bg:"#fffbeb", color:"#d97706" },
  "Meeting":  { bg:"#f5f3ff", color:"#7c3aed" },
  "Exam":     { bg:"#fef2f2", color:"#dc2626" },
  "Fees":     { bg:"#f0fdf4", color:"#16a34a" },
  "General":  { bg:"#f1f5f9", color:"#475569" },
};

const icons = { Holiday:"🏖️", Event:"🏃", Meeting:"👨‍👩‍👧", Exam:"📝", Fees:"💰", General:"📢" };

export default function StudentNotices() {
  const [notices,   setNotices]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("All Notices");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await getNoticesAPI();
        setNotices(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchNotices();
  }, []);

  const filtered = activeTab === "All Notices" ? notices
    : activeTab === "School Notices" ? notices.filter(n=>["Holiday","General","Meeting"].includes(n.category))
    : activeTab === "Class Notices"  ? notices.filter(n=>["Exam","Fees"].includes(n.category))
    : notices.filter(n=>n.category==="Event");

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
              background: activeTab===t?"#4f46e5":"var(--bg-card)",
              color:      activeTab===t?"#fff":"var(--text-secondary)",
              borderColor:activeTab===t?"#4f46e5":"var(--border-input)" }}>
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign:"center", padding:48 }}><p style={{ color:"var(--text-muted)" }}>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:48, color:"var(--text-muted)" }}>No notices found.</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {filtered.map((n,i) => (
            <div key={n._id} style={{ background:"var(--bg-card)", borderRadius:14, padding:"16px 18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", display:"flex", alignItems:"flex-start", gap:14, transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
              <div style={{ width:40, height:40, borderRadius:11, background:typeColors[n.category]?.bg||"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                {icons[n.category]||"📢"}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:14, fontWeight:600, color:"var(--text-primary)", margin:"0 0 6px", lineHeight:1.4 }}>{n.title}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20,
                    background:typeColors[n.category]?.bg||"#eef2ff",
                    color:typeColors[n.category]?.color||"#4f46e5" }}>{n.category}</span>
                  <span style={{ fontSize:11, color:"var(--text-muted)" }}>
                    🕐 {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                  <span style={{ fontSize:11, color:"var(--text-muted)" }}>👥 {n.audience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}