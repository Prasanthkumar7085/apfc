import { removeUserDetails } from "@/redux/Modules/userlogin";
import { store } from "@redux/../../src/redux/index";
import Cookies from "js-cookie";
import { prepareURLEncodedParams } from "./prepareUrlEncodedParams";

interface IAPIResponse {
  success: boolean;
  status: number;
  data: any;
}
class FetchService {
  authStatusCodes: number[] = [401, 403];
  authErrorURLs: string[] = [
    "/",
    "/forgot-password",
    "/forgot-password/update-password",
  ];

  private _fetchType: string;
  private _noHeaders: Boolean;
  constructor(fetchTypeValue = "json", headerOrNot = true) {
    this._fetchType = fetchTypeValue;
    this._noHeaders = headerOrNot;
    store.subscribe(() => { });
  }

  configureAuthorization(config: any) {
    const state = store.getState();
    const accessToken = Cookies.get("access_token");

    config.headers["Authorization"] = accessToken; // we need to
  }
  setHeader(config: any) {
    config.headers = {};
  }
  setDefualtHeaders(config: any) {
    config.headers = {
      "Content-Type": "application/json",
    };
  }

  dispatchRemoveUserDetails() {
    store.dispatch(removeUserDetails());
  }
  checkToLogOutOrNot(path: string) {
    return this.authErrorURLs.some((arrayUrl: string) =>
      path.includes(arrayUrl)
    );
  }
  isAuthRequest(path: string) {
    return this.authErrorURLs.includes(path);
  }

  async hit(...args: any): Promise<IAPIResponse> {
    let [path, config] = args;
    this.setDefualtHeaders(config);

    if (!this._noHeaders) {
      this.setHeader(config);
    }

    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config);
    }

    // request interceptor starts
    let url = process.env.NEXT_PUBLIC_API_URL + path;

    const response: any = await fetch(url, config);

    if (response?.status == 200 || response?.status == 201) {
      if (this._fetchType == "response") {
        return {
          success: true,
          status: response.status,
          data: response,
        };
      } else {
        return {
          success: true,
          status: response.status,
          data: await response.json(),
        };
      }
    } else if (
      this.authStatusCodes.includes(response.status) &&
      !this.checkToLogOutOrNot(path)
    ) {
      this.dispatchRemoveUserDetails();
      Cookies.remove("user");
      window.location.href = "/";
      return {
        success: false,
        status: response.status,
        data: await response.json(),
      };
    } else {
      return {
        status: response?.status,
        success: false,
        data: await response.json(),
      };
    }
  }
  async post(url: string, payload?: any) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : undefined,
    });
  }
  async postFormData(url: string, file?: any) {
    return await this.hit(url, {
      method: "POST",
      body: file,
    });
  }

  async get(url: string, queryParams = {}) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams);
    }
    return await this.hit(url, {
      method: "GET",
    });
  }
  async delete(url: string) {
    return this.hit(url, {
      method: "DELETE",
    });
  }
  async put(url: string, payload = {}) {
    return this.hit(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }
  async patch(url: string, payload = {}) {
    return this.hit(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }
}
// for app search
export const $fetch = new FetchService("json", true);
export const $secondaryFetch = new FetchService("response", true);
export const $fetchNoHeaders = new FetchService("json", false);
export const $secondaryFetchNoHeaders = new FetchService("response", false);