import { useFetcher } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import PartyContext from '../contexts/partyContext';

export default function usePcsFromSession() {
  const fetcher = useFetcher();

  const { partyIdState, pcIdsState } = useContext(PartyContext) || {};
  const [pcs, setPcs] = useState([]);
  useEffect(() => {
    if (pcIdsState?.length) {
      fetcher.load(`/pcs?pcIdsState=${JSON.stringify(pcIdsState)}`);
    }
  }, [pcIdsState]);

  useEffect(() => {
    if (fetcher.data) {
      setPcs(fetcher.data);
    }
  }, [fetcher.data]);

  return [pcs, partyIdState];
}
