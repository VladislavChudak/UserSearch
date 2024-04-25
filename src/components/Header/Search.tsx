import { Input } from '../ui/input';
import { useSearchTerm } from '@/lib/hooks/useSearchTerm';

export default function Search() {
  const { searchTerm, setSearchTerm } = useSearchTerm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setSearchTerm(value);
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
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}
