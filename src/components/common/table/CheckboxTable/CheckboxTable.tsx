import React, { Fragment, useState } from "react";
import Checkbox from "@/components/common/Checkbox";
import { CheckBoxTableColumnType } from "./CheckboxTable.type";
import Tooltip from "@/components/common/Tooltip";
import {
  TbArrowsSort,
  TbSortAscending,
  TbSortDescending,
} from "react-icons/tb";

interface CheckboxTablePropsType<T> {
  data: T[]; // 테이블 데이터
  columns: CheckBoxTableColumnType<T>[]; // 테이블 컬럼
  renderSubRow?: (row: T) => React.ReactNode; // SubRow 렌더링 함수
}

export default function CheckboxTable<T>({
  data,
  columns,
  renderSubRow,
}: CheckboxTablePropsType<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null); // 데이터 셀에 대한 툴팁 정보

  // 행 확장 토글
  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);

      if (newExpandedRows.has(index)) {
        newExpandedRows.delete(index);
      } else {
        newExpandedRows.add(index);
      }
      return newExpandedRows;
    });
  };

  // 행 선택 토글
  const toggleSelectRow = (index: number) => {
    setSelectedRows((prev) => {
      const newSelectedRows = new Set(prev);

      if (newSelectedRows.has(index)) {
        newSelectedRows.delete(index);
      } else {
        newSelectedRows.add(index);
      }
      return newSelectedRows;
    });
  };

  // 전체 선택/해제 체크박스 핸들러
  const toggleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      // 전체 선택
      setSelectedRows(new Set(data.map((_, index) => index)));
    } else {
      // 선택 초기화
      setSelectedRows(new Set());
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-fixed w-full border-collapse border border-gray-200">
        {/* 컬럼 헤더 */}
        <thead className="bg-gray-100">
          <tr>
            {/* 전체 선택/해제 체크박스 셀 */}
            <th className="w-10 border border-gray-200 text-center">
              <Checkbox
                checked={selectedRows.size === data.length && data.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            {/* sub 행 컬럼 셀 */}
            {renderSubRow && (
              <th className="w-10 border border-gray-200 text-center"></th>
            )}
            {/* 데이터 컬럼 셀 */}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`border border-gray-200 px-4 py-2 text-${
                  column.alignment || "left"
                }`}
              >
                <div className="flex items-center">
                  {/* 컬럼 명 */}
                  {column.headerName}
                  {/* 정렬 버튼 */}
                  {column.sortable && (
                    <button className="ml-2" onClick={column.onSort}>
                      {column.sortOrder === "asc" ? (
                        <TbSortAscending />
                      ) : column.sortOrder === "desc" ? (
                        <TbSortDescending />
                      ) : (
                        <TbArrowsSort />
                      )}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* 데이터 행 */}
        <tbody>
          {data.map((row, index) => (
            <Fragment key={index}>
              <tr
                className={`border-b ${
                  selectedRows.has(index) ? "bg-blue-100" : "bg-white"
                }`}
              >
                <td className="text-center">
                  <Checkbox
                    checked={selectedRows.has(index)}
                    onChange={() => toggleSelectRow(index)}
                  />
                </td>

                {/* sub행 활성화 토글 버튼 */}
                {renderSubRow && (
                  <td className="text-center">
                    <button
                      className="text-blue-500"
                      onClick={() => toggleRow(index)}
                    >
                      {expandedRows.has(index) ? "▼" : "▶"}
                    </button>
                  </td>
                )}

                {/* 컬럼에 따른 데이터 */}
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis cursor-default text-${
                      column.alignment || "left"
                    } ${
                      selectedRows.has(index) ? "text-blue-700" : "text-black"
                    }`}
                    onMouseEnter={(e) => {
                      const element = e.currentTarget;
                      if (element.scrollWidth > element.clientWidth) {
                        const rect = element.getBoundingClientRect();

                        setTooltip({
                          content: String(row[column.key]),
                          x: rect.left + window.scrollX,
                          y: rect.bottom + window.scrollY,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
              {expandedRows.has(index) && renderSubRow && (
                <tr>
                  <td colSpan={columns.length + 2} className="bg-gray-50 py-2">
                    {renderSubRow(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {tooltip && (
        <Tooltip content={tooltip.content} x={tooltip.x} y={tooltip.y} />
      )}
    </div>
  );
}
