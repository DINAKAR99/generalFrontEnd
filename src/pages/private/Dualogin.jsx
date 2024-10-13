import React from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../Layouts/PublicLayout";
import privateAxios from "../../service/Interceptor";

const Dualogin = () => {
  const navigate = useNavigate(); // Get the navigate function

  const onSubmit = async () => {
    try {
      const response = await privateAxios.get(
        "dualsessionlogin",
        // Your login data
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate("/protected"); // Handle successful login, e.g., redirect or store token
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PublicLayout>
      <div class="container text-center mt-5 p-4 border rounded shadow-lg bg-light">
        <div class="display-4 text-black mb-3 animate__animated animate__fadeInDown">
          Dual-Login
        </div>
        <div class="alert alert-warning alert-dismissible fade show animate__animated animate__bounceIn">
          <strong>Warning!</strong> You are logged in somewhere else.
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div class="mb-4">
          <button
            class="btn btn-success btn-lg px-5 py-3 animate__animated animate__pulse"
            onClick={onSubmit()}
          >
            <i class="fas fa-sign-in-alt"></i> Click here to login
          </button>
        </div>
        <h6 class="text-muted animate__animated animate__fadeInUp">
          This action will log out the other existing session.
        </h6>
      </div>
    </PublicLayout>
  );
};

export default Dualogin;
