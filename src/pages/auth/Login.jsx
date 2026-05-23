import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email:"", password:"" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);
  const [focused, setFocused] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const userData = await login(form.email, form.password);
      if (userData.role === "admin")   navigate("/admin/dashboard");
      if (userData.role === "student") navigate("/student/dashboard");
      if (userData.role === "teacher") navigate("/teacher/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter','Plus Jakarta Sans',sans-serif", position:"relative", overflow:"hidden", background:"#080c14" }}>

      {/* ── Animated Background ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        {/* gradient mesh */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.25) 0%, transparent 60%)" }}/>
        <div style={{ position:"absolute", bottom:"-20%", left:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}/>
        <div style={{ position:"absolute", top:"20%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)" }}/>
        {/* Grid pattern */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize:"48px 48px", opacity:0.5 }}/>
      </div>

      {/* ── Main Card ── */}
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:440, margin:"0 16px", animation:"cardIn 0.5s cubic-bezier(0.4,0,0.2,1)" }}>

        {/* Glass Card */}
        <div style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:24, padding:"40px 36px", boxShadow:"0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" }}>

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 8px 20px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}>🎓</div>
            <div>
              <p style={{ color:"#fff", fontSize:16, fontWeight:800, margin:0, letterSpacing:"-0.3px" }}>EduSchool</p>
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:11, margin:0 }}>Management Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div style={{ marginBottom:28 }}>
            <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 6px", letterSpacing:"-0.5px", lineHeight:1.2 }}>
              Welcome back 👋
            </h1>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, margin:0 }}>Sign in to access your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"11px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8, animation:"slideDown 0.25s ease" }}>
              <span style={{ fontSize:14 }}>⚠️</span>
              <p style={{ color:"#f87171", fontSize:13, margin:0, fontWeight:500 }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:600, letterSpacing:"1px", textTransform:"uppercase", marginBottom:8 }}>Email</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, opacity:0.5 }}>✉️</div>
                <input type="email" placeholder="admin@eduschool.com" value={form.email}
                  onChange={e=>setForm({...form,email:e.target.value})} required
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
                  style={{ width:"100%", padding:"13px 14px 13px 42px", background: focused==="email"?"rgba(99,102,241,0.08)":"rgba(255,255,255,0.05)", border:`1.5px solid ${focused==="email"?"rgba(99,102,241,0.6)":"rgba(255,255,255,0.08)"}`, borderRadius:12, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", transition:"all 0.2s", boxShadow: focused==="email"?"0 0 0 4px rgba(99,102,241,0.1)":"none" }}/>
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom:12 }}>
              <label style={{ display:"block", color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:600, letterSpacing:"1px", textTransform:"uppercase", marginBottom:8 }}>Password</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, opacity:0.5 }}>🔑</div>
                <input type={showPw?"text":"password"} placeholder="••••••••" value={form.password}
                  onChange={e=>setForm({...form,password:e.target.value})} required
                  onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")}
                  style={{ width:"100%", padding:"13px 44px 13px 42px", background: focused==="password"?"rgba(99,102,241,0.08)":"rgba(255,255,255,0.05)", border:`1.5px solid ${focused==="password"?"rgba(99,102,241,0.6)":"rgba(255,255,255,0.08)"}`, borderRadius:12, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", transition:"all 0.2s", boxShadow: focused==="password"?"0 0 0 4px rgba(99,102,241,0.1)":"none" }}/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:15, opacity:0.5, transition:"opacity 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>
                  {showPw?"🙈":"👁️"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer" }}>
                <input type="checkbox" style={{ accentColor:"#6366f1", width:13, height:13 }}/>
                <span style={{ color:"rgba(255,255,255,0.35)", fontSize:12 }}>Remember me</span>
              </label>
              <Link to="/forgot-password" style={{ color:"#818cf8", fontSize:12, fontWeight:600, textDecoration:"none" }}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} style={{ width:"100%", padding:"14px", background: loading?"rgba(79,70,229,0.5)":"linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow: loading?"none":"0 8px 24px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.15)", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8, letterSpacing:"0.3px" }}
              onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(79,70,229,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"; }}}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"; }}>
              {loading ? (
                <>
                  <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
                  Signing in...
                </>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"24px 0" }}>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
            <span style={{ color:"rgba(255,255,255,0.2)", fontSize:11, letterSpacing:"1px" }}>QUICK LOGIN</span>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
          </div>

          {/* Quick Login */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:24 }}>
            {[
              { role:"Admin",   email:"admin@eduschool.com", pw:"admin123",   icon:"👑", color:"#818cf8", glow:"rgba(79,70,229,0.3)" },
              { role:"Student", email:"ahad@gmail.com",      pw:"123456",     icon:"👨‍🎓", color:"#34d399", glow:"rgba(16,185,129,0.3)" },
              { role:"Teacher", email:"john@teacher.com",    pw:"teacher123", icon:"👨‍🏫", color:"#fbbf24", glow:"rgba(245,158,11,0.3)" },
            ].map((q,i)=>(
              <button key={i} onClick={()=>setForm({email:q.email,password:q.pw})}
                style={{ padding:"12px 8px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s", textAlign:"center" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=`rgba(255,255,255,0.07)`; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 20px ${q.glow}`; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                <p style={{ fontSize:20, margin:"0 0 4px" }}>{q.icon}</p>
                <p style={{ color:q.color, fontSize:11, fontWeight:700, margin:0 }}>{q.role}</p>
              </button>
            ))}
          </div>

          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:13 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"#818cf8", fontWeight:700, textDecoration:"none" }}>Create account</Link>
          </p>
        </div>

        {/* Bottom glow */}
        <div style={{ position:"absolute", bottom:-40, left:"50%", transform:"translateX(-50%)", width:200, height:80, background:"radial-gradient(ellipse, rgba(79,70,229,0.3), transparent)", borderRadius:"50%", filter:"blur(20px)", pointerEvents:"none" }}/>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(24px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes spin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}