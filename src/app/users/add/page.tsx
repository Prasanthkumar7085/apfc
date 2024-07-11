import AddUser from "@/components/ListUsers/AddUser";
import { Suspense } from "react";

const AddUserPage = () => {

    return (
        <Suspense>
            <div>
                <AddUser />
            </div>
        </Suspense>
    );
}
export default AddUserPage;