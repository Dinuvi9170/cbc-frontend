import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      toast.success("Signup successful");
      navigate("/login"); 
    } catch (e) {
      toast.error(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full md:pt-[80px] h-screen bg-[url('/images/cosmetic-oil.jpg')] bg-center bg-cover flex justify-evenly items-center">
      <div className="w-1/2 h-full hidden md:flex flex-col justify-center items-start px-30 text-white bg-primary/60 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src="/beautylogoremovebgpreview.png" 
            alt="Company Logo" 
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-4xl text-acsent font-extrabold tracking-wide">
            Beauty Cosmatics
          </h1>
        </div>

        <p className="text-xl text-acsent/90 mb-6 max-w-md leading-relaxed">
          Discover beauty with confidence.  
          Join our community and explore premium cosmetic products made just for you.
        </p>

        <ul className="space-y-3 text-acsent/90 text-lg">
          <li className="flex items-center gap-3">
            ✅ 100% Authentic Products
          </li>
          <li className="flex items-center gap-3">
            ✅ Personalized recommendations
          </li>
          <li className="flex items-center gap-3">
            ✅ Trusted by thousands of users
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center w-[500px] h-[600px] bg-white-400 md:shadow-xl rounded-lg backdrop-blur-md">
          <form className="flex flex-col gap-4 justify-center items-center text-lg">
            <h1 className="text-acsent text-3xl font-bold">Register</h1>
            <label className="text-center font-semibold">First Name:</label>
            <input
              type="text"
              placeholder="Ann"
              value={firstName}
              required
              className="border border-white outline-white p-1 rounded-lg w-72"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="text-center font-semibold">Last Name:</label>
            <input
              type="text"
              placeholder="Perera"
              value={lastName}
              required
              className="border border-white outline-white p-1 rounded-lg w-72"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="text-center font-semibold">Email:</label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              value={email}
              required
              className="border border-white outline-white p-1 rounded-lg w-72"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-center font-semibold">Password:</label>
            <input
              type="password"
              placeholder="******"
              value={password}
              required
              className="border border-white outline-white p-1 rounded-lg w-72"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-1/2 bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
              onClick={handleSignup}
              type="button"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

