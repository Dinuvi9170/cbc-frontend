import { useState } from "react";
import { Addcart, DeleteCart, GetCart } from "../utils/cart";
import { BiTrash } from "react-icons/bi";

const Cart =()=>{
    const [cart,SetCart]=useState(GetCart());

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
        <div className="w-full h-screen flex flex-col pt-20 bg-primary items-center"> 
            <h1 className="text-2xl font-semibold text-blue-700">Your cart is empty</h1>
        </div>
        ):(
        <div className="w-full h-screen items-center flex flex-col bg-primary py-10">
            {cart.map(
                (product)=>{
                    return(
                        <div key={product.productId} className="flex">
                            <div className="w-[600px] h-[100px] m-1 items-center bg-white rounded-2xl shadow-2xl flex">
                                <img className="object-cover w-25 h-25 rounded-2xl" src={product.image}/>
                                <div className="flex w-2/5 flex-col ml-4 text-sm">
                                    <span>{product.productId}</span>
                                    <span>{product.name}</span>
                                    <div className="flex gap-5 justify-start">
                                        <span className="text-gray-500 line-through text-md">
                                            Rs. {product.labeledPrice.toFixed(2)}
                                        </span>
                                        <span className="text-acsent font-bold text-md">
                                            Rs. {product.normalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center ml-4">
                                    <button className=" p-3 font-bold text-red-600 text-3xl cursor-pointer "
                                        onClick={()=>{handleqty(product.productId,-1)}}
                                    >-</button>
                                    <span className="w-5 h-5 flex justify-center items-center">{product.quantity}</span>
                                    <button className="p-3 font-bold text-3xl text-red-600 cursor-pointer"
                                        onClick={()=>{handleqty(product.productId,1)}}
                                    >+</button>
                                </div>
                                <div className="ml-4 text-acsent font-bold text-lg">{(product.normalPrice*product.quantity).toFixed(2)}</div>
                            </div>
                            <div 
                                className="flex justify center items-center p-3 cursor-pointer"
                                onClick={()=>removefromCart(product.productId)}
                            > 
                                <BiTrash fill="red" className="w-6 h-6"/>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
        )
    )
}

export default Cart;