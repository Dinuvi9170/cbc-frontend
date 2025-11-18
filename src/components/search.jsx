const Search=()=>{
    return(
        <div className="w-full max-w-lg mx-auto mt-4 flex">
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-tl-lg rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-acsent"
                placeholder="Search for products..."
            />
            <button className="text-sm px-1 py-1 border border-acsent bg-acsent text-white rounded-br-lg rounded-tr-lg ">Search</button>
        </div>
    );
};
export default Search;