import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [step,    setStep]    = useState(1); // 2 steps
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState({
    name:"", email:"", phone:"", password:"", confirm:"",
    role:"student", class:"", rollNo:"",
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  const validate1 = () => {
    const e = {};
    if (!form.name)    e.name    = "Name is required";
    if (!form.email)   e.email   = "Email is required";
    if (!form.phone)   e.phone   = "Phone is required";
    if (!form.role)    e.role    = "Select a role";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate2 = () => {
    const e = {};
    if (!form.password)              e.password = "Password is required";
    if (form.password.length < 6)    e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate1()) setStep(2); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate2()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const inp = (hasErr) => ({
    width:"100%", padding:"11px 14px",
    background:"#1c2333",
    border:`1.5px solid ${hasErr ? "#ef4444" : "#21293a"}`,
    borderRadius:9, color:"#e2e8f0", fontSize:13,
    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
  });

  const roles = [
    { val:"student", label:"Student", icon:"👨‍🎓", desc:"Access results & attendance" },
    { val:"teacher", label:"Teacher", icon:"👨‍🏫", desc:"Manage classes & results" },
  ];

  if (success) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0d1117,#1a1f37)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ textAlign:"center", padding:48, maxWidth:420 }}>
        <div style={{ fontSize:72, marginBottom:20 }}>✅</div>
        <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 12px" }}>Registration Submitted!</h2>
        <p style={{ color:"#475569", fontSize:14, lineHeight:1.8, margin:"0 0 28px" }}>
          Your registration is pending <span style={{ color:"#fbbf24", fontWeight:700 }}>Admin Approval</span>. You'll receive an email once approved.
        </p>
        <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:12, padding:"14px 20px", marginBottom:28 }}>
          <p style={{ color:"#fbbf24", fontSize:13, margin:0, lineHeight:1.7 }}>
            ⏳ Admin will review your request<br/>
            📧 You'll get an email notification<br/>
            ✅ Then you can login to your panel
          </p>
        </div>
        <button onClick={()=>navigate("/login")} style={{ padding:"12px 32px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          Go to Login →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0d1117,#1a1f37)", fontFamily:"'Plus Jakarta Sans',sans-serif", padding:24 }}>
      <div style={{ width:"100%", maxWidth:480, background:"rgba(22,27,39,0.98)", borderRadius:20, padding:"36px 40px", border:"1px solid rgba(255,255,255,0.05)", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🎓</div>
          <div>
            <p style={{ color:"#fff", fontWeight:800, fontSize:15, margin:0 }}>EduSchool</p>
            <p style={{ color:"#475569", fontSize:11, margin:0 }}>Create your account</p>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:28, gap:8 }}>
          {[1,2].map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8, flex:1 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700,
                background: step>=s ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#1c2333",
                color: step>=s ? "#fff" : "#475569",
                border: step>=s ? "none" : "1px solid #21293a",
              }}>{s}</div>
              <span style={{ fontSize:12, color: step>=s ? "#e2e8f0" : "#475569", fontWeight:600 }}>
                {s===1 ? "Basic Info" : "Set Password"}
              </span>
              {s < 2 && <div style={{ flex:1, height:2, background: step>1 ? "#4f46e5" : "#21293a", borderRadius:1 }}/>}
            </div>
          ))}
        </div>

        <h2 style={{ color:"#f1f5f9", fontSize:18, fontWeight:700, margin:"0 0 20px" }}>
          {step===1 ? "Personal Information" : "Create Password"}
        </h2>

        <form onSubmit={step===1 ? (e)=>{e.preventDefault();handleNext();} : handleSubmit}>

          {step===1 && <>
            {/* Role Selection */}
            <div style={{ marginBottom:18 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:8 }}>Register As</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {roles.map(r => (
                  <div key={r.val} onClick={()=>setForm({...form,role:r.val})}
                    style={{ padding:"12px", borderRadius:10, cursor:"pointer", transition:"all .2s",
                      border:`2px solid ${form.role===r.val ? "#6366f1" : "#21293a"}`,
                      background: form.role===r.val ? "rgba(99,102,241,0.1)" : "#1c2333",
                    }}>
                    <p style={{ fontSize:22, margin:"0 0 4px" }}>{r.icon}</p>
                    <p style={{ color: form.role===r.val ? "#818cf8" : "#e2e8f0", fontSize:13, fontWeight:700, margin:0 }}>{r.label}</p>
                    <p style={{ color:"#475569", fontSize:11, margin:0 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Full Name</label>
              <input placeholder="Enter your full name" value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})} style={inp(errors.name)}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=errors.name?"#ef4444":"#21293a"}/>
              {errors.name && <p style={{ color:"#f87171", fontSize:11, margin:"4px 0 0" }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Email Address</label>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={e=>setForm({...form,email:e.target.value})} style={inp(errors.email)}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=errors.email?"#ef4444":"#21293a"}/>
              {errors.email && <p style={{ color:"#f87171", fontSize:11, margin:"4px 0 0" }}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Phone Number</label>
              <input placeholder="03XX-XXXXXXX" value={form.phone}
                onChange={e=>setForm({...form,phone:e.target.value})} style={inp(errors.phone)}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=errors.phone?"#ef4444":"#21293a"}/>
              {errors.phone && <p style={{ color:"#f87171", fontSize:11, margin:"4px 0 0" }}>{errors.phone}</p>}
            </div>

            {/* Class (only for student) */}
            {form.role==="student" && (
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Class</label>
                <select value={form.class} onChange={e=>setForm({...form,class:e.target.value})}
                  style={{ ...inp(false), color: form.class ? "#e2e8f0" : "#475569" }}>
                  <option value="">Select Class</option>
                  {["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"].map(c=>(
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginTop:6 }}>
              Next →
            </button>
          </>}

          {step===2 && <>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Password</label>
              <div style={{ position:"relative" }}>
                <input type={showPw?"text":"password"} placeholder="Create password (min 6 chars)" value={form.password}
                  onChange={e=>setForm({...form,password:e.target.value})}
                  style={{ ...inp(errors.password), paddingRight:40 }}
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=errors.password?"#ef4444":"#21293a"}/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:14 }}>
                  {showPw?"🙈":"👁️"}
                </button>
              </div>
              {errors.password && <p style={{ color:"#f87171", fontSize:11, margin:"4px 0 0" }}>{errors.password}</p>}
            </div>

            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Confirm Password</label>
              <input type="password" placeholder="Re-enter your password" value={form.confirm}
                onChange={e=>setForm({...form,confirm:e.target.value})} style={inp(errors.confirm)}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=errors.confirm?"#ef4444":"#21293a"}/>
              {errors.confirm && <p style={{ color:"#f87171", fontSize:11, margin:"4px 0 0" }}>{errors.confirm}</p>}
            </div>

            {/* Approval notice */}
            <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:9, padding:"10px 14px", marginBottom:18 }}>
              <p style={{ color:"#fbbf24", fontSize:12, margin:0 }}>
                ⏳ Your account needs <strong>Admin Approval</strong> before you can login.
              </p>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button type="button" onClick={()=>setStep(1)} style={{ flex:1, padding:"12px", background:"#1c2333", color:"#94a3b8", border:"1px solid #21293a", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                ← Back
              </button>
              <button type="submit" disabled={loading} style={{ flex:2, padding:"12px", background:loading?"#374151":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
                {loading ? "Registering..." : "Create Account ✓"}
              </button>
            </div>
          </>}

        </form>

        <p style={{ textAlign:"center", color:"#475569", fontSize:13, margin:"20px 0 0" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color:"#6366f1", fontWeight:700, textDecoration:"none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}