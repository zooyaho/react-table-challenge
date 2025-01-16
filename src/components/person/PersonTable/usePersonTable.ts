import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { getPaginatedPersons } from "@/apis/person/personApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PersonTableDataType } from "./PersonTable.type";
import { useSearchParams } from "react-router-dom";

export function usePersonTable() {
  const [searchParams] = useSearchParams();
  const [originalPersonTableData, setOriginalPersonTableData] = useState<
    PersonTableDataType[]
  >([]); // 테이블 오리지널(서버) 데이터 상태
  const loaderRef = useRef<HTMLDivElement>(null); // 무한 스크롤 로더 참조

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["persons_infinite"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      await getPaginatedPersons({
        _quantity: 20,
        _gender: "female",
        _locale: "ko_KR",
        _page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });

  /**
   * person table data
   * 테이블 행 데이터
   *
   * - 쿼리 스트링에서 sortKey, sortOrder 확인하여 정렬 수행
   * - 쿼리 스트링에서 keyword 확인하여 검색 수행
   */
  const personTableData = useMemo(() => {
    // 정렬 수행하기 위해 쿼리 스트링에서 sortKey, sortOrder key 확인
    const sortKey = searchParams.get("sortKey") as
      | keyof PersonTableDataType
      | null;
    const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | null;
    const keyword = searchParams.get("keyword")?.toLowerCase();

    let filteredData = originalPersonTableData;

    // 검색 수행
    if (keyword) {
      filteredData = filteredData.filter(({ fullname, email, birthday }) =>
        [fullname, email, birthday].some((field) =>
          field.toLowerCase().includes(keyword)
        )
      );
    }

    // 정렬 수행
    if (sortKey && sortOrder) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [originalPersonTableData, searchParams]);

  /**
   * setLoaderRef
   *
   * IntersectionObserver를 사용해 무한 스크롤을 구현하기 위한 함수입니다.
   * 전달된 DOM 노드를 관찰하며 화면에 보일 때 다음 페이지 데이터를 요청합니다.
   *
   * 주요 기능:
   * - 기존 관찰 중이던 요소를 정리하고 새 요소를 관찰합니다.
   * - 요소가 뷰포트에 완전히 보일 때 `fetchNextPage`를 호출합니다.
   * - `loaderRef.current`를 업데이트하여 현재 관찰 중인 노드를 저장합니다.
   */
  const setLoaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loaderRef.current) {
        // 기존 요소 관찰 중단
        const observer = new IntersectionObserver(() => {});
        observer.disconnect();
      }

      if (node) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
              fetchNextPage(); // 다음 페이지 요청
            }
          },
          { threshold: 1.0 } // 요소가 완전히 보일 때 트리거
        );

        observer.observe(node); // 새로운 요소 관찰 시작
        loaderRef.current = node;
      }
    },
    [hasNextPage, fetchNextPage]
  );

  // 데이터 병합 및 personTableData 상태 반영
  useEffect(() => {
    if (data) {
      const mergedData = data.pages.flatMap((page) => page.data);
      setOriginalPersonTableData(mergedData);
    } else {
      refetch();
    }
  }, [data, refetch]);

  return {
    personTableData,
    loaderRef: setLoaderRef,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
  };
}
