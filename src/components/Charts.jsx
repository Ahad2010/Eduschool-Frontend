// ✅ Premium Charts — No external library needed!

// ── 1. BAR CHART ─────────────────────────────
export function BarChart({ data, height=180, color="#4f46e5" }) {
  const max = Math.max(...data.map(d=>d.value), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height, padding:"0 4px" }}>
      {data.map((d,i)=>(
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, height:"100%" }}>
          <span style={{ fontSize:11, fontWeight:600, color:"var(--text-muted)" }}>{d.value}</span>
          <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
            <div style={{
              width:"100%",
              height:`${(d.value/max)*100}%`,
              minHeight:4,
              background:`linear-gradient(180deg, ${color}, ${color}88)`,
              borderRadius:"6px 6px 0 0",
              transition:"height 1s ease",
              cursor:"pointer",
              position:"relative",
            }}
              onMouseEnter={e=>{e.currentTarget.style.opacity="0.8";}}
              onMouseLeave={e=>{e.currentTarget.style.opacity="1";}}
            />
          </div>
          <span style={{ fontSize:10, color:"var(--text-muted)", whiteSpace:"nowrap" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── 2. LINE CHART ─────────────────────────────
export function LineChart({ data, height=160, color="#4f46e5" }) {
  const values = data.map(d=>d.value);
  const max    = Math.max(...values, 1);
  const min    = Math.min(...values, 0);
  const range  = max - min || 1;
  const W = 600, H = height - 40;

  const points = values.map((v,i) => ({
    x: (i / (values.length-1)) * W,
    y: H - ((v - min) / range) * H,
  }));

  const pathD = points.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div style={{ position:"relative" }}>
      <svg viewBox={`0 0 ${W} ${H+40}`} style={{ width:"100%", height, overflow:"visible" }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0,0.25,0.5,0.75,1].map((v,i)=>(
          <line key={i} x1="0" y1={H*v} x2={W} y2={H*v}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="4"/>
        ))}
        {/* Area */}
        <path d={areaD} fill="url(#lineGrad)"/>
        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Dots */}
        {points.map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2"/>
            <text x={p.x} y={H+24} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{data[i].label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── 3. DONUT CHART ────────────────────────────
export function DonutChart({ data, size=140 }) {
  const total  = data.reduce((a,d)=>a+d.value,0)||1;
  const radius = 52, cx = size/2, cy = size/2;
  const circ   = 2 * Math.PI * radius;
  let offset   = 0;

  return (
    <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
      <svg width={size} height={size}>
        {data.map((d,i)=>{
          const pct  = d.value/total;
          const dash = pct * circ;
          const gap  = circ - dash;
          const el   = (
            <circle key={i} cx={cx} cy={cy} r={radius}
              fill="none" stroke={d.color} strokeWidth="16"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition:"stroke-dasharray 1s ease", transform:"rotate(-90deg)", transformOrigin:"center" }}/>
          );
          offset += dash;
          return el;
        })}
        <text x={cx} y={cy-6} textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--text-primary)">
          {Math.round((data[0]?.value/total)*100)}%
        </text>
        <text x={cx} y={cy+14} textAnchor="middle" fontSize="10" fill="var(--text-muted)">
          {data[0]?.label}
        </text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {data.map((d,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:10, height:10, borderRadius:"50%", background:d.color, flexShrink:0 }}/>
            <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{d.label}</span>
            <span style={{ fontSize:12, fontWeight:700, color:"var(--text-primary)", marginLeft:4 }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 4. PROGRESS RING ──────────────────────────
export function ProgressRing({ value=0, max=100, size=80, color="#4f46e5", label="" }) {
  const pct    = Math.min(value/max, 1);
  const radius = 30, cx = size/2, cy = size/2;
  const circ   = 2 * Math.PI * radius;
  const dash   = pct * circ;

  return (
    <div style={{ textAlign:"center" }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--border-input)" strokeWidth="6"/>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
          style={{ transform:"rotate(-90deg)", transformOrigin:"center", transition:"stroke-dasharray 1s ease" }}/>
        <text x={cx} y={cy+5} textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>
          {Math.round(pct*100)}%
        </text>
      </svg>
      {label && <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:4 }}>{label}</p>}
    </div>
  );
}

// ── 5. MINI SPARKLINE ─────────────────────────
export function Sparkline({ data=[], color="#4f46e5", height=40, width=120 }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v,i) => [
    (i/(data.length-1))*width,
    height - ((v-min)/range)*height
  ]);
  const d = points.map((p,i)=>`${i===0?"M":"L"} ${p[0]} ${p[1]}`).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow:"visible" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="3" fill={color}/>
    </svg>
  );
}