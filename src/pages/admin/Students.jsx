import { useState } from "react";

const studentsData = [
  { id:"01", rollNo:"10-A-01", name:"Ahmed Khan",   class:"10-A", email:"ahmed@example.com",  phone:"1234567890", status:"Present" },
  { id:"02", rollNo:"10-B-02", name:"Ali Raza",     class:"10-B", email:"ali@example.com",    phone:"1234567891", status:"Present" },
  { id:"03", rollNo:"9-A-03",  name:"Hamza Ali",    class:"9-A",  email:"hamza@example.com",  phone:"1234567892", status:"Absent"  },
  { id:"04", rollNo:"9-B-04",  name:"Saad Ahmed",   class:"9-B",  email:"saad@example.com",   phone:"1234567893", status:"Present" },
  { id:"05", rollNo:"8-A-05",  name:"Usman Tariq",  class:"8-A",  email:"usman@example.com",  phone:"1234567894", status:"Present" },
  { id:"06", rollNo:"8-B-06",  name:"Bilal Khan",   class:"8-B",  email:"bilal@example.com",  phone:"1234567895", status:"Absent"  },
  { id:"07", rollNo:"7-A-07",  name:"Ayesha Malik", class:"7-A",  email:"ayesha@example.com", phone:"1234567896", status:"Present" },
  { id:"08", rollNo:"7-B-08",  name:"Zain Abbas",   class:"7-B",  email:"zain@example.com",   phone:"1234567897", status:"Present" },
  { id:"09", rollNo:"6-A-09",  name:"Sara Noor",    class:"6-A",  email:"sara@example.com",   phone:"1234567898", status:"Present" },
  { id:"10", rollNo:"6-B-10",  name:"Hassan Mir",   class:"6-B",  email:"hassan@example.com", phone:"1234567899", status:"Absent"  },
];

const ITEMS_PER_PAGE = 8;
const CLASSES = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];

