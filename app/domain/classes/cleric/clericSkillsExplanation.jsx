import { getSpellSavingThrow } from '~/domain/spells/spells';
import { getStat, getStatMod, translateSkill } from '../../characters';
import { increment } from '~/domain/display';

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
      {pc.level >= 6 && (
        <p>
          A partir del nivel 6 también puedes usar tu Fulgor Protector cuando
          una criatura en un rango de 30 pies (9 metros) de ti ataque a otra
          criatura.
        </p>
      )}
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
      {pc.level < 5 && (
        <p>
          Una criatura expulsada debe emplear sus turnos intentando moverse tan
          lejos de ti como sea capaz, y no puede acercarse voluntariamente a una
          distancia de 30 pies (9 metros) de ti. Tampoco puede realizar
          reacciones. Como acción, solo puede usar la acción de Carrera o
          intentar escapar de un efecto que le impida moverse. Si no hay ningún
          lugar para moverse, la criatura puede usar la acción de Esquivar.
        </p>
      )}
      {pc.level >= 5 && (
        <p>
          A partir del nivel 5, cuando un muerto viviente falle su tirada de
          salvación contra tu Expulsar Muertos Vivientes, la criatura es
          destruida instantáneamente si su valor de desafío es{' '}
          {pc.level >= 17
            ? '4'
            : pc.level >= 14
            ? '3'
            : pc.level >= 11
            ? '2'
            : pc.level >= 8
            ? '1'
            : '1/2'}{' '}
          o menor.
        </p>
      )}
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

  readThoughts: (skill, pc) => (
    <>
      <p>
        A partir del nivel 6 puedes usar tu Canalizar Divinidad para leer los
        pensamientos de una criatura. Luego puedes usar tu acceso a la mente de
        la criatura para comandarla.
      </p>
      <p>
        Como una acción, elige una criatura que puedas ver en un rango de 60
        pies (18 metros) de ti. Esa criatura debe realizar una tirada de
        salvación de Sabiduría. Si la criatura tiene éxito en su salvación, no
        puedes usar este rasgo en ella nuevamente hasta que finalices un
        descanso prolongado.
      </p>
      <p>
        Si la criatura falla su salvación, puedes leer sus pensamientos
        superficiales (lo que tenga en mente, reflejando sus emociones actuales
        y lo que está pensando activamente) cuando está en un rango de 60 pies
        (18 metros) de ti. Este efecto dura un minuto.
      </p>
      <p>
        Durante ese tiempo, puedes usar tu acción para terminar este efecto y
        lanzar el hechizo sugestión sobre la criatura sin gastar un espacio de
        conjuro. La criatura falla automáticamente su tirada de salvación contra
        el conjuro.
      </p>
    </>
  ),

  warGodsBlessing: (skill, pc) => (
    <p>
      A partir del nivel 6 cuando una criatura en un rango de 30 pies (9 metros)
      de ti hace una tirada de ataque, puedes usar tu reacción para darle a esa
      criatura un bonificador de +10 a la tirada, usando tu Canalizar Divinidad.
      Haces esta elección después de ver la tirada, pero antes de que el DM diga
      si el ataque golpea o falla.
    </p>
  ),

  dampenElements: (skill, pc) => (
    <p>
      Comenzando en el nivel 6 cuando tú o una criatura en un rango de 30 pies
      (9 metros) de ti reciba daño de ácido, frío, fuego, electricidad o sónico,
      puedes usar tu reacción para darle a esa criatura resistencia contra ese
      tipo de daño.
    </p>
  ),

  thunderousStrike: (skill, pc) => (
    <p>
      A partir del nivel 6 cuando hagas daño eléctrico a una criatura Grande o
      más pequeña, también puedes empujarla a 10 pies (3 metros) de ti.
    </p>
  ),

  cloakOfShadows: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6 puedes usar tu Canalizar Divinidad para
        desaparecer.
      </p>
      <p>
        Como una acción, te vuelves invisible hasta el final de tu siguiente
        turno. Te vuelves visible si atacas o lanzas un conjuro.
      </p>
    </>
  ),

  blessedHealer: (skill, pc) => (
    <p>
      Empezando en el nivel 6 los conjuros de sanación que lanzas en otros te
      sanan a ti también. Cuando lanzas un conjuro de nivel 1 o superior que
      recupera Puntos de Golpe a una criatura que no seas tú, recuperas también
      Puntos de Golpe igual a 2 + el nivel del conjuro.
    </p>
  ),

  potentSpellcasting: (skill, pc) => (
    <p>
      A partir del nivel 8 agregas tu modificador de Sabiduría (
      {increment(getStatMod(getStat(pc, 'wis')))}) al daño que haces con
      cualquier truco de clérigo.
    </p>
  ),

  divineStrike: (skill, pc) => (
    <p>
      A partir del nivel 8 ganas la habilidad de infundir de energía divina tus
      golpes con arma. Una vez por turno, cuando golpees a una criatura con un
      ataque con arma, puedes hacer que el ataque cause 1d8 adicional de daño de
      frío, fuego o eléctrico (a tu elección) al objetivo. Cuando alcanzas el
      nivel 14, el daño adicional se incrementa a 2d8.
    </p>
  ),

  divineIntervention: (skill, pc) => (
    <>
      <p>
        Empezando a nivel 10, puedes invocar a tu deidad para que intervenga a
        tu favor cuando tu necesidad sea acuciante.
      </p>
      <p>
        Implorar la ayuda de tu deidad requiere que uses tu acción. Describe la
        asistencia que buscas y tira un dado porcentual. Si tu tirada es igual o
        menor que {pc.level} (tu nivel de clérigo), tu deidad interviene. El DM
        elige la naturaleza de la intervención; el efecto de cualquier conjuro
        de clérigo o conjuro de dominio de clérigo sería apropiado.
      </p>
      <p>
        Si tu deidad interviene, no puedes usar otra vez este rasgo durante 7
        días. De no ser así, puedes usarlo otra vez tras finalizar un descanso
        prolongado.
      </p>
      <p>
        A nivel 20, tu llamada para la intervención tiene éxito automáticamente,
        no es necesaria ninguna tirada.
      </p>
    </>
  ),
};
