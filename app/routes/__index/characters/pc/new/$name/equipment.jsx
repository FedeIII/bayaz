import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';

import { getPc, updatePc } from '~/services/pc.server';
import { BARBARIAN_EQUIPMENT } from '~/utils/barbarian';

import styles from '~/components/characters.module.css';
import { pcItem, translateEquipment } from '~/utils/equipment/equipment';

const EQUIPMENT = {
  barbarian: BARBARIAN_EQUIPMENT,
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
  const packName = formData.get('pack');
  const items = formData.getAll('items[]');

  let i = 0;
  const choices = [];
  let choice;
  while ((choice = formData.get(`choices-${i}`))) {
    choices.push(choice);
    i++;
  }

  // const pc = await getPc(name);

  await updatePc({
    name,
    equipment: [...choices, ...items].map(item => {
      const [itemName, itemAmount] = item.split(',');
      return pcItem(itemName, itemAmount);
    }),
    pack: packName,
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function EquipmentCombo(props) {
  const { combo, comboItem, depth } = props;

  if (combo.or) {
    return (
      <>
        {depth === 0 && <h3>Escoge entre</h3>}
        {depth > 0 && <span>entre</span>}
        <div>
          <EquipmentCombo
            combo={combo.or}
            comboItem={comboItem}
            depth={depth + 1}
          />
        </div>
      </>
    );
  }
  if (Array.isArray(combo)) {
    return combo.map((item, i) => (
      <label htmlFor={item.name} className={styles.equipmentItem} key={i}>
        <input
          type="radio"
          name={`choices-${comboItem}`}
          id={item.name}
          value={[item.name, item.amount]}
        />{' '}
        {!!(item.amount > 1) && item.amount + 'x'} {item.translation}
      </label>
    ));
  }
  if (combo.pack) {
    return (
      <>
        {depth === 0 && <h3>Un {combo.pack.translation}</h3>}
        {depth > 0 && <span>un {combo.pack.translation}</span>}
        <p>
          Que contiene:
          <ul>
            <EquipmentCombo
              combo={combo.pack}
              comboItem={comboItem}
              depth={depth + 1}
            />
          </ul>
        </p>
      </>
    );
  }
  if (combo.packName) {
    return (
      <>
        <input readOnly type="text" name="pack" value={combo.packName} hidden />
        {Object.values(combo.items).map(item => (
          <li key={item().name}>{item().translation}</li>
        ))}
      </>
    );
  }
  if (combo.type) {
    return (
      <>
        {depth === 0 && <h3>{translateEquipment(combo.type)}</h3>}
        {depth > 0 && <span>{translateEquipment(combo.type)}s </span>}
        <div>
          {combo.amount > 1 && combo.amount + 'x '}
          {combo.translation}
          <input
            readOnly
            type="text"
            name="items[]"
            value={[combo.name, combo.amount]}
            hidden
          />
        </div>
      </>
    );
  }
}

function PcEquipment() {
  const { pc } = useLoaderData();
  const { name, pClass } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Form method="post">
      <h2>Equipamiento para {name}</h2>
      <input readOnly type="text" name="name" value={name} hidden />

      <div className={styles.equipmentContainer}>
        <div className={styles.equipment}>
          {EQUIPMENT[pClass].map((combo, comboItem) => (
            <div className={styles.equipmentOptions} key={comboItem}>
              <EquipmentCombo combo={combo} comboItem={comboItem} depth={0} />
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
