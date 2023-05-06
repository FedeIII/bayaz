import { Link } from '@remix-run/react';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { getArcaneTradition, getImprovedMinorIllusionSpell } from './wizard';
import { getSpellSavingThrow, translateSpell } from '~/domain/spells/spells';
import { increment } from '~/domain/display';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';

import styles from '~/components/modal/inventoryItem.module.css';

export const WIZARD_SKILLS_EXPLANATION = {
  arcaneRecovery: (skill, pc) => (
    <p>
      Has aprendido a recuperar parte de tus energías mágicas gracias al estudio
      de tu libro de conjuros. Una vez por día, cuando finalizas un descanso
      corto, puedes elegir qué espacios de conjuros quieres recuperar. Los
      espacios de conjuros pueden tener un{' '}
      <u>nivel combinado igual a {Math.ceil(pc.level / 2)}</u> (la mitad de tu
      nivel de mago, redondeando hacia arriba), aunque <u>ninguno</u> de los
      espacios de conjuros puede ser <u>de nivel 6 o superior</u>. Por ejemplo,
      si eres un mago de nivel 4, puedes recuperar hasta dos niveles en espacios
      de conjuros. Puedes recuperar tanto dos espacios de conjuros de nivel 1 o
      un espacio de conjuros de nivel 2.
    </p>
  ),

  arcaneTradition: (skill, pc) => (
    <>
      <p>
        Cuando alcanzas el nivel 2 eliges una tradición arcana, que determina tu
        práctica de la magia a través de una de las ocho escuelas mágicas
        existentes: Abjuración, Adivinación, Conjuración, Encantamiento,
        Evocación, Ilusión, Nigromancia o Transmutación. Tu elección te
        proporciona rasgos de la escuela elegida en el nivel 2, y otra vez en
        los niveles 6, 10 y 14
      </p>
      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/wizard/arcaneTradition`}
          className={styles.modalButton}
        >
          Escoge Escuela
        </Link>
      </div>
    </>
  ),

  schoolSavant: (skill, pc) => (
    <p>
      A partir del momento en el que eliges esta escuela en el nivel 2, el oro y
      el tiempo que debes invertir para copiar un conjuro de{' '}
      {translateSchool(getArcaneTradition(pc))} en tu libro de conjuros se
      divide a la mitad
    </p>
  ),

  arcaneWard: (skill, pc) => (
    <>
      <p>
        A partir del nivel 2 puedes entretejer la magia a tu alrededor para
        protegerte. Cuando lanzas un conjuro de abjuración de nivel 1 o
        superior, puedes usar simultáneamente una parte de la magia del conjuro
        para crear un guardián arcano sobre ti mismo, que dura hasta que
        termines un descanso prolongado. El guardián tiene Puntos de Golpe
        equivalentes al doble de tu nivel de mago + tu modificador de
        Inteligencia. Siempre que recibas daño, el guardián lo recibe en tu
        lugar. Si el daño reduce al guardián a 0 Puntos de Golpe, recibes el
        daño restante.
      </p>
      <p>
        Mientras el guardián tenga 0 Puntos de Golpe, no puede absorber daño,
        pero su magia permanece. Siempre que lances un conjuro de abjuración de
        nivel 1 o superior, el guardián recobra Puntos de Golpe equivalentes al
        doble de nivel del conjuro.
      </p>
      <p>
        Una vez que creas al guardián, no puedes crearlo de nuevo hasta que
        termines un descanso prolongado.
      </p>
    </>
  ),

  portent: (skill, pc) => (
    <>
      <p>
        A partir del momento en que elijas esta escuela en el nivel 2, puedes
        usar tu acción para conjurar un objeto inanimado en tu mano o en el
        suelo, en un espacio desocupado que puedas ver en un rango de 10 pies (3
        metros). Este objeto no puede medir más de 3 pies (1 metro) en ninguna
        de sus dimensiones ni pesar más de 10 libras (4,5 kilos), y su forma
        debe ser la de un objeto no mágico que hayas visto. El objeto es
        visiblemente mágico, e irradia una luz tenue a 5 pies (1,5 metros).
      </p>
      <p>
        El objeto desaparece después de una hora, cuando uses este rasgo
        nuevamente o si recibe algún daño.
      </p>
    </>
  ),

  minorConjuration: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 cuando seleccionas esta escuela, visiones del
        futuro comienzan a introducirse en tu consciencia. Cuando finalizas un
        descanso prolongado, tira dos d20 y anota los resultados. Puedes
        reemplazar cualquier tirada de ataque, salvación o habilidad hecha por
        ti o una criatura que puedas ver por una de estas tiradas adivinatorias.
        Debes declararlo antes de la tirada y puedes reemplazar una tirada de
        esta manera únicamente una vez por turno.
      </p>
      <p>
        Cada tirada adivinatoria puede usarse solamente una vez. Cuando terminas
        un descanso prolongado, pierdes cualquier tirada adivinatoria que no
        hayas usado.
      </p>
    </>
  ),

  hypnoticGaze: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 cuando eliges esta escuela, tus suaves palabras
        y mirada encantadora pueden cautivar mágicamente a otra criatura. Usando
        una acción, elige una criatura que puedas ver y que no esté a más de 5
        pies de ti. Si el objetivo puede verte u oírte, debe tener éxito en una
        salvación de Sabiduría de {getSpellSavingThrow(pc)} (la CD de salvación
        de tus conjuros de mago) o ser encantado por ti hasta el siguiente
        turno. La velocidad de la criatura encantada se reduce a 0 y la criatura
        está incapacitada y visiblemente mareada.
      </p>
      <p>
        En turnos subsiguientes, puedes usar tus acciones para mantener este
        efecto hasta el final de tu siguiente turno. Aun así, el efecto finaliza
        si te mueves a más de 5 pies (1,5 metros) de distancia de la criatura,
        si la criatura no puede verte ni oírte o si la criatura recibe daño.
      </p>
      <p>
        Una vez que el efecto termina, o si la criatura tiene éxito en su tirada
        de salvación inicial, no puedes usar este efecto nuevamente en esa
        criatura hasta que finalices un descanso prolongado.
      </p>
    </>
  ),

  sculptSpells: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2, puedes crear burbujas de relativa seguridad
        dentro de los efectos de tus conjuros de evocación. Cuando lanzas un
        conjuro de evocación que afecta a otras criaturas que puedas ver, puedes
        elegir un número objetivos igual a 1 + nivel del conjuro. Las criaturas
        elegidas tienen éxito automáticamente en sus tiradas de salvación contra
        el conjuro, y no sufren daño si normalmente reducirían a la mitad el
        daño con una salvación exitosa.
      </p>
    </>
  ),

  improvedMinorIllusion: (skill, pc) => (
    <>
      <p>
        Cuando escoges esta escuela en nivel 2, aprendes el truco ilusión menor.
        Si ya conocías este truco, aprendes otro truco de mago de tu elección.
        El truco no cuenta para tu límite de trucos conocidos. Cuando lanzas
        ilusión menor generas tanto sonido como imagen en un único lanzamiento
      </p>
      {!getImprovedMinorIllusionSpell(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/wizard/improvedMinorIllusion`}
            className={styles.modalButton}
          >
            Escoge Truco de Ilusión
          </Link>
        </div>
      )}
      {getImprovedMinorIllusionSpell(pc) && (
        <strong>
          {translateSpell(getImprovedMinorIllusionSpell(pc).name)}
        </strong>
      )}
    </>
  ),

  grimHarvest: (skill, pc) => (
    <p>
      En el nivel 2 ganas la habilidad de recoger la energía vital de las
      criaturas que matas con tus conjuros. Una vez por turno, cuando matas a
      una o más criaturas con un conjuro de nivel 1 o superior, recuperas un
      número de Puntos de Golpe equivalentes al doble de nivel del conjuro, o el
      triple de su nivel si pertenece a la Escuela de Nigromancia. No ganas este
      beneficio al destruir constructos o muertos vivientes.
    </p>
  ),

  minorAlchemy: (skill, pc) => (
    <p>
      Comenzando en el nivel 2 cuando seleccionas esta escuela, puedes alterar
      temporalmente las propiedades físicas de un objeto no mágico, cambiándolo
      de una sustancia a otra. Practicas un procedimiento alquímico especial con
      un objeto compuesto enteramente de madera, piedra (pero no una gema),
      hierro, cobre o plata, transformándolo en otro de esos materiales. Por
      cada 10 minutos que pases realizando el procedimiento, puedes transformar
      un pie cúbico (30 cm3) de material. Después de una hora, o cuando pierdas
      la concentración (como si te estuvieses concentrando en un conjuro), el
      material vuelve a su sustancia original.
    </p>
  ),

  projectedWard: (skill, pc) => (
    <p>
      A partir del nivel 6, cuando una criatura que puedas ver y que esté hasta
      a 30 pies (9 metros) de distancia de ti reciba daño, puedes usar tu
      reacción para que tu Guardián Arcano absorba el daño. Si este daño reduce
      al guardián a 0 Puntos de Golpe, la criatura protegida recibe el daño
      restante.
    </p>
  ),

  expertDivination: (skill, pc) => (
    <p>
      Comenzando en el nivel 6, lanzar conjuros de adivinación es tan sencillo
      para ti que usas solamente una fracción del esfuerzo habitual. Cuando
      lanzas un conjuro de adivinación de nivel 2 o superior usando un espacio
      de conjuro, recuperas un espacio de conjuro que hayas gastado. El espacio
      que recuperes debe ser de un nivel inferior al del conjuro que lanzaste y
      no puede ser superior al nivel 5
    </p>
  ),

  benignTransportation: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6, puedes usar tu acción para teletransportarte
        hasta 30 pies (10 metros) hacia un espacio desocupado que puedas ver.
        Alternativamente, puedes elegir un espacio a tu alcance que esté ocupado
        por una criatura Mediana o Pequeña. Si la criatura es voluntaria, los
        dos se teletransportan, intercambiando posiciones.
      </p>
      <p>
        Una vez que uses este rasgo, no puedes utilizarlo nuevamente hasta que
        finalices un descanso prolongado o lances un conjuro de conjuración de
        nivel 1 o superior.
      </p>
    </>
  ),

  instinctiveCharm: (skill, pc) => (
    <>
      <p>
        A partir del nivel 6, cuando una criatura que puedas ver en un rango de
        30 pies (9 metros) de ti haga una tirada de ataque contra ti, puedes
        usar tu reacción para desviar el ataque, siempre que otra criatura esté
        dentro del rango del ataque. El atacante debe realizar una salvación de
        Sabiduría de {getSpellSavingThrow(pc)} (la CD de salvación de tus
        conjuros de mago). Si se falla la tirada de salvación, el atacante debe
        redirigir su ataque contra la criatura más cercana a él, sin contarte a
        ti ni a él mismo. Si hay más de una criatura igual de cerca, el atacante
        elige a quien redirigir su ataque.
      </p>
      <p>
        Si se supera la tirada salvación, no puedes usar este rasgo en el
        atacante nuevamente hasta que finalices un descanso prolongado.
      </p>
      <p>
        Debes elegir si usar este rasgo antes de saber si el ataque tiene o no
        éxito. Las criaturas que no puedan ser encantadas son inmunes a este
        efecto.
      </p>
    </>
  ),

  potentCantrip: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6, tus trucos que infligen daño afectan incluso a
        las criaturas que evitan la peor parte del mismo. Cuando una criatura
        tiene éxito en una tirada de salvación contra uno de tus trucos, la
        criatura sufre la mitad del daño del truco (si lo hay), pero sin sufrir
        los efectos adicionales que este pueda tener.
      </p>
    </>
  ),

  malleableIllusions: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6, cuando lanzas un conjuro de ilusión que tiene
        una duración de un minuto o superior, puedes usar tu acción para cambiar
        la naturaleza de esa ilusión (usando los parámetros normales del
        conjuro), siempre que puedas ver la ilusión.
      </p>
    </>
  ),

  undeadThralls: (skill, pc) => (
    <>
      <p>
        En el nivel 6, añades el conjuro "Reanimar a los muertos" a tu libro de
        conjuros si aún no lo tenías. Cuando lanzas "Reanimar a los muertos",
        puedes designar un cuerpo o una pila de huesos adicional, creando otro
        zombi o esqueleto, según corresponda.
      </p>
      <p>
        Siempre que crees un no-muerto usando un conjuro de nigromancia, tiene
        estos beneficios adicionales:
      </p>
      <ul>
        <li>
          Los <u>Puntos de Golpe</u> de la criatura se incrementan en{' '}
          <u>{increment(pc.level)}</u> (igual a tu nivel de mago).
        </li>
        <li>
          La criatura tiene <u>{increment(getProficiencyBonus(pc.level))}</u> a
          sus tiradas de <u>daño con armas</u> (tu bonificador de competencia).
        </li>
      </ul>
    </>
  ),

  transmutersStone: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6, puedes pasar 8 horas creando una piedra del
        Transmutador que almacena magia de transmutación. Puedes beneficiarte de
        la piedra tú mismo o dársela a otra criatura. Una criatura gana un
        beneficio a tu elección mientras esté en posesión de la piedra. Cuando
        creas la piedra, elige uno de estos beneficios:
      </p>
      <ul>
        <li>
          <u>Visión en la Oscuridad</u> en un rango de 60 pies (18 metros), como
          se describe en el Capítulo 8.
        </li>
        <li>
          Un incremento de <u>10 pies (3m) en la velocidad</u> mientras la
          criatura no esté sobrecargada.
        </li>
        <li>
          Competencia en las tiradas de <u>salvación de Constitución</u>.
        </li>
        <li>
          <u>Resistencia al daño</u> de ácido, frío, fuego, eléctrico o sónico
          (eliges uno en el momento de crear la piedra).
        </li>
      </ul>
      <p>
        Cada vez que lanzas un conjuro de transmutación de nivel 1 o superior,
        puedes cambiar el efecto de tu piedra si está en tu poder.
      </p>
      <p>
        Si creas una nueva Piedra del Transmutador, la anterior deja de
        funcionar.
      </p>
    </>
  ),

  improvedAbjuration: (skill, px) => (
    <>
      <p>
        Comenzando en el nivel 10, cuando lanzas un conjuro de abjuración que
        requiera que hagas una prueba de habilidad como parte del lanzamiento de
        ese conjuro (como contraconjuro o disipar magia), agregas{' '}
        <u>{increment(getProficiencyBonus(pc.level))}</u> (tu bonificador de
        competencia) a esa prueba de habilidad.
      </p>
    </>
  ),

  theThirdEye: (skill, px) => (
    <>
      <p>
        A partir del nivel 10 puedes usar tu acción para incrementar tus poderes
        perceptivos. Cuando lo haces, elige uno de los siguientes beneficios,
        que dura hasta que estés incapacitado o comiences un descanso corto o
        prolongado. No puedes usar este rasgo nuevamente hasta que termines un
        descanso.
      </p>
      <u>
        <li>
          <strong>
            <u>Visión en la Oscuridad.</u>
          </strong>{' '}
          Ganas visión en la oscuridad en un rango de 60 pies (18 metros), tal
          como se describe en el Capítulo 8.
        </li>
        <li>
          <strong>
            <u>Vista Etérea.</u>
          </strong>{' '}
          Puedes ver en el Plano Etéreo en un rango de 60 pies (18 metros) en
          torno a ti.
        </li>
        <li>
          <strong>
            <u>Comprensión Mayor.</u>
          </strong>{' '}
          Puedes leer cualquier lenguaje.
        </li>
        <li>
          <strong>
            <u>Ver Invisibilidad.</u>
          </strong>{' '}
          Puedes ver objetos y criaturas invisibles en un rango de 10 pies (3
          metros) que estén en tu línea de visión.
        </li>
      </u>
    </>
  ),

  focusedConjuration: (skill, pc) => (
    <>
      <p>
        A partir del nivel 10, mientras estés concentrándote en un conjuro de
        conjuración, tu concentración no puede ser rota como resultado de
        recibir daño.
      </p>
    </>
  ),

  splitEnchantment: (skill, pc) => (
    <>
      <p>
        A partir del nivel 10, cuando lanzas un conjuro de encantamiento de
        nivel 1 o superior que tenga como objetivo solo una creatura, puedes
        hacer que también afecte a una segunda creatura.
      </p>
    </>
  ),

  empoweredEvocation: (skill, pc) => (
    <>
      <p>
        A partir del nivel 10, puedes añadir{' '}
        <u>{increment(getStatMod(getStat(pc, 'int')))}</u> (tu bonificador de
        Inteligencia) a las <u>tiradas de daño</u> de cualquier conjuro de
        evocación que lances.
      </p>
    </>
  ),

  illusorySelf: (skill, pc) => (
    <>
      <p>
        A partir del nivel 10, puedes crear una copia ilusoria de ti mismo como
        una reacción instantánea, casi instintiva, frente al peligro. Cuando una
        criatura realiza una tirada de ataque contra ti, puedes usar tu reacción
        para interponer el duplicado ilusorio entre el atacante y tú. El ataque
        falla automáticamente y la ilusión se disipa.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo nuevamente hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  inuredToUndeath: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 10 tienes <u>resistencia al daño necrótico</u> y
        tu máximo de Puntos de Golpe no puede ser reducido. Has pasado tanto
        tiempo tratando con los muertos vivientes y las fuerzas que los animan
        que te has acostumbrado a algunos de sus peores efectos.
      </p>
    </>
  ),

  shapechanger: (skill, pc) => (
    <>
      <p>
        En el nivel 10, agregas el conjuro polimorfar a tu libro de conjuros si
        aún no lo tenías. Puedes lanzar polimorfar sin gastar un espacio de
        conjuro. Cuando lo haces, sólo puedes lanzarlo sobre ti mismo y
        transformarte en una bestia cuyo valor de desafío sea 1 o inferior.
      </p>
      <p>
        Una vez que lanzas polimorfar de esta manera, no puedes hacerlo
        nuevamente hasta que finalices un descanso corto o prolongado, aunque
        puedes lanzarlo normalmente usando un espacio de conjuro.
      </p>
    </>
  ),
};

