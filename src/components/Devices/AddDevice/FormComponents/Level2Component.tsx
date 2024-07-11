// SettingsForm.tsx
import {
  compensationSettings,
  errorHandlingSettings,
  factoryAndEnergySettings,
  fanAndHysteresisSettings,
  harmonicDistortionSettings,
  voltageSettings,
} from "@/lib/constants/addDevicesConstants";
import React, { useState } from "react";
import styles from "./Level2Component.module.css";
import { Switch } from "@mui/material";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";

const Level2Component = () => {
  const [level2Data, setLevel2Data] = useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLevel2Data({
      ...level2Data,
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
                checked={level2Data[setting.name] || false}
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
            <RangeWithUnits
              setting={setting}
              value={level2Data}
              handleChange={handleChange}
            />
          </div>
        );
      case "password":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>{setting.label}</label>
            <PasswordFormFields
              name={setting.name}
              value={level2Data}
              handleChange={handleChange}
            />
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
          <h3>Voltage Settings</h3>
          {voltageSettings.map(renderField)}
          <h3>Harmonic Distortion Settings</h3>
          {harmonicDistortionSettings.map(renderField)}
          <h3>Compensation Settings</h3>
          {compensationSettings.map(renderField)}
        </section>

        <section className={styles.formSection}>
          <h3>Error Handling</h3>
          {errorHandlingSettings.map(renderField)}
          <h3>Fan and Hysteresis Settings</h3>
          {fanAndHysteresisSettings.map(renderField)}
        </section>
        <section className={styles.formSection}>
          <h3>Factory and Energy Settings</h3>
          {factoryAndEnergySettings.map(renderField)}
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

export default Level2Component;
