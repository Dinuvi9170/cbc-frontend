import { Link, Route, Routes } from "react-router-dom";
import AdminProducts from "./admin/products";
import Addproducts from "./admin/addproduct";
import EditProducts from "./admin/editproducts";

const Admin =()=>{
    return(
        <div className="flex w-full h-screen ">
            <div className="h-full w-[300px] flex flex-col bg-primary px-5 py-5 shadow-lg">
                <h1 className="text-2xl font-bold text-acsent mb-8 text-center">Admin Panel</h1>
                <nav className="flex flex-col gap-4 justify-center items-center">
                    <Link to="/admin/products"
                        className="text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold"
                    >Products</Link>
                    <Link to="/admin/users"
                        className="text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold"
                    >Users</Link>
                    <Link to="/admin/orders"
                        className="text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold"
                    >Orders</Link>
                    <Link to="/admin/reviews"
                        className="text-acsent py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200 font-semibold"
                    >Reviews</Link>
                </nav>
            </div>
            <div className="h-full w-[calc(100%-300px)] py-5">
                <Routes>
                    <Route path='products' element={<AdminProducts/>}/>
                    <Route path='users' element={<h1>Users</h1>}/>
                    <Route path='orders' element={<h1>Orders</h1>}/>
                    <Route path='reviews' element={<h1>Reviews</h1>}/>
                    <Route path='addproducts' element={<Addproducts/>}/>
                    <Route path='editproducts' element={<EditProducts/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default Admin;