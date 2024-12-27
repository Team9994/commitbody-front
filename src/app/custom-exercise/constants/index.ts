// export const EXERCISE_LIST = ['도구', '부위', '좋아요', '커스텀'];
export const EXERCISE_LIST = {
  tool: {
    label: '도구',
    items: {
      all: '전체',
      dumbbell: '덤벨',
      bodyWeight: '맨몸',
      cable: '케이블',
      barbell: '바벨',
      machine: '머신',
      band: '밴드',
      weight: '중량',
      smithMachine: '스미스 머신',
      stretching: '스트레칭',
      cardio: '유산소 운동',
    },
  },
  bodyPart: {
    label: '부위',
    items: {
      all: '전체',
      chest: '가슴',
      back: '등',
      shoulders: '어깨',
      triceps: '삼두',
      biceps: '이두',
      forearms: '전완',
      abs: '복근',
      glutes: '둔근',
      hamstrings: '햄스트링',
      quads: '대퇴사두',
      calves: '종아리',
    },
  },
  like: {
    label: '좋아요',
    items: {},
  },
  custom: {
    label: '커스텀',
    items: {},
  },
};

export type CategoryKey = keyof typeof EXERCISE_LIST;
export default EXERCISE_LIST;

export const EXERCISE_LIST_INFO = {
  ALL: '전체',
  DUMBBELL: '덤벨',
  BODYWEIGHT: '맨몸',
  CABLE: '케이블',
  BARBELL: '바벨',
  MACHINE: '머신',
  BAND: '밴드',
  WEIGHT: '중량',
  SMITHMACHINE: '스미스 머신',
  STRETCHING: '스트레칭',
  CARDIO: '유산소 운동',
};

export type EXERCISE_LIST_INFO_KEY = keyof typeof EXERCISE_LIST_INFO;
