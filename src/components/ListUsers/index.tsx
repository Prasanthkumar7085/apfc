"use client"
import { useEffect, useState } from "react";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import { ListUserColumns } from "./ListUsersColumns";
import { getAllListUsersAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ListUsers = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState<any[]>([]);

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getAllListUsersAPI();
            setUsersData(response?.record)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatientResults();
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
                                width={20}
                                height={20}
                            />
                        </div>
                        <div title="User Edit" style={{ cursor: "pointer" }}>
                            <Image
                                alt=""
                                src="/edit-user.svg"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div title="User Delete" style={{ cursor: "pointer" }}>
                            <Image
                                alt=""
                                src="/delete-user.svg"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                );
            },
            footer: (props: any) => props.column.id,
            width: "150px",
        },
    ]

    return (
        <div style={{ width: "100%" }}>
            <TanStackTableComponent
                data={usersData}
                columns={[...ListUserColumns, ...column]}
                loading={loading}
            />
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default ListUsers;