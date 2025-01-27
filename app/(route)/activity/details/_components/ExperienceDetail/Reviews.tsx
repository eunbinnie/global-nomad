import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Pagination from '@/(route)/main/_components/Pagination';

import DefaultProfileImage from 'public/assets/icons/default-profile.svg';
import Start from 'public/assets/icons/star.svg';

interface Review {
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
}

interface ApiResponse {
  reviews: Review[];
  totalCount: number;
}

interface ReviewSectionProps {
  activityId: number;
  averageRating: number;
  getSatisfactionLabel: (rating: number) => string;
  totalReviews: number;
}

export default function Reviews({ averageRating, totalReviews, getSatisfactionLabel, activityId }: ReviewSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const [reviews, setReviews] = useState<Review[]>([]);
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${activityId}/reviews?page=${currentPage}&limit=${reviewsPerPage}`);

        const data: ApiResponse = await response.json();

        if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          throw error;
        }
      }
    };

    void fetchReviews();
  }, [currentPage, activityId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToNextSet = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousSet = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="mb-[24px] border-t pt-[40px]" style={{ borderColor: 'rgba(17, 34, 17, 0.25)', borderTopWidth: '1px' }}>
      <div className="px-[24px] tablet:px-0">
        <div className="mb-[24px] text-2lg font-bold text-nomad-black">후기</div>
        <div className="mb-[24px] flex gap-[16px]">
          <div className="text-[50px] font-[600]">{averageRating.toFixed(1)}</div>
          <div className="flex flex-col justify-center text-nomad-black">
            <div>{getSatisfactionLabel(averageRating)}</div>
            <div className="flex items-center gap-[6px]">
              <Image src={Start} alt="별" />
              {totalReviews}개 후기
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[72px] space-y-[24px]">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review.id}
              className={`flex gap-[16px] px-[24px] pb-[24px] tablet:px-0 ${index !== reviews.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div style={{ flexBasis: '45px' }}>
                <Image
                  src={review.user.profileImageUrl || DefaultProfileImage}
                  alt={`${review.user.nickname} 프로필 이미지`}
                  width={45}
                  height={45}
                  className="size-[45px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-start">
                <div className="my-[4px] flex items-center">
                  <p className="text-lg font-bold text-nomad-black">{review.user.nickname}</p>
                  <span className="mx-2 text-black">|</span>
                  <p className="text-lg text-gray-500">
                    {new Date(review.createdAt)
                      .toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })
                      .replace(/\//g, '. ')}
                  </p>
                </div>
                <p className="text-lg text-nomad-black">{review.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">리뷰가 없습니다.</p>
        )}
      </div>
      {reviews.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          goToNextSet={goToNextSet}
          goToPage={handlePageChange}
          goToPreviousSet={goToPreviousSet}
        />
      )}
    </section>
  );
}
