import SingleDeviceView from "@/components/Devices/SingleDeviceView";
import { Suspense } from "react";

const SingleDeviceViewPage = () => {

    return (
        <Suspense>
            <div>
                <SingleDeviceView />
            </div>
        </Suspense>
    );
}
export default SingleDeviceViewPage;