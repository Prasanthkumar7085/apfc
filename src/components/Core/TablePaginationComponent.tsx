
import { Card, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./table-pagination.module.css";


const TablePaginationComponent = ({ paginationDetails, capturePageNum, captureRowPerItems, values }: any) => {

  const useParams = useSearchParams();
  const [pageNum, setPageNum] = useState<number | string>();
  const [noOfRows, setNoOfRows] = useState<number | string>(paginationDetails?.limit);
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
  );

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
    );
  }, [useParams]);

  useEffect(() => {
    setNoOfRows(paginationDetails?.limit)
  }, [paginationDetails]);

  const handlePagerowChange = (event: any) => {
    setNoOfRows(event.target.value);
    captureRowPerItems(event.target.value)
    setPageNum(1);
  };

  const [limitOptions] = useState(

    [10, 20, 50, 100]
  );

  return (
    <Card className={styles.tablePagenationBlock}>
      <div className={styles.tablePagination} >
        <div>
          <Typography variant="caption" className={styles.label}>
            {values} Per Page
          </Typography>

          <Select
            value={noOfRows}
            onChange={handlePagerowChange}
            defaultValue={searchParams.limit ? searchParams.limit : 10}
            sx={{
              height: "25px !important",
              borderRadius: "3px !important",
              fontSize: "11px",
              border: "none",
            }}
          >
            {limitOptions.map((item: number) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Typography variant="caption">
            {" "}
            {(paginationDetails?.page == 1
              ? 1
              : (paginationDetails?.page - 1) * paginationDetails?.limit + 1) +
              " - " +
              (paginationDetails?.page == paginationDetails?.total_pages
                ? paginationDetails?.total
                : paginationDetails?.total < paginationDetails?.limit
                  ? paginationDetails?.total
                  : paginationDetails?.page * paginationDetails?.limit)}{" "}
            of {paginationDetails?.total} {values}
          </Typography>
        </div>

        <Pagination
          shape="rounded"
          sx={{
            "& .MuiButtonBase-root": {
              height: "25px !important",
              // width: "25px !important",
              minWidth: "inherit",
            },
          }}
          page={paginationDetails?.page}
          count={paginationDetails?.total_pages}
          onChange={(event: any, value: any) => {
            capturePageNum(value);
            setPageNum(+value);
          }}
        />
      </div>
    </Card>
  );
}
export default TablePaginationComponent;