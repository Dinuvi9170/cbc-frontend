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
        <div className='w-full h-full flex min-h-screen pt-[80px]'>
          <div className="hidden md:block md:w-[300px] h-full">
            <ProductSideBar />
          </div>
          <div className="md:w-[calc(100%-(300px))] py-5 max-w-5xl flex-1 mx-auto overflow-y-auto">
            <div className='grid md:grid-cols-4 w-full h-full gap-4 justify-center'>
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
        :
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <AiOutlineLoading3Quarters color="blue" className="w-6 h-6 animate-spin"/> 
            <h1 className="animate-pulse text-lg font-semibold text-blue-700">Loading...</h1>
        </div>

    )
};
export default Products;