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

const Level1Settings = ({ levelBasedData, setLevelBasedData }: any) => {
  const renderField = (setting: any) => {
    switch (setting.type) {
      case "password":
        return (
          <div className="fieldGroup" key={setting.name}>
            {setting.name == "password" ? (
              <>
                <label className="label">{setting.label}</label>
                <div className="passwordSetting">
                  <PasswordFormFields
                    name={setting.name}
                    value={levelBasedData}
                  />

                  <Typography className="resetPasswordTxt">Reset password</Typography>
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
            <Typography className="value">
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
    <div id="levelOne">
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Authetication Settings</h3>
          {AuthenticationSettings.map(renderField)}
          <h3 className="eachBlockHeading">Device Configuration</h3>
          <div className="grp">
          {DeviceConfiguration.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">
            Current Transformer (CT) Settings
          </h3>
          <div className="grp">
          {CurrentTransformerSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">
            Potential Transformer (PT) Settings
          </h3>
          <div className="grp">
          {PotentialTransformerSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Compensation Settings</h3>
          <div className="grp">
          {CompensationSettings.map(renderField)}
          </div>
        </section>
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Timing </h3>
          <div className="grp timingSettings">

          {TimingSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Control Sensitivity Settings</h3>
          <div className="grp">
          {ControlSensitivitySettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Commnunication Settings</h3>
          <div className="grp">
          {CommunicationSettings.map(renderField)}
          </div>
          <h3 className="eachBlockHeading">Display Settings</h3>
          {DisplaySettings.map(renderField)}
        </section>
      </form>
    </div>
  );
};
export default Level1Settings;
