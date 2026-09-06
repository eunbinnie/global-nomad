import { motion } from 'framer-motion';

import Lottie from '@/_components/LottiePlayer';

import EmptyAnimation from 'public/assets/lottie/empty-lottie.json';

function NoReservation() {
  return (
    <section className="grid gap-3 pt-[60px] tablet:gap-5 tablet:pt-[86px]">
      <div className="mx-auto aspect-square w-full max-w-[140px]">
        <Lottie animationData={EmptyAnimation} play loop={false} />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 1 }}
        className="break-keep text-center text-md font-medium leading-[1.2] text-gray-600 tablet:text-base"
      >
        아직 등록한 체험이 없어요
      </motion.p>
    </section>
  );
}

export default NoReservation;
