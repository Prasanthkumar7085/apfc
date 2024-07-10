import Image from "next/image";

export const ListUserColumns = [
    {
        accessorFn: (row: any) => row.first_name,
        id: "first_name",
        header: () => <span>Name</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue() : "--"}</span>;
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
        width: "150px",
    },
    {
        accessorFn: (row: any) => row.phone,
        id: "phone",
        header: () => <span>Mobile Number</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue() : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "150px",
    },
    {
        accessorFn: (row: any) => row.device_ids,
        id: "device_ids",
        header: () => <span>Devices</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue()[0]?.device_name : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "150px",
    },
    {
        accessorFn: (row: any) => row.status,
        id: "status",
        header: () => <span>Status</span>,
        cell: (info: any) => {
            const value = info.getValue();
            const capitalizedValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : "--";
            return <span className={value === "active" ? "status active" : "status inactive"}>{capitalizedValue}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "100px",
    },
    {
        accessorFn: (row: any) => row.last_login,
        id: "last_login",
        header: () => <span>Last Login</span>,
        cell: (info: any) => {
            return <span>{info.getValue() ? info.getValue() : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "150px",
    },
    {
        accessorFn: (row: any) => row.device_ids,
        id: "device_ids",
        header: () => <span>Devices Assigend</span>,
        cell: (info: any) => {
            return <span className="assignDeviceText">{info.getValue() ? info.getValue()?.length : "--"}</span>;
        },
        footer: (props: any) => props.column.id,
        width: "150px",
    },

]