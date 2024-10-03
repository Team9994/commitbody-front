import { getRecordDetail } from '@/app/api/record';

const useRecord = () => {
  const getRecordInfo = async (id: string) => {
    const response = await getRecordDetail(id);
    return response;
  };

  return { getRecordInfo };
};

export default useRecord;
