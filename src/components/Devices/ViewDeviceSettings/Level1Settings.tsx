import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
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
import { resetDevicePasswordAPI } from "@/services/devicesAPIs";
import { Typography } from "@mui/material";
import { assert } from "console";

const Level1Settings = ({ levelBasedData, setLevelBasedData }: any) => {
  const renderField = (setting: any) => {
    switch (setting.type) {
      case "password":
        return (
          <div className="fieldGroup" key={setting.name}>
            {setting.name == "password" ? (
              <>
                <label className="label">{setting.label}</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <PasswordFormFields
                    name={setting.name}
                    value={levelBasedData}
                  />

                  <Typography variant="caption">Reset password</Typography>
                </div>
              </>
            ) : (
              ""
            )}
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

  const resetPassword = async () => {
    // let payload = {
    //   password,
    // };
    // try {
    //   const response = await resetDevicePasswordAPI();
    // } catch (err) {
    //   console.error(err);
    // } finally {
    // }
  };
  return (
    <div>
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Authetication Settings</h3>
          {AuthenticationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Device Configuration</h3>
          {DeviceConfiguration.map(renderField)}
          <h3 className="eachBlockHeading">
            Current Transformer (CT) Settings
          </h3>
          {CurrentTransformerSettings.map(renderField)}
          <h3 className="eachBlockHeading">
            Potential Transformer (PT) Settings
          </h3>
          {PotentialTransformerSettings.map(renderField)}
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          {CompensationSettings.map(renderField)}
        </section>
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Timing Settings</h3>
          {TimingSettings.map(renderField)}
          <h3 className="eachBlockHeading">Control Sensitivity Settings</h3>
          {ControlSensitivitySettings.map(renderField)}
          <h3 className="eachBlockHeading">Commnunication Settings</h3>
          {CommunicationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Display Settings</h3>
          {DisplaySettings.map(renderField)}
        </section>
      </form>
    </div>
  );
};
export default Level1Settings;
