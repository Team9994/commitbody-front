export interface Exercise_Attribute {
  exerciseId: number;
  order: number;
  source: 'default' | 'custom';
}

export interface Register_Routine_Payload {
  routineName: string;
  routineExercises: Exercise_Attribute[];
}
