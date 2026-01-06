/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="flex items-center gap-2 mobile:gap-3">
      <Link href="/main" className="flex items-center gap-1">
        <MapPin className="size-[14px] mobile:size-4" />
        <span className="text-sm mobile:text-md">체험</span>
      </Link>
      <div className="h-3 w-px bg-gray-150" />
      <div className="flex items-center gap-2 mobile:gap-3">
        <AlarmList />
        <div className="flex items-center justify-between gap-[6px]" onClick={toggleDropdown} ref={dropdownRef}>
          <div className="relative size-4 cursor-pointer overflow-hidden rounded-full mobile:size-5">
            <Image src={userProfileImgUrl || defaultProfileImg} alt="profile image" fill sizes="max-width:100%" priority className="object-cover" />
          </div>
          <div className="relative flex items-center gap-[2px]">
            <div className="cursor-pointer text-sm mobile:text-md">{userNickname}</div>
            <div className="size-3 cursor-pointer">
              <Image src={ArrowDown} alt="dropdown arrow" className={`duration-500 ${showList ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            {showList && <HeaderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
}
