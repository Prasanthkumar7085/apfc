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
    <div id="addSettingstepper">
      {steppersConstansts?.map((step, index) => {
        return (
          <div
            className={
              params?.get("state") == step?.label
                ? "eachStep active"
                : "eachStep"
            }
            key={index}
            onClick={() => {
              setSelectedStep(step?.title);
              router.push(`${pathName}?state=${step?.label}`);
            }}
          >
            {step?.title}
          </div>
        );
      })}
    </div>
  );
};

export default ArrowSteppers;
