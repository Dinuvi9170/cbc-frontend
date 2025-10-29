import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const OrderProducts=()=>{
    const {orderId}=useParams()
    const [order,setorder]= useState([]);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(()=>{
      if(loading){
        const token=localStorage.getItem("token");
        if(!token){
        toast.error("Please login ")
          return;
        }
        try{
          axios.get(import.meta.env.VITE_BACKEND_URL+`/api/orders/${orderId}`,{
            headers:{
              "Authorization":"Bearer "+token
            }
          }).then((res)=>{
              console.log(res.data);
              setorder(res.data)
              setLoading(false)
            })
        }catch(error){
          console.log(error)
        }
      }
    },[loading])
   
    return(
      (!loading)?
      (<div className="px-10 py-10 flex justify-center">
        <div className="p-10 py-4 flex justify-center items-center w-[1200px] flex-col">
          <div className="font-bold mb-2 flex flex-col items-center">
            <span className="text-xl text-red-800 mb-10">Order Summary</span>
            <span className="text-md">OrderId: {orderId}</span>
          </div>
          <div className="px-40 py-4 w-[1200px] text-md flex max-w-[1200px] justify-start items-center ">
            <div className="flex flex-col justify-center">
              <span>Date: {new Date(order.date).toLocaleDateString()}</span>
              <span>Customer Name: {order.name}</span>   
              <span className="text-md">Email: {order.email}</span> 
              <span className="text-md">Phone: {order.phone}</span> 
              <span className="text-md">Address: {order.address}</span>
            </div> 
          </div>
          <table className="w-[1100px] p-10 py-4 text-sm border border-acsent text-center">
            <thead>
              <tr  className="bg-acsent text-white">
                <th className="p-2">Product ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2 flex items-center">Image</th>
              </tr>
              </thead>
                <tbody>
                  {order.products?.map((p,index) => (
                    <tr key={index}>
                      <td className="p-2">{p.productInfo.productId}</td>
                      <td className="p-2 max-w-[100px] break-words whitespace-normal">{p.productInfo.name}</td>
                      <td className="p-2">{p.quantity}</td>
                      <td className="p-2">
                        Rs. {p.productInfo.normalPrice.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <img
                          src={p.productInfo?.images[0]}
                          alt={p.productInfo?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>          
          </table>
          <div className="p-10 py-4 w-[750px] text-md flex justify-end items-center">
            <div className="flex flex-col justify-end">
              <div className="flex text-md">
                <span>Subtotal: </span>
                <span>Rs. {Number(order.labelTotal).toFixed(2)}</span>
              </div>
              
              <div className="flex text-lg">
                <span className="font-bold">Total: </span>
                <span className="ml-6 text-red-700 font-bold">Rs. {Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={()=>window.print()}
              className="bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer print:hidden"
              >print</button>
            <button onClick={()=>{
              window.close();
              navigate('/admin/orders')
            }}
              className="bg-acsent hover:bg-acsent/80 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-md cursor-pointer print:hidden"
              >Close</button>
          </div>
        </div>
      </div>):(
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
          <h1 className="animate-pulse text--lg font-semibold text-blue-700">Loading...</h1>
        </div>
      )                
    )
}
export default OrderProducts;