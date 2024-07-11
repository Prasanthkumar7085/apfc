import AddUser from "@/components/ListUsers/AddUser";
import { Suspense } from "react";

const UpdateUserPage = () => {

    return (
        <Suspense>
            <div>
                <AddUser />
            </div>
        </Suspense>
    );
}
export default UpdateUserPage;