import { PersonTableDataType } from "@/components/person/PersonTable/PersonTable.type";
import { PersonType } from "@/types/person/person.type";

export interface GetPersonsParamsType {
  _quantity?: number;
  _locale?: string;
  _gender?: string;
  _birthday_start?: string;
}
export interface GetResPersonsType {
  status: string;
  code: number;
  locale: string;
  seed: string | null;
  total: number;
  data: PersonType[];
}

/** 페이징 처리된 사용자 response 데이터 타입 */
export interface GetResPaginatedPersonsType {
  data: PersonTableDataType[]; // 실제 데이터
  hasMore: boolean; // 다음 페이지가 있는지 여부
}

/** 페이징 처리된 사용자 데이터 요청 파라미터 타입 */
export interface GetPaginatedPersonsParamsType extends GetPersonsParamsType {
  _page: number;
}
