import {
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from 'react-query';
import { GraphQLUserPage, GraphQLUser } from './types';

const GRAPHQL_URL = 'https://api.github.com/graphql';

async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables: { ...variables, after: variables?.after ?? null }
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  if (!json.data) throw new Error(json.errors[0].message);

  return json.data;
}

export function useGraphQL(
  key: string,
  query: string,
  variables?: Record<string, unknown>,
  options?: object
) {
  return useQuery<GraphQLUser>(
    [key, variables],
    () => graphqlFetch<GraphQLUser>(query, variables),
    {
      refetchOnWindowFocus: false,
      retry: false,
      ...options
    }
  );
}

export function useInfiniteGraphQL(
  key: string,
  query: string,
  variables: Record<string, unknown>,
  options?: UseInfiniteQueryOptions<GraphQLUserPage>
) {
  return useInfiniteQuery<GraphQLUserPage>(
    [key, variables],
    ({ pageParam }) => {
      const params = { ...variables, after: pageParam };

      return graphqlFetch<GraphQLUserPage>(query, params);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      getNextPageParam: (lastPage) => {
        if (!lastPage.search.pageInfo.hasNextPage) return undefined;

        return lastPage.search.pageInfo.endCursor;
      },
      ...options
    }
  );
}
