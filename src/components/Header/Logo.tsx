import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const url: string = '/img/github.png';
const title: string = 'Github User Search';

export default function Logo() {
  return (
    <h1>
      <Link to="/" className="flex items-center gap-3 mb-4 sm:mb-0">
        <Avatar>
          <AvatarImage src={url} alt={title} />
          <AvatarFallback>GUS</AvatarFallback>
        </Avatar>
        <span className="text-2xl">{title}</span>
      </Link>
    </h1>
  );
}
