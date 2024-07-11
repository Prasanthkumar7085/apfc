import Image from "next/image";
import styles from "./Level2Component.module.css";
import { useState } from "react";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import { fanSettings } from "@/lib/constants/addDevicesConstants";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";

const Level4Component = ({
  levelBasedData,
  setLevelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const renderField = (setting: any) => {
    switch (setting.type) {
      case "select":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>
              {setting.label}
              <select
                className={styles.select}
                onChange={handleChange}
                name={setting.name}
                value={levelBasedData?.[setting.name]}
              >
                {setting.options?.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        );
      case "input":
      case "number":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>{setting.label}</label>
            <RangeWithUnits
              setting={setting}
              value={levelBasedData}
              handleChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setLevelBasedData({
      ...levelBasedData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <>
      <form className={styles.form}>
        <section className={styles.formSection}>
          <div>
            <img className={styles.arroIcon} alt="" src="/car-radiator.svg" />
          </div>
          <div className={styles.fieldGroup}>
            {fanSettings.map(renderField)}
          </div>
        </section>
      </form>
      <SaveAndConfirmationButtons
        levelBasedData={levelBasedData}
        getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
      />
    </>
  );
};
export default Level4Component;
