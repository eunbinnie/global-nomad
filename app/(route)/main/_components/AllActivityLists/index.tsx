'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity } from '@/_types/activities/types';

import useGetActivities from '@/_hooks/activities/useGetActivities';
import usePagination from '@/_hooks/activities/usePagination';
import useResFetchCount from '@/_hooks/activities/useResFetchCount';

import ActivityGrid from './ActivityGrid/ActivityGrid';
import CategoryLists from '../CategoryLists';
import Pagination from '../Pagination';

interface AllActivityListsProps {
  searchValue: string;
}

/**
 * 전체 체험 리스트 컴포넌트 입니다.
 * @param {string} searchValue - 부모 컴포넌트로 전달되는 검색 값 입니다.
 */

export default function AllActivityLists({ searchValue }: AllActivityListsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSort, setCurrentSort] = useState<'latest' | 'most_reviewed' | 'price_asc' | 'price_desc'>('latest');
  const [selectedCategories, setSelectedCategories] = useState<string>('전체');
  const router = useRouter();

  const fetchSize = useResFetchCount({ mobileSize: 4, tabletSize: 9, desktopSize: 8 });

  const categoryValue = selectedCategories === '전체' ? undefined : selectedCategories;

  const { data, isLoading, isError } = useGetActivities({
    method: 'offset',
    page: currentPage,
    size: fetchSize,
    sort: currentSort,
    ...(searchValue && { keyword: searchValue }),
    category: categoryValue,
  });

  const totalPages = Math.ceil((data?.totalCount as number) / fetchSize);

  const { pageNumbers, goToPage, goToNextSet, goToPreviousSet } = usePagination(totalPages, currentPage, setCurrentPage);

  const isNoData = !isLoading && data?.activities.length === 0;

  const searchMessage = searchValue ? '검색 결과가 없습니다.' : '등록된 체험이 없습니다.';

  const activities = data?.activities?.map((activity: Activity) => ({
    ...activity,
    id: activity.id.toString(),
  }));

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(category);
    setCurrentPage(1);
  };

  const handleFilterSelect = (sort: 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc') => {
    setCurrentSort(sort);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (searchValue !== '') {
      setCurrentPage(1);
    }
  }, [searchValue]);

  return (
    <div>
      {searchValue ? (
        <div className="flex flex-col gap-[12px] font-regular">
          <p className="text-2xl mobile:text-3xl">
            <span className="font-bold">{searchValue}</span>으로 검색한 결과 입니다.
          </p>
          <p className="text-lg">총 {data?.totalCount}개의 결과</p>
        </div>
      ) : (
        <CategoryLists onCategoryClick={handleCategoryClick} onFilterSelect={handleFilterSelect} selectedCategories={selectedCategories} />
      )}
      {/* {isNoData && <div className="flex h-[400px] w-full items-center justify-center text-xl font-bold mobile:h-[600px] mobile:text-3xl">{searchMessage}</div>}
      <ActivityGrid isLoading={isLoading} isError={isError} activities={activities} onClick={(id: string) => router.push(`/activity/details/${id}`)} />
      {data && data.totalCount !== 0 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            goToPage={goToPage}
            goToNextSet={goToNextSet}
            goToPreviousSet={goToPreviousSet}
          />
        </div>
      )} */}
    </div>
  );
}
