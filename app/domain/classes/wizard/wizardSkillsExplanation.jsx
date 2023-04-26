import { Link } from '@remix-run/react';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { getArcaneTradition } from './wizard';

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
