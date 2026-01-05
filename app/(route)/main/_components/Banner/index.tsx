import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import getActivities from '@/_libs/activities/activitiesApi';

import Carousel from '@/_components/Carousel';

export default async function Banner() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main-banner'],
    queryFn: () =>
      getActivities({
        method: 'cursor',
        cursorId: null,
        size: 3,
        sort: 'most_reviewed',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative h-[240px] w-full mobile:h-[540px]">
        <Carousel />
      </div>
    </HydrationBoundary>
  );
}
