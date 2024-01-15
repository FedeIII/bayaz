import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '~/domain/characters';
import { getSpellSavingThrow } from '~/domain/spells/spells';
import {
  getDivineSense,
  getLayOnHands,
  getPaladinFightingStyle,
  getSacredOath,
} from './paladin';
import { translateFightingStyle } from '../fighter/fighter';
import { increment } from '~/domain/display';

import styles from '~/components/modal/inventoryItem.css';
import { useEffect, useState } from 'react';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const PALADIN_SKILLS_EXPLANATION = {
  divineSense: (skill, pc, submit, closeModal) => {
    function onDivineSenseClick(e) {
      submit(
        {
          action: 'spendDivineSense',
          id: pc.id,
        },
        { method: 'post' }
      );
      closeModal();
    }

    const divineSense = getDivineSense(pc);

    return (
      <>
        <p>
          Tus sentidos captan la presencia de un terrible mal como un
          nauseabundo olor, y un bien poderoso resuena en tus oídos como música
          celestial. Como acción, puedes expandir tus sentidos para detectar
          esas fuerzas. Hasta el final de tu siguiente turno, conoces la
          localización de cualquier ser celestial, demoníaco o muerto viviente
          en un rango de 60 pies (18 metros) o menos que no esté tras una
          cobertura total. Conoces el tipo (celestial, demoníaco o muerto
          viviente) de cualquier criatura que capten tus sentidos, pero no su
          identidad (el Conde vampiro Strahd von Zarovich, por ejemplo). Dentro
          del mismo radio también puedes detectar la presencia de cualquier
          objeto o lugar que haya sido consagrado o profanado, como con el
          conjuro sacralizar
        </p>
        <p>
          Puedes usar esta característica {1 + getStatMod(getStat(pc, 'cha'))}{' '}
          veces: 1 + modificador de Carisma ({getStatMod(getStat(pc, 'cha'))}).
          Cuando finalices un descanso prolongado recuperas todos los usos
          gastados.
        </p>

        <div className="inventory-item__modal-buttons inventory-item__modal-buttons--wide">
          <span>Usos restantes: {divineSense}</span>
          {divineSense > 0 && (
            <button type="button" onClick={onDivineSenseClick}>
              Gastar
            </button>
          )}
        </div>
      </>
    );
  },

  layOnHands: (skill, pc, submit, closeModal) => {
    const layOnHands = getLayOnHands(pc);
    const [value, setValue] = useState(layOnHands);
    useEffect(() => {
      const newLayOnHands = getLayOnHands(pc);
      setValue(newLayOnHands);
    }, [pc]);

    function onLayOnHandsChange(e) {
      submit(
        {
          action: 'spendLayOnHands',
          id: pc.id,
          hp: value,
        },
        { method: 'post' }
      );
      closeModal();
    }

    return (
      <>
        <p>
          Tu toque bendito puede curar heridas. Tienes una reserva de poder
          curativo que se regenera cuando haces un descanso prolongado. Con esa
          reserva puedes restaurar un número total de {pc.level * 5} HP igual a
          tu nivel de paladín ({pc.level}) x 5.
        </p>
        <p>
          Como una acción, puedes tocar a una criatura y utilizar poder de tu
          reserva de curación para restaurar un número de Puntos de Golpe a esa
          criatura igual hasta, como máximo, el máximo que tengas en tu reserva.
        </p>
        <p>
          De forma alternativa, puedes{' '}
          <u>gastar 5 puntos de tu reserva de curación</u>
          para sanar al objetivo de una enfermedad o neutralizar un veneno que
          le esté afectando. Puedes curar varias enfermedades y neutralizar
          diferentes venenos con un solo uso de Imposición de manos, gastando
          puntos de tu reserva de curación por separado para cada uno de ellos.
        </p>
        <p>
          Esta característica no tiene efecto en los muertos vivientes y los
          constructos.
        </p>

        <div className="inventory-item__modal-buttons inventory-item__modal-buttons--wide">
          <span>HP restante: {layOnHands}</span>

          <div>
            <label>
              <input
                type="number"
                defaultValue={layOnHands > 0 ? 1 : 0}
                min="0"
                max={layOnHands}
                onChange={e => setValue(e.target.value)}
              />{' '}
              HP
            </label>{' '}
            <button type="button" onClick={onLayOnHandsChange}>
              Gastar
            </button>
          </div>
        </div>
      </>
    );
  },

  paladinFightingStyle: (skill, pc) => {
    const fightingStyle = getPaladinFightingStyle(pc);
    return (
      <>
        <p>
          Adoptas un estilo particular de combate como especialidad. Elige una
          de las siguientes opciones. No puedes escoger un Estilo de Combate más
          de una vez, incluso si tienes la opción de escoger otro más adelante.
        </p>

        {!fightingStyle && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/paladin/fightingStyle`}
              className="inventory-item__modal-button"
            >
              Escoge Estilo de Combate
            </Link>
          </div>
        )}

        {fightingStyle === 'defense' && (
          <div className="app__paragraph">
            <h3>{translateFightingStyle('defense')}</h3>
            Mientras lleves puesta una armadura ganas un +1 la CA
          </div>
        )}
        {fightingStyle === 'dueling' && (
          <div className="app__paragraph">
            <h3>{translateFightingStyle('dueling')}</h3>
            Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
            ganas un bonificador de +2 a las tiradas de daño con esa arma.
          </div>
        )}
        {fightingStyle === 'great-Weapon-fighting' && (
          <div className="app__paragraph">
            <h3>{translateFightingStyle('great-Weapon-fighting')}</h3>
            Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos
            manos, puedes volver a realizar la tirada de daño y debiendo usar la
            nueva tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser
            un arma a dos manos o tener la propiedad versátil para ganar este
            beneficio.
          </div>
        )}
        {fightingStyle === 'protection' && (
          <div className="app__paragraph">
            <h3>{translateFightingStyle('protection')}</h3>
            Cuando una criatura que puedes ver ataca a un objetivo que no eres
            tú y está a 5 pies o menos de ti, puedes usar tu reacción para hacer
            que el enemigo tenga desventaja en la tirada de ataque. Debes estar
            usando un escudo
          </div>
        )}
      </>
    );
  },

  divineSmite: (skill, pc) => {
    return (
      <>
        <p>
          Comenzando en el nivel 2, cuando golpeas a una criatura con un ataque
          con un arma cuerpo a cuerpo, puedes gastar uno de tus espacios de
          conjuro de paladín para infligir <u>daño radiante</u> al objetivo,
          además del daño del arma. El daño extra es <u>2d8</u> para un espacio
          de conjuro de <u>nivel 1</u>, más <u>1d8</u> por <u>cada nivel</u> de
          conjuro superior a 1, hasta un máximo de 5d8. El daño se incrementa en
          1d8 si el objetivo es un muerto viviente o infernal.
        </p>
        {pc.level >= 11 && (
          <p>
            En nivel 11, estás tan imbuido de poder justiciero que todos tus
            golpes con armas portan tu poder divino. Siempre que golpees a una
            criatura con un ataque con armas, la criatura recibe 1d8 de daño
            radiante extra. Además, si usas tu Castigo Divino con un ataque,
            añades este daño al daño extra de tu Castigo Divino.
          </p>
        )}
      </>
    );
  },

  divineHealth: (skill, pc) => {
    return (
      <p>
        A partir del nivel 3 la magia divina que fluye a través de ti te hace
        inmune a las enfermedades.
      </p>
    );
  },

  sacredOath: (skill, pc) => {
    return (
      <>
        <p>
          Cuando alcanzas el nivel 3 realizas el juramento que te convertirá en
          un paladín para siempre. Todo lo anterior ha sido una prueba, un
          estado de preparación, donde te comprometías con la causa, pero aún no
          te habías juramentado. Ahora deberás escoger el Juramento de Devoción,
          el Juramento de los Ancestros o el Juramento de Venganza, todos
          detallados al final de la descripción de clase.
        </p>
        <p>
          Tu elección te otorga rasgos en el nivel 3 y de nuevo en los niveles
          7, 15 y 20. Estos rasgos incluyen conjuros de juramento y el rasgo
          Canalizar Divinidad.
        </p>
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/paladin/sacredOath`}
            className="inventory-item__modal-button"
          >
            Escoge Juramento
          </Link>
        </div>
      </>
    );
  },

  channelDivinity: (skill, pc) => {
    const sacredOath = getSacredOath(pc);
    return (
      <>
        <p>
          Tu juramento te permite canalizar energía divina para potenciar
          efectos mágicos. Cada opción de Canalizar Divinidad otorgada por tu
          juramento explica cómo usarla
        </p>
        <p>
          Cuando usas tu Canalizar Divinidad escoges qué opción utilizar. Debes
          finalizar un descanso corto o prolongado para volver a usar tu
          Canalizar Divinidad de nuevo
        </p>
        <p>
          Algunos efectos de Canalizar Divinidad requieren tiradas de salvación.
          Cuando esto ocurra, la CD es igual a tu CD de salvación de conjuros de
          paladín ({getSpellSavingThrow(pc)}).
        </p>
      </>
    );
  },

  sacredWeapon: (skill, pc) => {
    return (
      <>
        <p>
          Como una acción, puedes imbuir un arma que estés sujetando con energía
          positiva usando tu Canalizar Divinidad. Durante 1 minuto, añades tu
          modificador de Carisma a las tiradas de ataque hechas con esa arma
          (con una bonificación mínima de +1). El arma también emite luz
          brillante en un radio de 20 pies (6 metros) y luz tenue otros 20 pies
          (6 metros) más allá. Si el arma no es mágica, pasa a ser un arma
          mágica durante la duración del efecto.
        </p>
        <p>
          Puedes finalizar este efecto en tu turno como parte de cualquier otra
          acción. Si ya no estás sujetando o llevando este arma, o si caes
          inconsciente, el efecto termina.
        </p>
      </>
    );
  },

  turnTheUnholy: (skill, pc) => {
    return (
      <>
        <p>
          Como una acción, presentas tu símbolo sagrado y rezas una plegaria
          para controlar seres demoníacos y muertos vivientes usando tu
          Canalizar Divinidad. Cada ser demoníaco o muerto viviente que pueda
          verte o escucharte dentro de un rango de 30 pies (9 metros) de ti,
          debe realizar una tirada de salvación de Sabiduría. Si la criatura
          falla la tirada, es expulsada durante 1 minuto o hasta que sufra algún
          daño
        </p>
        <p>
          Una criatura expulsada debe emplear sus turnos en intentar moverse tan
          lejos de ti como le sea posible, y no puede moverse voluntariamente a
          un espacio a menos de 30 pies (9 metros) de ti. Tampoco puede realizar
          reacciones. En su turno, sólo puede realizar la acción de Carrera o
          intentar huir de un efecto que impida que se mueva. Si no hay sitio
          donde moverse, la criatura puede usar la acción de Esquivar
        </p>
      </>
    );
  },

  naturesWrath: (skill, pc) => {
    return (
      <p>
        Puedes usar tu Canalizar Divinidad para invocar fuerzas primigenias que
        paralicen al objetivo. Como una acción, puedes hacer que enredaderas
        espectrales crezcan y atrapen a una criatura que puedas ver y esté a 10
        pies (3 metros) o menos de ti. La criatura debe superar una tirada de
        salvación de Fuerza o Destreza o quedará apresada. Mientras está
        apresada por las enredaderas, la criatura repite la tirada de salvación
        al final de cada uno de sus turnos. Si la supera se libera y las
        enredaderas desaparecen.
      </p>
    );
  },

  turnTheFaithless: (skill, pc) => {
    return (
      <>
        <p>
          Puedes usar tu Canalizar Divinidad para pronunciar antiguas palabras
          que dañan a las criaturas feéricas y demoníacas al escucharlas. Como
          una acción, presentas tu símbolo sagrado, y cada criatura feérica o
          demoníaca en un rango de 30 pies (9 metros) o menos de ti que pueda
          escucharte debe realizar una tirada de salvación de Sabiduría. Si
          falla, la criatura es expulsada durante 1 minuto o hasta que sufra
          algún daño.
        </p>
        <p>
          Una criatura expulsada debe emplear sus turnos en intentar moverse tan
          lejos de ti como le sea posible, y no puede moverse voluntariamente a
          un espacio a menos de 30 pies (9 metros) de ti. Tampoco puede realizar
          reacciones. En su turno, sólo puede realizar la acción de escapar o
          intentar huir de un efecto que impida que se mueva. Si no hay sitio
          donde moverse, la criatura puede usar la acción de Esquivar. Si la
          verdadera forma de una criatura está oculta por una ilusión,
          cambiaformas o algún otro efecto, esa verdadera forma es revelada
          mientras está expulsada.
        </p>
      </>
    );
  },

  abjureEnemy: (skill, pc) => {
    return (
      <>
        <p>
          Como una acción, presentas tu símbolo sagrado y entonas una plegaria
          de denuncia, usando tu Canalizar Divinidad. Escoge una criatura a 60
          pies (9 metros) o menos de ti que puedas ver. Esa criatura debe
          realizar una tirada de salvación de Sabiduría, a menos que sea inmune
          a ser asustada. Los seres demoníacos y muertos vivientes tienen
          desventaja en esta tirada de salvación.
        </p>
        <p>
          Si se falla la tirada, la criatura estará asustada durante 1 minuto o
          hasta que reciba algún daño. Mientras está asustada, la velocidad de
          la criatura es 0 y no puede beneficiarse de ninguna bonificación a su
          velocidad.
        </p>
        <p>
          Si tiene éxito en la tirada, la velocidad de la criatura se reduce a
          la mitad durante 1 minuto o hasta que sus Puntos de Golpe lleguen a 0
          o caiga inconsciente.
        </p>
      </>
    );
  },

  vowOfEnmity: (skill, pc) => {
    return (
      <p>
        Como acción adicional, puedes realizar un voto de enemistad contra una
        criatura que esté a 10 pies (3 metros) o menos de ti y que puedas ver,
        usando tu Canalizar Divinidad. Ganas ventaja en las tiradas de ataque
        contra esa criatura durante 1 minuto o hasta que sus Puntos de Golpe
        lleguen a 0 o caiga inconsciente.
      </p>
    );
  },

  extraAttack: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 5 puedes atacar dos veces en lugar de una siempre
        que realices la acción de Atacar en tu turno.
      </p>
    );
  },

  auraOfProtection: (skill, pc) => {
    const mod = getStatMod(getStat(pc, 'cha'));
    return (
      <p>
        Comenzando en el nivel 6, siempre que tú o una criatura amistosa situada
        hasta a {pc.level >= 18 ? '30 pies (9 metros)' : '10 pies (3 metros)'}{' '}
        de ti tenga que realizar una tirada de salvación, la criatura gana una
        bonificación a la tirada de salvación igual a{' '}
        {increment(mod > 0 ? mod : 1)}: tu modificador de Carisma (con una
        bonificación mínima de +1). Debes estar consciente para otorgar esta
        bonificación.
      </p>
    );
  },

  auraOfCourage: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 10 tú y las criaturas amistosas situadas hasta a{' '}
        {pc.level >= 18 ? '30 pies (9 metros)' : '10 pies (3 metros)'} de ti no
        podéis ser asustadas mientras estés consciente.
      </p>
    );
  },

  cleansingTouch: (skill, pc) => {
    const mod = getStatMod(getStat(pc, 'cha'));
    return (
      <>
        <p>
          Comenzando a nivel 14 puedes usar tu acción para finalizar un conjuro
          que te afecte a ti o a una criatura voluntaria con tu toque.
        </p>
        <p>
          Puedes usar esta característica {mod > 0 ? mod : 1} veces, igual a tu
          modificador de Carisma (como mínimo una vez). Recuperas los usos
          gastados cuando finalizas un descanso prolongado.
        </p>
      </>
    );
  },

  auraOfDevotion: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 7 tú y todas las criaturas amistosas a{' '}
        {pc.level >= 18 ? '30 pies (9 metros)' : '10 pies (3 metros)'} de ti no
        podéis ser hechizados mientras estéis conscientes.
      </p>
    );
  },

  auraOfWarding: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 7 la magia antigua te imbuye de una manera tan
        fuerte que forma una custodia sobrenatural. Tú y las criaturas amistosas
        a {pc.level >= 18 ? '30 pies (9 metros)' : '10 pies (3 metros)'} o menos
        de ti tenéis resistencia al daño de los hechizos.
      </p>
    );
  },

  relentlessAvenger: (skill, pc) => {
    return (
      <p>
        En el nivel 7 tu concentración sobrenatural te ayuda a evitar la
        retirada de tu enemigo. Cuando golpeas a una criatura con un ataque de
        oportunidad, puedes moverte hasta la mitad de tu velocidad
        inmediatamente después del ataque como parte de esa misma reacción. Este
        movimiento no provoca ataques de oportunidad.
      </p>
    );
  },

  purityOfSpirit: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 15 siempre estás bajo los efectos de un conjuro
        de <u>protección contra el mal y el bien</u>.
      </p>
    );
  },

  undyingSentinel: (skill, pc) => {
    return (
      <>
        <p>
          Comenzando en el nivel 15, cuando eres reducido a 0 Puntos de Golpe y
          no estás muerto, puedes decidir ser reducido a 1 punto de golpe en
          lugar de a 0. Cuando utilizas esta habilidad, no puedes volver a
          usarla hasta que finalices un descanso prolongado.
        </p>
        <p>
          Además, no sufres ninguno de los inconvenientes de la vejez y no
          puedes ser envejecido mágicamente.
        </p>
      </>
    );
  },

  soulOfVengeance: (skill, pc) => {
    return (
      <>
        <p>
          En el nivel 20 como una acción puedes emanar un aura de luz solar.
          Durante 1 minuto una luz brillante sale de ti en un radio de 30 pies
          (9 metros), y de luz tenue 30 pies (9 metros) más allá.
        </p>
        <p>
          Siempre que una criatura enemiga comience su turno en la luz
          brillante, la criatura sufre 10 puntos de daño radiante.
        </p>
        <p>
          Además, durante la duración, tienes ventaja en las tiradas de
          salvación contra conjuros lanzados por seres demoníacos o muertos
          vivientes.
        </p>
        <p>
          Una vez hayas utilizado este rasgo, no puedes volver a usarlo hasta
          que hayas finalizado un descanso prolongado.
        </p>
      </>
    );
  },

  holyNimbus: (skill, pc) => {
    return (
      <p>
        Comenzando en el nivel 15 la autoridad con la que recitas tu Voto de
        Enemistad te otorga un poder aún mayor sobre tu enemigo. Cuando una
        criatura bajo los efectos de tu Voto de Enemistad realiza un ataque,
        puedes usar tu reacción para realizar un ataque con un arma cuerpo a
        cuerpo contra esa criatura si está dentro de tu rango.
      </p>
    );
  },

  elderChampion: (skill, pc) => {
    return (
      <>
        <p>
          En nivel 20 puedes asumir la forma de una fuerza de la naturaleza
          ancestral tomando una apariencia de tu elección. Por ejemplo, tu piel
          podría volverse verde o su textura podría volverse como la corteza,
          podrían surgir hojas o musgo de tu pelo, o podrían crecerte astas o
          una melena de león. Usando tu acción, comienzas a transformarte.
        </p>
        <p>Durante 1 minuto, ganas los siguientes beneficios:</p>
        <ul>
          <li>
            Al comienzo de cada uno de tus turnos recuperas 10 Puntos de Golpe.
          </li>
          <li>
            Siempre que lances un conjuro de paladín que tenga un tiempo de
            lanzamiento de 1 acción, puedes lanzarlo como una acción adicional
            en su lugar.
          </li>
          <li>
            Las criaturas enemigas a 10 pies (3 metros) o menos de ti tienen
            desventaja en las tiradas de salvación contra tus conjuros de
            paladín y opciones de Canalizar Divinidad.
          </li>
          <li>
            Una vez hayas utilizado este rasgo no puedes volver a usarlo hasta
            que finalices un descanso prolongado.
          </li>
        </ul>
      </>
    );
  },

  avengingAngel: (skill, pc) => {
    return (
      <>
        <p>
          En nivel 20 puedes asumir la forma de un vengador angelical. Usando tu
          acción, comienzas a transformarte. Durante 1 hora, ganas los
          siguientes beneficios:
        </p>
        <ul>
          <li>
            De tu espalda surgen alas y te otorgan una velocidad de vuelo de 60
            pies (18 metros).
          </li>
          <li>
            Emanas un aura amenazante en un radio de 30 pies (9 metros). La
            primera vez que una criatura enemiga entra en el aura, o comienza su
            turno ahí durante la batalla, debe superar una tirada de salvación
            de Sabiduría o estará asustada durante 1 minuto o hasta que reciba
            algún daño. Las tiradas de ataque contra la criatura asustada tienen
            ventaja.
          </li>
        </ul>
        <p>
          Una vez hayas usado esta característica, no podrás volver a usarla
          hasta que finalices un descanso prolongado.
        </p>
      </>
    );
  },
};
