/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useGetActivities from '@/_hooks/activities/useGetActivities';

import Rating from '@/_components/Rating';

import usePrevNextButtons, { NextButton, PrevButton } from './HotListsCarouselBtn';

import Spinner from 'public/assets/icons/spinner.svg';

export default function HotListsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const router = useRouter();

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 10,
    sort: 'most_reviewed',
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Image src={Spinner} alt="로딩중" className="size-20 mobile:size-32" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex h-full items-center justify-center text-base font-bold mobile:text-3xl">문제가 발생했습니다!</div>
      </div>
    );
  }

  return (
    <div className="embla relative w-full overflow-hidden">
      <div className="mb-1 flex items-center justify-between mobile:mb-5">
        <div className="text-2xl mobile:text-[36px] mobile:leading-[43px]">🔥 인기 체험</div>
        <div className="flex items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="mb-6" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y touch-pinch-zoom">
          {data?.activities.map((activity, i) => (
            <div
              onClick={() => router.push(`/activity/details/${activity.id}`)}
              className="embla__slide group relative aspect-square min-w-0 shrink-0 grow-0 basis-[186px] cursor-pointer mobile:basis-[384px]"
              key={i}
            >
              <div className="h-full transform rounded-3xl transition-transform duration-300 hover:translate-y-[-10px] group-hover:shadow-lg group-hover:shadow-gray-400">
                <div
                  className="absolute bottom-0 z-[1] h-3/5 w-[186px] rounded-[24px] mobile:w-[368px]"
                  style={{ background: 'linear-gradient(to top, rgba(30,30,30,0.8), transparent)' }}
                />
                <div className="absolute bottom-6 left-6 z-[1] flex flex-col gap-0 text-white mobile:gap-5">
                  <Rating rating={activity.rating} reviewCount={activity.reviewCount} ratingTarget="hot" />
                  <div className="mr-[20px] max-h-[80px] break-keep text-lg mobile:max-h-[130px] mobile:text-[28px] mobile:leading-[42px]">
                    {activity.title}
                  </div>
                  <div className="text-md mobile:text-2lg">
                    ₩ {activity.price.toLocaleString()}
                    <span className="text-md font-regular"> /인</span>
                  </div>
                </div>
                <Image src={activity.bannerImageUrl} alt={activity.title} priority fill sizes="max-width:100%" className="rounded-3xl object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
