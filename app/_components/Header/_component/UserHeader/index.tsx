/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import useBackgroundClick from '@/_hooks/useBackgroundClick';

import AlarmList from '../AlarmList';
import HeaderDropdown from '../HeaderDropDown';

import ArrowDown from 'public/assets/icons/arrow-down.svg';
import defaultProfileImg from 'public/assets/icons/default-profile.svg';

export default function UserHeader() {
  const [showList, setShowList] = useState(false);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [userProfileImgUrl, setUserProfileImgUrl] = useState<string | null>(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserNickname(parsedUser?.user.nickname || 'error');
      setUserProfileImgUrl(parsedUser ? parsedUser.user.profileImageUrl : defaultProfileImg);
    }
  }, []);

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };

  useBackgroundClick({
    ref: dropdownRef,
    handler: () => setShowList(false),
  });

  return (
    <div className="flex items-center">
      <div className="cursor-pointer border-r border-gray-200 pr-3 md:pr-[25px]">
        <AlarmList />
      </div>
      <div className="ml-3 flex items-center justify-between gap-[10px] md:ml-[25px]" onClick={toggleDropdown} ref={dropdownRef}>
        <div className="relative size-8 cursor-pointer overflow-hidden rounded-full">
          <Image src={userProfileImgUrl || defaultProfileImg} alt="profile image" fill sizes="max-width:100%" priority className="object-cover" />
        </div>
        <div className="relative flex items-center gap-1">
          <div className="cursor-pointer">{userNickname}</div>
          <div className="size-4 cursor-pointer">
            <Image src={ArrowDown} alt="dropdown arrow" className={`duration-500 ${showList ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {showList && <HeaderDropdown />}
        </div>
      </div>
    </div>
  );
}
