import { updateUserStart, updateUserSuccess, updateUserFailure,  deleteUserStart, deleteUserSuccess, deleteUserFailure, loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailure,  getUserStart, getUserSuccess, getUserFailure, addUserStart, addUserSuccess, addUserFailure } from "./userRedux";
import { updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductFailure, addProductSuccess, deleteProductStart, deleteProductSuccess, deleteProductFailure, getProductStart, getProductSuccess, getProductFailure  } from "./productRedux";

import { publicRequest, userRequest } from "../requestMethods";


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
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
   const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
   const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
   const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
   const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
export const updateUser = async (id, dispatch) => {
  dispatch(updateUserStart());
  try {
   const res = await userRequest.put(`/users/${id}`);
    dispatch(updateUserSuccess(id));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
