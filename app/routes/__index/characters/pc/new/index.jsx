import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';

import {
  RACES,
  SUBRACES,
  translateRace,
  CLASSES,
  translateClass,
  setLanguages,
} from '~/domain/characters';
import { createPc } from '~/services/pc.server';
import { getSpell } from '~/domain/spells/spells';

import styles from '~/components/characters.module.css';
import menuStyles from '~/components/menus.module.css';

const NUMBER_OF_AGE_MARKS = 5;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const race = formData.get('race');
  const subrace = formData.get('subrace') || 'subrace';
  const age = parseInt(formData.get('age'), 10);
  const height = parseInt(formData.get('height'), 10);
  const weight = parseInt(formData.get('weight'), 10);
  const pClass = formData.get('pClass');

  const errors = {
    name: name ? null : 'Name is required',
  };
  const hasErrors = Object.values(errors).some(errorMessage => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof name === 'string', 'name must be a string');

  const spells = [];
  if (race === 'elf' && subrace === 'drow')
    spells.push(getSpell('dancingLights', 'sorcerer'));

  const pc = {
    name,
    race,
    subrace,
    age,
    height,
    weight,
    pClass,
    level: 1,
    skills: RACES[race][subrace].skills,
    exp: 0,
    languages: setLanguages(race, subrace, pClass),
    spells,
    money: [0, 0, 0],
  };

  await createPc(pc);

  return redirect(`${name}/stats`);
};

function getFirstSubrace(race) {
  return Object.keys(RACES[race])[0];
}

function getMinAttr(race, subrace, attr) {
  return RACES[race][subrace]?.[attr][0];
}

function getMaxAttr(race, subrace, attr) {
  return RACES[race][subrace]?.[attr][1];
}

function getMarkers(race, subrace, attr) {
  const ages = RACES[race][subrace]?.[attr] || [0, 100];
  const distance = Math.floor((ages[1] - ages[0]) / (NUMBER_OF_AGE_MARKS - 1));

  return (
    <>
      <option value={ages[0]}></option>
      <option value={ages[0] + distance}></option>
      <option value={ages[0] + 2 * distance}></option>
      <option value={ages[0] + 3 * distance}></option>
      <option value={ages[1]}></option>
    </>
  );
}

function PcRace() {
  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [race, setRace] = useState('human');
  const [subrace, setSubrace] = useState('subrace');
  const [age, setAge] = useState(RACES.human.subrace.age[0]);
  const [height, setHeight] = useState(RACES.human.subrace.height[0]);
  const [weight, setWeight] = useState(RACES.human.subrace.weight[0]);
  const subraces = SUBRACES[race];

  const [pClass, setClass] = useState('fighter');

  useEffect(() => {
    const firstSubrace = getFirstSubrace(race);
    setSubrace(firstSubrace);
    setAge(getMinAttr(race, firstSubrace, 'age'));
    setHeight(getMinAttr(race, firstSubrace, 'height'));
    setWeight(getMinAttr(race, firstSubrace, 'weight'));
  }, [race]);

  useEffect(() => {
    setAge(getMinAttr(race, subrace, 'age'));
    setHeight(getMinAttr(race, subrace, 'height'));
    setWeight(getMinAttr(race, subrace, 'weight'));
  }, [subrace]);

  return (
    <Form method="post">
      <p>
        <label>
          Nombre: {errors?.name ? <em>{errors.name}</em> : null}
          <input type="text" name="name" />
        </label>
      </p>

      <p>
        <label>
          Raza:
          <select
            name="race"
            value={race}
            onChange={e => setRace(e.target.value)}
          >
            {Object.keys(RACES).map(raceName => (
              <option value={raceName} key={raceName}>
                {translateRace(raceName)}
              </option>
            ))}
          </select>
        </label>
      </p>

      {!!subraces && (
        <p>
          <label>
            Subraza:
            <select
              name="subrace"
              value={subrace}
              onChange={e => setSubrace(e.target.value)}
            >
              {subraces.map(subrace => (
                <option value={subrace} key={subrace}>
                  {translateRace(subrace)}
                </option>
              ))}
            </select>
          </label>
        </p>
      )}

      <p>
        <label htmlFor="age">
          Edad:{' '}
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={e => setAge(e.target.value)}
            min={getMinAttr(race, subrace, 'age')}
            max={getMaxAttr(race, subrace, 'age')}
          />{' '}
          a??os
          <br />
          <input
            type="range"
            id="age"
            name="age"
            value={age}
            onChange={e => setAge(e.target.value)}
            min={getMinAttr(race, subrace, 'age')}
            max={getMaxAttr(race, subrace, 'age')}
            step={1}
            list="ageMarkers"
            className={styles.rangeMarks}
          />
          <datalist id="ageMarkers">
            {getMarkers(race, subrace, 'age')}
          </datalist>
        </label>
      </p>

      <p>
        <label htmlFor="height">
          Altura:{' '}
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            onChange={e => setHeight(e.target.value)}
            min={getMinAttr(race, subrace, 'height')}
            max={getMaxAttr(race, subrace, 'height')}
          />{' '}
          cm
          <br />
          <input
            type="range"
            id="height"
            name="height"
            value={height}
            onChange={e => setHeight(e.target.value)}
            min={getMinAttr(race, subrace, 'height')}
            max={getMaxAttr(race, subrace, 'height')}
            step={1}
            list="heightMarkers"
            className={styles.rangeMarks}
          />
          <datalist id="heightMarkers">
            {getMarkers(race, subrace, 'height')}
          </datalist>
        </label>
      </p>

      <p>
        <label htmlFor="weight">
          Peso:{' '}
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            min={getMinAttr(race, subrace, 'weight')}
            max={getMaxAttr(race, subrace, 'weight')}
          />{' '}
          kg
          <br />
          <input
            type="range"
            id="weight"
            name="weight"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            min={getMinAttr(race, subrace, 'weight')}
            max={getMaxAttr(race, subrace, 'weight')}
            step={1}
            list="weightMarkers"
            className={styles.rangeMarks}
          />
          <datalist id="weightMarkers">
            {getMarkers(race, subrace, 'weight')}
          </datalist>
        </label>
      </p>

      <p>
        <label>
          Clase:
          <select
            name="pClass"
            value={pClass}
            onChange={e => setClass(e.target.value)}
          >
            {Object.keys(CLASSES).map(pClassName => (
              <option value={pClassName} key={pClassName}>
                {translateClass(pClassName)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p>
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Creando...' : 'Continuar'}
        </button>
      </p>
    </Form>
  );
}

export default PcRace;
