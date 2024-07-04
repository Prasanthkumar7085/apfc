"use client"
import { useEffect, useState } from "react";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import { ListUserColumns } from "./ListUsersColumns";
import { getAllListUsersAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";

const ListUsers = () => {

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

    return (
        <div>
            <TanStackTableComponent
                data={usersData}
                columns={ListUserColumns}
                loading={loading}
            />
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default ListUsers;