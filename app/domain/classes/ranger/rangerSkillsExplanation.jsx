import { Link } from '@remix-run/react';
import {
  getFavoredEnemies,
  getFavoredTerrains,
  getHunterDefensiveTactics,
  getHunterMultiattack,
  getHuntersPrey,
  getRangerFightingStyle,
  getSuperiorHuntersDefense,
  hasToPickFavoredEnemies,
  hasToPickFavoredTerrain,
  translateFavoredEnemy,
  translateFavoredTerrain,
  translateHunterMultiattack,
  translateHuntersDefensiveTactics,
  translateHuntersPrey,
  translateRangerFightingStyle,
  translateSuperiorHuntersDefense,
} from './ranger';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

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
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/ranger/favoredEnemies`}
            className="inventory-item__modal-button"
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
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/ranger/favoredTerrains`}
            className="inventory-item__modal-button"
          >
            Escoge Terreno Predilecto
          </Link>
        </div>
      )}
    </>
  ),

  rangerFightingStyle: (skill, pc) => {
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
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/ranger/fightingStyle`}
              className="inventory-item__modal-button"
            >
              Escoge Estilo
            </Link>
          </div>
        )}

        {!!fightingStyle && (
          <>
            <h3>{translateRangerFightingStyle(fightingStyle)}</h3>
            {fightingStyle === 'archery' && (
              <p className="app__paragraph">
                Ganas un bonificador de +2 a las tiradas de ataque que hagas con
                armas a distancia
              </p>
            )}
            {fightingStyle === 'defense' && (
              <p className="app__paragraph">
                Mientras lleves puesta una armadura ganas un +1 a la CA.
              </p>
            )}
            {fightingStyle === 'dueling' && (
              <p className="app__paragraph">
                Cuando llevas un arma en una mano y ningún arma más, ganas un
                bonificador de +2 a las tiradas de daño con esa arma.
              </p>
            )}
            {fightingStyle === 'twoWeaponFighting' && (
              <p className="app__paragraph">
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

      <div className="inventory-item__modal-buttons">
        <Link
          to={`/characters/pc/${pc.id}/leveling/ranger/rangerConclave`}
          className="inventory-item__modal-button"
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
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/ranger/huntersPrey`}
              className="inventory-item__modal-button"
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
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/ranger/defensiveTactics`}
              className="inventory-item__modal-button"
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

  hideInPlainSight: (skill, pc) => (
    <>
      <p>
        A partir del nivel 10 puedes pasar 1 minuto para camuflarte. Debes tener
        acceso a barro fresco, tierra, plantas, hollín u otros materiales
        naturales con los que crear tu camuflaje.
      </p>
      <p>
        Una vez que te camufles de esta manera, puedes intentar ocultarte contra
        una superficie sólida, como un árbol o una pared, que sea al menos tan
        alto y ancho como tú. Ganas un bonificador de +10 a las pruebas de
        Destreza (Sigilo), siempre y cuando permanezcas sin moverte ni realices
        acciones. Una vez que te muevas o realices una acción o una reacción,
        debes camuflarte de nuevo para ganar este beneficio.
      </p>
    </>
  ),

  multiattack: (skill, pc) => {
    const multiattack = getHunterMultiattack(pc);
    return (
      <>
        <p>A nivel 11 ganas uno de los siguientes rasgos de tu elección.</p>

        {!multiattack && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/ranger/multiattack`}
              className="inventory-item__modal-button"
            >
              Escoge Ataque Múltiple
            </Link>
          </div>
        )}

        {!!multiattack && (
          <strong>{translateHunterMultiattack(multiattack)}</strong>
        )}

        {multiattack === 'volley' && (
          <p>
            Puedes utilizar tu acción para hacer un ataque a distancia contra
            cualquier número de criaturas en torno a 10 pies (3 metros) de un
            punto que puedas ver (siempre dentro del alcance de tu arma). Debes
            tener munición para cada objetivo, como siempre, y realizar una
            tirada de ataque por separado para cada uno de ellos.
          </p>
        )}
        {multiattack === 'whirlwindAttack' && (
          <p>
            Puedes utilizar tu acción para realizar un ataque cuerpo a cuerpo
            contra cualquier número de criaturas que estén a 5 pies (1,5 metros)
            de ti, realizando una tirada de ataque separada para cada uno de
            ellos.
          </p>
        )}
      </>
    );
  },

  bestialFury: (skill, pc) => (
    <p>
      A partir del nivel 11 tu compañero animal puede realizar dos ataques
      cuando le ordenes que use la acción de Ataque.
    </p>
  ),

  vanish: (skill, pc) => (
    <p>
      A partir del nivel 14 puedes utilizar la acción Esconderse como acción
      adicional en tu turno. Además, no puedes ser rastreado por medios no
      mágicos, a menos que decidas dejar un rastro.
    </p>
  ),

  superiorHuntersDefense: (skill, pc) => {
    const superiorHuntersDefense = getSuperiorHuntersDefense(pc);
    return (
      <>
        <p>A nivel 15 ganas uno de los siguientes rasgos de tu elección.</p>

        {!superiorHuntersDefense && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/ranger/superiorHuntersDefense`}
              className="inventory-item__modal-button"
            >
              Escoge Defensa Superior
            </Link>
          </div>
        )}

        {!!superiorHuntersDefense && (
          <strong>
            {translateSuperiorHuntersDefense(superiorHuntersDefense)}
          </strong>
        )}

        {superiorHuntersDefense === 'evasion' && (
          <p>
            Puedes esquivar ágilmente algunos efectos de área, como por ejemplo
            el ardiente aliento de un dragón rojo o un conjuro de rayo
            relampagueante. Cuando estés sujeto a un efecto que te permite hacer
            una tirada de salvación de Destreza para sufrir sólo la mitad de
            daño, en lugar de eso no sufres ningún daño si tienes éxito en la
            tirada de salvación, y solo la mitad de daño si fallas la tirada.
          </p>
        )}
        {superiorHuntersDefense === 'standAgainstTheTide' && (
          <p>
            Cuando una criatura hostil falla su ataque cuerpo a cuerpo sobre ti,
            puedes utilizar tu reacción para obligarla a repetir el mismo ataque
            contra otra criatura (que no sea sobre sí misma) de tu elección.
          </p>
        )}
        {superiorHuntersDefense === 'uncannyDodge' && (
          <p>
            Cuando un atacante que puedas ver te golpea, puedes utilizar tu
            reacción para reducir a la mitad el daño de los ataques recibidos.
          </p>
        )}
      </>
    );
  },

  shareSpells: (skill, pc) => (
    <p>
      A partir del nivel 15 cuando lances un conjuro dirigido a ti mismo también
      puedes afectar a tu compañero animal si la bestia se encuentra a un máximo
      de 30 pies (9 metros) de ti.
    </p>
  ),

  feralSenses: (skill, pc) => (
    <>
      <p>
        A partir del nivel 18 obtienes sentidos sobrenaturales que te ayudan a
        luchar contra criaturas que no puedes ver. Cuando atacas a una criatura
        que no puedes ver, tu incapacidad de verla no implica una desventaja en
        tus tiradas de ataque contra ella.
      </p>
      <p>
        También eres consciente de la ubicación de cualquier criatura invisible
        que se encuentre a 30 pies (9 metros) de ti, siempre que la criatura no
        se esté escondiendo de ti y no estés cegado o ensordecido.
      </p>
    </>
  ),

  foeSlayer: (skill, pc) => (
    <>
      <p>
        A nivel 20 te conviertes en un cazador sin igual de tus enemigos. Una
        vez por turno, puedes añadir tu modificador de Sabiduría (
        {increment(getStatMod(getStat(pc, 'wis')))}) a la tirada de ataque o la
        tirada de daño de un ataque que hagas contra uno de tus enemigos
        predilectos.
      </p>
      <p>
        Puedes optar por utilizar este rasgo antes o después de realizar la
        tirada, pero antes de que se apliquen los efectos de la tirada.
      </p>
    </>
  ),
};
