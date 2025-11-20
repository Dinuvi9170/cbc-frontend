import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { Addcart} from "../utils/cart";

const ProductOverview =()=>{
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [status,setStatus]=useState('loading')// success,loading,error
    const [qty,setQuantity]=useState(null);
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

    const handleQuantity=(action)=>{
        if(qty>1){
            if(action==="-"){
                setQuantity(qty-1);
            }
        }
        if(action==="+"){
            setQuantity(qty+1);
        }

    }
    const handleAddcart=(quantity)=>{
        if(qty===null|| qty<=0){
            quantity=1;
        }else{
            quantity=qty;
        }
        toast.success("product added to the cart successfully")
        setQuantity(qty)
        Addcart(product,quantity)
    }

    return(
        <>
            {status=="loading"?(
                <div className="w-full h-screen flex flex-col bg-primary justify-center items-center">
                    <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                    <h1 className="animate-pulse text-lg font-semibold text-blue-700">Loading...</h1>
                </div>
            ):
            !product?(
                <div className="w-full h-screen flex flex-col bg-primary pt-[80px] items-center"> 
                    <h1 className="text-2xl font-semibold text-blue-700">Product details not found.</h1>
                </div>
            ):
            (
                <div className="flex w-full flex-col md:flex-row h-full py-5 md:pt-[100px] bg-white md:bg-primary md:px-50 md:py-10 ">
                    <div className="md:hidden mt-5 px-10 pt-[80px]">
                        <div className="text-center text-3xl font-semibold">{product.name}</div>
                        <h1 className="flex-col text-center justify-center ">
                            {product.alternativeNames?.map(
                                (alt,index)=>(
                                    <span key={index} className=" text-xl font-semibold">{alt}                                  
                                        <span className="mx-2 text-gray-400">|</span>                               
                                    </span>
                                )
                            )}
                        </h1>
                    </div>
                    <div className="flex md:flex-col bg-white justify-center items-center w-full md:w-1/2 min-h-[600px] h-full ">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="md:w-1/2 w-full h-full md:min-h-[600px] bg-white flex flex-col px-10 md:pt-20">
                        <div className="text-center text-3xl hidden md:block font-semibold">{product.name}</div>
                        <h1 className="flex-col text-center hidden md:block justify-center ">
                            {product.alternativeNames?.map(
                                (alt,index)=>(
                                    <span key={index} className=" text-xl font-semibold">{alt}                                  
                                        <span className="mx-2 text-gray-400">|</span>                               
                                    </span>
                                )
                            )}
                        </h1>
                        <div className="text-center text-sm hidden md:block text-gray-500 ">{product.productId}</div>
                        <div className="text-md md:mt-10 text-gray-600">{product.description}</div>
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
                        <div className="flex items-center justify-center gap-5 mt-10">
                            <span className="text-lg font-semibold">Quantity</span>
                            <div className="flex w-24 h-10 border border-2 border-secondary rounded-lg">
                                <button 
                                    className="bg-gray-200 rounded-tl-md font-bold text-xl w-8 rounded-bl-md px-2"
                                    onClick={()=>{handleQuantity("-")}}>-</button>
                                <span className="bg-white px-3 w-8 flex items-center">{qty || null}</span>
                                <button 
                                    className="bg-gray-200 rounded-tr-md font-bold text-xl w-8 rounded-br-md px-2"
                                    onClick={()=>{handleQuantity("+")}}>+</button>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-10">
                            <button 
                                className="bg-acsent hover:bg-acsent/80 text-white px-2 md:px-8 md:py-3 rounded-xl font-semibold text-md md:text-lg shadow-md cursor-pointer"
                                 onClick={handleAddcart}
                            >
                                    Add to Cart
                            </button>
                            <button 
                                className="bg-acsent hover:bg-acsent/80 text-white px-2 md:px-8 py-3 rounded-xl font-semibold text-md md:text-lg shadow-md cursor-pointer"
                                onClick={()=>{if(qty>=1){
                                    navigate('/checkout',{
                                        state:{
                                            cart:[{
                                                productId:product.productId,
                                                name:product.name, 
                                                labeledPrice:product.labeledPrice,
                                                normalPrice:product.normalPrice,
                                                image:product.images[0],
                                                quantity:qty
                                            }]
                                        }
                                    })
                                }}}
                            >
                                    Buy Now
                            </button>
                        </div>                
                        <div className="mt-3">
                            {product.stock > 0 ? (
                                <span className="text-md font-medium text-green-600">
                                    ✔ In Stock ({product.stock})
                                 </span>
                            ) : (
                                <span className="text-sm font-medium text-red-600">
                                    ✘ Out of Stock
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default ProductOverview;