import React, { useState } from "react";
import styles from "./Level1Component.module.css";
import {
  AuthenticationSettings,
  CommunicationSettings,
  CompensationSettings,
  ControlSensitivitySettings,
  CurrentTransformerSettings,
  DeviceConfiguration,
  DisplaySettings,
  PotentialTransformerSettings,
  TimingSettings,
} from "@/lib/constants/addDevicesConstants";
import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";

const Level1Component = () => {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderField = (setting: any) => {
    switch (setting.type) {
      case "text":
      case "number":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>
              {setting.label}
              <RangeWithUnits
                setting={setting}
                value={formData}
                handleChange={handleChange}
              />
            </label>
          </div>
        );
      case "password":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>
              {setting.label}
              <PasswordFormFields
                name={setting.name}
                handleChange={handleChange}
                value={formData}
              />
            </label>
          </div>
        );
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
      case "radio":
        return (
          <div className={styles.fieldGroup} key={setting.name}>
            <label className={styles.label}>
              {setting.label}
              <div className={styles.radioGroup}>
                {setting.options?.map((option: any) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={setting.name}
                      value={option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </label>
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
          <h3>Authetication Settings</h3>
          {AuthenticationSettings.map(renderField)}
          <h3>Device Configuration</h3>
          {DeviceConfiguration.map(renderField)}
          <h3>Current Transformer (CT) Settings</h3>
          {CurrentTransformerSettings.map(renderField)}
          <h3>Potential Transformer (PT) Settings</h3>
          {PotentialTransformerSettings.map(renderField)}
        </section>

        <section className={styles.formSection}>
          <h3>Compensation Settings</h3>
          {CompensationSettings.map(renderField)}
          <h3>Timing Settings</h3>
          {TimingSettings.map(renderField)}
        </section>

        <section className={styles.formSection}>
          <h3>Control Sensitivity Settings</h3>
          {ControlSensitivitySettings.map(renderField)}
          <h3>Commnunication Settings</h3>
          {CommunicationSettings.map(renderField)}
          <h3>Display Settings</h3>
          {DisplaySettings.map(renderField)}
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

export default Level1Component;
