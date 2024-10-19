import React, { use, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
  ComposedChart,
  Area,
} from "recharts";
import { getDeviceDataWithMinuteParamatersAPI } from "@/services/devicesAPIs";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import CustomDateRangePicker from "../Core/DateRangePicker";
import Image from "next/image";
import { color } from "highcharts";
import LoadingComponent from "../Core/LoadingComponent";

const parameters = [
  { value: "total_kw", title: "Total kW", color: "#8884d8" },
  { value: "average_pf", title: "Average PF", color: "#82ca9d" },
  { value: "kwh", title: "kWh", color: "#ffc658" },
  { value: "kvah", title: "kVAh", color: "#ff7300" },
  {
    value: "average_voltage_ll",
    title: "Average voltage LL",
    color: "#92298f",
  },
  { value: "average_current", title: "Average current", color: "#ff00ff" },
];

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

const ActivityGraph: React.FC = () => {
  const params = useParams();
  const today = new Date();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CombinedDataPoint[]>([]);
  const [zoomedData, setZoomedData] = useState<CombinedDataPoint[]>([]);
  const [interval, setInteval] = useState<any>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    today,
    today,
  ]);
  const [selectedParams, setSelectedParams] = useState<string[]>([
    "total_kw",
    "average_pf",
  ]);

  const fetchData = async (fromDate: string, toDate: string) => {
    try {
      const promises = selectedParams.map((param) =>
        getDeviceDataWithMinuteParamatersAPI(params?.id, {
          parameter: param,
          from_date: fromDate,
          to_date: toDate,
        })
      );

      const results = await Promise.allSettled(promises);
      const combinedData: CombinedDataPoint[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const seriesData: DataPoint[] = result.value.data;

          seriesData.forEach((item: any) => {
            const timestamp = new Date(item.timestamp).toLocaleString();
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
        } else {
          console.error(
            `Error fetching data for ${selectedParams[index]}: ${result.reason}`
          );
        }
      });

      setData(combinedData);
      setZoomedData(combinedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDateRangeChange = (value: [Date | null, Date | null]) => {
    setDateRange(value);
    if (value[0] && value[1]) {
      fetchData(dayjs(value[0]).toISOString(), dayjs(value[1]).toISOString());
    }
  };

  const handleParamsChange = (event: any, newValue: any[]) => {
    if (newValue) {
      setSelectedParams(newValue.map((param) => param.value));
      fetchData(
        dayjs(dateRange[0]).toISOString(),
        dayjs(dateRange[1]).toISOString()
      );
    }
  };

  const handleZoomChange = async (newRange: any) => {
    const startIndex = newRange.startIndex;
    const endIndex = newRange.endIndex;

    if (newRange && newRange.start && newRange.end) {
      const start = new Date(newRange.start).getTime();
      const end = new Date(newRange.end).getTime();

      if (!isNaN(start) && !isNaN(end) && start < end) {
        await fetchData(
          new Date(start).toISOString(),
          new Date(end).toISOString()
        );

        // Calculate interval based on zoomed data
        const zoomedDataSlice = zoomedData.slice(startIndex, endIndex + 1);
        const firstTimestamp = new Date(zoomedDataSlice[0].timestamp).getTime();
        const lastTimestamp = new Date(
          zoomedDataSlice[zoomedDataSlice.length - 1].timestamp
        ).getTime();
        const timeDifference = lastTimestamp - firstTimestamp;

        const intervalValue = calculateXAxisInterval(
          timeDifference,
          zoomedDataSlice.length
        );
        setInteval(intervalValue);
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
    fetchData(today.toISOString(), today.toISOString());
  }, [selectedParams]);

  return (
    <Box className="activityBlock">
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
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <Autocomplete
            className="defaultAutoComplete"
            multiple
            options={parameters}
            getOptionLabel={(option) => option.title}
            value={parameters.filter((param) =>
              selectedParams.includes(param.value)
            )}
            onChange={handleParamsChange}
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
      <div>
        {zoomedData?.length > 0 ? (
          <div style={{ width: "100%" }}>
            <ComposedChart width={1300} height={450} data={zoomedData}>
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
                angle={-5}
                textAnchor="end"
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
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
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
                onChange={handleZoomChange}
              />
            </ComposedChart>
          </div>
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
