import { Link } from '@remix-run/react';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import {
  ELEMENTAL_DISCIPLINES,
  getElementalDisciplines,
  getExtraUnarmoredMovement,
  getKiPoints,
  getMaxKiPerSpell,
  hasToLearnElementalDiscipline,
  translateElementalDisciplines,
} from './monk';

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

  monasticTradition: (skill, pc) => (
    <>
      <p>
        Al alcanzar el nivel 3 te comprometes con una tradición monástica: el
        Camino de la Mano Abierta, el Camino de la Sombra o el Camino de los
        Cuatro Elementos, todos detallados al final de la descripción de clase.
        Tu tradición te otorga rasgos en los niveles 3, 6, 11 y 17.
      </p>
      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/monk/monasticTradition`}
          className={styles.modalButton}
        >
          Escoge Tradición
        </Link>
      </div>
    </>
  ),

  openHandTechnique: (skill, pc) => (
    <>
      <p>
        Comenzando cuando eliges esta tradición en el nivel 3 puedes manipular
        el ki del oponente al mismo tiempo que utilizas el tuyo. Cuando golpeas
        a una criatura con uno de los ataques otorgados por tu ráfaga de golpes,
        puedes aplicar alguno de los siguientes efectos en el objetivo:
      </p>
      <ul>
        <li>
          Debe tener éxito en una <u>tirada de salvación de Destreza</u> o ser{' '}
          <u>tumbado</u>.
        </li>
        <li>
          Debe hacer una <u>tirada de salvación de Fuerza</u>. Si falla, puedes{' '}
          <u>empujarlo hasta 15 pies (5 metros)</u> lejos de ti.
        </li>
        <li>
          <u>No puede hacer reacciones</u> hasta el final de tu siguiente turno.
        </li>
      </ul>
    </>
  ),

  shadowArts: (skill, pc) => (
    <p>
      Cuando eliges esta tradición en el nivel 3 puedes usar tu ki para duplicar
      el efecto de ciertos conjuros. Como una acción, puedes gastar{' '}
      <u>2 puntos ki</u>
      para lanzar <u>oscuridad</u>, <u>visión en la oscuridad</u>,{' '}
      <u>pasar sin dejar rastro</u>, o<u>silencio</u> sin requerir componentes
      materiales. Además, obtienes el truco
      <u>ilusión menor</u> si es que no lo conoces de antemano.
    </p>
  ),

  discipleOftheElements: (skill, pc) => (
    <>
      <p>
        Cuando eliges esta tradición en el nivel 3 aprendes disciplinas mágicas
        que emplean el poder de los cuatro elementos. Una disciplina requiere
        que gastes puntos ki cada vez que la usas.
      </p>
      <p>
        Conoces la disciplina de Sintonía Elemental y otra disciplina elemental
        de tu elección, que se detallan en la sección Disciplinas Elementales
        más abajo. Aprendes una disciplina elemental adicional de tu elección a
        los niveles 6, 11 y 17
      </p>
      <p>
        Cuando aprendas una nueva disciplina elemental, puedes reemplazar una
        disciplina elemental que ya conozcas por otra.
      </p>
      <p>
        <strong>Puntos Ki Máximos por Conjuro:</strong> {getMaxKiPerSpell(pc)}
      </p>
      {hasToLearnElementalDiscipline(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/monk/elementalDisciplines`}
            className={styles.modalButton}
          >
            Escoge Disciplinas Elementales
          </Link>
        </div>
      )}
      <ul>
        {getElementalDisciplines(pc).map(discipline => (
          <li key={discipline}>
            <strong>
              <u>{translateElementalDisciplines(discipline)}.</u>
            </strong>{' '}
            {displayElementalDiscipline(discipline, skill, pc)}
          </li>
        ))}
      </ul>
    </>
  ),

  deflectMissiles: (skill, pc) => (
    <>
      <p>
        A partir del nivel 3, puedes usar tu reacción para desviar o atrapar
        proyectiles en el momento en que eres golpeado por un ataque a
        distancia. Cuando lo haces, reduces el daño que recibes de dicho ataque
        en{' '}
        <u>
          <strong>{10 + getStatMod(getStat(pc, 'dex')) + pc.level}</strong>
        </u>
        : 10 + tu modificador de Destreza ({getStatMod(getStat(pc, 'dex'))}) +
        tu nivel de monje ({pc.level}).
      </p>
      <p>
        Si el daño es reducido a 0 puedes atrapar el proyectil, si éste es lo
        suficientemente pequeño para que lo sujetes con una mano y tienes, por
        lo menos, una mano libre. Si atrapas el proyectil de esta manera puedes
        gastar un punto ki para hacer un ataque a distancia con el arma o
        munición que acabas de atrapar, como parte de la misma reacción. Haces
        el ataque con competencia, sin importar tus competencias con armas, y el
        proyectil cuenta como un arma de monje para este ataque.
      </p>
    </>
  ),

  slowFall: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 4 puedes usar tu reacción mientras caes para
        reducir el daño por caída en una cantidad igual a{' '}
        <u>
          <strong>{pc.level * 5}</strong>
        </u>{' '}
        tu nivel de monje por cinco.
      </p>
    </>
  ),

  extraAttack: (skill, pc) => (
    <p>
      Empezando en el nivel 5, puedes atacar dos veces, en lugar de una, siempre
      que uses la acción de Atacar en tu turno.
    </p>
  ),

  stunningStrike: (skill, pc) => (
    <p>
      Comenzando al nivel 5 puedes interferir con el flujo de ki en el cuerpo de
      un oponente. Cuando golpeas una criatura con un ataque con arma cuerpo a
      cuerpo, puedes gastar <u>un punto ki</u> para intentar un golpe aturdidor.
      El objetivo debe tener éxito en una{' '}
      <u>tirada de salvación de Constitución</u> o quedar <u>aturdido</u> hasta
      el final de su siguiente turno.
    </p>
  ),

  kiEmpoweredStrikes: (skill, pc) => (
    <p>
      A partir del nivel 6 tus ataques sin armas cuentan como mágicos para el
      propósito de sobrepasar la resistencia e inmunidad a los ataques y daño
      no-mágicos.
    </p>
  ),

  wholenessOfBody: (skill, pc) => (
    <p>
      Al nivel 6 obtienes la capacidad para curarte a ti mismo. Como una acción,
      puedes recuperar {pc.level * 3} HP (tres veces tu nivel de monje). Debes
      terminar un descanso prolongado antes de poder usar este rasgo de nuevo.
    </p>
  ),

  shadowStep: (skill, pc) => (
    <p>
      A nivel 6 obtienes la capacidad para desplazarte de una sombra a otra.
      Cuando te encuentras en penumbra u oscuridad, puedes teletransportarte,
      como una acción adicional, hasta 60 pies (20 metros) a un espacio
      desocupado que también esté en penumbra u oscuridad. Tienes ventaja en el
      primer ataque cuerpo a cuerpo que realices antes de finalizar el turno.
    </p>
  ),

  evasion: (skill, pc) => (
    <p>
      Al nivel 7 tu agilidad instintiva te permite esquivar ciertos efectos de
      área, como el aliento eléctrico de un dragón azul o un conjuro de bola de
      fuego. Cuando seas el objetivo de un efecto que te permita hacer una
      tirada de salvación de Destreza para recibir únicamente la mitad del daño,
      en su lugar no recibes daño si la tirada de salvación es exitosa, y solo
      la mitad del daño si fallas.
    </p>
  ),

  stillnessOfMind: (skill, pc) => (
    <p>
      Comenzando al nivel 7 puedes usar tu acción para que termine un efecto en
      ti causante del estado asustado o encantado.
    </p>
  ),

  purityOfBody: (skill, pc) => (
    <p>
      Al nivel 10 tu maestría sobre el ki que recorre tu cuerpo te hace inmune a
      la enfermedad y el veneno.
    </p>
  ),

  tranquility: (skill, pc) => (
    <p>
      Empezando en el nivel 11 puedes realizar una meditación especial que te
      rodea con un aura de paz. Al finalizar un descanso prolongado obtienes el
      efecto del conjuro <u>santuario</u>, que dura hasta el inicio de tu
      siguiente descanso prolongado (el conjuro puede terminar antes como es
      habitual). La CD de la tirada de salvación para el conjuro es{' '}
      {8 + getStatMod(getStat(pc, 'wis')) + getProficiencyBonus(pc.level)},
      igual a 8 + tu modificador de Sabiduría (
      {increment(getStatMod(getStat(pc, 'wis')))}) + tu bonificador de
      competencia ({getProficiencyBonus(pc.level)}).
    </p>
  ),

  cloakOfShadows: (skill, pc) => (
    <p>
      Para el nivel 11 has aprendido a ser uno con las sombras. Cuando te
      encuentras en una zona de penumbra u oscuridad puedes usar tu acción para
      volverte invisible. Permaneces invisible hasta que hagas un ataque, lances
      un conjuro o entres a una zona de luz brillante.
    </p>
  ),
};

