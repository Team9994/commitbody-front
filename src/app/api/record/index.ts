import clientApi from '@/lib/clientAxios';

const RECORD = {
  GET_RECORD_LIST: '/api/v1/record',
  GET_RECORD_DETAIL: (id: string) => `/api/v1/record/${id}`,
  POST_REGISTER_RECORD: '/api/v1/record',
  PUT_UPDATE_RECORD: (id: string) => `/api/v1/record/${id}`,
  DELETE_RECORD: (id: string) => `/api/v1/record/${id}`,
};

export interface GetRecordPayload {
  year: string;
  month: string;
}

export const getRecord = async ({ year, month }: GetRecordPayload) => {
  const params = { year, month };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_RECORD_LIST}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching record list:', error);
    throw error;
  }
};

export const getRecordDetail = async (recordId: string) => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.GET_RECORD_DETAIL(recordId)}`
    );
    return res.data.data;
  } catch (error) {
    console.error('Error fetching record detail:', error);
    throw error;
  }
};

export const postRegisterRecord = async (payload: any) => {
  const res = await clientApi.post(RECORD.POST_REGISTER_RECORD, payload);
  return res.data.data;
};

// export interface getRecordPayload {
//   year: string;
//   month: string;
//   session: any;
// }
interface PutRecordPayload {
  recordId: string;
  data: any;
}

export const putRecord = async ({ recordId, data }: PutRecordPayload) => {
  try {
    const res = await clientApi.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.PUT_UPDATE_RECORD(recordId)}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

interface DeleteRecordPayload {
  recordId: string;
}

export const deleteRecord = async ({ recordId }: DeleteRecordPayload) => {
  try {
    const res = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${RECORD.DELETE_RECORD(recordId)}`
    );
    return res.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
