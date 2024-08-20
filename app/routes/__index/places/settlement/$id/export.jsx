import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getSettlement } from '~/services/settlements.server';
import { t } from '~/domain/translations';
import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { getPlaceByName } from '~/services/place.server';
import { PlaceSummaryItem } from '~/components/exports';

export const loader = async ({ params }) => {
  const { id } = params;

  const place = await getSettlement(id);

  const [dominion, subdominion] = await Promise.all([
    getPlaceByName(t(place.dominion)),
    getPlaceByName(place.subdominion),
  ]);

  return json({ place, dominion, subdominion });
};

function ExportSettlement() {
  const {
    place,
    dominion: dominionPlace,
    subdominion: subdominionPlace,
  } = useLoaderData();
  const {
    name,
    dominion,
    subdominion,
    type,
    population,
    accommodation,
    government,
    commerces,
    magicShops,
    security,
    securityType,
    religion,
    raceRelationships,
    placeCharacteristics,
    knownFor,
    calamity,
    notes,
  } = place;

  useRemoveMenu();

  return (
    <div className="html-export">
      {name}
      <ul>
        <li>
          {t(type)} de ≈{population} habitantes que se encuentra en{' '}
          {t(subdominion)}, subdominio de {t(dominion)}
        </li>

        <li>
          Cuenta con {accommodation.length} tabernas:
          <ul>
            {(accommodation || []).map(innName => (
              <li key={innName}>{innName}</li>
            ))}
          </ul>
        </li>

        {!!government?.type ? (
          <li>
            Su sitema de gobierno es {t(government.type)}.{' '}
            {t(government.situation)}
          </li>
        ) : (
          <li>Alguacil {Math.random() > 0.5 && 'no '}presente</li>
        )}

        <li>
          Sus economía se sustenta en:
          <ul>
            {(commerces || []).map((commerce, i) => (
              <li key={i}>{t(commerce)}</li>
            ))}
          </ul>
        </li>

        {magicShops ? (
          <li>Cuenta con {magicShops} tiendas</li>
        ) : (
          <li>No tiene tiendas</li>
        )}

        <li>
          Las fuerzas de seguridad cuentan con {security}{' '}
          {securityType === 'militia' ? 'milicias' : 'guardias'}
        </li>

        {religion && (
          <li>
            Su infraestructura religiosa cuenta con{' '}
            {religion.temples?.length && (
              <>
                {religion.temples.length} templo
                {religion.temples.length > 1 ? 's' : ''} dedicado
                {religion.temples.length > 1 ? 's' : ''} a{' '}
                {religion.temples
                  .slice(0, religion.temples.length > 1 ? -1 : undefined)
                  .map(deityName => deityName.split(' ')[0])
                  .join(',')}
                {religion.temples.length > 1 && (
                  <>
                    {' '}
                    y{' '}
                    {
                      religion.temples[religion.temples.length - 1].split(
                        ' '
                      )[0]
                    }
                  </>
                )}
              </>
            )}{' '}
            {religion.temples?.length && religion.shrines?.length && 'y '}
            {religion.shrines?.length && (
              <>
                {religion.shrines.length} santuario
                {religion.shrines.length > 1 ? 's' : ''} dedicado
                {religion.shrines.length > 1 ? 's' : ''} a{' '}
                {religion.shrines
                  .slice(0, religion.shrines.length > 1 ? -1 : undefined)
                  .map(deityName => deityName.split(' ')[0])
                  .join(', ')}
                {religion.shrines.length > 1 && (
                  <>
                    {' '}
                    y{' '}
                    {
                      religion.shrines[religion.shrines.length - 1].split(
                        ' '
                      )[0]
                    }
                  </>
                )}
              </>
            )}
          </li>
        )}

        {raceRelationships && (
          <li>Relaciones entre las razas de habitantes: {raceRelationships}</li>
        )}

        {placeCharacteristics && (
          <li>Característica a destacar: {placeCharacteristics}</li>
        )}

        {knownFor && <li>Es conocida por: {knownFor}</li>}

        {calamity && <li>Últimas noticias: {calamity}</li>}

        {notes && (
          <li
            dangerouslySetInnerHTML={{
              __html: 'Notas' + place.notes,
            }}
          />
        )}

        {subdominionPlace && (
          <PlaceSummaryItem
            place={subdominionPlace}
            title={<>Perteneciente a {subdominionPlace.name}</>}
          >
            {dominionPlace && (
              <PlaceSummaryItem
                place={dominionPlace}
                title={
                  <>
                    {subdominionPlace.name} pertenece a {dominionPlace.name}
                  </>
                }
              />
            )}
          </PlaceSummaryItem>
        )}
      </ul>
    </div>
  );
}

export default ExportSettlement;
