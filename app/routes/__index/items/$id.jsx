import { json } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { useTitle } from '~/components/hooks/useTitle';
import { ITEM_CATEGORY, ITEM_RARITY } from '~/domain/equipment/items';
import { Title, links as titleLinks } from '~/components/form/title';
import { t } from '~/domain/translations';
import { getItem, updateItem } from '~/services/item.server';
import { ALL_ARMORS, ARMORS } from '~/domain/equipment/armors';
import { ALL_WEAPONS, WEAPONS } from '~/domain/equipment/weapons';

import styles from '~/components/item.css';
import { ALL_SPELLS_BY_TRANSLATION } from '~/domain/spells/getSpells';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }, ...titleLinks()];
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ params }) => {
  const { id } = params;

  const item = await getItem(id);

  return json({ item });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  const rarity = formData.get('rarity');
  const category = formData.get('category');
  const subtype = formData.get('subtype');
  const charges = formData.get('charges');
  const consumable = formData.get('consumable');
  const description = formData.get('description');

  await updateItem(id, {
    name,
    rarity,
    category,
    subtype,
    consumable: consumable === 'on',
    charges,
    description,
  });

  return null;
};

function NewItem() {
  const { item } = useLoaderData();

  useTitle('Nuevo item');

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  const [isArmor, setIsArmor] = useState(item?.category === 'armor');
  const [isWeapon, setIsWeapon] = useState(item?.category === 'weapon');
  const [isScroll, setIsScroll] = useState(item?.category === 'scroll');
  useEffect(() => {
    setIsArmor(item?.category === 'armor');
    setIsWeapon(item?.category === 'weapon');
    setIsScroll(item?.category === 'scroll');
  }, [item?.category]);

  return (
    <Form method="post" className="item__wrapper">
      <input readOnly type="text" name="id" value={item?.id} hidden />

      <div className="item__buttons">
        <Link to="/items" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="item__save">
          ⇧ Guardar
        </button>
        <Link to="/items/new" className="menus__back-button">
          ⇩ Nuevo
        </Link>
      </div>

      <div className="item__content">
        <hr className="item__section-divider" />
        <div className="item__header">
          <Title
            inputName="name"
            className="item__title"
            inputClass="item__title-input"
            defaultValue={item?.name}
          />
        </div>
        <hr className="item__section-divider" />

        <div className="item__section">
          <select
            type="text"
            name="rarity"
            defaultValue={item?.rarity}
            className="item__select"
          >
            <option value="" disabled selected>
              {t('rarity')}
            </option>
            {ITEM_RARITY.map(rarityType => (
              <option key={rarityType} value={rarityType}>
                {t(rarityType)}
              </option>
            ))}
          </select>

          <select
            type="text"
            name="category"
            defaultValue={item?.category}
            className="item__select"
            onChange={e => {
              e.target.value === 'armor' ? setIsArmor(true) : setIsArmor(false);
              e.target.value === 'weapon'
                ? setIsWeapon(true)
                : setIsWeapon(false);
            }}
          >
            <option value="" disabled selected>
              {t('category')}
            </option>
            {ITEM_CATEGORY.map(category => (
              <option key={category} value={category}>
                {t(category)}
              </option>
            ))}
          </select>

          {!!isArmor && (
            <select
              type="text"
              name="subtype"
              className="item__select"
              defaultValue={item?.subtype}
            >
              <option value="" disabled selected>
                Tipo de armadura
              </option>
              {ALL_ARMORS.map(armorName => {
                return (
                  <option key={armorName} value={armorName}>
                    {ARMORS()[armorName]().translation}
                  </option>
                );
              })}
            </select>
          )}

          {!!isWeapon && (
            <select
              type="text"
              name="subtype"
              className="item__select"
              defaultValue={item?.subtype}
            >
              <option value="" disabled selected>
                Tipo de arma
              </option>
              {ALL_WEAPONS.map(weaponName => {
                return (
                  <option key={weaponName} value={weaponName}>
                    {WEAPONS()[weaponName]().translation}
                  </option>
                );
              })}
            </select>
          )}
          
          {!!isScroll && (
            <select
              type="text"
              name="subtype"
              className="item__select"
              defaultValue={item?.subtype}
            >
              <option value="" disabled>
                Tipo de pergamino
              </option>
              {ALL_SPELLS_BY_TRANSLATION.map(spellWithTranslation => {
                return (
                  <option
                    key={spellWithTranslation.name}
                    value={spellWithTranslation.name}
                  >
                    {spellWithTranslation.translation}
                  </option>
                );
              })}
            </select>
          )}

          <label htmlFor="charges" className="item__checkbox-label">
            <span className="item__checkbox-text">Cargas</span>
            <input
              type="number"
              name="charges"
              id="charges"
              defaultValue={item?.charges || 0}
              className="item__input item__input--number-2"
            />
          </label>

          <label htmlFor="consumable" className="item__checkbox-label">
            <input
              type="checkbox"
              name="consumable"
              id="consumable"
              defaultChecked={item?.consumable}
            />{' '}
            <span className="item__checkbox-text">Consumible</span>
          </label>
        </div>
      </div>

      <div className="item__notes">
        <h2 className="item__notes-title">Descripción</h2>
        <textarea
          ref={notesRef}
          name="description"
          className="item__notes-text"
          onInput={textareaCallback}
        >
          {!!item?.description && item?.description}
        </textarea>
      </div>
    </Form>
  );
}

export default NewItem;
