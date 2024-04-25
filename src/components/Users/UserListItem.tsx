import { forwardRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/types';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '@/lib/hooks/useUser';

type UserListItemProps = {
  user: User;
  ref: React.MutableRefObject<null> | null;
};

const UserListItem = forwardRef<HTMLLIElement, UserListItemProps>(
  ({ user }, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setCurrentUserLogin } = useUser();
    const handleClick = () => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set('user', user.login);
      setSearchParams(newSearchParams);
      setCurrentUserLogin(user.login);
    };

    useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      const userLogin = newSearchParams.get('user') || '';

      setCurrentUserLogin(userLogin);
    }, []);

    return (
      <li
        ref={ref}
        className="flex gap-3 pl-3 py-3 bg-card border-b border-muted-foreground overflow-hidden cursor-pointer 
            hover:bg-muted-foreground transition-all duration-150 ease-in-out"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm">
            <span className="text-xs pr-1">Username:</span>
            <span className="font-bold">
              {user.name ?? 'Username not found'}
            </span>
          </h2>
          <p className="text-xs">Company: {user.company ?? 'None'}</p>
        </div>
      </li>
    );
  }
);

export default UserListItem;
