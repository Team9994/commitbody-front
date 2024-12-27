import { EXERCISE_LIST_INFO_KEY } from '@/app/custom-exercise/constants';

export interface GetCommentPayload {
  id: string;
  source: 'custom' | 'default';
  lastId?: number | null;
  size: number;
}

export interface ExerciseData {
  exerciseDto: ExerciseDto;
  reportDto: ReportDto;
  exerciseMethods: string[];
  recordSetsDtos: Record<string, RecordSet[]>;
}

interface ExerciseDto {
  exerciseId: number;
  exerciseName: string;
  gifUrl: string;
  exerciseType: string;
  exerciseTarget: string;
  exerciseEquipment: EXERCISE_LIST_INFO_KEY;
  interest: boolean;
}

interface ReportDto {
  maxRep: number;
  totalRep: number;
  weekRep: number;
  weekReports: WeekReport[];
}

interface WeekReport {
  dayOfWeek: string; // "TUESDAY" 등 요일 문자열
  data: number; // 횟수 데이터
}

interface RecordSet {
  reps: number; // 반복 횟수
}
