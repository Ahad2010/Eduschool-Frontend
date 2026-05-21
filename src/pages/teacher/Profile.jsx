import { useState } from "react";

export default function TeacherProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name:"John Doe", email:"johndoe@example.com", phone:"1234567890",
    qualification:"M.Sc. Physics", subject:"Physics", experience:"5 Years",
    address:"123 School Road, Education City",
    about:"Passionate teacher with great experience in teaching Science to middle and high school students.",
  });

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

      <div className="tp-grid">
        {/* Left Card */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:"#fff", fontWeight:800, margin:"0 auto 14px" }}>
            {profile.name[0]}
          </div>
          <p style={{ fontSize:16, fontWeight:800, color:"var(--text-heading)", margin:"0 0 4px" }}>{profile.name}</p>
          <p style={{ fontSize:12, color:"var(--text-muted)", margin:"0 0 20px" }}>Science Teacher</p>

          <div style={{ textAlign:"left", background:"var(--bg-input)", borderRadius:12, padding:"14px", border:"1px solid var(--border)" }}>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 10px", textTransform:"uppercase" }}>About Me</p>
            {editing
              ? <textarea value={profile.about} onChange={e=>setProfile({...profile,about:e.target.value})}
                  style={{ ...inp, minHeight:80, resize:"vertical" }}/>
              : <p style={{ fontSize:12, color:"var(--text-secondary)", margin:0, lineHeight:1.7 }}>{profile.about}</p>
            }
          </div>
        </div>

        {/* Right Card */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Personal Information</h3>
          <div className="tp-info">
            {[
              { label:"Full Name",      key:"name"          },
              { label:"Email",          key:"email", type:"email" },
              { label:"Phone",          key:"phone"         },
              { label:"Qualification",  key:"qualification" },
              { label:"Subject",        key:"subject"       },
              { label:"Experience",     key:"experience"    },
              { label:"Address",        key:"address", full:true },
            ].map(f=>(
              <div key={f.key} style={{ gridColumn: f.full?"1/-1":"auto" }}>
                <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                {editing
                  ? <input type={f.type||"text"} value={profile[f.key]} onChange={e=>setProfile({...profile,[f.key]:e.target.value})} style={inp}
                      onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
                  : <p style={{ fontSize:13, color:"var(--text-primary)", margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{profile[f.key]}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tp-grid{ display:grid; grid-template-columns:260px 1fr; gap:20px; }
        .tp-info{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:900px){ .tp-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:500px){ .tp-info{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}