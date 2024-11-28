import { getLabelX, getLabelY, shouldShowSettlementName } from '~/utils/map/map';

export default function MapLabels(props) {
  const { zoom, settlements, initZoom, newLocation, bounds } = props;

  return (
    <>
      {settlements
        .filter(settlement => shouldShowSettlementName(settlement, zoom))
        .map(settlement => (
          <text
            key={settlement.id}
            // x >
            // y v
            x={getLabelX(settlement.location, zoom, initZoom, bounds)}
            y={getLabelY(settlement.location, zoom, initZoom, bounds)}
            textAnchor="end"
            fontFamily="Rosarivo"
            fontSize="16px"
            stroke="#d84343"
            style={{ userSelect: 'none' }}
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
          style={{ userSelect: 'none' }}
        >
          New
        </text>
      )}
    </>
  );
}
