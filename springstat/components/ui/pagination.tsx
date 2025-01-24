"use client";

import React from "react";
import "@/styles/table.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 10;
  const pageNumbers: number[] = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Назад
      </button>

      {/* Первая страница и многоточие */}
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="pagination-button">1</button>
          {startPage > 2 && <span className="pagination-dots">...</span>}
        </>
      )}

      {/* Основные страницы */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${currentPage === page ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Последняя страница и многоточие */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="pagination-button">{totalPages}</button>
        </>
      )}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Вперёд
      </button>
    </div>
  );
};

export default Pagination;
