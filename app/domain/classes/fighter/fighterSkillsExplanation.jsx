import { Link } from '@remix-run/react';
import {
  getCombatSuperiorityManeuvers,
  getFightingStyle,
  getKnightSpells,
  getManeuverDc,
  getStudentOfWar,
  hasToLearnCombatSuperiorityManeuvers,
  translateCombatSuperiorityManeuvers,
  translateFightingStyle,
} from './fighter';
import { hasToLearnKnightSpell } from '~/domain/spells/fighter';
import { translateSpell } from '~/domain/spells/spells';
import { getStat, getStatMod } from '~/domain/characters';
import { getItem } from '~/domain/equipment/equipment';

import styles from '~/components/modal/inventoryItem.module.css';

export const FIGHTER_SKILLS_EXPLANATION = {
  secondWind: (skill, pc) => (
    <p>
      Tienes una limitada capacidad de aguante que puedes usar para protegerte
      del peligro. En tu turno, puedes usar una acción adicional para ganar una
      cantidad de Puntos de Golpe igual a 1d10 + {pc.level} (tu nivel de
      guerrero). Una vez que hayas usado este rasgo, debes hacer un descanso
      corto o prolongado antes de poder volver a usarlo.
    </p>
  ),

  fightingStyle: (skill, pc) => {
    const fightingStyle = getFightingStyle(pc);
    return (
      <>
        <p>
          Adoptas un estilo particular de combate como especialidad. Elige una
          de las siguientes opciones. No puedes escoger un Estilo de Combate más
          de una vez, incluso si tienes la opción de escoger otro más adelante.
        </p>

        <h3>{translateFightingStyle(fightingStyle)}</h3>
        {fightingStyle === 'archery' && (
          <p className={styles.paragraph}>
            Ganas un bonificador de +2 a las tiradas de ataque que hagas con
            armas a distancia.
          </p>
        )}
        {fightingStyle === 'defense' && (
          <p className={styles.paragraph}>
            Mientras lleves puesta una armadura ganas un +1 la CA
          </p>
        )}
        {fightingStyle === 'dueling' && (
          <p className={styles.paragraph}>
            Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
            ganas un bonificador de +2 a las tiradas de daño con esa arma.
          </p>
        )}
        {fightingStyle === 'great-Weapon-fighting' && (
          <p className={styles.paragraph}>
            Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos
            manos, puedes volver a realizar la tirada de daño y debiendo usar la
            nueva tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser
            un arma a dos manos o tener la propiedad versátil para ganar este
            beneficio.
          </p>
        )}
        {fightingStyle === 'protection' && (
          <p className={styles.paragraph}>
            Cuando una criatura que puedes ver ataca a un objetivo que no eres
            tú y está a 5 pies o menos de ti, puedes usar tu reacción para hacer
            que el enemigo tenga desventaja en la tirada de ataque. Debes estar
            usando un escudo
          </p>
        )}
        {fightingStyle === 'two-weapon-fighting' && (
          <p className={styles.paragraph}>
            Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
            modificador de característica al daño del segundo ataque.
          </p>
        )}
      </>
    );
  },

  actionSurge: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 2 puedes presionarte más allá de los límites
        normales durante un corto periodo de tiempo. En tu turno, puedes usar
        una acción añadida además de tu acción normal y tu posible acción
        adicional.
      </p>
      <p>
        Una vez que hayas usado esta habilidad, debes hacer un descanso corto o
        prolongado antes de poder volver a usarla. A partir del nivel 17 puedes
        usarla dos veces antes de descansar pero solo una vez en el mismo turno.
      </p>
    </>
  ),

  martialArchetype: (skill, pc) => (
    <>
      <p>
        A nivel 3 eliges un arquetipo que encaje con tu forma de enfocar tus
        estilos y técnicas de combate. Elige entre el arquetipo de Caballero
        Arcano, Campeón y Maestro de Batalla, todos detallados al final de la
        descripción de la clase. Tu arquetipo te otorga rasgos a nivel 3 y de
        nuevo a nivel 7, 10, 15 y 18.
      </p>
      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/fighter/martialArchetype`}
          className={styles.modalButton}
        >
          Escoge Arquetipo Marcial
        </Link>
      </div>
    </>
  ),

  weaponBond: (skill, pc) => (
    <>
      <p>
        A nivel 3 aprendes un ritual que crea un lazo mágico entre ti y un arma.
        Realizas el ritual a lo largo de 1 hora, que puede transcurrir en un
        descanso corto. El arma debe estar a tu alcance durante todo el ritual,
        en cuyo final tocas el arma y forjas el lazo.
      </p>
      <p>
        Una vez que te hayas enlazado a un arma, no puedes ser desarmado de esa
        arma en concreto a menos que te incapaciten. Si estáis en el mismo plano
        de existencia puedes invocar ese arma con una acción adicional haciendo
        que se teletransporte a tus manos instantáneamente.
      </p>
      <p>
        Puedes tener hasta dos armas ligadas, pero solo puedes invocar una a la
        vez con tu acción adicional. Si intentas ligar una tercera arma, deberás
        romper uno de los lazos que te unía a otra de las armas.
      </p>
    </>
  ),

  knightSpell: (skill, pc) => (
    <>
      <p>
        En los niveles 1, 8, 14 y 20 aprendes un conjuro que puede ser de
        cualquier escuela de magia.
      </p>

      {hasToLearnKnightSpell(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/fighter/knightSpells`}
            className={styles.modalButton}
          >
            Escoge Nuevo Conjuro
          </Link>
        </div>
      )}

      {!hasToLearnKnightSpell(pc) && (
        <strong>
          {getKnightSpells(pc)
            .map(s => translateSpell(s.name))
            .join(', ')}
        </strong>
      )}
    </>
  ),

  improvedCritical: (skill, pc) => (
    <p>
      A partir de que escojas este arquetipo en el nivel 3 los ataques de tus
      armas obtienen un crítico en tiradas de 19 o 20.
    </p>
  ),

  combatSuperiority: (skill, pc) => {
    const combatSuperiority = getCombatSuperiorityManeuvers(pc);
    return (
      <>
        <p>
          Cuando escoges este arquetipo a nivel 3 aprendes maniobras que puedes
          usar gracias a un dado especial llamado “dado de superioridad”.
        </p>
        <p>
          <strong>
            <u>Maniobras.</u>
          </strong>{' '}
          Aprendes tres maniobras de tu elección, las cuales están detalladas
          más abajo, en el apartado “Maniobras”. Muchas maniobras mejoran un
          ataque de alguna manera. Solo puedes usar una maniobra por ataque.
        </p>
        <p>
          Aprendes dos maniobras adicionales de tu elección en los niveles 7, 10
          y 15. Cada vez que aprendes una nueva maniobra, puedes reemplazar otra
          maniobra ya conocida por otra.
        </p>
        <p>
          <strong>
            <u>Dado de Superioridad.</u>
          </strong>{' '}
          Tienes cuatro dados de superioridad, que son d8. Un dado de
          superioridad se gasta cuando lo usas. Recuperas todos tus dados de
          superioridad gastados cuando finalizas un descanso corto o prolongado.
        </p>
        <p>
          Ganas un dado de superioridad en el nivel 7 y otro más en el nivel 15.
        </p>
        <p>
          <strong>
            <u>Tiradas de Salvación.</u>
          </strong>{' '}
          Algunas de tus maniobras requieren que tu objetivo realice una tirada
          de salvación para resistir los efectos de la maniobra. La CD de la
          tirada de salvación es {getManeuverDc(pc)} (8 + bonificador de
          competencia + modificador de Fuerza o Destreza)
          <div></div>
        </p>
        {hasToLearnCombatSuperiorityManeuvers(pc) && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/fighter/combatSuperiority`}
              className={styles.modalButton}
            >
              Escoge Maniobras
            </Link>
          </div>
        )}
        <ul>
          {combatSuperiority.map(maneuver => (
            <li key={maneuver}>
              <strong>
                <u>{translateCombatSuperiorityManeuvers(maneuver)}.</u>
              </strong>{' '}
              {displayManeuver(maneuver)}
            </li>
          ))}
        </ul>
      </>
    );
  },

  studentOfWar: (skill, pc) => (
    <>
      <p>
        En el nivel 3 ganas competencia con un tipo de herramientas de artesano
        de tu elección.
      </p>

      {!getStudentOfWar(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/fighter/studentOfWar`}
            className={styles.modalButton}
          >
            Escoge Herramientas de Artesano
          </Link>
        </div>
      )}

      {!!getStudentOfWar(pc) && (
        <strong>{getItem(getStudentOfWar(pc).name).translation}</strong>
      )}
    </>
  ),
};

