import ProductCard from '../components/productCard'

const Products= ()=>{
    return(
        <div className='px-10 py-10'>
            <div className='grid grid-cols-6 '>
                <ProductCard name="Gaming Laptop"/>
            </div>
        </div>
    )
};
export default Products;