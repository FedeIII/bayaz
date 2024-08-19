import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { getPlace, getPlaceByName } from '~/services/place.server';
import { PlaceSummaryItem } from '~/components/exports';
import { getRegion } from '~/services/regions.server';

export const loader = async ({ params }) => {
  const { id } = params;

  const place = await getPlace(id);

  let belongsToPlace = null;
  if (place.belongsTo) {
    const belongsToRegion = await getRegion(place.belongsTo);
    belongsToPlace = await getPlaceByName(belongsToRegion.name);
  }

  let inTheRegionOfPlace = null;
  if (belongsToPlace?.belongsTo) {
    const inTheRegionOf = await getRegion(belongsToPlace.belongsTo);
    inTheRegionOfPlace = await getPlaceByName(inTheRegionOf.name);
  }

  return json({ place, belongsToPlace, inTheRegionOfPlace });
};

function ExportPlace() {
  const { place, belongsToPlace, inTheRegionOfPlace } = useLoaderData();

  const { group, isRegion } = place;

  useRemoveMenu();

  return (
    <div className="html-export">
      <ul>
        <PlaceSummaryItem place={place}>
          {!isRegion && <li>Capítulo: {group}</li>}

          {belongsToPlace && (
            <PlaceSummaryItem
              place={belongsToPlace}
              title={
                <>
                  {belongsToPlace && (
                    <>
                      Perteneciente a {belongsToPlace.name}
                      {inTheRegionOfPlace && (
                        <>, en {inTheRegionOfPlace.name}</>
                      )}
                    </>
                  )}
                </>
              }
            >
              {inTheRegionOfPlace && (
                <PlaceSummaryItem place={inTheRegionOfPlace} />
              )}
            </PlaceSummaryItem>
          )}
        </PlaceSummaryItem>
      </ul>
    </div>
  );
}

export default ExportPlace;
