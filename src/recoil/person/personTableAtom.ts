import { PersonTableDataType } from "@/components/person/PersonTable/PersonTable.type";
import { atom } from "recoil";

/** 테이블 데이터 상태 */
export const personTableState = atom<PersonTableDataType[]>({
  key: "personTableState",
  default: [],
});

/** 선택된 행 상태 */
export const selectedPersonTableState = atom<Set<number>>({
  key: "selectedPersonRowsState",
  default: new Set(),
});
