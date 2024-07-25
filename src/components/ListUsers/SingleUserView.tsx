"use client"
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, Tooltip } from "@mui/material";
// import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getSigleUserAPI, getSigleUserDevicesAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import DeviceSection from "../Devices/DeviceSection";
import AssignDeviceDialog from "./AssignDeviceDialog";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { useDispatch } from "react-redux";
import { setSingleUser } from "@/redux/Modules/userlogin";
import dayjs from "dayjs";

const SingleUserView = () => {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState<any>({});
    const [data, setData] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const getSinleUser = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserAPI(params?.id);
            setUsersData(response?.data)
            dispatch(setSingleUser(response?.data));
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
            setData(response?.data);
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
            <div className="userInfo">
                <div className="profileGrp">
                    <Avatar className="profileavatarIcon">
                        {usersData?.full_name?.[0].toUpperCase()}
                    </Avatar>
                    {usersData?.full_name?.length > 20 ? (
                        <Tooltip title={usersData?.full_name} arrow>
                            <h4 className="profileName">{
                                capitalizeFirstTwoWords(usersData?.full_name?.length > 20
                                    ? usersData?.full_name.slice(0, 20) + '...'
                                    : usersData?.full_name)}
                            </h4>
                        </Tooltip>
                    ) : (
                        <h4 className="profileName">{
                            capitalizeFirstTwoWords(usersData?.full_name)}
                        </h4>
                    )}
                    <div className={usersData?.status == "ACTIVE" ? "status active" : "status inactive"}>
                        {usersData?.status == "ACTIVE" ?
                            <Image alt="" src="/devices/icondot-online.svg" width={8} height={8} /> : <Image alt="" src="/devices/icondot-offline.svg" width={8} height={8} />}
                        <span>{usersData?.status?.charAt(0).toUpperCase() + usersData?.status?.slice(1)}    </span>
                    </div>

                </div>
                <div className="joiningInfo">
                    <Image alt="" src="/calendar-blank 1.svg" width={15} height={15} />
                    <span>Joined {dayjs(usersData?.created_at).format("MMM YY")}</span>
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
                        loading={loading}
                        getData={getSinleUserDevices}
                        setLoading={setLoading}
                    />
                ) : (
                    !loading ? (
                        <div className="noDataBlock" >
                            <Image src="/No data Image.svg" alt="" width={200} height={200} />
                            <div className="textBlock">
                                <p className="noDataTxt">{"It looks like you haven't added any devices yet."}</p>
                                <p className="noDataTxt">{"add a new device to monitor your agricultural operations."}</p>
                            </div>
                            <Button
                                className="addUserBtn"
                                variant='outlined'
                                onClick={() => setDialogOpen(true)}
                                startIcon={<AddIcon />}
                            >
                                Add New Device
                            </Button>
                        </div>
                    ) : ""
                )}
            </div>
            <AssignDeviceDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                getSinleUser={getSinleUser}
                getSinleUserDevices={getSinleUserDevices}
            />

            <LoadingComponent loading={loading} />
        </div>
    )
}

export default SingleUserView;
