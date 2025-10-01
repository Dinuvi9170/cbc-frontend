import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

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
            <Link to="/admin/addproducts" className="absolute top-0 right-6 text-md border border-white w-35 h-10 py-2 font-bold bg-green-900 text-white rounded-lg text-center cursor-pointer">+Add Product</Link>
            <table className="w-full text-center mt-12">
                <thead>
                    <tr>
                        <th>productId</th>
                        <th>product Name</th>
                        <th>product Image</th>
                        <th>Labelled Price</th>
                        <th>price</th>
                        <th>Stock</th>
                        <th>Actions</th>
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
                                <th>
                                    <div className="flex justify-center items-center gap-5 cursor-pointer">
                                        <FaTrash color="red"/>
                                        <FaEdit color="blue"/>
                                    </div>
                                </th>
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