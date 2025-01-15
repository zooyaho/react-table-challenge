import axiosInstance from "@/apis/axiosInstance";
import { API_PATHS } from "@/constants/apiPaths";
import {
  GetResUsersType,
  GetUsersParamsType,
} from "@/types/person/person.type";

/** person 목록 가져오기 */
export const getUsers = async (
  params?: GetUsersParamsType
): Promise<GetResUsersType> => {
  const response = await axiosInstance.get(API_PATHS.PERSONS, { params });
  return response.data;
};
