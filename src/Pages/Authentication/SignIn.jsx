import logo from "../../assets/logo/logo.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { setAuthTokens } from "../../lib/cookie-utils";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      // Make API call to login endpoint (assuming /auth/login)
      const response = await apiClient.post("/auth/login", payload);

      console.log("Sign-in successful:", response);
      const { accessToken, refreshToken } = response.data.data;

      console.log( "Access Token:", accessToken, "Refresh Token:", refreshToken );

      // Save tokens in cookies
      setAuthTokens(accessToken, refreshToken);

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert(`Sign-in failed: ${JSON.stringify(error.response?.data) || error.message}`);
    }
  };

  return (
    <div className="min-h-screen place-content-center place-items-center bg-[#FFF9F0]">
      <div className="flex items-center justify-center">
        <div className="min-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-md p-7">
          <div className="place-content-center place-items-center">
            <img src={logo} alt="DiscountForge Logo" />
            <p className="text-lg font-semibold mt-2">
              Fast. Trusted. Local Mechanics.
            </p>
          </div>
          <h2 className="text-2xl font-bold text-center my-5">Sign In</h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("email", {
                    required: "email is required",
                    
                  })}
                  placeholder="Enter your email"
                  className={`w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-base-300"
                  }`}
                  autoComplete="email"
                />
                <FaUser className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className={`w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-base-300"
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF9500] hover:bg-[#FF8900] text-white font-semibold py-2 rounded-md cursor-pointer mt-5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;