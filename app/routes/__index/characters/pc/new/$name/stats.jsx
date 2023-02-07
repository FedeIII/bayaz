import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classnames from 'classnames';

import { getPc, updatePc } from '~/services/pc.server';
import random from '~/utils/random';
import { signed } from '~/utils/display';
import { STATS, translateStat, getStatExtraPoints } from '~/utils/characters';

import styles from '~/components/characters.module.css';

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
  const pClass = formData.get('pClass');
  const race = formData.get('race');
  const subrace = formData.get('subrace');
  const extraPoints = formData.getAll('extra-points[]');
  const extraStr = formData.getAll('extra-str');
  const extraDex = formData.getAll('extra-dex');
  const extraCon = formData.getAll('extra-con');
  const extraInt = formData.getAll('extra-int');
  const extraWis = formData.getAll('extra-wis');
  const extraCha = formData.getAll('extra-cha');

  const stats = STATS.reduce(
    (pcStats, statName) => ({
      ...pcStats,
      [statName]: parseInt(formData.get(statName), 10),
    }),
    {}
  );

  const extraStats = extraPoints?.length
    ? STATS.reduce(
        (pcStats, statName) => ({
          ...pcStats,
          [statName]: getStatExtraPoints(
            statName,
            { race, subrace },
            extraPoints
          ),
        }),
        {}
      )
    : {
        str: parseInt(extraStr, 10),
        dex: parseInt(extraDex, 10),
        con: parseInt(extraCon, 10),
        int: parseInt(extraInt, 10),
        wis: parseInt(extraWis, 10),
        cha: parseInt(extraCha, 10),
      };

  await updatePc({ name, stats, extraStats });

  if (race === 'half-elf') return redirect(`../${name}/half-elf`);

  if (pClass === 'barbarian') return redirect(`../${name}/barbarian`);

  return redirect(`/characters/pc/${name}/summary`);
};

function StatRoll(props) {
  const { roll, index, canDrag } = props;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ROLL,
      item: { value: roll, index },
      canDrag: () => canDrag && roll,
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [roll, index, canDrag]
  );

  const className = classnames(styles.statsRoll, {
    [styles.canDrag]: canDrag && roll,
    [styles.cannotDrag]: !canDrag && roll,
  });

  return (
    <span ref={drag} className={className}>
      {roll}
    </span>
  );
}

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

function PcStats() {
  const { pc } = useLoaderData();
  const { pClass, name, race, subrace, stats: initPStats, extraStats } = pc;

  function addRoll() {
    const result = random.roll.processCommand('4d6p3');
    const roll = random.roll.calculateResult(result);
    const newRolls = rolls.slice();
    const i = newRolls.findIndex(r => !r);
    newRolls[i] = roll;
    setRolls(newRolls);
  }

  function reset() {
    setRolls(Array(6).fill(0));
    setUsedRolls(Array(6).fill(false));
    setSemiElfExtraPoints([]);
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

  const [rolls, setRolls] = useState(Array(6).fill(0));
  const [usedRolls, setUsedRolls] = useState(
    Array(6).fill(areStatsSet ? true : false)
  );

  const stats = useStats(setUsedRolls, pStats);
  const [semiElfExtraPoints, setSemiElfExtraPoints] = useState([]);

  const rollsComplete = rolls.filter(r => r).length === 6;
  const canContinue =
    areStatsPreloaded ||
    (usedRolls.filter(r => r).length === 6 &&
      (race != 'half-elf' || semiElfExtraPoints.length === 2));

  return (
    <Form method="post">
      <h2>{name}'s Stats</h2>
      <input readOnly type="text" name="name" value={name} hidden />
      <input readOnly type="text" name="pClass" value={pClass} hidden />
      <input readOnly type="text" name="race" value={race} hidden />
      <input readOnly type="text" name="subrace" value={subrace} hidden />
      {semiElfExtraPoints.map(extraPointStat => (
        <input
          readOnly
          type="text"
          name="extra-points[]"
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
          />
        ))}

      {!areStatsSet && (
        <p>
          {rolls.map((roll, i) => (
            <StatRoll roll={roll} index={i} canDrag={!usedRolls[i]} key={i} />
          ))}
          {!rollsComplete && (
            <button type="button" onClick={addRoll}>
              1d6
            </button>
          )}
        </p>
      )}

      {stats.map(stat => {
        const statExtraPoints = areStatsPreloaded
          ? extraStats[stat.name]
          : getStatExtraPoints(stat.name, pc, semiElfExtraPoints);
        const showPlus1Button =
          !areStatsSet &&
          race === 'half-elf' &&
          stat.name !== 'cha' &&
          semiElfExtraPoints.length !== 2 &&
          !semiElfExtraPoints.includes(stat.name);

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
              {!!statExtraPoints && (
                <>
                  <span>{signed(statExtraPoints)}</span>
                  {Array(statExtraPoints).map(() => (
                    <input
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
                  onClick={() =>
                    setSemiElfExtraPoints(old => [...old, stat.name])
                  }
                >
                  +1
                </button>
              )}
            </label>
          </p>
        );
      })}

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
    </Form>
  );
}

export default PcStats;
