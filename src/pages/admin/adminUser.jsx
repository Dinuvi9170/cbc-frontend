import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminUser =()=>{
    const [users,SetUsers] =useState([]);
    const [isLoading,setIsLoading]= useState(true);
    const [search,setSearch]=useState("");
    useEffect(()=>{
        if(isLoading){
            const token =localStorage.getItem("token");

            if(!token){
                toast.error("Please login ")
                return;
            }
            try{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
                    headers:{
                        "Authorization":"Bearer "+token
                    }
                }).then((res)=>{
                    SetUsers(res.data);
                    setIsLoading(false);
                })
            }catch(error){
                console.log(error);
                SetUsers([])
            }
        }
    },[isLoading])

    const handleStatus= async (userId,newValue)=>{
        const token= localStorage.getItem("token")
            if(!token){
                toast.error("Please login ")
                return;
            }
            const isBlocked = newValue === "2";
            try{
                const res= await axios.put(import.meta.env.VITE_BACKEND_URL+`/api/users/manage/${userId}`,
                    {isBlocked},{
                    headers:{
                        "Authorization":"Bearer "+token
                    }
                })
                setIsLoading(true);
                toast.success("Account status updated successfully");
                console.log(res.data);

            }catch(error){
                console.log(error);
            }
    }
    return (
        (isLoading)?(
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters color="gray" className="w-6 h-6 animate-spin"/> 
                <h1 className="animate-pulse text--lg font-semibold text-gray-500">Loading...</h1>
            </div>
        ):(users.length<=0)?(
            <div className="w-full h-full flex flex-col pt-20 bg-primary items-center"> 
                <h1 className="text-2xl font-semibold text-blue-700">No users available</h1>
            </div>
        ):(
            <div className="w-full flex flex-col overflow-y-scroll p-4 shadow-md bg-gray-50">
                <input
                    type="text"
                    placeholder="Search by name, email, role..."
                    className="w-full md:w-1/3 z-10 border-2 border-acsent rounded-xl shadow-sm mt-3 px-3 py-3 font-semibold text-lg"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="w-full text-center mt-5 min-w-[800px]">
                    <thead className="bg-acsent text-white uppercase text-sm">
                        <tr>
                            <th className="p-3">Profile</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Roles</th>
                            <th className="p-3">Joined</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id} className="border-b font-bold border-acsent hover:bg-secondary transition text-md">
                            <td className="p-3 flex justify-center"><img src={user.profileimage} className="w-15 h-15 rounded-full"/></td>
                            <td className="p-3">{user.firstName} {user.lastName}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">
                            {new Date(user.date).toLocaleString()}
                            </td>
                            <td className="p-3">
                                <select
                                    value={user.isBlocked?"2":"1"} 
                                    onChange={(e)=>handleStatus(user._id,e.target.value)}
                                    className="hover:cursor-pointer hover:bg-white border rounded py-2"
                                >
                                    <option value="1">Active</option>
                                    <option value="2">Blocked</option>
                                </select>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>    
            </div>
   
        )
    )
}

export default AdminUser;