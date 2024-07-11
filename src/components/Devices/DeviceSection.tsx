import type { NextPage } from "next";
import styles from "./DeviceSection.module.css";
import { Avatar, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AssignUserDialog from "./AssignUserDialog";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TablePaginationComponent from "../Core/TablePaginationComponent";

const DeviceSection = ({ devicesData, paginationDetails, getData }: any) => {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const useParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
  );

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(useParams.entries())))
    );
  }, [useParams]);

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
    <div className="devicesGrp">
      {
        devicesData.map((item: any, index: number) => {
          return (
            <div className="eachDeviceBlock" key={index}>
              <div className="headerBlock">
                <div className="header">
                  <h4 className="deviceTItle">{item?.device_name || "--"}</h4>
                  <div className="settingsBlock">
                    <div className="deviceStatus">
                      <Image alt="" src="/icondot.svg" height={5} width={5} />
                      <p className="statusTxt">Online</p>
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
                  <Button className="assignUserBtn" variant="contained" startIcon={<Image src="/users/assign-icon.svg" alt="" width={14} height={14} />} onClick={() => setDialogOpen(true)}>
                    Assign User
                  </Button>
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
        })}
      <AssignUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <div>
        <TablePaginationComponent
          paginationDetails={paginationDetails}
          capturePageNum={capturePageNum}
          captureRowPerItems={captureRowPerItems}
          values="Devices"
        />
      </div>
    </div>
  );
};

export default DeviceSection;
