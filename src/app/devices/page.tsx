// import DevicesList from "@/components/Devices";
import Devices from "@/components/Devices";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import { Suspense } from "react";

const DevicesList = dynamic(() => import("@/components/Devices"), {
  ssr: false,
});

const DevicesPage = () => {
  return (
    <Suspense>
      <DevicesList />
    </Suspense>
  );
};
export default DevicesPage;
