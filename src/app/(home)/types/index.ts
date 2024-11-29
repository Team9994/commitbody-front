export interface RoutineDto {
  routineId: number;
  routineName: string;
  targets: string[];
  exercises: Exercise_Detail[];
}

export interface Exercise_Detail {
  routineDetailId: number;
  exerciseId: number;
  source: string;
  exerciseName: string;
  gifUrl: string;
  exerciseType: string;
  sets: number;
  orders: number;
}
