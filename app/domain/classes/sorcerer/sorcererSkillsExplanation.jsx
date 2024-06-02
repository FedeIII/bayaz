import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '../../characters';
import {
  getDragonAncestor,
  getMetamagic,
  getTidesOfChaos,
  hasToLearnMetamagic,
  translateDragonAncestor,
} from './sorcerer';
import { WILD_MAGIC_SURGE_TABLE } from './WILD_MAGIC_SURGE_TABLE';
import SpendTrait, { createSpendActions } from '~/components/spendTrait';
import { getCurrentSorcereryPoints } from '~/domain/spells/sorcerer';
import { t } from '~/domain/translations';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const classTraitActions = {
  ...createSpendActions('sorcerer', 'fontOfMagic'),
  ...createSpendActions('sorcerer', 'tidesOfChaos'),
};

export const SORCERER_SKILLS_EXPLANATION = {
  dragonAncestor: (skill, pc) => (
    <>
      <p>
        En nivel 1 eliges qué tipo de dragón es tu ancestro. El tipo de daño
        asociado con ese dragón es el usado por lo los rasgos que ganes
        posteriormente.
      </p>
      <strong>{translateDragonAncestor(getDragonAncestor(pc))}</strong>
      <p>
        Puedes leer, escribir y hablar dracónico. Además, siempre que hagas una
        prueba de Carisma interactuando con dragones tu bonificador de
        competencia se duplica si es aplicable a la tirada.
      </p>
    </>
  ),

  draconicResilience: (skill, pc) => (
    <>
      <p>
        La magia fluye a través de tu cuerpo y hace que los rasgos físicos de tu
        antecesor dragón emerjan. En nivel 1 tus Puntos de Golpe máximos se
        incrementan en 1 y en 1 más por cada nivel que ganes de esta clase.
      </p>
      <p>
        Además, partes de tu piel están cubiertas por un fino brillo como el de
        escamas de dragón. Cuando no llevas armadura, tu CA es igual a{' '}
        {13 + getStatMod(getStat(pc, 'dex'))} (13 + tu modificador de destreza).
      </p>
    </>
  ),

  wildMagicSurge: (
    skill,
    pc,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm
  ) => (
    <>
      <p>
        Comenzando cuando eliges este origen en el nivel 1, tus lanzamientos de
        conjuros pueden desatar oleadas de magia salvaje. Inmediatamente después
        de que lances un conjuro de hechicero de nivel 1 o superior, el DM puede
        hacerte tirar un d20. Si sacas un 1, tira en la tabla Oleada de Magia
        Salvaje para crear un efecto mágico aleatorio.
      </p>

      {!!isDm && (
        <div>
          <h3>Oleada de Magia Salvaje</h3>
          <table className="inventory-item__table">
            <thead className="inventory-item__table-head">
              <tr>
                <th className="inventory-item__table-cell">
                  <strong>d100</strong>
                </th>
                <th className="inventory-item__table-cell inventory-item__left">
                  <strong>Efecto</strong>
                </th>
                <th className="inventory-item__table-cell">
                  <strong>d100</strong>
                </th>
                <th className="inventory-item__table-cell inventory-item__left">
                  <strong>Efecto</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {WILD_MAGIC_SURGE_TABLE.reduce(
                (rows, row, i) =>
                  i < WILD_MAGIC_SURGE_TABLE.length - 1 && i % 2 === 0
                    ? [
                        ...rows,
                        <tr className="inventory-item__table-row">
                          <td className="inventory-item__table-cell inventory-item__no-wrap">
                            {row.dice}
                          </td>
                          <td className="inventory-item__table-cell inventory-item__left">
                            {row.effect}
                          </td>
                          <td className="inventory-item__table-cell inventory-item__no-wrap">
                            {WILD_MAGIC_SURGE_TABLE[i + 1].dice}
                          </td>
                          <td className="inventory-item__table-cell inventory-item__left">
                            {WILD_MAGIC_SURGE_TABLE[i + 1].effect}
                          </td>
                        </tr>,
                      ]
                    : rows,
                []
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  ),

  tidesOfChaos_text: (skill, pc) => (
    <>
      <p>
        A partir del nivel 1 puedes manipular las fuerzas de la probabilidad y
        del caos para ganar ventaja en una tirada de ataque, prueba de habilidad
        o tirada de salvación. Una vez hecho esto, necesitas finalizar un
        descanso prolongado antes de usar este rasgo otra vez.
      </p>
      <p>
        En cualquier momento, antes de recuperar el uso de este rasgo, el DM
        puede hacerte tirar en la tabla Oleada de Magia Salvaje inmediatamente
        después de que lances un conjuro de hechicero de nivel 1 o superior.
        Después de esto, recuperas el uso de este rasgo.
      </p>
    </>
  ),

  tidesOfChaos: (skill, pc, submit) => (
    <>
      {SORCERER_SKILLS_EXPLANATION.tidesOfChaos_text(skill, pc)}

      <SpendTrait
        pc={pc}
        traitName="tidesOfChaos"
        submit={submit}
        traitGetter={getTidesOfChaos}
      />
    </>
  ),

  fontOfMagic_text1: (skill, pc) => (
    <p>
      En el nivel 2 te conectas con una profunda fuente de magia en tu interior.
      Esta fuente es representada por los puntos de hechicería, que te permite
      crear una gran variedad de efectos mágicos.
    </p>
  ),

  fontOfMagic_text2: (skill, pc) => (
    <>
      <h4>Puntos de Hechicería</h4>
      <p>
        Tienes 2 puntos de hechicería y ganas más cuando alcanzas niveles
        superiores. Como se muestra en la columna puntos de hechicería de la
        tabla Hechicero. Nunca puedes tener más puntos de hechicería que los
        mostrados en la tabla para tu nivel. Recuperas tus puntos de hechicería
        al completar un descanso prolongado.
      </p>
      <h4>Conjuración Flexible</h4>
      <p>
        Puedes usar tus puntos de hechicería para ganar espacios de conjuro
        adicionales, o sacrificar espacios de conjuro para ganar puntos de
        hechicería. Aprendes nuevas formas de usar tus puntos de hechicería al
        alcanzar niveles superiores.
      </p>
      <div className="inventory-item__with-table">
        <p>
          <strong>
            <em>
              <u>Creando espacios de conjuro.</u>
            </em>
          </strong>{' '}
          Puedes transformar puntos de hechicería sin gastar en un espacio para
          conjuro como una acción adicional en tu turno. La tabla de creación de
          espacios de conjuro muestra el coste de crear un espacio de conjuro de
          un nivel determinado. No puedes crear espacios de conjuro de nivel
          superior al 5.
        </p>

        <table className="inventory-item__table">
          <thead className="inventory-item__table-head">
            <tr>
              <th className="inventory-item__table-cell">
                Nivel de espacio de conjuro
              </th>
              <th className="inventory-item__table-cell">
                Coste en Puntos de Hechicería
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="inventory-item__table-row">
              <td className="inventory-item__table-cell">1</td>
              <td className="inventory-item__table-cell">2</td>
            </tr>
            <tr className="inventory-item__table-row">
              <td className="inventory-item__table-cell">2</td>
              <td className="inventory-item__table-cell">3</td>
            </tr>
            <tr className="inventory-item__table-row">
              <td className="inventory-item__table-cell">3</td>
              <td className="inventory-item__table-cell">5</td>
            </tr>
            <tr className="inventory-item__table-row">
              <td className="inventory-item__table-cell">4</td>
              <td className="inventory-item__table-cell">6</td>
            </tr>
            <tr className="inventory-item__table-row">
              <td className="inventory-item__table-cell">5</td>
              <td className="inventory-item__table-cell">7</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>
          <em>
            <u>Convertir espacios de conjuro en puntos de hechicería.</u>
          </em>
        </strong>{' '}
        Como acción adicional en tu turno, puedes gastar un espacio de conjuro y
        ganar un número de puntos de hechicería igual al nivel del espacio.
      </p>
    </>
  ),

  fontOfMagic: (skill, pc, submit) => (
    <>
      {SORCERER_SKILLS_EXPLANATION.fontOfMagic_text1(skill, pc)}
      <SpendTrait
        pc={pc}
        traitName="fontOfMagic"
        submit={submit}
        traitGetter={getCurrentSorcereryPoints}
      />
      {SORCERER_SKILLS_EXPLANATION.fontOfMagic_text2(skill, pc)}
    </>
  ),

  metamagic: (skill, pc, submit) => (
    <>
      <p>
        A nivel 3 ganas la habilidad de moldear tus conjuros para que se adapten
        a tus necesidades. Ganas dos de las siguientes opciones metamágicas a tu
        elección. Ganas una más al nivel 10 y al nivel 17
      </p>
      <p>
        Sólo puedes usar una opción metamágica en cada conjuro cuando lo lanzas,
        a menos que se indique lo contrario.
      </p>
      {hasToLearnMetamagic(pc) && (
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/sorcerer/metamagic`}
            className="inventory-item__modal-button"
          >
            Escoge Metamagia
          </Link>
        </div>
      )}
      {getMetamagic(pc).map(metamagic => (
        <>
          <h3>
            <u>{t(metamagic)}</u>
          </h3>
          {!!METAMAGIC_FONT_OF_MAGOC_MAP[metamagic] && (
            <SpendTrait
              pc={pc}
              traitName="fontOfMagic"
              submit={submit}
              atHeader
              traitGetter={getCurrentSorcereryPoints}
            />
          )}
          {METAMAGIC_EXPLANATION[metamagic]}
        </>
      ))}
    </>
  ),

  elementalAffinity: (skill, pc) => (
    <>
      <p>
        Al alcanzar el nivel 6, cuando lances un conjuro que utilice el daño del
        tipo asociado a tu linaje dracónico,{' '}
        <strong>
          <u>añade {getStatMod(getStat(pc, 'cha'))} al daño</u>
        </strong>{' '}
        (tu modificador de Carisma).
      </p>
      <p>
        Al mismo tiempo, puedes gastar{' '}
        <strong>
          <u>1 punto de hechicería</u>
        </strong>{' '}
        para ganar resistencia a este tipo de daño durante una hora.
      </p>
    </>
  ),

  bendLuck: (skill, pc) => (
    <p>
      A partir del nivel 6 tienes la capacidad de torcer el destino usando tu
      magia salvaje. Cuando otra criatura a la que puedas ver realice una tirada
      de ataque, una prueba de habilidad o una tirada de salvación, puedes usar
      tu reacción y gastar{' '}
      <strong>
        <u>2 puntos de hechicería</u>
      </strong>{' '}
      para lanzar{' '}
      <strong>
        <u>1d4</u>
      </strong>{' '}
      y aplicar el resultado como un bonificador o un penalizador (tú eliges) a
      la tirada de la criatura. Puedes hacer esto después de la tirada de la
      criatura, pero antes de saber los resultados de la tirada.
    </p>
  ),

  dragonWings: (skill, pc) => (
    <>
      <p>
        En el nivel 14 ganas la habilidad de hacer brotar de tu espalda un par
        de alas, ganando una velocidad de vuelo igual a tu velocidad actual.
        Puedes crear estas alas como una acción adicional en tu turno. Duran
        hasta que las descartas como una acción adicional en tu turno.
      </p>
      <p>
        No puedes manifestar tus alas mientras lleves una armadura puesta, a no
        ser que la armadura esté hecha para acomodarlas, y la ropa que no esté
        hecha para acomodarse a las alas será destruida cuando las saques.
      </p>
    </>
  ),

  controlledChaos: (skill, pc) => (
    <p>
      A nivel 14 ganas un mínimo control sobre las oleadas de magia salvaje.
      Siempre que lances en la tabla Oleada de Magia Salvaje, puedes tirar de
      nuevo y usar cualquiera de las dos tiradas.
    </p>
  ),

  draconicPresence: (skill, pc) => (
    <p>
      Empezando en el nivel 18 puedes canalizar la presencia aterradora de tu
      ancestro dragón, haciendo que los que te rodean queden sobrecogidos o
      asustados. Como una acción, puedes gastar{' '}
      <strong>
        <u>5 puntos de hechicería</u>
      </strong>{' '}
      para usar este poder y manifestar un aura de{' '}
      <strong>
        <u>sobrecogimiento o miedo</u>
      </strong>{' '}
      (tú eliges) a una distancia de 60 pies (18 metros). Durante 1 minuto o
      hasta que pierdas la concentración (como si hubieras lanzado un hechizo de
      concentración) cualquier criatura hostil que comience su turno en este
      aura deberá realizar un prueba de{' '}
      <strong>
        <u>salvación de sabiduría</u>
      </strong>{' '}
      o quedará encantada (si elegiste sobrecogimiento) o asustada (si elegiste
      miedo) hasta que el aura termine. Una criatura que supere esta tirada de
      salvación será inmune a tu aura durante 24 horas.
    </p>
  ),

  spellBombardment: (skill, pc) => (
    <p>
      Empezando el nivel 18 la energía dañina de tus conjuros se intensifica.
      Cuando lanzas el daño de un conjuro y sacas el mayor resultado posible en
      cualquiera de los dados, elige uno de los dados, lánzalo de nuevo y añade
      el resultado a la tirada de daño. Puedes usar este rasgo sólo una vez por
      turno.
    </p>
  ),

  sorcerousRestoration: (skill, pc) => (
    <p>
      En el nivel 20 recuperas 4 puntos de hechicería al finalizar un descanso
      corto.
    </p>
  ),
};

export const METAMAGIC_EXPLANATION = {
  carefulSpell: (
    <p>
      Cuando lances un conjuro que fuerce a otras criaturas a efectuar una
      tirada de salvación. Puedes proteger a algunas de esas criaturas de toda
      la fuerza del conjuro. Para ello, gastas <u>1 punto de hechicería</u> y
      escoges un número de criaturas igual a tu modificador de Carisma como
      máximo (mínimo una criatura). Las criaturas elegidas pasan automáticamente
      la tirada de salvación del conjuro
    </p>
  ),
  distantSpell: (
    <>
      <p>
        Cuando lanzas un conjuro con un rango de 5 pies (1,5 metros) o superior.
        Puedes gastar <u>1 punto de hechicería</u> para doblar el rango del
        conjuro.
      </p>
      <p>
        Cuando lanzas un conjuro con un rango de toque, puedes gastar{' '}
        <u>1 punto de hechicería</u> para hacer el rango del conjuro de 30 (9
        metros) pies.
      </p>
    </>
  ),
  empoweredSpell: (
    <>
      <p>
        Cuando tiras el daño de un conjuro, puedes gastar un{' '}
        <u>1 punto de hechicería</u> para volver a lanzar un número de dados de
        daño igual a tu modificador de Carisma (mínimo de uno). Debes usar las
        nuevas tiradas.
      </p>
      <p>
        Puedes usar Conjuro Potenciado incluso si ya has usado una metamagia
        diferente durante el lanzamiento del conjuro.
      </p>
    </>
  ),
  extendedSpell: (
    <p>
      Cuando lanzas un conjuro que tenga una duración de 1 minuto o más, puedes
      usar <u>1 punto de hechicería</u> para doblar su duración, hasta un máximo
      de 24 horas
    </p>
  ),
  heightenedSpell: (
    <p>
      Cuando lances un conjuro que fuerce a una criatura a realizar una tirada
      de salvación para resistir sus efectos, puedes gastar{' '}
      <u>3 puntos de hechicería</u> para dar desventaja a un objetivo del
      conjuro en la primera tirada de salvación hecha contra el conjuro.
    </p>
  ),
  quickenedSpell: (
    <p>
      Cuando lances un conjuro que tenga un tiempo de lanzamiento igual a 1
      acción. Puedes gastar <u>2 puntos de hechicería</u> para cambiar el tiempo
      de lanzamiento a 1 acción adicional para este lanzamiento.
    </p>
  ),
  subtleSpell: (
    <p>
      Cuando lanzas un conjuro puedes gastar <u>1 punto de hechicería</u> para
      lanzarlo sin componentes verbales o somáticos.
    </p>
  ),
  twinnedSpell: (
    <p>
      Cuando lanzas un conjuro que tenga como objetivo a una sola criatura y no
      tenga un rango “Personal”, puedes gastar{' '}
      <u>un número de puntos de hechicería igual al nivel del conjuro</u> para
      apuntar a una segunda criatura dentro del alcance con el mismo conjuro (1
      punto de hechicería si el conjuro es un truco).
    </p>
  ),
};

export const METAMAGIC_EXPLANATION_GETTERS = Object.entries(
  METAMAGIC_EXPLANATION
).reduce(
  (getters, [name, description]) => ({
    ...getters,
    [name]: () => description,
  }),
  {}
);

const METAMAGIC_FONT_OF_MAGOC_MAP = {
  carefulSpell: 1,
  distantSpell: 1,
  empoweredSpell: 1,
  extendedSpell: 1,
  heightenedSpell: 3,
  quickenedSpell: 2,
  subtleSpell: 1,
  twinnedSpell: 'n',
};
