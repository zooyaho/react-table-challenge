import { SearchInput } from "@/components/common/input";
import PersonTable from "@/components/person/PersonTable";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function PersonPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * enter 시 검색 기능 수행 메서드
   * @param event
   * - 검색 시 기존 쿼리 스트링 유지하면서 keyword 설정
   */
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      const keywordValue = inputRef.current.value;

      if (keywordValue) {
        setSearchParams({
          ...Object.fromEntries(searchParams),
          keyword: keywordValue,
        }); // 기존 쿼리 유지하며 검색 키워드 추가
      } else {
        const updatedParams = new URLSearchParams(searchParams);

        updatedParams.delete("keyword");
        setSearchParams(updatedParams); // 검색 키워드만 제거
      }
    }
  };

  // 쿼리 스트링에 keyword가 있을 경우 SearchInput value와 동기화
  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";

    if (inputRef.current) {
      inputRef.current.value = keyword;
    }
  }, [searchParams]);

  return (
    <main className="flex justify-center  min-h-screen">
      <div className="w-[80%] mt-9">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-center font-semibold text-xl text-blue-700">
            Person List
          </h1>
          <SearchInput
            ref={inputRef}
            className="w-[30%]"
            placeholder="검색"
            onKeyDown={handleSearch}
          />
        </div>
        <PersonTable />
      </div>
    </main>
  );
}
