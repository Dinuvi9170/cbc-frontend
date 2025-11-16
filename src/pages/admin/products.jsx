import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const AdminProducts=()=>{
    const [products,setproducts]= useState([]);
    const navigate= useNavigate();
    const [isLoading,setIsloading]=useState(true);

    useEffect(
        ()=>{
            if(isLoading===true){
                const token = localStorage.getItem("token");
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/",{
                    headers:{
                        "Authorization":"Bearer "+token
                    }
                })
                .then((res)=>{
                    console.log(res.data);
                    const sortedProducts = res.data.sort((a, b) => {
                        if (a.productId < b.productId) return -1;
                        if (a.productId > b.productId) return 1;
                        return 0;
                    });
                    setproducts(sortedProducts);
                    setIsloading(false);
                })
            }
        },[isLoading]
    );
    const handleDeleteproduct =(productId)=>{
        const token = localStorage.getItem("token");
        if(token===null){
            toast.error("Please login first")
            return;
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+ productId,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            .then(()=>{
                toast.success("Product deleted successfully")
            }).catch((e)=>{
                toast.error(e.response.data.message)
            })
    }
    return(
        (!isLoading) ?
            (<div className="w-full h-full max-h-full overflow-y-scroll relative p-6 bg-gray-50">
                <Link to="/admin/addproducts" className="mt-3 absolute top-0 right-6 bg-acsent hover:bg-acsent/80 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md cursor-pointer">+Add Product</Link>
                <table className="w-full text-center mt-12  min-w-[800px] ">
                    <thead className="bg-acsent text-white uppercase text-sm">
                        <tr>
                            <th className="py-3 px-2">productId</th>
                            <th className="py-3 px-2">product Name</th>
                            <th className="py-3 px-2">product Image</th>
                            <th className="py-3 px-2">Labelled Price</th>
                            <th className="py-3 px-2">price</th>
                            <th className="py-3 px-2">Stock</th>
                            <th className="py-3 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>{
                            return(
                                <tr key={product.productId}
                                    className="border-b border-acsent hover:bg-secondary transition-colors duration-200"
                                > 
                                    <th className="py-3 px-2">{product.productId}</th>
                                    <th className="py-3 px-2">{product.name}</th>
                                    <th className="py-3 px-2 flex justify-center"><img src={product.images[0]} className="w-[40px] h-[40px] object-cover rounded-md shadow-sm"/></th>
                                    <th className="py-3 px-2">{product.labeledPrice}</th>
                                    <th className="py-3 px-2 font-semibold text-red-600">{product.normalPrice.toFixed(2)}</th>
                                    <th className="py-3 px-2">{product.stock}</th>
                                    <th className="py-3 px-2">
                                        <div className="flex justify-center items-center gap-5 cursor-pointer">
                                            <FaTrash color="red" 
                                                className="hover:scale-120 transition-transform"
                                                onClick={()=>{
                                                    handleDeleteproduct(product.productId)
                                                    setIsloading(true)
                                                }}
                                            />
                                            <FaEdit color="blue"
                                                className="hover:scale-120 transition-transform"
                                                onClick={()=>{
                                                    navigate('/admin/editproducts',{
                                                        state:product
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>)
            :(
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
                 <h1 className="animate-pulse text--lg font-semibold text-blue-700">Loading...</h1>
            </div>)
        
        
    )
}

export default AdminProducts;