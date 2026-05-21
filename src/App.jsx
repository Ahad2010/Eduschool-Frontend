import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import Sidebar        from "./components/Sidebar";
import StudentSidebar from "./components/StudentSidebar";
import TeacherSidebar from "./components/TeacherSidebar";
import Navbar         from "./components/Navbar";

// Auth
import Login          from "./pages/auth/Login";
import Register       from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Students       from "./pages/admin/Students";
import Teachers       from "./pages/admin/Teachers";
import Classes        from "./pages/admin/Classes";
import Attendance     from "./pages/admin/Attendance";
import Fees           from "./pages/admin/Fees";
import Results        from "./pages/admin/Results";
import Reports        from "./pages/admin/Reports";
import Settings       from "./pages/admin/Settings";
import Notices        from "./pages/admin/Notices";

// Student
import StudentDashboard  from "./pages/student/Dashboard";
import StudentAttendance from "./pages/student/Attendance";
import StudentFees       from "./pages/student/Fees";
import StudentNotices    from "./pages/student/Notices";
import StudentProfile    from "./pages/student/Profile";
import StudentResults    from "./pages/student/Results";
import StudentTimetable  from "./pages/student/Timetable";

// 404
import NotFound from "./pages/NotFound";

// Teacher
import TeacherDashboard  from "./pages/teacher/Dashboard";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherStudents   from "./pages/teacher/Students";
import TeacherProfile    from "./pages/teacher/Profile";
import TeacherResults    from "./pages/teacher/Results";

// ── Protected Route ──
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}

// ── Layouts ──
function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-page)" }}>
      <Sidebar isOpen={open} onClose={()=>setOpen(false)}/>
      <div className="main-content" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        <Navbar onMenuClick={()=>setOpen(true)}/>
        <main style={{ flex:1 }} key={pathname}>{children}</main>
      </div>
    </div>
  );
}

function StudentLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-page)" }}>
      <StudentSidebar isOpen={open} onClose={()=>setOpen(false)}/>
      <div className="main-content" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        <Navbar onMenuClick={()=>setOpen(true)}/>
        <main style={{ flex:1 }} key={pathname}>{children}</main>
      </div>
    </div>
  );
}

function TeacherLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-page)" }}>
      <TeacherSidebar isOpen={open} onClose={()=>setOpen(false)}/>
      <div className="main-content" style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        <Navbar onMenuClick={()=>setOpen(true)}/>
        <main style={{ flex:1 }} key={pathname}>{children}</main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  const A = ({children}) => <ProtectedRoute allowedRoles={["admin"]}>  <AdminLayout>{children}</AdminLayout></ProtectedRoute>;
  const S = ({children}) => <ProtectedRoute allowedRoles={["student"]}><StudentLayout>{children}</StudentLayout></ProtectedRoute>;
  const T = ({children}) => <ProtectedRoute allowedRoles={["teacher"]}><TeacherLayout>{children}</TeacherLayout></ProtectedRoute>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}/dashboard`} replace/> : <Navigate to="/login" replace/>}/>

      {/* Auth */}
      <Route path="/login"           element={user ? <Navigate to={`/${user.role}/dashboard`} replace/> : <Login/>}/>
      <Route path="/register"        element={user ? <Navigate to={`/${user.role}/dashboard`} replace/> : <Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>

      {/* Admin */}
      <Route path="/admin/dashboard"  element={<A><AdminDashboard/></A>}/>
      <Route path="/admin/students"   element={<A><Students/></A>}/>
      <Route path="/admin/teachers"   element={<A><Teachers/></A>}/>
      <Route path="/admin/classes"    element={<A><Classes/></A>}/>
      <Route path="/admin/attendance" element={<A><Attendance/></A>}/>
      <Route path="/admin/fees"       element={<A><Fees/></A>}/>
      <Route path="/admin/results"    element={<A><Results/></A>}/>
      <Route path="/admin/reports"    element={<A><Reports/></A>}/>
      <Route path="/admin/settings"   element={<A><Settings/></A>}/>
      <Route path="/admin/notices"    element={<A><Notices/></A>}/>

      {/* Student */}
      <Route path="/student/dashboard"  element={<S><StudentDashboard/></S>}/>
      <Route path="/student/attendance" element={<S><StudentAttendance/></S>}/>
      <Route path="/student/fees"       element={<S><StudentFees/></S>}/>
      <Route path="/student/notices"    element={<S><StudentNotices/></S>}/>
      <Route path="/student/profile"    element={<S><StudentProfile/></S>}/>
      <Route path="/student/results"    element={<S><StudentResults/></S>}/>
      <Route path="/student/timetable"  element={<S><StudentTimetable/></S>}/>

      {/* Teacher */}
      <Route path="/teacher/dashboard"  element={<T><TeacherDashboard/></T>}/>
      <Route path="/teacher/attendance" element={<T><TeacherAttendance/></T>}/>
      <Route path="/teacher/students"   element={<T><TeacherStudents/></T>}/>
      <Route path="/teacher/profile"    element={<T><TeacherProfile/></T>}/>
      <Route path="/teacher/results"    element={<T><TeacherResults/></T>}/>

      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}