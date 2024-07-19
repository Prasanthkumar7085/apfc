import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";

export const ListUserColumns = [
    {
        accessorFn: (row: any) => row.full_name,
        id: "first_name",
        header: () => <span>Name</span>,
        cell: (info: any) => {
            return (
                <Tooltip title={info.getValue()} arrow>
                    <span>{info.getValue() ? capitalizeFirstTwoWords(info.getValue().length > 20
                        ? info.getValue().slice(0, 20) + '...'
                        : info.getValue()) : "--"}</span>
                </Tooltip>
            );
        },

        footer: (props: any) => props.column.id,
        width: "150px",
    },
    {
        accessorFn: (row: any) => row.email,
        id: "email",
        header: () => <span>Email</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue() : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "300px",
    },
    {
        accessorFn: (row: any) => row.phone,
        id: "phone",
        header: () => <span>Mobile Number</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue() : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "200px",
    },
    // {
    //     accessorFn: (row: any) => row.device_name,
    //     id: "device_name",
    //     header: () => <span>Devices</span>,
    //     cell: (info: any) => {
    //         return <span>{info.getValue() ? info.getValue() : "--"}</span>;
    //     },
    //     footer: (props: any) => props.column.id,
    //     width: "200px",
    // },
    // {
    //     accessorFn: (row: any) => row.last_active_at,
    //     id: "last_login",
    //     header: () => <span>Last Login</span>,
    //     cell: (info: any) => {
    //         return <span>{info.getValue() ? dayjs(info.getValue()).format("MM-DD-YYYY") : "--"}</span>;
    //     },
    //     footer: (props: any) => props.column.id,
    //     width: "200px",
    // },
    {
        accessorFn: (row: any) => row.device_count,
        id: "device_count",
        header: () => <span>Devices Assigned</span>,
        cell: (info: any) => {
            return <span className="assignDeviceText">{info.getValue() || "0"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "150px",
    },

]