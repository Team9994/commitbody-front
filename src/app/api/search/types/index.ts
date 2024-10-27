export interface Member {
  memberId: number;
  nickname: string;
}

export interface Article {
  articleId: number;
  title: string;
  articleCategory: string;
  time: string;
  likeCount: number;
  commentCount: number;
  imageUrl: string;
  member: Member;
}

export interface ArticleData {
  totalCount: number;
  hasNext: boolean;
  articles: Article[];
}
