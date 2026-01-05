'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { fetchReviewsData } from '@/_apis/activities/fetchReviewsData';

import type { Experience } from '@/_types/details/types';

import useUserStore from '@/_stores/useUserStore';

import ExperienceDetail from '../ExperienceDetail';

interface ExperienceClientPageProps {
  activityId: string;
  data: Experience;
}

export default function ExperienceClientPage({ activityId, data }: ExperienceClientPageProps) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const { user, setLoginStatus } = useUserStore();
  const currentUserId = user?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await fetchReviewsData(activityId);

        setTotalReviews(reviewsData.totalCount);
        setAverageRating(reviewsData.averageRating);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(`activity detail error: ${err.message}`);
        }
      }
    };

    void fetchData();
  }, [activityId]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLogIn');

    if (storedUser && isLoggedIn) {
      const parsedUser = JSON.parse(storedUser);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setLoginStatus(true, parsedUser);
    }
  }, [setLoginStatus]);

  return <ExperienceDetail averageRating={averageRating} experience={data} totalReviews={totalReviews} currentUserId={currentUserId || null} />;
}
