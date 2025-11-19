import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProductCard from "../components/productCard";

const Category = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [skinFilter, setSkinFilter] = useState("");
    const {category}= useParams();

    const loadProducts = async () => {
        try {
        const res = await axios.get(
            import.meta.env.VITE_BACKEND_URL + `/api/products/categories/${category}`
        );
        setProducts(res.data);
        } catch (error) {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        if (category) {
            loadProducts();
        }
    }, [category]);


    const filtered = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesSkin = skinFilter ? p.skinType.includes(skinFilter) : true;
        return matchesSearch && matchesSkin;
    });

    return (
        <div className="w-full min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-acsent mb-6">
                {category} Collection ✨
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search here..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded-lg shadow-sm"
                />

                <select
                    value={skinFilter}
                    onChange={(e) => setSkinFilter(e.target.value)}
                    className="w-full md:w-1/4 p-2 border rounded-lg shadow-sm"
                >
                    <option value="">Filter by Skin Type</option>
                    <option value="Dry">Dry</option>
                    <option value="Oily">Oily</option>
                    <option value="Normal">Normal</option>
                    <option value="Sensitive">Sensitive</option>
                </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((p) => (
                    <ProductCard key={p.productId} product={p} />
                ))}
                </div>

                {filtered.length === 0 && (
                <div className="text-center text-gray-500 mt-10 text-lg">
                    No makeup products found.
                </div>
                )}
            </div>
        </div>
    );
};

export default Category;
