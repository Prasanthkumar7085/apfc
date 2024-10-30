import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { getDeviceDataWithMinuteParamatersAPI } from "@/services/devicesAPIs";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import CustomDateRangePicker from "../Core/DateRangePicker";
import Image from "next/image";
import LoadingComponent from "../Core/LoadingComponent";
import { parameters } from "@/lib/constants/addDevicesConstants";

interface DataPoint {
  timestamp: string;
  total_kw?: number;
  average_pf?: number;
  kwh?: number;
  kvah?: number;
}

interface CombinedDataPoint {
  timestamp: string;
  [key: string]: number | string;
}

const ActivityGraph = ({
  graphFunctionCall,
  setGraphFunctionCall,
  setSyncTime,
}: any) => {
  const params = useParams();
  const today = new Date();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CombinedDataPoint[]>([]);
  const [zoomedData, setZoomedData] = useState<CombinedDataPoint[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedParams, setSelectedParams] = useState<string[]>([
    "total_kw",
    "average_pf",
  ]);
  const [brushStart, setBrushStart] = useState<number>(0);
  const [brushEnd, setBrushEnd] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const [interval, setInterval] = useState<any>();

  const fetchData = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const promises = selectedParams.map((param) =>
        getDeviceDataWithMinuteParamatersAPI(params?.id, {
          parameter: param,
          from_date: fromDate,
          to_date: toDate,
        })
      );
      setGraphFunctionCall(false);
      const results = await Promise.allSettled(promises);
      const combinedData: CombinedDataPoint[] = [];
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const seriesData: DataPoint[] = result.value.data;
          seriesData.forEach((item: any) => {
            const timestamp = new Date(item.timestamp).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
            const existingPoint = combinedData.find(
              (d) => d.timestamp === timestamp
            );
            if (existingPoint) {
              existingPoint[selectedParams[index]] =
                item[selectedParams[index]];
            } else {
              const newPoint: CombinedDataPoint = { timestamp };
              newPoint[selectedParams[index]] = item[selectedParams[index]];
              combinedData.push(newPoint);
            }
          });
          if (result?.value?.data?.slice(-1)?.[0]?.timestamp) {
            setSyncTime(
              new Date(
                result?.value?.data.slice(-1)?.[0]?.timestamp
              )?.toLocaleString()
            );
          }
        } else {
          console.error(
            `Error fetching data for ${selectedParams[index]}: ${result.reason}`
          );
        }
      });
      setData(combinedData);
      setZoomedData(combinedData);
      setBrushStart(0);
      setBrushEnd(combinedData.length - 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleWheelZoom = (event: WheelEvent) => {
    event.preventDefault();

    const zoomFactor = 0.1;
    const currentStartIndex = brushStart;
    const currentEndIndex = brushEnd;

    const rangeLength = currentEndIndex - currentStartIndex;
    const centerIndex = Math.round((currentStartIndex + currentEndIndex) / 2);

    const delta = event.deltaY < 0 ? -1 : 1;
    const newRangeLength = Math.max(
      1,
      Math.floor(rangeLength * (1 + zoomFactor * delta))
    );

    let newStartIndex = Math.max(
      0,
      centerIndex - Math.floor(newRangeLength / 2)
    );
    let newEndIndex = Math.min(
      zoomedData.length - 1,
      newStartIndex + newRangeLength
    );
    if (newStartIndex !== brushStart || newEndIndex !== brushEnd) {
      setBrushStart(newStartIndex);
      setBrushEnd(newEndIndex);
    }
  };

  const handleZoomChange = async (newRange: any) => {
    const startIndex = Math.max(0, newRange.startIndex);
    const endIndex = Math.min(zoomedData.length - 1, newRange.endIndex);
    setBrushStart(startIndex);
    setBrushEnd(endIndex);
    if (newRange && newRange.start && newRange.end) {
      const start = new Date(newRange.start).getTime();
      const end = new Date(newRange.end).getTime();

      if (!isNaN(start) && !isNaN(end) && start < end) {
        if (brushStart !== startIndex || brushEnd !== endIndex) {
          await fetchData(
            new Date(start).toISOString(),
            new Date(end).toISOString()
          );

          setBrushStart(startIndex);
          setBrushEnd(endIndex);

          const zoomedDataSlice = zoomedData.slice(startIndex, endIndex + 1);
          const firstTimestamp = new Date(
            zoomedDataSlice[0].timestamp
          ).getTime();
          const lastTimestamp = new Date(
            zoomedDataSlice[zoomedDataSlice.length - 1].timestamp
          ).getTime();
          const timeDifference = lastTimestamp - firstTimestamp;

          const intervalValue = calculateXAxisInterval(
            timeDifference,
            zoomedDataSlice.length
          );
          setInterval(intervalValue);
        }
      }
    }
  };

  const calculateXAxisInterval = (
    timeDifference: number,
    zoomedDataLength: number
  ) => {
    if (zoomedDataLength <= 0) return 1;

    const averageInterval = timeDifference / zoomedDataLength;
    const averageIntervalInMinutes = averageInterval / (1000 * 60);

    if (averageIntervalInMinutes <= 1) return 1;
    if (averageIntervalInMinutes <= 5) return 2;
    if (averageIntervalInMinutes <= 10) return 3;
    if (averageIntervalInMinutes <= 30) return 5;
    return 10;
  };

  useEffect(() => {
    const container = chartRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelZoom);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelZoom);
      }
    };
  }, [zoomedData, brushStart, brushEnd]);

  useEffect(() => {
    fetchData(today.toISOString(), today.toISOString());
  }, [selectedParams, graphFunctionCall]);

  return (
    <Box className="activityBlock" ref={chartRef}>
      <Box className="pageHeader" mb={2}>
        <h4 className="pageHeading">
          <Image
            src="/devices/new/activity-grapg-icon.svg"
            alt=""
            width={15}
            height={15}
          />
          <span>Activity Graph</span>
        </h4>
        <Box className="filterBlock">
          <CustomDateRangePicker
            value={[today, today]}
            onChange={(newValue) => {
              fetchData(
                dayjs(newValue[0]).format("YYYY-MM-DD"),
                dayjs(newValue[1]).format("YYYY-MM-DD")
              );
            }}
          />
          <Autocomplete
            className="defaultAutoComplete"
            multiple
            options={parameters}
            getOptionLabel={(option) => option.title}
            value={parameters.filter((param) =>
              selectedParams.includes(param.value)
            )}
            onChange={(event, newValue) => {
              setSelectedParams(newValue.map((param) => param.value));
              fetchData(dayjs(today).toISOString(), dayjs(today).toISOString());
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Parameters"
              />
            )}
            limitTags={2}
          />
        </Box>
      </Box>
      <div style={{ width: "100%" }}>
        {zoomedData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={zoomedData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  return date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                }}
                interval={interval}
              />
              <YAxis yAxisId="primary" />
              <YAxis
                yAxisId="secondary"
                orientation="right"
                label={{
                  value: "Average PF",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Legend />
              {selectedParams.map((param) => {
                const parameter = parameters.find((p) => p.value === param);
                if (param === "average_pf") {
                  return (
                    <Line
                      key={param}
                      type="monotone"
                      dataKey={param}
                      stroke={parameter?.color}
                      name={parameter?.title}
                      fill={parameter?.color}
                      yAxisId="secondary"
                    />
                  );
                }
                return (
                  <Line
                    key={param}
                    type="monotone"
                    dataKey={param}
                    stroke={parameter?.color}
                    name={parameter?.title}
                    fill={parameter?.color}
                    yAxisId="primary"
                  />
                );
              })}
              <Brush
                dataKey="timestamp"
                height={30}
                gap={10}
                stroke="#8884d8"
                startIndex={brushStart}
                endIndex={brushEnd}
                onChange={handleZoomChange}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              width: "100%",
              display: loading ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/no-device-image.svg" alt="" width={450} height={450} />
          </div>
        )}
      </div>
      <LoadingComponent loading={loading} />
    </Box>
  );
};

export default ActivityGraph;
