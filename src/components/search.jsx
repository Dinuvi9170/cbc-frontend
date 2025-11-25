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
                className="text-sm px-1 py-1 border border-acsent bg-acsent text-white rounded-tr-lg rounded-br-lg hover:cursor-pointer"
                >
                Search
                </button>
            </div>
        </div>
    );
};

export default Search;
