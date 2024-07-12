import SingleUserView from "@/components/ListUsers/SingleUserView";
import { Suspense } from "react";

const SingleUserViewPage = () => {

    return (
        <Suspense>
            <div>
                <SingleUserView />
            </div>
        </Suspense>
    );
}
export default SingleUserViewPage;