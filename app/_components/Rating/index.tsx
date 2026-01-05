import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import starSvg from 'public/assets/icons/star.svg';

interface RatingProps {
  rating: number;
  ratingTarget: RatingTargetType;
  reviewCount: number;
}

type RatingTargetType = 'hot' | 'all' | 'detail' | 'manage';

/**
 * Rating 컴포넌트 입니다.
 * @param {number} rating - 점수 값 입니다.
 * @param {number} reviewCount - 리뷰 갯수 입니다.
 * @property {RatingTargetType} ratingTarget - 인기 체험: hot, 모든 체험: all, 체험 상세: detail, 체험 관리: manage
 */

export default function Rating({ rating, reviewCount, ratingTarget = 'manage' }: RatingProps) {
  const ratingClassMapper: Record<RatingTargetType, string> = {
    all: 'flex items-center gap-0.5 text-lg font-medium text-black',
    hot: 'text-md font-normal text-white',
    detail: 'text-md font-regular',
    manage: 'text-base',
  };

  return (
    <div className="flex items-center gap-[5px]">
      <Image src={starSvg} className="size-4 mobile:size-5" alt="rating" />
      <div className={`${ratingClassMapper[ratingTarget]}`}>
        {rating.toFixed(1)}
        <span className={`${ratingTarget === 'all' ? 'text-gray-500' : ''}`}> ({reviewCount})</span>
      </div>
    </div>
  );
}
