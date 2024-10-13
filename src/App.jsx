import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import "./App.css";
import "./index.css";
import Dualogin from "./pages/private/Dualogin";
import Protected from "./pages/private/Protected";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import About from "./pages/public/About";
import Err from "./pages/public/Err";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import SessionExpired from "./pages/public/SessionExpired";
import Signup from "./pages/public/Signup";
import SucessfullSignup from "./pages/public/SucessfullSignup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes Popper.js
import TableWithManualExport from "./Layouts/TableWithManualExport";

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
            <Route path="/dualogin" element={<Dualogin />} />
            <Route path="/sessionExpired" element={<SessionExpired />} />
            <Route path="/sucessfullSignup" element={<SucessfullSignup />} />
            <Route path="*" element={<Err />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
