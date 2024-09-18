export interface RecordType {
  dayRecordCount: {
    [key: string]: DayRecord;
  };
  records: RoutineRecord[];
}

interface DayRecord {
  day: string;
  recordDays: RecordDay[];
}

export interface RecordDay {
  recordId: number;
  recordName: string;
  durationTime: string;
}

export interface RoutineRecord {
  recordId: number;
  recordName: string;
  durationTime: string;
  lastTime: string;
}
