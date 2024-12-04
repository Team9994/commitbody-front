import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import useRoutineEdit from './hooks/useRoutineEdit';
import SelectedRoutineList from './components/SelectedRoutineList';
import axios from 'axios';
import { auth } from '@/auth';

const RoutineEdit = async () => {
  const session = await auth();
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/api/v1/routine/53`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  console.log(res.data.data);

  const routines = res.data.data.routineDtos[0]?.exercises;
  return (
    <div>
      <SelectedRoutineList routines={routines} />
      <PlusRoutineBtn href="/exercise-list/routine" />
    </div>
  );
};

export default RoutineEdit;
