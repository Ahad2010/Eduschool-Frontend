import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function StudentProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name:"Ahmed Khan", email:"ahmedkhan@example.com", phone:"1234567890",
    class:"10-A", rollNo:"12", dob:"15 March 2010",
    address:"123 School Road, Education City", blood:"B+",
    admNo:"AD-2020-10A-12", section:"A", totalMarks:"2004-2006", status:"Active",
    parentName:"Mr. Khan", parentPhone:"0300-1234567", parentEmail:"khan@example.com",
  });

  const tabs = ["Personal Info","Contact Info","Parents Info","Change Password"];
  const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>My Profile</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Profile</p>
        </div>
        <button onClick={()=>setEditing(!editing)}
          style={{ padding:"9px 20px", background:editing?"linear-gradient(135deg,#16a34a,#059669)":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
          {editing ? "✓ Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      <div className="profile-grid">
        {/* Left — Avatar Card */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:"#fff", fontWeight:800, margin:"0 auto 14px" }}>
            {profile.name[0]}
          </div>
          <p style={{ fontSize:16, fontWeight:800, color:"var(--text-heading)", margin:"0 0 4px" }}>{profile.name}</p>
          <p style={{ fontSize:12, color:"var(--text-muted)", margin:"0 0 16px" }}>Class {profile.class} • Roll No. {profile.rollNo}</p>

          {/* Sidebar Tabs */}
          <div style={{ display:"flex", flexDirection:"column", gap:4, textAlign:"left" }}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                style={{ padding:"10px 14px", borderRadius:9, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit", border:"none", textAlign:"left", transition:"all .15s",
                  background: activeTab===t ? "linear-gradient(135deg,#4f46e5,#6366f1)" : "transparent",
                  color:      activeTab===t ? "#fff" : "var(--text-secondary)" }}>
                {t==="Personal Info"?"👤 Personal Info":t==="Contact Info"?"📞 Contact Info":t==="Parents Info"?"👨‍👩‍👧 Parents Info":"🔒 Change Password"}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Info */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          {activeTab==="Personal Info" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Personal Information</h3>
              <div className="info-grid">
                {[
                  { label:"Full Name",    key:"name"   },
                  { label:"Email",        key:"email"  },
                  { label:"Class",        key:"class"  },
                  { label:"Roll No.",     key:"rollNo" },
                  { label:"Date of Birth",key:"dob"    },
                  { label:"Blood Group",  key:"blood"  },
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                    {editing ? <input value={profile[f.key]} onChange={e=>setProfile({...profile,[f.key]:e.target.value})} style={inp}/> : <p style={{ fontSize:13, color:"var(--text-primary)", fontWeight:500, margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{profile[f.key]}</p>}
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Address</label>
                  {editing ? <input value={profile.address} onChange={e=>setProfile({...profile,address:e.target.value})} style={inp}/> : <p style={{ fontSize:13, color:"var(--text-primary)", margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{profile.address}</p>}
                </div>
              </div>
              <div style={{ marginTop:20, padding:"16px", background:"var(--bg-input)", borderRadius:12, border:"1px solid var(--border)" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"var(--text-muted)", margin:"0 0 10px", textTransform:"uppercase" }}>Academic Information</p>
                <div className="info-grid">
                  {[["Admission No.", profile.admNo],["Section",profile.section],["Academic Year",profile.totalMarks],["Status",profile.status]].map(([l,v])=>(
                    <div key={l}><p style={{ fontSize:11, color:"var(--text-muted)", margin:"0 0 2px" }}>{l}</p><p style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", margin:0 }}>{v}</p></div>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab==="Contact Info" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Contact Information</h3>
              <div className="info-grid">
                {[{ label:"Phone",   key:"phone"  },{ label:"Email",   key:"email"  },{ label:"Address", key:"address"}].map(f=>(
                  <div key={f.key} style={{ gridColumn: f.key==="address"?"1/-1":"auto" }}>
                    <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                    {editing ? <input value={profile[f.key]} onChange={e=>setProfile({...profile,[f.key]:e.target.value})} style={inp}/> : <p style={{ fontSize:13, color:"var(--text-primary)", margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{profile[f.key]}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab==="Parents Info" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Parents Information</h3>
              <div className="info-grid">
                {[{ label:"Parent Name", key:"parentName"},{ label:"Phone", key:"parentPhone"},{ label:"Email", key:"parentEmail"}].map(f=>(
                  <div key={f.key}>
                    <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                    {editing ? <input value={profile[f.key]} onChange={e=>setProfile({...profile,[f.key]:e.target.value})} style={inp}/> : <p style={{ fontSize:13, color:"var(--text-primary)", margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{profile[f.key]}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab==="Change Password" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Change Password</h3>
              {["Current Password","New Password","Confirm New Password"].map((label,i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{label}</label>
                  <input type="password" placeholder={`Enter ${label.toLowerCase()}`} style={inp}
                    onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
                </div>
              ))}
              <button style={{ padding:"10px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", marginTop:6 }}>Update Password</button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .profile-grid{ display:grid; grid-template-columns:260px 1fr; gap:20px; }
        .info-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:900px){ .profile-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:500px){ .info-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}