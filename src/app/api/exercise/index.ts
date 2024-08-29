import { Filters } from '@/app/exercise-list/types';
import axios from 'axios';

const EXERCISE = {
  GET_SEARCH: '/api/v1/search-exercise',
  POST_CUSTOM_EXERCISE: '/api/v1/save-exercise',
  POST_LIKE_REGISTER: '/api/v1/interest-exercise',
};

interface SearchExercisePayload {
  filters: Filters;
  size: number;
  from: number;
  session: any;
}

export const getSearchExercise = async ({
  session,
  filters,
  size,
  from,
}: SearchExercisePayload) => {
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

export const postCustomExercise = async ({
  name,
  bodyPart,
  tool,
  image,
  session,
}: CustomExercisePayload) => {
  const formData = new FormData();
  const customExerciseRequest = JSON.stringify({
    exerciseName: name,
    exerciseEquipment: tool,
    exerciseTarget: bodyPart,
  });

  formData.append('customExerciseRequest', customExerciseRequest);
  if (image) {
    formData.append('file', image);
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_CUSTOM_EXERCISE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
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

export const postLikeRegister = async ({ exerciseId, source, session }: LikeRegister) => {
  try {
    const body = {
      exerciseId: exerciseId,
      source: source + '_',
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_LIKE_REGISTER}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error interest-exercise', error);
    throw error;
  }
};
