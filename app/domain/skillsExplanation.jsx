import { Link } from '@remix-run/react';
import HitDiceActions from '~/components/skills/hitDiceActions';
import {
  CLASSES,
  getArmorClass,
  getAttackBonus,
  getAttackExtraBonus,
  getExtraArmorClass,
  getExtraHitPoints,
  getStat,
  getStatMod,
  getTotalAttackBonusWithExtras,
  translateClass,
} from './characters';
import { getAcBreakdown, increment } from './display';
import { getItem } from './equipment/equipment';
import { t } from './translations';
import { createNotes } from '~/services/pc.server';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const actions = {
  createNotes: async formData => {
    const id = formData.get('id');
    const position = formData.get('position');

    return await createNotes(id, position.split(','));
  },
};

export const SKILLS_EXPLANATION = {
  levelUp: (skill, pc) => {
    return (
      <>
        <p>
          Cada vez que ganas un nivel, ganas 1 Dado de Golpe adicional. Lanza el
          Dado de Golpe, añade tu modificador de Constitución a la tirada y
          añade el total a tu máximo de Puntos de Golpe. Opcionalmente, puedes
          utilizar el valor fijo que se muestra en la entrada de la clase, que
          es el resultado medio de la tirada de tu Dado de Golpe (redondeando
          hacia arriba).
        </p>

        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/levelUp`}
            className="inventory-item__modal-button"
          >
            Gana Puntos de Golpe
          </Link>
        </div>
      </>
    );
  },

  abilityScoreImprovement: (skill, pc) => {
    const {
      statImprove: [firstLevel, ...restLevels],
    } = CLASSES()[pc.pClass];
    return (
      <>
        <p>
          Cuando alcanzas el nivel {firstLevel}, y nuevamente a los niveles{' '}
          {restLevels.join(', ')}, puedes incrementar una puntuación de
          característica de tu elección en 2 puntos, o dos puntuaciones de
          característica de tu elección en 1 punto. Como es habitual, no puedes
          incrementar una puntuación de característica por encima de 20 usando
          este procedimiento.
        </p>
        <p>
          Alternativamente, puedes escoger una dote. Una dote representa un
          talento o una materia en la que el personaje es experto y le
          proporciona capacidades especiales. Encarna el entrenamiento, la
          experiencia y las facultades que van más lejos de lo que una clase
          puede proporcionar.
        </p>

        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/abilityScoreImprovement`}
            className="inventory-item__modal-button"
          >
            Escoge puntos de caracterísitica o dote
          </Link>
        </div>
      </>
    );
  },

  newSpells: (skill, pc) => (
    <>
      <p>Aprendes nuevos trucos y/o conjuros de {translateClass(pc.pClass)}</p>
      <div className="inventory-item__modal-buttons">
        <Link
          to={`/characters/pc/${pc.id}/leveling/newSpells`}
          className="inventory-item__modal-button"
        >
          Escoge conjuros
        </Link>
      </div>
    </>
  ),

  maxHitPoints: (skill, pc) => {
    const { totalHitPoints, level } = pc;
    const extraHitPoints = getExtraHitPoints(pc);
    const conHp = getStatMod(getStat(pc, 'con'));
    const extraHp = extraHitPoints - conHp * level;

    return (
      <div className="inventory-item__hp-container">
        <table className="inventory-item__table">
          <thead className="inventory-item__table-head">
            <tr>
              <th className="inventory-item__table-cell">Nivel</th>
              {totalHitPoints.map((roll, i) => (
                <th className="inventory-item__table-cell-level">{i + 1}</th>
              ))}
              <th className="inventory-item__table-cell-extra">Con</th>
              {!!extraHp && (
                <th className="inventory-item__table-cell-extra">Extra HP</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="inventory-item__table-cell">HP</td>
              {totalHitPoints.map(roll => (
                <td className="inventory-item__table-cell-level">
                  {increment(roll)}
                </td>
              ))}
              <td className="inventory-item__table-cell-extra">
                {increment(conHp)} x {level}
              </td>
              {!!extraHp && (
                <td className="inventory-item__table-cell-extra">
                  {increment(extraHp)}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  remainingHitDice: (
    skill,
    pc,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm,
    actions,
    openModal,
    selectedAction
  ) => {
    return (
      <HitDiceActions
        skill={skill}
        pc={pc}
        submit={submit}
        closeModal={closeModal}
        selectedAction={selectedAction}
      />
    );
  },

  resetSpellSlots: (
    skill,
    pc,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm,
    actions
  ) => {
    return (
      <div className="inventory-item__hp-container">
        <div className="inventory-item__modal-buttons">
          <button
            type="button"
            className="inventory-item__modal-button"
            onClick={actions.resetSlots}
          >
            Reiniciar espacios
          </button>
        </div>
      </div>
    );
  },

  savingThrows: (skill, pc) => <></>,

  attackBonus: (skill, pc, submit, closeModal, skillIndex) => {
    const { pClass, items: { weapons = {} } = {} } = pc;

    const w = weapons[skillIndex];
    const weapon = getItem(w);
    const {
      subtype,
      properties: { finesse } = {},
      translation,
      subcategory,
    } = weapon;
    const subcategoryTranslation = !!subcategory && t(subcategory);

    const strMod = getStatMod(getStat(pc, 'str'));
    const dexMod = getStatMod(getStat(pc, 'dex'));

    let selectedStat;
    if (finesse) selectedStat = strMod > dexMod ? 'str' : 'dex';
    else if (pClass === 'monk' && isMonkWeapon(weapon))
      selectedStat = strMod > dexMod ? 'str' : 'dex';
    else if (subtype === 'simpleMelee' || subtype === 'martialMelee')
      selectedStat = 'str';
    else if (subtype === 'simpleRanged' || subtype === 'martialRanged')
      selectedStat = 'dex';

    const { statMod, magicBonus, proficiencyBonus, classBonus } =
      getAttackBonus(pc, weapons, weapon);

    const extraBonus = getAttackExtraBonus(pc, weapon);

    const [baseTotalAttackBonus, ...totalAttackBonusWithExtras] =
      getTotalAttackBonusWithExtras(pc, weapons, weapon);

    return (
      <div className="inventory-item__hp-container">
        <table className="inventory-item__table">
          <thead className="inventory-item__table-head">
            <tr>
              <th className="inventory-item__table-cell-level">
                {selectedStat.toUpperCase()}
              </th>
              {!!proficiencyBonus && (
                <th className="inventory-item__table-cell-level inventory-item__table-cell-small">
                  Competencia en {subcategoryTranslation || translation}
                </th>
              )}
              {!!classBonus && (
                <th className="inventory-item__table-cell-level">
                  Bonificación de Clase
                </th>
              )}
              {!!magicBonus && (
                <th className="inventory-item__table-cell-level">
                  Arma mágica
                </th>
              )}
              {!!extraBonus.length &&
                extraBonus.map(([bonusName]) => (
                  <th
                    key={bonusName}
                    className="inventory-item__table-cell-level"
                  >
                    {getItem(bonusName).translation}
                  </th>
                ))}
              <th className="inventory-item__table-cell-extra">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="inventory-item__table-cell-level">
                {statMod === 0 ? '-' : increment(statMod)}
              </td>
              {!!proficiencyBonus && (
                <td className="inventory-item__table-cell-level">
                  {increment(proficiencyBonus)}
                </td>
              )}
              {!!classBonus && (
                <td className="inventory-item__table-cell-level">
                  {increment(classBonus)}
                </td>
              )}
              {!!magicBonus && (
                <td className="inventory-item__table-cell-level">
                  {increment(magicBonus)}
                </td>
              )}
              {!!extraBonus.length &&
                extraBonus.map(([bonusName, bonus]) => (
                  <td
                    key={bonusName}
                    className="inventory-item__table-cell-level"
                  >
                    ({increment(bonus)})
                  </td>
                ))}
              <td className="inventory-item__table-cell-extra">
                {increment(baseTotalAttackBonus)}
                {!!totalAttackBonusWithExtras.length && (
                  <>
                    {' '}
                    (
                    {totalAttackBonusWithExtras
                      .map(bonus => increment(bonus))
                      .join(', ')}
                    )
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  notes: (skill, pc, submit, closeModal, skillIndex, position) => {
    function onCreateNotesClick() {
      closeModal();
      submit(
        {
          action: 'createNotes',
          id: pc.id,
          position,
        },
        { method: 'post' }
      );
    }

    return (
      <div className="inventory-item__hp-container">
        <button
          type="button"
          className="inventory-item__modal-button"
          onClick={onCreateNotesClick}
        >
          Crear nota
        </button>
      </div>
    );
  },

  copySpell: (skill, pc) => (
    <>
      <p>
        Cuando encuentras un conjuro de mago de nivel 1 o superior, puedes
        añadirlo a tu libro de conjuros si es de un nivel para el cual tienes
        espacios de conjuros y si puedes conseguir tiempo suficiente para
        descifrarlo y copiarlo. Copiar un conjuro a un libro implica reproducir
        la forma básica del conjuro y después descifrar el sistema único de
        anotación que usó el mago para escribirlo. Debes practicar el conjuro
        hasta que entiendas los sonidos o gestos requeridos, después
        transcribirlo a tu libro de conjuros usando tu propia anotación. Por
        cada nivel del conjuro, el proceso dura 2 horas y requiere 50 po. El
        coste representa los componentes materiales que gastas en experimentar
        con el conjuro para dominarlo, así como las delicadas tintas que
        necesitas para registrarlo. Una vez que has gastado este tiempo y
        dinero, puedes prepararlo.
      </p>
      <div className="inventory-item__modal-buttons">
        <Link
          to={`/characters/pc/${pc.id}/leveling/${pc.pClass}/extraSpells`}
          className="inventory-item__modal-button"
        >
          Copiar Conjuro
        </Link>
      </div>
    </>
  ),

  armorClass: (skill, pc) => {
    const acs = getAcBreakdown(pc);

    return (
      <div className="inventory-item__hp-container">
        <table className="inventory-item__table">
          <thead className="inventory-item__table-head">
            <tr>
              <th className="inventory-item__table-cell-level">{acs.title}</th>
              {acs.extras.map(extra => (
                <th
                  className="inventory-item__table-cell-level"
                  key={extra.title}
                >
                  {extra.title}
                </th>
              ))}
              <th className="inventory-item__table-cell-extra">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="inventory-item__table-cell-level">{acs.base}</td>
              {acs.extras.map(extra => (
                <td
                  className="inventory-item__table-cell-level"
                  key={extra.title}
                >
                  {extra.ac}
                </td>
              ))}
              <td className="inventory-item__table-cell-extra">
                {getArmorClass(pc)} ({increment(getExtraArmorClass(pc))})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  lucky: (skill, pc) => {
    return (
      <p>
        Cuando obtienes un 1 en una tirada de ataque, prueba de característica o
        tirada de salvación, puedes volver a tirar el dado y debes usar la
        puntuación obtenida en la nueva tirada.
      </p>
    );
  },

  brave: (skill, pc) => {
    return (
      <p>
        Tienes ventaja en las tiradas de salvación en contra de ser asustado.
      </p>
    );
  },

  nimble: (skill, pc) => {
    return (
      <p>
        Puedes moverte a través del espacio de cualquier criatura que sea de un
        tamaño mayor que el tuyo.
      </p>
    );
  },

  naturallyStealthy: (skill, pc) => {
    return (
      <p>
        Puedes intentar esconderte incluso cuando solamente estás cubierto tras
        una criatura que es al menos un tamaño mayor que tú.
      </p>
    );
  },

  trance: (skill, pc) => {
    return (
      <>
        <p>
          Los elfos no necesitan dormir. En lugar de eso, meditan profundamente,
          permaneciendo semiconscientes durante 4 horas al día. (La palabra en
          Común para tal meditación es “trance”). Mientras meditas, puedes soñar
          en cierta manera; tales sueños son en realidad ejercicios mentales que
          se han convertido en un reflejo a lo largo de años de práctica.
        </p>
        <p>
          Tras descansar de esta manera, obtienes el mismo beneficio que un
          humano tras 8 horas de sueño.
        </p>
      </>
    );
  },

  maskOfTheWild: (skill, pc) => {
    return (
      <p>
        Puedes intentar esconderte incluso cuando sólo estás ligeramente
        cubierto por el follaje, una lluvia fuerte, la nieve que cae, niebla y
        otros fenómenos naturales.
      </p>
    );
  },

  sunlightSensitivity: (skill, pc) => {
    return (
      <p>
        Tienes desventaja en las tiradas de ataque y en las pruebas de Sabiduría
        (Percepción) basadas en la vista cuando el objetivo de tu ataque o lo
        que sea que intentes percibir está bajo luz del Sol directa.
      </p>
    );
  },

  relentlessEndurance: (skill, pc) => {
    return (
      <p>
        Cuando te ves reducido a 0 Puntos de Golpe pero no estás totalmente
        muerto, puedes volver a tener 1 punto de golpe en su lugar. No puedes
        volver usar este rasgo hasta que no hayas completado un descanso
        prolongado.
      </p>
    );
  },

  savageAttacks: (skill, pc) => {
    return (
      <p>
        Cuando saques un impacto crítico con un ataque con arma cuerpo a cuerpo,
        puedes tirar otra vez uno de los dados de daño del arma y añadirlo al
        daño extra por el impacto crítico.
      </p>
    );
  },
};
