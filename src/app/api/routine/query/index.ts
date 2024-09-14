import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRoutineList,
  getRoutineDetail,
  postRegisterRoutine,
  putUpdateRoutine,
  deleteDeleteRoutine,
} from '@/app/api/routine';
import { useRouter } from 'next/navigation';
