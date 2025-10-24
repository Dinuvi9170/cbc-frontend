import {  useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const location=useLocation();
    const [cart, setCart] = useState(location.state.cart);

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
    
    return (
        <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10 px-5">
        <h1 className="text-3xl font-bold text-acsent mb-8">Checkout</h1>

        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
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
                className="bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md"
                
            >
                Place Order
            </button>
            </div>
        </div>
        </div>
    );
};

export default Checkout;
