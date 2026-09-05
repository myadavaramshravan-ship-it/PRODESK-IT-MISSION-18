function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPrevious,
  onNext
}) {
  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;