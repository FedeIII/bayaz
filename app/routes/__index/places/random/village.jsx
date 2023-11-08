import { useEffect, useRef, useState } from 'react';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import {
  VILLAGE,
  getPopulation,
  randomSettlementName,
} from '~/domain/places/places';
import {
  getVillageAccommodation,
  getVillageGovernment,
  getVillageReligion,
  getVillageSecurity,
  randomVillageImage,
} from '~/domain/places/village';
import {
  createSettlement,
  getSettlement,
  updateSettlement,
} from '~/services/settlements.server';
import { replaceAt } from '~/utils/insert';

import styles from '~/components/places.module.css';
import menuStyles from '~/components/menus.module.css';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

export const loader = async ({ request }) => {
  let village;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const rng = url.searchParams.get('rng');
  let files;

  if (id) {
    village = await getSettlement(id);
    if (!village) {
      throw new Error('Village not found');
    }
  } else {
    const path = await import('path');
    const fs = await import('fs/promises');
    const publicFolderPath = path.join(
      process.cwd(),
      'public/images/places/village/'
    );
    try {
      files = await fs.readdir(publicFolderPath);
    } catch (error) {
      files = [];
    }
  }

  return json({ village, files, isNew: !id, rng });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  const attrs = {
    type: 'village',
    name: formData.get('name'),
    img: formData.get('img'),
    population: parseInt(formData.get('population'), 10),
    accommodation: formData.getAll('accommodation[]'),
    guards: parseInt(formData.get('guards') || 0, 10),
    militia: parseInt(formData.get('militia') || 0, 10),
    temples: formData.getAll('temples[]'),
    shrines: formData.getAll('shrines[]'),
    notes: formData.get('notes'),
  };

  let settlement;
  if (id) {
    settlement = await updateSettlement(id, attrs);
  } else {
    settlement = await createSettlement(attrs);
  }

  return redirect(`/places/${settlement.id}`);
};

