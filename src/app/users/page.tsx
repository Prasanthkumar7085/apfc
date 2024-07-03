import ListUsers from "@/components/ListUsers";
import { Suspense } from "react";

const Users = () => {

    return (
        <Suspense>
            <div>
                <ListUsers />
            </div>
        </Suspense>
    );
}
export default Users;