import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth }  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id:1, title:"New notice published",    time:"2 hours ago",  icon:"📢", unread:true  },
  { id:2, title:"Attendance marked",       time:"1 day ago",    icon:"✅", unread:true  },
  { id:3, title:"Result uploaded",         time:"3 days ago",   icon:"📊", unread:false },
  { id:4, title:"Fee payment received",    time:"1 week ago",   icon:"💰", unread:false },
];

export default function Navbar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout }        = useAuth();
  const navigate                = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [showUser,  setShowUser]  = useState(false);
  const notifRef = useRef();
  const userRef  = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (userRef.current  && !userRef.current.contains(e.target))  setShowUser(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goProfile = () => {
    setShowUser(false);
    if (user?.role === "student") navigate("/student/profile");
    else if (user?.role === "teacher") navigate("/teacher/profile");
    else navigate("/admin/settings");
  };

  const imageUrl = user?.profile?.image || user?.image || null;
  const unreadCount = notifications.filter(n=>n.unread).length;

  const avatar = imageUrl
    ? <img src={`https://eduschool-backend-production.up.railway.app${imageUrl}`
} alt="avatar"
        style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", border:"2px solid #4f46e5" }}/>
    : <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700 }}>
        {user?.name?.[0]?.toUpperCase() || "A"}
      </div>;

  return (
    <header style={{ height:60, background:"var(--navbar-bg)", borderBottom:"1px solid var(--navbar-border)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", position:"sticky", top:0, zIndex:30, boxShadow:"0 1px 3px rgba(0,0,0,0.04)", transition:"background .3s" }}>

      {/* Left */}
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button className="hamburger-btn" onClick={onMenuClick}
          style={{ padding:8, borderRadius:9, border:"none", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:22,height:22}}>
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:10, padding:"8px 14px", width:240 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search here..." style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
        </div>
      </div>

      {/* Right */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>

        {/* Dark Mode */}
        <button onClick={toggleTheme} title="Toggle Theme"
          style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border-input)", background:"var(--bg-input)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}>
          {isDark
            ? <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" style={{width:17,height:17}}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:17,height:17}}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>

        {/* ✅ Bell Notification */}
        <div ref={notifRef} style={{ position:"relative" }}>
          <button onClick={()=>{ setShowNotif(!showNotif); setShowUser(false); }}
            style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border-input)", background:"var(--bg-input)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", transition:"all .2s" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:17,height:17}}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span style={{ position:"absolute", top:4, right:4, width:16, height:16, background:"#ef4444", borderRadius:"50%", color:"#fff", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{unreadCount}</span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotif && (
            <div style={{ position:"absolute", right:0, top:44, width:320, background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, boxShadow:"0 8px 30px rgba(0,0,0,0.15)", zIndex:100, overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderBottom:"1px solid var(--border)" }}>
                <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Notifications</p>
                <span style={{ fontSize:11, fontWeight:700, color:"#4f46e5", background:"#eef2ff", padding:"2px 8px", borderRadius:20 }}>{unreadCount} New</span>
              </div>
              {notifications.map(n=>(
                <div key={n.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:"1px solid var(--border)", background:n.unread?"rgba(79,70,229,0.04)":"transparent", cursor:"pointer", transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                  onMouseLeave={e=>e.currentTarget.style.background=n.unread?"rgba(79,70,229,0.04)":"transparent"}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{n.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:n.unread?600:400, color:"var(--text-primary)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n.title}</p>
                    <p style={{ fontSize:11, color:"var(--text-muted)", margin:"2px 0 0" }}>{n.time}</p>
                  </div>
                  {n.unread && <div style={{ width:8, height:8, borderRadius:"50%", background:"#4f46e5", flexShrink:0 }}/>}
                </div>
              ))}
              <div style={{ padding:"10px 16px", textAlign:"center" }}>
                <button style={{ fontSize:13, color:"#4f46e5", fontWeight:600, border:"none", background:"none", cursor:"pointer" }}>View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ User Dropdown */}
        <div ref={userRef} style={{ position:"relative" }}>
          <div onClick={()=>{ setShowUser(!showUser); setShowNotif(false); }}
            style={{ display:"flex", alignItems:"center", gap:8, paddingLeft:6, cursor:"pointer", borderRadius:10, padding:"6px 10px", transition:"background .15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--bg-input)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {avatar}
            <div className="nav-username">
              <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)", margin:0 }}>{user?.name || "User"}</p>
              <p style={{ fontSize:11, color:"var(--text-muted)", margin:0, textTransform:"capitalize" }}>{user?.role || "Guest"}</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:14,height:14,transition:"transform .2s",transform:showUser?"rotate(180deg)":"rotate(0)"}}>
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </div>

          {/* User Dropdown Menu */}
          {showUser && (
            <div style={{ position:"absolute", right:0, top:50, width:200, background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:12, boxShadow:"0 8px 30px rgba(0,0,0,0.15)", zIndex:100, overflow:"hidden" }}>
              {/* User info */}
              <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10 }}>
                {avatar}
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)", margin:0 }}>{user?.name}</p>
                  <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>{user?.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              {[
                { icon:"👤", label:"My Profile",  action: goProfile },
                { icon:"⚙️", label:"Settings",    action: ()=>{ setShowUser(false); navigate(user?.role==="admin"?"/admin/settings":user?.role==="student"?"/student/settings":"/teacher/profile"); } },
              ].map((item,i)=>(
                <button key={i} onClick={item.action}
                  style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"11px 16px", border:"none", background:"transparent", cursor:"pointer", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", textAlign:"left", transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-input)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div style={{ borderTop:"1px solid var(--border)" }}>
                <button onClick={handleLogout}
                  style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"11px 16px", border:"none", background:"transparent", cursor:"pointer", fontSize:13, color:"#ef4444", fontFamily:"inherit", textAlign:"left", transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.06)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:15,height:15}}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-username { display: none; }
        }
      `}</style>
    </header>
  );
}