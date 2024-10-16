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
  FrequencySettings,
  PotentialTransformerSettings,
  TimingSettings,
} from "@/lib/constants/addDevicesConstants";
import React, { ChangeEvent, useState } from "react";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";
type CombinedEvent = ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>;

const Level1Component = ({
  levelBasedData,
  setLevelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const [errorMessages, setErrorMessages] = useState<any>();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLevelBasedData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderField = (setting: any) => {
    switch (setting.type) {
      case "text":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
            <TextField
              className="settingsTextFeild"
              value={levelBasedData[setting.name]}
              onChange={handleChange}
              name={setting.name}
            />
          </div>
        );
      case "number":
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
              handleChange={handleChange}
              value={levelBasedData}
            />
            {setting.name == "confirm_password" ? (
              <ErrorMessagesComponent errorMessage={errorMessages?.password} />
            ) : (
              ""
            )}
          </div>
        );
      case "select":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
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
            <label className="label">{setting.label}</label>
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
          <h3 className="eachBlockHeading">Authentication Settings</h3>
          <div className="eachFeildGrp">
            {AuthenticationSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Device Configuration</h3>
          <div className="eachFeildGrp">
            {DeviceConfiguration.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">
            Current Transformer (CT) Settings
          </h3>
          <div className="eachFeildGrp">
            {CurrentTransformerSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">
            Potential Transformer (PT) Settings
          </h3>
          <div className="eachFeildGrp">
            {PotentialTransformerSettings.map(renderField)}
          </div>
        </section>

        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className="eachFeildGrp">
            {CompensationSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Timing Settings</h3>
          <div className="eachFeildGrp">{TimingSettings.map(renderField)}</div>
        </section>

        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Control Sensitivity Settings</h3>
          <div className="eachFeildGrp">
            {ControlSensitivitySettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Communication Settings</h3>
          <div className="eachFeildGrp">
            {CommunicationSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Display Settings</h3>
          <div className="eachFeildGrp">{DisplaySettings.map(renderField)}</div>
          <h3 className="eachBlockHeading">Frequency Settings</h3>

          <div className="eachFeildGrp">
            {FrequencySettings.map(renderField)}
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

export default Level1Component;
