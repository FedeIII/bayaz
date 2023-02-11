import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { getPc } from '~/services/pc.server';
import { signed } from '~/utils/display';
import {
  STATS,
  translateStat,
  getStatRacialExtraPoints,
} from '~/utils/characters';
import { RandomStatValues } from '~/components/statSelection/randomStatValues';
import { CustomStatValues } from '~/components/statSelection/customStatValues';
import { setPcStats } from '~/utils/characterMutations';

const ItemTypes = {
  ROLL: 'ROLL',
};

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
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
    name,
    extraPoints,
    selectedExtraPoints,
    stats,
    extraStats,
  });

  if (race === 'half-elf') return redirect(`../${name}/race/half-elf`);
  if (race === 'elf' && subrace === 'high')
    return redirect(`../${name}/race/high-elf`);
  if (race === 'human') return redirect(`../${name}/race/human`);

  return redirect(`../${name}/class`);
};

function useStatDrop(stat, setStat, setUsedRolls) {
  const [{ isOver }, statDrop] = useDrop(
    () => ({
      accept: ItemTypes.ROLL,
      canDrop: () => stat === '',
      drop: item => {
        setStat(item.value);
        setUsedRolls(oldUsedRolls => {
          const newUsedRolls = oldUsedRolls.slice();
          newUsedRolls[item.index] = true;
          return newUsedRolls;
        });
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [stat]
  );

  return statDrop;
}

function useStats(setUsedRolls, pStats) {
  return STATS.map(statName => {
    const [value, setValue] = useState(pStats?.[statName] || '');
    const drop = useStatDrop(value, setValue, setUsedRolls);

    return {
      name: statName,
      value,
      drop,
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
    <p>
      <label>
        Variante:{' '}
        <select defaultValue="" onChange={e => setVariant(e.target.value)}>
          <option value="" disabled>
            Selecciona Variante
          </option>
          <option value="random">Random</option>
          <option value="custom">Custom</option>
        </select>
      </label>
    </p>
  );
}

function ShowStatValues(props) {
  const { variant, setVariant, usedRolls } = props;

  if (variant === 'random') return <RandomStatValues usedRolls={usedRolls} />;
  if (variant === 'custom') return <CustomStatValues usedRolls={usedRolls} />;
  return <SelectVariant setVariant={setVariant} />;
}

function PcStats() {
  const { pc } = useLoaderData();
  const {
    pClass,
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

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

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
      <h2>{name}'s Stats</h2>
      <input readOnly type="text" name="name" value={name} hidden />
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

      {(!!variant || areStatsSet) &&
        stats.map(stat => {
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
            <p key={stat.name}>
              <label ref={stat.drop} htmlFor={stat.name}>
                {translateStat(stat.name)}:{' '}
                <input
                  type="number"
                  id={stat.name}
                  name={stat.name}
                  value={stat.value}
                  readOnly
                />{' '}
                {!!totalExtraPoints && (
                  <>
                    <span>{signed(totalExtraPoints)}</span>
                    {Array(statExtraPoints).fill(
                      <input
                        readOnly
                        type="text"
                        name="extra-points[]"
                        value={stat.name}
                        hidden
                      />
                    )}
                  </>
                )}
                {showPlus1Button && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExtraPoints(old => [...old, stat.name])
                    }
                  >
                    +1
                  </button>
                )}
              </label>
            </p>
          );
        })}

      {(!!variant || areStatsSet) && (
        <p>
          <button type="submit" disabled={isCreating || !canContinue}>
            {isCreating
              ? 'Creando...'
              : canContinue
              ? 'Continuar'
              : 'Asigna stats'}
          </button>
          <button type="button" onClick={reset}>
            Reiniciar
          </button>
        </p>
      )}
    </Form>
  );
}

export default PcStats;
