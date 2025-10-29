import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header =()=>{
    const [sidebarOpen,SetsidebarOpen]=useState(false);

    return(
        <header className=" relative w-full md:h-[80px] shadow-2xl flex bg-white flex-between">
            <GiHamburgerMenu size="25" className="absolute left-2 top-4 md:hidden" onClick={()=>SetsidebarOpen(true)}/>
                {sidebarOpen && (
                    <div className="w-full h-full fixed bg-[#00000060]">
                        <div className="w-3/4 relative h-full bg-white px-10 py-10">
                            <CgClose color="#821742" size='25'strokeWidth="3" className="absolute right-5 top-5"
                              onClick={()=>SetsidebarOpen(false)}
                            />
                            <div className="flex flex-col">
                                <span>Home</span>
                                <span>Products</span>
                            </div>
                        </div>
                    </div>
                )}
            <Link to="/">
                <div className="ml-10 md:ml-1 md:px-8 py-2 flex justify-center">
                    <img src={"/beautylogoremovebgpreview.png"} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover "/>
                    <div className="px-2 mr-2 flex flex-col text-lg md:text-3xl leading-none justify-center font-bold cursor-pointer">
                        <span className="text-acsent">Beauty</span>
                        <span className="text-acsent">Cosmatics</span>
                    </div>
                </div>
            </Link>
            <div className="md:flex hidden w-[calc(100%-100px)] justify-center items-center gap-8 text-acsent">
                <Link to="/"className="text-xl font-semibold">Home</Link>
                <Link to="/products" className="text-lg font-semibold">Products</Link>
                <Link to="/about" className="text-xl font-semibold">About</Link>
                <Link to="/contact" className="text-xl font-semibold">Contact</Link>

            </div>
            <div className="px-4 md:px-0 md:flex w-[200px] ">
                <Link to='/cart' className="flex justify-end md:justify-center pt-4 md:pt-0 items-center">
                    <BsCart fill="#821742" className="w-5 h-5 md:w-7 md:h-7"/>
                </Link>
            </div>
        </header>
    )
};

export default Header;