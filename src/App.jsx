import { Routes,Route,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Header from './components/header'
import Products from './pages/products'
import Admin from './pages/admin'

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <div>
        <Routes path='/*'>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='/*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
