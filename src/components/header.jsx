import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header =()=>{
    return(
        <header className="w-full h-[80px] shadow-2xl flex flex-between">
            <Link to="/">
                <div className="relative px-8 py-2 flex justify-center">
                    <img src={"/beautylogoremovebgpreview.png"} className="absolutew-[50px] h-[50px] object-cover "/>
                    <div className="px-2 mr-2 flex flex-col text-3xl leading-none justify-center font-bold cursor-pointer">
                        <span className="text-acsent">Beauty</span>
                        <span className="text-acsent">Cosmatics</span>
                    </div>
                </div>
            </Link>
            <div className="flex w-[calc(100%-100px)] justify-center items-center gap-8 text-acsent">
                <Link to="/"className="text-xl font-semibold">Home</Link>
                <Link to="/products" className="text-lg font-semibold">Products</Link>
                <Link to="/about" className="text-xl font-semibold">About</Link>
                <Link to="/contact" className="text-xl font-semibold">Contact</Link>

            </div>
            <div className="flex w-[200px] ">
                <Link to='/cart' className="flex justify-center items-center">
                    <BsCart fill="#821742" className="w-7 h-7"/>
                </Link>
            </div>
        </header>
    )
};

export default Header;