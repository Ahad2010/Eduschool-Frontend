import { useState } from "react";

const initialData = [
  { id:"01", roll:"10-A-01", name:"Ahmed Khan",  class:"10-A", total:5000, paid:5000, due:0,    status:"Paid"    },
  { id:"02", roll:"10-B-02", name:"Ali Raza",    class:"10-B", total:5000, paid:4000, due:1000, status:"Partial" },
  { id:"03", roll:"9-A-03",  name:"Hamza Ali",   class:"9-A",  total:4500, paid:0,    due:4500, status:"Due"     },
  { id:"04", roll:"9-B-04",  name:"Saad Ahmed",  class:"9-B",  total:4500, paid:4500, due:0,    status:"Paid"    },
  { id:"05", roll:"8-A-05",  name:"Usman Tariq", class:"8-A",  total:4000, paid:3000, due:1000, status:"Partial" },
  { id:"06", roll:"8-B-06",  name:"Bilal Khan",  class:"8-B",  total:4000, paid:4000, due:0,    status:"Paid"    },
  { id:"07", roll:"7-A-07",  name:"Ayesha Malik",class:"7-A",  total:3500, paid:0,    due:3500, status:"Due"     },
  { id:"08", roll:"7-B-08",  name:"Zain Abbas",  class:"7-B",  total:3500, paid:3500, due:0,    status:"Paid"    },
  { id:"09", roll:"6-A-09",  name:"Sara Noor",   class:"6-A",  total:3000, paid:3000, due:0,    status:"Paid"    },
  { id:"10", roll:"6-B-10",  name:"Hassan Mir",  class:"6-B",  total:3000, paid:1500, due:1500, status:"Partial" },
];

const CLASSES  = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];
const STATUSES = ["Paid","Partial","Due"];
const ITEMS    = 8;

