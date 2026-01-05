import Image from 'next/image';
import Link from 'next/link';

import { formatDate, formatNumberWithCommas } from '@/_utils/format';

interface ReviewCardFrameProps {
  activityId: number;
  bannerImageUrl: string;
  date: string;
  endTime: string;
  headCount: number;
  startTime: string;
  title: string;
  totalPrice: number;
}

/**
 * 카드 프레임 컴포넌트 입니다.
 * @param {string} title - 체험 타이틀 입니다.
 * @param {string} bannerImageUrl - 체험 사진경로 입니다.
 * @param {string} date - 체험 날짜 입니다.
 * @param {string} startTime 체험시작 시간 입니다.
 * @param {string} endTime 체험종료 시간 입니다.
 * @param {number} headCount - 체험 인원수 입니다.
 * @param {number} totalPrice - 체험 가격 입니다.
 */

export default function ReviewCardFrame({ activityId, title, bannerImageUrl, date, startTime, endTime, headCount, totalPrice }: ReviewCardFrameProps) {
  return (
    <div className="flex gap-2 overflow-hidden mobile:gap-6">
      <div>
        <div className="relative aspect-square min-w-[100px] overflow-hidden rounded-xl mobile:w-[126px]">
          <Link href={`/activity/details/${activityId}`}>
            <Image
              src={bannerImageUrl}
              fill
              alt={`${title} 사진`}
              sizes="max-width:100%"
              priority
              className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden font-bold mobile:gap-4">
        <Link href={`/activity/details/${activityId}`} className="break-keep text-lg leading-[1.6] mobile:text-xl mobile:leading-[1.3]">
          {title}
        </Link>
        <div className="flex flex-wrap gap-0.5 text-md font-regular leading-[1.7] mobile:gap-2 mobile:text-2lg mobile:leading-[1.3]">
          <span>{formatDate(date)}</span>
          <span>·</span>
          <span>
            {startTime} - {endTime}
          </span>
          <span>·</span>
          <span>{headCount}명</span>
        </div>
        <div className="h-px w-full bg-nomad-black opacity-10" />
        <span className="text-xl leading-none mobile:text-3xl mobile:leading-none">₩{formatNumberWithCommas(totalPrice)}</span>
      </div>
    </div>
  );
}
