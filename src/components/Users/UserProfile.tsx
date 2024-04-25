import useStore from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useStore();
  const {
    avatarUrl,
    name,
    login,
    company,
    location,
    url,
    websiteUrl,
    email,
    followers,
    following
  } = user;

  return (
    <>
      {Object.keys(user).length ? (
        <div className="flex flex-col text-left justify-start items-center min-h-450 sm:items-start pt-4 sm:pt-8 pl-0 sm:pl-4 bg-card flex-grow">
          <Avatar className="w-60 h-60">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-3xl leading-none pt-2">{name}</h2>
          <Link to={url} className="leading-none text-gray-400" target="_blank">
            {login}
          </Link>
          <p className="pt-4 flex items-center gap-2">
            <i className="fas w-5 h-5 fa-solid fa-users"></i>
            <span>
              {followers?.totalCount} followers & {following?.totalCount}{' '}
              following
            </span>
          </p>
          <p className="flex items-center gap-2">
            {company ? (
              <i className="fas fa-regular w-5 h-5 p fa-briefcase"></i>
            ) : (
              ''
            )}
            <span>{company}</span>
          </p>
          <p className="flex items-center gap-2">
            {location ? (
              <i className="fas w-5 h-5 fa-regular fa-map-marker-alt"></i>
            ) : (
              ''
            )}
            <span>{location}</span>
          </p>
          <p className="flex items-center gap-2">
            {websiteUrl ? (
              <i className="fas w-5 h-5 fa-regular fa-link"></i>
            ) : (
              ''
            )}
            <Link to={websiteUrl} target="_blank">
              {websiteUrl}
            </Link>
          </p>
          <p className="flex items-center gap-2">
            {email ? <i className="fas w-5 h-5 fa-solid fa-envelope"></i> : ''}
            <span>{email}</span>
          </p>
        </div>
      ) : (
        <p className="flex items-center justify-center flex-col text-center flex-grow text-muted-foreground">
          <span>Who are you looking for?</span>
          <span>Start by searching for anyone you want!</span>
        </p>
      )}
    </>
  );
}
