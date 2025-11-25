import { useState } from "react";
import { Addcart, DeleteCart, GetCart, GetTotal } from "../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Cart =()=>{
    const [cart,SetCart]=useState(GetCart());
    const navigate= useNavigate();

    const handleqty=(productId,quantity)=>{
        const product=cart.find((product)=>{
            return product.productId===productId;
        })
        if(!product){
            return;
        }
        Addcart(product,quantity);
        SetCart(GetCart());
    }

    const removefromCart=(productId)=>{
        const product=cart.find((product)=>{
            return product.productId===productId;
        })
        if(product!=-1){
            DeleteCart(productId);
            SetCart(GetCart());
        }
    }

    return(
        (cart.length<=0)?(
        <div className="w-full h-screen flex flex-col pt-50 bg-primary items-center"> 
            <h1 className="text-2xl font-semibold text-gray-500">Your cart is empty</h1>
        </div>
        ):(
        <div className="md:flex px-1 py-2 w-full h-screen md:px-40 pt-[90px] md:pt-[100px] md:py-10 bg-primary justify-center ">
            <h1 className="md:hidden text-2xl text-center font-bold text-acsent ml-3 mb-4">Your Shopping Cart</h1>
            <div className="md:w-2/3 w-full h-full flex flex-col md:py-10">
                <h1 className="hidden md:block text-3xl font-bold text-acsent ml-3 mb-4">Your Shopping Cart</h1>
                {cart.map(
                    (product)=>{
                        return(
                            <div key={product.productId} className="flex px-2 md:px-0 justify-center items-center">
                                <div className="relative md:w-[600px] w-[320px] md:h-[100px] m-1 items-center bg-white rounded-2xl py-1 md:p-0 px-1 md:p-0 shadow-2xl md:flex">
                                    <div className="md:hidden absolute ">
                                        <img className=" object-cover w-25 h-25 rounded-2xl" src={product.image}/>
                                    </div>
                                    <img className="hidden md:block object-cover w-25 h-25 rounded-2xl" src={product.image}/>
                                    <div className="flex pl-25 md:pl-0 w-2/5 flex-col ml-4 text-sm">
                                        <span>{product.productId}</span>
                                        <span className="min-w-[180px]">{product.name}</span>
                                        {(product.labeledPrice<=product.normalPrice)?(
                                            <span className="text-acsent font-bold text-md">
                                                Rs. {product.normalPrice.toFixed(2)}
                                            </span>
                                        ):(<div className="flex gap-5 min-w-[180px] justify-start">
                                            <span className="text-gray-500 line-through text-md">
                                                Rs. {product.labeledPrice.toFixed(2)}
                                            </span>
                                            <span className="text-acsent font-bold text-md">
                                                Rs. {product.normalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        )}
                                    </div>
                                    <div className="flex pl-15 md:pl-0 justify-center items-center ml-4">
                                        <button className=" p-3 font-bold text-red-600 text-3xl cursor-pointer "
                                            onClick={()=>{handleqty(product.productId,-1)}}
                                        >-</button>
                                        <span className="w-5 h-5 flex justify-center items-center">{product.quantity}</span>
                                        <button className="p-3 font-bold text-3xl text-red-600 cursor-pointer"
                                            onClick={()=>{handleqty(product.productId,1)}}
                                        >+</button>
                                    </div>
                                    <div className="ml-4 pl-35 md:pl-0 text-acsent font-bold text-lg">{(product.normalPrice*product.quantity).toFixed(2)}</div>
                                </div>
                                <div 
                                    className="flex w-8 h-8 justify-center items-center cursor-pointer hover:bg-red-300 hover:rounded-full "
                                    onClick={()=>removefromCart(product.productId)}
                                > 
                                    <BiTrash fill="red" className="w-6 h-6"/>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="w-full md:w-1/2 h-full justify-center flex py-5  md:py-10 ">
                <div className=" w-[320px] md:w-[400px] h-[340px] bg-white rounded-xl py-5 px-5 border border-gray-200 border-2">
                    <div className="text-center font-bold text-2xl">Order Summary</div>
                    <div className="flex flex-col px-6 pt-5 gap-2 ">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-lg font-semibold">SubTotal</span>
                            <span className="text-lg font-semibold">Rs:{GetTotal().Subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-500 text-lg font-semibold">Discount</span>
                            <span className="text-lg font-semibold">Rs:{GetTotal().Discount.toFixed(2)}</span>
                        </div>
                            <div className="border-b border-2 "/>
                    
                        <div className="flex justify-between mt-5">
                            <span className="text-black text-lg font-semibold">Total</span>
                            <span className="text-2xl font-bold">Rs:{GetTotal().Total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button
                                className="bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
                                onClick={()=>navigate('/checkout',{
                                    state: {
                                        cart:cart
                                    }
                                })}
                            >Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        )
    )
}

export default Cart;