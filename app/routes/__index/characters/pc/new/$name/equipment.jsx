import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { Fragment } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { itemWithAmount } from '~/utils/display';
import {
  CLASS_EQUIPMENT,
  pcItem,
  translateEquipment,
} from '~/utils/equipment/equipment';

import styles from '~/components/characters.module.css';

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
  const items = formData.getAll('items[]');

  const choices = Array.from(Array(CLASS_EQUIPMENT[pClass].length), (_, i) =>
    formData.get(`choices-${i}`)
  ).filter(v => v);

  const equipment = [...choices, ...items].reduce((items, inputValue) => {
    const itemPairs = inputValue.split('|').map(pair => pair.split(','));
    return [
      ...items,
      ...itemPairs.map(([itemName, itemAmount]) =>
        pcItem(itemName, itemAmount)
      ),
    ];
  }, []);

  await updatePc({
    name,
    equipment,
    pack: packName,
  });

  return redirect(`/characters/pc/${name}/summary`);
};

function EquipmentCombo(props) {
  const { pc, combo, logic, comboSection, depth } = props;

  if (combo.or)
    return (
      <>
        {depth === 0 && <h3>Escoge entre</h3>}
        {/* {depth > 0 && <span>entre</span>} */}
        <div>
          {combo.or.map((orItem, i) => (
            <EquipmentCombo
              pc={pc}
              combo={orItem}
              logic="or"
              comboSection={comboSection}
              depth={depth + 1}
              key={i}
            />
          ))}
        </div>
      </>
    );

  if (combo.and) {
    if (logic === 'or') {
      return (
        <label
          htmlFor={combo.name}
          className={styles.equipmentItem}
          key={combo.name}
        >
          <input
            type="radio"
            name={`choices-${comboSection}`}
            id={combo.name}
            value={combo.and
              .map(item => `${item.name},${item.amount}`)
              .join('|')}
          />{' '}
          {combo.and
            .map(item => itemWithAmount(item.translation, item.amount))
            .join(', ')}
        </label>
      );
    } else {
      return (
        <>
          {depth === 0 && <h3>{translateEquipment(combo.and[0].type)}</h3>}
          {/* {depth > 0 && <span>entre</span>} */}
          <div>
            <input
              readOnly
              type="text"
              name={`choices-${comboSection}`}
              id={combo.name}
              value={combo.and
                .map(item => `${item.name},${item.amount}`)
                .join('|')}
              hidden
            />
            {combo.and.map((andItem, i) => (
              <EquipmentCombo
                pc={pc}
                combo={andItem}
                logic="and"
                comboSection={comboSection}
                depth={depth + 1}
                key={i}
              />
            ))}
          </div>
        </>
      );
    }
  }

  if (logic === 'or') {
    if (combo.if) {
      if (combo.if(pc))
        return (
          <EquipmentCombo
            pc={pc}
            combo={combo.item}
            logic="or"
            comboSection={comboSection}
            depth={depth + 1}
          />
        );
      else return null;
    } else if (combo.type) {
      return (
        <label htmlFor={combo.name} className={styles.equipmentItem}>
          <input
            type="radio"
            name={`choices-${comboSection}`}
            id={combo.name}
            value={[combo.name, combo.amount]}
          />{' '}
          {itemWithAmount(combo.translation, combo.amount)}
        </label>
      );
    } else if (combo.packName) {
      return (
        <>
          <label htmlFor={combo.packName} className={styles.equipmentItem}>
            <input
              type="radio"
              name="pack"
              id={combo.packName}
              value={combo.packName}
            />{' '}
            {combo.translation}
          </label>
          <div>
            Que contiene:
            <ul>
              <ul>
                {Object.values(combo.items).map(item => (
                  <li key={item().name}>{item().translation}</li>
                ))}
              </ul>
            </ul>
          </div>
        </>
      );
    }
  } else if (logic === 'and') {
    if (combo.type)
      return <li>{itemWithAmount(combo.translation, combo.amount)}</li>;
  } else {
    if (combo.type)
      return (
        <>
          {depth === 0 && <h3>{translateEquipment(combo.type)}</h3>}
          {/* {depth > 0 && <h4>{translateEquipment(combo.type)}s </h4>} */}
          {itemWithAmount(combo.translation, combo.amount)}
          <input
            readOnly
            type="text"
            name="items[]"
            value={[combo.name, combo.amount]}
            hidden
          />
        </>
      );
    else if (combo.packName)
      return (
        <>
          {<h3>Un {combo.translation}</h3>}
          <input
            readOnly
            type="text"
            name="pack"
            value={combo.packName}
            hidden
          />
          <div>
            Que contiene:
            <ul>
              {Object.values(combo.items).map(item => (
                <li key={item().name}>{item().translation}</li>
              ))}
            </ul>
          </div>
        </>
      );
  }

  return 'Equipment case not implemented';
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
      <input readOnly type="text" name="pClass" value={pClass} hidden />

      <div className={styles.equipmentContainer}>
        <div className={styles.equipment}>
          {CLASS_EQUIPMENT[pClass].map((combo, comboSection) => (
            <div className={styles.equipmentOptions} key={comboSection}>
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
