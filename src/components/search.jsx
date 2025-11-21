import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!query.trim()) return;
        navigate('/productSearch?query=' + encodeURIComponent(query));
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
        handleSearch();
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-4">
        <div className="flex">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-tl-lg rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-acsent"
            placeholder="Search for products..."
            />
            <button
            type="button"
            onClick={handleSearch}
            className="text-sm px-1 py-1 border border-acsent bg-acsent text-white rounded-tr-lg rounded-br-lg"
            >
            Search
            </button>
        </div>

        {/* <div className="mt-4">
            {query.trim() === "" ? ("") : isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
            ) : product.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.map((prod) => (
                <ProductCard key={prod.id || prod.productId} product={prod} />
                ))}
            </div>
            ) : (
            <div className="text-center text-gray-500">No products found.</div>
            )}
        </div> */}
        </div>
    );
};

export default Search;
