import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";


const Pagination = () => {
    const data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const [page, setPage] = useState(0);
    const [filterData, setFilterData] = useState();
    const n = 3

    useEffect(() => {
        console.log("page: ", page)
        setFilterData(
            data.filter((item, index) => (index >= page * n) && (index < (page + 1) * n)
            )
        );
        console.log(filterData)
    }, [page]);
    return (
        <>
            <ul>
                {filterData && filterData.map((item, index) => <li>Item #{item}</li>)}
            </ul>;
            <ReactPaginate
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={(event) => setPage(event.selected)}
                pageCount={Math.ceil(data.length / n)}
                breakLabel="..."
                previousLabel="prev"
                nextLabel="next"
            />;
        </>
    )
}
export default Pagination


