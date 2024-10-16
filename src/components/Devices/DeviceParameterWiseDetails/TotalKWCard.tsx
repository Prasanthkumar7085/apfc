import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import Image from "next/image";

const TotalKWCard = () => {
  return (
    <Paper
     className="eachDetailCard"
    >
      <div className="card">
        <div className="left-column">
          <Image src="/devices/new/value/total-kw.svg" alt="" width={25} height={25} />
            <div className="total-text">Total kW</div>
            <div className="total-value">9999</div>
        </div>
        <div className="right-column">
          <div className="row">
            <div className="label">kW1</div>
            <div className="value">9999</div>
          </div>
          <div className="row">
            <div className="label">kW2</div>
            <div className="value">9999</div>
          </div>
          <div className="row">
            <div className="label">kW3</div>
            <div className="value">9999</div>
          </div>
        </div>
      </div>

    </Paper>
  );
};

export default TotalKWCard;
