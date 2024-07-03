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