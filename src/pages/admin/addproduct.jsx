import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mediaupload from "../../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";
const Addproducts = () => {
    const navigate= useNavigate();
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [description, setDescription] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [normalPrice, setNormalPrice] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);

    const handleAddproducts= async(e)=>{
        const token= localStorage.getItem("token");
        if(token==null){
            toast.error("Please login first");
            return;
        }

        if(images.length===0){
            toast.error("Please select atleast one image")
            return;
        }
        const imagesArray=[];

        for(let i=0;i<images.length;i++){
            imagesArray[i]=mediaupload(images[i]);
        }
        try{
            const urls= await Promise.all(imagesArray)
            console.log(urls);

            const altArray=alternativeNames.split(",")
            const product ={
                productId:productId,
                name:name,
                description:description,
                alternativeNames:altArray,
                labeledPrice:labeledPrice,
                normalPrice:normalPrice,
                images:urls,
                stock:stock
            }
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products/",product,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            }).then(()=>{
                toast.success("Product added sucessfully")
                navigate("/admin/products/")
            }).catch((e)=>toast.error(e.response.data.message))    
        }catch{
            console.log(e)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <form
                className="flex flex-col gap-4 p-8 bg-gray-100 shadow-lg rounded-lg w-[500px]"
            >
                <h2 className="text-2xl font-bold text-center">Add Product</h2>

                <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <input
                type="text"
                placeholder="Alternative Name (optional)"
                value={alternativeNames}
                onChange={(e) => setAlternativeNames(e.target.value)}
                className="border p-2 rounded"
                />

                <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <input
                type="number"
                placeholder="Labeled Price"
                value={labeledPrice}
                onChange={(e) => setLabeledPrice(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <input
                type="number"
                placeholder="Normal Price"
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="file"
                multiple
                placeholder="Image URL" 
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="border p-2 rounded"
                />
                <div className="flex justify-center items-center gap-5">
                    <Link to="/admin/products"
                        className="border border-white font-bold bg-red-200 text-red-800 mt-5 py-1 rounded-lg w-30 text-center cursor-pointer"
                    >Cancel</Link>
                    <button
                    type="button"
                    className="border border-white font-bold bg-green-200 text-green-800 mt-5 py-1 rounded-lg w-30 text-center cursor-pointer"
                    onClick={handleAddproducts}
                    >
                    Add Product
                    </button>
                </div>
            </form>

        </div>
    );
};
export default Addproducts;
