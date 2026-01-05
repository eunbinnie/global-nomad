'use client';

import Image from 'next/image';

import MoveLeftIcon from 'public/assets/icons/move-left.svg';
import MoveRightIcon from 'public/assets/icons/move-right.svg';

interface ImageSliderProps {
  allImages: string[];
  currentImageIndex: number;
  handleNextImage: () => void;
  handlePrevImage: () => void;
  isMobile: boolean;
}

export default function ImageSlider({ allImages, currentImageIndex, handlePrevImage, handleNextImage, isMobile }: ImageSliderProps) {
  return (
    <div>
      {isMobile ? (
        <div className="relative h-[310px] w-full">
          <Image src={allImages[currentImageIndex]} alt={`이미지 ${currentImageIndex + 1}`} fill sizes="max-width:100%" className="object-cover" priority />
          <div onClick={handlePrevImage} className="absolute left-[15px] top-1/2 -translate-y-1/2 transform cursor-pointer">
            <Image src={MoveLeftIcon} alt="왼쪽으로 이동" width={24} height={24} />
          </div>
          <div onClick={handleNextImage} className="absolute right-[15px] top-1/2 -translate-y-1/2 transform cursor-pointer">
            <Image src={MoveRightIcon} alt="오른쪽으로 이동" width={24} height={24} />
          </div>
        </div>
      ) : (
        <div className="mb-[24px] grid h-[310px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[12px] tablet:mb-[84px] tablet:h-[534px]">
          <div className="relative col-span-2 row-span-2 size-full">
            <Image src={allImages[0]} alt="첫 번째 이미지" fill sizes="max-width:100%" className="object-cover" priority />
          </div>
          {allImages.slice(1).map((img, index) => (
            <div key={index} className="relative size-full">
              <Image src={img} alt={`나머지 이미지 ${index + 1}`} fill sizes="max-width:100%" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
