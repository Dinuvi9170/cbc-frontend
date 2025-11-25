const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

    return (
        <div className="py-5 flex justify-center items-center gap-2 mt-8 select-none">

        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-full bg-acsent flex
            ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-200"}
            `}
        ><span className="text-white font-bold items-center justify-center -mt-1 md:mt-0"> ←</span> 
        </button>

        {pages.map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded-lg font-bold
                ${currentPage === page ? "bg-primary text-black" : "hover:bg-gray-200"}
            `}
            >
            {page}
            </button>
        ))}

        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-full bg-acsent flex
            ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-200"}
            `}
        ><span className="text-white font-bold items-center justify-center -mt-1 md:mt-0"> →</span>
        </button>
        </div>
    );
};

export default Pagination;
