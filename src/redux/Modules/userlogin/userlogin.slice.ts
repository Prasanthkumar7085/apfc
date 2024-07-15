"use client";
import { createSlice } from "@reduxjs/toolkit";
import { IReduxUserLogin } from "./userlogin";

const reducerName = "auth";

export const initialState: IReduxUserLogin.IInitialLoginState = {
  user: {},
  emailWhilePasswordReset: "",
  singleDevice: {}
};

export const userLoginSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setUserDetails: (state: any, action: any) => {
      state.user = { ...action.payload };
    },
    removeUserDetails: (state: any) => {
      state.user = {};
    },
    setProfileDetails: (state: any, action: any) => {
      state.profile = action.payload;
    },
    deleteProfileDetails: (state: any) => {
      state.profile = {};
    },
    setEmailOnForgotPassword: (state: any, action: any) => {
      state.emailWhilePasswordReset = action.payload
    },
    setSingleDevice: (state: any, action: any) => {
      state.singleDevice = action.payload;
    },
    deleteSingleDevice: (state: any) => {
      state.singleDevice = {};
    },
  },
});
export const {
  setProfileDetails,
  deleteProfileDetails,
  setEmailOnForgotPassword,
  setSingleDevice,
  deleteSingleDevice
} = userLoginSlice.actions;


export const { setUserDetails, removeUserDetails } = userLoginSlice.actions;
export const userLoginSliceReducer = { [reducerName]: userLoginSlice.reducer };
