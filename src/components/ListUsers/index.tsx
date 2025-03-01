"use client";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import TanStackTableComponent from "../Core/TanStackTableComponent";
import { ListUserColumns } from "./ListUsersColumns";
import {
  deleteUserAPI,
  getAllListUsersAPI,
  updateUserStatusAPI,
} from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import { ListUsersApiProps } from "@/interfaces/listUserAPITypes";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { toast, Toaster } from "sonner";
import DeleteDialog from "../Core/DeleteDialog";
import { MenuItem, Tooltip } from "@mui/material";
import { addSerial } from "@/lib/helpers/addSerialNum";

const ListUsers = () => {
  const params = useParams();
  const useParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState<any>();
  const [usersData, setUsersData] = useState<any[]>([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [status, setStatus] = useState("");
  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
  );

  const getAllListUsers = async ({
    page = searchParams?.page,
    limit = searchParams?.limit,
    search_string = searchParams?.search_string,
    status = searchParams?.status,
  }: Partial<ListUsersApiProps>) => {
    setLoading(true);
    try {
      let queryParams: any = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
        search_string: search_string ? search_string : "",
        status: status ? status : "",
      };
      let queryString = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await getAllListUsersAPI(queryParams);
      let { data, ...rest } = response;
      if (!data.length && rest?.total_pages < rest?.page && rest?.page != 1) {
        await getAllListUsers({ page: rest?.total_pages });
      } else {
        data = addSerial(data, +rest.page, +rest.limit);
        setUsersData(data);
        setPaginationDetails(rest);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      const response = await deleteUserAPI(userId);
      if (response.success) {
        closeDialog();
        toast.success(response.message);
        getAllListUsers({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (id: any, statusValue: string) => {
    setLoading(true);
    try {
      const payload = {
        status: statusValue,
      };
      let response: any = await updateUserStatusAPI(payload, id);

      if (response.success) {
        toast.success(response.message);
        getAllListUsers({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllListUsers({
      page: searchParams?.page ? searchParams?.page : 1,
      limit: searchParams?.limit ? searchParams?.limit : 20,
      search_string: searchParams?.search_string,
      status: searchParams?.status,
    });
  }, [
    searchParams?.search_string,
    searchParams?.status,
    searchParams?.page,
    searchParams?.limit,
  ]);

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(useParam.entries())))
    );
  }, [useParam]);

  const openDialog = (id: any) => {
    setDialogOpen(true);
    setUserId(id);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const column = [
    {
      accessorFn: (row: any) => row.status,
      id: "status",
      header: () => <span>status</span>,
      cell: (info: any) => {
        const value = info.getValue();
        const capitalizedValue = value
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : "--";
        return (
          <Tooltip
            arrow
            title={
              <span>
                <MenuItem
                  className="menuItem"
                  disabled={info.getValue() == "ACTIVE"}
                  onClick={() => {
                    updateUserStatus(info?.row?.original?.id, "ACTIVE");
                  }}
                >
                  Active
                </MenuItem>
                <MenuItem
                  className="menuItem"
                  disabled={info.getValue() == "INACTIVE"}
                  onClick={() => {
                    updateUserStatus(info?.row?.original?.id, "INACTIVE");
                  }}
                >
                  Inactive
                </MenuItem>
              </span>
            }
          >
            <span
              className={
                value === "INACTIVE" ? "status inactive" : "status active"
              }
              style={{ cursor: "pointer" }}
            >
              {capitalizedValue}
            </span>
          </Tooltip>
        );
      },
      footer: (props: any) => props.column.id,
      width: "100px",
    },
    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              title="View User"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/users/${info?.row?.original?.id}`);
              }}
            >
              <Image alt="" src="/user-view.svg" width={15} height={15} />
            </div>
            <div
              title="Edit User"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/users/${info?.row?.original?.id}/edit`);
              }}
            >
              <Image alt="" src="/edit-user.svg" width={13} height={13} />
            </div>
            <div
              title="Delete User"
              style={{ cursor: "pointer" }}
              onClick={() => {
                openDialog(info?.row?.original?.id);
              }}
            >
              <Image alt="" src="/delete-user.svg" width={15} height={15} />
            </div>
          </div>
        );
      },
      footer: (props: any) => props.column.id,
      width: "100px",
    },
  ];

  return (
    <div id="usersPage">
      <TanStackTableComponent
        data={usersData}
        columns={[...ListUserColumns, ...column]}
        loading={loading}
        paginationDetails={paginationDetails}
        getData={getAllListUsers}
      />
      <DeleteDialog
        deleteUser={deleteUser}
        headerName="Delete User"
        lable="Are you sure you want to delete the user?"
        open={dialogOpen}
        closeDialog={closeDialog}
      />
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default ListUsers;
