import React from "react";

type PType = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PType) => {
  const handleClick = (newPage: number) => {
    console.log(newPage, page, "sad");

    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item hover:bg-emerald-300/50 btn ${
            page === i ? "bg-emerald-300/50" : "bg-white"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="join">
      <button
        className="join-item hover:bg-emerald-300/50 btn bg-white"
        onClick={() => handleClick(page - 1)}
        disabled={page === 1}
      >
        «
      </button>
      {renderPageButtons()}
      <button
        className="join-item hover:bg-emerald-300/50 btn bg-white"
        onClick={() => handleClick(page + 1)}
        disabled={page === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
