import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classnames from 'classnames';

import { getPc, updatePc } from '~/services/pc.server';
import random from '~/utils/random';
import { STATS, translateStat, getStatMod } from '~/utils/characters';

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

  const stats = STATS.reduce(
    (pcStats, statName) => ({
      ...pcStats,
      [statName]:
        parseInt(formData.get(statName), 10) +
        getStatMod(statName, { race, subrace }, extraPoints),
    }),
    {}
  );

  await updatePc({ name, stats });

  return redirect(`../${name}/${pClass}`);
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

function useStats(setUsedRolls) {
  return STATS.map(statName => {
    const [value, setValue] = useState('');
    const drop = useStatDrop(value, setValue, setUsedRolls);

    return {
      name: statName,
      value,
      drop,
    };
  });
}

function PcStats() {
  const { pc } = useLoaderData();
  const { age, pClass, height, name, race, size, speed, subrace, weight } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [rolls, setRolls] = useState(Array(6).fill(0));
  const [usedRolls, setUsedRolls] = useState(Array(6).fill(false));

  function addRoll() {
    const result = random.roll.processCommand('4d6p3');
    const roll = random.roll.calculateResult(result);
    const newRolls = rolls.slice();
    const i = newRolls.findIndex(r => !r);
    newRolls[i] = roll;
    setRolls(newRolls);
  }

  const stats = useStats(setUsedRolls);
  const [semiElfExtraPoints, setSemiElfExtraPoints] = useState([]);

  const rollsComplete = rolls.filter(r => r).length === 6;
  const canContinue = usedRolls.filter(r => r).length === 6;

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
        />
      ))}

      <p>
        {rolls.map((roll, i) => (
          <StatRoll roll={roll} index={i} canDrag={!usedRolls[i]} key={i} />
        ))}
        {!rollsComplete && (
          <button type="button" onClick={addRoll}>
            Add roll
          </button>
        )}
      </p>

      {stats.map(stat => {
        const statMod = getStatMod(stat.name, pc, semiElfExtraPoints);
        const showPlus1Button =
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
              {!!statMod && (
                <span>{statMod > 0 ? `+${statMod}` : statMod}</span>
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
      </p>
    </Form>
  );
}

export default PcStats;
