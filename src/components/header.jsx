import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const Header =()=>{
    const [sidebarOpen,SetsidebarOpen]=useState(false);
    const [currentuser,Setcurrentuser]=useState(null);
    const [dropdownOpen,SetdropdownOpen]=useState(false);
    const navigate= useNavigate();
    
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem(currentuser));
        Setcurrentuser(user)
    },[])

    const handlelogout=()=>{
        localStorage.removeItem(currentuser);
        Setcurrentuser(null);
        dropdownOpen(false);
    }

    return(
        <header className=" relative w-full h-[80px] py-3 shadow-2xl flex bg-white flex-between z-50">
            <GiHamburgerMenu size="25" color="#821742" className="absolute left-2 top-7 md:hidden transition transition-transform duration-300 hover:rotate-180 cursor-pointer" 
            onClick={()=>SetsidebarOpen(true)}/>
                {sidebarOpen && (
                    <div className="w-full h-full fixed -mt-3 bg-[#00000060] ">
                        <div className="w-3/4  relative h-full shadow-md bg-white">
                            <div className="h-[80px] w-full shadow-md flex justify-center items-center">
                               <img src={"/beautylogoremovebgpreview.png"} className="w-[40px] h-[40px] object-cover "/>
                                <div className="px-2 mr-2 flex flex-col text-lg leading-none justify-center font-bold">
                                    <span className="text-acsent">Beauty</span>
                                    <span className="text-acsent">Cosmatics</span>
                                </div> 
                            </div>
                            <CgClose color="#821742" size='25'strokeWidth="2" className="absolute left-2 top-7 transition-transform duration-300 hover:rotate-180 cursor-pointer"
                              onClick={()=>SetsidebarOpen(false)}
                            />
                            <div className="flex flex-col w-full h-[calc(100%-80px)] gap-3 cursor-pointer font-semibold text-acsent">
                                <a href='/'className="border-b py-2">
                                  <span className="px-20">Home</span></a>
                                <a href='/products' className="border-b py-2"><span className="px-20">Products</span></a>
                                <a href='/about' className="border-b py-2"><span className="px-20">About</span></a>
                                <a hred='/contact' className="border-b py-2"><span className="px-20">Contact</span></a>
                            </div>
                        </div>
                    </div>
                )}
            <Link to="/">
                <div className="ml-20 md:ml-1 md:px-8 py-2 md:py-1 flex justify-center">
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
            <div className="px-5 md:px-8 pt-4 gap-4 md:px-0 flex justify-end w-[200px] ">

                {currentuser===null?(
                    <BiUser fill="#821742" className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" 
                        onClick={()=>{
                            if(window.location.pathname === '/login'){
                                navigate(-1);
                            }else{
                                navigate('/login');
                            }
                        }}
                    />
                ):(
                    <div className="relative" onClick={()=>SetdropdownOpen(!dropdownOpen)}>
                        {dropdownOpen &&(
                            <div className="absolute right-0 mt-2 bg-white shadow rounded w-32">
                                <span onClick={handlelogout}>Log Out</span>
                            </div>
                        )}
                    </div>
                )}
                    
                <Link to='/cart'>
                    <BsCart fill="#821742" className="w-5 h-5 md:w-7 md:h-7"/>
                </Link>
            </div>
        </header>
    )
};

export default Header;