import { useState } from "react";

const initialData = [
  { id:"01", roll:"10-A-01", name:"Ahmed Khan",  class:"10-A", status:"Present", time:"08:00 AM" },
  { id:"02", roll:"10-A-02", name:"Ali Raza",    class:"10-A", status:"Present", time:"08:01 AM" },
  { id:"03", roll:"9-B-03",  name:"Hamza Ali",   class:"9-B",  status:"Absent",  time:"08:02 AM" },
  { id:"04", roll:"9-A-04",  name:"Saad Ahmed",  class:"9-A",  status:"Present", time:"08:03 AM" },
  { id:"05", roll:"8-A-05",  name:"Usman Tariq", class:"8-A",  status:"Present", time:"08:05 AM" },
  { id:"06", roll:"8-B-06",  name:"Bilal Khan",  class:"8-B",  status:"Present", time:"08:06 AM" },
  { id:"07", roll:"7-C-07",  name:"Zain Abbas",  class:"7-C",  status:"Present", time:"08:07 AM" },
];

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

export default function TeacherAttendance() {
  const [data,      setData]      = useState(initialData);
  const [selClass,  setSelClass]  = useState("10-A");
  const [date,      setDate]      = useState(new Date().toISOString().split("T")[0]);
  const [editRow,   setEditRow]   = useState(null);
  const [showAdd,   setShowAdd]   = useState(false);
  const [addForm,   setAddForm]   = useState({ roll:"", name:"", class:"10-A", status:"Present", time:"" });

  const present = data.filter(s=>s.status==="Present").length;
  const absent  = data.filter(s=>s.status==="Absent").length;
  const late    = data.filter(s=>s.status==="Late").length;
  const pct     = Math.round((present/data.length)*100);

  // Toggle Present/Absent directly in table
  const toggle = (id) => setData(data.map(s => s.id===id ? { ...s, status:s.status==="Present"?"Absent":"Present" } : s));

  const saveEdit = () => {
    setData(data.map(s => s.id===editRow.id ? { ...editRow } : s));
    setEditRow(null);
  };

  const handleAdd = () => {
    if (!addForm.name || !addForm.roll) return;
    setData([...data, { id:String(data.length+1).padStart(2,"0"), ...addForm }]);
    setAddForm({ roll:"", name:"", class:"10-A", status:"Present", time:"" });
    setShowAdd(false);
  };

  const badge = v => (
    <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700,
      background:v==="Present"?"var(--bg-badge-green)":v==="Late"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
      color:v==="Present"?"var(--text-green)":v==="Late"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
  );

  const Modal = ({ title, form, setForm, onSave, onClose }) => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={onClose}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:420, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        {[
          { key:"name",   label:"Student Name"                                                    },
          { key:"roll",   label:"Roll No"                                                         },
          { key:"class",  label:"Class",  sel:true, opts:["10-A","10-B","9-A","9-B","8-A","8-B","7-C"] },
          { key:"status", label:"Status", sel:true, opts:["Present","Absent","Late"]              },
          { key:"time",   label:"Time",   placeholder:"e.g. 08:00 AM"                            },
        ].map(f=>(
          <div key={f.key} style={{ marginBottom:13 }}>
            <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
            {f.sel
              ? <select value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}>
                  {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              : <input type="text" placeholder={f.placeholder||`Enter ${f.label}`} value={form[f.key]||""}
                  onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}
                  onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
            }
          </div>
        ))}
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:18 }}>
          <button onClick={onClose} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>Cancel</button>
          <button onClick={onSave} style={{ padding:"9px 24px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"24px 20px", transition:"background .3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Attendance</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Attendance</p>
        </div>
        <button onClick={()=>setShowAdd(true)}
          style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
          ➕ Add Record
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}/>
        <select value={selClass} onChange={e=>setSelClass(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
          {["10-A","10-B","9-A","9-B","8-A","8-B","7-C"].map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="ta-stats">
        {[
          { label:"Total Students", value:data.length, color:"#4f46e5", icon:"👥" },
          { label:"Present",        value:present,     color:"#16a34a", icon:"✅" },
          { label:"Absent",         value:absent,      color:"#dc2626", icon:"❌" },
          { label:"Attendance",     value:`${pct}%`,   color:"#d97706", icon:"📊" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", boxShadow:"var(--shadow)", textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", margin:"0 0 16px" }}>
          Attendance Sheet — {selClass} &nbsp;
          <span style={{ fontSize:12, color:"var(--text-muted)", fontWeight:400 }}>({date})</span>
        </h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:540 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["#","Roll No","Student Name","Status","Time","Toggle","Action"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((s,i)=>(
                <tr key={s.id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}>
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.roll}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                      <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px" }}>{badge(s.status)}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.time}</td>
                  {/* Quick Toggle */}
                  <td style={{ padding:"12px 14px" }}>
                    <button onClick={()=>toggle(s.id)}
                      style={{ padding:"5px 12px", border:"none", borderRadius:7, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit", whiteSpace:"nowrap",
                        background:s.status==="Present"?"#fef2f2":"#f0fdf4",
                        color:s.status==="Present"?"#dc2626":"#16a34a" }}>
                      {s.status==="Present"?"Mark Absent":"Mark Present"}
                    </button>
                  </td>
                  {/* Edit + Delete */}
                  <td style={{ padding:"12px 14px" }}>
                    <button title="Edit" onClick={()=>setEditRow({...s})}
                      style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button title="Delete" onClick={()=>setData(data.filter(r=>r.id!==s.id))}
                      style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background="#ef4444";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.querySelector("svg").style.stroke="#ef4444";}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}>
                        <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
                        <path d="M10,11v6"/><path d="M14,11v6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:14 }}>Showing {data.length} of {data.length} students</p>
      </div>

      {editRow && <Modal title="✏️ Edit Attendance" form={editRow} setForm={setEditRow} onSave={saveEdit} onClose={()=>setEditRow(null)}/>}
      {showAdd  && <Modal title="➕ Add Attendance" form={addForm} setForm={setAddForm} onSave={handleAdd} onClose={()=>setShowAdd(false)}/>}

      <style>{`
        .ta-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .ta-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}