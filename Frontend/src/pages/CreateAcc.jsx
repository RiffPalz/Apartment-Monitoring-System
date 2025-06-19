import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import signBG from "../assets/images/sign-inBG.jpg";

const CreateAcc = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    emailAdd: "",
    phoneNumber: "",
    unitNumber: "1",      
    numberOfTenants: "1", 
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "fullName") {
      const capitalized = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setFormData((prev) => ({ ...prev, [name]: capitalized }));
    } else if (name === "phoneNumber") {
      let raw = value.replace(/\D/g, "");
      if (raw.length > 11) raw = raw.slice(0, 11);
      let formatted = raw;
      if (raw.length > 4 && raw.length <= 7) {
        formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
      } else if (raw.length > 7) {
        formatted = `${raw.slice(0, 4)}-${raw.slice(4, 7)}-${raw.slice(7)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, emailAdd, phoneNumber, unitNumber, numberOfTenants, agreed } = formData;

    if (!agreed) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/create", {
        fullName,
        emailAdd,
        phoneNumber,
        unitNumber,
        numberOfTenants,
        agreed
      });
      alert("Account created successfully!");
      navigate("/SignUp", {
        state: { fullName, emailAdd, phoneNumber, unitNumber, numberOfTenants }
      });
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${signBG})` }}
    >
      <div className="bg-[#fdf9f3] max-w-md w-full rounded-md shadow-md p-6 sm:p-12">
        <h2 className="font-RegularMilk text-2xl text-center text-[#c64d2d] mb-6">
          CREATE ACCOUNT
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="font-LightMilk block mb-1 text-[13px] font-medium">
              FULL NAME
            </label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2">
              <FaUser size="1em" className="mr-2" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
                className="w-full outline-none bg-transparent"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-LightMilk block mb-1 text-[13px] font-medium">
              EMAIL
            </label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2">
              <MdEmail size="1.5em" className="mr-2" />
              <input
                type="email"
                name="emailAdd"
                placeholder="Enter your Email"
                required
                className="w-full outline-none text-[14px]"
                value={formData.emailAdd}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="font-LightMilk block mb-1 text-[13px] font-medium">
              CONTACT NUMBER
            </label>
            <div className="flex items-center border border-gray-400 rounded px-3 py-2">
              <FaPhoneAlt size="1em" className="mr-2" />
              <input
                type="tel"
                name="phoneNumber"
                inputMode="numeric"
                placeholder="Enter your Contact Number"
                required
                className="w-full outline-none text-[14px]"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={13}
              />
            </div>
          </div>

          {/* Unit Number */}
          <div>
            <label className="font-LightMilk block mb-1 text-[13px] font-medium">
              UNIT NUMBER
            </label>
            <select
              name="unitNumber"
              required
              value={formData.unitNumber}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none text-[14px]"
            >
              {[...Array(35).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </div>

          {/* Number of Tenants */}
          <div>
            <label className="font-LightMilk block mb-1 text-[13px] font-medium">
              NUMBER OF TENANTS
            </label>
            <select
              name="numberOfTenants"
              required
              value={formData.numberOfTenants}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2 outline-none text-[14px]"
            >
              {[...Array(2).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start text-sm text-gray-700">
            <input
              type="checkbox"
              name="agreed"
              className="mr-2 mt-1"
              checked={formData.agreed}
              onChange={handleChange}
              required
            />
            <span>
              By signing up, you agree to MGC BUILDING'S
              <a href="#" className="text-green-600 ml-1 underline">
                Terms and Conditions
              </a>
            </span>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-1/2 ml-auto text-[14px] bg-[#c64d2d] text-white px-10 py-2 rounded hover:bg-[#b04529] font-LightMilk"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;