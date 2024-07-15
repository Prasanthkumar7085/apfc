import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import { factoryEnergySettings } from "@/lib/constants/addDevicesConstants";
import { Typography } from "@mui/material";

const Level3Settings = ({ levelBasedData }: any) => {
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
                {levelBasedData[setting?.name] || "--"}
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
          <h3 className="eachBlockHeading">Factory and Energy Settings</h3>
          <div className="grp">{factoryEnergySettings.map(renderField)}</div>
        </section>
      </form>
    </div>
  );
};
export default Level3Settings;
