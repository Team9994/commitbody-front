export interface GetCommentPayload {
  id: string;
  source: 'custom' | 'default';
  lastId?: number | null;
  size: number;
}

export interface Day {
  [key: string]: number;
}

export interface Record {
  [key: string]: any;
}

export interface GetDetailsInfoType {
  calculateRankPercentage: number;
  day: Day;
  exerciseEquipment: string;
  exerciseId: number;
  exerciseMethods: string[];
  exerciseName: string;
  exerciseTarget: string;
  exerciseType: string;
  gifUrl: string;
  interestStatus: boolean;
  maxValue: number;
  records: Record[];
  totalValue: number;
  weekValue: number;
}
