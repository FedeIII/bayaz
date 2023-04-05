import { getStat, getStatMod, translateSkill } from '../../characters';

import styles from '~/components/modal/inventoryItem.module.css';

export const CLERIC_SKILLS_EXPLANATION = {
  blessingsOfKnowledge: (skill, pc) => (
    <>
      <p>
        A partir del nivel 1 aprendes dos idiomas de tu elección. También pasas
        a ser competente en dos de las siguientes habilidades, a tu elección:
        Arcano, Historia, Naturaleza o Religión.
      </p>
      <p>
        Tu bonificador de competencia se duplica para cualquier tirada de
        habilidad que use cualquiera de estas habilidades.
      </p>
      <ul>
        {pc.classAttrs.skills.map(skillName => (
          <li>{translateSkill(skillName)}</li>
        ))}
      </ul>
    </>
  ),

  warPriest: (skill, pc) => (
    <>
      <p>
        Desde el nivel 1 tu dios te otorga instantes de inspiración cuando estás
        en medio de la batalla. Cuando usas la acción de Atacar, puedes hacer un
        ataque con armas como acción adicional.
      </p>
      <p>
        Puedes usar este rasgo un número de veces equivalente a tu modificador
        de Sabiduría ({getStatMod(getStat(pc, 'wis'))}) (con un mínimo de 1).
        Recuperas todos los usos gastados cuando finalizas un descanso
        prolongado.
      </p>
    </>
  ),

  wardingFlare: (skill, pc) => (
    <>
      <p>
        Desde el nivel 1 puedes interponer una luz divina entre ti y un enemigo
        que te ataque. Cuando eres atacado por una criatura que puedas ver en un
        rango de 30 pies (9 metros), puedes usar tu reacción para imponerle
        desventaja en su tirada de ataque, haciendo que la luz deslumbre al
        atacante antes de que lleve a cabo su ataque. Un atacante que no pueda
        ser cegado es inmune a este efecto.
      </p>
      <p>
        Puedes usar este rasgo un número de veces equivalente a tu modificador
        de Sabiduría ({getStatMod(getStat(pc, 'wis'))}) (con un mínimo de 1).
        Recuperas todos los usos gastados cuando finalizas un descanso
        prolongado.
      </p>
    </>
  ),

  wrathOfTheStorm: (skill, pc) => (
    <>
      <p>
        Desde el nivel 1 puedes reprender con truenos a tus atacantes. Cuando
        una criatura en un rango de 5 pies (1,5 metros) de ti que puedas ver te
        golpee con un ataque, puedes usar tu reacción para que haga una tirada
        de salvación de Destreza. La criatura recibe 2d8 de daño sónico o
        eléctrico (a tu elección) con una tirada de salvación fallida, y la
        mitad con una salvación exitosa.
      </p>
      <p>
        Puedes usar este rasgo un número de veces equivalente a tu modificador
        de Sabiduría ({getStatMod(getStat(pc, 'wis'))}) (con un mínimo de 1).
        Recuperas todos los usos gastados cuando finalizas un descanso
        prolongado.
      </p>
    </>
  ),

  blessingOfTheTrickster: (skill, pc) => (
    <p>
      Comenzando cuando eliges este dominio a nivel 1 puedes usar tu acción para
      tocar a una criatura voluntaria y darle ventaja en las tiradas de Destreza
      (Sigilo). Esta bendición dura una hora o hasta que uses este rasgo
      nuevamente.
    </p>
  ),

  discipleOfLife: (skill, pc) => (
    <p>
      También a nivel 1 tus conjuros de sanación son más efectivos. Cada vez que
      uses un conjuro de nivel 1 o superior para restaurar Puntos de Golpe a una
      criatura, la criatura recupera Puntos de Golpe adicionales iguales a 2 +
      el nivel del conjuro.
    </p>
  ),
};
