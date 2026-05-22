import { useState, useEffect } from "react";
import { getPendingAPI, approveUserAPI } from "../../services/api";

export default function Approvals() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg,     setMsg]     = useState("");

  const fetchPending = async () => {
    try {
      const res = await getPendingAPI();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (id, status) => {
    try {
      await approveUserAPI(id, { status });
      setMsg(`User ${status} successfully!`);
      fetchPending(); // refresh list
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Pending Approvals</h1>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Approvals</p>
      </div>

      {msg && (
        <div style={{ background:msg.includes("Error")?"rgba(239,68,68,0.1)":"rgba(22,163,74,0.1)", border:`1px solid ${msg.includes("Error")?"rgba(239,68,68,0.2)":"rgba(22,163,74,0.2)"}`, borderRadius:10, padding:"10px 16px", marginBottom:20 }}>
          <p style={{ color:msg.includes("Error")?"#f87171":"#4ade80", fontSize:13, margin:0, fontWeight:600 }}>{msg}</p>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign:"center", padding:60 }}>
          <p style={{ color:"var(--text-muted)", fontSize:14 }}>Loading...</p>
        </div>
      ) : users.length === 0 ? (
        <div style={{ background:"var(--bg-card)", borderRadius:16, padding:48, border:"1px solid var(--border)", textAlign:"center" }}>
          <p style={{ fontSize:40, marginBottom:12 }}>✅</p>
          <p style={{ color:"var(--text-primary)", fontSize:16, fontWeight:700, margin:0 }}>No Pending Approvals</p>
          <p style={{ color:"var(--text-muted)", fontSize:13, marginTop:6 }}>All users have been reviewed.</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {users.map(u => (
            <div key={u._id} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:18, fontWeight:700, flexShrink:0 }}>
                  {u.name[0]}
                </div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", margin:0 }}>{u.name}</p>
                  <p style={{ fontSize:12, color:"var(--text-muted)", margin:"2px 0 0" }}>{u.email}</p>
                  <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, marginTop:4, display:"inline-block",
                    background:u.role==="student"?"#eef2ff":"#f0fdf4",
                    color:u.role==="student"?"#4f46e5":"#16a34a" }}>
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </div>
              </div>

              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>handleAction(u._id,"approved")}
                  style={{ padding:"9px 20px", background:"linear-gradient(135deg,#16a34a,#059669)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                  ✅ Approve
                </button>
                <button onClick={()=>handleAction(u._id,"rejected")}
                  style={{ padding:"9px 20px", background:"linear-gradient(135deg,#dc2626,#ef4444)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}