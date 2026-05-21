import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// ✅ Yeh sab colors dark mode mein override honge
const darkStyles = `
  /* Page backgrounds */
  body, #root { background: #0d1117 !important; color: #e2e8f0 !important; }

  /* All white/light cards & divs */
  div[style*="background: #fff"],
  div[style*="background:#fff"],
  div[style*="background: white"],
  div[style*="background-color: #fff"],
  div[style*="background: rgb(255, 255, 255)"],
  div[style*="background: #f0f4ff"],
  div[style*="background:#f0f4ff"],
  div[style*="background: #f8fafc"],
  div[style*="background:#f8fafc"],
  div[style*="background: #f1f5f9"],
  div[style*="background:#f1f5f9"],
  div[style*="background: #ffffff"],
  div[style*="background:#ffffff"] {
    background: #161b27 !important;
  }

  /* Page wrapper divs (minHeight:100vh) */
  div[style*="minHeight: 100vh"],
  div[style*="min-height: 100vh"],
  div[style*="minHeight:100vh"] {
    background: #0d1117 !important;
  }

  /* All headings */
  h1, h2, h3, h4, h5, h6 {
    color: #f1f5f9 !important;
  }

  /* All normal text */
  p, span, label, li, a {
    color: #8b949e !important;
  }

  /* Breadcrumb, muted text */
  p[style*="color: #888"],
  p[style*="color:#888"],
  span[style*="color: #aaa"],
  span[style*="color:#aaa"] {
    color: #4d5566 !important;
  }

  /* All inputs, selects */
  input, select, textarea {
    background: #1c2333 !important;
    color: #e2e8f0 !important;
    border-color: #21293a !important;
  }

  /* Table headers */
  th {
    background: #1c2333 !important;
    border-color: #21293a !important;
    color: #6366f1 !important;
  }

  /* Table cells */
  td {
    border-color: #21293a !important;
    color: #8b949e !important;
  }

  /* Table rows */
  tr { background: #161b27 !important; }
  tr:nth-child(even) { background: #1c2333 !important; }
  tr:hover { background: #1c2333 !important; }

  /* Stat cards with colored top border */
  div[style*="border-top"] {
    background: #161b27 !important;
  }

  /* Modal overlay content */
  div[style*="border-radius: 14px"],
  div[style*="border-radius:14px"],
  div[style*="border-radius: 16px"],
  div[style*="border-radius:16px"] {
    background: #161b27 !important;
    border-color: #21293a !important;
  }

  /* Box shadows — softer in dark */
  div[style*="box-shadow"] {
    box-shadow: 0 2px 12px rgba(0,0,0,0.4) !important;
  }

  /* Buttons - keep accent colors, fix white ones */
  button[style*="background: #fff"],
  button[style*="background:#fff"],
  button[style*="background: white"] {
    background: #1c2333 !important;
    color: #e2e8f0 !important;
    border-color: #21293a !important;
  }

  /* Progress bars background */
  div[style*="background: #e0e7ff"],
  div[style*="background:#e0e7ff"],
  div[style*="background: #f0f0f0"],
  div[style*="background:#f0f0f0"] {
    background: #21293a !important;
  }

  /* Search row, filter bars */
  div[style*="background: #f8f9ff"],
  div[style*="background:#f8f9ff"] {
    background: #1c2333 !important;
  }

  /* Name text in tables (bold dark) */
  td[style*="color: #1a1a2e"],
  td[style*="color:#1a1a2e"],
  span[style*="color: #1a1a2e"],
  span[style*="color:#1a1a2e"] {
    color: #e2e8f0 !important;
  }

  /* Pagination buttons */
  button[style*="background: #f0f4ff"],
  button[style*="background:#f0f4ff"] {
    background: #1c2333 !important;
    color: #8b949e !important;
  }
`;

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");

      // ✅ Style tag inject karo
      let styleTag = document.getElementById("dark-override");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "dark-override";
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = darkStyles;

    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");

      // ✅ Style tag remove karo
      const styleTag = document.getElementById("dark-override");
      if (styleTag) styleTag.remove();
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}