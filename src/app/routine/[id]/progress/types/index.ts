export interface RoutineDetail {
  routineDetailId: number;
  exerciseId: number;
  source: string;
  exerciseName: string;
  gifUrl: string;
  exerciseType: string;
  sets: number;
  orders: number;
}

export interface SetInfo {
  weight?: number;
  reps?: number;
  time?: number;
}
