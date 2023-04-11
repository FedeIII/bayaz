import { Link } from '@remix-run/react';
import {
  getFavoredEnemies,
  getFavoredTerrains,
  getHunterDefensiveTactics,
  getHuntersPrey,
  getRangerFightingStyle,
  hasToPickFavoredEnemies,
  hasToPickFavoredTerrain,
  translateFavoredEnemy,
  translateFavoredTerrain,
  translateHuntersDefensiveTactics,
  translateHuntersPrey,
  translateRangerFightingStyle,
} from './ranger';
import { getProficiencyBonus } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/modal/inventoryItem.module.css';

export const RANGER_SKILLS_EXPLANATION = {
  favoredEnemy: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 1 posees una importante experiencia en el estudio,
        el seguimiento, la caza, e incluso el habla de un cierto tipo de
        enemigo.
      </p>
      <p>
        Tienes ventaja en las tiradas de Sabiduría (Supervivencia) para rastrear
        a tus enemigos predilectos, así como ventajas en las tiradas de
        Inteligencia para recabar información sobre ellos.
      </p>
      <p>
        Al obtener este rasgo también aprendes un idioma a tu elección que
        hablen tus enemigos predilectos si es que efectivamente hablan.
      </p>
      <p>
        Eliges un enemigo predilecto adicional, así como un lenguaje asociado,
        en el nivel 6 y en el 14. Conforme ganas niveles, tus elecciones
        deberían reflejar los tipos de monstruos que has encontrado en tus
        aventuras.
      </p>

      <strong>
        {getFavoredEnemies(pc).map(translateFavoredEnemy).join(', ')}
      </strong>

      {hasToPickFavoredEnemies(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/ranger/favoredEnemies`}
            className={styles.modalButton}
          >
            Escoge Enemigo Predilecto
          </Link>
        </div>
      )}
    </>
  ),

  naturalExplorer: (skill, pc) => (
    <>
      <p>
        Estás particularmente familiarizado con un tipo de entorno natural y
        eres experto en viajar y sobrevivir en tal región. Cuando hagas una
        tirada de Inteligencia o Sabiduría relacionada con tu terreno
        predilecto, tu bonificador de competencia se duplica si estás utilizando
        una habilidad en la que eres competente.
      </p>
      <p>
        Si viajas durante una hora o más a través de tu terreno predilecto,
        ganas los siguientes beneficios:
      </p>
      <ul>
        <li>El terreno difícil no ralentiza los viajes de tu grupo.</li>
        <li>Tu grupo no se perderá salvo que intervenga la magia en ello.</li>
        <li>
          Incluso cuando estás ocupado con otra actividad mientras viajas (como
          buscar comida, navegar, o rastrear) sigues estando alerta respecto a
          otros peligros.
        </li>
        <li>
          Si viajas solo, puedes moverte sigilosamente a velocidad normal.
        </li>
        <li>
          Cuando forrajeas, hallas el doble de alimento de lo que encontrarías
          normalmente.
        </li>
        <li>
          Mientras rastrees a otras criaturas, puedes conocer su número exacto,
          sus tamaños y cuánto tiempo hace que han pasado a través de una zona.
        </li>
      </ul>
      <p>Eliges terrenos predilectos adicionales en el nivel 6 y 10.</p>

      <strong>
        {getFavoredTerrains(pc).map(translateFavoredTerrain).join(', ')}
      </strong>

      {hasToPickFavoredTerrain(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/ranger/favoredTerrains`}
            className={styles.modalButton}
          >
            Escoge Terreno Predilecto
          </Link>
        </div>
      )}
    </>
  ),

  fightingStyle: (skill, pc) => {
    const fightingStyle = getRangerFightingStyle(pc);
    return (
      <>
        <p>
          A partir del nivel 2 adoptas un estilo particular de combate como
          especialidad. Elige una de las siguientes opciones. No puedes elegir
          un Estilo de Combate más de una vez, incluso si tienes la opción de
          escoger otro más adelante.
        </p>
        {!fightingStyle && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/ranger/fightingStyle`}
              className={styles.modalButton}
            >
              Escoge Estilo
            </Link>
          </div>
        )}

        {!!fightingStyle && (
          <>
            <h3>{translateRangerFightingStyle(fightingStyle)}</h3>
            {fightingStyle === 'archery' && (
              <p className={styles.paragraph}>
                Ganas un bonificador de +2 a las tiradas de ataque que hagas con
                armas a distancia
              </p>
            )}
            {fightingStyle === 'defense' && (
              <p className={styles.paragraph}>
                Mientras lleves puesta una armadura ganas un +1 a la CA.
              </p>
            )}
            {fightingStyle === 'dueling' && (
              <p className={styles.paragraph}>
                Cuando llevas un arma en una mano y ningún arma más, ganas un
                bonificador de +2 a las tiradas de daño con esa arma.
              </p>
            )}
            {fightingStyle === 'twoWeaponFighting' && (
              <p className={styles.paragraph}>
                Cuando luchas con el estilo de lucha de dos armas, puedes añadir
                tu modificador de característica al daño del segundo ataque
              </p>
            )}
          </>
        )}
      </>
    );
  },

  rangerConclave: (skill, pc) => (
    <>
      <p>
        A nivel 3 eliges un arquetipo que te esfuerzas en emular: Cazador o
        Señor de las Bestias, ambos detallados al final de la descripción de la
        clase. Tu elección te proporciona rasgos a nivel 3 y de nuevo a los
        niveles 7, 11, y 15.
      </p>

      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/ranger/rangerConclave`}
          className={styles.modalButton}
        >
          Escoge Arquetipo
        </Link>
      </div>
    </>
  ),

  huntersPrey: (skill, pc) => {
    const huntersPrey = getHuntersPrey(pc);
    return (
      <>
        <p>A nivel 3 ganas uno de los siguientes rasgos de tu elección.</p>

        {!huntersPrey && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/ranger/huntersPrey`}
              className={styles.modalButton}
            >
              Escoge Presa del Cazador
            </Link>
          </div>
        )}

        {!!huntersPrey && <strong>{translateHuntersPrey(huntersPrey)}</strong>}

        {huntersPrey === 'colossusSlayer' && (
          <p>
            Tu tenacidad puede desgastar hasta a los enemigos más potentes.
            Cuando golpees a una criatura con un arma, ésta sufre un 1d8
            adicional de daño si está por debajo de su máximo de Puntos de
            Golpe. Puedes causar este daño extra sólo una vez por turno.
          </p>
        )}
        {huntersPrey === 'giantKiller' && (
          <p>
            Cuando una criatura Grande o más grande que tú, a una distancia
            máxima de 5 pies de ti, te golpea o falla con su ataque contra ti,
            puedes utilizar tu reacción para atacar a esa criatura
            inmediatamente después de su ataque, mientras puedas verla.
          </p>
        )}
        {huntersPrey === 'hordeBreaker' && (
          <p>
            Una vez por turno, cuando hagas un ataque con armas, puedes realizar
            otro ataque con la misma arma contra una criatura diferente que esté
            a menos de 5 pies del objetivo original y dentro del rango de tu
            arma.
          </p>
        )}
      </>
    );
  },

  rangersCompanion: (skill, pc) => (
    <>
      <p>
        A partir del nivel 3 obtienes un compañero animal que te acompaña en tus
        aventuras y está capacitado para luchar junto a ti. Elige una bestia que
        no sea mayor que tamaño Medio y que tenga un valor de desafío de un 1/4
        o más bajo (el Apéndice D presenta las estadísticas para el halcón, el
        mastín, y la pantera como ejemplos). Añade tu bonificador de competencia
        ({increment(getProficiencyBonus(pc.level))}) a la CA de la bestia, sus
        tiradas de ataque y de daño, así como a cualquier tirada de salvación y
        habilidades en las que sea competente. Sus Puntos de Golpe máximos son
        iguales a su máximo normal o cuatro veces tu nivel de explorador, el que
        sea mayor
      </p>
      <p>
        La bestia obedece las órdenes de la mejor manera que puede. Actúa en tu
        turno de iniciativa, aunque no lo hará a menos que se lo ordenes. En tu
        turno, puedes ordenar verbalmente a la bestia dónde moverse (sin que
        cuente como acción). Puedes utilizar tu acción para ordenarle
        verbalmente que realice la acción Ataque, Carrera, Retirada, Esquiva o
        Ayuda. Una vez que tengas el rasgo Ataque Extra podrás hacer un ataque
        tú mismo cuando ordenes a la bestia que realice la acción de atacar.
      </p>
      <p>
        Mientras viajas a través de su terreno predilecto solo con la bestia,
        podéis moveros sigilosamente a un ritmo normal.
      </p>
      <p>
        Si la bestia muere puedes conseguir otra si pasas 8 horas estableciendo
        un vínculo mágico con otra bestia que no te sea hostil, ya sea el mismo
        tipo de bestia anterior o una diferente.
      </p>
    </>
  ),

  extraAttack: (skill, pc) => (
    <p>
      Empezando en el nivel 5 puedes atacar dos veces, en lugar de una, siempre
      que uses la acción de Atacar en tu turno.
    </p>
  ),

  defensiveTactics: (skill, pc) => {
    const defensiveTactics = getHunterDefensiveTactics(pc);
    return (
      <>
        <p>A nivel 7 ganas uno de los siguientes rasgos de tu elección</p>

        {!defensiveTactics && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/ranger/defensiveTactics`}
              className={styles.modalButton}
            >
              Escoge Táctica Defensiva
            </Link>
          </div>
        )}

        {!!defensiveTactics && (
          <strong>{translateHuntersDefensiveTactics(defensiveTactics)}</strong>
        )}

        {defensiveTactics === 'escapeTheHorde' && (
          <p>Los ataques de oportunidad contra ti se hacen con desventaja.</p>
        )}
        {defensiveTactics === 'multiattackDefense' && (
          <p>
            Cuando una criatura te golpea con un ataque, ganas un bonificador +4
            a la CA contra todos los ataques posteriores realizados por esa
            criatura durante el resto del turno.
          </p>
        )}
        {defensiveTactics === 'steelWill' && (
          <p>Tienes ventaja en tiradas de salvación contra miedo.</p>
        )}
      </>
    );
  },

  exceptionalTraining: (skill, pc) => (
    <p>
      A partir del nivel 7 en cualquiera de tus turnos en los que el compañero
      animal no ataque, puedes utilizar una acción adicional para ordenar a la
      bestia que realice en su turno una acción de Carrera, Retirada, Esquiva o
      Ayuda.
    </p>
  ),

  landsStride: (skill, pc) => (
    <>
      <p>
        A partir del nivel 8 moverte a través de terreno difícil no mágico no
        requiere movimiento adicional. También puedes pasar a través de las
        plantas no mágicas sin ser frenado por ellas y sin recibir daño si
        tienen espinas, zarzas o algún riesgo similar.
      </p>
      <p>
        Además, tienes ventaja en las tiradas de salvación contra las plantas
        que son creadas o manipuladas mágicamente para impedir el movimiento,
        como las creadas por el conjuro enmarañar.
      </p>
    </>
  ),
};
