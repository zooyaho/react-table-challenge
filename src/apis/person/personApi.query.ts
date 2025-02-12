import { useQuery } from "@tanstack/react-query";
import { getPersons } from "@/apis/person/personApi";
import { PersonType } from "@/types/person/person.type";
import { GetPersonsParamsType, GetResPersonsType } from "./personApi.type";

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
      return result.data.map((person) => {
        // _locale에 따라 fullname 구성
        const fullname =
          params?._locale === "ko_KR"
            ? `${person.lastname} ${person.firstname}`
            : `${person.firstname} ${person.lastname}`;

        const addressName = `${person.address.city} ${person.address.streetName}`;

        return {
          ...person,
          fullname, // fullname 속성 추가
          addressName, // 주소명 속성 추가
        };
      });
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
