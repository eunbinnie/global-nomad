'use client';

import Image from 'next/image';

import Rating from '@/_components/Rating';

import Dropdown from '../Dropdown';

import Location from 'public/assets/icons/Location.svg';

interface ExperienceInfoProps {
  averageRating: number;
  currentUserId: number | null;
  experience: {
    address: string;
    category: string;
    creatorId: number;
    title: string;
  };
  handleDelete: () => void;
  handleEdit: () => void;
  totalReviews: number;
}

export default function ExperienceInfo({ experience, averageRating, totalReviews, currentUserId, handleEdit, handleDelete }: ExperienceInfoProps) {
  return (
    <div className="px-[16px] mobile:px-0">
      <div className="mb-[10px] text-md text-nomad-black">{experience.category}</div>
      <div className="mb-[10px] flex items-center justify-between">
        <h1 className="text-2xl font-bold mobile:text-[3xl]">{experience.title}</h1>
        <div className="relative">
          {currentUserId === experience.creatorId && (
            <div className="relative">
              <Dropdown onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-[20px] flex items-center gap-2">
        <span className="text-md text-nomad-black">
          <Rating rating={averageRating} reviewCount={totalReviews} ratingTarget="detail" />
        </span>
        <span className="flex items-center gap-[2px]">
          <div className="relative aspect-[2/3] h-[18px] w-4">
            <Image src={Location} alt="Location" fill />
          </div>
          <span className="text-md text-nomad-black">{experience.address}</span>
        </span>
      </div>
    </div>
  );
}
