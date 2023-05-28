import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/modal/inventoryItem.module.css';

export const MONK_SKILLS_EXPLANATION = {
  unarmoredDefense: (skill, pc) => (
    <p>
      Empezando en el nivel 1, siempre que no uses armadura y no lleves escudo,
      tu CA es igual a{' '}
      {10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'wis'))}: 10
      + tu modificador de Destreza ({getStatMod(getStat(pc, 'dex'))}) + tu
      modificador de Sabiduría ({getStatMod(getStat(pc, 'wis'))})
    </p>
  ),

  martialArts: (skill, pc) => (
    <>
      <p>
        En nivel 1 la práctica que tienes con las artes marciales te da maestría
        en estilos de combate que utilizan golpes sin armas y armas de monje,
        que son espadas cortas y cualquier arma simple que no tenga las
        propiedades a dos manos o pesada.
      </p>
      <p>
        Obtienes los siguientes beneficios mientras no estés armado o uses armas
        de monje y no lleves armadura ni escudo:
      </p>
      <ul>
        <li>
          Puedes usar tu Destreza en lugar de tu Fuerza para el ataque y daño de
          tus golpes sin armas y con armas de monje.
        </li>
        <li>
          Puedes tirar un d4 en lugar del daño normal de tus golpes sin armas o
          de tus armas de monje. Este dado cambia conforme obtienes niveles de
          monje, tal como se muestra en la columna Artes Marciales en la tabla
          Monje.
        </li>
        <li>
          Cuando uses la acción de ataque en tu turno estando desarmado o usando
          un arma de monje, puedes realizar un ataque sin armas como una acción
          adicional. Por ejemplo, si usas la acción de ataque para atacar con un
          bastón, puedes hacer un ataque desarmado como una acción adicional,
          asumiendo que no hayas usado una acción adicional este turno.
        </li>
      </ul>
      <p>
        Algunos monasterios emplean formas especializadas de armas de monje. Por
        ejemplo, puedes usar una clava que son dos trozos de madera unidos por
        una cadena corta (llamada nunchaku) o una hoz con una hoja más corta y
        recta (llamada kama). Cualquiera que sea el nombre que uses para un arma
        de monje, puedes usar las estadísticas dadas para cada arma asociada en
        el Capítulo 5.
      </p>
    </>
  ),

  // arcaneTradition: (skill, pc) => (
  //   <>
  //     <p>
  //       Cuando alcanzas el nivel 2 eliges una tradición arcana, que determina tu
  //       práctica de la magia a través de una de las ocho escuelas mágicas
  //       existentes: Abjuración, Adivinación, Conjuración, Encantamiento,
  //       Evocación, Ilusión, Nigromancia o Transmutación. Tu elección te
  //       proporciona rasgos de la escuela elegida en el nivel 2, y otra vez en
  //       los niveles 6, 10 y 14
  //     </p>
  //     <div className={styles.modalButtons}>
  //       <Link
  //         to={`/characters/pc/${pc.name}/leveling/wizard/arcaneTradition`}
  //         className={styles.modalButton}
  //       >
  //         Escoge Escuela
  //       </Link>
  //     </div>
  //   </>
  // ),
};
