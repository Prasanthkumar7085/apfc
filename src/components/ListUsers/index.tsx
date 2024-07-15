"use client"
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import { ListUserColumns } from "./ListUsersColumns";
import { deleteUserAPI, getAllListUsersAPI, updateUserStatusAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import { ListUsersApiProps } from "@/interfaces/listUserAPITypes";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { toast, Toaster } from "sonner";
import DeleteDialog from "../Core/DeleteDialog";
import { MenuItem, Tooltip } from "@mui/material";

const ListUsers = () => {
    const params = useParams();
    const useParam = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userId, setUserId] = useState<any>();
    const [usersData, setUsersData] = useState<any[]>([]);
    const [paginationDetails, setPaginationDetails] = useState({});
    const [status, setStatus] = useState("");
    const [searchParams, setSearchParams] = useState(
        Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
    );
    const getPatientResults = async ({
        page = searchParams?.page,
        limit = searchParams?.limit,
        search_string = searchParams?.search_string
    }: Partial<ListUsersApiProps>) => {
        setLoading(true);
        try {
            let queryParams: any = {
                page: page ? page : 1,
                limit: limit ? limit : 10,
                search_string: search_string ? search_string : ""
            };
            let queryString = prepareURLEncodedParams("", queryParams)

            router.push(`${pathname}${queryString}`);
            const response = await getAllListUsersAPI(queryParams);
            const { data, ...rest } = response;
            setUsersData(data);
            setPaginationDetails(rest);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async () => {
        setLoading(true);
        try {
            const response = await deleteUserAPI(userId);
            if (response.success) {
                closeDialog();
                toast.success(response.message);
                getPatientResults({});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateUserStatus = async (id: any, statusValue: string) => {
        setLoading(true);
        try {
            const payload = {
                status: statusValue,
            };
            let response: any = await updateUserStatusAPI(payload, id);

            if (response.success) {
                toast.success(response.message);
                getPatientResults({});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatientResults({
            page: 1,
            limit: 10,
            search_string: searchParams?.search_string,
        });
    }, [searchParams?.search_string]);

    useEffect(() => {
        setSearchParams(
            Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
        );
    }, [useParam]);

    const openDialog = (id: any) => {
        setDialogOpen(true);
        setUserId(id)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const column = [
        {
            accessorFn: (row: any) => row.status,
            id: "status",
            header: () => <span>status</span>,
            cell: (info: any) => {
                const value = info.getValue();
                const capitalizedValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : "--";
                return (
                    <Tooltip
                        arrow
                        title={
                            <span style={{ fontSize: "16px" }}>
                                <MenuItem
                                    disabled={info.getValue() == "ACTIVE"}
                                    onClick={() => {
                                        updateUserStatus(info?.row?.original?.id, "ACTIVE");
                                    }}
                                >
                                    Active
                                </MenuItem>
                                <MenuItem
                                    disabled={info.getValue() == "INACTIVE"}
                                    onClick={() => {
                                        updateUserStatus(info?.row?.original?.id, "INACTIVE");
                                    }}
                                >
                                    Inactive
                                </MenuItem>
                            </span>
                        }
                    >
                        <span className={value === "active" ? "status inactive" : "status active"} style={{ cursor: "pointer" }}>{capitalizedValue}</span>
                    </Tooltip>
                );
            },
            footer: (props: any) => props.column.id,
            width: "100px",
        },
        {
            accessorFn: (row: any) => row.actions,
            id: "actions",
            header: () => <span>Actions</span>,
            cell: (info: any) => {
                return (
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div
                            title="User View"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                router.push(`/users/${info?.row?.original?.id}`)
                            }}
                        >
                            <Image
                                alt=""
                                src="/user-view.svg"
                                width={15}
                                height={15}
                            />
                        </div>
                        <div
                            title="User Edit"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                router.push(`/users/${info?.row?.original?.id}/edit`)
                            }}
                        >
                            <Image
                                alt=""
                                src="/edit-user.svg"
                                width={13}
                                height={13}
                            />
                        </div>
                        <div title="User Delete"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                openDialog(info?.row?.original?.id)
                            }}
                        >
                            <Image
                                alt=""
                                src="/delete-user.svg"
                                width={15}
                                height={15}
                            />
                        </div>
                    </div>
                );
            },
            footer: (props: any) => props.column.id,
            width: "100px",
        },
    ]

    return (
        <div id="usersPage">
            <TanStackTableComponent
                data={usersData}
                columns={[...ListUserColumns, ...column]}
                loading={loading}
                paginationDetails={paginationDetails}
                getData={getPatientResults}
            />
            <DeleteDialog
                deleteUser={deleteUser}
                lable="You Wan't Delete User"
                open={dialogOpen}
                closeDialog={closeDialog}
            />
            <LoadingComponent loading={loading} />
            <Toaster richColors closeButton position="top-right" />
        </div>
    );
}
export default ListUsers;