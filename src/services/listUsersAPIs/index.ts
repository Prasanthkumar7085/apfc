import { ListUsersApiProps } from "@/interfaces/listUserAPITypes";
import { $fetch } from "@/lib/fetch";
import { handleAPIErrorResponse } from "@/lib/httpErrorHandler";

export const getAllListUsersAPI = async (params: Partial<ListUsersApiProps>) => {
    try {
        const { success, data } = await $fetch.get("/users", params);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};


export const addUserAPI = async (payload: {
    full_name: string,
    email: string,
    phone: string,
    password: string,
    user_type: string,
}) => {
    try {
        const { success, data } = await $fetch.post("/users/sign-up", payload);

        if (!success) {
            return handleAPIErrorResponse(data);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getSigleUserAPI = async (id: any) => {
    try {
        const { success, data } = await $fetch.get(`/users/${id} `);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};

export const updateUserAPI = async (payload: {
    full_name: string,
    email: string,
    phone: string,
    user_type: string,
}, id: any) => {
    try {
        const { success, data } = await $fetch.patch(`/users/${id}`, payload);

        if (!success) {
            return handleAPIErrorResponse(data);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getSigleUserDevicesAPI = async (id: any) => {
    try {
        const { success, data } = await $fetch.get(`/users/${id}/devices`);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};

export const getAllListDevicesAPI = async (params: any) => {
    try {
        const { success, data } = await $fetch.get("/devices", params);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};

export const assignDeviceAPI = async (payload: {
    device: number,

}, id: any) => {
    try {
        const { success, data } = await $fetch.patch(`/users/${id}/assign-device`, payload);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};

export const deleteUserAPI = async (id: any) => {
    try {
        const { success, data } = await $fetch.delete(`/users/${id}`);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};
