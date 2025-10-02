import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

            if(response.data.role=="Admin"){
                navigate('/admin/products');
            }else{
                navigate('/');
            }
        }catch(e){
            toast.error(e.response.data.message);
        }
    }

    return(
        <div className="w-full h-screen bg-[url('/images/cosmetic-oil.jpg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-1/2 h-full"></div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="flex justify-center items-center w-[500px] h-[600px] bg-white-400 shadow-xl rounded-lg backdrop-blur-md">
                    <form className="flex flex-col gap-4 text-lg" >
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
                            className="border border-white font-bold bg-green-200 text-green-800 mt-5 py-1 rounded-lg w-30 text-center mx-20 cursor-pointer"
                            onClick={handlelogin} type="button"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;