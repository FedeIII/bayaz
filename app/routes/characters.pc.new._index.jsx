import { json, redirect } from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';

import {
  RACES,
  SUBRACES,
  translateRace,
  translateClass,
  setLanguages,
  CHARACTER_CLASSES,
} from '~/domain/characters';
import { createPc } from '~/services/pc.server';
import { getSpell } from '~/domain/spells/getSpells';
import { getSessionUser } from '~/services/session.server';
import { Title, links as buildingDetailsLinks } from '~/components/form/title';
import NumericInput from '~/components/inputs/numeric';
import { isDm } from '~/domain/user';

import styles from '~/components/cards/cards.css';
export const links = () => {
  return [...buildingDetailsLinks(), { rel: 'stylesheet', href: styles }];
};

const NUMBER_OF_AGE_MARKS = 5;

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  return json({ isDm: isDm(user) });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const npc = formData.get('npc');
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
  if (race === 'elf' && subrace === 'drow') {
    spells.push(getSpell('dancingLights', 'sorcerer'));
  }

  const pc = {
    npc: npc === 'on',
    name,
    race,
    subrace,
    age,
    height,
    weight,
    pClass,
    level: 1,
    levelReady: 1,
    skills: RACES[race][subrace].skills,
    exp: 0,
    languages: setLanguages(race, subrace, pClass),
    spells,
    money: {},
  };

  const user = await getSessionUser(request);

  const newPc = await createPc(pc, user.id);

  return redirect(`${newPc.id}/stats`);
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
  const { isDm } = useLoaderData();
  const errors = useActionData();

  const navigation = useNavigation();
  const isCreating = navigation.state === "submitting";

  const [name, setName] = useState('');
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
      <div className="characters__content">
        <div className="characters__trait-columns characters__trait-columns--three">
          <label htmlFor="name" className="characters__trait-label">
            <span className="characters__trait-title">
              Nombre {errors?.name ? <em>{errors.name}</em> : null}
            </span>{' '}
            <Title
              value={name}
              onChange={e => setName(e.target.value)}
              inputName="name"
              className="characters__trait-input-title"
              inputClass="characters__trait-input"
            />
          </label>

          <label htmlFor="race" className="characters__trait-label">
            <span className="characters__trait-title">Raza</span>{' '}
            <select
              name="race"
              value={race}
              className="cards__button-card"
              onChange={e => setRace(e.target.value)}
            >
              {Object.keys(RACES).map(raceName => (
                <option value={raceName} key={raceName}>
                  {translateRace(raceName)}
                </option>
              ))}
            </select>
          </label>

          {!!subraces && (
            <label htmlFor="subrace" className="characters__trait-label">
              <span className="characters__trait-title">Subraza</span>{' '}
              <select
                name="subrace"
                value={subrace}
                className="cards__button-card"
                onChange={e => setSubrace(e.target.value)}
              >
                {subraces.map(subrace => (
                  <option value={subrace} key={subrace}>
                    {translateRace(subrace)}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!!isDm && (
            <label
              htmlFor="npc"
              className="characters__trait-label characters__trait-label--small"
            >
              <span className="characters__trait-title">NPC</span>{' '}
              <input type="checkbox" name="npc" />
            </label>
          )}
        </div>

        <div className="characters__trait-columns characters__trait-columns--three">
          <label htmlFor="age" className="characters__trait-label">
            <span className="characters__trait-title">
              Edad:{' '}
              <NumericInput
                id="age"
                name="age"
                value={age}
                styleName="places__trait-input places__trait-input--number-3"
                onChange={e => setAge(e.target.value)}
                min={getMinAttr(race, subrace, 'age')}
                max={getMaxAttr(race, subrace, 'age')}
              />{' '}
              años
            </span>
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
              className="characters__range-marks"
            />
            <datalist id="ageMarkers">
              {getMarkers(race, subrace, 'age')}
            </datalist>
          </label>

          <label htmlFor="height" className="characters__trait-label">
            <span className="characters__trait-title">
              Altura:{' '}
              <NumericInput
                id="height"
                name="height"
                value={height}
                styleName="places__trait-input places__trait-input--number-3"
                onChange={e => setHeight(e.target.value)}
                min={getMinAttr(race, subrace, 'height')}
                max={getMaxAttr(race, subrace, 'height')}
              />{' '}
              cm
            </span>
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
              className="characters__range-marks"
            />
            <datalist id="heightMarkers">
              {getMarkers(race, subrace, 'height')}
            </datalist>
          </label>

          <label htmlFor="weight" className="characters__trait-label">
            <span className="characters__trait-title">
              Peso:{' '}
              <NumericInput
                id="weight"
                name="weight"
                value={weight}
                styleName="places__trait-input places__trait-input--number-3"
                onChange={e => setWeight(e.target.value)}
                min={getMinAttr(race, subrace, 'weight')}
                max={getMaxAttr(race, subrace, 'weight')}
              />{' '}
              kg
            </span>
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
              className="characters__range-marks"
            />
            <datalist id="weightMarkers">
              {getMarkers(race, subrace, 'weight')}
            </datalist>
          </label>
        </div>

        <div className="characters__trait-columns characters__trait-columns--three">
          <label htmlFor="pClass" className="characters__trait-label">
            <span className="characters__trait-title">Clase</span>{' '}
            <select
              name="pClass"
              value={pClass}
              className="cards__button-card"
              onChange={e => setClass(e.target.value)}
            >
              {CHARACTER_CLASSES().map(pClassName => (
                <option value={pClassName} key={pClassName}>
                  {translateClass(pClassName)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="characters__trait-columns characters__trait-columns--three">
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating}
          >
            {isCreating ? 'Creando...' : 'Continuar'}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default PcRace;
