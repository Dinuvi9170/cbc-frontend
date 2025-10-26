import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const OrderProducts=()=>{
    const {orderId}=useParams()
    const [order,setorder]= useState([]);
    const [loading,setLoading]=useState(true);
    console.log( order);

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
      <div className="px-10 py-10 flex justify-center">
        <div className="p-10 py-4 flex justify-center border items-center w-[1200px] flex-col">
          <div className="font-bold mb-2 flex flex-col items-center">
            <span className="text-xl text-red-800 mb-10">Order Summary</span>
            <span className="text-md">OrderId: {orderId}</span> 
          </div>
          <div className="p-10 py-4 w-[1200px] flex justify-evenly items-center ">
            <div className="flex flex-col justify-center items-center">
              <span>Customer Name: {order.name}</span>
            </div> 
            <div className="flex flex-col justify-center items-center">
              <span>Date: {new Date(order.date).toLocaleDateString()}</span>
            </div> 

          </div>
          <table className="w-[1100px] p-10 py-4 text-sm border border-acsent text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2 flex items-center">Image</th>
              </tr>
              </thead>
                {/* <tbody>
                  {products.map((p) => (
                    <tr key={p.productInfo.productId}>
                      <td className="p-2">{p.productInfo.productId}</td>
                      <td className="p-2">{p.productInfo.name}</td>
                      <td className="p-2">{p.quantity}</td>
                      <td className="p-2">
                        Rs. {p.productInfo.normalPrice.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <img
                          src={p.productInfo.images[0]}
                          alt={p.productInfo.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>           */}
          </table>
          <button onClick={()=>window.print()}>print</button>
        </div>
      </div>                    
    )
}
export default OrderProducts;