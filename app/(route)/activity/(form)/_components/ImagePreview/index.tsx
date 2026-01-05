import Image from 'next/image';

import DeleteIcon from 'public/assets/icons/delete.svg';

interface ImagePreviewProps {
  imageSrc: string;
  onClick: () => void;
}

/**
 * ImagePreview 컴포넌트는 사용자가 업로드한 이미지를 미리보기 형태로 표시하며,
 * 해당 이미지를 삭제할 수 있는 기능을 제공합니다.
 *
 * @param {string} imageSrc - 미리보기할 이미지의 URL.
 * @param {function} onClick - 이미지 삭제 버튼을 클릭했을 때 호출되는 함수.
 */
function ImagePreview({ imageSrc, onClick }: ImagePreviewProps) {
  return (
    <div className="relative aspect-square rounded-xl">
      <Image fill sizes="max-width:100%" src={imageSrc} alt="이미지 미리보기" priority className="rounded-xl object-cover" />
      <button type="button" onClick={onClick} className="absolute -right-2 -top-2 size-6 pc:-right-5 pc:-top-5 pc:size-10">
        <Image src={DeleteIcon} alt="삭제" />
      </button>
    </div>
  );
}

export default ImagePreview;
