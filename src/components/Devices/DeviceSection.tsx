import {
  deleteAssignUserAPI,
  updateDeviceStatusAPI,
} from "@/services/devicesAPIs";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteDialog from "../Core/DeleteDialog";
import TablePaginationComponent from "../Core/TablePaginationComponent";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import AssignUserDialog from "./AssignUserDialog";
import { DeviceColumns } from "./DevicesColumns";

const DeviceSection = ({
  devicesData,
  paginationDetails,
  getData,
  loading,
  setLoading,
}: any) => {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [devicesId, setDeviceId] = useState<any>();
  const params = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
  );

  const updateDeviceStatus = async (id: any, statusValue: string) => {
    setLoading(true);
    try {
      const payload = {
        status: statusValue,
      };
      let response: any = await updateDeviceStatusAPI(payload, id);

      if (response.success) {
        toast.success(response.message);
        getData({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignUser = async () => {
    setLoading(true);
    try {
      const response = await deleteAssignUserAPI(devicesId);
      if (response.success) {
        closeDialog();
        toast.success(response.message);
        getData({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
    );
  }, [params]);

  const capturePageNum = (value: number) => {
    getData({
      ...searchParams,
      limit: searchParams.limit as string,
      page: value,
    });
  };

  const captureRowPerItems = (value: number) => {
    getData({
      ...searchParams,
      limit: value,
      page: 1,
    });
  };

  const openDialog = (id: any) => {
    setOpen(true);
    setDeviceId(id);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <TanStackTableComponent
        data={devicesData}
        columns={DeviceColumns({
          updateDeviceStatus,
          router,
          openDialog,
          setDialogOpen,
          setDeviceId,
        })}
        loading={loading}
        paginationDetails={paginationDetails}
        getData={getData}
      />
      <AssignUserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        getData={getData}
        devicesId={devicesId}
      />

      <DeleteDialog
        deleteUser={deleteAssignUser}
        headerName="Delete Assign User"
        lable="Are you sure you want to delete the assigned user?"
        open={open}
        closeDialog={closeDialog}
      />
    </div>
  );
};

export default DeviceSection;
