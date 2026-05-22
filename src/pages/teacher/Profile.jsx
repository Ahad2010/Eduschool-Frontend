import { useState, useEffect, useRef } from "react";
import { getMyTeacherProfileAPI, updateMyTeacherProfileAPI, changePasswordAPI } from "../../services/api";

export default function TeacherProfile() {
  const [profile,  setProfile]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(false);
  const [activeTab,setActiveTab]= useState("Personal Info");
  const [msg,      setMsg]      = useState("");
  const [form,     setForm]     = useState({});
  const [pwForm,   setPwForm]   = useState({ currentPassword:"", newPassword:"", confirm:"" });
  const fileRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyTeacherProfileAPI();
        setProfile(res.data);
        setForm({
          name:          res.data.name          || "",
          phone:         res.data.phone         || "",
          subject:       res.data.subject       || "",
          qualification: res.data.qualification || "",
          experience:    res.data.experience    || "",
          address:       res.data.address       || "",
        });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k,v]) => formData.append(k, v));
      await updateMyTeacherProfileAPI(formData);
      setMsg("Profile updated ✅");
      setEditing(false);
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("image", file);
      await updateMyTeacherProfileAPI(formData);
      setMsg("Image updated ✅");
      const res = await getMyTeacherProfileAPI();
      setProfile(res.data);
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error uploading image"); }
  };

  const handleChangePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword) return;
    if (pwForm.newPassword !== pwForm.confirm) { setMsg("Passwords don't match"); return; }
    try {
      await changePasswordAPI({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setMsg("Password changed ✅");
      setPwForm({ currentPassword:"", newPassword:"", confirm:"" });
      setTimeout(()=>setMsg(""), 3000);
    } catch (err) { setMsg("Error: " + (err.response?.data?.message || "Failed")); }
  };

  const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const avatarUrl = profile?.image ? `http://localhost:5000${profile.image}` : null;

  if (loading) return <div style={{ background:"var(--bg-page)", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><p style={{ color:"var(--text-muted)" }}>Loading...</p></div>;

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>My Profile</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Profile</p>
        </div>
        {activeTab !== "Change Password" && (
          <button onClick={editing ? handleSave : ()=>setEditing(true)}
            style={{ padding:"9px 20px", background:editing?"linear-gradient(135deg,#16a34a,#059669)":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            {editing ? "✓ Save Changes" : "✏️ Edit Profile"}
          </button>
        )}
      </div>

      {msg && (
        <div style={{ background:msg.includes("Error")?"rgba(239,68,68,0.1)":"rgba(22,163,74,0.1)", border:`1px solid ${msg.includes("Error")?"rgba(239,68,68,0.2)":"rgba(22,163,74,0.2)"}`, borderRadius:10, padding:"10px 16px", marginBottom:16 }}>
          <p style={{ color:msg.includes("Error")?"#f87171":"#4ade80", fontSize:13, margin:0 }}>{msg}</p>
        </div>
      )}

      <div className="profile-grid">
        {/* Left */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
          <div style={{ position:"relative", width:80, height:80, margin:"0 auto 14px", cursor:"pointer" }} onClick={()=>fileRef.current.click()}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" style={{ width:80, height:80, borderRadius:"50%", objectFit:"cover", border:"3px solid #4f46e5" }}/>
              : <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:"#fff", fontWeight:800 }}>
                  {profile?.name?.[0] || "T"}
                </div>
            }
            <div style={{ position:"absolute", bottom:0, right:0, width:24, height:24, background:"#4f46e5", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid white", fontSize:12 }}>📷</div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleImageChange}/>
          <p style={{ fontSize:11, color:"var(--text-muted)", margin:"0 0 12px" }}>Click photo to change</p>
          <p style={{ fontSize:16, fontWeight:800, color:"var(--text-heading)", margin:"0 0 4px" }}>{profile?.name}</p>
          <p style={{ fontSize:12, color:"var(--text-muted)", margin:"0 0 20px" }}>{profile?.subject || "Teacher"}</p>

          <div style={{ display:"flex", flexDirection:"column", gap:4, textAlign:"left" }}>
            {["Personal Info","Change Password"].map(t=>(
              <button key={t} onClick={()=>{ setActiveTab(t); setEditing(false); }}
                style={{ padding:"10px 14px", borderRadius:9, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit", border:"none", textAlign:"left", transition:"all .15s",
                  background: activeTab===t?"linear-gradient(135deg,#4f46e5,#6366f1)":"transparent",
                  color:      activeTab===t?"#fff":"var(--text-secondary)" }}>
                {t==="Personal Info"?"👤 Personal Info":"🔒 Change Password"}
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
          {activeTab==="Personal Info" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Personal Information</h3>
              <div className="info-grid">
                {[
                  { label:"Full Name",     key:"name"          },
                  { label:"Email",         val:profile?.email  },
                  { label:"Phone",         key:"phone"         },
                  { label:"Subject",       key:"subject"       },
                  { label:"Qualification", key:"qualification" },
                  { label:"Experience",    key:"experience"    },
                  { label:"Address",       key:"address", full:true },
                ].map((f,i)=>(
                  <div key={i} style={{ gridColumn:f.full?"1/-1":"auto" }}>
                    <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                    {editing && f.key
                      ? <input value={form[f.key]||""} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}/>
                      : <p style={{ fontSize:13, color:"var(--text-primary)", margin:0, padding:"10px 13px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>{f.val || form[f.key] || "N/A"}</p>
                    }
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab==="Change Password" && (
            <>
              <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:"0 0 20px" }}>Change Password</h3>
              {[{ label:"Current Password", key:"currentPassword" },{ label:"New Password", key:"newPassword" },{ label:"Confirm Password", key:"confirm" }].map((f,i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
                  <input type="password" placeholder={`Enter ${f.label.toLowerCase()}`} value={pwForm[f.key]} onChange={e=>setPwForm({...pwForm,[f.key]:e.target.value})} style={inp}
                    onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
                </div>
              ))}
              <button onClick={handleChangePassword} style={{ padding:"10px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                Update Password
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .profile-grid { display:grid; grid-template-columns:260px 1fr; gap:20px; }
        .info-grid    { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:900px){ .profile-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:500px){ .info-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}