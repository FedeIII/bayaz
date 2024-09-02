import { getLabelX, getLabelY } from '~/utils/map';

export default function MapLabels(props) {
  const { zoom, settlements, initZoom, newLocation, bounds } = props;

  return (
    <>
      {/* {zoom > 4 && (
        <> */}
      {settlements.map(settlement => (
        <text
          key={settlement.id}
          // x >
          // y vç
          x={getLabelX(settlement.location, zoom, initZoom, bounds)}
          y={getLabelY(settlement.location, zoom, initZoom, bounds)}
          textAnchor="end"
          fontFamily="Rosarivo"
          fontSize="16px"
          stroke="#d84343"
        >
          {settlement.name}
        </text>
      ))}
      {!!newLocation && (
        <text
          // x >
          // y v
          x={getLabelX(newLocation, zoom, initZoom, bounds)}
          y={getLabelY(newLocation, zoom, initZoom, bounds)}
          textAnchor="end"
          fontFamily="Rosarivo"
          fontSize="16px"
          stroke="#d84343"
        >
          New
        </text>
      )}
      {/* </>
      )} */}
    </>
  );
}
