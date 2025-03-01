import { ListDevicesApiProps } from "@/interfaces/listDeviesAPITypes";
import { $fetch } from "@/lib/fetch";
import { handleAPIErrorResponse } from "@/lib/httpErrorHandler";
import axios from "axios";

export const getAllDevicesAPI = async (
  params: Partial<ListDevicesApiProps>
) => {
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
export const updateSyncDeviceParamsAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(`/devices/${id}/sync/params`);
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

export const assignUserAPI = async (
  payload: {
    user: number;
  },
  id: any
) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/assign-user`,
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

export const updateDeviceStatusAPI = async (
  payload: {
    status: string;
  },
  id: any
) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/status`,
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

export const deleteDeviceAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.delete(`/devices/${id}`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const resetDevicePasswordAPI = async (
  payload: {
    password: string;
  },
  id: any
) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/reset-password`,
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

export const deleteAssignUserAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.delete(`/devices/${id}/user`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateDevicePasswordAPI = async (
  payload: {
    password: string;
  },
  id: any
) => {
  try {
    const { success, data } = await $fetch.patch(
      `/devices/${id}/reset-password`,
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

export const getDeviceAPI = async (id: any) => {
  try {
    const { success, data } = await $fetch.get(`/devices/${id}`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const getDeviceLocationsAPI = async () => {
  try {
    const { success, data } = await $fetch.get(`/devices/locations/all`);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateDeviceAPI = async (payload: any, id: any) => {
  try {
    const { success, data } = await $fetch.patch(`/devices/${id}`, payload);
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const syncDeviceParamsAPI = async (serial: any, id: any) => {
  try {
    const { success, data } = await $fetch.post(
      `/devices/${id}/parameters/${serial}/sync`
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const getDeviceDataWithMinuteParamatersAPI = async (
  id: any,
  queryParams: any
) => {
  try {
    const { success, data } = await $fetch.get(
      `/devices/${id}/device-params/minute-wise`,
      queryParams
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const reverseGeocode = async (lat: any, lng: any) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    return response.data.display_name;
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
};
