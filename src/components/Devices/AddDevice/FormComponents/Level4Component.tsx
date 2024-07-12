import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import { fanSettings } from "@/lib/constants/addDevicesConstants";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";
import Image from "next/image";
import { MenuItem, Select } from "@mui/material";

const Level4Component = ({
  levelBasedData,
  setLevelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const renderField = (setting: any) => {
    switch (setting.type) {
      case "select":
        return (
          <div className="fieldGroup" key={setting.name}>
            {setting.label ?
              <label className="label">
                {setting.label}
              </label> : ""}
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
      case "input":
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
      default:
        return null;
    }
  };
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setLevelBasedData({
      ...levelBasedData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <div>
      <form className="form">
        <section className="eachFormCard">
          
            <Image  alt="" src="/car-radiator.svg" height={70} width={70} />
          <div>
            {fanSettings.map(renderField)}
          </div>
        </section>
      </form>
      <SaveAndConfirmationButtons
        levelBasedData={levelBasedData}
        getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
      />
    </div>
  );
};
export default Level4Component;
