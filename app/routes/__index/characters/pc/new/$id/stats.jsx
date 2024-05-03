import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { getPc } from '~/services/pc.server';
import { signed } from '~/domain/display';
import {
  STATS,
  translateStat,
  getStatRacialExtraPoints,
} from '~/domain/characters';
import { setPcStats } from '~/domain/mutations/characterMutations';
import { RandomStatValues } from '~/components/statSelection/randomStatValues';
import { CustomStatValues } from '~/components/statSelection/customStatValues';
import { RealDiceStatValues } from '~/components/statSelection/realDiceStatValues';
import { StatRoll } from '~/components/statSelection/statRoll';

import styles from '~/components/stats.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const ItemTypes = {
  ROLL: 'ROLL',
};

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const race = formData.get('race');
  const subrace = formData.get('subrace');
  const extraPoints = formData.getAll('extra-points[]');
  const selectedExtraPoints = formData.getAll('selected-extra-points[]');
  const stats = STATS.reduce(
    (acc, s) => ({ ...acc, [s]: formData.get(s) }),
    {}
  );
  const extraStats = STATS.reduce(
    (acc, s) => ({ ...acc, [s]: formData.get(`extra-${s}`) }),
    {}
  );

  await setPcStats({
    id,
    extraPoints,
    selectedExtraPoints,
    stats,
    extraStats,
  });

  if (race === 'half-elf') return redirect(`../${id}/race/half-elf`);
  if (race === 'elf' && subrace === 'high')
    return redirect(`../${id}/race/high-elf`);
  if (race === 'human') return redirect(`../${id}/race/human`);
  if (race === 'dwarf') return redirect(`../${id}/race/dwarf`);

  return redirect(`../${id}/class`);
};

