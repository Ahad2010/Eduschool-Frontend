import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { section:"Main Menu", links:[
    { to:"/admin/dashboard", label:"Dashboard", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { to:"/admin/students",  label:"Students",  svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg> },
    { to:"/admin/teachers",  label:"Teachers",  svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg> },
    { to:"/admin/classes",   label:"Classes",   svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
  ]},
  { section:"Academic", links:[
    { to:"/admin/attendance", label:"Attendance", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { to:"/admin/results",    label:"Results",    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg> },
    { to:"/admin/notices",    label:"Notices",    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg> },
    { to:"/admin/fees",       label:"Fees",       svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { to:"/admin/reports",    label:"Reports",    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  ]},
  { section:"System", links:[
    { to:"/admin/settings", label:"Settings", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg> },
  ]},
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); onClose(); };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:40, backdropFilter:"blur(2px)" }}/>
      )}

      {/* ✅ open-sidebar class lagao jab open ho */}
      <aside className={`sidebar-transition ${isOpen ? "open-sidebar" : ""}`}
        style={{ position:"fixed", left:0, top:0, height:"100%", width:"var(--sidebar-w)", background:"var(--sidebar-bg)", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", zIndex:50 }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🎓</div>
          <div style={{ flex:1 }}>
            <p style={{ color:"#fff", fontWeight:700, fontSize:14, margin:0 }}>EduSchool</p>
            <p style={{ color:"#475569", fontSize:11, margin:0 }}>School Portal</p>
          </div>
          {/* ✅ Close btn — CSS se show/hide */}
          <button className="sidebar-close-btn" onClick={onClose}
            style={{ background:"rgba(255,255,255,0.06)", border:"none", borderRadius:7, width:28, height:28, cursor:"pointer", color:"#64748b", fontSize:16, alignItems:"center", justifyContent:"center" }}>
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, overflowY:"auto", padding:"6px 10px" }}>
          {navItems.map(group => (
            <div key={group.section}>
              <p style={{ fontSize:10, fontWeight:700, color:"#334155", textTransform:"uppercase", letterSpacing:"1.5px", padding:"16px 10px 6px", margin:0 }}>{group.section}</p>
              {group.links.map(link => (
                <NavLink key={link.to} to={link.to} onClick={onClose}
                  style={({ isActive }) => ({
                    display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                    borderRadius:9, marginBottom:2, textDecoration:"none",
                    fontSize:13.5, fontWeight:500, transition:"all .15s",
                    background: isActive ? "linear-gradient(135deg,#4f46e5,#6366f1)" : "transparent",
                    color:      isActive ? "#fff" : "#64748b",
                  })}>
                  {link.svg}{link.label}
                </NavLink>
              ))}
            </div>
          ))}

          {/* Logout */}
          <div style={{ marginTop:8 }}>
            <button onClick={handleLogout} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", borderRadius:9, background:"transparent", border:"none", cursor:"pointer", fontSize:13.5, fontWeight:500, color:"#ef4444", fontFamily:"inherit", transition:"all .15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </nav>

        {/* Upgrade */}
        <div style={{ margin:"0 10px 14px", padding:"14px", borderRadius:14, background:"rgba(79,70,229,0.15)", border:"1px solid rgba(99,102,241,0.25)", textAlign:"center" }}>
          <p style={{ fontSize:18, margin:"0 0 4px" }}>👑</p>
          <p style={{ color:"#fff", fontSize:12, fontWeight:700, margin:0 }}>Upgrade to Premium</p>
          <p style={{ color:"#475569", fontSize:11, margin:"4px 0 10px" }}>Unlock more features</p>
          <button style={{ width:"100%", padding:"8px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Get Started</button>
        </div>
      </aside>
    </>
  );
}