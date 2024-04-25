type User = {
  followers?: { totalCount: number };
  following?: { totalCount: number };
  company?: string;
  name: string;
  bio?: string;
  avatarUrl: string;
  login: string;
  url: string;
  location?: string;
  websiteUrl: string;
  email: string;
};

type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};

type UserEdge = {
  node: User;
};

type UserPage = {
  search: {
    edges: UserEdge[];
    pageInfo: PageInfo;
    userCount: number;
  };
};

type SearchResults = {
  pageInfo: PageInfo;
  edges: UserEdge[];
  userCount: number;
};

type GraphQLUserPage = {
  search: SearchResults;
};

type GraphQLUserResponse = {
  pages: GraphQLUserPage[];
};

type GraphQLUser = {
  user: User;
};

type UserState = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  userCount: number;
  setUserCount: (userCount: number) => void;
  user: User;
  setUser: (user: User) => void;
  currentUserLogin: string;
  setCurrentUserLogin: (currentUserLogin: string) => void;
};

type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
  search: {
    pageInfo: PageInfo;
  };
};

export type {
  User,
  PageInfo,
  UserEdge,
  UserPage,
  GraphQLUserResponse,
  UserState,
  GraphQLResponse,
  GraphQLUserPage,
  GraphQLUser
};
