import axios from 'axios';
import { useSession } from 'next-auth/react';

const RECORD = {
  GET_RECORD: '/api/v1/record',
  GET_DETAIL_RECORD: '/api/v1/record',
  PUT_RECORD: '/api/v1/record',
  DELETE_RECORD: '/api/v1/record',
};

export interface getRecordPayload {
  year: string;
  month: string;
  session: any;
}

export const getRecord = async ({ year, month, session }: getRecordPayload) => {
  const params = {
    year,
    month,
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_RECORD}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface getDetailRecordPayload {
  id: number;
  session: any;
}

export const getDetailRecord = async ({ id, session }: getDetailRecordPayload) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_DETAIL_RECORD}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface PutRecordPayload {}
export const putRecord = () => {};

interface DeleteRecordPayload {
  recordId: number | undefined;
  session: any;
}

export const deleteRecord = async ({ recordId, session }: DeleteRecordPayload) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.DELETE_RECORD}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
