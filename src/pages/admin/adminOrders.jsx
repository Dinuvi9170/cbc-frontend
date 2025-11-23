import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminOrder =()=>{
    const [order,setOrder]=useState([])
    const [isloading,setIsLoading]=useState(true);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        if(isloading){
            const token= localStorage.getItem("token")
            if(!token){
                toast.error("Please login ")
                return;
            }
            try{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/",{
                    headers:{
                        "Authorization":"Bearer "+token
                    }
                }).then((res)=>{
                    console.log(res.data);
                    setOrder(res.data);
                    setIsLoading(false)
                })
            }catch(error){
                console.log(error)
            }
        }
    },[isloading])
    
    const filtered = order.filter((o) => {
        const d= new Date(o.date);

        const date= d.getFullYear().toString() +"-"+(d.getMonth()+1).toString()+"-"+d.getDate().toString();
        return o.orderId.toString().includes(search.toLowerCase()) || 
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase())||
        date.includes(search.toLowerCase());
    });

    const handleStatus= async (orderId,newStatus)=>{
        const token= localStorage.getItem("token")
            if(!token){
                toast.error("Please login ")
                return;
            }
            try{
                const res= await axios.put(import.meta.env.VITE_BACKEND_URL+`/api/orders/${orderId}`,
                    {status:newStatus},{
                    headers:{
                        "Authorization":"Bearer "+token
                    }
                })
                toast.success("Order status updated successfully");
                setIsLoading(true);
                console.log(res.data)

            }catch(error){
                console.log(error);
            }
    }
    return(
        (isloading)?(
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters color="gray" className="w-6 h-6 animate-spin"/> 
                <h1 className="animate-pulse text--lg font-semibold text-gray-500">Loading...</h1>
            </div>
        ):(order.length<=0)?(
            <div className="w-full h-full flex flex-col pt-20 bg-primary items-center"> 
                <h1 className="text-2xl font-semibold text-blue-700">No orders available</h1>
            </div>
        ):(<div className="w-full flex flex-col overflow-y-scroll p-4 shadow-md bg-gray-50">
            <input 
                type="text"
                placeholder="Search product ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 z-10 border-2 border-acsent rounded-xl shadow-sm mt-3 px-3 py-3 font-semibold text-lg "
            />
            <table className="w-full border-collapse mt-4">
                <thead className="bg-acsent text-white uppercase text-sm">
                    <tr className="bg-acsent text-white ">
                        <th className="p-2">Order ID</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Address</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((el)=>{
                        return(
                            <React.Fragment key={el.orderId}>
                            <tr key={el.orderId}
                                className="border-b border-acsent hover:bg-secondary transition text-md"
                            >
                                <th className="p-2">{el.orderId}</th>
                                <th className="p-2">{el.name}</th>
                                <th className="p-2">{el.email}</th>
                                <th className="p-2">{el.phone}</th>
                                <th className="p-2 max-w-[210px] break-words whitespace-normal ">{el.address}
                                </th>
                                <th className="p-2">Rs. {el.total.toFixed(2)}</th>
                                <th className="p-2">
                                    <select
                                        value={el.status} 
                                        onChange={(e)=>handleStatus(el.orderId,e.target.value)}
                                        className="hover:cursor-pointer hover:bg-white border rounded py-2">
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                        <option value="completed">Cancelled</option>
                                    </select>
                                </th>
                                <th>{new Date(el.date).toLocaleString()}</th>
                                <th>
                                    <button 
                                        onClick={()=>window.open(`/orders/${el.orderId}`, '_blank')}
                                        className="bg-acsent hover:bg-acsent/80 text-white px-1 py-1 rounded-md font-semibold text-md shadow-md cursor-pointer">
                                            View</button> 
                                </th>
                            </tr>
                            </React.Fragment>   
                        )
                    })}
                </tbody>
            </table>
        
        </div>)
    )
}
export default AdminOrder;