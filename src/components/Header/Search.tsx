import { Input } from '../ui/input';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value;
    const newSearchParams: URLSearchParams = new URLSearchParams(searchParams);

    if (!searchTerm) {
      newSearchParams.delete('query');
      setSearchParams(newSearchParams, { replace: true });

      return;
    }

    newSearchParams.set('query', searchTerm);
    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <form
      className="flex gap-3 relative w-80"
      action="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <button className="absolute top-0.5 left-0.5">
        <i className="fas fa-search text-secondary p-2" />
      </button>

      <Input
        className="pl-8"
        placeholder="Find any github profile..."
        onChange={handleChange}
      />
    </form>
  );
}
