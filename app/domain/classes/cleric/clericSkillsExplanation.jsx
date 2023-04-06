import { getSpellSavingThrow } from '~/domain/spells/spells';
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

  channelDivinity: (skill, pc) => (
    <>
      <p>
        A partir del nivel 2, ganas la habilidad de canalizar energía divina
        directamente de tu deidad, usando esa energía para potenciar efectos
        mágicos. Empiezas con dos de esos efectos: Expulsar Muertos Vivientes y
        un efecto determinado por tu dominio. Algunos dominios te garantizan
        efectos adicionales a medida que consigues niveles, como se indica en la
        descripción del dominio.
      </p>
      <p>
        Cuando usas tu Canalizar Divinidad, eliges qué efecto crear. Debes
        finalizar un descanso corto o uno prolongado para poder volver a usar tu
        Canalizar Divinidad otra vez.
      </p>
      <p>
        Algunos efectos de Canalizar divinidad requieren tiradas de salvación.
        Cuando usas dicho efecto de esta clase, la CD equivale a la CD de
        salvación de tus conjuros de clérigo ({getSpellSavingThrow(pc)}).
      </p>
      <p>
        Comenzando en el nivel 6 puedes usar Canalizar Divinidad dos veces entre
        descansos, y empezando a nivel 18 puedes usarlo tres veces entre
        descansos. Cuando finalices un descanso corto o prolongado recuperas tus
        usos gastados.
      </p>
    </>
  ),

  turnUndead: (skill, pc) => (
    <>
      <p>
        Como una acción, muestras tu símbolo sagrado y entonas una plegaria
        negando a los muertos vivientes. Cada muerto viviente que pueda verte u
        oírte en un radio de 30 pies (9 metros) debe realizar una tirada de
        salvación de Sabiduría. Si la criatura falla la tirada de salvación, se
        encuentra expulsada durante 1 minuto o hasta que reciba cualquier daño.
      </p>
      <p>
        Una criatura expulsada debe emplear sus turnos intentando moverse tan
        lejos de ti como sea capaz, y no puede acercarse voluntariamente a una
        distancia de 30 pies (9 metros) de ti. Tampoco puede realizar
        reacciones. Como acción, solo puede usar la acción de Carrera o intentar
        escapar de un efecto que le impida moverse. Si no hay ningún lugar para
        moverse, la criatura puede usar la acción de Esquivar.
      </p>
    </>
  ),

  knowledgeOfTheAges: (skill, pc) => (
    <p>
      Comenzando en el nivel 2 puedes usar tu Canalizar Divinidad para hurgar en
      un pozo divino de conocimiento. Como una acción, eliges una habilidad o
      herramienta. Durante 10 minutos tienes competencia con la habilidad o
      herramienta elegida.
    </p>
  ),

  guidedStrike: (skill, pc) => (
    <p>
      Comenzando en el nivel 2 puedes usar tu Canalizar Divinidad para golpear
      con precisión sobrenatural. Cuando realices una tirada de ataque, puedes
      usar tu Canalizar Divinidad para ganar un bonificador de +10 a la tirada.
      Haces esta elección después de ver la tirada, pero antes de que el DM diga
      si el ataque acierta o falla.
    </p>
  ),

  radianceOfTheDawn: (skill, pc) => (
    <>
      <p>
        A partir del nivel 2 puedes usar tu Canalizar Divinidad para aprovechar
        la luz solar y hacer desaparecer la oscuridad así como hacer daño
        radiante a tus enemigos.
      </p>
      <p>
        Como acción puedes levantar tu símbolo sagrado para que cualquier
        oscuridad mágica a 30 pies (9 metros) de ti sea disipada.
        Adicionalmente, cada criatura hostil a 30 pies (9 metros) de ti debe
        realizar una tirada de salvación de Constitución. Una criatura sufrirá
        daño radiante igual a 2d10 + {pc.level} (tu nivel de clérigo) si falla
        el tiro de salvación, y la mitad si lo supera. Una criatura con
        cobertura total hacia ti no es afectada.
      </p>
    </>
  ),

  charmAnimalsAndPlants: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2, puedes usar tu Canalizar Divinidad para
        encantar animales o plantas.
      </p>
      <p>
        Como una acción, muestras tu símbolo sagrado e invocas el nombre de tu
        deidad. Cada criatura del tipo bestia o planta que te vea en un rango de
        30 pies (9 metros), debe hacer una salvación de Sabiduría. Si falla su
        salvación, es encantada durante un minuto o hasta que reciba daño.
        Mientras esté encantada será amistosa a ti y otras criaturas que
        designes.
      </p>
    </>
  ),

  destructiveWrath: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 puedes usar tu Canalizar Divinidad para blandir
        el poder de la tormenta con una increíble ferocidad.
      </p>
      <p>
        Cuando hagas daño sónico o eléctrico, puedes usar tu Canalizar Divinidad
        para hacer el daño máximo, en lugar de tirar los dados.
      </p>
    </>
  ),

  invokeDuplicity: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2, puedes usar tu Canalizar Divinidad para crear
        un duplicado ilusorio de ti mismo.
      </p>
      <p>
        Como una acción, creas una ilusión perfecta que dura 1 minuto o hasta
        que pierdas tu concentración (como si estuvieses concentrándote en un
        conjuro). La ilusión aparece en un espacio desocupado en un rango de 30
        pies (9 metros) de ti. Como una acción adicional en tu turno, puedes
        mover la ilusión hasta 30 pies (9 metros) a un espacio que puedas ver,
        pero debe permanecer en un rango no mayor de 120 pies (36 metros) de ti.
      </p>
      <p>
        Mientras dure, puedes lanzar conjuros como si estuvieses en el espacio
        de la ilusión, pero debes usar tus propios sentidos. Adicionalmente,
        cuando tanto tú y tu ilusión estéis en un rango de 5 pies de una
        criatura que pueda ver la ilusión, tienes ventaja en las tiradas de
        ataque, teniendo en cuenta la distracción que causa la ilusión en el
        objetivo.
      </p>
    </>
  ),

  preserveLife: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 2 puedes usar tu Canalizar Divinidad para curar a
        los malheridos.
      </p>
      <p>
        Como acción, presentas tu símbolo sagrado y evocas energía curativa que
        puede restaurar {pc.level * 5} Puntos de Golpe (cinco veces tu nivel de
        clérigo). Elige cualquier número de criaturas en un rango de 30 pies (9
        metros) de ti, y reparte estos Puntos de Golpe entre ellas. Este rasgo
        no puede recuperar más de la mitad de los Puntos de Golpe máximos de una
        criatura. No puedes usar este rasgo en un muerto viviente o en un
        constructo.
      </p>
    </>
  ),
};
