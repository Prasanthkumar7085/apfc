import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import Image from "next/image";

const TotalKWCard = ({ cardimage, mainDetials, subDetails }: any) => {
  return (
    <Paper className="eachDetailCard">
      <div className="card">
        <div className="left-column">
          <Image src={cardimage} alt="" width={25} height={25} />
          <div className="total-text">{mainDetials[0]}</div>
          <div className="total-value">{mainDetials[1]}</div>
        </div>

        <div className="right-column">
          {Array.isArray(subDetails) ? (
            <div>
              <Image
                src={"/devices/new/value/freequency.svg"}
                alt=""
                width={25}
                height={25}
              />
              <div className="total-text">{mainDetials[0]}</div>
              <div className="total-value">{mainDetials[1]}</div>
            </div>
          ) : (
            Object?.keys(subDetails).map((item: any, index: number) => (
              <div className="row" key={index}>
                <div className="label">{item}</div>
                <div className="value">{subDetails?.[item]}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </Paper>
  );
};

export default TotalKWCard;
