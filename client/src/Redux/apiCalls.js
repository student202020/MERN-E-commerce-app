import { loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess,  logoutFailure, addUserStart, addUserFailure, addUserSuccess } from "./userRedux";
import {addCartSuccess, addCartFailure, } from "./cartRedux"
import { publicRequest, userRequest} from "../requestMethods";
import axios from "axios"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
   const res = await userRequest.post("/auth/register", user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
export const addCart = async (cart, dispatch) => {
  try {
   const res = await userRequest.post(`/cart`, cart );
    dispatch(addCartSuccess(res.data));
  } catch (err) {
    dispatch(addCartFailure());
  }
};