export default function Fees() {
  const [data,    setData]    = useState(initialData);
  const [search,  setSearch]  = useState("");
  const [page,    setPage]    = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [form,    setForm]    = useState({ roll:"", name:"", class:"", total:"", paid:"", due:"", status:"Due" });

  const filtered   = data.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated  = filtered.slice((page-1)*ITEMS, page*ITEMS);

  // Stats
  const totalFees   = data.reduce((a,s) => a + s.total, 0);
  const paidFees    = data.reduce((a,s) => a + s.paid,  0);
  const pendingFees = data.reduce((a,s) => a + s.due,   0);
  const collected   = Math.round((paidFees / totalFees) * 100);

  const handleSave = () => {
    if (!form.name || !form.class || !form.total) return;
    if (editRow) {
      setData(data.map(r => r.id === editRow ? { ...r, ...form, total:+form.total, paid:+form.paid, due:+form.due } : r));
      setEditRow(null);
    } else {
      setData([...data, { id:String(data.length+1).padStart(2,"0"), ...form, total:+form.total, paid:+form.paid, due:+form.due }]);
      setShowAdd(false);
    }
    setForm({ roll:"", name:"", class:"", total:"", paid:"", due:"", status:"Due" });
  };

  const openEdit = (row) => {
    setForm({ ...row, total:String(row.total), paid:String(row.paid), due:String(row.due) });
    setEditRow(row.id);
  };

  const statusStyle = (s) => ({
    padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700, display:"inline-block",
    background: s==="Paid"?"var(--bg-badge-green)":s==="Partial"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      s==="Paid"?"var(--text-green)"    :s==="Partial"?"var(--text-amber)"    :"var(--text-red)",
  });

  const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  const Modal = () => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={() => { setShowAdd(false); setEditRow(null); }}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:440, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{editRow ? "✏️ Edit Fee Record" : "➕ Add Fee Record"}</h3>
          <button onClick={() => { setShowAdd(false); setEditRow(null); }} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { key:"name",  label:"Student Name", col:"1/-1" },
            { key:"class", label:"Class",         sel:true   },
            { key:"roll",  label:"Roll No"                   },
            { key:"total", label:"Total Fees",    num:true   },
            { key:"paid",  label:"Paid Amount",   num:true   },
            { key:"due",   label:"Due Amount",    num:true   },
            { key:"status",label:"Status",        sel2:true, col:"1/-1" },
          ].map(f => (
            <div key={f.key} style={{ gridColumn: f.col || "auto" }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
              {f.sel ? (
                <select value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} style={inp}>
                  <option value="">Select</option>
                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : f.sel2 ? (
                <select value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} style={inp}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <input type={f.num?"number":"text"} placeholder={`Enter ${f.label}`} value={form[f.key]}
                  onChange={e => setForm({...form,[f.key]:e.target.value})} style={inp}
                  onFocus={e => e.target.style.borderColor="#6366f1"}
                  onBlur={e  => e.target.style.borderColor="var(--border-input)"}/>
              )}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
          <button onClick={() => { setShowAdd(false); setEditRow(null); }} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
          <button onClick={handleSave} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>
            {editRow ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Fees</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Fees</p>
        </div>
        <button onClick={() => { setShowAdd(true); setForm({ roll:"", name:"", class:"", total:"", paid:"", due:"", status:"Due" }); }}
          style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 12px rgba(79,70,229,0.3)" }}>
          ＋ Add Fee
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="fees-stats">
        {[
          { label:"Total Fees",    value:`Rs. ${totalFees.toLocaleString()}`,   color:"#4f46e5", borderColor:"#4f46e5", icon:"💰" },
          { label:"Paid Fees",     value:`Rs. ${paidFees.toLocaleString()}`,    color:"#16a34a", borderColor:"#16a34a", icon:"✅" },
          { label:"Pending Fees",  value:`Rs. ${pendingFees.toLocaleString()}`, color:"#dc2626", borderColor:"#dc2626", icon:"⏳" },
          { label:"Collected",     value:`${collected}%`,                       color:"#d97706", borderColor:"#d97706", icon:"📊" },
        ].map((c,i) => (
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px 20px", border:"1px solid var(--border)", borderTop:`3px solid ${c.borderColor}`, boxShadow:"var(--shadow)", transition:"transform .2s", cursor:"pointer" }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
            <p style={{ fontSize:12, color:"var(--text-muted)", fontWeight:600, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{c.label}</p>
            <p style={{ fontSize:26, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── TABLE CARD ── */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>

        {/* Search */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", flex:1, maxWidth:280 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search student..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Showing {paginated.length} of {filtered.length} entries</span>
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:620 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["Roll No","Student Name","Class","Total Fees","Paid Fees","Due Fees","Status","Action"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((s,i) => (
                <tr key={s.id}
                  style={{ background:i%2===0?"var(--bg-card)":"var(--bg-input)", borderBottom:"1px solid var(--border)", transition:"background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background="var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.roll}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                      <span style={{ fontWeight:600, color:"var(--text-primary)", fontSize:13 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:13 }}>{s.class}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-primary)", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>Rs. {s.total.toLocaleString()}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-green)", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>Rs. {s.paid.toLocaleString()}</td>
                  <td style={{ padding:"12px 14px", color: s.due > 0 ? "var(--text-red)" : "var(--text-muted)", fontWeight: s.due > 0 ? 700 : 400, fontSize:13, whiteSpace:"nowrap" }}>
                    Rs. {s.due.toLocaleString()}
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={statusStyle(s.status)}>{s.status}</span>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <button title="Edit" onClick={() => openEdit(s)}
                      style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background="#4f46e5"; e.currentTarget.querySelector("svg").style.stroke="#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="#eef2ff"; e.currentTarget.querySelector("svg").style.stroke="#4f46e5"; }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .2s"}}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button title="Delete" onClick={() => setData(data.filter(r => r.id !== s.id))}
                      style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background="#ef4444"; e.currentTarget.querySelector("svg").style.stroke="#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="#fef2f2"; e.currentTarget.querySelector("svg").style.stroke="#ef4444"; }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .2s"}}>
                        <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
                        <path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, fontSize:13, color:"var(--text-muted)", flexWrap:"wrap", gap:10 }}>
            <span>Showing {(page-1)*ITEMS+1}–{Math.min(page*ITEMS, filtered.length)} of {filtered.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={() => setPage(Math.max(1,page-1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>‹</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setPage(p)} style={{ width:30,height:30,border:"none",borderRadius:7,cursor:"pointer",fontWeight:600,fontSize:13, background:p===page?"#4f46e5":"var(--bg-input)", color:p===page?"#fff":"var(--text-secondary)" }}>{p}</button>
              ))}
              <button onClick={() => setPage(Math.min(totalPages,page+1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {(showAdd || editRow) && <Modal />}

      <style>{`
        .fees-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .fees-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 400px) {
          .fees-stats {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}