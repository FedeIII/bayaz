import { Link } from '@remix-run/react';

import styles from '~/components/modal/inventoryItem.module.css';

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

  primalPath: (skill, pc) => {
    return (
      <>
        <p>
          En el nivel 3, eliges una senda que da forma a la naturaleza de tu
          furia. Elige entre la Senda del Berserker o la Senda del Guerrero
          Totémico, ambas detalladas al final de la descripción de la clase. Tu
          elección te proporciona rasgos en el nivel 3 y nuevamente en el 6 y en
          el 14.
        </p>

        {!pc.classAttrs?.primalPath && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/primalPath`}
              className={styles.modalButton}
            >
              Escoge Senda Primaria
            </Link>
          </div>
        )}
      </>
    );
  },
};
