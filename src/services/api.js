import axios from "axios";

const API = axios.create({
  baseURL: "https://eduschool-backend-production.up.railway.app/",
});

// ✅ Har request mein token auto attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Auth APIs
export const loginAPI           = (data)       => API.post("/auth/login", data);
export const registerAPI        = (data)       => API.post("/auth/register", data);
export const getMeAPI           = ()           => API.get("/auth/me");
export const getPendingAPI      = ()           => API.get("/auth/pending");
export const approveUserAPI     = (id, data)   => API.put(`/auth/approve/${id}`, data);
export const changePasswordAPI  = (data)       => API.put("/auth/change-password", data);
export const updateImageAPI     = (data)       => API.put("/auth/update-image", data);

// ✅ Student APIs
export const getStudentsAPI          = ()           => API.get("/students");
export const getMyProfileAPI         = ()           => API.get("/students/me");
export const updateMyProfileAPI      = (data)       => API.put("/students/me", data);
export const deleteStudentAPI        = (id)         => API.delete(`/students/${id}`);
export const updateStudentAPI        = (id, data)   => API.put(`/students/${id}`, data);

// ✅ Teacher APIs
export const getTeachersAPI              = ()     => API.get("/teachers");
export const getMyTeacherProfileAPI      = ()     => API.get("/teachers/me");
export const updateMyTeacherProfileAPI   = (data) => API.put("/teachers/me", data);

// ✅ Attendance APIs
export const markAttendanceAPI   = (data)    => API.post("/attendance/mark", data);
export const getAttendanceAPI    = (params)  => API.get("/attendance", { params });
export const getMyAttendanceAPI  = ()        => API.get("/attendance/me");

// ✅ Result APIs
export const addResultAPI      = (data)       => API.post("/results", data);
export const getResultsAPI     = (params)     => API.get("/results", { params });
export const getMyResultsAPI   = ()           => API.get("/results/me");
export const updateResultAPI   = (id, data)   => API.put(`/results/${id}`, data);
export const deleteResultAPI   = (id)         => API.delete(`/results/${id}`);

// ✅ Fee APIs
export const getFeesAPI    = ()           => API.get("/fees");
export const getMyFeesAPI  = ()           => API.get("/fees/me");
export const addFeeAPI     = (data)       => API.post("/fees", data);
export const updateFeeAPI  = (id, data)   => API.put(`/fees/${id}`, data);
export const deleteFeeAPI  = (id)         => API.delete(`/fees/${id}`);

// ✅ Notice APIs
export const getNoticesAPI    = ()           => API.get("/notices");
export const getAllNoticesAPI  = ()           => API.get("/notices/all");
export const addNoticeAPI     = (data)       => API.post("/notices", data);
export const updateNoticeAPI  = (id, data)   => API.put(`/notices/${id}`, data);
export const deleteNoticeAPI  = (id)         => API.delete(`/notices/${id}`);

export default API;

// ✅ Extra Teacher APIs
export const deleteTeacherAPI  = (id) => API.delete(`/teachers/${id}`);
export const updateTeacherAPI  = (id, data) => API.put(`/teachers/${id}`, data);