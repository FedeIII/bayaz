import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';

import {
  BACKGROUNDS,
  translateBackground,
} from '~/domain/backgrounds/backgrounds';
import BackgroundSelection from '~/components/backgrounds/backgroundSelection';
import { getEquipmentComboData } from '~/components/equipment/getEquipmentComboData';
import { distributeItems } from '~/domain/characters';

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
  const background = formData.get('background');
  const skills = formData.getAll('skills[]') || [];
  const languages = formData.getAll('languages[]') || [];
  const proficiencies = getEquipmentComboData({
    formData,
    numberOfEquipmentOptions:
      BACKGROUNDS[background].proficientItems?.length || 0,
    comboName: 'proficiency',
    otherInputNames: ['items'],
  });
  const equipment = getEquipmentComboData({
    formData,
    numberOfEquipmentOptions: BACKGROUNDS[background].equipment?.length || 0,
    comboName: 'equipment',
    otherInputNames: ['items'],
  });
  const moneyString = formData.get('money') || '';
  const money = moneyString.split(',').reduce(
    (m, mString) => ({
      ...m,
      [mString.split(':')[0]]: parseInt(mString.split(':')[1], 10),
    }),
    {}
  );
  const thingsFromTopics = Object.entries(
    BACKGROUNDS[background]?.select || {}
  ).reduce(
    (pcAttrs, [topic, topicAttrs]) => ({
      ...pcAttrs,
      [topic]:
        topicAttrs.amount > 1
          ? formData.getAll(topic + '[]')
          : formData.get(topic),
    }),
    {}
  );

  const pc = await getPc(id);

  await updatePc({
    id,
    background: { name: background, skills, ...thingsFromTopics },
    languages: [...pc.languages, ...languages],
    proficientItems: [...pc.proficientItems, ...proficiencies],
    items: distributeItems(pc, equipment),
    money: {
      cp: (pc.money.cp || 0) + (money.cp || 0),
      sp: (pc.money.sp || 0) + (money.sp || 0),
      ep: (pc.money.ep || 0) + (money.ep || 0),
      gp: (pc.money.gp || 0) + (money.gp || 0),
      pp: (pc.money.pp || 0) + (money.pp || 0),
    },
  });

  return redirect(`/characters/pc/new/${id}/equipment`);
};

function PcBackground() {
  const { pc } = useLoaderData();
  const { id, name } = pc;

  const navigation = useNavigation();
  const isCreating = navigation.state === "submitting";

  const [background, setBackground] = useState('');
  const [canContinue, setCanContinue] = useState(false);

  return (
    <Form method="post">
      <div className="characters__content">
        <h2>Trasfondo de {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />
        <input
          readOnly
          type="text"
          name="background"
          value={background}
          hidden
        />

        <div className="characters__trait-columns characters__trait-columns--three">
          <select
            name="background"
            className="cards__button-card"
            value={background}
            onChange={e => setBackground(e.target.value)}
          >
            <option value="" disabled>
              Escoge trasfondo
            </option>
            {Object.keys(BACKGROUNDS).map(backgroundName => (
              <option value={backgroundName} key={backgroundName}>
                {translateBackground(backgroundName)}
              </option>
            ))}
          </select>
        </div>

        {background && (
          <BackgroundSelection
            pc={pc}
            backgroundName={background}
            setCanContinue={setCanContinue}
          />
        )}

        <div className="characters__trait-columns characters__trait-columns--three">
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating || !canContinue}
          >
            {isCreating
              ? 'Creando...'
              : canContinue
              ? 'Continuar'
              : 'Elige habilidades'}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default PcBackground;
