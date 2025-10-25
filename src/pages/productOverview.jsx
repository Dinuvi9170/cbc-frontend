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
                <div className="w-full h-full flex flex-col bg-primary justify-center items-center">
                    <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                    <h1 className="animate-pulse text-lg font-semibold text-blue-700">Loading...</h1>
                </div>
            ):
            !product?(
                <div className="w-full h-full flex flex-col bg-primary pt-20 items-center"> 
                    <h1 className="text-2xl font-semibold text-blue-700">Product details not found.</h1>
                </div>
            ):
            (
                <div className="flex w-full h-full bg-primary px-50 py-10 ">
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
                        <div className="flex justify-center gap-5 mt-10">
                            <span>Quantity</span>
                            <div className="flex border border-2 border-secondary rounded-lg">
                                <button 
                                    className="bg-gray-200 rounded-tl-md font-bold text-xl rounded-bl-md px-2"
                                    onClick={()=>{handleQuantity("-")}}>-</button>
                                <span className="bg-white px-3">{qty || null}</span>
                                <button 
                                    className="bg-gray-200 rounded-tr-md font-bold text-xl rounded-br-md px-2"
                                    onClick={()=>{handleQuantity("+")}}>+</button>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-10">
                            <button 
                                className="bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
                                 onClick={handleAddcart}
                            >
                                    Add to Cart
                            </button>
                            <button 
                                className="bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
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
                    </div>
                </div>
            )}
        </>
    )
};

export default ProductOverview;