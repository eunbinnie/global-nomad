import Image from 'next/image';
import Link from 'next/link';

import type { ContentsType } from '@/_types/card';

import ContentWrapper from './_components/CardContentsWrapper';

interface CardFrameProps<T extends ContentsType> {
  activityId: number;
  contents: T;
  img: string;
}

export default function CardFrame<T extends ContentsType>({ contents, img, activityId }: CardFrameProps<T>) {
  return (
    <div className="group flex h-[204px] w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] under-tablet:h-[156px] under-mobile:h-[128px]">
      <div className="relative size-full max-h-[204px] max-w-[204px] overflow-hidden under-tablet:max-w-[156px] under-mobile:max-w-[128px]">
        <Link href={`/activity/details/${activityId}`} className="absolute left-0 top-0 z-[1] size-full">
          <Image
            src={img}
            alt={`${contents.title} img`}
            fill
            priority
            sizes="max-width:100%"
            className="transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          />
        </Link>
      </div>
      <ContentWrapper contents={contents} activityId={activityId} />
    </div>
  );
}
