import axios from 'axios';

const RECORD = {
  GET_RECORD_LIST: '/api/v1/record',
  GET_RECORD_DETAIL: (id: string) => `/api/v1/record/${id}`,
  POST_REGISTER_RECORD: '/api/v1/record',
  PUT_UPDATE_RECORD: (id: string) => `/api/v1/record/${id}`,
  DELETE_DELETE_RECORD: (id: string) => `/api/v1/record/${id}`,
};

export const getRecordDetail = async (id: string) => {
  const response = await axios.get(RECORD.GET_RECORD_DETAIL(id));
  return response.data.data;
};
