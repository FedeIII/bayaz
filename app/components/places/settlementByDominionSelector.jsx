import { t } from '~/domain/translations';

export default function SettlementByDominionSelector(props) {
  const { settlementsByDominion, name, value, onChange, className } = props;

  return (
    <select name={name} className={className} value={value} onChange={onChange}>
      <option value="">Sin asentamiento</option>
      {settlementsByDominion.map(([dominion, subdominions]) => (
        <>
          <optgroup key={dominion + '-'} label="" />
          <optgroup key={dominion} label={t(dominion).toUpperCase()} />
          {subdominions.map(([subdominion, settlements]) => (
            <optgroup key={subdominion} label={subdominion}>
              {settlements.map(settlement => (
                <option key={settlement.id} value={settlement.id}>
                  {settlement.name}
                </option>
              ))}
            </optgroup>
          ))}
        </>
      ))}
    </select>
  );
}
