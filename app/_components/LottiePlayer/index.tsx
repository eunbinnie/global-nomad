'use client';

import dynamic from 'next/dynamic';

// lottie-web은 모듈 로드 시점에 document에 접근하므로 SSR에서 로드하면 안 된다
const LottiePlayer = dynamic(() => import('react-lottie-player'), { ssr: false });

export default LottiePlayer;