export default function Students() {
  const [students,    setStudents]    = useState(studentsData);
  const [search,      setSearch]      = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Add Modal
  const [showAdd,  setShowAdd]  = useState(false);
  const [addForm,  setAddForm]  = useState({ name:"", class:"", email:"", phone:"" });

  // ✅ Edit Modal
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null); // selected student

  const filtered   = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);

  // ── Add Student ──
  const handleAdd = () => {
    if (!addForm.name || !addForm.class || !addForm.email || !addForm.phone) return;
    setStudents([...students, {
      id:     String(students.length+1).padStart(2,"0"),
      rollNo: `${addForm.class}-${students.length+1}`,
      name:   addForm.name, class: addForm.class,
      email:  addForm.email, phone: addForm.phone, status:"Present",
    }]);
    setAddForm({ name:"", class:"", email:"", phone:"" });
    setShowAdd(false);
  };

  // ── Delete ──
  const handleDelete = (id) => setStudents(students.filter(s => s.id !== id));

  // ✅ Open Edit Modal
  const handleEditOpen = (student) => {
    setEditForm({ ...student }); // copy student data into form
    setShowEdit(true);
  };

  // ✅ Save Edit
  const handleEditSave = () => {
    if (!editForm.name || !editForm.class || !editForm.email || !editForm.phone) return;
    setStudents(students.map(s => s.id === editForm.id ? { ...editForm } : s));
    setShowEdit(false);
    setEditForm(null);
  };

  // Styles
  const inp = (err) => ({
    width:"100%", padding:"10px 13px",
    background:"var(--bg-input)", border:`1.5px solid ${err?"#ef4444":"var(--border-input)"}`,
    borderRadius:9, color:"var(--text-primary)", fontSize:13,
    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
  });

  const Modal = ({ title, form, setForm, onSave, onClose, saveLabel }) => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={onClose}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"28px 28px 24px", width:"100%", maxWidth:420, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Fields */}
        {[
          { key:"name",  label:"Full Name",    placeholder:"Enter full name",  type:"text"  },
          { key:"email", label:"Email Address", placeholder:"Enter email",      type:"email" },
          { key:"phone", label:"Phone Number",  placeholder:"03XX-XXXXXXX",     type:"text"  },
        ].map(f => (
          <div key={f.key} style={{ marginBottom:14 }}>
            <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} value={form[f.key]||""}
              onChange={e=>setForm({...form,[f.key]:e.target.value})} style={inp(false)}
              onFocus={e=>e.target.style.borderColor="#6366f1"}
              onBlur={e=>e.target.style.borderColor="var(--border-input)"}/>
          </div>
        ))}

        {/* Class */}
        <div style={{ marginBottom:14 }}>
          <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Class</label>
          <select value={form.class||""} onChange={e=>setForm({...form,class:e.target.value})} style={inp(false)}>
            <option value="">Select Class</option>
            {CLASSES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Status (edit only) */}
        {form.status !== undefined && (
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>Status</label>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={inp(false)}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
          <button onClick={onClose} style={{ padding:"9px 20px", background:"var(--bg-input)", border:"1px solid var(--border-input)", borderRadius:9, color:"var(--text-secondary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>
            Cancel
          </button>
          <button onClick={onSave} style={{ padding:"9px 20px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", borderRadius:9, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", boxShadow:"0 4px 12px rgba(79,70,229,0.3)" }}>
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"28px 24px", transition:"background .3s" }}>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, gap:12, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>Students</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>Dashboard › Students</p>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 12px rgba(79,70,229,0.3)", whiteSpace:"nowrap" }}>
          ＋ Add Student
        </button>
      </div>

      {/* TABLE CARD */}
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>

        {/* Search */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", width:260 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search student..." value={search}
              onChange={e=>{setSearch(e.target.value);setCurrentPage(1);}}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}/>
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)" }}>Showing {paginated.length} of {filtered.length} entries</span>
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--border-input)" }}>
                {["#","Roll No","Student Name","Class","Email","Phone","Status","Action"].map(h=>(
                  <th key={h} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((s,i)=>(
                <tr key={s.id}
                  style={{ background: i%2===0 ? "var(--bg-card)" : "var(--bg-input)", borderBottom:"1px solid var(--border)", transition:"background .15s", cursor:"default" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-hover)"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg-card)":"var(--bg-input)"}
                >
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)" }}>{(currentPage-1)*ITEMS_PER_PAGE+i+1}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.rollNo}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#4f46e5", flexShrink:0 }}>{s.name[0]}</div>
                      <span style={{ fontWeight:600, color:"var(--text-primary)" }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.class}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.email}</td>
                  <td style={{ padding:"12px 14px", color:"var(--text-secondary)" }}>{s.phone}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:600,
                      background: s.status==="Present" ? "var(--bg-badge-green)" : "var(--bg-badge-red)",
                      color:      s.status==="Present" ? "var(--text-green)"     : "var(--text-red)" }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    {/* ✅ Edit Button — kaam karega ab */}
                    <button title="Edit" onClick={()=>handleEditOpen(s)}
                      style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#4f46e5"}
                      onMouseLeave={e=>e.currentTarget.style.background="#eef2ff"}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13}}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button title="Delete" onClick={()=>handleDelete(s.id)}
                      style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#ef4444"}
                      onMouseLeave={e=>e.currentTarget.style.background="#fef2f2"}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13}}>
                        <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
                        <path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length===0 && (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:18, fontSize:13, color:"var(--text-muted)", flexWrap:"wrap", gap:10 }}>
          <span>Showing {(currentPage-1)*ITEMS_PER_PAGE+1}–{Math.min(currentPage*ITEMS_PER_PAGE,filtered.length)} of {filtered.length}</span>
          <div>
            <button style={{ width:30, height:30, border:"1px solid var(--border-input)", borderRadius:7, background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer", margin:"0 2px" }}
              onClick={()=>setCurrentPage(Math.max(1,currentPage-1))}>‹</button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)}
                style={{ width:30, height:30, border:"none", borderRadius:7, margin:"0 2px", cursor:"pointer", fontWeight:600, fontSize:13,
                  background: p===currentPage ? "#4f46e5" : "var(--bg-input)",
                  color:      p===currentPage ? "#fff"    : "var(--text-secondary)" }}>
                {p}
              </button>
            ))}
            <button style={{ width:30, height:30, border:"1px solid var(--border-input)", borderRadius:7, background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer", margin:"0 2px" }}
              onClick={()=>setCurrentPage(Math.min(totalPages,currentPage+1))}>›</button>
          </div>
        </div>
      </div>

      {/* ✅ ADD MODAL */}
      {showAdd && (
        <Modal
          title="➕ Add New Student"
          form={addForm}
          setForm={setAddForm}
          onSave={handleAdd}
          onClose={()=>setShowAdd(false)}
          saveLabel="Save Student"
        />
      )}

      {/* ✅ EDIT MODAL */}
      {showEdit && editForm && (
        <Modal
          title="✏️ Edit Student"
          form={editForm}
          setForm={setEditForm}
          onSave={handleEditSave}
          onClose={()=>{ setShowEdit(false); setEditForm(null); }}
          saveLabel="Update Student"
        />
      )}

    </div>
  );
}