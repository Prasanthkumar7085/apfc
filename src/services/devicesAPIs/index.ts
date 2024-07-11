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

export const getSigleDeviceAPI = async () => {
  try {
    const { success, data } = await $fetch.get(`/6682b8d9acd3cb34a85fd743`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const addLeve1DeviceSettingsAPI = async (id: any, payload: any) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/level1-settings`,
      payload
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const addLeve2DeviceSettingsAPI = async (id: any, payload: any) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/level2-settings`,
      payload
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const addLeve3DeviceSettingsAPI = async (id: any, payload: any) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/level3-settings`,
      payload
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const addfanDeviceSettingsAPI = async (id: any, payload: any) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/fan-settings`,
      payload
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const getLevel1DeviceSettingsAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(
      `/devices/${id}/level1-settings`
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const getLevel2DeviceSettingsAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(
      `/devices/${id}/level2-settings`
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const getLevel3DeviceSettingsAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(
      `/devices/${id}/level3-settings`
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const getfanDeviceSettingsAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(`/devices/${id}/fan-settings`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
