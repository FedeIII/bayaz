import { FIGHTING_STYLES, translateFightingStyle } from '~/domain/classes/fighter/fighter';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

function FighterSkills(props) {
  return (
    <>
      <p>
        <label>
          <span className={styles.paleText}>Escoge estilo de combate</span>
          <br />
          <select
            name="fighting-style"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>{translateFightingStyle('archery')}</h3>
        Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a
        distancia.
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>{translateFightingStyle('defense')}</h3>
        Mientras lleves puesta una armadura ganas un +1 la CA.
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>{translateFightingStyle('dueling')}</h3>
        Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
        ganas un bonificador de +2 a las tiradas de daño con esa arma.
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>
          {translateFightingStyle('great-Weapon-fighting')}
        </h3>
        Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos manos,
        puedes volver a realizar la tirada de daño y debiendo usar la nueva
        tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser un arma a
        dos manos o tener la propiedad versátil para ganar este beneficio.
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>
          {translateFightingStyle('protection')}
        </h3>
        Cuando una criatura que puedes ver ataca a un objetivo que no eres tú y
        está a 5 pies o menos de ti, puedes usar tu reacción para hacer que el
        enemigo tenga desventaja en la tirada de ataque. Debes estar usando un
        escudo.
      </p>

      <p className={styles.paragraph}>
        <h3 className={styles.paleText}>
          {translateFightingStyle('two-weapon-fighting')}
        </h3>
        Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
        modificador de característica al daño del segundo ataque.
      </p>
    </>
  );
}

export default FighterSkills;
