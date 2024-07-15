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
            <Typography variant="caption">
              {levelBasedData[setting?.name] || "--"}
            </Typography>
          </div>
        );
    }
  };

  return (
    <div id="levelOne">
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Voltage Settings</h3>
          <div className="grp">
            {voltageSettings.map(renderField)}
          </div>

          <h3 className="eachBlockHeading">Harmonic Distortion Settings</h3>
          <div className="grp">
            {harmonicDistortionSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className="grp">
            {compensationSettings.map(renderField)}
          </div>

          <h3 className="eachBlockHeading">Error Handling</h3>
          <div className="grp">
          {errorHandlingSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Fan and Hysteresis Settings</h3>
          <div className="grp">

          {fanAndHysteresisSettings.map(renderField)}
          </div>
        </section>
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Factory and Energy Settings</h3>
          <div className="grp">

          {factoryAndEnergySettings.map(renderField)}
          </div>
        </section>
      </form>
    </div>
  );
};
export default Level2Settings;
