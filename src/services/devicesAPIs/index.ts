import { ListDevicesApiProps } from "@/interfaces/listDeviesAPITypes";
import { $fetch } from "@/lib/fetch";
import { handleAPIErrorResponse } from "@/lib/httpErrorHandler";

export const getAllDevicesAPI = async (params: Partial<ListDevicesApiProps>) => {
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

export const getSigleDeviceAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(`/devices/${id}/parameters`);
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

export const addDeviceAPI = async (payload: any) => {
  try {
    const { success, data } = await $fetch.post(`/devices`, payload);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const getAllListUsersAPI = async (params: any) => {
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

export const assignUserAPI = async (payload: {
  user: number,

}, id: any) => {
  try {
    const { success, data } = await $fetch.patch(`/devices/${id}/assign-user`, payload);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
