import { Filters } from '@/app/exercise-list/types';
import clientApi from '@/lib/clientAxios';
import axios from 'axios';

const EXERCISE = {
  GET_SEARCH: '/api/v1/search-exercise',
  POST_CUSTOM_EXERCISE: '/api/v1/save-exercise',
  POST_LIKE_REGISTER: '/api/v1/interest-exercise',
  PUT_CUSTOM_EXERCISE: '/api/v1/update-exercise',
  DELETE_CUSTOM_EXERCISE: '/api/v1/delete-exercise',
};

interface SearchExercisePayload {
  filters: Filters;
  size: number;
  from: number;
}

export const getSearchExercise = async ({ filters, size, from }: SearchExercisePayload) => {
  const params = {
    ...filters,
    from,
    size,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_SEARCH}`,
      {
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
}

export const postCustomExercise = async ({
  name,
  bodyPart,
  tool,
  image,
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
    const response = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_CUSTOM_EXERCISE}`,
      formData
    );

    return response;
  } catch (error) {
    console.error('Error saving custom exercise:', error);
    throw error;
  }
};

interface PutCustomExercisePayload {
  customExerciseId: string | null;
  name: string;
  bodyPart: string;
  tool: string;
  source: string;
  image?: File;
}

export const putCustomExercise = async ({
  customExerciseId,
  name,
  bodyPart,
  tool,
  source,
  image,
}: PutCustomExercisePayload) => {
  const formData = new FormData();

  const customUpdateExerciseRequest = JSON.stringify({
    customExerciseId: customExerciseId,
    exerciseName: name,
    exerciseEquipment: tool,
    exerciseTarget: bodyPart,
    source: source,
  });

  formData.append('customUpdateExerciseRequest', customUpdateExerciseRequest);

  if (image) {
    formData.append('file', image);
  }

  try {
    const response = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.PUT_CUSTOM_EXERCISE}`,
      formData
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
}

export const postLikeRegister = async ({ exerciseId, source }: LikeRegister) => {
  try {
    const body = {
      exerciseId: exerciseId,
      source: source + '_',
    };

    const response = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_LIKE_REGISTER}`,
      body
    );

    return response.data;
  } catch (error) {
    console.error('Error interest-exercise', error);
    throw error;
  }
};

interface DeleteCustomExcercisePayload {
  id: string;
}
export const deleteCustomExercise = async ({ id }: DeleteCustomExcercisePayload) => {
  const params = {
    id,
  };

  try {
    const response = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.DELETE_CUSTOM_EXERCISE}`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error interest-exercise', error);
    throw error;
  }
};
