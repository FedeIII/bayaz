import { redirect } from '@remix-run/node';
import { useEffect, useRef } from 'react';
import { Form, Link } from '@remix-run/react';

import { useTitle } from '~/components/hooks/useTitle';
import { ITEM_RARITY } from '~/domain/equipment/items';
import { Title } from '~/components/form/title';
import { t } from '~/domain/translations';
import { createItem } from '~/services/item.server';

import styles from '~/components/item.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const rarity = formData.get('rarity');
  const consumable = formData.get('consumable');
  const description = formData.get('description');
  const item = await createItem({
    name,
    rarity,
    consumable: consumable === 'true',
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

          <div className="item__section">
            <select type="text" name="rarity" className="item__select">
              <option value="" disabled selected>
                {t('rarity')}
              </option>
              {ITEM_RARITY.map(rarityType => (
                <option key={rarityType} value={rarityType}>
                  {t(rarityType)}
                </option>
              ))}
            </select>
          </div>

          <div className="item__section">
            <label htmlFor="consumable" className="item__checkbox-label">
              <input type="checkbox" name="consumable" id="consumable" />{' '}
              <span className="item__checkbox-text">Consumible</span>
            </label>
          </div>
        </div>
        <hr className="item__section-divider" />

        <div className="item__notes">
          <h2 className="item__notes-title">Descripción</h2>
          <textarea
            ref={notesRef}
            name="description"
            className="item__notes-text"
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default NewItem;
