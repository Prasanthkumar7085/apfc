"use client"
import { getSigleUserAPI, getSigleUserDevicesAPI } from "@/services/listUsersAPIs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Avatar, Button, Stack } from "@mui/material";
import Image from "next/image";
import styles from "./SingleUserView.module.css"
import DeviceSection from "../Devices/DeviceSection";
import dayjs from "dayjs";

const SingleUserView = () => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState<any>({});
    const [data, setData] = useState<any[]>([]);

    const getSinleUser = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserAPI(params?.id);
            setUsersData(response?.data)
            setData(response?.data?.device_ids)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getSinleUserDevices = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserDevicesAPI(params?.id);
            setData(response?.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSinleUser();
        getSinleUserDevices();
    }, [])

    return (
        <div id="viewUserPage" >
            <Button
                variant="outlined"
                className="backBtn"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
                onClick={() => router.back()}
                startIcon={<Image src="/users/back-icon.svg" alt="" width={13} height={13} />}  >
                Back
            </Button>
            <div className="userInfo">
                <div className="profileGrp">
                    <Avatar className="profileavatarIcon">
                        {usersData?.full_name?.[0]}
                    </Avatar>
                    <h4 className="profileName">{usersData?.full_name}</h4>
                    <div className="status">
                        <Image alt="" src="/Completed 1.svg" width={12} height={12} />
                        <span>{usersData?.status?.charAt(0).toUpperCase() + usersData?.status?.slice(1)}    </span>
                    </div>

                </div>
                <div className="joiningInfo">
                    <Image alt="" src="/calendar-blank 1.svg" width={15} height={15} />
                    <span>Joined {dayjs(usersData?.updated_at).format("MMM YY")}</span>
                </div>
                <div className="contactDetails">
                    <div className="contactInfo">
                        <Image alt="" src="/mail.svg" width={15} height={15} />
                        <span>{usersData?.email}</span>
                    </div>
                    <div className="contactInfo">
                        <Image alt="" src="/phone.svg" width={15} height={15} />
                        <span>{usersData?.phone}</span>
                    </div>

                </div>
            </div>
            <div className="userDevices">
                <h4 className="blockHeading">Devices</h4>
                {data?.length ? (
                    <DeviceSection
                        devicesData={data}
                    />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <Image src="/No data Image.svg" alt="" width={300} height={300} />
                        <p>{"It looks like you haven't added any devices yet."}</p>
                        <p>{"add a new device to monitor your agricultural operations."}</p>
                    </div>
                )}
            </div>

            <LoadingComponent loading={loading} />
        </div>
    )
}

export default SingleUserView;
