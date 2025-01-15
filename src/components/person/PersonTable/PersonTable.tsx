import { useGetPersons } from "@/apis/person/personApi.query";
import CheckboxTable from "@/components/common/table/CheckboxTable";
import { PersonTableDataType } from "./PersonTable.type";
import { useRecoilState } from "recoil";
import { personTableState } from "@/recoil/person/personTableAtom";
import { useEffect } from "react";
import { personColumns } from "./PersonTable.data";

export default function PersonTable() {
  const { personsData, isPersonsFetchLoading, isPersonsFetchError } =
    useGetPersons({
      _locale: "ko_KR",
      _quantity: 10,
      _gender: "female",
      _birthday_start: "2005-01-01",
    }); // 서버 데이터

  const [personTableData, setPersonTableData] =
    useRecoilState(personTableState); // 테이블 데이터 전역 상태 관리

  useEffect(() => {
    if (personsData) {
      const transformedData: PersonTableDataType[] = personsData.map(
        (person) => ({
          id: person.id,
          fullname: person.fullname,
          email: person.email,
          birthday: person.birthday,
          addressName: person.addressName,
        })
      );
      setPersonTableData(transformedData);
    }
  }, [personsData, setPersonTableData]);

  return (
    <>
      {isPersonsFetchLoading ? (
        <div>Loading...</div>
      ) : isPersonsFetchError ? (
        <div>목록 불러오기 실패하였습니다.</div>
      ) : (
        <CheckboxTable
          data={personTableData}
          columns={personColumns}
          renderSubRow={(row) => (
            <div className="text-center">주소: {row.addressName}</div>
          )}
        />
      )}
    </>
  );
}
