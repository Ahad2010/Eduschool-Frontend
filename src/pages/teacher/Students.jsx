import { useState } from "react";

const initialStudents = [
  { id:"01", roll:"10-A-01", name:"Ahmed Khan",  class:"10-A", email:"ahmed@gmail.com",  phone:"1234567890", attendance:"95%", grade:"A+" },
  { id:"02", roll:"10-A-02", name:"Ali Raza",    class:"10-A", email:"ali@gmail.com",    phone:"1234567891", attendance:"88%", grade:"A"  },
  { id:"03", roll:"9-B-03",  name:"Hamza Ali",   class:"9-B",  email:"hamza@gmail.com",  phone:"1234567892", attendance:"75%", grade:"B+" },
  { id:"04", roll:"9-A-04",  name:"Saad Ahmed",  class:"9-A",  email:"saad@gmail.com",   phone:"1234567893", attendance:"92%", grade:"A+" },
  { id:"05", roll:"8-A-05",  name:"Usman Tariq", class:"8-A",  email:"usman@gmail.com",  phone:"1234567894", attendance:"80%", grade:"B"  },
  { id:"06", roll:"8-B-06",  name:"Bilal Khan",  class:"8-B",  email:"bilal@gmail.com",  phone:"1234567895", attendance:"90%", grade:"A"  },
  { id:"07", roll:"7-C-07",  name:"Zain Abbas",  class:"7-C",  email:"zain@gmail.com",   phone:"1234567896", attendance:"85%", grade:"B+" },
  { id:"08", roll:"7-B-08",  name:"Ayesha Malik",class:"7-B",  email:"ayesha@gmail.com", phone:"1234567897", attendance:"97%", grade:"A+" },
];

const CLASSES = ["10-A","10-B","9-A","9-B","8-A","8-B","7-B","7-C"];
const GRADES  = ["A+","A","B+","B","C","D","F"];
const ITEMS   = 8;

const inp = { width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

export default function TeacherStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [editRow,  setEditRow]  = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [addForm,  setAddForm]  = useState({ roll:"", name:"", class:"", email:"", phone:"", attendance:"", grade:"A" });

  const filtered   = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated  = filtered.slice((page-1)*ITEMS, page*ITEMS);

  const saveEdit = () => {
    setStudents(students.map(s => s.id===editRow.id ? { ...editRow } : s));
    setEditRow(null);
  };

  const handleAdd = () => {
    if (!addForm.name || !addForm.class) return;
    setStudents([...students, { id:String(students.length+1).padStart(2,"0"), ...addForm }]);
    setAddForm({ roll:"", name:"", class:"", email:"", phone:"", attendance:"", grade:"A" });
    setShowAdd(false);
  };

  const gradeColor = g => ({"A+":"var(--text-green)","A":"var(--text-green)","B+":"var(--text-blue)","B":"var(--text-blue)","C":"var(--text-amber)","D":"var(--text-red)","F":"var(--text-red)"}[g]||"var(--text-primary)");

  const Modal = ({ title, form, setForm, onSave, onClose }) => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={onClose}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px", width:"100%", maxWidth:440, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { key:"name",       label:"Full Name",   col:"1/-1"                                },
            { key:"class",      label:"Class",       sel:true, opts:CLASSES                    },
            { key:"roll",       label:"Roll No"                                                },
            { key:"email",      label:"Email",       type:"email", col:"1/-1"                  },
            { key:"phone",      label:"Phone"                                                  },
            { key:"attendance", label:"Attendance %"                                           },
            { key:"grade",      label:"Grade",       sel:true, opts:GRADES                     },
          ].map(f=>(
            <div key={f.key} style={{ gridColumn:f.col||"auto" }}>
              <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
              {f.sel
                ? <select value={form[f.key]||""} onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}>
                    <option value="">Select</option>
                    {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                : <input type={f.type||"text"} placeholder={`Enter ${f.label}`} value={form[f.key]||""}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp}
                    onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
              }
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
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
          <h1 style={{ fontSize:20, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Students</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Students</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setShowAdd(true)}
            style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            ➕ Add Student
          </button>
          <button style={{ padding:"9px 18px", background:"var(--bg-card)", color:"var(--text-secondary)", border:"1px solid var(--border-input)", borderRadius:9, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            📤 Export
          </button>
        </div>
      </div>

      <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", flex:1, maxWidth:280 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search student..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Total: {filtered.length} students</span>
        </div>

        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:600 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["#","Roll No","Student Name","Class","Attendance","Grade","Action"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((s,i)=>(
                <tr key={s.id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"var(--bg-card)":"var(--bg-input)" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}>
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:12 }}>{(page-1)*ITEMS+i+1}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)", fontSize:12 }}>{s.roll}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                      <div>
                        <p style={{ fontWeight:600, color:"var(--text-primary)", margin:0, fontSize:13 }}>{s.name}</p>
                        <p style={{ color:"var(--text-muted)", margin:0, fontSize:11 }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.class}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, height:5, background:"var(--border-input)", borderRadius:3, maxWidth:60 }}>
                        <div style={{ height:"100%", width:s.attendance, background:"#4f46e5", borderRadius:3 }}/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)" }}>{s.attendance}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ fontWeight:800, fontSize:14, color:gradeColor(s.grade) }}>{s.grade}</span>
                  </td>
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
                    <button title="Delete" onClick={()=>setStudents(students.filter(r=>r.id!==s.id))}
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

        {totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, fontSize:13, color:"var(--text-muted)", flexWrap:"wrap", gap:10 }}>
            <span>Showing {(page-1)*ITEMS+1}–{Math.min(page*ITEMS,filtered.length)} of {filtered.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>‹</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                <button key={p} onClick={()=>setPage(p)} style={{ width:30,height:30,border:"none",borderRadius:7,cursor:"pointer",fontWeight:600,fontSize:13, background:p===page?"#4f46e5":"var(--bg-input)", color:p===page?"#fff":"var(--text-secondary)" }}>{p}</button>
              ))}
              <button onClick={()=>setPage(Math.min(totalPages,page+1))} style={{ width:30,height:30,border:"1px solid var(--border-input)",borderRadius:7,background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer" }}>›</button>
            </div>
          </div>
        )}
      </div>

      {editRow && <Modal title="✏️ Edit Student" form={editRow} setForm={setEditRow} onSave={saveEdit} onClose={()=>setEditRow(null)}/>}
      {showAdd  && <Modal title="➕ Add Student"  form={addForm} setForm={setAddForm} onSave={handleAdd} onClose={()=>setShowAdd(false)}/>}
    </div>
  );
}