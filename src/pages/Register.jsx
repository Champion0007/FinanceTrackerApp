import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      setMessage("All fields are required!");
      setType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setType("error");
      return;
    }

    if (!formData.termsAccepted) {
      setMessage("You must accept the terms and conditions!");
      setType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address!");
      setType("error");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage(
        "Password must be at least 8 characters long and contain both captital letters and small letters  & numbers!",
      );
      setType("error");
      return;
    }

    localStorage.setItem("Fnusers", JSON.stringify(formData));

    setMessage(`Welcome, ${formData.fullName}! Account created successfully.`);
    setType("success");

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#0b1a3a] to-[#020617] text-white">
      <div className="w-[380px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-purple-300">
          Create Your Account
        </h2>

        <p className="text-sm text-gray-400 text-center mt-2 mb-6">
          Enter the new era of financial intelligence.
        </p>

        {message && (
          <div
            className={`mb-4 text-sm p-2 rounded-lg text-center ${
              type === "success"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="text-xs text-gray-400">FULL NAME</label>
          <div className="flex items-center bg-black/70 rounded-lg px-3 py-2 mt-1 mb-4">
            👤
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="your name"
              className="bg-transparent outline-none w-full text-sm ml-2"
            />
          </div>

          <label className="text-xs text-gray-400">EMAIL ADDRESS</label>
          <div className="flex items-center bg-black/70 rounded-lg px-3 py-2 mt-1 mb-4">
            @
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourmail@gmail.com"
              className="bg-transparent outline-none w-full text-sm ml-2"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-xs text-gray-400">PASSWORD</label>
              <div className="flex items-center bg-black/70 rounded-lg px-3 py-2 mt-1">
                🔒
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-sm ml-2"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs text-gray-400">CONFIRM</label>
              <div className="flex items-center bg-black/70 rounded-lg px-3 py-2 mt-1">
                🔒
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-sm ml-2"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm text-gray-400">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            I accept the
            <span className="text-purple-400 ml-1">Terms & Conditions</span>
          </div>

          <button
            type="submit"
            className="w-full mt-5 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-black font-semibold shadow-lg hover:opacity-90"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Existing asset holder?{" "}
          <span className="text-purple-400 cursor-pointer">
            <Link to={"/"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
