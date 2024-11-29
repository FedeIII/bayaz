import { Outlet, useLoaderData } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';
import { t } from '~/domain/translations';
import { getSettlementImages } from '~/services/s3.server';
import { getSettlement } from '~/services/settlements.server';

export const meta = ({ data }) => [
  {
    title: `Kandrax - ${data.place?.name || t(data.typeParam)}`,
  },
];

export const loader = async args => {
  const { params, request } = args;
  const url = new URL(request.url);
  let rng = url.searchParams.get('rng');

  let place;
  let files;
  let type;
  let id;
  if (['city', 'town', 'village'].includes(params.id)) {
    id = null;
    place = null;
    type = params.id;
    try {
      files = await getSettlementImages(type);
    } catch {
      files = [];
    }
  } else {
    id = params.id;
    place = await getSettlement(id);
    if (!place) {
      throw new Error('Village not found');
    }
    try {
      files = await getSettlementImages(place.type);
    } catch {
      files = [];
    }
  }

  if (!rng) rng = Math.random();

  return { place, id, typeParam: type, files, rng };
};

function Settlement() {
  const { place, id, typeParam, files, rng } = useLoaderData();
  useTitle(place?.name || t(typeParam));

  return (
    <div className="places__container">
      <Outlet context={{ place, id, typeParam, files, rng }} />
    </div>
  );
}

export default Settlement;
