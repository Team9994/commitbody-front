import axios from 'axios';

const EXERCISE = {
  GET_SEARCH: '/api/v1/search-exercise',
  POST_CUSTOM_EXERCISE: '/api/v1/save-exercise',
  POST_LIKE_REGISTER: '/api/v1/interest-exercise',
};

export const getSearchExercise = async (session: any, filters: any, size: number, from: number) => {
  const params = {
    ...filters,
    from,
    size,
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_SEARCH}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );

    return res.data.data.exercise;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface CustomExercisePayload {
  name: string;
  bodyPart: string;
  tool: string;
  image?: File;
  session: any;
}

export const postCustomExercise = async (data: CustomExercisePayload) => {
  const formData = new FormData();
  const customExerciseRequest = JSON.stringify({
    exerciseName: data.name,
    exerciseEquipment: data.tool,
    exerciseTarget: data.bodyPart,
  });

  formData.append('customExerciseRequest', customExerciseRequest);
  if (data.image) {
    formData.append('file', data.image);
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_CUSTOM_EXERCISE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${data.session?.accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error saving custom exercise:', error);
    throw error;
  }
};

interface LikeRegister {
  exerciseId: number;
  source: 'custom' | 'default';
  session: any;
}

export const postLikeRegister = async (data: LikeRegister) => {
  try {
    const body = {
      exerciseId: data.exerciseId,
      source: data.source + '_',
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_LIKE_REGISTER}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${data.session?.accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error interest-exercise', error);
    throw error;
  }
};
