import { Link } from '@remix-run/react';
import { SNEAK_ATTACK_DAMAGE } from './rogue';

import styles from '~/components/modal/inventoryItem.module.css';

export const ROGUE_SKILLS_EXPLANATION = {
  sneakAttack: (skill, pc) => (
    <>
      <p>
        Al comienzo del nivel 1 sabes cómo atacar sutilmente y aprovechar la
        distracción de tu oponente. Una vez por turno, si tienes ventaja en la
        tirada de ataque puedes infligir {SNEAK_ATTACK_DAMAGE[pc.level]} de daño
        extra a la criatura que golpees. El ataque debe usar un arma sutil o a
        distancia.
      </p>
      <p>
        No necesitas ventaja en la tirada de ataque para realizar un Ataque
        Furtivo si tu objetivo tiene otro adversario a 5 pies (1,5 metros) que
        no esté incapacitado y tú no tengas desventaja en esta tirada
      </p>
    </>
  ),

  cunningAction: (skill, pc) => (
    <p>
      Comenzando en el nivel 2 tu rapidez mental y agilidad permiten que te
      muevas y actúes rápidamente. Puedes utilizar una acción adicional en cada
      uno de tus turnos de combate. Puedes usar esta acción solamente para
      acciones de Carrera, Retirada o Esconderse.
    </p>
  ),

  roguishArchetype: (skill, pc) => {
    return (
      <>
        <p>
          En el nivel 3 eliges un arquetipo que se parezca a la forma en la que
          usas tus habilidades de pícaro: Ladrón, Asesino o Bribón Arcano, todos
          detallados al final de la descripción de la clase. Tu elección de
          arquetipo te ofrecerá rasgos a nivel 3 y de nuevo en los niveles 9, 13
          y 17.
        </p>
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/rogue/roguishArchetype`}
            className={styles.modalButton}
          >
            Escoge Arquetipo
          </Link>
        </div>
      </>
    );
  },

  mageHandLegerdemain: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 3, cuando lanzas <u>mano de mago</u>, puedes hacer
        invisible la mano espectral y puedes hacer las siguientes tareas
        adicionales con ella:
      </p>
      <ul>
        <li>
          Puedes depositar un objeto que estés sosteniendo en un contenedor
          portado por otra criatura.
        </li>
        <li>
          Puedes coger un objeto de un contenedor portado por otra criatura.
        </li>
        <li>
          Puedes usar herramientas de ladrón a distancia para abrir cerraduras y
          desarmar trampas a distancia.
        </li>
      </ul>
      <p>
        Puedes realizar una de estos trucos sin ser percibido por una criatura
        si tienes éxito en una prueba de Destreza (Juego de Manos) enfrentada a
        una prueba de Sabiduría (Percepción) de la criatura
      </p>
      <p>
        Además, puedes utilizar la acción adicional que te brinda Acción Astuta
        para controlar la mano.
      </p>
    </>
  ),

  bonusProficiencies: (skill, pc) => (
    <p>
      Cuando eliges este arquetipo en el nivel 3 ganas competencia con el kit de
      disfraz y el kit de envenenador.
    </p>
  ),

  fastHands: (skill, pc) => (
    <p>
      Empezando al nivel 3 puedes usar la acción adicional que te otorga tu
      Acción Astuta para hacer una prueba de Destreza (Juego de Manos), usar tus
      herramientas de ladrón para desarmar una trampa o abrir una cerradura, o
      para ejecutar la acción de Usar un Objeto.
    </p>
  ),
};
