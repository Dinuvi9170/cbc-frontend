import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaupload from "../../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";
const EditProducts = () => {
    const navigate= useNavigate();
    const location= useLocation();
    console.log(location)
    const [productId, setProductId] = useState(location.state.productId);
    const [name, setName] = useState(location.state.name);
    const [alternativeNames, setAlternativeNames] = useState(location.state.alternativeNames.join(","));
    const [description, setDescription] = useState(location.state.description);
    const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
    const [normalPrice, setNormalPrice] = useState(location.state.normalPrice);
    const [stock, setStock] = useState(location.state.stock);
    const [category,setCategory]= useState(location.state.category);
    const [skinType,setSkinType]= useState(location.state.skinType);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSkinTypeChange = (type) => {
        setSkinType((prev) =>
            prev.includes(type)
            ? prev.filter((t) => t !== type) 
            : [...prev, type]                
        );
    };

    const handleEditproducts= async(e)=>{
        const token= localStorage.getItem("token");
        if(token==null){
            toast.error("Please login first");
            return;
        }

        let urls=location.state.images;
        const imagesArray=[];

        for(let i=0;i<images.length;i++){
            imagesArray[i]=mediaupload(images[i]);
        }
        try{
            setLoading(true);
            if(images.length>0){
                urls= await Promise.all(imagesArray)
            }
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
            await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId,product,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            }).then(()=>{
                toast.success("Product updated sucessfully")
                setLoading(false);
                navigate("/admin/products/")
            }).catch((e)=>toast.error(e.response.data.message))    
        }catch{
            console.log(e)
        }
    }

    return (
        <div className=" w-full h-full flex flex-col justify-center items-center ">
            <form
                className=" flex flex-col gap-4 p-8 bg-gray-100 shadow-lg rounded-lg 
                h-screen overflow-y-scroll w-[500px]"
            >
                <h2 className="text-2xl font-bold text-center text-acsent">Update Product</h2>
                <label className="text-center font-bold ">ProductId</label>
                <input
                type="text"
                disabled
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <label className="text-center font-bold ">Name</label>
                <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <label className="text-center font-bold ">Other Names</label>
                <input
                type="text"
                placeholder="Alternative Name (optional)"
                value={alternativeNames}
                onChange={(e) => setAlternativeNames(e.target.value)}
                className="border p-2 rounded"
                />

                <label className="text-center font-bold">Description</label>
                <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded min-h-20"
                required
                />

                <select
                    value={category || ""}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="Bodycare">Bath & Body</option>
                    <option value="other">Other</option>
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

                <label className="text-center font-bold ">Labelled Price</label>
                <input
                type="number"
                placeholder="Labeled Price"
                value={labeledPrice.toFixed(2)}
                onChange={(e) => setLabeledPrice(e.target.value)}
                className="border p-2 rounded"
                required
                />

                <label className="text-center font-bold ">Price</label>
                <input
                type="number"
                placeholder="Normal Price"
                value={normalPrice.toFixed(2)}
                onChange={(e) => setNormalPrice(e.target.value)}
                className="border p-2 rounded"
                required
                />
                
                <label className="text-center font-bold ">Stock</label>
                <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border p-2 rounded"
                />

                <label className="text-center font-bold ">Product Images </label>
                <input
                type="file"
                multiple
                placeholder="Image URL" 
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="border p-2 rounded"
                />
                <div className="flex justify-center items-center gap-5">
                    <Link to="/admin/products"
                        className="border-read-800 border-2 font-bold text-red-800 mt-5 py-1 rounded-lg w-30 text-center cursor-pointer"
                    >Cancel</Link>
                    <button
                    type="button"
                    className=" font-bold bg-acsent hover:bg-acsent/80 shadow-md text-white mt-5 py-2 rounded-lg w-40 text-center cursor-pointer"
                    onClick={handleEditproducts}
                    >
                    {loading ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </form>

        </div>
    );
};
export default EditProducts;
