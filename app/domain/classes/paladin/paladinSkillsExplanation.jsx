import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '~/domain/characters';
import { getSpellSavingThrow } from '~/domain/spells/spells';
import { getPaladinFightingStyle, getSacredOath } from './paladin';
import { translateFightingStyle } from '../fighter/fighter';

import styles from '~/components/modal/inventoryItem.module.css';

export const PALADIN_SKILLS_EXPLANATION = {
  divineSense: (skill, pc) => (
    <>
      <p>
        Tus sentidos captan la presencia de un terrible mal como un nauseabundo
        olor, y un bien poderoso resuena en tus oídos como música celestial.
        Como acción, puedes expandir tus sentidos para detectar esas fuerzas.
        Hasta el final de tu siguiente turno, conoces la localización de
        cualquier ser celestial, demoníaco o muerto viviente en un rango de 60
        pies (18 metros) o menos que no esté tras una cobertura total. Conoces
        el tipo (celestial, demoníaco o muerto viviente) de cualquier criatura
        que capten tus sentidos, pero no su identidad (el Conde vampiro Strahd
        von Zarovich, por ejemplo). Dentro del mismo radio también puedes
        detectar la presencia de cualquier objeto o lugar que haya sido
        consagrado o profanado, como con el conjuro sacralizar
      </p>
      <p>
        Puedes usar esta característica {1 + getStatMod(getStat(pc, 'cha'))}{' '}
        veces: 1 + modificador de Carisma ({getStatMod(getStat(pc, 'cha'))}).
        Cuando finalices un descanso prolongado recuperas todos los usos
        gastados.
      </p>
    </>
  ),

  layOnHands: (skill, pc) => (
    <>
      <p>
        Tu toque bendito puede curar heridas. Tienes una reserva de poder
        curativo que se regenera cuando haces un descanso prolongado. Con esa
        reserva puedes restaurar un número total de {pc.level * 5} HP igual a tu
        nivel de paladín ({pc.level}) x 5.
      </p>
      <p>
        Como una acción, puedes tocar a una criatura y utilizar poder de tu
        reserva de curación para restaurar un número de Puntos de Golpe a esa
        criatura igual hasta, como máximo, el máximo que tengas en tu reserva.
      </p>
      <p>
        De forma alternativa, puedes{' '}
        <u>gastar 5 puntos de tu reserva de curación</u>
        para sanar al objetivo de una enfermedad o neutralizar un veneno que le
        esté afectando. Puedes curar varias enfermedades y neutralizar
        diferentes venenos con un solo uso de Imposición de manos, gastando
        puntos de tu reserva de curación por separado para cada uno de ellos.
      </p>
      <p>
        Esta característica no tiene efecto en los muertos vivientes y los
        constructos.
      </p>
    </>
  ),

  fightingStyle: (skill, pc) => {
    const fightingStyle = getPaladinFightingStyle(pc);
    return (
      <>
        <p>
          Adoptas un estilo particular de combate como especialidad. Elige una
          de las siguientes opciones. No puedes escoger un Estilo de Combate más
          de una vez, incluso si tienes la opción de escoger otro más adelante.
        </p>

        {!fightingStyle && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/paladin/fightingStyle`}
              className={styles.modalButton}
            >
              Escoge Estilo de Combate
            </Link>
          </div>
        )}

        {fightingStyle === 'defense' && (
          <div className={styles.paragraph}>
            <h3>{translateFightingStyle('defense')}</h3>
            Mientras lleves puesta una armadura ganas un +1 la CA
          </div>
        )}
        {fightingStyle === 'dueling' && (
          <div className={styles.paragraph}>
            <h3>{translateFightingStyle('dueling')}</h3>
            Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
            ganas un bonificador de +2 a las tiradas de daño con esa arma.
          </div>
        )}
        {fightingStyle === 'great-Weapon-fighting' && (
          <div className={styles.paragraph}>
            <h3>{translateFightingStyle('great-Weapon-fighting')}</h3>
            Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos
            manos, puedes volver a realizar la tirada de daño y debiendo usar la
            nueva tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser
            un arma a dos manos o tener la propiedad versátil para ganar este
            beneficio.
          </div>
        )}
        {fightingStyle === 'protection' && (
          <div className={styles.paragraph}>
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
      <p>
        Comenzando en el nivel 2, cuando golpeas a una criatura con un ataque
        con un arma cuerpo a cuerpo, puedes gastar uno de tus espacios de
        conjuro de paladín para infligir <u>daño radiante</u> al objetivo,
        además del daño del arma. El daño extra es <u>2d8</u> para un espacio de
        conjuro de <u>nivel 1</u>, más <u>1d8</u> por <u>cada nivel</u> de
        conjuro superior a 1, hasta un máximo de 5d8. El daño se incrementa en
        1d8 si el objetivo es un muerto viviente o infernal.
      </p>
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
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/paladin/sacredOath`}
            className={styles.modalButton}
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
        . Como acción adicional, puedes realizar un voto de enemistad contra una
        criatura que esté a 10 pies (3 metros) o menos de ti y que puedas ver,
        usando tu Canalizar Divinidad. Ganas ventaja en las tiradas de ataque
        contra esa criatura durante 1 minuto o hasta que sus Puntos de Golpe
        lleguen a 0 o caiga inconsciente
      </p>
    );
  },
};
