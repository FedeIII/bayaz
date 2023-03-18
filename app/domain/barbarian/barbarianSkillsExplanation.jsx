import { Link } from '@remix-run/react';

import styles from '~/components/modal/inventoryItem.module.css';
import { getProficiencyBonus, getStat, getStatMod } from '../characters';

export const BARBARIAN_SKILLS_EXPLANATION = {
  rage: () => (
    <>
      <p>
        En combate, luchas con una ferocidad primitiva. En tu turno, puedes
        entrar en furia como acción adicional.
      </p>
      <p>
        Mientras estás en furia ganas los siguientes beneficios si no llevas
        armadura pesada:
      </p>
      <ul>
        <li>Tienes ventaja en las pruebas y tiradas de salvación de Fuerza.</li>
        <li>
          Cuando realizas un ataque de cuerpo a cuerpo usando tu Fuerza, ganas
          un bonificador al daño que aumenta a medida que subes tu nivel de
          bárbaro, tal como muestra la columna de Daño de Furia en la tabla
          Bárbaro.
        </li>
        <li>Tienes resistencia al daño contundente, perforante y cortante.</li>
      </ul>
      <p>
        Si tienes la capacidad de lanzar hechizos, no puedes lanzarlos o
        concentrarte en ellos mientras estés en estado de furia.
      </p>
      <p>
        Tu furia tiene una duración de 1 minuto. Termina antes si caes
        inconsciente o si acaba tu turno y no has atacado a ninguna criatura
        hostil desde tu último turno, o no has recibido daño desde entonces.
        También puedes cancelar tu furia en tu turno como acción adicional.
      </p>
      <p>
        Una vez has entrado en furia un número de veces igual al número que
        aparece en la columna Furia de la tabla Bárbaro, debes realizar un
        descanso prolongado antes de poder entrar en furia de nuevo.
      </p>
    </>
  ),

  unarmoredDefense: () => (
    <p>
      Mientras no lleves ninguna armadura, tu Clase de Armadura será de 10 +
      Modificador de Destreza + Modificador de Constitución. Puedes usar un
      escudo y aun así beneficiarte de este rasgo.
    </p>
  ),

  recklessAttack: () => (
    <p>
      Empezando en el nivel 2, puedes dejar a un lado tu defensa para atacar con
      feroz desesperación. Cuando hagas tu primer ataque en tu turno, puedes
      decidir atacar de forma temeraria. Hacerlo te da ventaja en un ataque de
      armas cuerpo a cuerpo que use Fuerza durante este turno, pero los ataques
      contra ti tienen ventaja hasta el siguiente turno.
    </p>
  ),

  dangerSense: () => (
    <p>
      A partir del nivel 2, obtienes un asombroso sentido para percibir los
      elementos de tu entorno que presentan una amenaza, dándote ventaja cuando
      trates de apartarte del peligro. Tienes ventaja en las tiradas de
      salvación de Destreza contra los efectos que puedas ver, como trampas y
      hechizos. Para beneficiarte de este rasgo no puedes estar ciego, sordo o
      incapacitado.
    </p>
  ),

  primalPath: (skill, pc) => (
    <>
      <p>
        En el nivel 3, eliges una senda que da forma a la naturaleza de tu
        furia. Elige entre la Senda del Berserker o la Senda del Guerrero
        Totémico, ambas detalladas al final de la descripción de la clase. Tu
        elección te proporciona rasgos en el nivel 3 y nuevamente en el 6 y en
        el 14.
      </p>

      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/barbarian/primalPath`}
          className={styles.modalButton}
        >
          Escoge Senda Primaria
        </Link>
      </div>
    </>
  ),

  frenzy: () => (
    <p>
      A partir del momento en el que eliges esta senda al nivel 3, puedes entrar
      en frenesí cuando estás en furia. Si lo haces, mientras dure tu furia,
      puedes hacer un único ataque cuerpo a cuerpo como acción adicional en cada
      uno de tus turnos después de entrar en frenesí. Cuando tu furia termina,
      sufres un nivel de fatiga (como se describe en el Apéndice A).
    </p>
  ),

  spiritSeeker: () => (
    <p>
      Tuya es la senda que busca la sintonía con el mundo natural, dándote una
      íntima relación con las bestias. Al nivel 3, cuando adoptas esta senda,
      ganas la habilidad de lanzar los conjuros sentido animal y hablar con los
      animales, pero sólo como rituales, como se describe en el Capítulo 10.
    </p>
  ),

  totemSpirit: (skill, pc) => {
    const { totemType, animal } = pc.classAttrs?.spiritTotem || {};
    return (
      <>
        <p>
          Al nivel 3, cuando adoptas esta senda, eliges un tótem animal y
          obtienes sus características. Debes hacer o adquirir un objeto como
          tótem físico (un amuleto u otro adorno similar) que contenga pelo,
          plumas, garras, dientes o huesos del animal tótem. A tu elección,
          también ganas atributos físicos menores que recuerdan a tu espíritu
          tótem. Por ejemplo, si tienes un espíritu tótem de oso, podrías ser
          inusualmente peludo y de piel gruesa, o si tu tótem es el águila, tus
          ojos se vuelven de un amarillo brillante.
        </p>
        {!totemType && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/barbarian/totemSpirit`}
              className={styles.modalButton}
            >
              Escoge Tótem
            </Link>
          </div>
        )}
        {totemType === 'bear' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estás en furia, tienes resistencia a todos los daños
              salvo el daño psíquico. El espíritu del oso te hace lo
              suficientemente duro para resistir cualquier castigo.
            </p>
          </>
        )}
        {totemType === 'eagle' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estés en furia y no estés usando armadura pesada, las
              demás criaturas tienen desventaja en los ataques de oportunidad
              contra ti, y puedes usar la acción de Carrera como acción
              adicional en tu turno. El espíritu del águila te convierte en un
              depredador que puede moverse en combate con facilidad.
            </p>
          </>
        )}
        {totemType === 'wolf' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estés en furia, tus aliados tienen ventaja en las tiradas
              de ataque cuerpo a cuerpo contra cualquier criatura a 5 pies (1,5
              metros) de ti que sea hostil hacia ti. El espíritu del lobo te
              convierte en un líder entre los cazadores.
            </p>
          </>
        )}
      </>
    );
  },

  extraAttack: () => (
    <p>
      A partir del nivel 5, puedes atacar dos veces, en lugar de una, siempre
      que uses la acción de Atacar en tu turno.
    </p>
  ),

  fastMovement: () => (
    <p>
      A partir del nivel 5, tu velocidad se incrementa en 10 pies (3 metros)
      mientras no estés usando armadura pesada.
    </p>
  ),

  mindlessRage: () => (
    <p>
      Empezando en el nivel 6, no puedes ser encantado o asustado mientras estés
      en furia. Si estás encantado o asustado cuando entras en furia, el efecto
      es suspendido durante la duración de esta.
    </p>
  ),

  aspectOfTheBeast: (skill, pc) => {
    const { totemType, animal } = pc.classAttrs?.aspectOfTheBeast || {};
    return (
      <>
        <p>
          En el nivel 6, ganas un beneficio mágico basado en el tótem animal de
          tu elección. Puedes elegir el mismo animal que elegiste en nivel 3 o
          uno distinto.
        </p>
        {!totemType && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/barbarian/aspectOfTheBeast`}
              className={styles.modalButton}
            >
              Escoge Tótem
            </Link>
          </div>
        )}
        {totemType === 'bear' && (
          <>
            <h4>{animal}</h4>
            <p>
              Ganas la fuerza de un oso. Tu capacidad de carga (incluyendo tu
              carga máxima y tu capacidad de levantar y arrastrar) se duplica, y
              tienes ventaja en las pruebas de Fuerza realizadas para empujar,
              levantar, tirar o romper objetos.
            </p>
          </>
        )}
        {totemType === 'eagle' && (
          <>
            <h4>{animal}</h4>
            <p>
              Ganas la vista de un águila. Puedes ver a una distancia de hasta
              una milla (aprox. 1.600 metros) sin dificultad, y discernir hasta
              los más pequeños detalles de algo que no diste más de 100 pies (30
              metros) de ti. Además, la luz tenue no te impone desventaja en tus
              pruebas de Sabiduría (Percepción).
            </p>
          </>
        )}
        {totemType === 'wolf' && (
          <>
            <h4>{animal}</h4>
            <p>
              Ganas las capacidades de caza de un lobo. Puedes rastrear a otras
              criaturas mientras viajas a ritmo rápido y puedes moverte
              sigilosamente mientras viajas a ritmo normal (ver el Capítulo 8
              para las reglas de Ritmo de Viaje).
            </p>
          </>
        )}
      </>
    );
  },

  feralInstinct: () => (
    <>
      <p>
        A partir del nivel 7, tus instintos son tan precisos que tienes ventaja
        en las tiradas de iniciativa.
      </p>
      <p>
        De forma adicional, si eres sorprendido al principio del combate y no
        estás incapacitado, puedes actuar normalmente en tu primer turno, pero
        sólo si entras en furia antes de hacer otra cosa en ese turno.
      </p>
    </>
  ),

  brutalCritical: () => (
    <>
      <p>
        Empezando en nivel 9, puedes tirar un dado de daño adicional cuando
        determinas el daño de un golpe crítico con un ataque cuerpo a cuerpo.
      </p>
      <p>
        Esto se incrementa a dos dados adicionales en el nivel 13 y tres dados
        adicionales en el nivel 17.
      </p>
    </>
  ),

  intimidatingPresence: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 10, puedes usar tu acción para asustar a alguien
        con tu presencia amenazadora. Cuando lo haces, elige una criatura que
        puedas ver y esté a 30 pies{' '}
        <u>
          <strong>(9 metros)</strong>
        </u>{' '}
        o menos de ti. Si la criatura puede verte u oírte, debe tener éxito en
        una tirada de salvación de Sabiduría de{' '}
        <u>
          <strong>
            CD{' '}
            {8 + getProficiencyBonus(pc.level) + getStatMod(getStat(pc, 'cha'))}
          </strong>
        </u>{' '}
        (CD 8 + tu bonificador de competencia + tu modificador de Carisma) o
        quedar asustado hasta el final de su siguiente turno. En los turnos
        subsiguientes, puedes usar tu acción para extender la duración de este
        efecto en la criatura asustada hasta el final de tu próximo turno. Este
        efecto termina si la criatura acaba su turno fuera de tu línea de visión
        o a más de 60 pies (18 metros) de ti.
      </p>
      <p>
        Si la criatura tiene éxito en su tirada de salvación, no puedes usar
        este rasgo en esta criatura en las siguientes 24 horas.
      </p>
    </>
  ),

  spiritWalker: () => (
    <p>
      En el nivel 10, puedes lanzar el conjuro comunión con la naturaleza, pero
      sólo como ritual. Cuando lo haces, una versión espiritual de uno de los
      animales que elegiste para Espíritu Tótem o Aspecto de la Bestia se te
      aparece para transmitirte la información que pediste.
    </p>
  ),

  relentlessRage: () => (
    <>
      <p>
        Empezando en el nivel 11, tu furia puede mantenerte luchando a pesar de
        las graves heridas. Si tus Puntos de Golpe se reducen a cero mientras
        estás en furia y no mueres en el momento, puedes hacer una tirada de
        salvación de Constitución CD 10. Si tienes éxito, quedas reducido a 1
        punto de golpe en su lugar.
      </p>
      <p>
        Cada vez que usas este rasgo después de la primera vez, la CD se
        incrementa en 5. Cuando terminas un descanso corto o prolongado, la CD
        vuelve a ser 10
      </p>
    </>
  ),

  retaliation: () => (
    <p>
      Empezando en el nivel 14, cuando recibas daño de una criatura que está a 5
      pies (1,5 metros) de ti, puedes emplear tu reacción para realizar un
      ataque cuerpo a cuerpo contra esa criatura.
    </p>
  ),

  totemicAttunement: (skill, pc) => {
    const { totemType, animal } = pc.classAttrs?.totemicAttunement || {};
    return (
      <>
        <p>
          En el nivel 14, ganas un beneficio mágico basado en el tótem animal de
          tu elección. Puedes elegir el mismo animal que elegiste previamente o
          uno distinto.
        </p>
        {!totemType && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/barbarian/totemicAttunement`}
              className={styles.modalButton}
            >
              Escoge Tótem
            </Link>
          </div>
        )}
        {totemType === 'bear' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estás en furia, las criaturas a 5 pies (1,5 metros) de ti
              que te sean hostiles tienen desventaja en las tiradas de ataque
              contra cualquier otro que no seas tú u otro personaje con este
              rasgo. Un enemigo es inmune a este efecto si no puede verte u
              oírte, o si no puede ser asustado.
            </p>
          </>
        )}
        {totemType === 'eagle' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estás en furia, tienes una velocidad de vuelo igual a tu
              velocidad de movimiento actual. Este beneficio sólo funciona en
              breves intervalos de tiempo; caes si terminas tu turno en el aire
              y nada más te mantiene en vuelo.
            </p>
          </>
        )}
        {totemType === 'wolf' && (
          <>
            <h4>{animal}</h4>
            <p>
              Mientras estás en furia, puedes usar una acción adicional en tu
              turno para tumbar a una criatura Grande o más pequeña cuando
              impactas con un ataque cuerpo a cuerpo.
            </p>
          </>
        )}
      </>
    );
  },
};
