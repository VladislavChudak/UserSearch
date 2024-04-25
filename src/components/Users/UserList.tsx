import { useEffect, useRef } from 'react';
import { useUsers } from '@/lib/hooks/useUsers';
import UserListItem from './UserListItem';
import { User } from '@/lib/types';

export default function UserList() {
  const { users, fetchNextPage, isLoading, userCount } = useUsers();
  const observerRef = useRef(null);

  useEffect(() => {
    const lastElement = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];

        if (lastEntry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [users, fetchNextPage]);

  return (
    <aside className="sm:border-r border-muted-foreground w-full sm:w-450 h-80 sm:max-h-[calc(100%-5rem)] sm:h-[calc(100vh-5rem)]">
      <div className="bg-card h-full overflow-y-scroll">
        {isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : users.length ? (
          <ul className="flex flex-col">
            {users.map((user: User, index) => (
              <UserListItem
                key={user.login}
                ref={index === users.length - 1 ? observerRef : null}
                user={user}
              />
            ))}
          </ul>
        ) : (
          !isLoading && (
            <p className="text-center text-muted-foreground flex flex-col pt-4">
              No users found. <span>Start searching to see more results.</span>
            </p>
          )
        )}
      </div>
      <span className="text-sm flex justify-start gap-1 pl-3 py-1 border-b border-muted-foreground bg-card absolute bottom-0 w-full">
        <span className="font-bold">
          {users.length}/{userCount}
        </span>{' '}
        results shown
      </span>
    </aside>
  );
}
