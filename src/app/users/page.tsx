// import ListUsers from "@/components/ListUsers";
// import { Suspense } from "react";

import dynamic from 'next/dynamic';

const ListUsers = dynamic(() => import('@/components/ListUsers'), {
    ssr: false
})


const Users = () => {

    return (
        <ListUsers />
    );
}
export default Users;