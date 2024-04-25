import useStore from '@/store';
import { useEffect } from 'react';
import { useGraphQL } from '../graphqlClient';
import { User } from '../types';

const userQuery = `
query GetUserByUsername($username: String!) {
    user(login: $username) {
      name
      avatarUrl
      websiteUrl
      url
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      email,
      login
    }
  }
`;

export const useUser = () => {
  const { setCurrentUserLogin, user, currentUserLogin, setUser } = useStore();

  const variables = { username: currentUserLogin };

  const { data, isLoading, error } = useGraphQL('user', userQuery, variables, {
    enabled: !!currentUserLogin,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }

    return () => {
      setUser({} as User);
    };
  }, [data, setUser, currentUserLogin]);

  return { setCurrentUserLogin, user, isLoading, error };
};
