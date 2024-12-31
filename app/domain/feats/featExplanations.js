import { Link } from '@remix-run/react';
import {
  hasToSelectElement,
  hasToSelectMartialAdeptManeuvers,
} from './featUtils';
import { t } from '../translations';
import { displayManeuver } from '../classes/fighter/fighterSkillsExplanation';
import { getProficiencyBonus, getStat, getStatMod } from '../characters';

export const FEATS = {
  skulker: {
    name: 'skulker',
    requirements: {
      stats: {
        dex: 13,
      },
    },
    description: (skill, pc) => (
      <>
        <p>
          Eres experto en escabullirte entre las sombras. Obtienes los
          beneficios siguientes:
        </p>
        <ul>
          <li>
            Puedes intentar escoderte simplemente con estar en una zona
            ligeramente oscura desde el pinto de vista de la criatura de la que
            deseas ocultarte
          </li>
          <li>
            Cuando estás escondido de una criatura y fallas un ataque con arma a
            distancia contra ella, el haber realizado este ataque no revela tu
            ubicación
          </li>
          <li>
            La luz tenue no te provoca desventaja en las pruebas de Sabiduría
            (Percepción) que dependen de la vista
          </li>
        </ul>
      </>
    ),
  },
  actor: {
    name: 'actor',
    bonus: {
      stats: {
        cha: 1,
      },
    },
    description: (skill, pc) => (
      <>
        <p>
          Habilidoso en la imitación y la interpretación, ganas los siguientes
          beneficios:
        </p>
        <ul>
          <li>Aumenta tu Carisma en 1, hasta un máximo de 20.</li>
          <li>
            Tienes ventaja en las pruebas de Carisma (Engañar) y Carisma
            (Actuar) cuando intentas hacerte pasar por otra persona.
          </li>
          <li>
            Puedes imitar el habla de otra persona o los sonidos hechos por
            otras criaturas. Debes de haber oído hablar a dicha persona
            hablando, o a la criatura haciendo el sonido, durante al menos 1
            minuto. Una prueba exitosa de Perspicacia(Sabiduría) enfrentada a tu
            prueba de Carisma(Engañar) permite a un oyente apreciar que este
            efecto es falso.
          </li>
        </ul>
      </>
    ),
  },
  lucky: {
    name: 'lucky',
    description: (skill, pc) => (
      <>
        <p>
          Tienes una suerte inexplicable que suele aparecer siempre en el
          momento justo.
        </p>
        <p>
          Tienes 3 puntos de suerte. Siempre que hagas una tirada de ataque, una
          prueba de característica, o una tirada de salvación, puedes gastar un
          punto de suerte para tirar un d20 adicional. Puedes elegir gastar uno
          de tus puntos de suerte después de tirar el dado, pero antes de que se
          sepa si la tirada tiene éxito o no. Tú eliges qué d20 se usa para la
          tirada de ataque, prueba de característica, o tirada de salvación.
        </p>
        <p>
          También puedes gastar un punto de suerte cuando se hace una tirada de
          ataque contra tí. Tira un d20, y después elige si el ataque usa tu
          tirada o la del atacante.
        </p>
        <p>
          Si más de una criatura gasta un punto de suerte para alterar el
          resultado de una tirada, los puntos se cancelan unos a otros; no se
          tiran dados adicionales.
        </p>
        <p>
          Recuperas tus puntos de suerte gastados cuando terminas un descanso
          prolongado.
        </p>
      </>
    ),
  },
  alert: {
    name: 'alert',
    bonus: {
      initiative: 5,
    },
    description: (skill, pc) => (
      <>
        <p>Siempre al acecho del peligro, ganas los siguientes beneficios:</p>
        <ul>
          <li>Ganas un +5 a la iniciativa.</li>
          <li>No puedes ser sorprendido mientras estás consciente.</li>
          <li>
            Otras criaturas no ganan ventaja en las tiradas de ataque contra ti
            como consecuencia de estar escondidas de ti.
          </li>
        </ul>
      </>
    ),
  },
  grappler: {
    name: 'grappler',
    requirements: {
      stats: {
        str: 13,
      },
    },
    description: (skill, pc) => (
      <>
        <p>
          Has desarrollado las habilidades adecuadas para ser más que competente
          en el uso de presas durante el combate. Ganas los siguientes
          beneficios:
        </p>
        <ul>
          <li>
            Tienes ventaja en tiradas de ataque contra una criatura a la que
            estés agarrando.
          </li>
          <li>
            Puedes usar tu acción para intentar inmovilizar a una criatura
            apresada por tí. Para conseguirlo, haz otra tirada de Apresar. Si
            tienes éxito, tanto tú como dicha criatura estais inmovilizados
            hasta que acabe la presa.
          </li>
        </ul>
      </>
    ),
  },
  charger: {
    name: 'charger',
    description: (skill, pc) => (
      <>
        <p>
          Cuando usas tu acción para Correr, puedes usar una acción adicional
          para hacer un ataque de arma cuerpo a cuerpo o para embestir a una
          criatura.
        </p>
        <p>
          Si te mueves al menos 10 pies en línea recta justo antes de usar la
          acción adicional, ganas un bonificador +5 adicional a la tirada de
          daño del ataque (si elegiste hacer un ataque de arma cuerpo a cuerpo y
          acertaste) o empujas al objetivo hasta 10 pies alejándolo de ti (si
          elegiste embestirlo y tuviste éxito).
        </p>
      </>
    ),
  },
  savageAttacker: {
    name: 'savageAttacker',
    description: (skill, pc) => (
      <p>
        Una vez por turno cuando tiras el daño de un ataque con arma cuerpo a
        cuerpo, puedes volver a tirarlo y elegir cualquiera de los dos
        resultados.
      </p>
    ),
  },
  athlete: {
    name: 'athlete',
    description: (skill, pc) => (
      <>
        <p>
          Has pasado por un entrenamiento físico extraordinario para ganar los
          siguientes beneficios:
        </p>
        <ul>
          <li>Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.</li>
          <li>Cuando estás caído, levantarte solo usa 5 pies de movimiento.</li>
          <li>Trepar no reduce a la mitad tu velocidad.</li>
          <li>
            Puedes realizar un salto largo o un salto alto después de moverte
            solo 5 pies, en ligar de 10 pies.
          </li>
        </ul>
      </>
    ),
  },
  mageSlayer: {
    name: 'mageSlayer',
    description: (skill, pc) => (
      <>
        <p>
          Has practicado técnicas útiles para el combate cuerpo a cuerpo contra
          lanzadores de conjuros, ganando los siguientes beneficios:
        </p>
        <ul>
          <li>
            Cuando una criatura a 5 pies de tí lance un conjuro, puedes usar tu
            reacción para hacer un ataque de arma cuerpo a cuerpo contra dicha
            criatura.
          </li>
          <li>
            Cuando haces daño a una criatura que se está concentrando en un
            conjuro, dicha criatura tiene desventaja en la tirada de salvación
            que hace para mantener la concentración.
          </li>
          <li>
            Tienes ventaja en las tiradas de salvación contra conjuros lanzados
            por criaturas a 5 pies de tí.
          </li>
        </ul>
      </>
    ),
  },
  sentinel: {
    name: 'sentinel',
    description: (skill, pc) => (
      <>
        <p>
          Has dominado técnicas para aprovecharte de cualquier hueco en la
          guardia del enemigo, ganando las siguientes ventajas:
        </p>
        <ul>
          <li>
            Cuando golpeas a una criatura con un ataque de oportunidad, la
            velocidad de la criatura se vuelve 0 durante el resto del turno.
          </li>
          <li>
            Una criatura provoca ataques de oportunidad de tí incluso aunque
            elija la acción de Destrabarse antes de salir de tu alcance.
          </li>
          <li>
            Cuando una criatura a 5 pies de tí hace un ataque contra un objetivo
            que no seas tú (y dicho objetivo no tiene esta dote), puedes usar tu
            reacción para hacer un ataque con arma cuerpo a cuerpo contra la
            criatura atacante.
          </li>
        </ul>
      </>
    ),
  },
  dualWielder: {
    name: 'dualWielder',
    description: (skill, pc) => (
      <>
        <p>
          Has dominado el combate con dos armas, ganando los siguientes
          beneficios:
        </p>
        <ul>
          <li>
            Ganas un bonificador +1 a la CA mientras estés empuñando un arma
            cuerpo a cuerpo individual en cada mano.
          </li>
          <li>
            Puedes usar combate con dos armas incluso cuando las armas cuerpo a
            cuerpo a una mano que estás empuñando no son ligeras.
          </li>
          <li>
            Puedes desenfundar o enfundar dos armas a una mano en las ocasiones
            en las que normalmente sólo podrías desenfundar o enfundar una.
          </li>
        </ul>
      </>
    ),
  },
  mountedCombatant: {
    name: 'mountedCombatant',
    description: (skill, pc) => (
      <>
        <p>
          Eres un enemigo peligroso cuando vas a caballo. Mientras estés montado
          y no estés incapacitado, ganas los siguientes beneficios:
        </p>
        <ul>
          <li>
            Tienes ventaja en tiradas de ataque cuerpo a cuerpo contra cualquier
            criatura no montada que sea más pequeña que tu montura.
          </li>
          <li>
            Puedes hacer que cualquier ataque cuyo objetivo sea tu montura te
            haga objetivo a tí en su lugar.
          </li>
          <li>
            Si tu montura se ve sometida a algún efecto que le permita hacer una
            tirada de salvación de Destreza para llevarse la mitad del daño, en
            su lugar no se lleva ningún daño si tiene éxito, y sólo la mitad del
            daño si falla.
          </li>
        </ul>
      </>
    ),
  },
  defensiveDuelist: {
    name: 'defensiveDuelist',
    requirements: {
      stats: {
        dex: 13,
      },
    },
    description: (skill, pc) => (
      <p>
        Cuando estés empuñando un arma sutil con la que seas competente y otra
        criatura te golpea con un ataque cuerpo a cuerpo, puedes usar tu
        reacción para añadir tu bonificador de competencia a tu CA contra dicho
        ataque, provocando que potencialmente pueda fallar.
      </p>
    ),
  },
  tough: {
    name: 'tough',
    description: (skill, pc) => (
      <p>
        Tus puntos de golpe máximos aumentan una cantidad igual al doble de tu
        nivel cuando obtienes esta dote. Siempre que ganes un nivel después de
        obtenerla, tus puntos de golpes máximos incrementan 2 puntos de golpe
        adicionales.
      </p>
    ),
  },
  crossbowExpert: {
    name: 'crossbowExpert',
    description: (skill, pc) => (
      <>
        <p>
          Gracias a un entrenamiento intensivo en el uso de ballestas, ganas los
          siguientes beneficios:
        </p>
        <ul>
          <li>
            Ignoras la propiedad de carga de las ballestas con las que tienes
            competencia.
          </li>
          <li>
            Estar a 5 pies de una criatura enemiga no impone desventaja a tus
            tiradas de ataque a distancia.
          </li>
          <li>
            Cuando usas la acción de Ataque y atacas con un arma a una mano,
            puedes usar una acción adicional para atacar con una ballesta de
            mano cargada que empuñes en la mano.
          </li>
        </ul>
      </>
    ),
  },
  dungeonDelver: {
    name: 'dungeonDelver',
    description: (skill, pc) => (
      <>
        <p>
          Siempre alerta ante las trampas y puertas secretas que se suelen
          encontrar en la mayorías de las mazmorras, ganas los siguientes
          beneficios:
        </p>
        <ul>
          <li>
            Tienes ventaja en las tiradas de Sabiduría (Percepción) e
            Inteligencia (Investigación) realizadas para detectar la presencia
            de puertas secretas.
          </li>
          <li>
            Tienes ventaja en las tiradas de salvación realizadas para evitar o
            resistir trampas.
          </li>
          <li>Tienes resistencia al daño infligido por trampas.</li>
          <li>
            Puedes buscar trampas mientras viajas a ritmo normal, en vez de a
            ritmo lento.
          </li>
        </ul>
      </>
    ),
  },
  skilled: {
    name: 'skilled',
    description: (skill, pc) => (
      <p>
        Ganas competencia con una combinación de tres habilidades o utensilios a
        tu elección.
      </p>
    ),
  },
  magicInitiate: {
    name: 'magicInitiate',
    chooseTrait: pc => true,
    description: (skill, pc) => (
      <>
        <p>
          Escoge una clase: Bardo, brujo, clérigo, druida, hechicero, o mago.
          Aprendes dos trucos a tu elección de la lista de conjuros de dicha
          clase.
        </p>
        <p>
          Además, escoge un conjuro de nivel 1 de esa misma lista. Aprendes
          dicho conjuro y puedes lanzarlo a su nivel más bajo. Una vez que lo
          lanzas, debes de finalizar un descanso prolongado antes de poder
          lanzarlo de nuevo. Esta limitación sólo se aplica para el lanzamiento
          de dicho conjuro proporcionado por esta dote.
        </p>
        <p>
          Tu característica de lanzamiento de conjuros para estos conjuros
          depende de la clase que elijas: Carisma para bardo, brujo, o
          hechicero; Sabiduría para clérigo o druida; o Inteligencia para mago.
        </p>
      </>
    ),
  },
  warCaster: {
    name: 'warCaster',
    requirements: {
      spellcaster: true,
    },
    description: (skill, pc) => (
      <>
        <p>
          Has practicado el lanzamiento de conjuros en mitad del combate,
          aprendiendo técnicas que te dan los siguientes beneficios:
        </p>
        <ul>
          <li>
            Tienes ventaja en las tiradas de salvación de Constitución que hagas
            para mantener la concentración en un conjuro cuando sufres daño.
          </li>
          <li>
            Puedes ejecutar los componentes somáticos de un conjuro incluso
            cuando portas armas o escudo en una o ambas manos.
          </li>
          <li>
            Cuando el movimiento de una criatura enemiga provoque un ataque de
            oportunidad por tu parte, puedes usar tu reacción para lanzar un
            conjuro a dicha criatura, en vez de hacer un ataque de oportunidad.
            El conjuro debe de tener un tiempo de lanzamiento de 1 acción y debe
            hacer objetivo tan solo a esa criatura.
          </li>
        </ul>
      </>
    ),
  },
  spellSniper: {
    name: 'spellSniper',
    requirements: {
      spellcaster: true,
    },
    description: (skill, pc) => (
      <>
        <p>
          Has aprendido técnicas para mejorar tus ataques con ciertos tipos de
          conjuros, ganando los siguientes beneficios:
        </p>
        <ul>
          <li>
            Cuando lanzas un conjuro que requiere que hagas una tirada de
            ataque, el alcance del conjuro se dobla.
          </li>
          <li>
            Tus ataques con conjuros a distancia ignoran la cobertura normal y
            superior.
          </li>
          <li>
            Aprendes un truco que requiera una tirada de ataque. Puedes escoger
            el truco de la lista de conjuros del bardo, brujo, clérigo, druida,
            hechicero o mago. Tu característica de lanzamiento de conjuros para
            este truco depende de la lista de conjuros de la que lo elijas:
            Carisma para bardo, brujo, o hechicero; Sabiduría para clérigo o
            druida; o Inteligencia para mago.
          </li>
        </ul>
      </>
    ),
  },
  ritualCaster: {
    name: 'ritualCaster',
    chooseTrait: pc => true,
    requirements: {
      stats: {
        int: 13,
        wis: 13,
      },
    },
    description: (skill, pc) => (
      <>
        <p>
          Has aprendido un cierto número de conjuros que puedes lanzar como
          rituales. Estos conjuros están escritos en un libro de rituales, que
          debes de tener en la mano mientras lanzas algunos de ellos.
        </p>
        <p>
          Cuando eliges esta dote, obtienes un libro de rituales que contiene
          dos hechizos de nivel 1 de tu elección. Escoge una de las siguientes
          clases: bardo, brujo, clérigo, druida, hechicero o mago. Debes de
          elegir tus conjuros de la lista de conjuros de dicha clase, y los
          conjuros que elijas deben de tener la etiqueta de ritual. La clase que
          escojas también determina la característica de lanzamiento de conjuros
          para estos conjuros: Carisma para bardo, brujo, o hechicero; Sabiduría
          para clérigo o druida; o Inteligencia para mago.
        </p>
        <p>
          Si te encuentras algún conjuro escrito, como un pergamino de conjuro o
          un libro de conjuros de mago, puedes intentar añadirlo a tu libro de
          rituales. El conjuro debe de estar en la lista de conjuros de la clase
          que has escogido, el nivel de conjuro no puede ser más alto que la
          mitad de tu nivel (redondeando hacia arriba), y debe de tener la
          etiqueta de ritual. El proceso de copiar el conjuro en tu libro de
          rituales lleva 2 horas por nivel de conjuro, y cuesta 50 po por nivel.
          El coste representa los componentes materiales que gastas mientras
          experimentas con el conjuro para dominarlo, y también la tinta de alta
          calidad que necesitas para inscribirlo.
        </p>
      </>
    ),
  },
  inspiringLeader: {
    name: 'inspiringLeader',
    requirements: {
      stats: {
        cha: 13,
      },
    },
    description: (skill, pc) => (
      <>
        <p>
          Puedes pasar 10 minutos inspirando a tus compañeros, reforzando su
          espíritu combativo. Cuando lo hagas, elige hasta seis criaturas
          amistosas (de las cuales una puedes ser tú) a 30 pies o menos de tí
          que te puedan ver u oír y que puedan entenderte. Cada criatura puede
          ganar un número de puntos de golpe temporales igual a tu nivel + tu
          modificador de Carisma.
        </p>
        <p>
          Una criatura no puede ganar nuevamente puntos temporales gracias a
          esta dote hasta que no haya finalizado un descanso corto o prolongado.
        </p>
      </>
    ),
  },
  lightlyArmored: {
    name: 'lightlyArmored',
    description: (skill, pc) => (
      <>
        <p>
          Has entrenado para dominar el uso de la armadura ligera, ganando los
          siguientes beneficios:
        </p>
        <ul>
          <li>
            Aumenta tu puntuación de Fuerza o Destreza en 1, hasta un máximo de
            20.
          </li>
          <li>Ganas competencia con armadura ligera.</li>
        </ul>
      </>
    ),
  },
  linguist: {
    name: 'linguist',
    chooseTrait: pc => true,
    description: (skill, pc) => (
      <>
        <p>
          Has estudiado idiomas y códigos, ganando los siguientes beneficios:
        </p>
        <ul>
          <li>
            Aumenta tu puntuación de Inteligencia en 1, hasta un máximo de 20.
          </li>
          <li>Aprendes tres idiomas a tu elección.</li>
          <li>
            Puedes crear hábilmente escritos cifrados. Los demás no pueden
            descifrar un código que hayas creado a no ser que les enseñes, que
            tengan éxito en una prueba de Inteligencia (CD igual a tu puntuación
            de Inteligencia + tu bonificador de competencia), o usen magia para
            descifrarlo.
          </li>
        </ul>
      </>
    ),
  },
  weaponMaster: {
    name: 'weaponMaster',
    chooseTrait: pc => true,
    description: (skill, pc) => (
      <>
        <p>
          Has practicado intensivamente con todo tipo de armas, ganando los
          siguientes beneficios:
        </p>
        <ul>
          <li>
            Aumenta tu puntuación de Fuerza o Destreza en 1, hasta un máximo de
            20.
          </li>
          <li>
            Ganas competencia con 4 armas a tu elección, que deben de ser
            simples o marciales.
          </li>
        </ul>
      </>
    ),
  },
  mediumArmorMaster: {
    name: 'mediumArmorMaster',
    requirements: {
      proficiency: 'mediumArmors',
    },
    description: (skill, pc) => (
      <>
        <p>
          Has practicado tu movimiento mientras vistes armadura intermedia para
          ganar los siguientes beneficios:
        </p>
        <ul>
          <li>
            Llevar puesta armadura intermedia no te impone desventaja en tus
            tiradas de Destreza(Sigilo).
          </li>
          <li>
            Cuando llevas puesta armadura intermedia, puedes añadir 3, en vez de
            2, a tu CA si tienes una puntuación de Destreza de 16 o superior.
          </li>
        </ul>
      </>
    ),
  },
  heavyArmorMaster: {
    name: 'heavyArmorMaster',
    requirements: {
      proficiency: 'heavyArmors',
    },
    description: (skill, pc) => (
      <>
        <p>
          Puedes usar tu armadura para desviar golpes que matarían a otros.
          Ganas los siguientes beneficios:
        </p>
        <ul>
          <li>Aumenta tu puntuación de Fuerza en 1, hasta un máximo de 20.</li>
          <li>
            Mientras lleves puesta armadura pesada, el daño contundente,
            cortante, y perforante que recibas de armas no mágicas se reduce en
            3.
          </li>
        </ul>
      </>
    ),
  },
  polearmMaster: {
    name: 'polearmMaster',
    description: (skill, pc) => (
      <>
        <p>
          Puedes mantener a tus enemigos a raya con armas de alcance. Ganas los
          siguientes beneficios:
        </p>
        <ul>
          <li>
            Cuando usas la acción de Ataque y atacas solamente con una alabarda,
            bastón, o guja, puedes usar una acción adicional para hacer un
            ataque cuerpo a cuerpo con el extremo opuesto del arma. El
            modificador de característica para este ataque adicional es el mismo
            que para el primer ataque, el dado de daño del arma para este ataque
            es un d4, y el ataque inflige daño contundente.
          </li>
          <li>
            Mientras estés empuñando una alabarda, bastón, guja, o pica, otras
            criaturas provocan un ataque de oportunidad cuando entran en tu
            alcance.
          </li>
        </ul>
      </>
    ),
  },
  greatWeaponMaster: {
    name: 'greatWeaponMaster',
    description: (skill, pc) => (
      <>
        <p>
          Has aprendido a usar el peso de un arma a tu favor, dejando que su
          inercia potencie tus golpes. Ganas los siguientes beneficios:
        </p>
        <ul>
          <li>
            En tu turno, cuando consigas un golpe crítico con un arma cuerpo a
            cuerpo o reduzcas a una criatura a 0 puntos de golpe con dicho arma,
            puedes hacer un ataque de arma cuerpo a cuerpo como acción
            adicional.
          </li>
          <li>
            Antes de hacer un ataque cuerpo a cuerpo con un arma pesada con la
            que tengas competencia, puedes elegir sufrir un penalizador -5 a la
            tirada de ataque. Si el ataque impacta, añades +10 al daño del
            ataque.
          </li>
        </ul>
      </>
    ),
  },
  shieldMaster: {
    name: 'shieldMaster',
    description: (skill, pc) => (
      <>
        <p>
          Usas escudos no sólo como protección sino también ofensivamente. Ganas
          los siguientes beneficios mientras estés empuñando un escudo:
        </p>
        <ul>
          <li>
            Si usas la acción de Ataque en tu turno, puedes usar una acción
            adicional para intentar embestir con tu escudo a una criatura a 5
            pies de tí.
          </li>
          <li>
            Si no estás incapacitado, puedes añadir el modificador a la CA de tu
            escudo a cualquier tirada de salvación de Destreza que hagas contra
            un conjuro o cualquier otro efecto dañino que te tenga como objetivo
            sólo a tí.
          </li>
          <li>
            Si te ves sometido a algún efecto que te permita hacer una tirada de
            salvación de Destreza para llevarte sólo la mitad del daño, puedes
            usar tu reacción para no llevarte ningún daño si tienes éxito en la
            tirada de salvación, interponiendo tu escudo entre tí y la fuente
            del efecto.
          </li>
        </ul>
      </>
    ),
  },
  tavernBrawler: {
    name: 'tavernBrawler',
    description: (skill, pc) => (
      <>
        <p>
          Acostumbrado a peleas sucias y frenéticas usando cualquiera que sea el
          arma que caiga en tus manos, ganas los siguientes beneficios:
        </p>
        <ul>
          <li>
            Aumenta tu puntuación de Fuerza o Constitución en 1, hasta un máximo
            de 20.
          </li>
          <li>Ganas competencia con armas improvisadas.</li>
          <li>Tu golpe sin armas causa un d4 de daño.</li>
          <li>
            Cuando golpeas a una criatura con un golpe sin armas o un arma
            improvisada en tu turno, puedes usar una acción adicional para
            intentar apresar a dicha criatura.
          </li>
        </ul>
      </>
    ),
  },
  keenMind: {
    name: 'keenMind',
    description: (skill, pc) => (
      <>
        <p>
          Tienes una mente que puede determinar la hora, la orientación y los
          detalles con asombrosa precisión. Ganas los siguientes beneficios:
        </p>
        <ul>
          <li>
            Aumenta tu puntuación de Inteligencia en 1, hasta un máximo de 20.
          </li>
          <li>Siempre sabes dónde está el norte.</li>
          <li>
            Siempre sabes cuantas horas quedan hasta el próximo amanecer u
            ocaso.
          </li>
          <li>
            Puedes recordar claramente cualquier cosa que hayas visto u oído en
            el último mes.
          </li>
        </ul>
      </>
    ),
  },
  moderatelyArmored: {
    name: 'moderatelyArmored',
    requirements: {
      proficiency: 'lightArmors',
    },
    description: (skill, pc) => (
      <>
        <p>
          Has entrenado para dominar el uso de la armadura intermedia y los
          escudos, ganando los siguiente beneficios:
        </p>
        <ul>
          <li>
            Incrementa tu puntuación de Fuerza o Destreza en 1, hasta un máximo
            de 20.
          </li>
          <li>Ganas competencia con armaduras intermedias y escudos.</li>
        </ul>
      </>
    ),
  },
  mobile: {
    name: 'mobile',
    description: (skill, pc) => (
      <>
        <p>
          Eres excepcionalmente veloz y ágil. Ganas los siguientes beneficios:
        </p>
        <ul>
          <li>Tu velocidad se incrementa en 10 pies.</li>
          <li>
            Cuando utilizas la acción de Correr, el terreno difícil no te cuesta
            movimiento adicional ese turno.
          </li>
          <li>
            Cuando haces un ataque cuerpo a cuerpo contra una criatura, no
            provocas ataques de oportunidad de dicha criatura durante el resto
            del turno, le impactes o no.
          </li>
        </ul>
      </>
    ),
  },
  heavilyArmored: {
    name: 'heavilyArmored',
    requirements: {
      proficiency: 'mediumArmors',
    },
    description: (skill, pc) => (
      <>
        <p>
          Has entrenado para dominar el uso de la armadura pesada, ganando los
          siguientes beneficios:
        </p>
        <ul>
          <li>Aumenta tu puntuación de Fuerza en 1, hasta un máximo de 20.</li>
          <li>Ganas competencia con armadura pesada.</li>
        </ul>
      </>
    ),
  },
  observant: {
    name: 'observant',
    description: (skill, pc) => (
      <>
        <p>
          Siempre atento a los detalles de tu entorno, ganas los siguientes
          beneficios:
        </p>
        <ul>
          <li>
            Incrementa tu puntuación de Inteligencia o Sabiduría en 1, hasta un
            máximo de 20.
          </li>
          <li>
            Si puedes ver la boca de una criatura mientras ésta habla en un
            idioma que puedas entender, puedes leer sus labios para saber qué es
            lo que está diciendo.
          </li>
          <li>
            Tienes un modificador +5 a tus puntuaciones pasivas de
            Sabiduría(Percepción) e Inteligencia(Investigación).
          </li>
        </ul>
      </>
    ),
  },
  resilient: {
    name: 'resilient',
    chooseTrait: pc => true,
    description: (skill, pc) => (
      <>
        <p>Escoge una característica. Ganas los siguientes beneficios:</p>
        <ul>
          <li>
            Incrementa la puntuación de característica elegida en 1, hasta un
            máximo de 20.
          </li>
          <li>
            Ganas competencia en tiradas de salvación con dicha característica.
          </li>
        </ul>
      </>
    ),
  },
  durable: {
    name: 'durable',
    description: (skill, pc) => (
      <>
        <p>Curtido y resistente, ganas los siguientes beneficios:</p>
        <ul>
          <li>
            Aumenta tu puntuación de Constitución en 1, hasta un máximo de 20.
          </li>
          <li>
            Cuando tiras un Dado de Golpe para recuperar puntos de golpe, el
            número mínimo de puntos de golpe que recuperas gracias a la tirada
            es igual a dos veces tu modificador de constitución (mínimo 2).
          </li>
        </ul>
      </>
    ),
  },
  healer: {
    name: 'healer',
    description: (skill, pc) => (
      <>
        <p>
          Eres un médico muy capaz, lo que te permite curar las heridas
          rápidamente y dejar a tus aliados listos para seguir peleando. Ganas
          los siguientes beneficios:
        </p>
        <ul>
          <li>
            Cuando utilizas un kit de sanador para estabilizar a una criatura
            moribunda, dicha criatura también recupera 1 punto de golpe.
          </li>
          <li>
            Como acción, puedes gastar un uso de un kit de sanador para atender
            a una criatura y devolverle 1d6+4 puntos de golpe, además de puntos
            de golpe adicionales igual al número máximo de Dados de Golpe de
            dicha criatura. La criatura no puede recuperar puntos de golpe de
            nuevo gracias a esta dote hasta que haya finalizado un descanso
            corto o prolongado.
          </li>
        </ul>
      </>
    ),
  },
  sharpShooter: {
    name: 'sharpShooter',
    description: (skill, pc) => (
      <>
        <p>
          Has dominado las armas a distancia y eres capaz de hacer disparos que
          otros considerarían imposibles. Ganas los siguientes beneficios:
        </p>
        <ul>
          <li>
            Atacar a largo alcance no impone desventaja a tus tiradas de ataque
            con armas a distancia.
          </li>
          <li>
            Tus ataques con armas a distancia ignoran la cobertura normal y
            superior.
          </li>
          <li>
            Antes de hacer un ataque con un arma a distancia con la que tengas
            competencia, puedes elegir sufrir un penalizador -5 a la tirada de
            ataque. Si el ataque acierta, añades +10 al daño del ataque.
          </li>
        </ul>
      </>
    ),
  },
  martialAdept: {
    name: 'martialAdept',
    chooseTrait: pc => hasToSelectMartialAdeptManeuvers(pc),
    extraDisplay: pc =>
      !hasToSelectMartialAdeptManeuvers(pc) && (
        <>
          :{' '}
          <span className="app__small-text">
            1d6. CD{' '}
            {8 +
              getProficiencyBonus(pc.level) +
              getStatMod(Math.max(getStat(pc, 'str'), getStat(pc, 'dex')))}
          </span>
          . {pc.feats?.martialAdept.map(t).join(', ')}
        </>
      ),
    description: (skill, pc, dontShowChooseTrait) => {
      const hasToSelect =
        !dontShowChooseTrait && hasToSelectMartialAdeptManeuvers(pc);

      return (
        <>
          <p>
            Tienes entrenamiento marcial que te permite ejecutar maniobras de
            combate especiales. Ganas los siguientes beneficios:
          </p>
          <ul>
            <li>
              Aprendes dos maniobras a tu elección de entre las disponibles en
              el arquetipo de Maestro de Batalla de la clase de guerrero.
            </li>
            <li>
              Si una maniobra que uses requiere que tu objetivo haga una tirada
              de salvación para resistir los efectos de dicha maniobra,{' '}
              <u>
                la CD de la tirada de salvación es{' '}
                {8 +
                  getProficiencyBonus(pc.level) +
                  getStatMod(Math.max(getStat(pc, 'str'), getStat(pc, 'dex')))}
              </u>{' '}
              (igual a 8 + tu bono de competencia + tu modificador de Fuerza o
              Destreza.
            </li>
            <li>
              Si ya tienes <u>dados de superioridad, ganas uno más</u>; en caso
              contrario, tienes un dado de superioridad, que es <u>un d6</u>.
              Este dado se utiliza como recurso para poder usar tus maniobras.
              Un dado de superioridad se gasta cuando lo usas. Recuperas tus
              dados de superioridad gastados al finalizar un descanso corto o
              prolongado.
            </li>
            {!hasToSelect && (
              <li>
                <u>Maniobras conocidas:</u>{' '}
                <ul>
                  {pc.feats?.martialAdept.map(maneuver => (
                    <li key={maneuver}>
                      <u>{t(maneuver)}:</u>{' '}
                      {displayManeuver(maneuver, skill, pc)}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          {hasToSelect && (
            <div className="inventory-item__modal-buttons">
              <Link
                to={`/characters/pc/${pc.id}/leveling/feats/martialAdept`}
                className="inventory-item__modal-button"
              >
                Escoge Maniobras
              </Link>
            </div>
          )}
        </>
      );
    },
  },
  elementalAdept: {
    name: 'elementalAdept',
    chooseTrait: pc => hasToSelectElement(pc),
    extraDisplay: pc => `: ${pc.feats?.elementalAdept.map(t).join(', ')}`,
    requirements: {
      spellcaster: true,
    },
    description: (skill, pc, dontShowChooseTrait) => {
      const hasToSelect = !dontShowChooseTrait && hasToSelectElement(pc);

      return (
        <>
          <p>
            Cuando ganas esta dote, elige uno de los siguientes tipos de daño:
            ácido, frío, fuego, rayo, o tronante.
          </p>
          <p>
            Los conjuros que lanzas ignoran la resistencia al daño del tipo
            elegido. Además, cuando tiras el daño de un conjuro que hayas
            lanzado que inflija daño del tipo elegido, puedes tratar cualquier
            resultado de 1 en los dados de daño como un 2.
          </p>
          <p>
            Puedes seleccionar esta dote varias veces. Cada vez que lo hagas,
            debes seleccionar un tipo diferente de daño.
          </p>
          {hasToSelect ? (
            <div className="inventory-item__modal-buttons">
              <Link
                to={`/characters/pc/${pc.id}/leveling/feats/elementalAdept`}
                className="inventory-item__modal-button"
              >
                Escoge Elemento
              </Link>
            </div>
          ) : (
            <ul>
              {pc.feats?.elementalAdept.map(element => (
                <li key={element}>{t(element)}</li>
              ))}
            </ul>
          )}
        </>
      );
    },
  },
};

export const FEATS_LIST = Object.values(FEATS);

export const FEATS_EXPLANATION = Object.values(FEATS).reduce(
  (explanations, feat) => {
    explanations[feat.name] = (skill, pc) => feat.description(skill, pc, false);
    return explanations;
  },
  {}
);
