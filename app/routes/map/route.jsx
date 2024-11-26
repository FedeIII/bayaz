import { json, redirect } from '@remix-run/node';
import {
  createSettlement,
  getSettlements,
  updateSettlement,
} from '~/services/settlements.server';
import {
  createRegion,
  deleteVertex,
  editNameLocation,
  editVertex,
  getRegions,
} from '~/services/regions.server';
import withLoading from '~/components/HOCs/withLoading';

import styles from '~/components/map/map.css';
import placesStyles from '~/components/places.css';
import ClientMap from './clientMap.client';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: placesStyles },
  ];
};

// x c [0, 100] left to right
// y c [0, 120] bottom to top

const bounds = [
  [0, 0],
  [129, 109],
];

const initZoom = 6;

function parseLocation(lat, lng) {
  return {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let lat = url.searchParams.get('lat');
  let lng = url.searchParams.get('lng');
  const center = lat && lng ? parseLocation(lat, lng) : null;

  const [settlements, regions] = await Promise.all([
    getSettlements(),
    getRegions(),
  ]);

  return json({
    center,
    settlements: settlements.filter(settlement => !!settlement.location),
    regions,
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  if (action === 'createSettlement') {
    const lat = formData.get('lat');
    const lng = formData.get('lng');
    const type = formData.get('type');

    const settlement = await createSettlement({
      location: parseLocation(lat, lng),
      type,
    });

    return redirect(`/places/settlement/${settlement.id}`);
  } else if (action === 'createRegion') {
    const regionName = formData.get('regionName');
    const regionColor = formData.get('regionColor');
    const vertices = formData.get('vertices');

    await createRegion({
      name: regionName,
      type: 'subdominion',
      color: regionColor,
      vertices: vertices.split('|').map(latLng => {
        const [lat, lng] = latLng.split(',');
        return parseLocation(lat, lng);
      }),
    });
  } else if (action === 'deleteVertex') {
    const id = formData.get('id');
    const vertexId = formData.get('vertexId');

    await deleteVertex(id, vertexId);
  } else if (action === 'editVertex') {
    const regionId = formData.get('regionId');
    const vertexId = formData.get('vertexId');
    const lat = formData.get('lat');
    const lng = formData.get('lng');
    const isMovingRegion = formData.get('isMovingRegion');

    await editVertex(
      regionId,
      vertexId,
      parseLocation(lat, lng),
      isMovingRegion === 'true'
    );
  } else if (action === 'editSettlementLocation') {
    const id = formData.get('id');
    const lat = formData.get('lat');
    const lng = formData.get('lng');

    await updateSettlement(id, { location: parseLocation(lat, lng) });
  } else if (action === 'moveRegionName') {
    const regionId = formData.get('id');
    const lat = formData.get('lat');
    const lng = formData.get('lng');

    await editNameLocation(regionId, parseLocation(lat, lng));
  }

  return json({ regions: await getRegions() });
};

function Map() {
  if (typeof window !== 'undefined') {
    return <ClientMap />;
  }

  return null;
}

export default withLoading(Map);
