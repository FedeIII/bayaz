import { Form, Link, useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { json, redirect } from '@remix-run/node';

import { getPlace, updatePlace } from '~/services/place.server';
import { Title } from '~/components/form/title';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ params }) => {
  const place = await getPlace(params.id);
  if (!place) {
    throw new Error('Place not found');
  }

  return json({ place });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  const img = formData.get('img');
  const description = formData.get('description');
  const notes = formData.get('notes');

  const place = await updatePlace(id, { name, img, description, notes });

  return redirect(`/places/generic/${place.id}`);
};

function GenericPlace() {
  const { place: initPlace } = useLoaderData();

  const formRef = useRef();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (initPlace?.id) {
      setPlace(initPlace);
    }
  }, [initPlace]);

  const descriptionRef = useRef();
  useEffect(() => {
    if (descriptionRef.current) {
      textareaCallback({ target: descriptionRef.current });
    }
  }, [descriptionRef.current]);

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  return (
    <Form method="post" ref={formRef}>
      <input readOnly type="text" name="id" value={place?.id} hidden />

      <div className="places__buttons">
        <Link to="../" className="menus__back-button">
          ⇦ Volver
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar Lugar
        </button>
        <Link to="/places/generic/new" className="menus__back-button">
          ⇩ Nuevo Lugar
        </Link>
        <Link to="players" target="_blank" className="places__save">
          ⇨ Presentar
        </Link>
      </div>

      <div className="places__horizontal-sections">
        <div className="places__vertical-sections">
          <div className="places__image-container">
            {place?.img ? (
              <>
                <img src={place?.img} className="places__image" width="100%" />
                <input
                  readOnly
                  type="text"
                  name="img"
                  value={place?.img}
                  hidden
                />
              </>
            ) : (
              <>
                Imagen: <input type="text" name="img" />
              </>
            )}
          </div>

          <div className="places__info">
            <Title
              inputName="name"
              value={place?.name}
              onChange={e => setPlace(p => ({ ...p, name: e.target.value }))}
            />

            <hr className="places__section-divider" />

            <div className="places__trait">
              <div className="places__horizontal-sections">
                <div className="places__trait-title">Descripción</div>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={place?.description}
                  className="places__trait-input"
                  onChange={e =>
                    setPlace(p => ({ ...p, description: e.target.value }))
                  }
                  onInput={textareaCallback}
                ></textarea>
              </div>
            </div>

            <hr className="places__section-divider" />
          </div>
        </div>

        <div className="places__notes">
          <h2 className="places__notes-title">Notas</h2>
          <textarea
            ref={notesRef}
            name="notes"
            value={place?.notes}
            className="places__notes-text"
            onChange={e => setPlace(p => ({ ...p, notes: e.target.value }))}
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default GenericPlace;
