"use client";
import { useEffect, useState } from "react";
import DeviceSection from "./DeviceSection";
import { getAllDevicesAPI } from "@/services/devicesAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ListDevicesApiProps } from "@/interfaces/listDeviesAPITypes";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";

const DevicesList = () => {
  const params = useParams();
  const useParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [devicesData, setDevicesData] = useState<any[]>([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
  );

  const getAllListDevices = async ({
    page = searchParams?.page,
    limit = searchParams?.limit,
    search_string = searchParams?.search_string,
    status = searchParams?.status
  }: Partial<ListDevicesApiProps>) => {
    setLoading(true);
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 10,
        search_string: search_string ? search_string : "",
        status: status ? status : ""
      };
      let queryString = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getAllDevicesAPI(queryParams);
      const { data, ...rest } = response;
      if (!data.length && rest?.total_pages < rest?.page) {
        await getAllListDevices({ page: rest?.total_pages })
      } else {
        setDevicesData(data);
        setPaginationDetails(rest);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllListDevices({
      page: searchParams?.page ? searchParams?.page : 1,
      limit: searchParams?.limit ? searchParams?.limit : 10,
      search_string: searchParams?.search_string,
      status: searchParams?.status
    });
  }, [searchParams?.search_string, searchParams?.status, searchParams?.page, searchParams?.limit]);

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
    );
  }, [params]);

  return (
    <div>
      <DeviceSection
        devicesData={devicesData}
        paginationDetails={paginationDetails}
        getData={getAllListDevices}
        loading={loading}
        setLoading={setLoading}
      />
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default DevicesList;
