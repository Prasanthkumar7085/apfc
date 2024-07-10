"use client"
import { getSigleUserAPI } from "@/services/listUsersAPIs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Avatar, Button, Stack } from "@mui/material";
import Image from "next/image";
import styles from "./SingleUserView.module.css"
import DeviceSection from "../Devices/DeviceSection";

const SingleUserView = () => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState<any>({});
    const [data, setData] = useState<any[]>([]);

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserAPI();
            setUsersData(response?.record)
            setData(response?.record?.device_ids)

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
        <div id="viewUserPage" >
            <Button
                variant="outlined"
                className="backBtn"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
                onClick={() => router.back()}
                startIcon={<Image src="/users/back-icon.svg" alt="" width={13} height={13} />}

            >
                Back
            </Button>
            <div className="profilegroup">
                <Avatar className="profileavatarIcon">
                    {usersData?.first_name?.[0]}{usersData?.last_name?.[0]}
                </Avatar>
                <div>
                    <h4 className="profilename">{usersData?.first_name + " " + usersData?.last_name}</h4>
                    <div className="iconstatus">
                        <Image className="statusicon" alt="" src="/Completed 1.svg" width={10} height={10} />
                        <span>{usersData?.status}</span>
                    </div>
                    <div className="userinfo">
                        <Image alt="" src="/calendar-blank 1.svg" width={15} height={15} />
                        <span>{usersData?.updated_at}</span>
                    </div>
                    <div className="userinfo">
                        <Image alt="" src="/mail.svg" width={15} height={15} />
                        <span>{usersData?.email}</span>
                    </div>
                    <div className="userinfo">
                        <Image alt="" src="/phone.svg" width={15} height={15} />
                        <span>{usersData?.phone}</span>
                    </div>
                </div>
            </div>
            <div className="devicesection">
                <h4>Devices</h4>
                <DeviceSection
                    devicesData={data}
                />
            </div>
            <LoadingComponent loading={loading} />
        </div>
    )
}

export default SingleUserView;
