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
          <div className="fieldGroup levelFanFeild" key={setting.name}>
            {/* <label className="label">{setting.label}</label> */}
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
                <>
                {
                    setting?.name == "temperature" ?
                      <div className="tempBlock">
                        <Image src="/devices/temparature.svg" alt="" height={30} width={30}/>
                        <Typography className="value">
                          {levelBasedData[setting?.name] + " C" || "--"}
                        </Typography>
                      </div>
                    : ""
                }
            </>
            )}
          </div>
        );
    }
  };

  return (
    <div id="levelOne">
      <form className="form">
        <section className="eachFormContainer">
          <h3 className="eachBlockHeading">Fan Settings</h3>
          <div className="fanSettings">
            <Image alt="" src="/car-radiator.svg" height={35} width={35} />
            <div className="levelFanGrp">{fanSettings.map(renderField)}</div>
          </div>
        </section>
      </form>
    </div>
  );
};
export default Level4Settings;
