import useStore from '@/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchTerm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = useStore((state) => state.searchTerm);
  const setSearchTerm = useStore((state) => state.setSearchTerm);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('query') || '';

    if (searchTerm !== urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams: URLSearchParams = new URLSearchParams(searchParams);

    !searchTerm
      ? newSearchParams.delete('query')
      : newSearchParams.set('query', searchTerm);

    setSearchParams(newSearchParams, { replace: true });
  }, [searchTerm, searchParams, setSearchParams]);

  return { searchTerm, setSearchTerm };
};
