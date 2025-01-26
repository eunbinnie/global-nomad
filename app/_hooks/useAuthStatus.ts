'use client';

import { useEffect, useState } from 'react';

import type { Response } from '@/_types/authentication';

/**
 * useAuthStatus
 *
 * 사용자의 로그인 상태와 사용자 ID를 반환하는 커스텀 훅입니다.
 * `localStorage`에서 'user'와 'isLoggedIn' 항목을 확인하여 로그인 여부를 판단하고,
 * 사용자 정보가 있을 경우 사용자 ID를 상태로 관리합니다.
 *
 * @returns {boolean} isLogin - 사용자의 로그인 여부를 나타내는 값입니다.
 * @returns {number | null} userId - 사용자의 ID를 나타내는 값입니다. 로그인되어 있지 않으면 null을 반환합니다.
 */
function useAuthStatus() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLogIn');

    if (user) {
      const userData: Response = JSON.parse(user);
      setUserId(userData.user.id);
    }

    setIsLogin(Boolean(user && isLoggedIn));
  }, []);

  return { isLogin, userId };
}

export default useAuthStatus;
