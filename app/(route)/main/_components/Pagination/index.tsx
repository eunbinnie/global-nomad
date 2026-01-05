'use client';

import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import Button from '../Button';

import ArrowRight from 'public/assets/icons/arrow-right.svg';
import ArrowRightDisabled from 'public/assets/icons/arrow-right-disabled.svg';

interface PaginationProps {
  currentPage: number;
  goToNextSet: () => void;
  goToPage: (page: number) => void;
  goToPreviousSet: () => void;
  pageNumbers: number[];
  totalPages: number;
}

/**
 * Pagination 컴포넌트 입니다.
 * @param {number} totalCount - 총 데이터의 갯수 입니다.
 * @param {number} itemsInPage - 페이지당 보여지는 아이템의 갯수 입니다.
 * @param {function} onPageChange - 현재 페이지 값을 상위 컴포넌트로 보내는 함수 입니다.
 * @param {number} currentPage - 현재 페이지 값 입니다.
 */

export default function Pagination({ totalPages, currentPage, pageNumbers, goToNextSet, goToPage, goToPreviousSet }: PaginationProps) {
  const canGoToPreviousSet = currentPage > 1;
  const canGoToNextSet = Math.ceil(currentPage / 5) !== Math.ceil(totalPages / 5);

  return (
    <div className="mx-[24px] mb-[60px] flex w-full max-w-[1200px] items-center justify-center gap-[10px] mobile:mb-[100px]">
      <Button
        name="prev"
        disabled={!canGoToPreviousSet}
        onClick={canGoToPreviousSet ? goToPreviousSet : undefined}
        border
        btnColor="white"
        borderColor={canGoToPreviousSet ? 'nomadBlack' : 'gray'}
        className="flex size-8 items-center justify-center rounded-lg text-2lg font-bold mobile:size-10"
      >
        <Image
          src={canGoToPreviousSet ? ArrowRight : ArrowRightDisabled}
          alt="페이지네이션 버튼"
          className={cn('size-4 mobile:size-5', canGoToPreviousSet ? 'rotate-180' : '')}
        />
      </Button>
      {pageNumbers.map((pageNumber) => {
        const isActivePage = currentPage === pageNumber;
        return (
          <Button
            key={pageNumber}
            btnColor={isActivePage ? 'nomadBlack' : 'white'}
            textColor={isActivePage ? 'white' : 'nomadBlack'}
            border={!isActivePage}
            borderColor={isActivePage ? undefined : 'nomadBlack'}
            onClick={() => goToPage(pageNumber)}
            className="size-8 rounded-lg text-md font-regular mobile:size-10 mobile:text-base"
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        name="next"
        disabled={!canGoToNextSet}
        onClick={canGoToNextSet ? goToNextSet : undefined}
        btnColor="white"
        border
        borderColor={canGoToNextSet ? 'nomadBlack' : 'gray'}
        className="flex size-8 items-center justify-center rounded-lg text-2lg font-bold mobile:size-10"
      >
        <Image
          src={canGoToNextSet ? ArrowRight : ArrowRightDisabled}
          alt="페이지네이션 버튼"
          className={cn('size-4 mobile:size-5', canGoToNextSet ? '' : 'rotate-180')}
        />
      </Button>
    </div>
  );
}
