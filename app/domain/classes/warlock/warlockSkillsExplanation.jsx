import { Link } from '@remix-run/react';
import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { getSpellSavingThrow, translateSpell } from '~/domain/spells/spells';
import {
  getArcanum,
  getInvocation,
  getInvocations,
  getPactBoon,
  getTomeRituals,
  getTomeSpells,
  hasToLearnArcanum,
  hasToLearnTomeRituals,
  hasToLearnTomeSpells,
  hasToSelectInvocations,
  translatePactBoon,
} from './warlock';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const WARLOCK_SKILLS_EXPLANATION = {
  feyPresence: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 1 tu patrón te otorga la habilidad de proyectar
        la presencia seductora y aterrorizante de los feéricos. Como una acción,
        puedes forzar a cada criatura en un cubo de 10 pies (3 metros) centrado
        en ti, a que realice una tirada de salvación de Sabiduría contra la CD
        de tus conjuros de brujo ({getSpellSavingThrow(pc)}). Las criaturas que
        fallen su tirada de salvación quedan hechizadas o asustadas por ti (a tu
        elección) hasta el final de tu siguiente turno.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo nuevamente hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  darkOnesBlessing: (skill, pc) => (
    <p>
      Comenzando en el nivel 1 cuando reduces los Puntos de Golpe de una
      criatura hostil a 0, ganas{' '}
      {increment(getStatMod(getStat(pc, 'cha')) + pc.level)} Puntos de Golpe
      temporales equivalentes a tu modificador de Carisma + tu nivel de brujo
      (con un mínimo de 1).
    </p>
  ),

  awakenedMind: (skill, pc) => (
    <p>
      Comenzando en el nivel 1 tu conocimiento exterior te da la habilidad de
      tocar las mentes de otras criaturas. Puedes comunicarte telepáticamente
      con cualquier criatura que puedas ver en un rango de 30 pies (9 metros) de
      ti. No necesitas compartir un idioma con la criatura para que comprenda tu
      mensaje telepático, pero la criatura debe ser capaz de comprender al menos
      un idioma.
    </p>
  ),

  eldritchInvocations: (skill, pc) => {
    return (
      <>
        <p>
          En tu estudio de los saberes ocultos, has desenterrado las
          invocaciones sobrenaturales, fragmentos de conocimiento prohibido que
          te imbuyen con una permanente habilidad mágica.
        </p>
        <p>
          A partir del nivel 2 ganas dos invocaciones sobrenaturales de tu
          elección. Tus opciones de invocación están detalladas al final de la
          descripción de la clase. Cuando adquieres ciertos niveles de brujo,
          ganas invocaciones adicionales de tu elección, como se muestra en la
          columna Invocaciones Conocidas de la tabla Brujo
        </p>
        <p>
          Adicionalmente, cuando ganas un nivel en esta clase, puedes elegir una
          invocación que conozcas y reemplazarla con otra invocación que puedas
          aprender a ese nivel.
        </p>

        {hasToSelectInvocations(pc) && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/warlock/invocations`}
              className="inventory-item__modal-button"
            >
              Escoge Invocaciones
            </Link>
          </div>
        )}

        {!hasToSelectInvocations(pc) && (
          <ul>
            {getInvocations(pc).map(invocation => (
              <li>{getInvocation(invocation).translation}</li>
            ))}
          </ul>
        )}
      </>
    );
  },

  pactBoon: (skill, pc) => {
    const boon = getPactBoon(pc);
    const tomeSpells = getTomeSpells(pc);
    const tomeRituals = getTomeRituals(pc);
    return (
      <>
        <p>
          A partir del nivel 3 tu Patrón de Otro Mundo te recompensa con un don
          por tus leales servicios. Ganas uno de los siguientes rasgos a tu
          elección.
        </p>

        {!!boon && <h3>{translatePactBoon(boon)}</h3>}

        {!boon && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/warlock/pactBoon`}
              className="inventory-item__modal-button"
            >
              Escoge Don del Pacto
            </Link>
          </div>
        )}

        {boon === 'pactOfTheChain' && (
          <>
            <p className="app__paragraph">
              Aprendes el conjuro encontrar familiar y puedes lanzarlo como
              ritual. El conjuro no cuenta para tu número de conjuros conocidos.
            </p>
            <p className="app__paragraph">
              Cuando lanzas el conjuro, puedes elegir una de las formas
              habituales para tu familiar o una de las siguientes formas
              especiales: diablillo, pseudodragón, quasit o duende.
            </p>
            <p className="app__paragraph">
              Adicionalmente, cuando realizas la acción de Atacar, puedes
              sustituir uno de tus ataques para permitir que tu familiar haga
              uno de los suyos.
            </p>
          </>
        )}
        {boon === 'pactOfTheBlade' && (
          <>
            <p className="app__paragraph">
              Puedes usar tu acción para crear un arma de pacto en tu mano
              vacía. Puedes elegir la forma que el arma cuerpo a cuerpo toma
              cada vez que la creas (mira el Capítulo 5 para ver las opciones de
              armas). Eres competente con ella mientras la blandes. Esta arma
              cuenta como mágica para el propósito de traspasar resistencias e
              inmunidades contra ataques y daño no mágicos.
            </p>
            <p className="app__paragraph">
              Tu arma de pacto desaparece si está a más de 5 pies (1,5 metros)
              de distancia de ti durante un minuto o más. También desaparece si
              usas este rasgo de nuevo, si descartas el arma (no requiere una
              acción), o si mueres.
            </p>
            <p className="app__paragraph">
              Puedes transformar un arma mágica en tu arma de pacto haciendo un
              ritual especial mientras sostienes tu arma. Llevas a cabo el
              ritual durante una hora, que puede ser realizado durante un
              descanso corto. Luego puedes descartar el arma, colocándola en un
              espacio extradimensional, y aparece siempre que creas tu arma de
              pacto a partir de entonces. No puedes afectar un artefacto o un
              arma inteligente de esta forma. El arma deja de ser tu arma de
              pacto si mueres, si realizas el ritual de una hora en un arma
              diferente o si llevas a cabo un ritual de una hora para romper tu
              vínculo con ella. El arma aparece a tus pies si está en el espacio
              extradimensional cuando el vínculo se rompe.
            </p>
          </>
        )}
        {boon === 'pactOfTheTome' && (
          <>
            <p className="app__paragraph">
              Tu patrón te da un grimorio llamado Libro de las Sombras. Cuando
              ganas este rasgo, elige tres trucos de la lista de cualquier
              clase. Mientras el libro está contigo, puedes lanzar estos tres
              trucos a voluntad. No cuentan para tu número de trucos conocidos.
            </p>
            <p className="app__paragraph">
              Si pierdes tu Libro de las Sombras, puedes llevar a cabo una
              ceremonia de una hora para recibir un reemplazo de tu patrón. Esta
              ceremonia puede ser realizada durante un descanso corto o
              prolongado, y destruye el libro anterior. El libro se vuelve
              cenizas cuando mueres.
            </p>
            {hasToLearnTomeSpells(pc) && (
              <div className="inventory-item__modal-buttons">
                <Link
                  to={`/characters/pc/${pc.id}/leveling/warlock/tomeSpells`}
                  className="inventory-item__modal-button"
                >
                  Escoge Trucos
                </Link>
              </div>
            )}
            {!hasToLearnTomeSpells(pc) && (
              <ul>
                {tomeSpells.map(spellName => (
                  <li>{translateSpell(spellName)}</li>
                ))}
                {tomeRituals.map(spellName => (
                  <li>{translateSpell(spellName)} (Ritual)</li>
                ))}
              </ul>
            )}
          </>
        )}
      </>
    );
  },

  mistyEscape: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 6 puedes desvanecerte en una cortina de humo en
        respuesta al daño. Cuando recibes daño, puedes usar tu reacción para
        volverte invisible y teletransportarte hasta 60 pies (18 metros) hacia
        un espacio desocupado que puedas ver. Permaneces invisible hasta el
        comienzo de tu siguiente turno o hasta que ataques o lances un conjuro.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo nuevamente hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  darkOnesOwnLuck: (skill, pc) => (
    <>
      <p>
        A partir del nivel 6 puedes pedir a tu patrón que altere el destino en
        tu favor. Cuando realizas una prueba de habilidad o una tirada de
        salvación, puedes usar este rasgo para añadir un d10 a tu tirada. Puedes
        hacerlo después de ver la tirada inicial, pero antes de que ocurran los
        efectos de la tirada.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo de nuevo hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  entropicWard: (skill, pc) => (
    <>
      <p>
        A partir del nivel 6 aprendes a protegerte mágicamente contra un ataque
        y devolver un golpe fallado de tu enemigo convirtiéndolo en un golpe de
        suerte para ti. Cuando una criatura hace una tirada de ataque contra ti,
        puedes usar tu reacción para imponerle desventaja en esa tirada. Si el
        ataque falla, tu próxima tirada de ataque contra esa criatura tiene
        ventaja si la realizas antes del final de tu siguiente turno.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo de nuevo hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  beguilingDefenses: (skill, pc) => (
    <p>
      Comenzando en el nivel 10 tu patrón te enseña a volver la magia que lanzan
      tus oponentes, y que afecta a la mente, en su contra. Eres inmune a ser
      encantado, y cuando otra criatura intenta encantarte, puedes usar tu
      reacción para devolverle el hechizo. La criatura debe tener éxito en una
      tirada de salvación de Sabiduría contra la CD de tus conjuros de brujo o
      pasa a estar encantada por ti durante un minuto o hasta que reciba
      cualquier daño.
    </p>
  ),

  fiendishResilience: (skill, pc) => (
    <p>
      Comenzando en el nivel 10 puedes elegir un tipo de daño cuando finalizas
      un descanso corto. Ganas resistencia a ese tipo de daño hasta que elijas
      otro mediante este rasgo. El daño por armas mágicas o de plata ignora esta
      resistencia.
    </p>
  ),

  thoughtShield: (skill, pc) => (
    <p>
      Comenzando al nivel 10 tus pensamientos no pueden ser leídos mediante
      telepatía u otros medios, a menos que lo permitas. También ganas
      resistencia al daño psíquico y siempre que una criatura te haga daño
      psíquico, esa criatura recibe la misma cantidad de daño que tú hayas
      recibido.
    </p>
  ),

  mysticArcanum: (skill, pc) => {
    return (
      <>
        <p>
          A partir del nivel 11 tu patrón te recompensa con un secreto mágico
          llamado arcanum. Elige un conjuro de nivel 6 de la lista de conjuros
          del brujo como arcanum.
        </p>
        <p>
          Puedes lanzar tu arcanum una vez sin gastar un espacio de conjuro.
          Debes finalizar un descanso prolongado para poder lanzarlo de nuevo.
        </p>
        <p>
          A niveles superiores, ganas más conjuros de brujo de tu elección que
          pueden ser lanzados de esta manera. Un conjuro de nivel 7 en el nivel
          13, un conjuro de nivel 8 en el nivel 15 y un conjuro de nivel 9 en el
          nivel 17. Recobras todos los usos de tu Arcanum Místico cuando
          finalizas un descanso prolongado.
        </p>

        {hasToLearnArcanum(pc) && (
          <div className="inventory-item__modal-buttons">
            <Link
              to={`/characters/pc/${pc.id}/leveling/warlock/arcanum`}
              className="inventory-item__modal-button"
            >
              Elige Conjuro
            </Link>
          </div>
        )}
        {!hasToLearnArcanum(pc) && (
          <ul>
            {getArcanum(pc).map(spellName => (
              <li>{translateSpell(spellName)}</li>
            ))}
          </ul>
        )}
      </>
    );
  },

  darkDelirium: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 14 puedes zambullir a una criatura en un reino
        ilusorio. Como una acción, elige una criatura que puedas ver en un rango
        de 60 pies (18 metros) de ti. Debe realizar una tirada de salvación de
        Sabiduría contra la CD de tus conjuros de brujo (
        {getSpellSavingThrow(pc)}). Si falla la tirada de salvación, pasa a
        estar hechizada o asustada por ti (a tu elección) durante un minuto o
        hasta que tu concentración se rompa (como si estuvieses concentrándote
        en un conjuro). Este efecto termina si la criatura recibe cualquier
        daño.
      </p>
      <p>
        Hasta que la ilusión finaliza la criatura piensa que está perdida en un
        reino brumoso con la apariencia que elijas. La criatura sólo puede ver y
        escucharse a sí misma, a ti y a la ilusión.
      </p>
      <p>
        Debes finalizar un descanso corto o prolongado antes de que puedas usar
        este rasgo de nuevo.
      </p>
    </>
  ),

  hurlThroughHell: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 14 cuando golpeas a una criatura con un ataque,
        puedes usar este rasgo para transportar inmediatamente al objetivo a
        través de los planos inferiores. La criatura desaparece y atraviesa un
        paisaje de pesadilla.
      </p>
      <p>
        Al final de tu siguiente turno, la criatura aparece en el espacio que
        ocupaba previamente, o en el espacio desocupado más cercano. Si el
        objetivo no es un diablo, recibe 10d10 de daño psíquico mientras se
        recupera de su terrible experiencia.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo de nuevo hasta que
        finalices un descanso prolongado.
      </p>
    </>
  ),

  createThrall: (skill, pc) => (
    <>
      <p>
        A partir del nivel 14 ganas la habilidad de infectar la mente de un
        humanoide con la magia exterior de tu patrón. Puedes usar tu acción para
        tocar a un humanoide incapacitado. Esa criatura pasa a estar encantada
        por ti hasta que sea afectada por un conjuro de quitar maldición, la
        condición de encantado sea eliminada o uses este rasgo de nuevo.
      </p>
      <p>
        Puedes comunicarte telepáticamente con la criatura hechizada mientras
        los dos estéis en el mismo plano de existencia.
      </p>
    </>
  ),

  eldritchMaster: (skill, pc) => (
    <>
      <p>
        A partir del nivel 20 puedes explotar tu reserva interna de poder
        místico mientras ruegas a tu patrón para recuperar los espacios de
        conjuro gastados. Debes pasar un minuto rogando a tu patrón para que te
        ayude a recobrar todos tus espacios gastados de tu rasgo Magia de Pacto.
        Una vez que recobras espacios de conjuro de esta forma, debes finalizar
        un descanso prolongado antes de que puedas hacerlo de nuevo
      </p>
    </>
  ),
};

