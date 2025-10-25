import { Routes,Route,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Header from './components/header'
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

function App() {
  
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>
      <div>
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
            </Route>
            <Route element={<AdminLayout/>}>
              <Route path='/admin/*' element={<Admin/>}/>
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
