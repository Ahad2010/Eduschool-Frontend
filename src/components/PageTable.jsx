import { useState, useEffect } from "react";

// ── Reusable Modal ──
export function Modal({ title, fields, form, setForm, onSave, onClose, saveLabel="Save" }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(3px)", padding:16 }}
      onClick={onClose}>
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"26px 26px 22px", width:"100%", maxWidth:440, border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-heading)", fontSize:16, fontWeight:700, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--bg-input)", border:"1px solid var(--border)", borderRadius:8, width:30, height:30, cursor:"pointer", color:"var(--text-muted)", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Fields */}
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom:13 }}>
            <label style={{ display:"block", color:"var(--text-muted)", fontSize:12, fontWeight:600, marginBottom:5 }}>{f.label}</label>
            {f.type === "select" ? (
              <select value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}>
                <option value="">Select {f.label}</option>
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type || "text"}
                placeholder={f.placeholder || `Enter ${f.label}`}
                value={form[f.key] || ""}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width:"100%", padding:"10px 13px", background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, color:"var(--text-primary)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e  => e.target.style.borderColor = "var(--border-input)"}
              />
            )}
          </div>
        ))}

        {/* Buttons */}
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:18 }}>
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
}

// ── Reusable Page Table ──
export default function PageTable({
  title,
  breadcrumb = "Dashboard",
  columns,
  initialData,
  addFields,
  editFields,
  addEmpty,
  searchKeys = ["name"],
  addLabel,
}) {
  const ITEMS = 8;

  // ✅ FIX: har page ka apna alag state — title change hone par reset
  const [data,    setData]    = useState(initialData);
  const [search,  setSearch]  = useState("");
  const [page,    setPage]    = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ ...addEmpty });
  const [editRow, setEditRow] = useState(null);

  // ✅ FIX: Jab title/page badal jaye — state reset karo
  useEffect(() => {
    setData(initialData);
    setSearch("");
    setPage(1);
    setShowAdd(false);
    setEditRow(null);
    setAddForm({ ...addEmpty });
  }, [title]);

  const filtered   = data.filter(row =>
    searchKeys.some(k => String(row[k] || "").toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated  = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const handleAdd = () => {
    const required = addFields.filter(f => f.required !== false);
    if (required.some(f => !addForm[f.key])) return;
    const newRow = { id: String(data.length + 1).padStart(2, "0"), ...addForm };
    setData([...data, newRow]);
    setAddForm({ ...addEmpty });
    setShowAdd(false);
  };

  const handleEditSave = () => {
    if (!editRow) return;
    setData(data.map(r => r.id === editRow.id ? { ...editRow } : r));
    setEditRow(null);
  };

  const handleDelete = (id) => setData(data.filter(r => r.id !== id));

  // ✅ FIX: Add button label sahi karo
  const btnLabel = addLabel || `Add ${title.endsWith("s") ? title.slice(0, -1) : title}`;

  return (
    <div style={{ background:"var(--bg-page)", minHeight:"100vh", padding:"28px 24px", transition:"background .3s" }}>

      {/* ── Header ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, gap:12, flexWrap:"wrap" }}>
        <div>
          {/* ✅ FIX: title prop se seedha title aata hai */}
          <h1 style={{ fontSize:22, fontWeight:700, color:"var(--text-heading)", margin:0 }}>{title}</h1>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>{breadcrumb} › {title}</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding:"9px 18px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 12px rgba(79,70,229,0.3)", whiteSpace:"nowrap" }}>
          ＋ {btnLabel}
        </button>
      </div>

      {/* ── Card ── */}
      <div style={{ background:"var(--bg-card)", borderRadius:16, padding:"20px", border:"1px solid var(--border)", boxShadow:"var(--shadow)" }}>

        {/* Search + Count */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--bg-input)", border:"1.5px solid var(--border-input)", borderRadius:9, padding:"8px 14px", minWidth:200, flex:1, maxWidth:280 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{width:15,height:15,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ background:"none", border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", fontFamily:"inherit", width:"100%" }}
            />
          </div>
          <span style={{ fontSize:13, color:"var(--text-muted)", whiteSpace:"nowrap" }}>
            {paginated.length} of {filtered.length} entries
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:550 }}>
            <thead>
              <tr>
                <th style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px", borderBottom:"2px solid var(--border-input)" }}>#</th>
                {columns.map(c => (
                  <th key={c.key} style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px", borderBottom:"2px solid var(--border-input)", whiteSpace:"nowrap" }}>{c.label}</th>
                ))}
                <th style={{ textAlign:"left", padding:"10px 14px", background:"var(--bg-input)", color:"#4f46e5", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px", borderBottom:"2px solid var(--border-input)" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={row.id}
                  style={{ background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-input)", borderBottom:"1px solid var(--border)", transition:"background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "var(--bg-card)" : "var(--bg-input)"}
                >
                  <td style={{ padding:"12px 14px", color:"var(--text-muted)", fontSize:13 }}>{(page - 1) * ITEMS + i + 1}</td>
                  {columns.map(c => (
                    <td key={c.key} style={{ padding:"12px 14px", color: c.primary ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: c.primary ? 600 : 400, fontSize:13, whiteSpace: c.nowrap ? "nowrap" : "normal" }}>
                      {c.render ? c.render(row[c.key], row) : row[c.key]}
                    </td>
                  ))}
                  <td style={{ padding:"12px 14px" }}>
                    {/* Edit */}
                    <button title="Edit" onClick={() => setEditRow({ ...row })}
                      style={{ background:"#eef2ff", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", marginRight:6, display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#4f46e5"; e.currentTarget.querySelector("svg").style.stroke = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#eef2ff"; e.currentTarget.querySelector("svg").style.stroke = "#4f46e5"; }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" style={{width:13,height:13,transition:"stroke .2s"}}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    {/* Delete */}
                    <button title="Delete" onClick={() => handleDelete(row.id)}
                      style={{ background:"#fef2f2", border:"none", borderRadius:7, width:30, height:30, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.querySelector("svg").style.stroke = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.querySelector("svg").style.stroke = "#ef4444"; }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{width:13,height:13,transition:"stroke .2s"}}>
                        <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
                        <path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} style={{ textAlign:"center", padding:36, color:"var(--text-muted)" }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:18, fontSize:13, color:"var(--text-muted)", flexWrap:"wrap", gap:10 }}>
            <span>Showing {(page - 1) * ITEMS + 1}–{Math.min(page * ITEMS, filtered.length)} of {filtered.length}</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              <button onClick={() => setPage(Math.max(1, page - 1))} style={{ width:30, height:30, border:"1px solid var(--border-input)", borderRadius:7, background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer" }}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width:30, height:30, border:"none", borderRadius:7, cursor:"pointer", fontWeight:600, fontSize:13, background: p === page ? "#4f46e5" : "var(--bg-input)", color: p === page ? "#fff" : "var(--text-secondary)" }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} style={{ width:30, height:30, border:"1px solid var(--border-input)", borderRadius:7, background:"var(--bg-input)", color:"var(--text-secondary)", cursor:"pointer" }}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <Modal title={`➕ Add ${btnLabel}`} fields={addFields} form={addForm} setForm={setAddForm} onSave={handleAdd} onClose={() => { setShowAdd(false); setAddForm({ ...addEmpty }); }} saveLabel="Save" />
      )}

      {/* Edit Modal */}
      {editRow && (
        <Modal title="✏️ Edit Record" fields={editFields || addFields} form={editRow} setForm={setEditRow} onSave={handleEditSave} onClose={() => setEditRow(null)} saveLabel="Update" />
      )}
    </div>
  );
}