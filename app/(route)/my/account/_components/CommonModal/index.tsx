import Button from '@/_components/Button';
import Lottie from '@/_components/LottiePlayer';
import Modal from '@/_components/Modal';

import Loading from 'public/assets/lottie/loading.json';

interface ModalProps {
  activeCloseModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
  isPending: boolean;
  message: string;
  mode?: 'alert' | 'confirm';
}

/**
 * 내 정보 수정 페이지에서 공통으로 사용하는 모달입니다.
 */
function CommonModal({ mode = 'alert', message, isOpen, closeModal, activeCloseModal, isPending }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={mode === 'confirm' ? closeModal : activeCloseModal}>
      <div className="relative">
        <div className="flex h-[220px] w-[540px] max-w-[calc(100vw-48px)] items-end p-7 tablet:h-[250px]">
          <div className="grid w-full gap-12 tablet:gap-[45px]">
            <span className="break-keep text-center text-2lg font-medium text-[#333236]">{message}</span>
            <Button
              borderRadius="8px"
              className="mx-auto h-[42px] w-[138px] font-medium tablet:ml-auto tablet:mr-0 tablet:h-[48px] tablet:w-[120px]"
              variant="black"
              onClick={activeCloseModal}
            >
              확인
            </Button>
          </div>
        </div>
        {isPending && (
          <div className="absolute left-0 top-0 z-[1] flex size-full items-center justify-center rounded-xl bg-[rgba(255,255,255,0.95)]">
            <Lottie className="size-20" animationData={Loading} play />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CommonModal;
