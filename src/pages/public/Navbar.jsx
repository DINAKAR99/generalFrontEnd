import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doLogout } from "../../utility/AuthorizationUtils";
import privateAxios from "../../service/Interceptor";
import { Button, IconButton, LinearProgress, Tooltip } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate(); // Get the navigate function
  const logoutt = async () => {
    try {
      const response = await privateAxios.get("/logoff");
      if (response.status === 200) {
        console.log("Logut successful:", response.data);
        setIsLoggedIn(false);
        doLogout();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const jwtTest = async () => {
    try {
      const response = await privateAxios.get(`/test`);
      if (response.status === 200) {
        console.log("jwt successful:", response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const [loading2, setLoading2] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading2(true);
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      {loading2 ? "" : ""}
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          maxHeight: 45,
          backgroundColor: "white",
          boxShadow: "0 4px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="servicesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="servicesDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/service1">
                      Service 1
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service2">
                      Service 2
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service3">
                      Service 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <a className="nav-link" to="#" onClick={logoutt}>
                    Logout
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" to="#" onClick={jwtTest}>
                  jwt tester
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
