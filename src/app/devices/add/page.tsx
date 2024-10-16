"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AddDeviceComponent = dynamic(
  () => import("@/components/Devices/AddDevice/AddDevice"),
  {
    ssr: false,
  }
);
const AddDevicePage = () => {
  return (
    <Suspense>
      <AddDeviceComponent />
    </Suspense>
  );
};
export default AddDevicePage;
