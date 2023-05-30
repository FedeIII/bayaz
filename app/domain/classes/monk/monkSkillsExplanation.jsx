import { Link } from '@remix-run/react';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { getExtraUnarmoredMovement, getKiPoints } from './monk';

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

  ki: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 tu entrenamiento te permite utilizar la mística
        energía del ki. Tu acceso a esta energía está representado por un número
        de puntos ki. Tu nivel de monje determina la cantidad de puntos de ki
        que tienes:{' '}
        <strong>
          <u>{getKiPoints(pc)} puntos</u>
        </strong>
      </p>
      <p>
        Puedes gastar estos puntos para utilizar varios rasgos. Comienzas
        conociendo tres: Ráfaga de Golpes, Defensa Paciente y Andar del Viento.
        Aprendes más rasgos al progresar niveles en esta clase.
      </p>
      <p>
        Cuando gastas un punto ki, no podrás volver a usarlo hasta que termine
        un descanso corto o prolongado, después del cual recuperas todos los
        puntos ki que hayas gastado. Debes pasar al menos 30 minutos del
        descanso en meditación para poder recuperar tus puntos ki.
      </p>
      <p>
        Algunos de tus rasgos ki requieren que tu objetivo haga una tirada de
        salvación para resistirse a los efectos del rasgo.
        <strong>
          <u>
            La CD de la tirada de salvación es{' '}
            {8 + getProficiencyBonus(pc.level) + getStatMod(getStat(pc, 'wis'))}
          </u>
        </strong>{' '}
        y se calcula de la siguiente manera:
      </p>
      <p>
        <strong>
          <u>CD de la Salvación de Ki:</u>
        </strong>{' '}
        {8 + getProficiencyBonus(pc.level) + getStatMod(getStat(pc, 'wis'))} = 8
        + bonificador de competencia ({getProficiencyBonus(pc.level)}) +
        modificador de Sabiduría ({getStatMod(getStat(pc, 'wis'))})
      </p>
    </>
  ),

  flurryOfBlows: (skill, pc) => (
    <p>
      Inmediatamente después de realizar la acción de Ataque en tu turno, puedes
      gastar un punto ki para hacer dos ataques sin armas como una acción
      adicional.
    </p>
  ),

  patientDefense: (skill, pc) => (
    <p>
      Puedes gastar un punto ki para usar la acción de Esquivar como una acción
      adicional en tu turno.
    </p>
  ),

  stepOfTheWind: (skill, pc) => (
    <p>
      Puedes gastar un punto ki para usar la acción de Retirada o Carrera como
      una acción adicional en tu turno, además, tu distancia de salto se duplica
      durante este turno.
    </p>
  ),

  unarmoredMovement: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 tu velocidad se incrementa en 10 pies (3
        metros) mientras no uses armadura ni escudo. Esta bonificación se
        incrementa cuando alcanzas ciertos niveles de monje.
      </p>
      <strong>{increment(getExtraUnarmoredMovement(pc))}m</strong>
      {pc.level >= 9 && (
        <p>
          Al nivel 9, obtienes la capacidad de moverte por superficies
          verticales o sobre líquidos durante tu turno, sin caer mientras te
          encuentres en movimiento.
        </p>
      )}
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
