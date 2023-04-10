import { Link } from '@remix-run/react';
import {
  getFavoredEnemies,
  getFavoredTerrains,
  translateFavoredEnemy,
  translateFavoredTerrain,
} from './ranger';

import styles from '~/components/modal/inventoryItem.module.css';

export const RANGER_SKILLS_EXPLANATION = {
  favoredEnemy: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 1 posees una importante experiencia en el estudio,
        el seguimiento, la caza, e incluso el habla de un cierto tipo de
        enemigo.
      </p>
      <p>
        Tienes ventaja en las tiradas de Sabiduría (Supervivencia) para rastrear
        a tus enemigos predilectos, así como ventajas en las tiradas de
        Inteligencia para recabar información sobre ellos.
      </p>
      <p>
        Al obtener este rasgo también aprendes un idioma a tu elección que
        hablen tus enemigos predilectos si es que efectivamente hablan.
      </p>
      <p>
        Eliges un enemigo predilecto adicional, así como un lenguaje asociado,
        en el nivel 6 y en el 14. Conforme ganas niveles, tus elecciones
        deberían reflejar los tipos de monstruos que has encontrado en tus
        aventuras.
      </p>

      <strong>
        {getFavoredEnemies(pc).map(translateFavoredEnemy).join(', ')}
      </strong>
    </>
  ),

  naturalExplorer: (skill, pc) => (
    <>
      <p>
        Estás particularmente familiarizado con un tipo de entorno natural y
        eres experto en viajar y sobrevivir en tal región. Cuando hagas una
        tirada de Inteligencia o Sabiduría relacionada con tu terreno
        predilecto, tu bonificador de competencia se duplica si estás utilizando
        una habilidad en la que eres competente.
      </p>
      <p>
        Si viajas durante una hora o más a través de tu terreno predilecto,
        ganas los siguientes beneficios:
      </p>
      <ul>
        <li>El terreno difícil no ralentiza los viajes de tu grupo.</li>
        <li>Tu grupo no se perderá salvo que intervenga la magia en ello.</li>
        <li>
          Incluso cuando estás ocupado con otra actividad mientras viajas (como
          buscar comida, navegar, o rastrear) sigues estando alerta respecto a
          otros peligros.
        </li>
        <li>
          Si viajas solo, puedes moverte sigilosamente a velocidad normal.
        </li>
        <li>
          Cuando forrajeas, hallas el doble de alimento de lo que encontrarías
          normalmente.
        </li>
        <li>
          Mientras rastrees a otras criaturas, puedes conocer su número exacto,
          sus tamaños y cuánto tiempo hace que han pasado a través de una zona.
        </li>
      </ul>
      <p>Eliges terrenos predilectos adicionales en el nivel 6 y 10.</p>

      <strong>
        {getFavoredTerrains(pc).map(translateFavoredTerrain).join(', ')}
      </strong>
    </>
  ),
};
