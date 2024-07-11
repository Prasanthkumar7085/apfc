import { useState } from "react";
import styles from "./Level2Component.module.css";
import { Switch } from "@mui/material";
import { factoryEnergySettings } from "@/lib/constants/addDevicesConstants";

const Level3Component = () => {
  const [level3Data, setLevel3Data] = useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLevel3Data({
      ...level3Data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const renderField = (setting: any) => {
    switch (setting.type) {
      case "switch":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>
              {setting.label}
              <Switch
                name={setting.name}
                checked={level3Data[setting.name] || false}
                onChange={handleChange}
                inputProps={{ "aria-label": setting.label }}
              />
            </label>
          </div>
        );
      case "input":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>{setting.label}</label>
            <input
              type="number"
              className={styles.input}
              name={setting.name}
              min={setting.min}
              max={setting.max}
              step={setting.step || 1}
              value={level3Data[setting.name] || ""}
              onChange={handleChange}
            />
            {setting.unit && <span>{setting.unit}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className={styles.form}>
        <section className={styles.formSection}>
          <h3>Factory and Energy Settings</h3>
          {factoryEnergySettings.map(renderField)}
        </section>
      </form>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Cancel
        </button>
        <button type="submit" className={styles.button}>
          Save & Continue
        </button>
      </div>
    </>
  );
};
export default Level3Component;
