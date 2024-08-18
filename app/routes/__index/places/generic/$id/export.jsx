import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { getPlace, getPlaceByName } from '../../../../../services/place.server';
import { PlaceSummaryItem } from '../../../../../components/exports';
import { getRegion } from '../../../../../services/regions.server';

export const loader = async ({ params }) => {
  const { id } = params;

  const place = await getPlace(id);

  let belongsToPlace = null;
  if (place.belongsTo) {
    const belongsToRegion = await getRegion(place.belongsTo);
    belongsToPlace = await getPlaceByName(belongsToRegion.name);
  }

  return json({ place, belongsToPlace });
};

function ExportSettlement() {
  const { place, belongsToPlace } = useLoaderData();

  const { name, group, isRegion } = place;

  useRemoveMenu();

  return (
    <div
      style={{ textAlign: 'left', backgroundColor: 'white', color: 'black' }}
    >
      <ul>
        <PlaceSummaryItem place={place}>
          {!isRegion && <li>Capítulo: {group}</li>}

          {belongsToPlace && (
            <PlaceSummaryItem
              place={belongsToPlace}
              title={
                <>
                  {belongsToPlace && <>Perteneciente a {belongsToPlace.name}</>}
                </>
              }
            />
          )}
        </PlaceSummaryItem>
      </ul>
    </div>
  );
}

export default ExportSettlement;
