import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import ProductSideBar from "../components/productSidebar";
import Pagination from "../components/pagination";

const Category = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setcategoryFilter] = useState("");
    const {skinType}= useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const loadProducts = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + `/api/products/skintypes/${skinType}`
            );
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        if (skinType) {
            loadProducts();
        }
    }, [skinType]);


    const filtered = currentProducts.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter ? (p.category ?? "").toLowerCase().includes(categoryFilter.toLowerCase()) : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="w-full flex min-h-screen pt-[80px]">
            <div className="w-full h-screen flex overflow-y-scroll">
                <div className="hidden md:block md:w-[300px] h-screen">
                    <ProductSideBar />
                </div>
                <div className="md:w-[calc(100%-(300px))] px-8 md:px-0 py-5 max-w-5xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-acsent text-center md:text-start mb-6">
                    Products for {skinType} skin ✨
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-1/3 p-2 z-10 border-2 border-acsent rounded-lg shadow-sm"
                        />

                        <select
                            value={categoryFilter}
                            onChange={(e) => setcategoryFilter(e.target.value)}
                            className="w-full md:w-1/4 p-2 z-10 border rounded-lg shadow-sm"
                        >
                            <option value="">Filter by Category</option>
                            <option value="Makeup">Makeup</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Haircare">Haircare</option>
                            <option value="Fragrances">Fragrances</option>
                            <option value="Bodycare">Bath & Body</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((p) => (
                        <ProductCard key={p.productId} product={p} />
                    ))}
                    </div>
                    <div className={`${filtered.length===0?"hidden":"block"}`}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>

                    {filtered.length === 0 && (
                    <div className="text-center text-gray-500 mt-10 text-lg">
                        No products found.
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Category;
