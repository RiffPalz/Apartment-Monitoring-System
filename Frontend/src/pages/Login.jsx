import { useState } from "react";

import {Link} from "react-router-dom";

import logo from "../assets/images/logo.png";
import { FaUser} from "react-icons/fa";
import { RiLockPasswordFill} from "react-icons/ri";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
      <div class="flex flex-col lg:flex-row h-screen">
        {/* Left Section */}
        <div class="w-full lg:w-3/5 bg-[linear-gradient(to_bottom_right,#eaa089,#e89b78)] flex flex-col justify-center items-center p-6 sm:p-10">
          <img src={logo} alt="Logo" class="w-36 sm:w-80 h-auto mb-[-20px]" />
          <h1 class="font-RegularMilk text-xl sm:text-3xl font-bold tracking-[18px] text-black text-center">
            MGC BUILDING
          </h1>
        </div>

        {/* Right Section */}
        <div class="w-full lg:w-1/2 bg-ivory flex flex-col justify-center items-center p-6 sm:p-10">
          <h2 class="text-2xl sm:text-4xl font-LightMilk text-[#c64d2d] mb-6 sm:mb-8">
            WELCOME!
          </h2>

          <form class="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
            <div>
              <label class="font-LightMilk block mb-2 text-sm font-medium text-gray-700">
                USERNAME
              </label>
              <div class="flex items-center border border-gray-400 rounded px-4 py-2">
                <span class="material-icons text-black-400 mr-2">
                  <FaUser size="1em" />
                </span>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your username"
                  required
                  class="w-full outline-none bg-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label class="font-LightMilk block mb-2 text-sm font-medium text-gray-700">
                PASSWORD
              </label>
              <div className="flex items-center border border-gray-400 rounded px-4 py-2">
                <RiLockPasswordFill
                  size="1.2em"
                  className="mr-2 text-gray-600"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  required
                  className="w-full outline-none bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <p class="text-sm text-right text-gray-500 mt-1 cursor-pointer underline">
                Forgot your Password?
              </p>
            </div>

            <button
              type="submit"
              class="w-full bg-[#c64d2d] text-white py-2 rounded hover:bg-orange-700"
            >
              LOG IN
            </button>

            <Link to="/createAcc">
              <button
                type="button"
                class="w-full bg-[#c64d2d] text-white py-2 rounded hover:bg-orange-700"
              >
                SIGN UP
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
}

export default Login;