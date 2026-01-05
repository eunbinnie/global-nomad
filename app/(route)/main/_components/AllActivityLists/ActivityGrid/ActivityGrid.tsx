import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import Rating from '@/_components/Rating';

type Activity = {
  bannerImageUrl: string;
  id: string;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
};

interface ActivityGridProps {
  activities?: Activity[];
  isError: boolean;
  isLoading: boolean;
  onClick: (id: string) => void;
}

export default function ActivityGrid({ activities, isLoading, isError, onClick }: ActivityGridProps) {
  if (isError) {
    return (
      <div className="flex h-[384px] w-full items-center justify-center text-xl font-bold">
        데이터를 불러오는데 실패하였습니다.
        <br />
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="mx-auto mb-8 mt-4 grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-5 mobile:mb-10 mobile:mt-7 mobile:grid-cols-3 mobile:grid-rows-3 mobile:gap-x-4 mobile:gap-y-8 tablet:grid-cols-4 tablet:grid-rows-2 tablet:gap-x-6">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={cn(`flex flex-col gap-2 mobile:gap-3 ${i >= 4 ? 'hidden mobile:flex' : ''}`)}>
              <div className="aspect-square animate-pulse rounded-xl bg-gray-150 mobile:rounded-2xl" />
              <div className="grid gap-2">
                <div className="h-4 w-[60px] animate-pulse rounded-md bg-gray-150" />
                <div>
                  <div className="my-[2px] h-5 w-full animate-pulse rounded-md bg-gray-150" />
                  <div className="my-1 h-4 w-20 animate-pulse rounded-md bg-gray-150" />
                </div>
              </div>
            </div>
          ))
        : activities?.map((activity) => (
            <div key={activity.id} className="flex cursor-pointer flex-col gap-2 mobile:gap-3" onClick={() => onClick(activity.id)}>
              <div className="relative aspect-square overflow-hidden rounded-xl mobile:rounded-2xl">
                <Image
                  src={activity.bannerImageUrl}
                  alt={activity.title}
                  fill
                  priority
                  sizes="max-width:100%"
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="grid gap-2">
                <Rating rating={activity.rating} reviewCount={activity.reviewCount} ratingTarget="all" />
                <div>
                  <div className="line-clamp-2 text-ellipsis break-keep text-md font-medium leading-[1.4] mobile:text-base">{activity.title}</div>
                  <div className="text-md font-semibold">
                    ₩ {activity.price.toLocaleString()}
                    <span className="text-sm font-regular text-gray-700"> / 인</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