function useStatDrop(statValue, setStat, setUsedRolls) {
  const [{ isOver, canDrop }, statDrop] = useDrop(
    () => ({
      accept: ItemTypes.ROLL,
      canDrop: item => !item.index || statValue === '',
      drop: item => {
        setStat(item.value);
        setUsedRolls(oldUsedRolls => {
          const newUsedRolls = oldUsedRolls.slice();
          newUsedRolls[item.index] = true;
          return newUsedRolls;
        });
        return { dropOnValue: statValue };
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [statValue]
  );

  return [statDrop, isOver, canDrop];
}

function useStats(setUsedRolls, pStats) {
  return STATS.map(statName => {
    const [value, setValue] = useState(pStats?.[statName] || '');
    const [drop, isOver, canDrop] = useStatDrop(value, setValue, setUsedRolls);

    return {
      name: statName,
      value,
      drop,
      isOver,
      canDrop,
      setValue,
    };
  });
}

function getInitSelectedExtraPoints(selectedExtraPoints = {}) {
  return Object.entries(selectedExtraPoints).reduce(
    (extraStatNames, [statName, statValue]) => [
      ...extraStatNames,
      ...Array(statValue).fill(statName),
    ],
    []
  );
}

function SelectVariant(props) {
  const { setVariant } = props;

  return (
    <div className="characters__trait-columns characters__trait-columns--three">
      <label className="characters__trait-label">
        <span className="characters__trait-title">Variante</span>{' '}
        <select
          defaultValue=""
          className="cards__button-card"
          onChange={e => setVariant(e.target.value)}
        >
          <option value="" disabled>
            Selecciona Variante
          </option>
          <option value="random">Random</option>
          <option value="custom">Custom</option>
          <option value="realDice">Dados reales</option>
        </select>
      </label>
    </div>
  );
}

function ShowStatValues(props) {
  const { variant, setVariant, usedRolls } = props;

  if (variant === 'random') return <RandomStatValues usedRolls={usedRolls} />;
  if (variant === 'custom') return <CustomStatValues usedRolls={usedRolls} />;
  if (variant === 'realDice')
    return <RealDiceStatValues usedRolls={usedRolls} />;
  return <SelectVariant setVariant={setVariant} />;
}

function AssignedStat(props) {
  const {
    stat,
    areStatsPreloaded,
    extraStats,
    pc,
    areStatsSet,
    race,
    selectedExtraPoints,
    setSelectedExtraPoints,
  } = props;

  const statExtraPoints = areStatsPreloaded
    ? extraStats[stat.name]
    : getStatRacialExtraPoints(stat.name, pc);
  const showPlus1Button =
    !areStatsSet &&
    race === 'half-elf' &&
    stat.name !== 'cha' &&
    selectedExtraPoints.length !== 2 &&
    !selectedExtraPoints.includes(stat.name);

  const extraStatFromSelected = selectedExtraPoints.reduce(
    (amount, statName) => amount + (statName === stat.name ? 1 : 0),
    0
  );

  const totalExtraPoints = statExtraPoints + extraStatFromSelected;

  return (
    <label
      key={stat.name}
      className="characters__trait-label characters__trait-label--row"
    >
      <span className="characters__trait-cell characters__trait-cell--left">
        {translateStat(stat.name)}
      </span>
      <span className="characters__trait-cell characters__trait-cell--right">
        <StatRoll
          roll={stat.value}
          canDrag
          setStat={stat.setValue}
          className="characters__stat-input-wrapper"
        >
          <input
            type="number"
            id={stat.name}
            ref={stat.drop}
            name={stat.name}
            value={stat.value}
            className={`characters__stat-input ${
              stat.isOver && stat.canDrop
                ? 'characters__stat-input--hover'
                : stat.canDrop
                ? 'characters__stat-input--highlight'
                : ''
            }`}
            readOnly
          />
        </StatRoll>{' '}
        {!!totalExtraPoints && (
          <>
            <span>{signed(totalExtraPoints)}</span>
            {Array.from(Array(statExtraPoints), (_, i) => (
              <input
                key={i}
                readOnly
                type="text"
                name="extra-points[]"
                value={stat.name}
                hidden
              />
            ))}
          </>
        )}
        {showPlus1Button && (
          <button
            type="button"
            className="stats__statButton stats__statButton--big"
            onClick={() => setSelectedExtraPoints(old => [...old, stat.name])}
          >
            +1
          </button>
        )}
      </span>
    </label>
  );
}

function PcStats() {
  const { pc } = useLoaderData();
  const {
    id,
    name,
    race,
    subrace,
    stats: initPStats,
    extraStats = {},
    halfElf: { extraStats: halfElfExtraStats } = {},
  } = pc;

  function reset() {
    setUsedRolls(Array(6).fill(false));
    setSelectedExtraPoints([]);
    setPStats(STATS.reduce((acc, statName) => ({ [statName]: '' }), {}));
    stats.forEach(stat => stat.setValue(''));
    setAreStatsPreloaded(false);
  }

  const navigation = useNavigation();
  const isCreating = Boolean(navigation);

  const [pStats, setPStats] = useState(initPStats);

  const [areStatsPreloaded, setAreStatsPreloaded] = useState(
    initPStats && Object.values(initPStats).filter(v => v).length >= 6
  );
  const areStatsSet =
    pStats && Object.values(pStats).filter(v => v).length >= 6;

  const [usedRolls, setUsedRolls] = useState(
    Array(6).fill(areStatsSet ? true : false)
  );

  const stats = useStats(setUsedRolls, pStats);
  const [selectedExtraPoints, setSelectedExtraPoints] = useState(
    getInitSelectedExtraPoints(halfElfExtraStats)
  );

  const canContinue =
    areStatsPreloaded ||
    (usedRolls.filter(r => r).length === 6 &&
      (race != 'half-elf' || selectedExtraPoints.length === 2));

  const [variant, setVariant] = useState(null);

  return (
    <Form method="post">
      <div className="characters__content">
        <h2>Puntuaciones de Características de {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />
        <input readOnly type="text" name="race" value={race} hidden />
        <input readOnly type="text" name="subrace" value={subrace} hidden />
        {selectedExtraPoints.map(extraPointStat => (
          <input
            readOnly
            type="text"
            name="selected-extra-points[]"
            value={extraPointStat}
            hidden
            key={extraPointStat}
          />
        ))}
        {areStatsPreloaded &&
          Object.entries(extraStats).map(([extraStatName, extraStatValue]) => (
            <input
              readOnly
              type="text"
              name={`extra-${extraStatName}`}
              value={extraStatValue}
              hidden
              key={extraStatName}
            />
          ))}

        {!areStatsSet && (
          <ShowStatValues
            variant={variant}
            setVariant={setVariant}
            usedRolls={usedRolls}
          />
        )}

        {(!!variant || areStatsSet) && (
          <div className="characters__trait-sections-stats">
            {stats.map(stat => (
              <AssignedStat
                stat={stat}
                areStatsPreloaded={areStatsPreloaded}
                extraStats={extraStats}
                pc={pc}
                areStatsSet={areStatsSet}
                race={race}
                selectedExtraPoints={selectedExtraPoints}
                setSelectedExtraPoints={setSelectedExtraPoints}
              />
            ))}
          </div>
        )}

        {(!!variant || areStatsSet) && (
          <p>
            <button
              type="submit"
              className="cards__button-card"
              disabled={isCreating || !canContinue}
            >
              {isCreating
                ? 'Creando...'
                : canContinue
                ? 'Continuar'
                : 'Asigna stats'}
            </button>
            <button
              type="button"
              className="cards__button-card"
              onClick={reset}
            >
              Reiniciar
            </button>
          </p>
        )}
      </div>
    </Form>
  );
}

export default PcStats;
