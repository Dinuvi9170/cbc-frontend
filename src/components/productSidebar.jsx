import { SlArrowRight } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

const ProductSideBar = () => {
    const location= useLocation();

    const path=location.pathname;
    const getlink=(name)=>{
        if(path.includes(name)){
           return "underline"
        }else{
            return "none"
        }
    }

    return(
        <div className="fixed w-full h-screen ">
            <div className="relative h-full w-[300px] flex items-center flex-col bg-primary px-5 py-5 shadow-lg">
                <div className=" w-40 h-40">
                    <img src="/images/cosmetics22.png" alt="cosmetic" 
                    className="object-cover"
                    />
                </div>
                <h1 className="text-2xl font-bold text-acsent -mt-5 text-center">Categories</h1>
                <nav className="flex flex-col justify-center px-15">
                    <Link to="/categories/Makeup"
                        className={`${getlink("Makeup")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    > <SlArrowRight className="w-3 h-3"/> Makeup</Link>
                    <Link to="/categories/Skincare"
                        className={`${getlink("Skincare")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    ><SlArrowRight className="w-3 h-3"/>Skincare</Link>
                    <Link to="/categories/Haircare"
                        className={`${getlink("Haircare")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    ><SlArrowRight className="w-3 h-3"/>Haircare</Link>
                    <Link to="/categories/Fragrance"
                        className={`${getlink("Fragrance")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    ><SlArrowRight className="w-3 h-3"/>Fragrances</Link>
                    <Link to="/categories/Bodycare"
                        className={`${getlink("Bodycare")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    ><SlArrowRight className="w-3 h-3"/>Bath & Body</Link>
                    <Link to="/categories/Other"
                        className={`${getlink("Other")} text-acsent py-3 px-4 rounded-lg hover:text-red-700 transition-all flex items-center duration-200 font-semibold`}
                    ><SlArrowRight className="w-3 h-3"/>Other</Link>
                </nav>
            </div>
        </div>
    )
};

export default ProductSideBar;