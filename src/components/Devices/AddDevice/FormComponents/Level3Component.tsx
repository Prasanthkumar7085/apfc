import { useState } from "react";
import { Switch } from "@mui/material";
import { factoryEnergySettings } from "@/lib/constants/addDevicesConstants";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";

const Level3Component = ({
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
          <div className="radioFeildGrp sameLine" key={setting.name}>
            <label className="label">
              {setting.label} :
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
            <input
              type="number"
              className="input"
              name={setting.name}
              min={setting.min}
              max={setting.max}
              step={setting.step || 1}
              value={levelBasedData[setting.name] || ""}
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
    <div>
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Factory and Energy Settings</h3>
          {factoryEnergySettings.map(renderField)}
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
export default Level3Component;
