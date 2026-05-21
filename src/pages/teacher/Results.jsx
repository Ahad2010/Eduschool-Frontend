import { useState } from "react";

const initialData = [
  { id:"01", roll:"10-A-01", name:"Ahmed Khan",  physics:85, chemistry:90, total:175, grade:"A+" },
  { id:"02", roll:"10-A-02", name:"Ali Raza",    physics:78, chemistry:82, total:160, grade:"A"  },
  { id:"03", roll:"9-B-03",  name:"Hamza Ali",   physics:72, chemistry:75, total:147, grade:"B+" },
  { id:"04", roll:"9-A-04",  name:"Saad Ahmed",  physics:90, chemistry:92, total:182, grade:"A+" },
  { id:"05", roll:"8-A-05",  name:"Usman Tariq", physics:65, chemistry:68, total:133, grade:"B"  },
  { id:"06", roll:"8-B-06",  name:"Bilal Khan",  physics:88, chemistry:85, total:173, grade:"A"  },
  { id:"07", roll:"7-C-07",  name:"Zain Abbas",  physics:72, chemistry:70, total:142, grade:"B+" },
];

const GRADES = ["A+","A","B+","B","C","D","F"];
const gradeColor = g => ({"A+":"var(--text-green)","A":"var(--text-green)","B+":"var(--text-blue)","B":"var(--text-blue)","C":"var(--text-amber)","D":"var(--text-red)","F":"var(--text-red)"}[g]||"var(--text-primary)");

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

export default function TeacherResults() {
  const [data,     setData]     = useState(initialData);
  const [exam,     setExam]     = useState("Annual Exam 2025");
  const [cls,      setCls]      = useState("10-A");
  const [editRow,  setEditRow]  = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [addForm,  setAddForm]  = useState({ roll:"", name:"", physics:"", chemistry:"", total:"", grade:"A" });

  const openEdit = (row) => setEditRow({ ...row });

  const saveEdit = () => {
    const r = editRow;
    const total = Number(r.physics) + Number(r.chemistry);
    const pct   = Math.round(total / 200 * 100);
    const grade = pct>=90?"A+":pct>=80?"A":pct>=70?"B+":pct>=60?"B":pct>=50?"C":pct>=40?"D":"F";
    setData(data.map(s => s.id===r.id ? { ...r, total, grade } : s));
    setEditRow(null);
  };

  const handleAdd = () => {
    if (!addForm.name || !addForm.roll) return;
    const total = Number(addForm.physics) + Number(addForm.chemistry);
    const pct   = Math.round(total/200*100);
    const grade = pct>=90?"A+":pct>=80?"A":pct>=70?"B+":pct>=60?"B":pct>=50?"C":pct>=40?"D":"F";
    setData([...data, { id:String(data.length+1).padStart(2,"0"), ...addForm, physics:Number(addForm.physics), chemistry:Number(addForm.chemistry), total, grade }]);
    setAddForm({ roll:"", name:"", physics:"", chemistry:"", total:"", grade:"A" });
    setShowAdd(false);
  };

  const Modal = ({ title, form, setForm, onSave, onClose }) => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={onClose}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:420, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { key:"name",      label:"Student Name",    col:"1/-1" },
            { key:"roll",      label:"Roll No"                     },
            { key:"physics",   label:"Physics (100)",   num:true   },
            { key:"chemistry", label:"Chemistry (100)", num:true   },
          ].map(f=>(
            <div key={f.key} style={{ gridColumn:f.col||"auto" }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
              <input type={f.num?"number":"text"} placeholder={`Enter ${f.label}`} value={form[f.key]||""}
                onChange={e=>setForm({...form,[f.key]:e.target.value})}
                max={f.num?100:undefined} min={f.num?0:undefined}
                style={inp}
                onFocus={e=>e.target.style.borderColor="#6366f1"}
                onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, padding:"10px 14px", background:"var(--bg-input)", borderRadius:9, border:"1px solid var(--border)" }}>
          <p style={{ fontSize:12, color:"var(--text-muted)", margin:0 }}>
            💡 Total & Grade will be auto-calculated on save
          </p>
        </div>
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
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Results</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Results</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setShowAdd(true)}
            style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            ➕ Add Result
          </button>
          <button style={{ padding:"9px 18px", background:"var(--bg-card)", color:"var(--text-secondary)", border:"1px solid var(--border-input)", borderRadius:9, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            📤 Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <select value={exam} onChange={e=>setExam(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
          <option>Annual Exam 2025</option><option>Mid Term 2025</option>
        </select>
        <select value={cls} onChange={e=>setCls(e.target.value)}
          style={{ padding:"9px 14px", background:"var(--bg-card)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit" }}>
          {["10-A","9-B","9-A","8-A","8-B","7-C"].map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }} className="res-stats">
        {[
          { label:"Total Students", value:data.length,                                              color:"#4f46e5" },
          { label:"Passed",         value:data.filter(s=>s.grade!=="F"&&s.grade!=="D").length,      color:"#16a34a" },
          { label:"Failed",         value:data.filter(s=>s.grade==="F"||s.grade==="D").length,      color:"#dc2626" },
          { label:"Avg Score",      value:`${Math.round(data.reduce((a,s)=>a+s.total,0)/data.length)}`, color:"#d97706" },
        ].map((c,i)=>(
          <div key={i} style={{ background:"var(--bg-card)", borderRadius:12, padding:"16px", border:"1px solid var(--border)", textAlign:"center" }}>
            <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, margin:"0 0 4px", textTransform:"uppercase" }}>{c.label}</p>
            <p style={{ fontSize:24, fontWeight:800, color:c.color, margin:0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:580 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["#","Roll No","Student Name","Physics","Chemistry","Total","Grade","Action"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((s,i)=>(
                <tr key={s.id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{i+1}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.roll}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                      <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.physics}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.chemistry}</td>
                  <td style={{ padding:"12px 14px", fontWeight:700, color:"var(--text-primary)" }}>{s.total}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ fontWeight:800, fontSize:14, color:gradeColor(s.grade) }}>{s.grade}</span>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    {/* Edit */}
                    <button title="Edit Marks" onClick={()=>openEdit(s)}
                      style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background="#4f46e5";e.currentTarget.querySelector("svg").style.stroke="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.querySelector("svg").style.stroke="#4f46e5";}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .15s"}}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    {/* Delete */}
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

      {/* Edit Modal */}
      {editRow && (
        <Modal title="✏️ Edit Student Marks" form={editRow} setForm={setEditRow} onSave={saveEdit} onClose={()=>setEditRow(null)}/>
      )}
      {/* Add Modal */}
      {showAdd && (
        <Modal title="➕ Add Result" form={addForm} setForm={setAddForm} onSave={handleAdd} onClose={()=>setShowAdd(false)}/>
      )}

      <style>{`
        .res-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:768px){ .res-stats{ grid-template-columns:repeat(2,1fr) !important; gap:10px !important; } }
      `}</style>
    </div>
  );
}