import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("Fnusers"));

    if (!formData.email || !formData.password) {
      setMessage("Email & Password cannot be empty.");
      setType("error");
      return;
    }

    if (!currentUser) {
      setMessage("No user found. Please register first.");
      setType("error");
      return;
    }

    try {
      if (formData.email === currentUser.email) {
        if (formData.password === currentUser.password) {
          setMessage(
            `Welcome back, ${currentUser.fullName}! 
            Please wait we are managing your dashboard`,
          );
          setType("success");
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          setMessage("Incorrect Password. Please Try Again.");
          setType("error");
        }
      } else {
        setMessage("Email not found. Please check your email or register.");
        setType("error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Something went wrong. Try again later.");
      setType("error");
    }
    localStorage.setItem("FnCurrUser", JSON.stringify(currentUser));

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#0b1a3a] to-[#020617] text-white">
      <div className="w-[380px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-purple-300">Welcome Back</h1>
        <p className="mb-6">Securely access your capital insights</p>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Please enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              placeholder="Please enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <span className="text-purple-400 cursor-pointer">
            {" "}
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
