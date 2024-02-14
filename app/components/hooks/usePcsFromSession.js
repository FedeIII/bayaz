import { useFetcher } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import PartyContext from '../contexts/partyContext';

export default function usePcsFromSession() {
  const fetcher = useFetcher();

  const { partyIdState, pcIdsState } = useContext(PartyContext) || {};
  const [pcs, setPcs] = useState([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (pcIdsState?.length && refetch) {
      fetcher.load(`/pcs?pcIdsState=${JSON.stringify(pcIdsState)}`);
      setRefetch(false);
    }
  }, [pcIdsState, refetch]);

  useEffect(() => {
    if (fetcher.data) {
      setPcs(fetcher.data);
    }
  }, [fetcher.data]);

  function updatePcs() {
    setRefetch(true);
  }

  return [pcs, partyIdState, updatePcs];
}
