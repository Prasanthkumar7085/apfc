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

const parameters = [
  { value: "total_kw", title: "Total kW", color: "#8884d8" },
  { value: "average_pf", title: "Average PF", color: "#82ca9d" },
  { value: "kwh", title: "kWh", color: "#ffc658" },
  { value: "kvah", title: "kVAh", color: "#ff7300" },
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

  const handleZoomChange = async (newRange: any) => {
    console.log(newRange, "329429343");
    const startIndex = newRange.startIndex;
    const endIndex = newRange.endIndex;
    const chartWidth = 1300;
    const intervalValue = calculateXAxisInterval(
      chartWidth,
      endIndex - startIndex + 1
    );
    setInteval(intervalValue);

    if (newRange && newRange.start && newRange.end) {
      const start = new Date(newRange.start).getTime();
      const end = new Date(newRange.end).getTime();

      if (!isNaN(start) && !isNaN(end) && start < end) {
        console.log(newRange, "3294293232332343");

        await fetchData(
          new Date(start).toISOString(),
          new Date(end).toISOString()
        );
      }
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

  useEffect(() => {
    fetchData(today.toISOString(), today.toISOString());
  }, [selectedParams]);

  const calculateXAxisInterval = (
    chartWidth: number,
    zoomedDataLength?: any
  ) => {
    const maxTicks = Math.floor(chartWidth / 100);
    const effectiveLength = Math.min(zoomedDataLength, maxTicks);

    if (effectiveLength <= 10) return 2;
    if (effectiveLength <= 4) return 2;
    if (effectiveLength <= 3) return 1;
    return 5;
  };

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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <ComposedChart width={1300} height={450} data={zoomedData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
              interval={interval}
              angle={-5}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedParams.map((param) => {
              const parameter = parameters.find((p) => p.value === param);
              return (
                <Line
                  key={param}
                  type="monotone"
                  dataKey={param}
                  stroke={parameter?.color}
                  name={parameter?.title}
                  fill={parameter?.color}
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
      )}
    </Box>
  );
};

export default ActivityGraph;
