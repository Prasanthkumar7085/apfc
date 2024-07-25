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
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import TablePaginationComponent from "./TablePaginationComponent";
import { Button } from "@mui/material";

interface pageProps {
    columns: any[];
    data: any[];
    loading: boolean;
    paginationDetails: any;
    getData: any
}
const TanStackTableComponent: FC<pageProps> = ({
    columns,
    data,
    loading,
    paginationDetails,
    getData
}) => {
    const router = useRouter();
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
        "device_name",
        "status",
        "last_login",
        "device_count"
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


    const getBackgroundColor = (totalCases: any, targetVolume: any) => {
        if (targetVolume === 0) {
            if (totalCases === 0) {
                return "#f5fff7"; // Both total cases and target volume are zero
            } else if (totalCases >= targetVolume) {
                return "#f5fff7"; // Both total cases and target volume are zero
            } else {
                return "#ffebe9";
            }
        }

        const percentage = totalCases / targetVolume;
        if (totalCases >= targetVolume) {
            return "#f5fff7"; // Green for completion
        } else if (percentage >= 0.5) {
            return "#feecd1"; // Orange for partial completion
        } else {
            return "#ffebe9"; // Red for incomplete
        }
    };
    return (
        <div className="mainTable">

            <div className="tableContainer">
                <table className="table">
                    <thead
                        className="thead"

                    >
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
                                                        // onClick={() => sortAndGetData(header)}
                                                        {...{
                                                            className: header.column.getCanSort()
                                                                ? "select-none"
                                                                : "",
                                                        }}
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                            cursor: "pointer",
                                                            minWidth: getWidth(header.id),
                                                            width: getWidth(header.id),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            // asc: (
                                                            //     <Image
                                                            //         src="/core/sort/sort-asc.svg"
                                                            //         height={8}
                                                            //         width={8}
                                                            //         alt="image"
                                                            //     />
                                                            // ),
                                                            // desc: (
                                                            //     <Image
                                                            //         src="/core/sort/sort-desc.svg"
                                                            //         height={8}
                                                            //         width={8}
                                                            //         alt="image"
                                                            //     />
                                                            // ),
                                                        }[header.column.getIsSorted() as string] ?? (
                                                                <Image
                                                                    src="/core/sort/un-sort.svg"
                                                                    height={8}
                                                                    width={8}
                                                                    alt="Unsorted"
                                                                    style={{
                                                                        display:
                                                                            header.id === "actions" ||
                                                                                removeSortingForColumnIds.includes(header.id)
                                                                                ? "none"
                                                                                : "",
                                                                    }}
                                                                />
                                                            )}
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
                                                        backgroundColor:
                                                            row?.original.hasOwnProperty("total_targets") &&
                                                                cell?.id &&
                                                                cell?.id.includes("total_cases")
                                                                ? getBackgroundColor(
                                                                    row.original.total_cases,
                                                                    row?.original?.dayTargets ? row?.original?.dayTargets : row?.original?.total_targets
                                                                )
                                                                : "",
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
                                        {!data?.length && (useParams?.get('status') || useParams?.get('search_string')) ? (
                                            <>
                                                <Image src="/no-data-user.svg" alt="" height={350} width={350} />
                                                <p >
                                                    {"No Users"}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Image src="/no-user-image.svg" alt="" height={300} width={300} />
                                                <div className="textBlock">
                                                    <p className="noDataTxt">
                                                        {"It looks like three are no users yet. Add a new user to start"}
                                                    </p>
                                                    <p className="noDataTxt">
                                                        {"managing your account."}
                                                    </p>
                                                </div>
                                                <Button
                                                    className="addUserBtn"
                                                    variant="outlined"
                                                    onClick={() => router.push('/users/add')}
                                                    startIcon={<AddIcon />}
                                                    sx={{ marginTop: "2rem" }}
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
                    values="Users"
                />
            ) : (
                ""
            )}
        </div>

    );
};
export default TanStackTableComponent;
