import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteSearchRecord,
  getArticleSearchResult,
  getSearchRecord,
  postSearchRecord,
  SearchListsPayload,
} from '..';

interface PageParam {
  lastId: number | null;
}

export const useSearchResult = ({ session, title, category, size = 20 }: SearchListsPayload) => {
  return useInfiniteQuery<any>({
    queryKey: ['article_search_result', title, category],
    queryFn: ({ pageParam = { lastId: null } }) => {
      const result = getArticleSearchResult({
        session,
        title,
        category,
        size,
        lastId: (pageParam as { lastId: number | null }).lastId,
      });

      return result;
    },
    staleTime: 1000 * 60 * 60,
    initialPageParam: { lastId: null },
    getNextPageParam: (lastPage): PageParam | undefined => {
      if (!lastPage || !lastPage.data) return undefined;

      const articles = lastPage.data.articles;
      if (lastPage.data.hasNext && articles.length > 0) {
        const lastArticle = articles[articles.length - 1];
        return { lastId: lastArticle.articleId };
      }
      return undefined;
    },
    enabled: !!session,
  });
};

export const useGetSearchRecord = ({ session }: { session: any }) => {
  return useQuery({
    queryKey: ['search_record'],
    queryFn: () => getSearchRecord({ session }),
    staleTime: 0,
    gcTime: 0,
    enabled: !!session,
  });
};

export const usePostSearchRecordMutation = () => {
  const queryClient = useQueryClient();
  const postSearchRecordMutation = useMutation({
    mutationFn: postSearchRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['search_record'] });
    },
  });

  return postSearchRecordMutation;
};

export const useDeleteSearchRecordMutation = () => {
  const queryClient = useQueryClient();
  const deleteSearchRecordMutation = useMutation({
    mutationFn: deleteSearchRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['search_record'] });
    },
  });

  return deleteSearchRecordMutation;
};
