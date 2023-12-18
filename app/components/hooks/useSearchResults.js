import { useEffect, useMemo, useState } from 'react';
import { getSearchResults } from '~/domain/search';

export function useSearchResults(search, sections) {
  const emptySearch = useMemo(
    () => sections.reduce((res, element) => ({ ...res, [element]: [] }), {}),
    [...sections]
  );

  const [searchResults, setSearchResults] = useState(emptySearch);

  useEffect(() => {
    if (search.length < 3) {
      setSearchResults(emptySearch);
    } else {
      getSearchResults(search, sections).then(res => {
        setSearchResults(res);
      });
    }
  }, [search]);

  return searchResults;
}
