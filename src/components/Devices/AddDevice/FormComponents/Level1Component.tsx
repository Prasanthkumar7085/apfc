import GroupRadioButtons from "@/components/Core/FormFields/GroupRadioButtons";
import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
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
import React, { ChangeEvent } from "react";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
type CombinedEvent = ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>;

const Level1Component = ({
  levelBasedData,
  setLevelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const handleChange = (
    e: CombinedEvent  ) => {
    const { name, value } = e.target;
    setLevelBasedData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderField = (setting: any) => {
    switch (setting.type) {
      case "text":
      case "number":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">
              {setting.label}
            </label>
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
            <label className="label">
              {setting.label}
            </label>
              <PasswordFormFields
                name={setting.name}
                handleChange={handleChange}
                value={levelBasedData}
              />
          </div>
        );
      case "select":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">
              {setting.label}
            </label>
              <Select
                className="settingSelectFeild"
                onChange={handleChange}
                name={setting.name}
                value={levelBasedData?.[setting.name]}
              >
                {setting.options?.map((option: any) => (
                  <MenuItem className="menuItem" key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
          </div>
        );
      case "radio":
        return (
          <div className="fieldGroup" key={setting.name}>
            <GroupRadioButtons
              setting={setting}
              handleChange={handleChange}
              formData={levelBasedData}
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
          <h3 className="eachBlockHeading">Authetication Settings</h3>
          {AuthenticationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Device Configuration</h3>
          {DeviceConfiguration.map(renderField)}
          <h3 className="eachBlockHeading">Current Transformer (CT) Settings</h3>
          {CurrentTransformerSettings.map(renderField)}
          <h3 className="eachBlockHeading">Potential Transformer (PT) Settings</h3>
          {PotentialTransformerSettings.map(renderField)}
        </section>

        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          {CompensationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Timing Settings</h3>
          {TimingSettings.map(renderField)}
        </section>

        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Control Sensitivity Settings</h3>
          {ControlSensitivitySettings.map(renderField)}
          <h3 className="eachBlockHeading">Commnunication Settings</h3>
          {CommunicationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Display Settings</h3>
          {DisplaySettings.map(renderField)}
        </section>
      </form>

      <SaveAndConfirmationButtons
        levelBasedData={levelBasedData}
        getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
      />
    </div>
  );
};

export default Level1Component;
