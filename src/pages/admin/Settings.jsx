import { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({ name:"Admin", email:"admin@eduschool.com", phone:"0300-1234567", school:"EduSchool" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2500); };

  const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"28px 24px", transition:"background .3s" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Settings</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Settings</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, maxWidth:900 }}>

        {/* Profile */}
        <div style={{ background:"var(--bg-card)", borderRadius:16, padding:24, border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:15, fontWeight:700, margin:"0 0 20px" }}>👤 Profile Settings</h3>
          {[
            { key:"name",   label:"Full Name"    },
            { key:"email",  label:"Email",  type:"email" },
            { key:"phone",  label:"Phone"        },
            { key:"school", label:"School Name"  },
          ].map(f=>(
            <div key={f.key} style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
              <input type={f.type||"text"} value={profile[f.key]} onChange={e=>setProfile({...profile,[f.key]:e.target.value})} style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
            </div>
          ))}
          <button onClick={handleSave} style={{ marginTop:6, padding:"10px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            {saved ? "✅ Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Change Password */}
        <div style={{ background:"var(--bg-card)", borderRadius:16, padding:24, border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:15, fontWeight:700, margin:"0 0 20px" }}>🔒 Change Password</h3>
          {["Current Password","New Password","Confirm Password"].map((label,i)=>(
            <div key={i} style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{label}</label>
              <input type="password" placeholder={`Enter ${label.toLowerCase()}`} style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
            </div>
          ))}
          <button style={{ marginTop:6, padding:"10px 24px", background:"linear-gradient(135deg,#dc2626,#ef4444)", color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}