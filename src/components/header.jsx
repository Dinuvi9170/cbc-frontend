import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsCart, BsDot, BsSearch } from "react-icons/bs";
import { CgClose, CgProfile } from "react-icons/cg";
import {  GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./search";
import { LuLogOut } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";

const Header = () => {
    const [sidebarOpen, SetsidebarOpen] = useState(false);
    const [currentuser, Setcurrentuser] = useState(null);
    const [dropdownOpen, SetdropdownOpen] = useState(false);
    const [searchShow, SetsearchShow] = useState(false);
    const [productdown,Setproductdown] =useState(false);
    const [cart, Setcart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();
    const location =useLocation();

    const hideSearch = location.pathname.startsWith("/categories") || location.pathname.startsWith("/skintypes");
    
    useEffect(() => {
        const userLoad=()=>{
            const userString = localStorage.getItem('currentuser');
            if (userString) {
                try {
                    const user = JSON.parse(userString);
                    Setcurrentuser(user);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('currentuser');
                }
            }else{
                Setcurrentuser(null);
            }
        }
        userLoad();

        window.addEventListener("storage", userLoad);

        return () => {
            window.removeEventListener("storage", userLoad);
        };
    }, []);

    useEffect(() => {
        const updateCart = () => {
        Setcart(JSON.parse(localStorage.getItem("cart")) || []);
        };

        window.addEventListener("cartUpdated", updateCart);
        return () => window.removeEventListener("cartUpdated", updateCart);
    }, []);

    const handlelogout = () => {
        localStorage.removeItem('currentuser');
        Setcurrentuser(null);
        SetdropdownOpen(false);
        navigate('/');
    };

    return (
        <>
            <header className='fixed w-full top-0 left-0 h-[80px] py-3 shadow-2xl flex bg-white flex-between z-50'>
                <GiHamburgerMenu 
                    size="25" 
                    color="#821742" 
                    className="absolute left-2 top-7 md:hidden transition transition-transform duration-300 hover:rotate-180 cursor-pointer" 
                    onClick={() => SetsidebarOpen(true)}
                />
                {sidebarOpen && (
                    <div className="w-full h-full fixed -mt-3 bg-[#00000060]">
                        <div className="w-3/4 relative h-full shadow-md bg-white">
                            <div className="h-[80px] w-full shadow-md flex justify-center items-center">
                                <img src={"/beautylogoremovebgpreview.png"} className="w-[40px] h-[40px] object-cover" />
                                <div className="px-2 mr-2 flex flex-col text-lg leading-none justify-center font-bold">
                                    <span className="text-acsent">Beauty</span>
                                    <span className="text-acsent">Cosmatics</span>
                                </div> 
                            </div>
                            <CgClose 
                                color="#821742" 
                                size='25' 
                                strokeWidth="2" 
                                className="absolute left-2 top-7 transition-transform duration-300 hover:rotate-180 cursor-pointer"
                                onClick={() => SetsidebarOpen(false)}
                            />
                            <div className="flex flex-col w-full h-[calc(100%-80px)] gap-3 cursor-pointer font-semibold text-acsent">
                                <a href='/' className="border-b py-4">
                                    <span className="px-20">Home</span>
                                </a>
                                <div onClick={() => Setproductdown(!productdown)} >
                                    {window.innerWidth >= 768 ? ( 
                                        <a href="/products/" className="px-20 flex items-center">
                                        Products
                                        </a>
                                    ) : (
                                        <div className="px-20 flex gap-6 items-center">
                                        Products
                                        <SlArrowDown />
                                        </div>
                                    )}
                                </div>
                                {productdown && (
                                    <div className="flex flex-col ml-2 text-sm px-20 gap-2 ">
                                        <h1 className="flex items-center font-bold"><BsDot/> Categories</h1>
                                        <div className="flex flex-col mt-2 ml-6 gap-2 font-normal">
                                            <a href="/products/" className="hover:text-acsent/80">
                                                All
                                            </a>
                                            <a href="/categories/Skincare" className="hover:text-acsent/80">
                                                Skincare
                                            </a>
                                            <a href="/categories/Makeup" className="hover:text-acsent/80">
                                                Makeup
                                            </a>
                                            <a href="/categories/Fragrance" className="hover:text-acsent/80">
                                                Fragrances
                                            </a>
                                            <a href="/products/Haircare" className="hover:text-acsent/80">
                                                Haircare
                                            </a>
                                            <a href="/categories/Bodycare" className="hover:text-acsent/80">
                                                Bath & Body
                                            </a>
                                            <a href="/categories/Other" className="hover:text-acsent/80">
                                                Other
                                            </a>
                                        </div>
                                        <h1 className="flex items-center font-bold"><BsDot/> Skin Types</h1>
                                        <div className="flex flex-col mt-2 ml-6 gap-2 font-normal">
                                            <a href="/skintypes/Dry" className="hover:text-acsent/80">
                                                Dry Skin
                                            </a>
                                            <a href="/skintypes/Normal" className="hover:text-acsent/80">
                                                Normal Skin
                                            </a>
                                            <a href="/skintypes/Oily" className="hover:text-acsent/80">
                                                Oily Skin
                                            </a>
                                            <a href="/skintypes/Sensitive" className="hover:text-acsent/80">
                                                Sensitive Skin
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div className="border-b"/>
                                <a href='/about' className="border-b py-2">
                                    <span className="px-20">About</span>
                                </a>
                                <a href='/contact' className="border-b py-2">
                                    <span className="px-20">Contact</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                <Link to="/">
                    <div className="ml-20 md:ml-1 md:px-8 py-2 md:py-1 flex justify-center">
                        <img src={"/beautylogoremovebgpreview.png"} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover" />
                        <div className="px-2 mr-2 flex flex-col text-lg md:text-3xl leading-none justify-center font-bold cursor-pointer">
                            <span className="text-acsent">Beauty</span>
                            <span className="text-acsent">Cosmatics</span>
                        </div>
                    </div>
                </Link>
                <div className="md:flex hidden w-[calc(100%-100px)] justify-center items-center gap-8 text-acsent">
                    <Link to="/" className="text-xl font-semibold">Home</Link>
                    <Link to="/products" className="text-lg font-semibold">Products</Link>
                    <Link to="/about" className="text-xl font-semibold">About</Link>
                    <Link to="/contact" className="text-xl font-semibold">Contact</Link>
                </div>
                {!hideSearch && (
                    <div className="hidden md:block justify-center w-[500px] -mt-1">
                        <Search/>
                    </div>
            )}
                <div className="px-4 md:px-6 pt-4 gap-4 md:px-0 flex justify-end w-[300px] md:w-[150px]">
                    {!hideSearch && (
                        <BsSearch 
                            fill="#821742" 
                            className="w-5 h-5 md:w-7 md:h-7 md:hidden cursor-pointer"
                            onClick={()=>{SetsearchShow(!searchShow)}}
                        /> 
                    )}  
                    <Link to='/cart' className="relative">
                        <BsCart fill="#821742" className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" />
                        {cart.length>0 && (
                            <span className="absolute -top-1 -right-2 bg-acsent text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {!currentuser ? (
                        <BiUser 
                            fill="#821742" 
                            className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" 
                            onClick={() => {
                                if (window.location.pathname === '/login') {
                                    navigate(-1);
                                } else {
                                    navigate('/login');
                                }
                            }}
                        />
                    ) : (
                        <div className="relative">
                            <BiUser 
                                fill="#821742" 
                                className="w-5 h-5 md:w-7 md:h-7 cursor-pointer"
                                onClick={() => SetdropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 top-11 mt-2 bg-primary shadow-lg rounded w-70 p-2">
                                    <div className="flex rounded-lg gap-2 items-center px-1 py-1">
                                        <div className="flex border-2 rounded-full w-12 justify-center items-center h-12 border-secondary fixed">
                                            <img src={currentuser.profileimage} alt="profile_image" className="w-10 h-10 object-cover"/>                           
                                        </div>
                                        <div className="ml-12 flex flex-col text-acsent">                            
                                            <span className="px-2 text-sm font-semibold">{currentuser.firstName} {currentuser.lastName}</span>
                                            <span className="break-all text-xs px-2">{currentuser.email}</span>                            
                                        </div>   
                                    </div>
                                    <div className="border-b w-full border-acsent mt-2"/> 
                                    <div className="flex items-center px-5">
                                        <CgProfile stroke="black"  />
                                        <Link to={`/profile/${currentuser._id}`}
                                            className="cursor-pointer hover:underline text-gray-700 text-sm block p-2"
                                            onClick={()=>window.reload()}
                                        >
                                        My Profile
                                        </Link>
                                    </div>
                                    <div className="flex items-center -mt-2 px-5">
                                        <LuLogOut stroke="black"  />
                                        <span 
                                            className="cursor-pointer hover:underline text-gray-700 text-sm block p-2"
                                            onClick={handlelogout}
                                        >
                                        Log Out
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}     
                </div>
            </header>
            {searchShow && (
                 <>
                    <div className="px-4 absolute w-full mt-[80px] md:hidden">
                        <Search />
                    </div>

                    <div className="h-[60px] md:hidden"></div>
                </>
            )}
        </>
    );
};

export default Header;