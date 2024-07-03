import { $fetch } from "@/lib/fetch";
import { handleAPIErrorResponse } from "@/lib/httpErrorHandler";

export const getAllDevicesAPI = async () => {
    try {
        const { success, data } = await $fetch.get("/6683cc84ad19ca34f881ba0a");
        if (!success) {
            return handleAPIErrorResponse(data);
        }
        return data;
    } catch (err) {
        throw err;
    }
};