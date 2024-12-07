import React, { useState } from "react";
import axios from "axios";
import "../../src/index.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    country: "", // Added country field
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      console.log("Registration successful", response.data);
    } catch (err) {
      console.error(err.response.data);
      setError("Invalid input data");
    }
  };

  return (
    <div className="w-full m-auto mt-9 overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">

      <h1 className="text-3xl font-bold mb-6 justify-center text-green-500 flex">Register</h1>
      <form
        className="ml-auto mr-auto rounded-3xl px-10 pt-8 pb-10 mb-6 mt-2 bg-slate-20 shadow-xl w-1/2"
        onSubmit={handleSubmit}
      >
        {/* First and Last Name */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Username and Email */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="username">
              Username
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="email">
              Email
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Date of Birth, Gender, and Country */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2  mb-2" htmlFor="gender">
              Gender
            </label>
            <select
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="country">
              Country
            </label>
            <select
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Country</option>
              {[
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]
.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-3 mb-2" htmlFor="password">
              Password
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
  id="password"
              type="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mt-3 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
  className="shadow-lg my-1 focus:outline-none focus:border-green-500 appearance-none border rounded w-full py-3 px-4 text-gray-700"
             id="confirmPassword"
              
              type={showPassword ? "text" : "password"}

              placeholder="*********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              
              
            />

          </div>
        </div>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        {/* Submit Button */}
        <div className="   items-center justify-between">
          <button
            className="ml-auto mr-auto mt-7 flex items-center justify-center bg-green-500 hover:bg-green-800 text-white font-bold py-2 rounded-xl mx-3 px-36"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="text-center text-xs mt-2">
        Already have an account? 
          <a className="ml-2  text-green-500 text-xs" href="/login">
                 Sign in
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
