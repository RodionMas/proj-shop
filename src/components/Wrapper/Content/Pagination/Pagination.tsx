import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { changePageReducer, fetchPagination, selectFilter, useAppDispatch } from "../../../../store/filterSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch()
  const {pageCount} = useSelector(selectFilter);
  React.useEffect(() => {
    appDispatch(fetchPagination());
  }, []);
  return (
    <div className="paginaion">
      {pageCount !== 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(changePageReducer(e.selected + 1))}
          pageRangeDisplayed={8}
          pageCount={Math.ceil(pageCount / 8)}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default Pagination;
