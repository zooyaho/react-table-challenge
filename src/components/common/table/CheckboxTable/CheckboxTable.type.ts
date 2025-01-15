export interface CheckBoxTableColumnType<T> {
  key: keyof T; // 데이터의 키
  headerName: string; // 컬럼 헤더 이름
  render?: (value: T[keyof T], row: T) => React.ReactNode; // 사용자 정의 렌더링
  alignment?: "left" | "center" | "right"; // 텍스트 정렬
}
