import Devices from "@/components/Devices";
import { Suspense } from "react";

const DevicesPage = () => {

    return (
        <Suspense>
            <div>
                <Devices />
            </div>
        </Suspense>
    );
}
export default DevicesPage;