'use client';

import type { SubImage } from '@/_types/activities/form.types';

import Lottie from '@/_components/LottiePlayer';

import ImagePreview from '../ImagePreview';
import UploadBox from '../UploadBox';

import Loading from 'public/assets/lottie/loading.json';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  count: number;
  editImages?: SubImage[];
  images?: string[];
  isPending?: boolean;
  onClear: (image: string, id?: number) => void;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

function LoadingImage() {
  return (
    <div className="relative aspect-square rounded-xl">
      <div className="absolute z-[1] flex size-full items-center justify-center rounded-xl bg-[rgba(255,255,255,0.4)]">
        <Lottie className="size-20" animationData={Loading} loop play />
      </div>
    </div>
  );
}

/**
 * FileInput 컴포넌트는 사용자가 이미지를 업로드하거나, 기존 이미지를 수정할 수 있는 기능을 제공합니다.
 * 이미지 미리보기, 삭제 기능, 로딩 애니메이션 등을 지원합니다.
 *
 * @param {string[]} images - 새로 업로드된 이미지 URL 배열.
 * @param {SubImage[]} editImages - 수정 중인 기존 이미지 배열, SubImage 객체를 포함합니다.
 * @param {function} onClear - 이미지 삭제 버튼 클릭 시 호출되는 함수. 삭제할 이미지 URL과 해당 이미지의 ID(선택 사항)를 인수로 받습니다.
 * @param {boolean} isPending - 이미지 업로드 중인 상태를 나타내는 boolean 값.
 * @param {number} count - 로딩 상태를 나타내는 빈 슬롯의 개수.
 */

function FileInput({ images, editImages, isPending, onClear, onDrop, ...rest }: FileInputProps) {
  return (
    <div className="grid">
      <div className="grid grid-cols-2 gap-2 tablet:gap-4 pc:grid-cols-4 pc:gap-6">
        <UploadBox {...rest} onDrop={onDrop} />
        {editImages?.map((image, idx) =>
          image.imageUrl !== 'loading' ? (
            <ImagePreview key={idx} imageSrc={image.imageUrl} onClick={() => onClear(image.imageUrl, image?.id)} />
          ) : (
            <LoadingImage key={idx} />
          ),
        )}
        {images?.map((image, idx) =>
          image !== 'loading' ? <ImagePreview key={idx} imageSrc={image} onClick={() => onClear(image)} /> : <LoadingImage key={idx} />,
        )}

        {isPending && (
          <div className="relative aspect-square rounded-xl">
            <div className="absolute z-[1] flex size-full items-center justify-center rounded-xl bg-[rgba(255,255,255,0.4)]">
              <Lottie className="size-20" animationData={Loading} loop play />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileInput;
