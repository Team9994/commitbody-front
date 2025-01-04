import clientApi from '@/lib/clientAxios';

const Profile = {
  GET_USER_INFO: (nickname: string) => `/api/v1/my-page/${nickname}`,
  GET_USER_ARTICLES: (id: string) => `/api/v1/my-page/articles/${id}`,
  PUT_USER_INFO: () => `/api/v1/profile`,
};

export const getUserInfo = async (nickname: string) => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${Profile.GET_USER_INFO(nickname)}`
    );

    return res.data.data;
  } catch (error) {
    console.error('Failed to get user info:', error);
    return null;
  }
};

export const getUserArticle = async ({
  id,
  type,
  size,
  lastId,
}: {
  id: string;
  type: 'EXERCISE' | 'INFO_QUESTION';
  size: number;
  lastId: number | undefined;
}) => {
  const params = {
    size,
    type,
    lastId,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${Profile.GET_USER_ARTICLES(id)}`,
      {
        params,
      }
    );
    console.log(res + '무한');
    return res.data.data;
  } catch (error) {
    console.error('Failed to get user info:', error);
    return null;
  }
};

export const updateUserProfile = async (
  profileUpdateRequest: {
    nickname: string;
    gender: 'MALE' | 'FEMALE';
    birthDay: string; // Format: YYYY-MM-DD
    height: string;
    weight: string;
    boneMineralDensity: number;
    bodyFatPercentage: number;
    deleteProfile: boolean;
  },
  file?: File | null // Optional profile image file
) => {
  const formData = new FormData();

  // Append profile update data
  formData.append('profileUpdateRequest', JSON.stringify(profileUpdateRequest));

  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  try {
    const res = await clientApi.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${Profile.PUT_USER_INFO()}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return null;
  }
};
