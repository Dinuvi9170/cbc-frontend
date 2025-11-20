import axios from 'axios';
import ProductCard from '../components/productCard'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState,useEffect} from 'react';
import ProductSideBar from '../components/productSidebar';

const Products= ()=>{
    const [products,setProducts]=useState([]);
    const [isLoading,setIsloading]=useState(true);

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
          <div className="w-full h-screen flex overflow-y-scroll">
            <div className="hidden md:block md:w-[300px] h-screen">
              <ProductSideBar />
            </div>
            <div className="md:w-[calc(100%-(300px))] py-5 max-w-5xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold text-acsent text-center md:text-start mb-6">
                  All Products ✨
                  </h1>
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

    )
};
export default Products;