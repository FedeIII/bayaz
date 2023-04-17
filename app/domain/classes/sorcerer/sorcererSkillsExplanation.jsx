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
};
