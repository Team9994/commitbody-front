export const mapMenuToQueryType = (
  menu: 'certification' | 'question'
): 'EXERCISE' | 'INFO_QUESTION' => {
  switch (menu) {
    case 'certification':
      return 'EXERCISE';
    case 'question':
      return 'INFO_QUESTION';
    default:
      throw new Error('Invalid menu selected');
  }
};

export const mapCategoryToQueryCategory = (
  category: string
): 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW' => {
  switch (category) {
    case '전체':
      return 'ALL';
    case '팔로잉':
      return 'FOLLOWING';
    case '인기글':
      return 'POPULAR';
    case '정보':
      return 'INFORMATION';
    case '운동 피드백':
      return 'FEEDBACK';
    case '몸':
      return 'BODY_REVIEW';
    default:
      throw new Error('Invalid category selected');
  }
};

export const mapQueryCategoryToCategory = (
  queryCategory: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW'
): string => {
  switch (queryCategory) {
    case 'ALL':
      return '전체';
    case 'FOLLOWING':
      return '팔로잉';
    case 'POPULAR':
      return '인기글';
    case 'INFORMATION':
      return '정보';
    case 'FEEDBACK':
      return '운동 피드백';
    case 'BODY_REVIEW':
      return '몸';
    default:
      throw new Error('Invalid query category selected');
  }
};
