import RangeWithUnits from "@/components/Core/FormFields/RangeWithUnits";
import { fanSettings } from "@/lib/constants/addDevicesConstants";
import SaveAndConfirmationButtons from "../SaveAndConfirmation";
import Image from "next/image";

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
            <label className="label">
              {setting.label}
              <select

                onChange={handleChange}
                name={setting.name}
                value={levelBasedData?.[setting.name]}
              >
                {setting.options?.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
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
        <section className="eachFormContainer">
          <div>
            <Image className="arroIcon" alt="" src="/car-radiator.svg" height={50} width={50} />
          </div>
          <div className="fieldGroup">
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
