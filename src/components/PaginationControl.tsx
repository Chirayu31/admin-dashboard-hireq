import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageAtom, itemsPerPageAtom } from '../atoms/paginationAtom';

interface PaginationControlsProps {
    totalItems: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ totalItems }) => {
    const [currentPage, setCurrentPage] = useRecoilState<number>(currentPageAtom);
    const itemsPerPage = useRecoilValue<number>(itemsPerPageAtom);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='pagination'>
            <span>
                Page {currentPage} of {totalPages}
            </span>

            <div className='btn-grp'>

                <button
                    className="first-page"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}>
                    {`<<`}
                </button>

                <button
                    className="previous-page"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}>
                    {`<`}
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active-page' : 'page'}
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}


                <button
                    className="next-page"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>
                    {`>`}
                </button>

                <button
                    className="last-page"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}>
                    {`>>`}
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
