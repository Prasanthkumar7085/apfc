import { $fetch } from "@/lib/fetch";
import { handleAPIErrorResponse } from "@/lib/httpErrorHandler";

export const getAllListUsersAPI = async () => {
    try {
        const { success, data } = await $fetch.get("/6682aad4ad19ca34f8815673");
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};


export const addUserAPI = async (payload: {
    name: string,
    email: string,
    phone: string,
    status: string,
}) => {
    try {
        const { success, data } = await $fetch.post("", payload);

        if (!success) {
            return handleAPIErrorResponse(data);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getSigleUserAPI = async () => {
    try {
        const { success, data } = await $fetch.get(`/6683a734e41b4d34e40bed62 `);
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};