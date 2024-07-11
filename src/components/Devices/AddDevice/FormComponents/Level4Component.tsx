import Image from "next/image";
import styles from "./Level2Component.module.css";
import { useState } from "react";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import { fanSettings } from "@/lib/constants/addDevicesConstants";

const Level4Component = () => {
  const [level4Data, setLevel4Data] = useState<any>({});

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
              value={level4Data}
              handleChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };
  const handleChange = () => {};
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
    </>
  );
};
export default Level4Component;
