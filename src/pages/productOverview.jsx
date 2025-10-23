import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { Addcart, GetCart } from "../utils/cart";

const ProductOverview =()=>{
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [status,setStatus]=useState('loading')// success,loading,error
    const navigate= useNavigate();

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

    return(
        <>
            {status=="loading"?(
                <div className="w-full h-screen flex flex-col bg-primary justify-center items-center">
                    <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                    <h1 className="animate-pulse text-lg font-semibold text-blue-700">Loading...</h1>
                </div>
            ):
            !product?(
                <div className="w-full h-screen flex flex-col bg-primary pt-20 items-center"> 
                    <h1 className="text-2xl font-semibold text-blue-700">Product details not found.</h1>
                </div>
            ):
            (
                <div className="flex w-full h-screen bg-primary px-50 py-10 ">
                    <div className="flex justify-center items-center w-1/2 h-full bg-white">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-1/2 h-full bg-white flex flex-col px-10 pt-20">
                        <div className="text-center text-3xl font-semibold">{product.name}</div>
                        <div className="flex justify-center">
                            {product.alternativeNames?.map(
                                (alt,index)=>(
                                    <div key={index} className="text-center text-xl font-semibold">{alt+ "|"}</div>
                                )
                            )}
                        </div>
                        <div className="text-center text-sm text-gray-500 ">{product.productId}</div>
                        <div className="text-md mt-10 text-gray-600">{product.description}</div>
                        {product.labeledPrice > product.normalPrice ?(
                            <div className="flex gap-5 mt-6 justify-center">
                                <span className="text-gray-500 line-through text-2xl">
                                    Rs. {product.labeledPrice.toFixed(2)}
                                </span>
                                <span className="text-acsent font-bold text-2xl">
                                    Rs. {product.normalPrice.toFixed(2)}
                                </span>
                            </div>
                        ):(
                            <div className="flex gap-5 mt-6 justify-center">
                                <span className="text-acsent font-bold text-2xl">
                                    Rs. {product.normalPrice.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-center gap-4 mt-10">
                            <button 
                                className="w-30 text-lg font-bold px-2 h-10 rounded-xl bg-secondary hover:bg-secondary/70 text-acsent cursor-pointer"
                                 onClick={()=>{
                                    Addcart(product, 1);
                                    navigate('/cart')
                                }}
                            >
                                    Add to Cart
                            </button>
                            <button 
                                className="w-30 text-lg font-bold px-2 h-10 rounded-xl bg-secondary hover:bg-secondary/70 text-acsent cursor-pointer">
                                    Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default ProductOverview;