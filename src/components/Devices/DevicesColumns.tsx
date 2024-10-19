import { setSingleDevice } from "@/redux/Modules/userlogin";
import { Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

export const DeviceColumns = ({
  updateDeviceStatus,
  router,
  openDialog,
  setDialogOpen,
  setDeviceId,
}: any) => {
  const dispatch = useDispatch();
  return [
    {
      accessorFn: (row: any) => row.serial,
      id: "serial",
      header: () => <span>Sl.no</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "30px",
      minWidth: "40px",
      maxWidth: "50px",
    },

    {
      accessorFn: (row: any) => row.device_name,
      id: "device_name",
      header: () => <span>Device Name</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "150px",
      minWidth: "100px",
      maxWidth: "130px",
    },
    {
      accessorFn: (row: any) => row.device_serial_number,
      id: "device_serial_number",
      header: () => <span>Serial Number</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "150px",
    },
    {
      accessorFn: (row: any) => row.location,
      id: "location",
      header: () => <span>Location Name</span>,
      cell: (info: any) => {
        return (
          <span style={{ textTransform: "capitalize" }}>
            {info.getValue() ? info.getValue() : "--"}
          </span>
        );
      },

      footer: (props: any) => props.column.id,
      width: "150px",
    },

    {
      accessorFn: (row: any) => row.average_current,
      id: "average_current",
      header: () => <span>Avg Current</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "70px",
      minWidth: "100px",
      maxWidth: "130px",
    },
    {
      accessorFn: (row: any) => row.average_voltage_ll,
      id: "average_voltage_ll",
      header: () => <span>Avg V (LL)</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "70px",
      minWidth: "100px",
      maxWidth: "130px",
    },

    {
      accessorFn: (row: any) => row.average_pf,
      id: "average_pf",
      header: () => <span>Avg PF</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "70px",
      minWidth: "100px",
      maxWidth: "130px",
    },
    {
      accessorFn: (row: any) => row.total_kw,
      id: "total_kw",
      header: () => <span>Total KW</span>,
      cell: (info: any) => {
        return <span>{info.getValue() ? info.getValue() : "--"}</span>;
      },

      footer: (props: any) => props.column.id,
      width: "70px",
      minWidth: "100px",
      maxWidth: "130px",
    },
    {
      accessorFn: (row: any) => row.user_full_name,
      id: "user_full_name",
      header: () => <span>Assigned To</span>,
      cell: (info: any) => {
        return (
          <div>
            <span>{info.getValue() ? info.getValue() : "--"}</span>

            {info.getValue() ? (
              <IconButton
                onClick={() => {
                  openDialog(info?.row.original?.id);
                }}
              >
                <Tooltip title="Delete User">
                  <Image src="/delete-user.svg" alt="" width={14} height={14} />
                </Tooltip>
              </IconButton>
            ) : (
              ""
            )}

            {!info.getValue() ? (
              <IconButton
                onClick={() => {
                  setDialogOpen(true);
                  setDeviceId(info?.row.original?.id);
                }}
              >
                <Tooltip title="Assign User">
                  <Image
                    src="/users/assign-icon.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                </Tooltip>
              </IconButton>
            ) : (
              ""
            )}
          </div>
        );
      },
      footer: (props: any) => props.column.id,
      width: "70px",
      minWidth: "100px",
      maxWidth: "130px",
    },
    {
      accessorFn: (row: any) => row.status,
      id: "status",
      header: () => <span>Status</span>,
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <div
            className={
              value == "ACTIVE" ? "deviceStatus online" : "deviceStatus offline"
            }
            style={{ cursor: "pointer" }}
          >
            {value == "ACTIVE" ? (
              <Image
                alt=""
                src="./devices/icondot-online.svg"
                height={5}
                width={5}
              />
            ) : (
              <Image
                alt=""
                src="./devices/icondot-offline.svg"
                height={5}
                width={5}
              />
            )}

            <Tooltip
              arrow
              title={
                <span>
                  <MenuItem
                    className="menuItem"
                    disabled={value == "ACTIVE"}
                    onClick={() => {
                      updateDeviceStatus(info.row.original.id, "ACTIVE");
                    }}
                  >
                    Online
                  </MenuItem>
                  <MenuItem
                    className="menuItem"
                    disabled={value == "INACTIVE"}
                    onClick={() => {
                      updateDeviceStatus(info.row.original.id, "INACTIVE");
                    }}
                  >
                    Offline
                  </MenuItem>
                </span>
              }
            >
              <span className="statusTxt">
                {value == "ACTIVE" ? "Online" : "Offline"}
              </span>
            </Tooltip>
          </div>
        );
      },
      footer: (props: any) => props.column.id,
      width: "70px",
    },
    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        return (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(setSingleDevice(info.row.original));
                router.push(
                  `/devices/${info.row.original.id}/view-settings?state=Level1`
                );
              }}
            >
              <Tooltip title="View Settings">
                <Image
                  alt=""
                  src="/iconsetting.svg"
                  height={17}
                  width={17}
                  title="View Settings"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(setSingleDevice(info.row.original));

                router.push(`/devices/${info?.row?.original?.id}`);
              }}
            >
              <Tooltip title="View Device">
                <Image
                  alt=""
                  src="/user-view.svg"
                  width={15}
                  height={15}
                  title="View device"
                />
              </Tooltip>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(setSingleDevice(info.row.original));

                router.push(`/devices/${info?.row?.original?.id}/edit`);
              }}
            >
              <Tooltip title="Edit Device">
                <Image
                  alt=""
                  src="/edit-user.svg"
                  width={15}
                  height={15}
                  title="Edit device"
                />
              </Tooltip>
            </div>
          </div>
        );
      },
      footer: (props: any) => props.column.id,
      width: "100px",
    },
  ];
};
