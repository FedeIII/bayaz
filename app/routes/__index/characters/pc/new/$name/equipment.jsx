import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';

import { getPc, updatePc } from '~/services/pc.server';
import { EquipmentCombo } from '~/components/equipment/equipmentCombo';
import { getEquipmentComboData } from '~/components/equipment/getEquipmentComboData';
import { getClassEquipment } from '~/domain/equipment/equipment';
import { distributeItems } from '~/domain/characters';

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
  const packName = formData.get('pack');

  const equipment = getEquipmentComboData({
    formData,
    numberOfEquipmentOptions: getClassEquipment(pClass).length,
    otherInputNames: ['items'],
  });

  const pc = await getPc(name);

  await updatePc({
    name,
    items: distributeItems(pc, equipment),
    pack: packName,
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function PcEquipment() {
  const { pc } = useLoaderData();
  const { name, pClass } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Form method="post">
      <h2>Equipamiento para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />
      <input readOnly type="text" name="pClass" value={pClass} hidden />

      <div className="characters__equipment-container">
        <div className="cards">
          {(getClassEquipment(pClass) || []).map((combo, comboSection) => (
            <div className="cards__card" key={comboSection}>
              <EquipmentCombo
                pc={pc}
                combo={combo}
                comboSection={comboSection}
                depth={0}
              />
            </div>
          ))}
        </div>
        <p>
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creando...' : 'Elige habilidades'}
          </button>
        </p>
      </div>
    </Form>
  );
}

export default PcEquipment;
