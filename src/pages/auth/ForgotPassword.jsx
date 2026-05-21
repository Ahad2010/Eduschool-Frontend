import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [step,    setStep]    = useState(1); // 1=email, 2=otp, 3=newpass, 4=success
  const [email,   setEmail]   = useState("");
  const [otp,     setOtp]     = useState(["","","","","",""]);
  const [pass,    setPass]    = useState({ new:"", confirm:"" });
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 800);
  };

  const handleResetPass = (e) => {
    e.preventDefault();
    if (!pass.new || pass.new !== pass.confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(4); }, 1000);
  };

  const handleOtpChange = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) document.getElementById(`otp-${idx+1}`)?.focus();
  };

  const inp = { width:"100%", padding:"12px 16px", background:"#1c2333", border:"1.5px solid #21293a", borderRadius:10, color:"#e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0d1117,#1a1f37)", fontFamily:"'Plus Jakarta Sans',sans-serif", padding:20 }}>
      <div style={{ width:"100%", maxWidth:420, background:"rgba(22,27,39,0.98)", borderRadius:20, padding:"36px 36px 32px", border:"1px solid rgba(255,255,255,0.05)", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🎓</div>
          <div>
            <p style={{ color:"#fff", fontWeight:800, fontSize:15, margin:0 }}>EduSchool</p>
            <p style={{ color:"#475569", fontSize:11, margin:0 }}>Password Recovery</p>
          </div>
        </div>

        {/* Step Indicators */}
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:28 }}>
          {[1,2,3].map(s=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:6, flex:1 }}>
              <div style={{ width:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700,
                background: step>s?"#16a34a":step===s?"linear-gradient(135deg,#4f46e5,#7c3aed)":"#1c2333",
                color: step>=s?"#fff":"#475569",
                border: step>s?"none":step===s?"none":"1px solid #21293a",
              }}>{step>s?"✓":s}</div>
              {s<3 && <div style={{ flex:1, height:2, background:step>s?"#16a34a":"#21293a", borderRadius:1 }}/>}
            </div>
          ))}
        </div>

        {/* STEP 1 — Email */}
        {step===1 && (
          <form onSubmit={handleSendOtp}>
            <h2 style={{ color:"#f1f5f9", fontSize:20, fontWeight:800, margin:"0 0 6px" }}>Forgot Password?</h2>
            <p style={{ color:"#475569", fontSize:13, margin:"0 0 24px" }}>Enter your email to receive a reset OTP.</p>
            <div style={{ marginBottom:18 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Email Address</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#21293a"}/>
            </div>
            <button type="submit" disabled={loading} style={{ width:"100%", padding:"13px", background:loading?"#374151":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </form>
        )}

        {/* STEP 2 — OTP */}
        {step===2 && (
          <form onSubmit={handleVerifyOtp}>
            <h2 style={{ color:"#f1f5f9", fontSize:20, fontWeight:800, margin:"0 0 6px" }}>Enter OTP</h2>
            <p style={{ color:"#475569", fontSize:13, margin:"0 0 24px" }}>We sent a 6-digit code to <span style={{color:"#6366f1"}}>{email}</span></p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:24 }}>
              {otp.map((v,i)=>(
                <input key={i} id={`otp-${i}`} maxLength={1} value={v}
                  onChange={e=>handleOtpChange(e.target.value,i)}
                  onKeyDown={e=>{ if(e.key==="Backspace"&&!v&&i>0) document.getElementById(`otp-${i-1}`)?.focus(); }}
                  style={{ width:44, height:50, textAlign:"center", fontSize:20, fontWeight:700, background:"#1c2333", border:`2px solid ${v?"#6366f1":"#21293a"}`, borderRadius:10, color:"#e2e8f0", outline:"none", fontFamily:"inherit" }}/>
              ))}
            </div>
            <button type="submit" disabled={loading} style={{ width:"100%", padding:"13px", background:loading?"#374151":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {loading ? "Verifying..." : "Verify OTP →"}
            </button>
            <p style={{ textAlign:"center", color:"#475569", fontSize:13, marginTop:14 }}>
              Didn't receive? <button type="button" onClick={()=>setStep(1)} style={{ background:"none", border:"none", color:"#6366f1", fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>Resend</button>
            </p>
          </form>
        )}

        {/* STEP 3 — New Password */}
        {step===3 && (
          <form onSubmit={handleResetPass}>
            <h2 style={{ color:"#f1f5f9", fontSize:20, fontWeight:800, margin:"0 0 6px" }}>New Password</h2>
            <p style={{ color:"#475569", fontSize:13, margin:"0 0 24px" }}>Create a strong new password.</p>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>New Password</label>
              <div style={{ position:"relative" }}>
                <input type={showPw?"text":"password"} placeholder="Enter new password" value={pass.new}
                  onChange={e=>setPass({...pass,new:e.target.value})} required style={{...inp,paddingRight:44}}
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#21293a"}/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:15 }}>
                  {showPw?"🙈":"👁️"}
                </button>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block", color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:6 }}>Confirm Password</label>
              <input type="password" placeholder="Confirm new password" value={pass.confirm}
                onChange={e=>setPass({...pass,confirm:e.target.value})} required style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#21293a"}/>
              {pass.confirm && pass.new!==pass.confirm && (
                <p style={{ color:"#f87171", fontSize:12, margin:"4px 0 0" }}>⚠️ Passwords don't match</p>
              )}
            </div>
            <button type="submit" disabled={loading} style={{ width:"100%", padding:"13px", background:loading?"#374151":"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {loading ? "Updating..." : "Update Password ✓"}
            </button>
          </form>
        )}

        {/* STEP 4 — Success */}
        {step===4 && (
          <div style={{ textAlign:"center", paddingTop:10 }}>
            <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
            <h2 style={{ color:"#f1f5f9", fontSize:20, fontWeight:800, margin:"0 0 10px" }}>Password Updated!</h2>
            <p style={{ color:"#475569", fontSize:13, margin:"0 0 28px", lineHeight:1.7 }}>Your password has been successfully reset. You can now login with your new password.</p>
            <Link to="/login" style={{ display:"block", padding:"13px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              Go to Login →
            </Link>
          </div>
        )}

        {step < 4 && (
          <p style={{ textAlign:"center", color:"#475569", fontSize:13, marginTop:20 }}>
            Remember password? <Link to="/login" style={{ color:"#6366f1", fontWeight:700, textDecoration:"none" }}>Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}