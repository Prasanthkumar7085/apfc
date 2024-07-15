import { steppersConstansts } from "@/lib/constants/addDevicesConstants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./arrow-stepper.module.css";

export type ArrowStepperType = {
  className?: string;
};

const ArrowSteppers = ({ selectedStep, setSelectedStep }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
      {steppersConstansts?.map((step, index) => {
        return (
          <div
            className={styles.arrowstepper}
            key={index}
            onClick={() => {
              setSelectedStep(step?.title);
              router.push(`${pathName}?state=${step?.title}`);
            }}
          >
            {params?.get("state") == step?.title ? (
              <img className={styles.arroIcon} alt="" src="/arro.svg" />
            ) : (
              <img className={styles.arroIcon} alt="" src="/Bg.png" />
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