export const SCHOOL_EXPLANATION = {
  Conjuration: (
    <>
      <p>
        Como un conjurador, prefieres usar conjuros que forman objetos y
        criaturas a partir del aire mismo. Puedes conjurar nubes de niebla
        asesina o invocar criaturas de algún otro lado para que luchen por ti. A
        medida que crece tu dominio, aprendes conjuros de transportación y
        puedes teletransportarte a través de vastas distancias, incluso a otros
        planos de existencia, en un instante.
      </p>
    </>
  ),
  Abjuration: (
    <>
      <p>
        La Escuela de Abjuración hace énfasis en la magia que bloquea, erradica
        o protege. Los detractores de esta escuela dicen que su tradición está
        basada en la negación, en lugar de la aserción positiva. Comprendes, aun
        así, que terminar con efectos dañinos, proteger a los débiles y
        erradicar el mal es algo más que un vacío filosófico. Es una respetada
        profesión de la cual estar orgulloso.
      </p>
      <p>
        Conocidos como abjuradores, los miembros de esta escuela son reclamados
        cuando espíritus siniestros requieren exorcismos, cuando lugares
        importantes deben ser resguardados contra el espionaje mágico o cuando
        portales hacia otros planos de existencia deben ser cerrados.
      </p>
    </>
  ),
  Transmutation: (
    <>
      <p>
        Eres un estudioso de los conjuros que modifican la energía y la materia.
        Para ti, el mundo no es algo fijo, sino sumamente mutable, y te deleitas
        en la idea de ser un agente del cambio.
      </p>
      <p>
        Blandes la materia pura de la creación y aprendes a alterar tanto las
        formas físicas como las cualidades mentales. Tu magia te brinda las
        herramientas para convertirte un herrero en la forja de la realidad.
      </p>
      <p>
        Algunos transmutadores son bromistas y curiosos, que convierten a la
        gente en sapos y transforman el cobre en plata por diversión y
        beneficios ocasionales. Otros prosiguen sus estudios mágicos con extrema
        seriedad, buscando el poder de los dioses para crear y destruir mundos.
      </p>
    </>
  ),
  Enchantment: (
    <>
      <p>
        Como miembro de la Escuela de Encantamiento, has pulido tu habilidad
        para controlar y manipular a otras personas y monstruos. Algunos
        encantadores son pacifistas que embrujan a los violentos para que bajen
        sus armas y hechizan a los crueles para que muestren piedad. Otros son
        tiranos que atan mágicamente a los que son reacios a servirles. La
        mayoría de los encantadores son un punto medio entre estas dos opciones.
      </p>
    </>
  ),
  Necromancy: (
    <>
      <p>
        La escuela de Nigromancia explora las fuerzas cósmicas de la vida, la
        muerte y la no-muerte. Cuando concentras tus estudios en esta tradición,
        aprendes a manipular la energía que anima a todos los seres vivientes. A
        medida que progresas, aprendes a extraer la fuerza vital de una criatura
        mientras tu magia destruye su cuerpo, transformando esa energía vital en
        poder mágico que puedes manipular.
      </p>
      <p>
        La mayoría de la gente ve a los nigromantes como amenazas, o incluso
        villanos, debido a su cercanía con la muerte. No todos los nigromantes
        son malvados, pero las fuerzas que manipulan son consideradas un tabú
        por muchas sociedades.
      </p>
    </>
  ),
  Divination: (
    <>
      <p>
        El consejo de un adivinador es buscado tanto por la realeza como por la
        gente común, ya que todos buscan una comprensión más clara del pasado,
        presente y futuro. Como adivinador, te afanas en abrir los velos del
        tiempo, del espacio y de la consciencia para ver más claramente.
        Trabajas para dominar conjuros de discernimiento, vista remota,
        conocimiento sobrenatural y premonición.
      </p>
    </>
  ),
  Evocation: (
    <>
      <p>
        Concentras tus estudios en la magia que crea poderosos efectos
        elementales como un frío glacial, llamas abrasadoras, resonantes
        truenos, crepitantes rayos y corrosivo ácido. Algunos evocadores
        encuentran empleo en las fuerzas militares, sirviendo como artillería
        para hacer estallar ejércitos enemigos desde la lejanía. Algunos usan
        sus espectaculares poderes para proteger a los débiles, mientras otros
        solo buscan su beneficio como bandidos, aventureros o aspirantes a
        tiranos.
      </p>
    </>
  ),
  Illusion: (
    <>
      <p>
        Enfocas tus estudios en la magia que confunde los sentidos, la mente y
        engañan hasta al más sabio. Tu magia es sutil, pero las ilusiones
        creadas por tu ágil mente hacen que lo imposible parezca real. Algunos
        ilusionistas (incluyendo muchos magos gnomos) son bribones benignos que
        usan sus conjuros para entretener. Otros son más siniestros, maestros
        del engaño, que usan sus ilusiones para asustar y engañar a otros para
        su beneficio personal.
      </p>
    </>
  ),
};
