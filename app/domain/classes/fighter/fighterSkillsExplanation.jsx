import { Link } from '@remix-run/react';
import { getFightingStyle, translateFightingStyle } from './fighter';

import styles from '~/components/modal/inventoryItem.module.css';

export const FIGHTER_SKILLS_EXPLANATION = {
  secondWind: (skill, pc) => (
    <p>
      Tienes una limitada capacidad de aguante que puedes usar para protegerte
      del peligro. En tu turno, puedes usar una acción adicional para ganar una
      cantidad de Puntos de Golpe igual a 1d10 + {pc.level} (tu nivel de guerrero). Una vez
      que hayas usado este rasgo, debes hacer un descanso corto o prolongado
      antes de poder volver a usarlo.
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
};
