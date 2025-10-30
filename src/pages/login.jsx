import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

            if(response.data.role=="Admin"){
                navigate('/admin/products');
            }else{
                navigate('/');
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
                localStorage.getItem("token",token)
                if(res.data.role=="Admin"){
                    navigate('/admin/products');
                }else{
                    navigate('/');
                }
            }catch(error){
                console.log(error)
                toast.error("Login failed")
            }    
         }
    })

    return(
        <div className="w-full h-screen bg-[url('/images/cosmetic-oil.jpg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-1/2 h-full hidden md:block"></div>
            <div className="md:w-1/2 w-full h-full flex justify-center items-center">
                <div className="flex justify-center items-center w-[500px] h-[600px] bg-white-400 md:shadow-xl rounded-lg backdrop-blur-md relative">
                    <button 
                    onClick={()=>navigate('/register')}
                    className=" absolute top-10 right-10 bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer">
                    Register
                    </button>
                    <form className="px-10 flex flex-col gap-4 justify-center items-center text-lg" >
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
                </div>
            </div>
        </div>
    )
}

export default Login;