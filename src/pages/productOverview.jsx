import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";

const ProductOverview =()=>{
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [status,setStatus]=useState('loading')// success,loading,error

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`)
            .then(
                (response)=>{
                    setProduct(response.data);
                    setStatus("success");
                    console.log(response.data);
                }
            ).catch(
                (err)=>{
                    console.log(err);
                    setStatus("error");
                    toast.error("Error fetching product details")
                }
            )
        },[productId]
    )

    if(status==="loading"){
        return(
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                <h1 className="animate-pulse text-lg font-semibold text-blue-700">Loading...</h1>
            </div>
        )
    }

    if(!product){
        return(
            <div className="w-full h-screen flex flex-col pt-20 items-center"> 
                <h1 className="text-2xl font-semibold text-blue-700">Product details not found.</h1>
            </div>
        )
    }
    return(
        <div>
            product is {JSON.stringify(product)}
        </div>
    )
};

export default ProductOverview;