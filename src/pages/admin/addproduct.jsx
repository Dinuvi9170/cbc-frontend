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
    const [category, setCategory] = useState("");
    const [skinType, setSkinType] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSkinTypeChange = (type) => {
        setSkinType((prev) =>
            prev.includes(type)
            ? prev.filter((t) => t !== type) 
            : [...prev, type]                
        );
    };

    const handleAddproducts= async(e)=>{
        const token= localStorage.getItem("token");
        if(token==null){
            toast.error("Please login first");
            return;
        }
        if(!productId || !name || !description || !labeledPrice || !normalPrice || !category){
            toast.error("Please fill all required fields")
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
            setLoading(true);
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
                category:category,
                skinType:skinType,
                stock:stock
            }
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products/",product,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            }).then(()=>{
                toast.success("Product added sucessfully")
                setLoading(false);
                navigate("/admin/products/")
            }).catch((e)=>toast.error(e.response.data.message))    
        }catch{
            console.log(e)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <form
                className="flex flex-col gap-4 p-8 bg-gray-100 h-screen overflow-y-scroll shadow-lg rounded-lg w-[500px]"
            >
                <h2 className="text-2xl font-bold text-acsent text-center">Add Product</h2>

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
                className="border p-2 rounded min-h-20"
                required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="Bodycare">Bath & Body</option>
                    <option value="Other">Other</option>
                </select>

                <label className="text-sm font-medium text-gray-900">Put a
                    tick for suitable Skin Type(s):</label>
                <div className="grid grid-cols-3 gap-2 text-gray-700">
                    {["Dry", "Oily", "Normal", "Sensitive"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={skinType.includes(type)}
                                onChange={() => handleSkinTypeChange(type)}
                            />
                            {type}
                        </label>
                    ))}
                </div>

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
                        className="border-2 border-read-800 font-bold text-red-800 mt-5 py-1 rounded-lg w-30 text-center cursor-pointer"
                    >Cancel</Link>
                    <button
                    type="button"
                    className=" font-bold bg-acsent hover:bg-acsent/80 text-white mt-5 py-1 rounded-lg w-30 text-center shadow-md cursor-pointer"
                    onClick={handleAddproducts}
                    >
                    {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>

        </div>
    );
};
export default Addproducts;
