import axiosInstance from "@/apis/axiosInstance";
import { API_PATHS } from "@/constants/apiPaths";
import {
  GetResPersonsType,
  GetPersonsParamsType,
} from "@/types/person/person.type";

/** person 목록 가져오기 */
export const getPersons = async (
  params?: GetPersonsParamsType
): Promise<GetResPersonsType> => {
  const response = await axiosInstance.get(API_PATHS.PERSONS, { params });
  return response.data;
};
