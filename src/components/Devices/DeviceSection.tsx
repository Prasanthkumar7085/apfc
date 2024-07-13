import AddIcon from "@mui/icons-material/Add";
import styles from "./DeviceSection.module.css";
import { Avatar, Button, MenuItem, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import AssignUserDialog from "./AssignUserDialog";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TablePaginationComponent from "../Core/TablePaginationComponent";
import { toast, Toaster } from "sonner";
import { updateDeviceStatusAPI } from "@/services/devicesAPIs";

const DeviceSection = ({ devicesData, paginationDetails, getData, loading }: any) => {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [devicesId, setDeviceId] = useState<any>();
  const [showLoading, setShowLoading] = useState(false);
  const params = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
  );

  const updateDeviceStatus = async (id: any, statusValue: string) => {
    setShowLoading(true);
    try {
      const payload = {
        status: statusValue,
      };
      let response: any = await updateDeviceStatusAPI(payload, id);

      if (response.success) {
        toast.success(response.message);
        getData({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
    );
  }, [params]);

  const capturePageNum = (value: number) => {
    getData({
      ...searchParams,
      limit: searchParams.limit as string,
      page: value,
    });
  };

  const captureRowPerItems = (value: number) => {
    getData({
      ...searchParams,
      limit: value,
      page: 1,
    });
  };

  return (
    <div >

      <div className="devicesGrp" style={{ padding: pathname.includes("users/") ? "12px" : "0" }}>
        {devicesData?.length ?
          devicesData.map((item: any, index: number) => {
            return (
              <div className="eachDeviceBlock" key={index}>
                <div className="headerBlock">
                  <div className="header">
                    <h4 className="deviceTItle">{item?.device_name || "--"}</h4>
                    <div className="settingsBlock">
                      <div className="deviceStatus" style={{ cursor: "pointer" }}>
                        <Image alt="" src="/icondot.svg" height={5} width={5} />
                        {/* <p className="statusTxt">{item?.status == "ACTIVE" ? "Online" : "Ofline"}</p> */}
                        <Tooltip
                          arrow
                          title={
                            <span style={{ fontSize: "16px" }}>
                              <MenuItem
                                disabled={item?.status == "ACTIVE"}
                                onClick={() => {
                                  updateDeviceStatus(item.id, "ACTIVE");
                                }}
                              >
                                Online
                              </MenuItem>
                              <MenuItem
                                disabled={item?.status == "INACTIVE"}
                                onClick={() => {
                                  updateDeviceStatus(item.id, "INACTIVE");
                                }}
                              >
                                Ofline
                              </MenuItem>
                            </span>
                          }
                        >
                          <span className="statusTxt">{item?.status == "ACTIVE" ? "Online" : "Ofline"}</span>
                        </Tooltip>
                      </div>
                      <Image alt="" src="/iconsetting.svg" height={25} width={25} />
                    </div>
                  </div>
                  <div className="deviceInfo">
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Voltage LN</p>
                      <h5 className="infoValue">{item?.device_parameters?.voltage_measurements?.average_voltage_ln || "--"}</h5>
                    </div>
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Voltage LL</p>
                      <h5 className="infoValue">{item?.device_parameters?.voltage_measurements?.average_voltage_ll || "--"}</h5>
                    </div>
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Current</p>
                      <h5 className="infoValue">{item?.device_parameters?.voltage_measurements?.average_current || "--"}</h5>
                    </div>
                  </div>
                </div>
                <div className="deviceInfo" style={{ padding: "16px 12px" }}>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kW</p>
                    <h5 className="infoValue">{item?.device_parameters?.power_measurements?.total_kw || "--"}</h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kVA</p>
                    <h5 className="infoValue">{item?.device_parameters?.power_measurements?.total_kva || "--"}</h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kVAr</p>
                    <h5 className="infoValue">{item?.device_parameters?.power_measurements?.total_kvar || "--"}</h5>
                  </div>
                  <div className="avarageInfo">
                    <p className="infoTitle">Average PF</p>
                    <h5 className="infoValue">{item?.average_pf || "--"}</h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">kWh</p>
                    <h5 className="infoValue">{item?.device_parameters?.power_measurements?.kwh || "--"}</h5>
                  </div>
                </div>

                <div className="temparatureInfo">
                  <div className="tempItems">
                    <Image
                      className="icontemperature"
                      alt=""
                      src="/icontemperature.svg"
                      height={24}
                      width={50}
                    />
                    {item?.device_parameters?.errors?.under_compensate_error === true ? (
                      <div className="errorBlock">
                        <Image alt="" src="/iconinfo.svg" height={18} width={18} />
                        <h6 >Under Compensate Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="actionsList">
                    {!item?.user_full_name ? (
                      <Button className="assignUserBtn" variant="contained" startIcon={<Image src="/users/assign-icon.svg" alt="" width={14} height={14} />} onClick={() => {
                        setDialogOpen(true)
                        setDeviceId(item?.id)
                      }}>
                        Assign User
                      </Button>
                    ) : (
                      ""
                    )}
                    {item?.user_full_name ? (
                      <div className="userInfo">
                        <Avatar className="userAvathar" >
                          {item?.user_full_name?.[0] || "--"}
                        </Avatar>
                        <h4 className="userName">
                          {item?.user_full_name || "--"}
                        </h4>
                      </div>
                    ) : (
                      ""
                    )}
                    <Button
                      variant="outlined"
                      className="viewBtn"
                      onClick={() => {
                        router.push(`/devices/${item?.id}`)
                      }}
                      startIcon={<Image alt="" src="/icon2.svg" height={15} width={15} />}
                    >
                      View
                    </Button>
                  </div>
                </div>

              </div>
            )
          }) : (
            !loading ? (
              <div
                className="noDataBlock"
              >
                <Image
                  src="/No data Image.svg"
                  alt=""
                  height={300}
                  width={300}
                />
                <div className="textBlock">
                  <p className="noDataTxt">{"It looks like you haven't added any devices yet."}</p>
                  <p className="noDataTxt">{"add a new device to monitor your agricultural operations."}</p>
                </div>
                <Button
                  className="addUserBtn" variant='outlined'
                  onClick={() => router.push('/devices/add')}
                  startIcon={<AddIcon />}
                >
                  Add New Device
                </Button>
              </div>
            ) : ""
          )}
      </div>
      <AssignUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        getData={getData}
        devicesId={devicesId}
      />
      {id ? "" :

        <TablePaginationComponent
          paginationDetails={paginationDetails}
          capturePageNum={capturePageNum}
          captureRowPerItems={captureRowPerItems}
          values="Devices"
        />

      }
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default DeviceSection;
