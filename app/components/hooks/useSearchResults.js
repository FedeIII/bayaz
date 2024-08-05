import { useEffect, useState } from 'react';
import { emptySearch, getSearchResults } from '~/domain/search';

export function useSearchResults(search, isDm, sections) {
  const [searchResults, setSearchResults] = useState(emptySearch(sections));

  useEffect(() => {
    if (search.length < 3) {
      setSearchResults(emptySearch(sections));
    } else {
      getSearchResults(search, isDm, sections).then(res => {
        setSearchResults(res);
      });
    }
  }, [search]);

  return searchResults;
}
