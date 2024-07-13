import PasswordFormFields from "@/components/Core/FormFields/PasswordFormFields";
import { fanSettings } from "@/lib/constants/addDevicesConstants";
import { Typography } from "@mui/material";
import Image from "next/image";

const Level4Settings = ({ levelBasedData }: any) => {
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
          <h3 className="eachBlockHeading">Fan Settings</h3>

          <Image alt="" src="/car-radiator.svg" height={70} width={70} />
          <div>{fanSettings.map(renderField)}</div>
        </section>
      </form>
    </div>
  );
};
export default Level4Settings;
