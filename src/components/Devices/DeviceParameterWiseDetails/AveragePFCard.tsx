import React from "react";
import { Paper, Typography, Divider } from "@mui/material";

const AveragePFCard = () => {
  return (
    <Paper
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "8px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "300px",
      }}
    >
      {/* Left Section with Icon and Total kW */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7F8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            marginRight: "16px",
          }}
        >
          <img
            src="https://via.placeholder.com/24" // Replace with actual icon
            alt="icon"
            style={{ width: "24px", height: "24px" }}
          />
        </div>

        {/* Total kW */}
        <div>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#5F6368" }}
          >
            Total kW
          </Typography>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            9999
          </Typography>
        </div>
      </div>

      {/* Divider */}
      <Divider
        orientation="vertical"
        flexItem
        style={{ marginLeft: "16px", marginRight: "16px" }}
      />

      {/* Right Section with kW1, kW2, kW3 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#5F6368" }}
          >
            kW1
          </Typography>
          <Typography
            variant="body2"
            style={{ marginLeft: "16px", fontWeight: "bold" }}
          >
            9999
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#5F6368" }}
          >
            kW2
          </Typography>
          <Typography
            variant="body2"
            style={{ marginLeft: "16px", fontWeight: "bold" }}
          >
            9999
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#5F6368" }}
          >
            kW3
          </Typography>
          <Typography
            variant="body2"
            style={{ marginLeft: "16px", fontWeight: "bold" }}
          >
            9999
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default AveragePFCard;
