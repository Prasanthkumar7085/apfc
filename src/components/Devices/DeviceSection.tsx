import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, MenuItem, Tooltip, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import AssignUserDialog from "./AssignUserDialog";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import TablePaginationComponent from "../Core/TablePaginationComponent";
import { toast, Toaster } from "sonner";
import { deleteAssignUserAPI, updateDeviceStatusAPI } from "@/services/devicesAPIs";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import DeleteDialog from "../Core/DeleteDialog";

const DeviceSection = ({
  devicesData,
  paginationDetails,
  getData,
  loading,
  setLoading
}: any) => {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  const deleteAssignUser = async () => {
    setLoading(true);
    try {
      const response = await deleteAssignUserAPI(devicesId);
      if (response.success) {
        closeDialog();
        toast.success(response.message);
        getData({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  const openDialog = (id: any) => {
    setOpen(true);
    setDeviceId(id)
  }

  const closeDialog = () => {
    setOpen(false)
  }


  return (
    <div>
      <div
        className="devicesGrp"
        style={{ padding: pathname.includes("users/") ? "12px" : "0" }}
      >
        {devicesData?.length ? (
          devicesData.map((item: any, index: number) => {
            return (
              <div className="eachDeviceBlock" key={index}>
                <div className="headerBlock">
                  <div className="header">
                    <h4 className="deviceTItle">
                      {capitalizeFirstTwoWords(item?.device_name) || "--"}
                    </h4>

                    <div className="settingsBlock">
                      <div className="backBtn editbtn"
                        title="Edit Device"
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        onClick={() => {
                          router.push(`/devices/${item?.id}/edit`)
                        }}
                      >
                        <Image
                          alt=""
                          src="/edit-user.svg"
                          width={10}
                          height={10}

                        />
                        <span>Edit</span>
                      </div>
                      <div
                        className={item?.status == "ACTIVE" ? "deviceStatus online" : "deviceStatus offline"}
                        style={{ cursor: "pointer" }}
                      >
                        {item?.status == "ACTIVE" ? <Image alt="" src="/devices/icondot-online.svg" height={5} width={5} /> : <Image alt="" src="/devices/icondot-offline.svg" height={5} width={5} />}

                        <Tooltip
                          arrow
                          title={
                            <span>
                              <MenuItem className="menuItem"
                                disabled={item?.status == "ACTIVE"}
                                onClick={() => {
                                  updateDeviceStatus(item.id, "ACTIVE");
                                }}
                              >
                                Online
                              </MenuItem>
                              <MenuItem className="menuItem"
                                disabled={item?.status == "INACTIVE"}
                                onClick={() => {
                                  updateDeviceStatus(item.id, "INACTIVE");
                                }}
                              >
                                Offline
                              </MenuItem>
                            </span>
                          }
                        >
                          <span className="statusTxt">
                            {item?.status == "ACTIVE" ? "Online" : "Offline"}
                          </span>
                        </Tooltip>
                      </div>
                      <Image
                        alt=""
                        src="/iconsetting.svg"
                        height={25}
                        width={25}
                        title="View Settings"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(`/devices/${item.id}/view-settings?state=Level1`
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="deviceInfo">
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Voltage LN</p>
                      <h5 className="infoValue">
                        {item?.average_voltage_ln?.toFixed(2) || "--"}
                      </h5>
                    </div>
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Voltage LL</p>
                      <h5 className="infoValue">
                        {item?.average_voltage_ll?.toFixed(2) || "--"}
                      </h5>
                    </div>
                    <div className="eachDeviceInfo">
                      <p className="infoTitle">Average Current</p>
                      <h5 className="infoValue">
                        {item?.average_current?.toFixed(2) || "--"}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="deviceInfo" style={{ padding: "16px 12px" }}>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kW</p>
                    <h5 className="infoValue">
                      {item?.total_kw?.toFixed(2) ||
                        "--"}
                    </h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kVA</p>
                    <h5 className="infoValue">
                      {item?.total_kva?.toFixed(2) ||
                        "--"}
                    </h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">Total kVAr</p>
                    <h5 className="infoValue">
                      {item?.total_kvar?.toFixed(2) || "--"}
                    </h5>
                  </div>
                  <div className="avarageInfo">
                    <p className="infoTitle">Average PF</p>
                    <h5 className="infoValue">{item?.average_pf?.toFixed(2) || "--"}</h5>
                  </div>
                  <div className="eachDeviceInfo">
                    <p className="infoTitle">kWh</p>
                    <h5 className="infoValue">
                      {item?.kwh?.toFixed(2) || "--"}
                    </h5>
                  </div>
                </div>

                <div className="temparatureInfo">
                  <div className="tempItems">

                    <div className="temparature">
                      <Image src="/devices/temparature.svg" alt="" height={24} width={20} />
                      <Typography>
                        {item?.temperature ? item?.temperature + " C" : "--"}
                      </Typography>

                    </div>
                    {item?.under_compensate_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>Under Compensate Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.under_voltage_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>Under Voltage Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.ct_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>CT Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.no_voltage_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>No Voltage Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.over_compensate_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>Over Compensate Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.over_voltage_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>Over Voltage Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.temperature_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>Temperature Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.thd_i_error ===
                      1 ? (
                      <div className="errorBlock">
                        <Image
                          alt=""
                          src="/iconinfo.svg"
                          height={18}
                          width={18}
                        />
                        <h6>THD I Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="actionsList">
                    {!item?.user_full_name ? (
                      <Button
                        className="assignUserBtn"
                        variant="contained"
                        startIcon={
                          <Image
                            src="/users/assign-icon.svg"
                            alt=""
                            width={14}
                            height={14}
                          />
                        }
                        onClick={() => {
                          setDialogOpen(true);
                          setDeviceId(item?.id);
                        }}
                      >
                        Assign User
                      </Button>
                    ) : (
                      ""
                    )}
                    {item?.user_full_name ? (
                      <Button
                        className="assignUserBtn"
                        variant="contained"
                        startIcon={
                          <Image
                            src="/delete-user.svg"
                            alt=""
                            width={14}
                            height={14}
                          />
                        }
                        onClick={() => {
                          openDialog(item?.id);
                        }}
                      >
                        Remove Assigned User
                      </Button>) : ("")}
                    {item?.user_full_name ? (
                      <div className="userInfo">
                        <Avatar className="userAvathar">
                          {item?.user_full_name?.[0].toUpperCase() || "--"}
                        </Avatar>
                        <h4 className="userName">
                          {capitalizeFirstTwoWords(item?.user_full_name) ||
                            "--"}
                        </h4>
                      </div>
                    ) : (
                      ""
                    )}
                    <Button
                      variant="outlined"
                      className="viewBtn"
                      title="View Device"
                      onClick={() => {
                        router.push(`/devices/${item?.id}`);
                      }}
                      startIcon={
                        <Image alt="" src="/icon2.svg" height={15} width={15} />
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : !loading ? (
          <div className="noDataBlock" style={{ height: "calc(100vh - 250px)" }}>
            <Image src="/No data Image.svg" alt="" height={300} width={300} />
            <div className="textBlock">
              <p className="noDataTxt">
                {"It looks like you haven't added any devices yet."}
              </p>
              <p className="noDataTxt">
                {"add a new device to monitor your agricultural operations."}
              </p>
            </div>
            <Button
              className="addUserBtn"
              variant="outlined"
              onClick={() => router.push("/devices/add")}
              startIcon={<AddIcon />}
            >
              Add New Device
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <AssignUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        getData={getData}
        devicesId={devicesId}
      />
      {id ? (
        ""
      ) : devicesData?.length ? (
        <div>
          <TablePaginationComponent
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
            values="Devices"
          />
        </div>
      ) : (
        ""
      )}
      <DeleteDialog
        deleteUser={deleteAssignUser}
        headerName="Delete Assign User"
        lable="Are you sure you want to delete the assigned user?"
        open={open}
        closeDialog={closeDialog}
      />
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default DeviceSection;
