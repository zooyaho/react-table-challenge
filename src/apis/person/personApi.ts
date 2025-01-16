import axiosInstance from "@/apis/axiosInstance";
import { API_PATHS } from "@/constants/apiPaths";
import {
  GetPaginatedPersonsParamsType,
  GetPersonsParamsType,
  GetResPaginatedPersonsType,
  GetResPersonsType,
} from "./personApi.type";

/** person 목록 가져오기 */
export const getPersons = async (
  params?: GetPersonsParamsType
): Promise<GetResPersonsType> => {
  const response = await axiosInstance.get(API_PATHS.PERSONS, { params });
  return response.data;
};

/**
 * 페이징 가능한 person 테이블 데이터 가공 fetch함수
 */
export const getPaginatedPersons = async (
  params?: GetPaginatedPersonsParamsType
): Promise<GetResPaginatedPersonsType> => {
  const response = await axiosInstance.get(API_PATHS.PERSONS, { params });
  const result = response.data;

  const transformedData = result.data.map((person: any) => ({
    id: person.id,
    fullname:
      params?._locale === "ko_KR"
        ? `${person.lastname} ${person.firstname}`
        : `${person.firstname} ${person.lastname}`, // fullname 속성 추가
    email: person.email,
    birthday: person.birthday,
    addressName: `${person.address.city} ${person.address.streetName}`, // 주소명 속성 추가
  }));

  return {
    data: transformedData,
    hasMore: result.data.length > 0, // 다음 페이지가 있는지 여부
  };
};
