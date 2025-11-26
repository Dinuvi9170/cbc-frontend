import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css'
import Home from './pages/home'
import Products from './pages/products'
import Admin from './pages/admin'
import TestPage from './pages/testPage'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/signup'
import ProductOverview from './pages/productOverview'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import MainLayout from './components/layout/mainlayout'
import AdminLayout from './components/layout/adminlayout'
import RootLayout from './components/layout/rootlayout'
import OrderProducts from './components/orderProducts'
import ForgetPassword from './pages/forgetpassword'
import Category from './pages/catergories';
import SkinTypeProducts from './pages/skinTypeProducts';
import SearchProductsPage from './pages/headerSearchpage';
import About from './pages/about';
import Contact from './pages/contact';
import UserProfile from './pages/userProfile';
import CustomerOrders from './pages/Myorders';
import OrderDetails from './pages/orderView';
import MyReviews from './pages/myReviews';
import ScrollToTop from './components/scrollto top';
import ProtectedAdminRoute from './components/layout/Authorizedlayout';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_Google_Client}>
      <BrowserRouter>
        <Toaster position="top-right"/>
        <div>
          <ScrollToTop/>
          <Routes>
            <Route element={<RootLayout/>}>
              <Route element={<MainLayout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/testing' element={<TestPage/>}/>
                <Route path='/products/:productId' element={<ProductOverview/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/forgot_password' element={<ForgetPassword/>}/>
                <Route path='/categories/:category' element={<Category/>}/>
                <Route path='/skintypes/:skinType' element={<SkinTypeProducts/>}/>
                <Route path='/productSearch' element={<SearchProductsPage/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/profile/:userId' element={<UserProfile/>}/>
                <Route path='/myorders' element={<CustomerOrders/>}/>
                <Route path='/myorders/:orderId' element={<OrderDetails/>}/>
                <Route path='myreviews' element={<MyReviews/>}/>
              </Route>
              <Route element={<ProtectedAdminRoute/> }>
                <Route element={<AdminLayout/>}>
                  <Route path='/admin/*' element={<Admin/>}/>
                  <Route path='/orders/:orderId' element={<OrderProducts/>}/>
                </Route>
              </Route>
              <Route path='*' element={<h1>404 Not Found</h1>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
