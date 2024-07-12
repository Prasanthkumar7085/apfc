"use client";
import AddDevice from "@/components/Devices/AddDevice/AddDevice";
import { Suspense } from "react";

const AddDevicePage = () => {
    return (
        <Suspense>
            <AddDevice />
        </Suspense>
    );
};
export default AddDevicePage;
