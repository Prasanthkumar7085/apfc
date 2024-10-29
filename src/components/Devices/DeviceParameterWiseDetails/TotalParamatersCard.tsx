import { Paper } from "@mui/material";
import Image from "next/image";

const TotalParamatersCard = ({ deviceDetails }: any) => {
  return (
    <Paper className="eachDetailCardSingle">
      <div className="card">
        <div className="right-column">
          <div className="row">
            <div className="label">
              <Image src={"/power-icon.svg"} alt="" width={15} height={15} />
              {"kwh"}
            </div>
            <div className="value">
              {deviceDetails?.kwh?.toString() || "--"}
            </div>
          </div>
          <div className="row">
            <div className="label">
              <Image src={"/power-icon.svg"} alt="" width={15} height={15} />
              {"kvah"}
            </div>
            <div className="value">
              {deviceDetails?.kvah?.toString() || "--"}
            </div>
          </div>
          <div className="row">
            <div className="label">
              <Image src={"/power-icon.svg"} alt="" width={15} height={15} />
              {"kvarh"}
            </div>
            <div className="value">
              {deviceDetails?.kvarh?.toString() || "--"}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TotalParamatersCard;
