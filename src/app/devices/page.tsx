import Devices from "@/components/Devices";
import { Suspense } from "react";

const DevicesPage = () => {

    return (
        <Suspense>
            <Devices />
        </Suspense>
    );
}
export default DevicesPage;