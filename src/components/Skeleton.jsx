// ✅ Skeleton Loading Component
export function SkeletonRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({length:cols}).map((_,i)=>(
        <td key={i} style={{ padding:"12px 14px" }}>
          <div style={{ height:14, background:"var(--border-input)", borderRadius:6, animation:"pulse 1.5s ease-in-out infinite" }}/>
        </td>
      ))}
    </tr>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)" }}>
      <div style={{ height:16, background:"var(--border-input)", borderRadius:6, marginBottom:10, animation:"pulse 1.5s ease-in-out infinite" }}/>
      <div style={{ height:12, background:"var(--border-input)", borderRadius:6, width:"60%", animation:"pulse 1.5s ease-in-out infinite" }}/>
    </div>
  );
}

export function SkeletonStats({ count=4 }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:`repeat(${count},1fr)`, gap:14, marginBottom:20 }}>
      {Array.from({length:count}).map((_,i)=>(
        <div key={i} style={{ background:"var(--bg-card)", borderRadius:14, padding:"18px", border:"1px solid var(--border)", textAlign:"center" }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"var(--border-input)", margin:"0 auto 10px", animation:"pulse 1.5s ease-in-out infinite" }}/>
          <div style={{ height:10, background:"var(--border-input)", borderRadius:4, marginBottom:8, animation:"pulse 1.5s ease-in-out infinite" }}/>
          <div style={{ height:20, background:"var(--border-input)", borderRadius:4, width:"50%", margin:"0 auto", animation:"pulse 1.5s ease-in-out infinite" }}/>
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }
      `}</style>
    </div>
  );
}