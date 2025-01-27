'use client';

import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { postActivity } from '@/_apis/activities/activityForm';
import { useMutation } from '@tanstack/react-query';

import type { Activity, ErrorResponseMessage } from '@/_types/activities/form.types';

import useModalState from '@/_hooks/useModalState';

import CommonModal from '../../../_components/CommonModal';
import ActivityForm from '../ActivityRegisterForm';

/**
 * 체험 등록 페이지 렌더링 및 modal 상태관리, data post하는 컴포넌트입니다.
 */
function RegisterLayout() {
  const router = useRouter();
  const { modalState, setModalState, activeCloseModal } = useModalState();

  const activityMutation = useMutation({
    mutationFn: postActivity,
    onSuccess: (res) => {
      const { id } = res.data;
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        message: '체험 등록이 완료되었습니다',
        onClose: () => {
          router.push(`/activity/details/${id}`);
        },
      }));
    },
    onError: (error: AxiosError<ErrorResponseMessage>) => {
      if (error.response) {
        const { status } = error.response;
        const message = status === 500 ? '죄송합니다. 체험 등록에 실패했습니다.' : error.response.data.message;
        if (status === 401) {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
            onClose: () => {
              router.push('/login');
            },
          }));
        } else {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message,
          }));
        }
      }
    },
  });

  const { isPending } = activityMutation;

  const onSubmitForm = (formData: Activity) => {
    activityMutation.mutate(formData);
  };

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} activeCloseModal={activeCloseModal}>
        {modalState.message}
      </CommonModal>
      <ActivityForm title="내 체험 등록" buttonTitle="등록하기" onSubmit={onSubmitForm} isPending={isPending} />
    </>
  );
}

export default RegisterLayout;
