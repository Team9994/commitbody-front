import axios from 'axios';

const RECORD = {
  GET_RECORD_LIST: '/api/v1/record',
  GET_RECORD_DETAIL: (id: string) => `/api/v1/record/${id}`,
  POST_REGISTER_RECORD: '/api/v1/record',
  PUT_UPDATE_RECORD: (id: string) => `/api/v1/record/${id}`,
  DELETE_RECORD: (id: string) => `/api/v1/record/${id}`, // 오타 수정
};

export interface GetRecordPayload {
  year: string;
  month: string;
  session: any;
}

const createAuthHeaders = (session: any) => ({
  Authorization: `Bearer ${session?.accessToken}`,
});

export const getRecord = async ({ year, month, session }: GetRecordPayload) => {
  const params = { year, month };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_RECORD_LIST}`,
      {
        headers: createAuthHeaders(session),
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching record list:', error);
    throw error;
  }
};

export const getRecordDetail = async (recordId: string, session: any) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_RECORD_DETAIL(recordId)}`,
      {
        headers: createAuthHeaders(session),
      }
    );
    return res.data.data;
  } catch (error) {
    console.error('Error fetching record detail:', error);
    throw error;
  }
};

interface PutRecordPayload {
  recordId: string;
  session: any;
  data: any;
}

export const putRecord = async ({ recordId, session, data }: PutRecordPayload) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.PUT_UPDATE_RECORD(recordId)}`,
      data,
      {
        headers: createAuthHeaders(session),
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

interface DeleteRecordPayload {
  recordId: string;
  session: any;
}

export const deleteRecord = async ({ recordId, session }: DeleteRecordPayload) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.DELETE_RECORD(recordId)}`,
      {
        headers: createAuthHeaders(session),
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
