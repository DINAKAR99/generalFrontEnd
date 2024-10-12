import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import BarLoader from "react-spinners/BarLoader";
import Protected from "./pages/private/Protected";
import Dualogin from "./pages/private/Dualogin";
import SessionExpired from "./pages/public/SessionExpired";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Err from "./pages/public/Err";
function App() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="App">
          <BarLoader loading={loading} size={80} />
        </div>
      ) : (
        <>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/b/a" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/protected"
              element={<ProtectedRoute element={<Protected />} />}
            />
            <Route
              path="/dualogin"
              element={<ProtectedRoute element={<Dualogin />} />}
            />
            <Route path="/sessionExpired" element={<SessionExpired />} />
            <Route path="*" element={<Err />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
