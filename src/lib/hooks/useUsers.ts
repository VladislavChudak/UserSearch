import useStore from '@/store';
import { useEffect, useMemo } from 'react';
import { useInfiniteGraphQL } from '../graphqlClient';
import { GraphQLUserResponse, User } from '../types';

const usersSearchQuery = `
query SearchUsers($queryString: String!, $first: Int!, $after: String) {
  search(query: $queryString, type: USER, first: $first, after: $after) {
    userCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on User {
          followers {
            totalCount
          }
          following {
            totalCount
          }
          company
          name
          bio
          avatarUrl
          login
        }
      }
    }
  }
}
`;

const filteredUsers = (data: GraphQLUserResponse): User[] => {
  const isNonEmpty = (user: User) => Object.keys(user).length > 0;
  return data.pages.flatMap((page) =>
    page.search.edges.map((edge) => edge.node).filter(isNonEmpty)
  );
};

export const useUsers = () => {
  const { users, setUsers, searchTerm, setUserCount, userCount } = useStore();

  const variables = useMemo(
    () => ({
      queryString: `${searchTerm} in:name`,
      first: 20
    }),
    [searchTerm]
  );

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteGraphQL('users', usersSearchQuery, variables, {
      enabled: !!searchTerm
    });

  useEffect(() => {
    if (data) {
      const newUsers: User[] = filteredUsers(data);
      setUsers(newUsers);
      setUserCount(data.pages[0].search.userCount);
    }
  }, [searchTerm, data, setUsers, setUserCount]);

  useEffect(() => {
    if (!searchTerm) {
      setUsers([]);
    }
  }, [searchTerm, setUsers]);

  return { users, isLoading, error, fetchNextPage, hasNextPage, userCount };
};
