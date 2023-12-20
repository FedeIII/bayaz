import { redirect } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import { Form, Link } from '@remix-run/react';

import { useTitle } from '~/components/hooks/useTitle';
import { ITEM_CATEGORY, ITEM_RARITY } from '~/domain/equipment/items';
import { Title, links as titleLinks } from '~/components/form/title';
import { t } from '~/domain/translations';
import { createItem } from '~/services/item.server';
import { ALL_ARMORS, ARMORS } from '~/domain/equipment/armors';
import { ALL_WEAPONS, WEAPONS } from '~/domain/equipment/weapons';
import { ALL_SPELLS_BY_TRANSLATION } from '~/domain/spells/getSpells';

import styles from '~/components/item.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }, ...titleLinks()];
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const rarity = formData.get('rarity');
  const category = formData.get('category');
  const subcategory = formData.get('subcategory');
  const hasCharges = formData.get('hasCharges');
  const charges = formData.get('charges');
  const consumable = formData.get('consumable');
  const description = formData.get('description');
  const item = await createItem({
    name,
    rarity,
    category,
    subcategory,
    consumable: consumable === 'true',
    charges: hasCharges ? charges : null,
    maxCharges: hasCharges ? charges : null,
    description,
  });
  return redirect(`/items/${item.id}`);
};

function NewItem() {
  useTitle('Nuevo item');

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  const [isArmor, setIsArmor] = useState(false);
  const [isWeapon, setIsWeapon] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [hasCharges, setHasCharges] = useState(false);

  return (
    <Form method="post" className="item__wrapper">
      <div className="item__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="item__save">
          ⇧ Guardar
        </button>
      </div>

      <div className="item__content">
        <hr className="item__section-divider" />
        <div className="item__header">
          <Title
            inputName="name"
            className="item__title"
            inputClass="item__title-input"
          />
        </div>
        <hr className="item__section-divider" />

        <div className="item__section">
          <select
            type="text"
            name="rarity"
            className="item__select"
            defaultValue=""
          >
            <option value="" disabled>
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
            className="item__select"
            onChange={e => {
              e.target.value === 'armor' ? setIsArmor(true) : setIsArmor(false);
              e.target.value === 'weapon'
                ? setIsWeapon(true)
                : setIsWeapon(false);
              e.target.value === 'scroll'
                ? setIsScroll(true)
                : setIsScroll(false);
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
            <select type="text" name="subcategory" className="item__select">
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
            <select type="text" name="subcategory" className="item__select">
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
            <select type="text" name="subcategory" className="item__select">
              <option value="" disabled selected>
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

          <label htmlFor="hasCharges" className="item__checkbox-label">
            <input
              type="checkbox"
              name="hasCharges"
              id="hasCharges"
              onChange={e => setHasCharges(e.target.checked)}
            />{' '}
            <span className="item__checkbox-text">Tiene cargas?</span>
          </label>

          {hasCharges && (
            <label htmlFor="charges" className="item__checkbox-label">
              <span className="item__checkbox-text">Cargas</span>
              <input
                type="number"
                name="charges"
                id="charges"
                defaultValue="0"
                className="item__input item__input--number-2"
              />
            </label>
          )}

          <label htmlFor="consumable" className="item__checkbox-label">
            <input type="checkbox" name="consumable" id="consumable" />{' '}
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
        ></textarea>
      </div>
    </Form>
  );
}

export default NewItem;
