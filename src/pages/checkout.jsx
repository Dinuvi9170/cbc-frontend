import axios from "axios";
import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Checkout = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [cart, setCart] = useState(location.state.cart);
    const [address,SetAddress]=useState('');
    const [phone,SetPhone]=useState('');
    const [name,Setname]=useState('');
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
            Setname(decoded.firstName + " " + decoded.lastName);
        } catch (err) {
            console.error("Token decode failed:", err);
        }
        }
    }, []);

    if (!user) {
        return (
        <div className="w-full h-screen flex items-center justify-center">
            <p className="text-xl text-gray-700">Loading user info...</p>
        </div>
        );
    }

    const GetTotals=()=>{
        let Subtotal =0;
        let Total=0;
        
        for(let i=0;i<cart.length;i++){
            Subtotal+=(cart[i].labeledPrice*cart[i].quantity);
            Total+=(cart[i].normalPrice*cart[i].quantity);
        }
        let Discount=(Subtotal-Total);
        return {Subtotal,Total,Discount};
    }

    const handlePlaceorder= async()=>{
        const token= localStorage.getItem("token");
        if(!token){
            toast.error("Please login first")
            return;
        }
        if(!address||!phone ){
            toast.error("Please enter your address and phone number")
            return;
        }
        const phonecheck = /^\d{10}$/;
        if (!phonecheck.test(phone)) {
            toast.error("Phone number must contain exactly 10 digits");
            return;
        }

        if (!user) {
            toast.error("User information missing");
            return;
        }

        const orderInformation={
            name:name,
            email: user.email,
            address,
            phone,
            products:cart.map((item)=>({
                productId:item.productId,
                quantity:item.quantity
            })
        )}
        
        try{
            const res= await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/orders/',orderInformation,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            toast.success('Order placed successfully')
            console.log(res.data)
            setCart([]);
            localStorage.removeItem("cart");
            navigate('/products')

        }catch(err){
            console.log(err);
            toast.error('error in placing order')
            return;
        }
    }
    
    return (
        <div className="w-full h-full bg-primary px-10 py-10">
            <h1 className=" text-center text-3xl font-bold text-acsent mb-8">Checkout</h1>
            <div className="flex justify-center items-center px-10 gap-4">
                <div className="w-1/2 max-w-3xl bg-white shadow-lg rounded-2xl -mt-6 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
                    <div className="flex gap-6 mb-6">
                        <label className="block font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => Setname(e.target.value)}
                            className="w-full border p-2 rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="flex gap-6 mb-6">
                        <label className="block font-semibold">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full border p-2 rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-2 mb-6">
                            <label className="block font-semibold">Address</label>
                            <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => SetAddress(e.target.value)}
                            className="border p-3 rounded-lg w-full"
                            />
                        </div>
                        <div className="flex gap-3 mb-6">
                            <label className="block font-semibold">Contact </label>
                            <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => SetPhone(e.target.value)}
                            maxLength={10}
                            pattern="\d{10}"
                            className="border p-3 rounded-lg w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-2/5 max-w-3xl bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Order Summary
                    </h2>

                    {cart.length === 0 ? (
                    <p className="text-gray-500 text-center">Your cart is empty.</p>
                    ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((item) => (
                        <div
                            key={item.productId}
                            className="flex justify-between items-center border-b border-gray-200 pb-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                            <p className="text-gray-600 line-through text-sm">
                                Rs. {(item.labeledPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-acsent font-bold text-lg">
                                Rs. {(item.normalPrice * item.quantity).toFixed(2)}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-lg mb-2">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold">
                            Rs. {GetTotals().Subtotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg mb-2">
                            <span className="text-gray-700">Discount</span>
                            <span className="text-green-600">
                            - Rs. {GetTotals().Discount.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold mt-4 border-t border-gray-200 pt-2">
                            <span className="text-gray-800">Total</span>
                            <span className="text-acsent">Rs. {GetTotals().Total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                    <button
                        className="bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md cursor-pointer"
                        onClick={handlePlaceorder} 
                    >
                        Place Order
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
