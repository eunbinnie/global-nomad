import ActivityListSection from './_components/ActivityListSection';
import Banner from './_components/Banner';

export default function Home() {
  return (
    <div className="box-border flex w-full min-w-full flex-col content-center items-center">
      <Banner />
      <ActivityListSection />
    </div>
  );
}
