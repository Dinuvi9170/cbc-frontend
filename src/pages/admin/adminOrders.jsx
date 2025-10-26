import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderProducts from "../../components/orderProducts";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminOrder =()=>{
    const [order,setOrder]=useState([])
    const [isloading,setIsLoading]=useState(true);
    const [selected,setSelected]=useState(null)

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
    return(
        (isloading)?(
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                <h1 className="animate-pulse text--lg font-semibold text-blue-700">Loading...</h1>
            </div>
        ):(order.length<=0)?(
            <div className="w-full h-full flex flex-col pt-20 bg-primary items-center"> 
                <h1 className="text-2xl font-semibold text-blue-700">No orders available</h1>
            </div>
        ):(<div className="w-full overflow-y-scroll p-4 shadow-md bg-gray-50">
            <table className="w-full border-collapse">
                <thead>
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
                    {order.map((el,index)=>{
                        return(
                            <React.Fragment key={el.orderId}>
                            <tr key={el.orderId}
                                className="border-b border-acsent hover:bg-secondary transition text-md"
                            >
                                <th className="p-4">{el.orderId}</th>
                                <th className="p-4">{el.name}</th>
                                <th className="p-4">{el.email}</th>
                                <th className="p-4">{el.phone}</th>
                                <th className="p-4 max-w-[210px] break-words whitespace-normal ">{el.address}
                                </th>
                                <th className="p-4">Rs. {el.total.toFixed(2)}</th>
                                <th>
                                    <select
                                        value={el.status} 
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
                                        onClick={()=>setSelected(selected===index?null:index)}
                                        className="bg-acsent hover:bg-acsent/80 text-white px-1 py-1 rounded-md font-semibold text-md shadow-md cursor-pointer">
                                            {selected===index?"Hide":"View"}</button> 
                                </th>
                            </tr>
                            {selected ===index &&(
                                <tr>
                                    <td colSpan='6'>
                                        <OrderProducts products={el.products}/>
                                    </td>
                                </tr>
                            )}
                            </React.Fragment>   
                        )
                    })}
                </tbody>
            </table>
        
        </div>)
    )
}
export default AdminOrder;