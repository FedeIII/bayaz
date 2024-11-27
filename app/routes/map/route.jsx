import { json, redirect } from '@remix-run/node';
import {
  createSettlement,
  getSettlements,
  updateSettlement,
} from '~/services/settlements.server';
import {
  createRegion,
  updateRegion,
  getRegions,
} from '~/services/regions.server';
import ClientMap from './clientMap.client';
import LoadingSpinner from '~/components/util/pageSpinner';

import styles from '~/components/map/map.css';
import placesStyles from '~/components/places.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: placesStyles },
  ];
};

// x c [0, 100] left to right
// y c [0, 120] bottom to top

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
    const pointsString = formData.get('points');

    const points = pointsString
      .split('|')
      .map(latLng => latLng.split(',').map(parseFloat));

    await createRegion({
      name: regionName,
      type: 'subdominion',
      color: regionColor,
      points,
      nameLocation: { lat: points[0][0], lng: points[0][1] },
    });
  } else if (action === 'editSettlementLocation') {
    const id = formData.get('id');
    const lat = formData.get('lat');
    const lng = formData.get('lng');

    await updateSettlement(id, { location: parseLocation(lat, lng) });
  } else if (action === 'setPointsForRegion') {
    const regionId = formData.get('regionId');
    const points = formData.get('points');

    await updateRegion(regionId, {
      points: points.split('|').map(point => point.split(',')),
    });
  } else if (action === 'moveRegionName') {
    const regionId = formData.get('id');
    const lat = formData.get('lat');
    const lng = formData.get('lng');

    await updateRegion(regionId, { nameLocation: parseLocation(lat, lng) });
  }

  return json({ regions: await getRegions() });
};

function Map() {
  if (typeof window !== 'undefined') {
    return <ClientMap />;
  }

  return <LoadingSpinner />;
}

export default Map;
