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
            <Typography variant="caption">
              {levelBasedData[setting?.name] || "--"}
            </Typography>
          </div>
        );
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
    </div>
  );
};
export default Level3Settings;
