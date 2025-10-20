import { Link } from "react-router-dom";

const ProductCard =({product}) =>{
    return(
        <Link to={`/products/${product.productId}`} className="flex flex-col px-2 py-2 bg-white shadow-md w-[300px] h-[400px] rounded-lg">
            <div className="w-full h-[200px] flex justify-center items-center overflow-hidden rounded-lg">
                <img
                src={product.images[0]}
                alt={product.name}
                className="object-contain h-full"
                />
            </div>

            <div className="flex flex-col gap-2 mt-3">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 line-through text-sm">
                    Rs. {product.labeledPrice.toFixed(2)}
                </span>
                <span className="text-green-600 font-bold text-lg">
                    Rs. {product.normalPrice.toFixed(2)}
                </span>
                </div>

                {product.stock > 0 ? (
                <span className="text-sm font-medium text-green-700 mt-2">
                    ✅ In Stock ({product.stock})
                </span>
                ) : (
                <span className="text-sm font-medium text-red-600 mt-2">
                    ❌ Out of Stock
                </span>
                )}
            </div>
        </Link>
    )
};

export default ProductCard;