export function getInvocationExplanation(invocationName, invocationTitle, pc) {
  switch (invocationName) {
    case 'armorOfShadows':
      return (
        <p>
          Puedes lanzar armadura de mago sobre ti mismo a voluntad, sin gastar
          un espacio de conjuro o componentes materiales.
        </p>
      );
    case 'chainsOfCarceri':
      return (
        <p>
          Puedes lanzar inmovilizar monstruo a voluntad (teniendo como objetivo
          un diablo, un celestial o un elemental) sin gastar un espacio de
          conjuro o componentes materiales. Debes finalizar un descanso
          prolongado antes de que puedas usar esta invocación de nuevo en la
          misma criatura
        </p>
      );
    case 'lifedrinker':
      return (
        <p>
          Cuando golpeas a una criatura con tu arma de pacto, la criatura recibe{' '}
          {increment(getStatMod(getStat(pc, 'cha')))} daño necrótico adicional
          equivalente a tu modificador de Carisma (mínimo 1).
        </p>
      );
    case 'sculptorOfFlesh':
      return (
        <p>
          Puedes lanzar polimorfar una vez, usando un espacio de conjuro de
          brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado
        </p>
      );
    case 'thirstingBlade':
      return (
        <p>
          Puedes atacar con tu arma de pacto dos veces en lugar de una cuando
          usas la acción de atacar en tu turno.
        </p>
      );
    case 'agonizingBlast':
      return (
        <p>
          Cuando lanzas estallido arcano, agrega tu modificador de Carisma (
          {increment(getStatMod(getStat(pc, 'cha')))}) al daño que haces al
          golpear.
        </p>
      );
    case 'repellingBlast':
      return (
        <p>
          Cuando golpeas a una criatura con tu estallido arcano, puedes empujar
          a esa criatura 10 pies (3 metros) lejos de ti en línea recta.
        </p>
      );
    case 'beguilingInfluence':
      return <p>Ganas competencia en las habilidades Engañar y Persuasión.</p>;
    case 'thiefOfFiveFates':
      return (
        <p>
          Puedes lanzar perdición una vez, usando un espacio de conjuro de
          brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado.
        </p>
      );
    case 'eldritchSpear':
      return (
        <p>
          Cuando lanzas estallido arcano, su rango es de 300 pies (91,5 metros).
        </p>
      );
    case 'beastSpeech':
      return (
        <p>
          Puedes lanzar hablar con los animales a voluntad, sin gastar un
          espacio de conjuro o componentes materiales.
        </p>
      );
    case 'bookOfAncientSecrets':
      const tomeRituals = getTomeRituals(pc);
      return (
        <>
          <p>
            Ahora puedes inscribir rituales mágicos en tu Libro de las Sombras.
            Elige dos conjuros de nivel 1 que tengan el descriptor ritual de la
            lista de conjuros de cualquier clase. Los conjuros aparecen en el
            libro y no cuentan para el número de conjuros que conoces. Con el
            Libro de las Sombras en tu mano, puedes lanzar los conjuros
            seleccionados como rituales. No puedes lanzarlos de otra manera que
            no sea como rituales, a menos que los hayas aprendido por otros
            medios. También puedes lanzar un conjuro de brujo que conozcas como
            ritual si tiene el descriptor ritual.
          </p>
          <p>
            En tus aventuras, puedes agregar otros conjuros rituales a tu Libro
            de las Sombras. Cuando encuentres dichos conjuros, puedes añadirlos
            a tu libro si el nivel de conjuro es equivalente o menor a la mitad
            de tu nivel de brujo (redondeado hacia arriba) y puedes permitirte
            el tiempo para transcribir el conjuro. Por cada nivel de conjuro, el
            proceso de transcripción lleva 2 horas y cuesta 50 po por las raras
            tintas necesarias para inscribirlo.
          </p>

          {hasToLearnTomeRituals(pc) && (
            <div className="inventory-item__modal-buttons">
              <Link
                to={`/characters/pc/${pc.id}/leveling/warlock/tomeRituals`}
                className="inventory-item__modal-button"
              >
                Escoge Rituales
              </Link>
            </div>
          )}

          {!hasToLearnTomeRituals(pc) && (
            <ul>
              {tomeRituals.map(spellName => (
                <li>{translateSpell(spellName)}</li>
              ))}
            </ul>
          )}
        </>
      );
    case 'masterOfMyriadForms':
      return (
        <p>
          Puedes lanzar el conjuro alterar el propio aspecto a voluntad, sin
          gastar un espacio de conjuro.
        </p>
      );
    case 'maskOfManyFaces':
      return (
        <p>
          Puedes lanzar disfrazarse a voluntad, sin gastar un espacio de
          conjuro.
        </p>
      );
    case 'gazeOfTwoMinds':
      return (
        <p>
          Puedes usar tu acción para tocar a un humanoide dispuesto y percibir a
          través de sus sentidos hasta el final de tu siguiente turno. Mientras
          la criatura esté en el mismo plano de existencia que tú, puedes usar
          tu acción en los turnos subsiguientes para mantener esta conexión,
          extendiendo la duración hasta el fin de tu siguiente turno. Mientras
          percibes a través de los sentidos de otra criatura te beneficias de
          cualquier sentido especial que esa criatura posea, y te encuentras
          ciego y sordo de tu propio alrededor.
        </p>
      );
    case 'eyesOfTheRuneKeeper':
      return <p>Puedes leer todas las escrituras.</p>;
    case 'dreadfulWord':
      return (
        <p>
          Puedes lanzar confusión una vez usando un espacio de conjuro de brujo.
          No puedes hacerlo de nuevo hasta que finalices un descanso prolongado.
        </p>
      );
    case 'ascendantStep':
      return (
        <p>
          Puedes lanzar levitar sobre ti mismo a voluntad, sin gastar un espacio
          de conjuro o componentes materiales.
        </p>
      );
    case 'otherworldlyLeap':
      return (
        <p>
          Puedes lanzar salto sobre ti mismo a voluntad, sin gastar un espacio
          de conjuro o componentes materiales.
        </p>
      );
    case 'signOfIllOmen':
      return (
        <p>
          Puedes conjurar lanzar maldición una vez usando un espacio de conjuro
          de brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado.
        </p>
      );
    case 'minionsOfChaos':
      return (
        <p>
          Puedes lanzar invocar elemental una vez, usando un espacio de conjuro
          de brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado.
        </p>
      );
    case 'mireTheMind':
      return (
        <p>
          Puedes lanzar ralentizar una vez usando un espacio de conjuro de
          brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado.
        </p>
      );
    case 'whispersOfTheGrave':
      return (
        <p>
          Puedes lanzar hablar con los muertos a voluntad, sin gastar un espacio
          de conjuro.
        </p>
      );
    case 'bewitchingWhispers':
      return (
        <p>
          Puedes lanzar compulsión una vez usando un espacio de conjuro de
          brujo. No puedes hacerlo de nuevo hasta que finalices un descanso
          prolongado.
        </p>
      );
    case 'oneWithShadows':
      return (
        <p>
          Cuando estés en un área de luz tenue u oscuridad, puedes usar tu
          acción para volverte invisible hasta que te muevas o uses una acción o
          una reacción.
        </p>
      );
    case 'fiendishVigor':
      return (
        <p>
          Puedes lanzar vida falsa sobre ti mismo a voluntad como un conjuro de
          nivel 1 sin gastar componentes de conjuro o componentes materiales.
        </p>
      );
    case 'mistyVisions':
      return (
        <p>
          Puedes lanzar imagen silenciosa a voluntad, sin gastar un espacio de
          conjuro o componentes materiales.
        </p>
      );
    case 'visionsOfDistantRealms':
      return (
        <p>
          Puedes lanzar ojo arcano a voluntad, sin gastar un espacio de conjuro.
        </p>
      );
    case 'eldritchSight':
      return (
        <p>
          Puedes lanzar detectar magia a voluntad, sin gastar un espacio de
          conjuro o componentes materiales.
        </p>
      );
    case 'witchSight':
      return (
        <p>
          Puedes ver la verdadera forma de cualquier cambiaformas o criatura
          disfrazada mediante magia de ilusión o transmutación mientras la
          criatura esté en tu línea de visión y en un rango de 30 pies (9
          metros) de ti.
        </p>
      );
    case "devil'sSight":
      return (
        <p>
          Puedes ver normalmente en la oscuridad, tanto mágica como normal, a
          una distancia de 120 pies (36 metros).
        </p>
      );
    case 'voiceOfTheChainMaster':
      return (
        <p>
          Puedes comunicarte telepáticamente con tu familiar y percibir a través
          de sus sentidos mientras estéis en el mismo plano de existencia.
          Además, mientras percibes a través de los sentidos de tu familiar,
          también puedes hablar a través de él con tu propia voz, incluso si tu
          familiar es incapaz de hablar.
        </p>
      );

    default:
      break;
  }
}
