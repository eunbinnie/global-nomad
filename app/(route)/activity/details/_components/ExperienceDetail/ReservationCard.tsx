import { LockKeyhole } from 'lucide-react';

import Calendar from '../Calendar';

interface ReservationCardProps {
  currentUserId: number | null;
  experienceId: number;
  experienceUserId: number;
}

function ReservationCard({ experienceUserId, currentUserId, experienceId }: ReservationCardProps) {
  return (
    <div className="relative">
      {/* mobile */}
      <div className="fixed inset-x-0 bottom-0 z-[999] flex justify-center mobile:hidden">
        <div className="w-full bg-white shadow-md">
          <Calendar activityId={experienceId} />
        </div>
        {(currentUserId === null || currentUserId === experienceUserId) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/90">
            <LockKeyhole size={14} />
            {currentUserId === null ? <p className="text-sm">로그인 후 예약 가능합니다.</p> : <p className="text-sm">본인 체험은 예약할 수 없어요.</p>}
          </div>
        )}
      </div>
      {/* pc */}
      <div className="sticky top-[78px] hidden w-full pr-[24px] mobile:block tablet:pr-0">
        <div className="w-full rounded-lg bg-white shadow-md">
          <Calendar activityId={experienceId} />
        </div>
        {(currentUserId === null || currentUserId === experienceUserId) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/90">
            <LockKeyhole size={20} />
            {currentUserId === null ? <p>로그인 후 예약 가능합니다.</p> : <p>본인 체험은 예약할 수 없어요.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
