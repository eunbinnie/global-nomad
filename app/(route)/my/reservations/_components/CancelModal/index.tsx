'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/_utils/classNames';

import Button from '@/_components/Button';
import Lottie from '@/_components/LottiePlayer';
import Modal from '@/_components/Modal';

import CheckBlack from 'public/assets/lottie/check-black.json';
import Loading from 'public/assets/lottie/loading.json';

interface CancelModalProps {
  isError?: boolean;
  isFirstRender?: boolean;
  isPending?: boolean;
  isSuccess?: boolean;
  message: string;
  onClose: (action?: 'close' | 'cancel' | 'confirm') => void;
}

/**
 * 예약 취소를 확인하거나 취소하는 모달 컴포넌트.
 *
 * 이 모달은 예약 취소 절차 중에 사용되며, 사용자가 예약을 취소할지 여부를 확인합니다.
 * 취소가 진행 중이거나 완료된 상태에 따라 메시지와 버튼 상태가 변경됩니다.
 *
 * @param {CancelModalProps} props - CancelModal 컴포넌트의 속성.
 * @param {boolean} [props.isError] - 오류가 발생한 경우 `true`로 설정됩니다.
 * @param {boolean} [props.isFirstRender] - 첫 렌더링인지 여부를 나타냅니다.
 * @param {boolean} [props.isPending] - 예약 취소가 진행 중인 경우 `true`로 설정됩니다.
 * @param {boolean} [props.isSuccess] - 예약 취소가 성공적으로 완료된 경우 `true`로 설정됩니다.
 * @param {string} props.message - 모달에 표시할 메시지입니다.
 * @param {function} props.onClose - 모달을 닫을 때 호출되는 콜백 함수입니다.
 * 이 함수는 액션을 인자로 받아서 'close', 'cancel', 'confirm' 중 하나의 값을 전달받습니다.
 *
 * @returns {JSX.Element} CancelModal 컴포넌트.
 */
function CancelModal({ message, isFirstRender, isError, isPending, isSuccess, onClose }: CancelModalProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isSuccess]);

  return (
    <Modal isOpen onClose={onClose}>
      <div className={cn('relative mb-6 mt-5 flex w-full max-w-[298px] flex-col items-center px-[65px]', isSuccess && 'px-14')}>
        {(isFirstRender || isSuccess) && <Lottie key={animationKey} className="size-9" animationData={CheckBlack} play loop={false} />}

        <p className={cn('mt-3 break-keep text-center leading-[1.6] text-black', isError && 'mt-5')}>{message}</p>
        <div className="mt-[30px] flex gap-2">
          {isFirstRender ? (
            <>
              <Button variant="white" onClick={onClose} className="h-[38px] w-20 text-sm font-bold">
                아니오
              </Button>
              <Button variant="black" onClick={() => onClose('cancel')} className="h-[38px] w-20 text-sm font-bold">
                취소하기
              </Button>
            </>
          ) : (
            <Button variant="black" onClick={() => onClose(isSuccess ? 'confirm' : 'close')} className="h-[38px] w-20 text-sm font-bold">
              확인
            </Button>
          )}
        </div>
        {isPending && (
          <div className="absolute z-[1] flex size-full items-center justify-center bg-[rgba(255,255,255,0.95)]">
            <Lottie className="size-20" animationData={Loading} play />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CancelModal;
