import type { GetUserType } from '@/_types/user';

import axiosInstance from './axios';

export const getUserProfile = async (): Promise<GetUserType> => {
  const response = await axiosInstance.get<GetUserType>('/users/me');
  return response.data;
};

export const patchUserProfile = async (data: Partial<GetUserType>): Promise<GetUserType> => {
  const response = await axiosInstance.patch<GetUserType>('/users/me', data);
  return response.data;
};

export const generateProfileImageURl = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await axiosInstance.post<{ profileImageUrl: string }>('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.profileImageUrl;
};
