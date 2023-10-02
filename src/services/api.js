import axios from "axios";
import { server_url } from "./server_url";

export const GET = async (res) => {
  const response = await axios.get(`${server_url}${res}`);
  return response;
};

export const GETBYQUERY = async (res) => {
  const query = "/products/search?q=";
  const response = await axios.get(`${server_url}${query}${res}`);
  return response;
};

export const GETBYID = async (res) => {
  const response = await axios.get(`${server_url}/products/${res}`);
  return response;
};
