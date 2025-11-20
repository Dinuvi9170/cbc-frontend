import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/productCard";
import ProductSideBar from "../components/productSidebar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || "";

    useEffect(() => {
        const fetchProducts = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        try {
            const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`
            );
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
        };
        fetchProducts();
    }, [query]);

    return (
        (!isLoading && products.length>0)?
        <div className='w-full flex min-h-screen pt-[80px] '>
          <div className="w-full h-screen flex overflow-y-scroll">
            <div className="hidden md:block md:w-[300px] h-screen">
              <ProductSideBar />
            </div>
            <div className="md:w-[calc(100%-(300px))] py-5 max-w-5xl mx-auto">
              <h1 className="text-2xl text-center md:text-start font-bold mb-6">Search Results for: "{query}"</h1>
              <div className='grid md:grid-cols-4 gap-4 px-8 md:px-0 py-2 justify-center'>
                { products.map((product)=>{
                  return(
                    <ProductCard key={product.productId}
                    product={product} 
                    />
                  )        
                })
                }
              </div>
            </div>   
          </div> 
        </div>
        :(products.length===0 && !isLoading)?
        <div className='w-full flex min-h-screen pt-[80px] '>
          <div className="hidden md:block md:w-[300px] h-screen">
                <ProductSideBar />
              </div>
          <div className="md:w-[calc(100%-(300px))] py-5 max-w-5xl mx-auto">
            <h1 className="text-2xl text-center md:text-start font-bold mb-6">Search Results for: "{query}"</h1>
            <span className="text-lg font-semibold text-gray-500">No products found.</span>
          </div>
          </div>
        :
        <div className='w-full flex min-h-screen pt-[80px] '>
        <div className="hidden md:block md:w-[300px] h-screen">
              <ProductSideBar />
            </div>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <AiOutlineLoading3Quarters color="gray" className="w-6 h-6 animate-spin"/> 
            <h1 className="animate-pulse text-lg font-semibold text-gray-500">Loading...</h1>
        </div>
        </div>
    );
};

export default SearchProductsPage;
