import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate    = useNavigate();
  const { login }   = useAuth();
  const [form,      setForm]    = useState({ email:"", password:"" });
  const [error,     setError]   = useState("");
  const [loading,   setLoading] = useState(false);
  const [showPw,    setShowPw]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const userData = await login(form.email, form.password);
      // Role based redirect
      if (userData.role === "admin")   navigate("/admin/dashboard");
      if (userData.role === "student") navigate("/student/dashboard");
      if (userData.role === "teacher") navigate("/teacher/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width:"100%", padding:"12px 16px",
    background:"#1c2333", border:"1.5px solid #21293a",
    borderRadius:10, color:"#e2e8f0", fontSize:14,
    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:"linear-gradient(135deg,#0d1117,#1a1f37)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

      {/* LEFT */}
      <div className="login-left" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:48, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-100, left:-100, width:350, height:350, borderRadius:"50%", background:"rgba(79,70,229,0.08)" }}/>
        <div style={{ position:"absolute", bottom:-80, right:-80, width:280, height:280, borderRadius:"50%", background:"rgba(99,102,241,0.06)" }}/>
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:400 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:40 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🎓</div>
            <div style={{ textAlign:"left" }}>
              <p style={{ color:"#fff", fontSize:22, fontWeight:800, margin:0 }}>EduSchool</p>
              <p style={{ color:"#475569", fontSize:12, margin:0 }}>School Management Portal</p>
            </div>
          </div>
          <div style={{ width:"100%", height:200, borderRadius:20, background:"linear-gradient(180deg,#1e3a5f 0%,#0d1117 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:90, marginBottom:28, border:"1px solid rgba(255,255,255,0.06)" }}>🏫</div>
          <h2 style={{ color:"#fff", fontSize:20, fontWeight:700, margin:"0 0 10px" }}>Welcome to EduSchool</h2>
          <p style={{ color:"#475569", fontSize:13, lineHeight:1.8, margin:"0 0 28px" }}>Complete school management for admins, teachers & students.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            {[{val:"1,250+",label:"Students"},{val:"85+",label:"Teachers"},{val:"40+",label:"Classes"}].map((s,i)=>(
              <div key={i} style={{ padding:"10px 16px", borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
                <p style={{ color:"#6366f1", fontSize:17, fontWeight:800, margin:0 }}>{s.val}</p>
                <p style={{ color:"#475569", fontSize:11, margin:0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right" style={{ width:460, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 44px", background:"rgba(22,27,39,0.98)", borderLeft:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ width:"100%" }}>
          <h1 style={{ color:"#f1f5f9", fontSize:24, fontWeight:800, margin:"0 0 6px" }}>Welcome Back! 👋</h1>
          <p style={{ color:"#475569", fontSize:13, margin:"0 0 28px" }}>Login to access your dashboard</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Email Address</label>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={e=>setForm({...form,email:e.target.value})} required style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"}
                onBlur={e=>e.target.style.borderColor="#21293a"}/>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Password</label>
              <div style={{ position:"relative" }}>
                <input type={showPw?"text":"password"} placeholder="Enter your password" value={form.password}
                  onChange={e=>setForm({...form,password:e.target.value})} required
                  style={{...inp, paddingRight:44}}
                  onFocus={e=>e.target.style.borderColor="#6366f1"}
                  onBlur={e=>e.target.style.borderColor="#21293a"}/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:15 }}>
                  {showPw?"🙈":"👁️"}
                </button>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer" }}>
                <input type="checkbox" style={{ accentColor:"#6366f1" }}/>
                <span style={{ color:"#64748b", fontSize:12 }}>Remember me</span>
              </label>
              <Link to="/forgot-password" style={{ color:"#6366f1", fontSize:12, fontWeight:600, textDecoration:"none" }}>Forgot Password?</Link>
            </div>

            {error && (
              <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, padding:"10px 14px", marginBottom:16 }}>
                <p style={{ color:"#f87171", fontSize:13, margin:0 }}>⚠️ {error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:"100%", padding:"13px",
              background:loading?"#374151":"linear-gradient(135deg,#4f46e5,#7c3aed)",
              color:"#fff", border:"none", borderRadius:10,
              fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer",
              fontFamily:"inherit", transition:"all .2s",
            }}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
            <div style={{ flex:1, height:1, background:"#21293a" }}/>
            <span style={{ color:"#334155", fontSize:12 }}>OR</span>
            <div style={{ flex:1, height:1, background:"#21293a" }}/>
          </div>

          <p style={{ textAlign:"center", color:"#475569", fontSize:13, margin:0 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color:"#6366f1", fontWeight:700, textDecoration:"none" }}>Sign Up</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left  { display: none !important; }
          .login-right { width: 100% !important; padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  );
}