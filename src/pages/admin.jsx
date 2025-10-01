import { Link, Route, Routes } from "react-router-dom";
import AdminProducts from "./admin/products";
import Addproducts from "./admin/addproduct";

const Admin =()=>{
    return(
        <div className="flex w-full h-screen">
            <div className="h-full w-[300px] flex flex-col bg-blue-600">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-amber-50 py-5">
                <Routes>
                    <Route path='products' element={<AdminProducts/>}/>
                    <Route path='users' element={<h1>Users</h1>}/>
                    <Route path='orders' element={<h1>Orders</h1>}/>
                    <Route path='reviews' element={<h1>Reviews</h1>}/>
                    <Route path='addproducts' element={<Addproducts/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default Admin;