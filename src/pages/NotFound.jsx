import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + Date.now(),
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 4,
    direction: Math.random() > 0.5 ? "topLeft" : "topRight",
  }));
};

export default function NotFound() {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStars(generateStars(30));
    const interval = setInterval(() => {
      setStars((prev) => [...prev.slice(-20), ...generateStars(10)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes fallTopLeft {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(-100px, 100vh); opacity: 0; }
        }
        @keyframes fallTopRight {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(100px, 100vh); opacity: 0; }
        }
        .nf-float { animation: float 6s ease-in-out infinite, tilt 6s ease-in-out infinite; }
        .nf-fall-left  { animation: fallTopLeft  5s linear infinite; }
        .nf-fall-right { animation: fallTopRight 5s linear infinite; }
        .nf-bg {
          background: url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9770934.jpg-Wl31ERQfbntJABIblVId5PIBjqP5Gx.jpeg")
            no-repeat center center / cover;
        }
        .nf-ufo {
          position: absolute;
          top: 33%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .nf-btn {
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: all .2s;
          font-family: inherit;
        }
        .nf-btn-primary {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: #fff;
          box-shadow: 0 4px 20px rgba(124,58,237,0.4);
        }
        .nf-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,58,237,0.5); }
        .nf-btn-secondary {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.2) !important;
          backdrop-filter: blur(6px);
        }
        .nf-btn-secondary:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
      `}</style>

      <div style={{ position:"relative", minHeight:"100vh", width:"100%", background:"#000", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

        {/* Background */}
        <div className="nf-bg" style={{ position:"absolute", inset:0 }}/>

        {/* Dark overlay */}
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)" }}/>

        {/* Falling Stars */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
          {stars.map((star) => (
            <div key={star.id}
              className={star.direction === "topLeft" ? "nf-fall-left" : "nf-fall-right"}
              style={{ position:"absolute", top:star.top, left:star.left, width:`${star.size}px`, height:`${star.size}px`, animationDuration:`${star.duration}s`, animationDelay:`${star.delay}s` }}>
              <div style={{ height:"100%", width:"100%", borderRadius:"50%", background:"#fff", opacity:0.8 }}/>
            </div>
          ))}
        </div>

        {/* UFO */}
        <div className="nf-ufo nf-float">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
            alt="UFO"
            style={{ width:280, height:"auto" }}
          />
        </div>

        {/* Content */}
        <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 20px" }}>

          {/* 404 */}
          <h1 style={{ fontSize:"clamp(80px,15vw,140px)", fontWeight:900, margin:0, lineHeight:1,
            background:"linear-gradient(135deg,#fff,#a5b4fc)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            404
          </h1>

          <p style={{ fontSize:"clamp(16px,2.5vw,22px)", color:"#d1d5db", margin:"10px 0 8px", fontWeight:600 }}>
            Oops! Page lost in space 🚀
          </p>
          <p style={{ fontSize:14, color:"#9ca3af", margin:"0 0 36px", maxWidth:360, lineHeight:1.6 }}>
            The page you're looking for doesn't exist or has been moved to another galaxy.
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
            <button className="nf-btn nf-btn-secondary" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
            <button className="nf-btn nf-btn-primary" onClick={() => navigate("/")}>
              🏠 Return Home
            </button>
          </div>
        </div>

      </div>
    </>
  );
}