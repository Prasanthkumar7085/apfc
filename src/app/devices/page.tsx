import DevicesList from "@/components/Devices";
import Devices from "@/components/Devices";
import { Suspense } from "react";

const DevicesPage = () => {
  return (
    <Suspense>
      <DevicesList />
    </Suspense>
  );
};
export default DevicesPage;
