import { CheckBoxTableColumnType } from "@/components/common/table/CheckboxTable/CheckboxTable.type";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useSortableCheckBoxTableColumns<T>(
  columns: CheckBoxTableColumnType<T>[]
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  // 정렬 버튼 클릭 핸들러
  const handleSort = useCallback(
    (key: keyof T) => {
      setSortConfig((prev) => {
        const newSortConfig: {
          key: keyof T;
          direction: "asc" | "desc" | null;
        } = {
          key,
          direction:
            prev.key === key
              ? prev.direction === "asc"
                ? "desc"
                : prev.direction === "desc"
                ? null
                : "asc"
              : "asc",
        };

        // 쿼리 스트링 업데이트
        if (newSortConfig.direction === null) {
          searchParams.delete("sortKey");
          searchParams.delete("sortOrder");
        } else {
          searchParams.set("sortKey", String(newSortConfig.key));
          searchParams.set("sortOrder", newSortConfig.direction);
        }
        setSearchParams(searchParams);

        return newSortConfig;
      });
    },
    [searchParams, setSearchParams]
  );

  // 컬럼에 정렬 상태 추가
  const sortableColumns = useMemo(() => {
    return columns.map((column) => {
      if (!column.sortable) {
        return column;
      }

      return {
        ...column,
        sortOrder: sortConfig.key === column.key ? sortConfig.direction : null,
        onSort: () => handleSort(column.key),
      };
    });
  }, [handleSort, columns, sortConfig]);

  useEffect(() => {
    // mounted 시 sortKey, sortOrder 쿼리 스트링 확인하여 sortConfig 상태 동기화
    const sortKey = searchParams.get("sortKey") as keyof T | null;
    const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | null;

    if (sortKey && sortOrder) {
      setSortConfig({
        key: sortKey,
        direction: sortOrder,
      });
    }
  }, [searchParams]);

  return { sortableColumns };
}
