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
import { Switch } from "@mui/material";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";

const Level2Component = ({
  levelBasedData,
  setLevelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const [errorMessages, setErrorMessages] = useState<any>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLevelBasedData({
      ...levelBasedData,
      [name]: type === "checkbox" ? (checked ? "ON" : "OFF") : value,
    });
  };

  const renderField = (setting: any) => {
    switch (setting.type) {
      case "switch":
        return (
          <div className="radioFeildGrp" key={setting.name}>
            <label className="label">
              {setting.label}
            </label>
            <Switch
              className="switchComponent"
              size="small"
              name={setting.name}
              checked={levelBasedData[setting.name] == "ON" ? true : false}
              onChange={handleChange}
              inputProps={{ "aria-label": setting.label }}
            />
          </div>
        );
      case "input":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
            <RangeWithUnits
              setting={setting}
              value={levelBasedData}
              handleChange={handleChange}
            />
          </div>
        );
      case "password":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
            <PasswordFormFields
              name={setting.name}
              value={levelBasedData}
              handleChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Voltage Settings</h3>
          <div className="eachFeildGrp">

          {voltageSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Harmonic Distortion Settings</h3>
          <div className="eachFeildGrp">

          {harmonicDistortionSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className="eachFeildGrp">

          {compensationSettings.map(renderField)}
          </div>
        </section>

        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Error Handling</h3>
          <div className="eachFeildGrp">

          {errorHandlingSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Fan and Hysteresis Settings</h3>
          <div className="eachFeildGrp">

          {fanAndHysteresisSettings.map(renderField)}
          </div>
        </section>
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Factory and Energy Settings</h3>
          <div className="eachFeildGrp">

          {factoryAndEnergySettings.map(renderField)}
          </div>
        </section>
      </form>
      <SaveAndConfirmationButtons
        levelBasedData={levelBasedData}
        getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
        setErrorMessages={setErrorMessages}
      />
    </div>
  );
};

export default Level2Component;
