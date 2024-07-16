"use client";
import AddDevice from "@/components/Devices/AddDevice/AddDevice";
import { Suspense } from "react";

const UpdateDevicePage = () => {
    return (
        <Suspense>
            <AddDevice />
        </Suspense>
    );
};
export default UpdateDevicePage;
