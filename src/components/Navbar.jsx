import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header style={{
      height: 60, background:"var(--navbar-bg)",
      borderBottom:"1px solid var(--navbar-border)",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 20px", position:"sticky", top:0, zIndex:30,
      boxShadow:"0 1px 3px rgba(0,0,0,0.04)", transition:"background .3s",
    }}>
      {/* Left */}
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* ✅ Hamburger — class se CSS control karega */}
        <button className="hamburger-btn" onClick={onMenuClick}
          style={{ padding:8, borderRadius:9, border:"none", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:22,height:22}}>
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Search — hidden on mobile via CSS */}
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:10, padding:"8px 14px", width:260, transition:"all .3s" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search here..."
            style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
        </div>
      </div>

      {/* Right */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} title="Toggle Theme"
          style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border-input)", background:"var(--bg-input)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}>
          {isDark
            ? <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" style={{width:17,height:17}}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:17,height:17}}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>

        {/* Bell */}
        <button style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border-input)", background:"var(--bg-input)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", transition:"all .2s" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" style={{width:17,height:17}}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ position:"absolute", top:5, right:5, width:14, height:14, background:"#ef4444", borderRadius:"50%", color:"#fff", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>3</span>
        </button>

        {/* Admin Profile */}
        <div style={{ display:"flex", alignItems:"center", gap:8, paddingLeft:4, cursor:"pointer" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>A</div>
          <div className="admin-name-wrap" style={{ lineHeight:1.3 }}>
            <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)", margin:0 }}>Admin</p>
            <p style={{ fontSize:11, color:"var(--text-muted)", margin:0 }}>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}