import type { NextPage } from "next";
import styles from "./arrow-stepper.module.css";
import { steppersConstansts } from "@/lib/constants/addDevicesConstants";

export type ArrowStepperType = {
  className?: string;
};

const ArrowSteppers = ({ selectedStep, setSelectedStep }: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
      {steppersConstansts?.map((step, index) => {
        return (
          <div
            className={styles.arrowstepper}
            key={index}
            onClick={() => setSelectedStep(step?.title)}
          >
            {selectedStep == step?.title ? (
              <img className={styles.arroIcon} alt="" src="/arro.svg" />
            ) : (
              ""
            )}
            <div className={styles.titletext}>
              <h3 className={styles.title}>{step?.title}</h3>
              <p className={styles.paragraph}>{step?.sub_title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArrowSteppers;