function Village() {
  const { village, files, isNew, rng } = useLoaderData();

  const [showNameInput, setShowNameInput] = useState(false);
  const nameRef = useRef();
  useEffect(() => {
    if (showNameInput) {
      nameRef.current.focus();
    }
  }, [showNameInput]);

  const notesRef = useRef();
  useEffect(() => {
    if (notesRef.current) {
      textareaCallback({ target: notesRef.current });
    }
  }, [notesRef.current]);

  const [place, setPlace] = useState({
    name: '',
    img: '',
    population: 0,
    accommodation: '',
    government: false,
    security: { guards: 0, militia: 0 },
    religion: { temples: [], shrines: [] },
    notes: '',
  });

  useEffect(() => {
    if (isNew) {
      const population = getPopulation(VILLAGE);
      const accommodation = getVillageAccommodation(population);
      const religion = getVillageReligion();
      const img = randomVillageImage(
        files,
        population,
        accommodation,
        religion
      );

      setPlace(old => ({
        ...old,
        name: randomSettlementName(),
        img,
        population,
        accommodation,
        government: getVillageGovernment(),
        security: getVillageSecurity(population),
        religion,
      }));
    } else if (isNew === false) {
      setPlace(old => ({
        ...old,
        name: village.name,
        img: village.img,
        population: village.population,
        accommodation: village.accommodation[0],
        government: getVillageGovernment(),
        security: { [village.securityType]: village.security },
        religion: village.religion,
        notes: village.notes,
      }));
    }
  }, [village, isNew, rng]);

  function onNameChange(e) {
    setPlace(p => ({ ...p, name: e.target.value }));
  }

  function onPopulationChange(e) {
    setPlace(p => ({ ...p, population: e.target.value }));
  }

  function onAccommodationChange(e) {
    setPlace(p => ({ ...p, accommodation: e.target.value }));
  }

  function onSecurityGuardsChange(e) {
    setPlace(p => ({ ...p, security: { guards: e.target.value } }));
  }

  function onSecurityMilitiaChange(e) {
    setPlace(p => ({ ...p, security: { militia: e.target.value } }));
  }

  function onTempleNameChange(i, e) {
    setPlace(p => ({
      ...p,
      religion: { temples: replaceAt(i, religion.temples, e.target.value) },
    }));
  }

  function onShrineNameChange(i, e) {
    setPlace(p => ({
      ...p,
      religion: { shrines: replaceAt(i, religion.shrines, e.target.value) },
    }));
  }

  function onNotesChange(e) {
    setPlace(p => ({ ...p, notes: e.target.value }));
  }

  const {
    name,
    img,
    population,
    accommodation,
    government,
    security = {},
    religion = {},
    notes,
  } = place;

  return (
    <Form method="post">
      {!!village && (
        <input readOnly type="text" name="id" value={village.id} hidden />
      )}
      <div className={styles.buttons}>
        <Link to="../" className={menuStyles.backButton}>
          ⇦ Volver
        </Link>
        <button type="submit" className={styles.save}>
          ⇧ Guardar Aldea
        </button>
        <Link to={`./?rng=${Math.random()}`} className={menuStyles.backButton}>
          ⇩ Nueva Aldea
        </Link>
      </div>

      <div className={styles.horizontalSections}>
        <div className={styles.verticalSections}>
          {!!img && (
            <div className={styles.imageContainer}>
              <img
                src={`/images/places/${img}`}
                className={styles.image}
                width="100%"
              />
              <input readOnly type="text" name="img" value={img} hidden />
            </div>
          )}

          <div className={styles.info}>
            <h1 className={styles.title}>
              <span
                style={{ display: showNameInput ? 'none' : 'inline' }}
                onClick={() => setShowNameInput(true)}
              >
                <span className={styles.titleCapital}>{name?.slice(0, 1)}</span>
                {name?.slice(1)}
              </span>
              <input
                ref={nameRef}
                type="text"
                name="name"
                value={name}
                className={styles.titleInput}
                style={{ display: showNameInput ? 'inline' : 'none' }}
                onBlur={() => setShowNameInput(false)}
                onChange={onNameChange}
              />
            </h1>

            <hr className={styles.sectionDivider} />
            <div className={styles.subtitle}>
              <span>Aldea</span>
              <span>
                <span className={styles.traitTitle}>Población:</span> ≈
                <input
                  type="number"
                  name="population"
                  value={population}
                  onChange={onPopulationChange}
                  className={`${styles.traitInput} ${styles.numberInput4}`}
                />
              </span>
            </div>

            {!!accommodation && (
              <>
                <hr className={styles.sectionDivider} />
                <div className={styles.trait}>
                  <span>
                    <span className={styles.traitTitle}>Alojamientos:</span>{' '}
                    <input
                      type="text"
                      name="accommodation[]"
                      value={accommodation}
                      onChange={onAccommodationChange}
                      className={styles.traitInput}
                    />
                  </span>
                </div>
              </>
            )}

            <hr className={styles.sectionDivider} />
            <div className={styles.traitMultiple}>
              <span>
                <span className={styles.traitTitle}>Gobierno:</span> Alguacil{' '}
                {!government && 'no '}presente
              </span>
              <span>
                <span className={styles.traitTitle}>Seguridad:</span>{' '}
                {security.guards && (
                  <span>
                    <input
                      type="number"
                      name="guards"
                      value={security.guards}
                      onChange={onSecurityGuardsChange}
                      className={`${styles.traitInput} ${styles.numberInput1}`}
                    />{' '}
                    guardias
                  </span>
                )}
                {security.militia && (
                  <span>
                    <input
                      type="number"
                      name="militia"
                      value={security.militia}
                      onChange={onSecurityMilitiaChange}
                      className={`${styles.traitInput} ${styles.numberInput1}`}
                    />{' '}
                    milicias
                  </span>
                )}
              </span>
            </div>

            {!!(religion.temples?.length || religion.shrines?.length) && (
              <>
                <hr className={styles.sectionDivider} />
                <div className={styles.trait}>
                  <span className={styles.traitTitle}>Religión:</span>{' '}
                  <div className={styles.verticalSections}>
                    {!!religion.temples?.length && (
                      <ul className={styles.traitList}>
                        Templos:{' '}
                        {religion.temples.map((deityName, i) => (
                          <li key={i}>
                            <input
                              type="text"
                              name="temples[]"
                              value={deityName}
                              onChange={e => onTempleNameChange(i, e)}
                              className={styles.traitInput}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                    {!!religion.shrines?.length && (
                      <ul className={styles.traitList}>
                        Santuarios:{' '}
                        {religion.shrines.map((deityName, i) => (
                          <li key={i}>
                            <input
                              type="text"
                              name="shrines[]"
                              value={deityName}
                              onChange={e => onShrineNameChange(i, e)}
                              className={styles.traitInput}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}

            <hr className={styles.sectionDivider} />
          </div>
        </div>
        <div className={styles.notes}>
          <h2 className={styles.notesTitle}>Notas</h2>
          <textarea
            ref={notesRef}
            name="notes"
            value={notes}
            className={styles.notesText}
            onChange={onNotesChange}
            onInput={textareaCallback}
          ></textarea>
        </div>
      </div>
    </Form>
  );
}

export default Village;
