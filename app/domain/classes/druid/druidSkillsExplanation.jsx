import { Link } from '@remix-run/react';
import { getSpellSavingThrow, translateSpell } from '~/domain/spells/spells';
import {
  getBonusCantrip,
  getDruidCircle,
  getDruidLandCircle,
  translateDruidLandCircle,
} from './druid';
import { getDruidExtraPreparedSpells } from '~/domain/spells/druid';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const DRUID_SKILLS_EXPLANATION = {
  wildShape: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 2 puedes utilizar tu acción para asumir
        mágicamente la forma de una bestia que has visto antes. Puede utilizar
        esta habilidad dos veces. Recuperas los usos gastados cuando terminas un
        descanso corto o largo.
      </p>
      <p>
        Tu nivel de druida determina en qué bestias puedes transformarte, como
        se muestra en la tabla Formas Salvajes: puedes transformarte en
        cualquier animal con un{' '}
        {getDruidCircle(pc) === 'moon' ? (
          // moon
          pc.level >= 8 ? (
            <strong>
              <u>CR {Math.floor(pc.level / 3)} o menor</u>
            </strong>
          ) : pc.level >= 6 ? (
            <strong>
              <u>CR {Math.floor(pc.level / 3)} o menor sin vuelo</u>
            </strong>
          ) : pc.level >= 4 ? (
            <strong>
              <u>CR 1 sin vuelo</u>
            </strong>
          ) : (
            <strong>
              <u>CR 1 sin vuelo ni nado</u>
            </strong>
          )
        ) : // land
        pc.level >= 8 ? (
          <strong>
            <u>CR 1 o menor</u>
          </strong>
        ) : pc.level >= 4 ? (
          <strong>
            <u>CR 1/2 o menor sin vuelo</u>
          </strong>
        ) : (
          <strong>
            <u>CR 1/4 o menor sin vuelo ni nado</u>
          </strong>
        )}
      </p>
      <p>
        Puedes permanecer en forma de bestia durante {Math.floor(pc.level)}{' '}
        horas (igual a la mitad de tu nivel de druida, redondeando hacia abajo).
        Después vuelves a tu forma natural, a menos que gastes otro uso de esta
        habilidad. Podrás volver a tu forma natural como acción gratuita en tu
        turno. También vuelves automáticamente a tu forma natural si caes
        inconsciente, te reducen a 0 Puntos de Golpe o mueres.
      </p>
      <p>Mientras estés transformado se te aplican las siguientes reglas:</p>
      <ul>
        <li>
          Las estadísticas de tu personaje se sustituyen por las estadísticas de
          la bestia, pero se conserva tu alineamiento, personalidad y tus
          puntuaciones de característica de Inteligencia, Sabiduría, y Carisma.
          También conservas todas tus competencias en habilidades y tiradas de
          salvación, además de ganar las de la criatura. Si la criatura es
          competente en la misma habilidad que tú y su bonificador de
          competencia es mayor que el tuyo, utiliza el bonificador de
          competencia de la criatura en lugar del tuyo. Si la criatura tiene
          cualquier acción legendaria o acciones de guarida, no podrás
          utilizarlos.
        </li>
        <li>
          Al transformarte, asumes los Puntos de Golpe de la bestia y sus Dados
          de Golpe. Cuando vuelves a tu forma normal regresas con el número de
          Puntos de Golpe que tenías antes de estar transformado. Sin embargo,
          si vuelves como resultado de que te hayan reducido a 0 Puntos de
          Golpe, todo el daño restante de esa cantidad se transfiere a tu forma
          natural. Por ejemplo, si recibes 10 puntos de daño en tu forma animal
          pero solamente te quedaba 1 punto de golpe, vuelves a tu forma natural
          y recibes 9 puntos de daño. Mientras el exceso de daño no reduzca los
          Puntos de Golpe de tu forma natural a 0, no terminarás tumbado e
          inconsciente.
        </li>
        <li>
          No puedes lanzar hechizos, y tu capacidad para hablar o realizar
          cualquier acción que requiera las manos se limitará a las capacidades
          de tu forma bestial. Transformarte no rompe tu concentración para un
          hechizo que ya hayas lanzado, sin embargo, te impide realizar acciones
          que formen parte de un hechizo, como un conjuro de llamar al
          relámpago, que ya conjuraste.
        </li>
        <li>
          Conservas los beneficios de cualquier rasgo de tu clase, raza, u otra
          fuente y podrás utilizarlos si la nueva forma es físicamente capaz de
          hacerlo. Sin embargo, no se podrán utilizar cualquiera de los sentidos
          especiales, como visión en la oscuridad, a menos que la nueva forma
          también tenga ese sentido.
        </li>
        <li>
          Tú decides si tu equipo cae al suelo en tu espacio, se funde en tu
          nueva forma, o es usado por ella. Las funciones del equipo se
          mantienen de forma normal, pero el DM decide si es práctico para la
          nueva forma llevar una pieza de equipo, basándose en la forma y el
          tamaño de la criatura. Tu equipo no cambia de tamaño o forma para que
          coincida con tu nueva forma, y cualquier equipo que la nueva forma no
          pueda usar o bien debe caer al suelo o fusionarse contigo. El equipo
          que se funde contigo queda inutilizable hasta que vuelvas a
          transformarte.
        </li>
      </ul>
    </>
  ),

  druidCircle: (skill, pc) => (
    <>
      <p>
        A partir del nivel 2 eliges identificarte con un círculo druídico: el
        Círculo de la Tierra o el Círculo de la Luna, ambos detallados al final
        de la descripción de la clase. Tu elección te otorga habilidades en el
        nivel 2 y de nuevo al nivel 6, 10 y 14.
      </p>

      <div className="inventory-item__modal-buttons">
        <Link
          to={`/characters/pc/${pc.id}/leveling/druid/druidCircle`}
          className="inventory-item__modal-button"
        >
          Escoge Círculo Druídico
        </Link>
      </div>
    </>
  ),

  bonusCantrip: (skill, pc) => (
    <>
      <p>
        Cuando eliges este círculo en nivel 2 puedes aprender un truco de druida
        adicional de tu elección.
      </p>

      {!getBonusCantrip(pc) && (
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/druid/bonusCantrip`}
            className="inventory-item__modal-button"
          >
            Escoge Truco Adicional
          </Link>
        </div>
      )}

      {!!getBonusCantrip(pc) && (
        <p>
          <strong>{translateSpell(getBonusCantrip(pc)?.name)}</strong>
        </p>
      )}
    </>
  ),

  naturalRecovery: (skill, pc) => (
    <p>
      A partir del nivel 2 puedes recuperar algo de tu energía mágica sentándote
      en meditación y comunión con la naturaleza. Durante un descanso breve,
      eliges espacios de conjuro gastados para recuperarlos.{' '}
      <strong>
        <u>
          Los espacios de conjuro pueden tener un nivel combinado igual o
          inferior a {Math.ceil(pc.level / 2)}
        </u>
      </strong>{' '}
      (la mitad de tu nivel de druida, redondeado hacia arriba), y ninguno de
      los espacios pueden ser de nivel 6 o superior. No puedes utilizar este
      rasgo de nuevo hasta que termines un descanso prolongado. Por ejemplo, si
      eres un druida de nivel 4 puedes recuperar hasta dos niveles en espacios
      de conjuro. Puedes recuperar un espacio de conjuro de nivel 2 o dos
      espacios de nivel 1.
    </p>
  ),

  combatWildShape: (skill, pc) => (
    <p>
      Cuando eliges este círculo al nivel 2 obtienes la habilidad de utilizar tu
      Forma Salvaje en tu turno como una acción adicional, en lugar de como una
      acción normal.Además, mientras estás transformado en la forma salvaje
      puedes utilizar una acción adicional para gastar un espacio de conjuro y
      recuperar 1d8 Puntos de Golpe por nivel del espacio de conjuro gastado.
    </p>
  ),

  circleForms: (skill, pc) => (
    <>
      <p>
        Los ritos de tu círculo te otorgan la capacidad de transformarte en
        formas animales más peligrosas. A partir del nivel 2 puedes utilizar tu
        Forma Salvaje para transformarte en una bestia con un valor de desafío 1
        (ignoras la columna de VD máximo de la tabla Formas Salvajes, pero debe
        cumplir con las otras limitaciones existentes).
      </p>
      <p>
        A partir del nivel 6 puedes transformarte en una bestia con un valor de
        desafío equivalente a un tercio de tu nivel de druida, redondeando hacia
        abajo.
      </p>
    </>
  ),

  landCircle: (skill, pc) => (
    <>
      <p>
        Tu conexión mística con la tierra te imbuye con la habilidad de lanzar
        ciertos conjuros. Al nivel 3, 5, 7 y 9 accedes a conjuros del círculo
        relacionados con la tierra en la que te convertiste en un druida. Elige
        una tierra —ártico, bosque, costa, desierto, infraoscuridad, montaña,
        pantano, o prado— y consulta la lista de conjuros asociados.
      </p>
      <p>
        Una vez que adquieras acceso a un conjuro del círculo, siempre lo tienes
        preparado y no cuenta para el número de conjuros que puedes preparar
        cada día. Si tienes acceso a un conjuro que no aparece en la lista del
        druida, no obstante cuenta como un conjuro de druida para ti.
      </p>

      {!getDruidLandCircle(pc) && (
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/druid/landCircle`}
            className="inventory-item__modal-button"
          >
            Escoge Círculo de la Tierra
          </Link>
        </div>
      )}

      {!!getDruidLandCircle(pc) && (
        <p>
          <strong>{translateDruidLandCircle(getDruidLandCircle(pc))}</strong>
          <ul>
            {getDruidExtraPreparedSpells(pc).map(spell => (
              <li>{translateSpell(spell.name)}</li>
            ))}
          </ul>
        </p>
      )}
    </>
  ),

  landsStride: (skill, pc) => (
    <>
      <p>
        A partir del nivel 6 moverte a través de terreno difícil no mágico no
        requiere de movimiento adicional. También puedes pasar a través de las
        plantas no mágicas sin ser frenado por ellas y sin recibir daño si
        tienen espinas, zarzas o un peligro similar
      </p>
      <p>
        Además, tienes ventaja en las tiradas de salvación contra las plantas
        que son creadas o manipuladas mágicamente para impedir el movimiento,
        como las creadas por el conjuro enmarañar.
      </p>
    </>
  ),

  primalStrike: (skill, pc) => (
    <p>
      Al llegar al nivel 6 los ataques de tu forma bestial cuentan como mágicos
      a la hora de superar la resistencia e inmunidad para ataques y daño no
      mágico.
    </p>
  ),

  naturesWard: (skill, pc) => (
    <p>
      Al alcanzar el nivel 10 no puedes ser encantado o asustado por elementales
      o criaturas feéricas y eres inmune al veneno y la enfermedad.
    </p>
  ),

  elementalWildShape: (skill, pc) => (
    <p>
      Al llegar al nivel 10 puedes emplear dos usos de tu <u>Forma Salvaje</u> a
      la vez para transformarte en un elemental de aire, de tierra, de fuego o
      de agua.
    </p>
  ),

  naturesSanctuary: (skill, pc) => (
    <>
      <p>
        Al llegar al nivel 14 las criaturas del mundo natural sienten tu
        conexión con la naturaleza y se vuelven reacios a atacarte. Cuando un
        animal o una planta te ataquen deberán realizar una tirada de salvación
        de Sabiduría contra la CD de salvación de tus conjuros (
        {getSpellSavingThrow(pc)}). En una tirada fallida la criatura deberá
        elegir un objetivo diferente o el ataque fallará automáticamente. Si
        supera la salvación la criatura es inmune a este efecto durante 24
        horas.
      </p>
      <p>
        La criatura es consciente de este efecto antes de que haga su ataque
        contra ti.
      </p>
    </>
  ),

  thousandForms: (skill, pc) => (
    <p>
      Cuando llegues nivel 14 habrás aprendido a usar la magia para alterar tu
      aspecto físico de otras maneras. Puedes lanzar{' '}
      <em>
        <u>alterar el propio aspecto</u>
      </em>{' '}
      a voluntad.
    </p>
  ),

  timelessBody: (skill, pc) => (
    <p>
      A partir del nivel 18 la magia primigenia que manejas hace que envejezcas
      lentamente. Por cada 10 años que pasan, tu cuerpo envejece sólo 1 año.
    </p>
  ),

  beastSpells: (skill, pc) => (
    <p>
      Comenzando en el nivel 18 puedes lanzar muchos de tus conjuros de druida
      en cualquier forma que asumas por el uso de tu Forma Salvaje. Puedes
      realizar los componentes somáticos y verbales de un conjuro de druida
      mientras estás en forma bestial pero no eres capaz de proporcionar los
      componentes materiales.
    </p>
  ),

  archdruid: (skill, pc) => (
    <>
      <p>
        A partir del nivel 20 puedes usar tu rasgo de Forma Salvaje de manera
        ilimitada.
      </p>
      <p>
        Además, puedes ignorar los componentes verbales y somáticos de tus
        hechizos de druida, así como los componentes materiales que carecen de
        coste y no son consumidos por el hechizo. Ganas este beneficio tanto en
        tu forma natural como en tu forma salvaje.
      </p>
    </>
  ),
};
