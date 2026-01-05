import { fetchExperienceData } from '@/_apis/activities/fetchExperienceData';

import ExperienceClientPage from '../_components/ExperienceClientPage';

type Params = {
  id: string;
};

async function ExperiencePage({ params }: { params: Params }) {
  const { id: activityId } = params;

  const data = await fetchExperienceData(activityId);

  return <ExperienceClientPage activityId={activityId} data={data} />;
}

export default ExperiencePage;
