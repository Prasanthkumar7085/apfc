"use client"
import { useEffect, useState } from "react";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import { ListUserColumns } from "./ListUsersColumns";
import { getAllListUsersAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListUsersApiProps } from "@/interfaces/listUserAPITypes";

const ListUsers = () => {
    const params = useParams();
    const useParam = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState<any[]>([]);
    const [paginationDetails, setPaginationDetails] = useState({});
    const [searchParams, setSearchParams] = useState(
        Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
    );
    console.log(paginationDetails);

    const getPatientResults = async ({
        page = searchParams?.page,
        limit = searchParams?.limit,
    }: Partial<ListUsersApiProps>) => {
        setLoading(true);
        try {
            let queryParams: any = {
                page: page ? page : 1,
                limit: limit ? limit : 10,
            };
            let queryString = new URLSearchParams(queryParams).toString();

            router.push(`${pathname}?${queryString}`);
            const response = await getAllListUsersAPI();
            const { data, ...rest } = response;
            console.log(response);
            setUsersData(data);
            setPaginationDetails(rest);
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
        });
    }, [])

    const column = [
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
                        <div title="User Edit" style={{ cursor: "pointer" }}>
                            <Image
                                alt=""
                                src="/edit-user.svg"
                                width={13}
                                height={13}
                            />
                        </div>
                        <div title="User Delete" style={{ cursor: "pointer" }}>
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
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default ListUsers;