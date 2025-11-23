import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminProducts from "./admin/products";
import Addproducts from "./admin/addproduct";
import EditProducts from "./admin/editproducts";
import AdminOrder from "./admin/adminOrders";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import UserProfile from "./userProfile";
import AdminUser from "./admin/adminUser";

const Admin =()=>{
    const location= useLocation();
    const [currentuser, Setcurrentuser]= useState(null);
    const [loading,Setloading]= useState(true);
    const [userdropdown,setUserdropdown]= useState(false);
    const navigate =useNavigate();

    useEffect(() => {
        const userLoad=()=>{
            const userString = localStorage.getItem('currentuser');
            console.log('Fetched userString from localStorage:', userString);
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
            Setloading(false);
        }
        userLoad();
    
        window.addEventListener("storage", userLoad);
    
        return () => {
            window.removeEventListener("storage", userLoad);
        };
    }, []);

    if (loading) return null;
    
    const handlelogout = () => {
        localStorage.removeItem('currentuser');
        Setcurrentuser(null);
        setUserdropdown(false);
        navigate("/");
    };

    const path=location.pathname;
    const getlink=(name)=>{
        if(path.includes(name)){
           return "bg-secondary"
        }else{
            return "bg-primary"
        }
    }
    return(
        <div className="flex w-full h-screen ">
            <div className="relative h-full w-[300px] flex flex-col bg-primary px-5 py-5 shadow-lg">
                <h1 className="text-2xl font-bold text-acsent mb-8 text-center">Admin Panel</h1>
                <nav className="flex flex-col gap-4 justify-center items-center">
                    <Link to="/admin/products"
                        className={`${getlink("products")} text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold`}
                    >Products</Link>
                    <Link to="/admin/users"
                        className={`${getlink("users")} text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold`}
                    >Users</Link>
                    <Link to="/admin/orders"
                        className={`${getlink("orders")} text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold`}
                    >Orders</Link>
                    <Link to="/admin/reviews"
                        className={`${getlink("reviews")} text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold`}
                    >Reviews</Link>
                </nav>
                <div className="absolute bottom-0 left-0 w-full max-w-[300px] h-[100px] flex flex-col justify-center">
                    <div className="relative mx-5 px-1 py-2 border-2 border-secondary flex rounded-lg gap-2 items-center 
                    hover:cursor-pointer hover:bg-secondary/10"
                    onClick={()=>setUserdropdown(!userdropdown)}
                    >
                        <div className="flex border-2 rounded-full w-12 justify-center items-center h-12 border-secondary fixed">
                            <img src={currentuser?.profileimage} alt="profile_image" className="w-10 h-10 object-cover rounded-full"/>                           
                        </div>
                        <div className="ml-12 flex flex-col text-acsent">                            
                            <span className="px-2 text-sm font-semibold">{currentuser?.firstName} {currentuser?.lastName}</span>
                            <span className="break-all text-xs px-2">{currentuser?.email}</span>                            
                        </div>    
                    </div>
                    {userdropdown && (
                        <div className="absolute flex flex-col left-71 bottom-5 mt-2 bg-white shadow rounded w-60 p-2 z-50">
                            <div className="flex rounded-lg gap-2 items-center px-1 py-1">
                                <div className="flex border-2 rounded-full w-12 justify-center items-center h-12 border-secondary fixed">
                                    <img src={currentuser.profileimage} alt="profile_image" className="w-10 h-10 object-cover rounded-full"/>                           
                                </div>
                                <div className="ml-12 flex flex-col text-acsent">                            
                                    <span className="px-2 text-sm font-semibold">{currentuser.firstName} {currentuser.lastName}</span>
                                    <span className="break-all text-xs px-2">{currentuser.email}</span>                            
                                </div>   
                            </div>
                            <div className="border-b w-full border-acsent mt-2"/> 
                            <div className="flex items-center px-5">
                                <CgProfile  />
                                <span 
                                    className="cursor-pointer hover:underline text-gray-700 text-sm block p-2"
                                    onClick={()=>{
                                        navigate(`/admin/profile/${currentuser._id}`);
                                        setUserdropdown(false);
                                    }}
                                >
                                My Profile
                                </span>
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
            </div>
            <div className="h-full w-[calc(100%-300px)] py-5 border-4 border-acsent rounded-lg">
                <Routes>
                    <Route path='products' element={<AdminProducts/>}/>
                    <Route path='users' element={<AdminUser/>}/>
                    <Route path='orders' element={<AdminOrder/>}/>
                    <Route path='reviews' element={<h1>Reviews</h1>}/>
                    <Route path='addproducts' element={<Addproducts/>}/>
                    <Route path='editproducts' element={<EditProducts/>}/>
                    <Route path='profile/:userId' element={<UserProfile/>}/>
                    
                </Routes>
            </div>
        </div>
    );
};
export default Admin;