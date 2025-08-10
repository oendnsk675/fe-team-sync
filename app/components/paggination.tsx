type PType = {
  page: number;
  totalPages: number;
  totalData?: number;
  total?: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  totalData,
  total,
}: PType) => {
  const handleClick = (newPage: number) => {
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
            page === i ? 'bg-emerald-300/50' : 'bg-white'
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
    <div className="flex items-center justify-between mt-5">
      <div>
        <span className="font-light">
          Total <span className="font-semibold">{total}</span> from{' '}
          <span className="font-semibold">{totalData}</span>
        </span>
      </div>
      {/* paggination */}
      <div className="">
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
      </div>
    </div>
  );
};

export default Pagination;
