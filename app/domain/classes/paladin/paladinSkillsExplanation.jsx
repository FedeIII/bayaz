import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '~/domain/characters';
import { getPaladinFightingStyle } from './paladin';
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
};