export function displayManeuver(maneuver, trait, pc) {
  switch (maneuver) {
    case 'rally':
      return (
        <p>
          En tu turno, puedes usar una acción adicional y gastar un dado de
          superioridad para enaltecer la resolución de uno de tus compañeros.
          Cuando lo hagas, escoge a una criatura amistosa que pueda verte o
          escucharte. Esa criatura gana un número de Puntos de Golpe temporales
          igual a la tirada de tu{' '}
          <u>dado de superioridad + {getStatMod(getStat(pc, 'cha'))}</u> (tu
          modificador de Carisma).
        </p>
      );
    case 'menacingAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para intentar asustar al objetivo. Añade el{' '}
          <u>dado de superioridad a la tirada de ataque</u>, y el objetivo debe
          hacer una <u>tirada de salvación de Sabiduría</u>. Si falla la tirada,
          el objetivo estará asustado hasta el final de tu siguiente turno.
        </p>
      );
    case 'lungingAttack':
      return (
        <p>
          Cuando haces un ataque con arma cuerpo a cuerpo en tu turno, puedes
          gastar un <u>dado de superioridad</u> para incrementar el rango de ese
          ataque en <u>5 pies</u>. Si impactas, añades el dado de superioridad a
          tirada de daño del ataque.
        </p>
      );
    case 'sweepingAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma cuerpo a cuerpo,
          puedes gastar un dado de superioridad para intentar hacer daño a otra
          criatura con el mismo ataque. Escoge otra criatura a 5 pies o menos
          del objetivo original y que esté dentro de tu rango. Si la tirada del
          ataque original fuese suficiente para golpear a la segunda criatura,
          esta sufre un <u>daño igual a la tirada de tu dado de superioridad</u>
          . El daño infligido es del mismo tipo que el ataque original
        </p>
      );
    case 'tripAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para intentar derribar al objetivo. Añade el
          dado de superioridad a la tirada de daño del ataque, y si el objetivo
          es de tamaño Grande o más pequeño, debe realizar una tirada de{' '}
          <u>salvación de Fuerza</u>. Si falla, el objetivo es derribado.
        </p>
      );
    case 'disarmingAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad en un intento de desarmar al objetivo,
          forzándolo a soltar un arma de tu elección que esté sujetando en ese
          momento. Añade tu dado de superioridad a la tirada de daño del ataque,
          y el objetivo debe realizar una tirada de <u>salvación de Fuerza</u>.
          Si falla, el objetivo suelta el objeto de tu elección. El objeto cae a
          sus pies
        </p>
      );
    case 'pushingAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para intentar hacer retroceder al objetivo.
          Añade el dado de superioridad a la tirada de daño del ataque, y si el
          objetivo es de tamaño Grande o más pequeño, debe realizar una tirada
          de <u>salvación de Fuerza</u>. Si falla, empujas al objetivo 15 pies.
        </p>
      );
    case 'precisionAttack':
      return (
        <p>
          Cuando realizas una tirada de ataque con arma contra una criatura,
          puedes gastar un dado de superioridad para añadirlo a la tirada.
          Puedes usar esta maniobra antes o después de la tirada de ataque, pero
          debe ser antes de que ningún efecto del ataque sea aplicado.
        </p>
      );
    case 'goadingAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para intentar provocar a la criatura para que
          te ataque a ti. Añade el dado de superioridad a la tirada de daño del
          ataque, y el objetivo debe realizar una tirada de{' '}
          <u>salvación de Sabiduría</u>. Si falla, el objetivo tiene desventaja
          en todas las tiradas de ataque que haga contra cualquiera que no seas
          tú, hasta el final de tu siguiente turno.
        </p>
      );
    case 'feintingAttack':
      return (
        <p>
          Puedes gastar un dado de superioridad y usar una acción adicional en
          tu turno para fintar, escogiendo a una criatura que esté a 5 pies o
          menos de ti como objetivo. Tienes ventaja en la siguiente tirada de
          ataque que realices contra esa criatura. Si el ataque impacta, añade
          el dado de superioridad a la tirada de daño del ataque.
        </p>
      );
    case 'maneuveringAttack':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para que uno de tus aliados pueda maniobrar
          hasta una posición más ventajosa. Añade el dado de superioridad a la
          tirada de daño del ataque, y escoge una criatura amistosa que pueda
          verte o escucharte. Esa criatura puede usar su reacción para moverse
          hasta la mitad de su velocidad sin provocar ataques de oportunidad de
          la criatura a la que has atacado.
        </p>
      );
    case 'riposte':
      return (
        <p>
          Cuando una criatura falla un ataque cuerpo a cuerpo contra ti, puedes
          usar tu reacción y gastar un dado de superioridad para realizar un
          ataque cuerpo a cuerpo de arma contra la criatura. Si golpeas, añade
          el dado de superioridad a la tirada de daño del ataque.
        </p>
      );
    case 'distractingStrike':
      return (
        <p>
          Cuando impactas a una criatura con un ataque con arma, puedes gastar
          un dado de superioridad para distraer a la criatura, abriendo el
          frente para tus aliados. Añade el dado de superioridad a la tirada de
          daño del ataque. La siguiente tirada de ataque contra el objetivo por
          un atacante que no seas tú tendrá ventaja si el ataque se realiza
          antes de tu siguiente turno.
        </p>
      );
    case 'evasiveFootwork':
      return (
        <p>
          Cuando te mueves, puedes gastar un dado de superioridad, realizando la
          tirada y <u>añadiendo el resultado a tu AC</u> hasta que dejes de
          moverte.
        </p>
      );
    case 'commandersStrike':
      return (
        <p>
          Cuando realizas la acción Atacar en tu turno, puedes renunciar a uno
          de tus ataques y usar una acción adicional para ordenar a uno de tus
          aliados que ataque. Cuando lo hagas, escoge a una criatura amistosa
          que pueda verte o escucharte, y gasta un dado de superioridad. Esa
          criatura puede usar su reacción inmediatamente para realizar un ataque
          de arma, añadiendo el dado de superioridad a la tirada de daño de su
          ataque.
        </p>
      );
    case 'parry':
      return (
        <p>
          Cuando una criatura te hace daño con un ataque cuerpo a cuerpo, puedes
          usar tu reacción y gastar un dado de superioridad para{' '}
          <u>reducir el daño</u>
          un número igual a la tirada de tu{' '}
          <u>dado de superioridad + {getStatMod(getStat(pc, 'dex'))}</u> (tu
          modificador de Destreza).
        </p>
      );

    default:
      break;
  }
}
