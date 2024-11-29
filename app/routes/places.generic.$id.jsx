import { Outlet, useLoaderData } from '@remix-run/react';
import { useTitle } from '~/components/hooks/useTitle';
import { getPlace, getPlaceByName } from '~/services/place.server';
import { getRegions } from '~/services/regions.server';

export const meta = ({ data }) => [
  {
    title: `Kandrax - ${data.place?.name}`,
  },
];

export const loader = async ({ params }) => {
  let [place, regions] = await Promise.all([getPlace(params.id), getRegions()]);

  if (!place) {
    place = await getPlaceByName(params.id);
    if (!place) {
      throw new Error('Place not found');
    }
    return redirect(`/places/generic/${place.id}`);
  }

  return { place, regions };
};

function GenericPlace() {
  const { place, regions } = useLoaderData();
  useTitle(place.name);

  return (
    <div className="places__container">
      <Outlet context={{ place, regions }} />
    </div>
  );
}

export default GenericPlace;
