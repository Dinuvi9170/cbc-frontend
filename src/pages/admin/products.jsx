import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProducts=()=>{
    const [products,setproducts]= useState([]);

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/",{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            .then((res)=>{
                console.log(res.data)
                setproducts(res.data)
            })
        },[]
    )
    return(
        <div className="w-full h-full max-h-full overflow-y-scroll relative">
            <Link to="/admin/addproducts" className="absolute bottom-5 right-5 text-xl border border-white w-15 h-10 font-bold bg-green-900 text-white rounded-lg text-center cursor-pointer">+</Link>
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>productId</th>
                        <th>product Name</th>
                        <th>product Image</th>
                        <th>Labelled Price</th>
                        <th>price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>{
                        return(
                             <tr key={product.productId}> 
                                <th>{product.productId}</th>
                                <th>{product.name}</th>
                                <th><img src={product.images[0]} className="w-[40px] h-[40px] "/></th>
                                <th>{product.labeledPrice}</th>
                                <th>{product.normalPrice}</th>
                                <th>{product.stock}</th>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminProducts;