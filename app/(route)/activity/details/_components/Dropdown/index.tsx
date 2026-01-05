'use client';

import { useState } from 'react';
import Image from 'next/image';

import OptionMenuIcon from 'public/assets/icons/option-menu.svg';

interface DropdownProps {
  onDelete: () => void;
  onEdit: () => void;
}

export default function Dropdown({ onEdit, onDelete }: DropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button type="button" onClick={toggleDropdown} className="relative size-5 cursor-pointer md:size-7">
        <Image src={OptionMenuIcon} alt="옵션 메뉴" fill priority />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 cursor-pointer rounded-md border border-gray-200 bg-white shadow-md">
          <div>
            <div
              className="block h-[58px] w-[160px] border-b border-gray-200 px-[46px] py-[18px] text-center text-2lg font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => {
                onEdit();
                setDropdownOpen(false);
              }}
            >
              수정하기
            </div>
            <div
              className="block h-[58px] w-[160px] px-[46px] py-[18px] text-center text-2lg font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => {
                onDelete();
                setDropdownOpen(false);
              }}
            >
              삭제하기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
