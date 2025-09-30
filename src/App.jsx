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

function App() {
  
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>
      <Header/>
      <div>
        <Routes path='/*'>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/testing' element={<TestPage/>}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='/*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
