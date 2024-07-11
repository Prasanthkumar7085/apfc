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