export function displayElementalDiscipline(discipline, trait, pc) {
  switch (discipline) {
    case 'breathOfWinter':
      return (
        <p>
          Puedes gastar <u>6 puntos ki</u> para lanzar <u>cono de frío</u>.
        </p>
      );
    case 'clenchOfTheNorthWind':
      return (
        <p>
          Puedes gastar <u>3 puntos ki</u> para lanzar{' '}
          <u>inmovilizar persona</u>.
        </p>
      );
    case 'elementalAttunement':
      return (
        <>
          <p>
            Puedes usar tu acción para controlar las fuerzas elementales
            cercanas brevemente, causando uno de los siguientes efectos de tu
            elección:
          </p>
          <ul>
            <li>
              Crear un efecto sensorial inofensivo relacionado con el aire, el
              fuego, el agua o la tierra; como una lluvia de chispas, un soplo
              de viento, una bruma ligera o un leve retumbar de rocas.
            </li>
            <li>
              Instantáneamente encender o extinguir una vela, antorcha o pequeña
              fogata.
            </li>
            <li>
              Enfriar o entibiar hasta 1 libra (0,5 kg) de materia no viva
              durante una hora.
            </li>
            <li>
              Provocar que una cantidad de tierra, fuego, agua o niebla que
              pueda caber en un cubo de 1 pie (30 cm3) cambie de forma y adopte
              una forma tosca que tú decidas.
            </li>
          </ul>
        </>
      );
    case 'eternalMountainDefense':
      return (
        <p>
          Puedes gastar <u>5 puntos ki</u> para lanzar <u>piel de piedra</u>.
        </p>
      );
    case 'fangsOfTheFireSnake':
      return (
        <p>
          Cuando usas la acción de ataque en tu turno, puedes gastar{' '}
          <u>1 punto ki</u>
          para hacer que látigos de llamas salgan de tus puños y pies. El
          alcance de tus ataques sin armas aumenta 10 pies (3 metros) para esa
          acción y el resto del turno. Un golpe con uno de estos ataques provoca{' '}
          <u>daño de fuego</u> en vez de daño contundente y si gastas{' '}
          <u>1 punto ki</u> cuando el ataque acierta hará{' '}
          <u>1d10 de daño de fuego extra</u>.
        </p>
      );
    case 'fistOfFourThunders':
      return (
        <p>
          Puedes gastar <u>2 puntos ki</u> para lanzar <u>onda atronadora</u>.
        </p>
      );
    case 'fistOfUnbrokenAir':
      return (
        <p>
          Puedes crear una ráfaga de aire comprimido que golpea como un poderoso
          puño. Como una acción, puedes gastar <u>2 puntos ki</u> y elegir una
          criatura a 30 pies (10 metros) de ti. Esa criatura debe hacer una{' '}
          <u>tirada de salvación de Fuerza</u>. Si falla, la criatura recibe{' '}
          <u>3d10 de daño contundente</u>, más <u>1d10 de daño contundente</u>{' '}
          extra por <u>cada punto ki</u> adicional que gastes, y puedes empujar
          a la criatura hasta 20 pies (8 metros) lejos de ti y tumbarla. Si la
          salvación tiene éxito, la criatura recibe la mitad del daño y no es
          empujada ni tumbada.
        </p>
      );
    case 'flamesOfThePhoenix':
      return (
        <p>
          Puedes gastar <u>4 puntos ki</u> para lanzar <u>bola de fuego</u>.
        </p>
      );
    case 'gongOfTheSummit':
      return (
        <p>
          Puedes gastar <u>5 puntos ki</u> para lanzar <u>estallar</u>.
        </p>
      );
    case 'mistStance':
      return (
        <p>
          Puedes gastar <u>4 puntos ki</u> para lanzar <u>forma gaseosa</u>,
          siendo tú el objetivo.
        </p>
      );
    case 'rideTheWind':
      return (
        <p>
          Puedes gastar <u>4 puntos ki</u> para lanzar <u>volar</u>, siendo tú
          el objetivo.
        </p>
      );
    case 'riverOfHungryFlame':
      return (
        <p>
          Puedes gastar <u>5 puntos ki</u> para lanzar <u>muro de fuego</u>.
        </p>
      );
    case 'rushOfTheGaleSpirits':
      return (
        <p>
          Puedes gastar <u>2 puntos ki</u> para lanzar <u>ráfaga de viento</u>.
        </p>
      );
    case 'shapeTheFlowingRiver':
      return (
        <p>
          Como una acción, puedes gastar <u>1 punto ki</u> para elegir una zona
          de agua o hielo no mayor a 30 pies (10 metros) por cada lado (10 x 10
          metros) a una distancia de hasta 120 pies (40 metros) de ti. Puedes
          cambiar el agua a hielo dentro de esa zona y viceversa, y puedes
          moldear el hielo en dicha área en cualquier forma que elijas. Puedes
          elevar o descender la elevación del hielo, crear o rellenar una zanja,
          erigir o aplanar una pared o formar un pilar. La magnitud de dichos
          cambios no puede exceder la mitad de las dimensiones totales del área.
          Por ejemplo, si afectas una zona de 30 pies cuadrados (10 metros
          cuadrados), puedes crear un pilar de hasta 15 pies (5 metros) de alto,
          elevar o descender dicha zona hasta 15 pies (5 metros), crear una
          zanja con hasta 15 pies (5 metros) de profundidad, y así
          sucesivamente. No puedes moldear el hielo de forma que atrape o hiera
          a una criatura.
        </p>
      );
    case 'sweepingCinderStrike':
      return (
        <p>
          Puedes gastar <u>2 puntos ki</u> para lanzar <u>manos ardientes</u>.
        </p>
      );
    case 'waterWhip':
      return (
        <p>
          Puedes gastar <u>2 puntos ki</u> como una acción adicional para crear
          un látigo de agua que empuje y agarre a una criatura para
          desestabilizarla. Una criatura que puedas ver a no más de 30 pies (10
          metros) de ti debe hacer una <u>tirada de salvación de Destreza</u>.
          Si falla la tirada, la criatura recibe <u>3d10 de daño contundente</u>
          , más <u>1d10 de daño contundente</u> extra por <u>cada punto ki</u>{' '}
          adicional que gastes, y puedes tumbarla o apresarla y atraerla hacia
          ti hasta 25 pies (8 metros). Si la tirada de salvación tiene éxito, la
          criatura recibe la mitad de ese daño y no la apresas ni la tumbas.
        </p>
      );
    case 'waveOfRollingEarth':
      return (
        <p>
          Puedes gastar <u>6 puntos ki</u> para lanzar <u>muro de piedra</u>.
        </p>
      );
    case 'clenchOfTheNorthWind':
      return (
        <p>
          Puedes gastar <u>3 puntos ki</u> para lanzar{' '}
          <u>inmovilizar persona</u>.
        </p>
      );

    default:
      break;
  }
}

export function elementalDisciplineExplanation(discipline) {
  if (Object.keys(ELEMENTAL_DISCIPLINES).includes(discipline))
    return {
      [discipline]: (trait, pc) =>
        displayElementalDiscipline(discipline, trait, pc),
    };
  else return {};
}
