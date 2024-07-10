import ListUsers from "@/components/ListUsers";
import { Suspense } from "react";

const Users = () => {

    return (
        <Suspense>
                <ListUsers />
        </Suspense>
    );
}
export default Users;