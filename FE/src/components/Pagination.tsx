import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChangePage }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button 
                onClick={() => onChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
            >
                &larr; Trang trước
            </button>

            <span className="text-gray-600 font-medium px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                {currentPage} / {totalPages}
            </span>

            <button 
                onClick={() => onChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
            >
                Trang sau &rarr;
            </button>
        </div>
    );
};

export default Pagination;