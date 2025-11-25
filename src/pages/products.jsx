import axios from 'axios';
import ProductCard from '../components/productCard'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState,useEffect} from 'react';
import ProductSideBar from '../components/productSidebar';
import Pagination from '../components/pagination';

const Products= ()=>{
    const [products,setProducts]=useState([]);
    const [isLoading,setIsloading]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(
        ()=>{
            if(isLoading===true){
                const token=localStorage.getItem('token');
                axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products/',{
                    headers:
                    {"Authorization":"Bearer "+token}
                })
                .then((res)=>{
                    console.log(res.data);
                    setProducts(res.data);
                    setIsloading(false);
                })
            }
        },[isLoading]
    )
    return(
        (!isLoading)?
        <div className='w-full flex min-h-screen pt-[80px] '>
          <div className="hidden md:block md:w-[300px] ">
            <ProductSideBar />
          </div>
          <div className="md:w-[calc(100%-300px)]  h-screen flex overflow-y-scroll">
            <div className="md:w-[calc(100%-(300px))] py-5 max-w-5xl mx-auto ">
              <h1 className="text-2xl md:text-4xl font-bold text-acsent text-center md:text-start mb-6">
                  All Products ✨
                  </h1>
              <div className='grid md:grid-cols-4 gap-4 px-8 md:px-0 py-2 justify-center'>
                { currentProducts.map((product)=>{
                  return(
                    <ProductCard key={product.productId}
                    product={product} 
                    />
                  )        
                })
                }
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div> 
        </div>
        :
        <div className='w-full flex min-h-screen pt-[80px] '>
        <div className="hidden md:block md:w-[300px]">
              <ProductSideBar />
            </div>
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <AiOutlineLoading3Quarters color="gray" className="w-6 h-6 animate-spin"/> 
            <h1 className="animate-pulse text-lg font-semibold text-gray-500">Loading...</h1>
        </div>
        </div>

    )
};
export default Products;