import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import TablePaginationComponent from "./TablePaginationComponent";
import { Button } from "@mui/material";

interface pageProps {
  columns: any[];
  data: any[];
  loading: boolean;
  paginationDetails: any;
  getData: any;
}
const TanStackTableComponent: FC<pageProps> = ({
  columns,
  data,
  loading,
  paginationDetails,
  getData,
}) => {
  const router = useRouter();
  const path = usePathname();
  const [sorting, setSorting] = useState<SortingState>([]);
  const useParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
  );

  const capturePageNum = (value: number) => {
    getData({
      ...searchParams,
      limit: searchParams.limit as string,
      page: value,
    });
  };

  const captureRowPerItems = (value: number) => {
    getData({
      ...searchParams,
      limit: value,
      page: 1,
    });
  };

  let removeSortingForColumnIds = [
    "actions",
    "first_name",
    "email",
    "phone",
    "status",
    "last_login",
    "device_count",
    "user_full_name",
    "average_voltage_ln",
    "average_voltage_ll",
    "average_current",
    "average_pf",
    "serial",
    "total_kw",
  ];

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
    );
  }, [useParams]);

  const getWidth = (id: string) => {
    const widthObj = columns.find((item: any) => item.id == id);
    const width = widthObj?.width;
    return width;
  };

  const SortItems = ({
    searchParams,
    header,
    removeSortingForColumnIds,
  }: {
    searchParams: any;
    header: any;
    removeSortingForColumnIds?: string[];
  }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {searchParams.order_by == header.id ? (
          searchParams.order_type == "asc" ? (
            <Image src="/sort-asc.svg" height={13} width={13} alt="image" />
          ) : (
            <Image src="/sort-desc.svg" height={13} width={13} alt="image" />
          )
        ) : removeSortingForColumnIds?.includes(header.id) ? (
          ""
        ) : (
          <Image src="/un-sort.svg" height={13} width={15} alt="image" />
        )}
      </div>
    );
  };

  const sortAndGetData = (header: any) => {
    if (
      removeSortingForColumnIds &&
      removeSortingForColumnIds?.length &&
      removeSortingForColumnIds.includes(header.id)
    ) {
      return;
    }
    let order_by = header.id;
    let order_type = "asc";
    if ((searchParams?.order_by as string) == header.id) {
      if (searchParams?.order_type == "asc") {
        order_type = "desc";
      } else {
        order_by = "";
        order_type = "";
      }
    }

    getData({
      ...searchParams,
      order_by: order_by,
      order_type: order_type,
    });
  };

  return (
    <div className="mainTable">
      <div className="tableContainer">
        <table
          className="table"
          style={{
            height:
              !data?.length &&
              (useParams?.get("status") || useParams?.get("search_string"))
                ? "100%"
                : "auto",
          }}
        >
          <thead className="thead">
            {table
              .getHeaderGroups()
              .map((headerGroup: any, mainIndex: number) => (
                <tr className="table-row" key={headerGroup.id}>
                  {headerGroup.headers.map((header: any, index: number) => {
                    return (
                      <th
                        className="cell"
                        key={index}
                        colSpan={header.colSpan}
                        style={{
                          minWidth: getWidth(header.id),
                          width: getWidth(header.id),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={() => sortAndGetData(header)}
                            style={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                              justifyContent: "space-between",
                              minWidth: getWidth(header.id),
                              width: getWidth(header.id),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <SortItems
                              searchParams={searchParams}
                              header={header}
                              removeSortingForColumnIds={
                                removeSortingForColumnIds
                              }
                            />
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
          </thead>
          <tbody className="tbody">
            {data?.length ? (
              table.getRowModel().rows.map((row: any, mainIndex: number) => {
                return (
                  <tr className="table-row" key={mainIndex}>
                    {row.getVisibleCells().map((cell: any, index: number) => {
                      return (
                        <td
                          className="cell"
                          key={index}
                          style={{
                            width: "100%",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : !loading ? (
              <tr>
                <td colSpan={10}>
                  <div className="noDataBlock">
                    {!data?.length &&
                    (useParams?.get("status") ||
                      useParams?.get("search_string")) ? (
                      <>
                        <Image
                          src={
                            path?.includes("users")
                              ? "/no-user-image.svg"
                              : "/no-device-image.svg"
                          }
                          alt=""
                          height={350}
                          width={350}
                        />
                        <p>
                          {path?.includes("users") ? "No Users" : "No Devices"}
                        </p>
                      </>
                    ) : (
                      <>
                        <Image
                          src={
                            path?.includes("users")
                              ? "/no-user-image.svg"
                              : "/no-device-image.svg"
                          }
                          alt=""
                          height={300}
                          width={300}
                        />
                        <p>
                          {path?.includes("users") ? "No Users" : "No Devices"}
                        </p>
                        <div className="textBlock">
                          <p className="noDataTxt">
                            {path?.includes("users")
                              ? "It looks like three are no users yet. Add a new user to start"
                              : ""}
                          </p>
                          <p className="noDataTxt">
                            {path?.includes("users")
                              ? "managing your account."
                              : ""}
                          </p>
                        </div>
                        <Button
                          className="addUserBtn"
                          variant="outlined"
                          onClick={() => router.push("/users/add")}
                          startIcon={<AddIcon />}
                          sx={{
                            marginTop: "2rem",
                            display: path?.includes("users") ? "block" : "none",
                          }}
                        >
                          Add New User
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
      {data?.length ? (
        <TablePaginationComponent
          paginationDetails={paginationDetails}
          capturePageNum={capturePageNum}
          captureRowPerItems={captureRowPerItems}
          values={path?.includes("users") ? "Users" : "Devices"}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default TanStackTableComponent;
