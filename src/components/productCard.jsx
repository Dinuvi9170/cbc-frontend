import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link
        to={`/products/${product.productId}`}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-40 group w-full"
        >
        <div className="flex justify-center items-center w-full h-48 overflow-hidden">
            <img
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            className="w-full h-55 object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>

        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-acsent duration-200">
            {product.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
            </p>

            <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-bold text-acsent">
                Rs. {product.normalPrice.toFixed(2)}
            </span>

            <span className="line-through text-gray-400 text-sm">
                Rs. {product.labeledPrice.toFixed(2)}
            </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
                {product.skinType.map((skin) => (
                    <span
                        key={skin}
                        className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                    >
                    {skin}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="text-blue-600 font-semibold hover:underline pointer-events-none">
                    View Details
                </div>
            </div>
        </div>
        </Link>
    );
};

export default ProductCard;
