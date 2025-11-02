import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword= ()=>{
    const [email,setEmail] = useState('');
    const [newpassword,Setnewpassword]= useState('');
    const [confirmpassword,Setconfirmpassword]= useState('');
    const [otp,setOtp]= useState('');
    const [loading, SetLoading] = useState(false);
    const [step,Setstep] = useState(1);
    const navigate=useNavigate();

    const handleSubmit= async ()=>{
        if(!email){
            toast.error("Enter your email address");
            return;
        }
        try{
            SetLoading(true)
            await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/users/sendOTP',{email})
            toast.success("OTP sent successfully")
            Setstep(2);
            SetLoading(false);
            
        }catch(error){
            console.log(error);
            SetLoading(false)
        }
    }
    const handleVerifyOTP = async () => { 
        if (!otp || !newpassword) {
            toast.error("Please fill all fields");
            return;
        }
        if(newpassword!=confirmpassword){
            toast.error("Enter same password for both places")
            return;
        }
        try {
            SetLoading(true);
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/reset_password",
                { email, otp, newpassword,confirmpassword}
            );

            toast.success(res.data.message || "Password reset successfully");
            setEmail('');
            setOtp('');
            Setnewpassword('');
            Setconfirmpassword('');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Invalid OTP or failed reset");
            SetLoading(false)
        } 
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                {step===1?(
                    <>
                        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Forgot Password
                        </h1>

                        <p className="text-center text-gray-500 text-sm mb-4">
                        Enter your registered email, and we'll send you an OTP to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                            Email Address
                            </label>
                            <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="hello@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full bg-acsent hover:bg-acsent/80 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                        Remembered your password?{" "}
                        <a href="/login" className="text-acsent font-semibold hover:underline">
                            Login here
                        </a>
                        </p>
                    </>
                ):(
                    <>
                        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Verify OTP
                        </h1>
                        <p className="text-center text-gray-500 text-sm mb-4">
                        Check your email for the OTP and enter it below with your new password.
                        </p>
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">OTP</label>
                            <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">New Password</label>
                            <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="Enter new password"
                            value={newpassword}
                            onChange={(e) => Setnewpassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="Confirm new password"
                            value={confirmpassword}
                            onChange={(e) => Setconfirmpassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleVerifyOTP}
                            disabled={loading}
                            className="w-full bg-acsent hover:bg-acsent/80 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Reset Password"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                Setstep(1);
                                setOtp('');
                                Setnewpassword('');
                                Setconfirmpassword('');
                            }}
                            className="w-full mt-2 text-gray-600 hover:text-acsent text-sm"
                        >
                            ← Back
                        </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
export default ForgetPassword;