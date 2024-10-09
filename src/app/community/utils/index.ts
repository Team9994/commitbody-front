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

export const mapQueryMarkScopeToMarkScope = (
  queryCategory: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'
): string => {
  switch (queryCategory) {
    case 'PUBLIC':
      return '전체 공개';
    case 'FOLLOWERS_ONLY':
      return '팔로우에게만 공개';
    case 'PRIVATE':
      return '비공개';
    default:
      throw new Error('Invalid query category selected');
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

export const alertPostBoard = (
  cur: 'certification' | 'question' | string | null,
  title: string,
  content: string,
  selectedFile: File | null,
  category: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW' | ''
) => {
  if (!cur) return;
  const errors: { [key: string]: () => string | null } = {
    certification: () => {
      if (!selectedFile) return '사진이나 영상을 업로드해주세요.';
      return null;
    },
    question: () => {
      if (!title) return '제목을 입력해주세요.';
      if (!category) return '카테고리를 입력해주세요.';
      return null;
    },
    default: () => {
      if (!content) return '내용을 입력해주세요.';
      return null;
    },
  };

  if (errors[cur]) {
    const errorMessage = errors[cur]();
    if (errorMessage) return errorMessage;
  }

  return errors.default();
};
