import { useQuery } from "@tanstack/react-query";
import { getPersons } from "@/apis/person/personApi";
import {
  GetResPersonsType,
  GetPersonsParamsType,
  PersonType,
} from "@/types/person/person.type";

/** 사람 목록 */
export const useGetPersons = (params?: GetPersonsParamsType) => {
  const {
    data: personsData,
    refetch: refetchPersonsData,
    isError: isPersonsFetchError,
    isLoading: isPersonsFetchLoading,
    ...rest
  } = useQuery<GetResPersonsType, Error, PersonType[]>({
    queryKey: ["persons", params],
    queryFn: () => getPersons(params || { _quantity: 5, _gender: "female" }),
    refetchOnMount: "always", // 무효화 시 refetch 실행
    select: (result: GetResPersonsType) => {
      return result.data;
    },
  });

  return {
    personsData,
    refetchPersonsData,
    isPersonsFetchError,
    isPersonsFetchLoading,
    ...rest,
  };
};
