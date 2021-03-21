import { keys } from "@material-ui/core/styles/createBreakpoints";
import {axios as defaultInstance} from "../../utilities";

const APIMethods = (axiosInstance = defaultInstance) => {
  const {get, put, post, delete: destroy, patch} = axiosInstance;

  const restify = (name, keys) => {
    const routes = {
      create: (data) => post(`/${name}`, data),
      readOne: (id, data) => get(`/${name}/${id}`, {params: data}),
      readMany: (data) => get(`/${name}`, {params: data}),
      update: (id, data) => put(`/${name}/${id}`, data),
      delete: (id) => destroy(`/${name}/${id}`),
    };

    const returnRoutes = Object.assign(
      ...keys.map(key => ({[key]: routes[key]})),
    );
    return returnRoutes;
  };

  /* Debts Service*/
  const Debts = {
    ...restify("debt", ["create", "readOne", "readMany", "update", "delete"]),
  };

  return {
    Debts,
  };
};

export {APIMethods};