import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from '@react-oauth/google';

const Login =()=>{
    const navigate=useNavigate();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');

    const handlelogin= async ()=>{
        try{
            const response= await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
                email:email,
                password:password
            });
            console.log(response.data);
            toast.success("Login successful");
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("currentuser", JSON.stringify(response.data.user));

            if(response.data.user.isblocked===true){
                toast.error("Your account is blocked");
                localStorage.removeItem("token");
                navigate("/login");
            }

            if(response.data.role=="Admin"){
                navigate('/admin/products');
                window.location.reload();
            }else{
                navigate('/');
                window.location.reload();
            }
        }catch(e){
            toast.error(e.response.data.message);
        }
    }

    const LoginwithGoogle= useGoogleLogin({
         onSuccess: async (response) =>{ 
            try{
                const accessToken=response.access_token;
                const res= await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/users/login/google',{
                    accessToken:accessToken
                })
                toast.success("Login successful")
                const token=res.data.token;
                localStorage.setItem("token",token);
                localStorage.setItem("currentuser", JSON.stringify(res.data.user));

                if(res.data.user.isblocked===true){
                    toast.error("Your account is blocked");
                    localStorage.removeItem("token");
                    navigate("/login");
                }

                if(res.data.role=="Admin"){
                    navigate('/admin/products');
                    window.location.reload();
                }else{
                    navigate('/');
                    window.location.reload();
                }
            }catch(error){
                console.log(error)
                toast.error("Login failed")
            }    
         }
    })

    return(
        <div className="w-full md:pt-[80px] h-screen bg-[url('/images/cosmetic-oil.jpg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-1/2 h-full hidden md:flex flex-col justify-center items-center bg-primary/60 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-6">
                    <img 
                        src="/beautylogoremovebgpreview.png" 
                        alt="Company Logo"
                        className="w-28 h-28 object-contain mb-4"
                    />
                    <h1 className="text-acsent text-4xl font-bold tracking-wide">
                        Beauty Cosmatics
                    </h1>
                    <p className="text-acsent/80 text-sm mt-2 tracking-wider font-bold text-center px-6">
                        Discover beauty that’s made for you
                    </p>
                    </div>

                    <div className="w-24 h-[2px] bg-acsent mb-8"></div>

                    <div className="px-10">
                    <p className="text-acsent/90 text-lg font-bold text-center leading-7">
                        Welcome back! 
                        <br />
                        Log in to explore premium products designed for your skin type, lifestyle, and natural beauty.
                    </p>
                    </div>

                    <div className="flex gap-6 mt-10">
                    <div className="bg-acsent/10 px-4 py-2 rounded-full text-acsent text-sm">
                        ✔ 100% Organic
                    </div>
                    <div className="bg-acsent/10 px-4 py-2 rounded-full text-acsent text-sm">
                        ✔ Dermatologist Tested
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 w-full h-full flex justify-center items-center">
                <div className="flex flex-col justify-center items-center w-[500px] h-[600px] bg-white-400 md:shadow-xl rounded-lg backdrop-blur-md relative">
                    <button 
                    onClick={()=>navigate('/register')}
                    className=" absolute top-10 right-10 bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer">
                    Register
                    </button>
                    <form className="px-10 flex flex-col gap-4 justify-center items-center text-lg" >
                        <h1 className="text-acsent text-3xl font-bold">Login</h1>
                        <label className="text-center font-semibold">Email:</label>
                        <input
                            type="email"
                            placeholder="hello@gmail.com"
                            name="email"
                            value={email}
                            required
                            className="border border-white outline-white p-1 rounded-lg w-72 "
                            onChange={(e)=>setemail(e.target.value)}
                        />
                        
                         <label className="text-center font-semibold">Password:</label>
                        <input
                            type="password"
                            placeholder="******"
                            name="password"
                            value={password}
                            required
                            className="border border-white outline-white p-1 rounded-lg w-72 "
                            onChange={(e)=>{setpassword(e.target.value)}}
                        />
                        <button 
                            className="w-1/2 bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
                            onClick={handlelogin} type="button"
                        >
                            Login
                        </button>
                        <button 
                            className="w-[250px] bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
                            onClick={LoginwithGoogle} type="button"
                        >
                            <div className="flex gap-2 items-center justify-center">
                            <GrGoogle/>
                            Login with Google
                            </div>
                        </button>
                    </form>
                    <Link to='/forgot_password' className="mt-5 text-sm font-bold hover:underline hover:text-blue-700">forgot password?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;