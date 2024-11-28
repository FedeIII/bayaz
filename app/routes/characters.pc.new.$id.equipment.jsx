import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';

import { getPc, updatePc } from '~/services/pc.server';
import { EquipmentCombo } from '~/components/equipment/equipmentCombo';
import { getEquipmentComboData } from '~/components/equipment/getEquipmentComboData';
import { getClassEquipment } from '~/domain/equipment/equipment';
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
  const pClass = formData.get('pClass');
  const packName = formData.get('pack');

  const equipment = getEquipmentComboData({
    formData,
    numberOfEquipmentOptions: getClassEquipment(pClass).length,
    otherInputNames: ['items'],
  });

  const pc = await getPc(id);

  await updatePc({
    id,
    items: distributeItems(pc, equipment),
    pack: packName,
  });

  return redirect(`/characters/pc/${id}/summary`);
};

function PcEquipment() {
  const { pc } = useLoaderData();
  const { id, name, pClass } = pc;

  const navigation = useNavigation();
  const isCreating = navigation.state === 'submitting';

  return (
    <Form method="post">
      <div className="characters__content">
        <h2>Equipamiento para {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />
        <input readOnly type="text" name="pClass" value={pClass} hidden />

        <div className="characters__equipment-container">
          <div className="cards cards--columns">
            {(getClassEquipment(pClass) || []).map((combo, comboSection) => (
              <div
                className={`card ${
                  combo.or?.length > 12
                    ? 'characters__equipment-card'
                    : combo.or?.length < 7 && !combo.or?.[0].packName
                    ? 'characters__equipment-card-small'
                    : combo.or?.length > 9
                    ? 'characters__equipment-card-small-2'
                    : ''
                }`}
                key={comboSection}
              >
                <EquipmentCombo
                  pc={pc}
                  combo={combo}
                  comboSection={comboSection}
                  depth={0}
                />
              </div>
            ))}
          </div>
          <div className="characters__trait-columns characters__trait-columns--three">
            <button
              type="submit"
              className="cards__button-card"
              disabled={isCreating}
            >
              {isCreating ? 'Creando...' : 'Elige habilidades'}
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default PcEquipment;
