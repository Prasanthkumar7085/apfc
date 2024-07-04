"use client"
import { useEffect, useState } from "react";
import DeviceSection from "./DeviceSection";
import { getAllDevicesAPI } from "@/services/devicesAPIs";
import LoadingComponent from "../Core/LoadingComponent";

const Devices = () => {

    const [loading, setLoading] = useState(false);
    const [devicesData, setDevicesData] = useState<any[]>([]);

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getAllDevicesAPI();
            setDevicesData(response?.record)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatientResults();
    }, [])

    return (
        <div>
            <DeviceSection
                devicesData={devicesData}
            />
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default Devices;