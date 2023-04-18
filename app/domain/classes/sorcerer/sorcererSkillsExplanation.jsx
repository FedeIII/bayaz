import { getStat, getStatMod } from '../../characters';
import { getDragonAncestor, translateDragonAncestor } from './sorcerer';

import styles from '~/components/modal/inventoryItem.module.css';

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

  wildMagicSurge: (skill, pc) => (
    <p>
      Comenzando cuando eliges este origen en el nivel 1, tus lanzamientos de
      conjuros pueden desatar oleadas de magia salvaje. Inmediatamente después
      de que lances un conjuro de hechicero de nivel 1 o superior, el DM puede
      hacerte tirar un d20. Si sacas un 1, tira en la tabla Oleada de Magia
      Salvaje para crear un efecto mágico aleatorio.
    </p>
  ),

  tidesOfChaos: (skill, pc) => (
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

  fontOfMagic: (skill, pc) => (
    <>
      <p>
        En el nivel 2 te conectas con una profunda fuente de magia en tu
        interior. Esta fuente es representada por los puntos de hechicería, que
        te permite crear una gran variedad de efectos mágicos.
      </p>
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
      <div className={styles.withTable}>
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

        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableCell}>Nivel de espacio de conjuro</th>
              <th className={styles.tableCell}>
                Coste en Puntos de Hechicería
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>1</td>
              <td className={styles.tableCell}>2</td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>2</td>
              <td className={styles.tableCell}>3</td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>3</td>
              <td className={styles.tableCell}>5</td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>4</td>
              <td className={styles.tableCell}>6</td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>5</td>
              <td className={styles.tableCell}>7</td>
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
};
