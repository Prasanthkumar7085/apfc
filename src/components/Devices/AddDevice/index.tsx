"use client";
import { useState } from "react";
import ArrowSteppers from "./AddDeviceSteppers";
import Level2Component from "./FormComponents/Level2Component";
import Level1Component from "./FormComponents/Level1Component";
import Level3Component from "./FormComponents/Level3Component";
import Level4Component from "./FormComponents/Level4Component";

const AddDevice = () => {
  const [selectedStep, setSelectedStep] = useState<any>("Level1");
  return (
    <div>
      <ArrowSteppers
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      {selectedStep == "Level1" ? <Level1Component /> : ""}
      {selectedStep == "Level2" ? <Level2Component /> : ""}
      {selectedStep == "Level3" ? <Level3Component /> : ""}
      {selectedStep == "Level4" ? <Level4Component /> : ""}
      {/* <FormComponent /> */}
      {/* <Level2Component /> */}
    </div>
  );
};
export default AddDevice;
