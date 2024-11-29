import axios from 'axios';

const Profile = {
  GET_USER_INFO: (nickname: string) => `/api/v1/my-page/${nickname}`,
  GET_USER_ARTICLES: (id: number) => `/api/v1/my-page/articles/${id}`,
};

export const getUserInfo = async (nickname: string, session: any) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${Profile.GET_USER_INFO(nickname)}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  return res.data.data;
};
