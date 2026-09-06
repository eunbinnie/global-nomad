'use client';

import { useRouter } from 'next/navigation';

import Button from '@/_components/Button';
import Lottie from '@/_components/LottiePlayer';

import fail from 'public/assets/lottie/fail.json';
import loading from 'public/assets/lottie/loading.json';
import success from 'public/assets/lottie/success.json';

export function LoadingModal() {
  return (
    <div className="flex size-full items-start justify-center overflow-y-auto bg-white">
      <div className="my-auto flex flex-col items-center justify-center">
        <Lottie animationData={loading} play className="size-20" />
      </div>
    </div>
  );
}

export function SuccessModal({ activityId }: { activityId: number }) {
  const router = useRouter();

  return (
    <div className="flex size-full items-start justify-center overflow-y-auto bg-white">
      <div className="my-auto flex flex-col items-center justify-center gap-3">
        <Lottie animationData={success} play className="size-40" />
        <h5 className="text-xl font-bold">후기 작성 완료</h5>
        <span>후기를 작성해 주셔서 감사합니다.</span>
        <Button variant="white" onClick={() => router.push(`/activity/details/${activityId}`)} className="mt-5 px-5 py-1 font-medium">
          체험 후기 확인하기
        </Button>
      </div>
    </div>
  );
}

export function FailModal() {
  return (
    <div className="flex size-full items-start justify-center overflow-y-auto bg-white">
      <div className="my-auto flex flex-col items-center justify-center gap-3">
        <Lottie animationData={fail} play className="size-40" />
        <h5 className="text-xl font-bold">후기 작성 실패</h5>
        <span>죄송합니다. 후기 작성에 실패했습니다.</span>
      </div>
    </div>
  );
}
