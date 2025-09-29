const ProductCard =(props) =>{
    console.log(props);
    return(
        <div className="flex flex-col px-4 py-4 justify-left border rounded-lg">
            <div>
                <img/>
            </div>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <h3>Price: ${props.price}</h3>
            <div className="flex gap-2">
                <button className="px-1 rounded-lg border ">Add to Cart</button>
                <button className="px-1 rounded-lg border">Buy Now</button>
            </div>
        </div>
    )
};

export default ProductCard;