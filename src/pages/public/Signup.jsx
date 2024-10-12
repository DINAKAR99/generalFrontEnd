import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function
  // Define the validation schema
  const schema = z.object({
    user: z
      .string()
      .min(1, { message: "Username Required" })
      .refine((name) => name.toLowerCase() !== "justin", {
        message: "Name cannot be 'Justin'",
      }),
    password: z
      .string()
      .min(1, { message: "Password Required" })
      .max(8, { message: "password length cant be more than 8 " }),

    passwordcheck: z
      .string()
      .min(1, { message: "Required" })
      .max(8, { message: "password length cant be more than 8 " }),
    email: z.string().min(1, { message: "Email Required" }),
    captcha: z
      .string()
      .min(1, { message: "Captcha Required" })
      .refine(
        (captchaa) => {
          if (captchaa === captcha) {
            return true;
          } else {
            return false;
          }
        },
        {
          message: "incorrect captcha",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the previous canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the base solid background color
    context.fillStyle = "darkgray"; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add wavy lines to create the scratch card effect
    for (let i = 0; i < 12; i++) {
      context.beginPath();
      context.strokeStyle = "rgba(255, 255, 255, 0.4)"; // Light-colored wavy line
      context.lineWidth = getRandomInt(1, 3); // Random line width for variety

      let startY = getRandomInt(0, canvas.height); // Random y starting point
      context.moveTo(0, startY);

      // Draw a sinusoidal wave pattern across the width of the canvas
      for (let x = 0; x < canvas.width; x += 5) {
        const amplitude = getRandomInt(5, 15); // Wave amplitude
        const frequency = getRandomInt(20, 50); // Wave frequency
        const y = startY + Math.sin((x / frequency) * Math.PI * 2) * amplitude;
        context.lineTo(x, y);
      }
      context.stroke();
    }

    // Draw CAPTCHA text with shadow
    context.font = "30px Arial";
    context.fillStyle = "black"; // Text color

    // Set shadow properties
    context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
    context.shadowOffsetX = 2; // Horizontal shadow offset
    context.shadowOffsetY = 6; // Vertical shadow offset
    context.shadowBlur = 0; // Shadow blur radius

    // Draw each character individually with a random angle
    const captchaLength = captcha.length;
    const startX = 90; // Starting X position for the text
    const startY = 35; // Starting Y position for the text
    const letterSpacing = 25; // Increase space between letters for better visibility

    for (let i = 0; i < captchaLength; i++) {
      // Save the current context state
      context.save();

      // Calculate the angle for this letter
      const angle = getRandomInt(-20, 20) * (Math.PI / 180); // Random angle between -20 and 20 degrees

      // Translate to the position where the letter will be drawn
      context.translate(startX + i * letterSpacing, startY);
      // Rotate the context for slanting
      context.rotate(angle);

      // Draw the character at (0, 0) since we've already translated
      context.fillText(captcha[i], 0, 0);

      // Restore the context to its original state
      context.restore();
    }
  };

  // Utility functions for random values
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);
  const onSubmit = () => {};
  const handleReloadCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  useEffect(() => {
    // Find all elements with the class 'isvalid' and remove the class
    const elements = document.querySelectorAll(".is-valid");
    elements.forEach((element) => {
      element.classList.remove("is-valid");
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render
  return (
    <PublicLayout>
      <div
        className="mb-5"
        style={{
          backgroundColor: "#f8f9fa",
          marginTop: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "450px",
            margin: "auto",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-center">Sign Up</h2>
          {message && (
            <div className="message-box text-center text-danger     ">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.user ? "is-invalid" : "is-valid"
                }`}
                id="user"
                {...register("user")}
              />
              {errors.user && (
                <p className="text-danger">{errors.user.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : "is-valid"
                }`}
                id="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="passwordcheck" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.passwordcheck ? "is-invalid" : "is-valid"
                }`}
                id="passwordcheck"
                {...register("passwordcheck")}
              />
              {errors.password && (
                <p className="text-danger">{errors.passwordcheck.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : "is-valid"
                }`}
                id="email"
                {...register("email")}
              />
              {errors.password && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3 d-flex">
              <canvas
                ref={canvasRef}
                height={50}
                className="w-75"
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "darkgray",
                  borderRadius: 5,
                }}
              />
              <button
                type="button"
                className="border    btn "
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #ccc !important",
                }}
                onClick={handleReloadCaptcha}
              >
                <i className="fas fa-sync text-dark fa-xl"></i>
              </button>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mt-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.captcha ? "is-invalid" : "is-valid"
                  }`}
                  id="captcha"
                  {...register("captcha")}
                />
              </div>
              {errors.captcha && (
                <p className="text-danger">{errors.captcha.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Signup;