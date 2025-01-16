import { getPaginatedPersons } from "@/apis/person/personApi";
import { GetResPaginatedPersonsType } from "@/apis/person/personApi.type";
import CheckboxTable from "@/components/common/table/CheckboxTable";
import { personTableState } from "@/recoil/person/personTableAtom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { personColumns } from "./PersonTable.data";

export default function PersonTable() {
  const [personTableData, setPersonTableData] =
    useRecoilState(personTableState); // 테이블 데이터 전역 상태 관리
  const loaderRef = useRef<HTMLDivElement>(null); // 무한 스크롤 로더 참조

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<GetResPaginatedPersonsType, Error>({
    queryKey: ["persons_infinite"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      await getPaginatedPersons({
        _quantity: 20,
        _gender: "female",
        _locale: "ko_KR",
        _page: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });

  // intersection observer로 무한 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 다음 페이지 요청
        }
      },
      { threshold: 1.0 } // 요소가 완전히 보일 때 트리거
    );

    // observer가 로더 요소 관찰 설정
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      // 언마운트 시 로더 요소 관찰 중단
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // 데이터 병합 및 personTableData 전역상태 반영
  useEffect(() => {
    if (data) {
      const mergedData = data.pages.flatMap((page) => page.data);
      setPersonTableData(mergedData);
    }
  }, [data, setPersonTableData]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
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
      {/* 로더 요소 TODO :: 수정 예정 */}
      <div ref={loaderRef} className="text-center my-4 h-[50px]">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll to load more"
          : "마지막 페이지 입니다."}
      </div>
    </>
  );
}
