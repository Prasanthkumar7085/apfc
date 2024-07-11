import AddDevice from "@/components/Devices/AddDevice";
import { Suspense } from "react";

const AddDevicePage = () => {

    return (
        <Suspense>
            <div>
                <AddDevice />
            </div>
        </Suspense>
    );
}
export default AddDevicePage;