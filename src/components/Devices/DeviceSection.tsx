import type { NextPage } from "next";
import styles from "./DeviceSection.module.css";
import { Avatar, Stack } from "@mui/material";

const DeviceSection = ({ devicesData }: any) => {
  return (
    <>
      {
        devicesData.map((item: any, index: number) => {
          return (
            <div className={styles.devicesection} key={index}>
              <div className={styles.devicegroup}>
                <div className={styles.deviceheading}>
                  <div className={styles.devicename}>
                    <h4 className={styles.morocoDevice}>{item?.device_name}</h4>
                    <div className={styles.devicestatus}>
                      <img className={styles.icondot} alt="" src="/icondot.svg" />
                      <p className={styles.online}>Online</p>
                    </div>
                  </div>
                  <img className={styles.iconsetting} alt="" src="/iconsetting.svg" />
                </div>
                <div className={styles.devicerow}>
                  <div className={styles.devicecolumn}>
                    <p className={styles.averageVoltageLn}>Average Voltage LN</p>
                    <h5 className={styles.v}>{item?.device_parameters?.voltage_measurements?.average_voltage_ln}</h5>
                  </div>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLl}>Average Voltage LL</p>
                    <h5 className={styles.v1}>{item?.device_parameters?.voltage_measurements?.average_voltage_ll}</h5>
                  </div>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLn}>Average Current</p>
                    <h5 className={styles.v}>{item?.device_parameters?.voltage_measurements?.average_current}</h5>
                  </div>
                </div>
                <div className={styles.devicerow1}>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLl}>Total kW</p>
                    <h5 className={styles.v1}>{item?.device_parameters?.power_measurements?.total_kw}</h5>
                  </div>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLn}>Total kVA</p>
                    <h5 className={styles.v}>{item?.device_parameters?.power_measurements?.total_kva}</h5>
                  </div>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLl}>Total kVAr</p>
                    <h5 className={styles.v1}>{item?.device_parameters?.power_measurements?.total_kvar}</h5>
                  </div>
                  <div className={styles.devicecolumn6}>
                    <p className={styles.online}>Average PF</p>
                    <h5 className={styles.h53}>{item?.average_pf}</h5>
                  </div>
                  <div className={styles.devicecolumn1}>
                    <p className={styles.averageVoltageLl}>kWh</p>
                    <h5 className={styles.v1}>{item?.device_parameters?.power_measurements?.kwh}</h5>
                  </div>
                </div>
                <div className={styles.devicetemperature}>
                  <div className={styles.temperaturecolumn}>
                    <img
                      className={styles.icontemperature}
                      alt=""
                      src="/icontemperature.svg"
                    />
                    {item?.device_parameters?.errors?.under_compensate_error === true ? (
                      <div className={styles.errormessage}>
                        <img className={styles.iconinfo} alt="" src="/iconinfo.svg" />
                        <h6 className={styles.noVoltageError}>Under Compensate Error</h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.profilecolumn}>
                    <div className={styles.profilegroup}>
                      <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: "orange" }}>
                          {item?.user?.first_name?.[0]}{item?.user?.last_name?.[0]}
                        </Avatar>
                      </Stack>
                      {/* <img
                        className={styles.profileavatarIcon}
                        alt=""
                        src="/profileavatar@2x.png"
                      /> */}
                      <h4 className={styles.profilename}>{item?.user?.first_name + " " + item?.user?.last_name}</h4>
                    </div>
                    <div className={styles.devicestatus1}>
                      <img className={styles.icon} alt="" src="/icon2.svg" />
                      <h6 className={styles.noVoltageError}>View</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </>
  );
};

export default DeviceSection;
