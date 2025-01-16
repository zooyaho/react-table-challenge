import CheckboxTable from "@/components/common/table/CheckboxTable";
import { personColumns } from "./PersonTable.data";
import { usePersonTable } from "./usePersonTable";
import { useSortableCheckBoxTableColumns } from "@/components/common/table/CheckboxTable/useSortableCheckBoxTableColumns";

export default function PersonTable() {
  const {
    personTableData,
    loaderRef,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
  } = usePersonTable();
  const { sortableColumns } = useSortableCheckBoxTableColumns(personColumns);

  return (
    <div className="w-full min-h-[50%] flex items-center justify-center flex-col">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>목록 불러오기 실패하였습니다.</p>
      ) : !personTableData.length ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <>
          <CheckboxTable
            data={personTableData}
            columns={sortableColumns}
            renderSubRow={(row) => (
              <div className="text-center">주소: {row.addressName}</div>
            )}
          />
          <div ref={loaderRef} className="text-center my-4 h-[50px]">
            {isFetchingNextPage
              ? "정보 불러오는 중..."
              : !hasNextPage && "마지막 페이지 입니다."}
          </div>
        </>
      )}
    </div>
  );
}
