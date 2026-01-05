'use client';

import { useState } from 'react';

import AllActivityLists from '../AllActivityLists';
import HotActivityLists from '../HotActivityLists';
import SearchBox from '../SearchBox';

function ActivityListSection() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <SearchBox onSearch={handleSearch} />
      <div className="relative bottom-[20px] mx-auto w-full px-[16px] lg:max-w-[1200px] mobile:bottom-[20px] mobile:px-[24px]">
        {searchValue === '' && <HotActivityLists />}
        <AllActivityLists searchValue={searchValue} />
      </div>
    </>
  );
}

export default ActivityListSection;
