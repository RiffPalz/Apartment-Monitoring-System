import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import signBG from "../assets/images/sign-inBG.jpg";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {}; // Retrieve data from CreateAcc

  // Debug the received userData
  console.log("Received userData in SignUp:", userData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }      
      
      // Check if all required fields exist in userData
      const { fullName, emailAdd, phoneNumber, unitNumber, numberOfTenants } = userData;
      
      if (!fullName || !emailAdd || !phoneNumber || !unitNumber || !numberOfTenants) {
        alert("Missing required user information. Please go back to the previous step.");
        return;
      }
        try {
        // Create a request object with all required fields and log it for debugging
        const requestData = {
          fullName,
          emailAdd,
          username,
          password,
          phoneNumber,
          unitNumber: parseInt(unitNumber), // Convert to number as expected by backend
          numberOfTenants: parseInt(numberOfTenants), // Convert to number as expected by backend
        };
        
        console.log("Sending data:", requestData);
        
        const response = await axios.post("http://localhost:5000/api/users/create", requestData);
        
        console.log("Signup response:", response);
        alert("Account created successfully!");
        navigate("/"); // Redirect to login
      } catch (err) {
        console.error("Signup error:", err);
        alert(err.response?.data?.message || "Signup failed");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${signBG})` }}
    >
      <div className="bg-[#fdf9f3] max-w-md w-full rounded-md shadow-md p-6 sm:p-12">
        <h2 className="font-RegularMilk text-2xl sm:text-[25px] text-center text-[#c64d2d] mb-6">
          CREATE ACCOUNT
        </h2>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label className="font-LightMilk text-[13px] mb-1">Username</label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2 ml-5">
              <FaUser size="1em" className="mr-2" />
              <input
                type="text"
                placeholder="Enter your Username"
                className="w-full outline-none text-[14px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-LightMilk text-[13px] mb-1">
              Create Password
            </label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2 ml-5">
              <RiLockPasswordFill size="1.2em" className="mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-600 ml-2 focus:outline-none"
              >
                {showPassword ? (
                  <LuEye size="1.2em" />
                ) : (
                  <LuEyeClosed size="1.2em" />
                )}
              </button>
            </div>
            <ul className="text-xs sm:text-xs mt-2 ml-10 sm:ml-10 space-y-1 text-gray-700 list-disc">
              <li>Minimum 8 characters</li>
              <li>At least 1 uppercase letter (A–Z)</li>
              <li>At least 1 lowercase letter (a–z)</li>
              <li>At least 1 number (0–9)</li>
              <li>At least 1 symbol (!@#^*_.?{}-)</li>
            </ul>
          </div>

          <div>
            <label className="font-LightMilk text-[13px] mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2 ml-5">
              <RiLockPasswordFill size="1.2em" className="mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                className="w-full outline-none bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-600 ml-2 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <LuEye size="1.2em" />
                ) : (
                  <LuEyeClosed size="1.2em" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-1/2 ml-auto mt-2 bg-[#c64d2d] text-white px-10 py-2 rounded hover:bg-[#b04529] font-LightMilk text-[14px]"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
