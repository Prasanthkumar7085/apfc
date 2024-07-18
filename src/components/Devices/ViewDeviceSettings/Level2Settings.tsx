import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import {
  compensationSettings,
  errorHandlingSettings,
  factoryAndEnergySettings,
  fanAndHysteresisSettings,
  harmonicDistortionSettings,
  voltageSettings,
} from "@/lib/constants/addDevicesConstants";
import { Typography } from "@mui/material";

const Level2Settings = ({ levelBasedData }: any) => {
  const renderField = (setting: any) => {
    switch (setting.type) {
      case "password":
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
            <PasswordFormFields name={setting.name} value={levelBasedData} />
          </div>
        );
      default:
        return (
          <div className="fieldGroup" key={setting.name}>
            <label className="label">{setting.label}</label>
            {levelBasedData[setting?.name] == "ON" ||
              levelBasedData[setting?.name] == "OFF" ? (
              <Typography
                className={
                  levelBasedData[setting?.name] == "ON"
                    ? "value radioOn"
                    : "value radioOff"
                }
              >
                {levelBasedData[setting?.name] || "--"}
              </Typography>
            ) : (
              <Typography className="value ">
                {levelBasedData[setting?.name] || "--"}{levelBasedData[setting?.name] ? setting.unit : ""}
              </Typography>
            )}
          </div>
        );
    }
  };

  return (
    <div id="levelOne">
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className=" grp eachFeildGrp">{voltageSettings.map(renderField)}</div>

          <h3 className="eachBlockHeading">Harmonic Distortion Settings</h3>
          <div className=" grp eachFeildGrp">
            {harmonicDistortionSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className=" grp eachFeildGrp">{compensationSettings.map(renderField)}</div>

          <h3 className="eachBlockHeading">Error Handling</h3>
          <div className=" grp eachFeildGrp">{errorHandlingSettings.map(renderField)}</div>
          <h3 className="eachBlockHeading">Fan and Hysteresis Settings</h3>
          <div className=" grp eachFeildGrp">{fanAndHysteresisSettings.map(renderField)}</div>
        </section>
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Factory and Energy Settings</h3>
          <div className=" grp eachFeildGrp">{factoryAndEnergySettings.map(renderField)}</div>
        </section>
      </form>
    </div>
  );
};
export default Level2Settings;
