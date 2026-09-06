'use client';

import type { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/_components/Button';
import Lottie from '@/_components/LottiePlayer';

import checkAnimation from 'public/assets/lottie/check-black.json';

interface ReviewConfirmProps {
  confirmModal: boolean;
  handleSubmit: () => void;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
}

function ReviewConfirmModal({ confirmModal, setConfirmModal, handleSubmit }: ReviewConfirmProps) {
  const closeModal = () => {
    setConfirmModal(false);
  };

  const activeCloseModal = () => {
    setConfirmModal(false);
    handleSubmit();
  };

  return (
    <AnimatePresence>
      {confirmModal && (
        <div className="absolute left-0 top-0 size-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute left-0 top-0 size-full bg-black mobile:rounded-xl"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.8 }}
            transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 0.2 }}
            className="absolute bottom-0 grid w-full gap-4 rounded-t-xl bg-white px-4 pb-[45px] pt-6 mobile:rounded-xl mobile:px-6 mobile:pt-7"
          >
            <Lottie animationData={checkAnimation} play loop={false} className="mx-auto size-10" />
            <p className="grid gap-2">
              <span className="text-center font-bold mobile:text-xl">작성하신 후기를 등록하시겠습니까?</span>
              <span className="text-center">후기를 등록한 후에는 수정하거나 삭제할 수 없습니다.</span>
            </p>
            <div className="mx-auto mt-2 flex flex-wrap justify-center gap-3 px-4 mobile:px-6">
              <Button variant="white" onClick={closeModal} className="w-[120px] py-2">
                이어서 작성
              </Button>
              <Button variant="black" className="w-[120px] py-2" onClick={activeCloseModal}>
                등록하기
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ReviewConfirmModal;
