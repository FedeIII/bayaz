import { Link } from '@remix-run/react';

import styles from '~/components/modal/inventoryItem.module.css';
import {
  CLASSES,
  getExpertSkills,
  hasToSelectExpertSkills,
  translateSkill,
} from '../characters';
import { translateSpell } from '../spells/spells';
import {
  getAllLoreSpellsLearned,
  getAllMagicalSecretsSpellsLearned,
  getLoreCollegeProficiencies,
  hasToLearnMagicalSecretsSpells,
} from './bard';

export const BARD_SKILLS_EXPLANATION = {
  bardicInspiration: (skill, pc) => (
    <>
      <p>
        Puedes inspirar a otros a través de palabras estimulantes o de la
        música. Para hacerlo, usas una acción adicional en tu turno para elegir
        una criatura distinta de ti mismo dentro de un rango de 60 pies (18
        metros) y que pueda escucharte. Esa criatura gana un dado de Inspiración
        de Bardo, un{' '}
        {pc.level >= 15
          ? 'd12'
          : pc.level >= 10
          ? 'd10'
          : pc.level >= 5
          ? 'd8'
          : 'd6'}
        .
      </p>
      <p>
        Una vez, dentro de los siguientes 10 minutos, esa criatura puede tirar
        el dado y agregar el resultado a una prueba de habilidad, una tirada de
        ataque o de salvación que haga. La criatura puede esperar a ver el
        resultado del d20 antes de decidir usar el dado de Inspiración de Bardo,
        pero debe hacerlo antes de que el DM diga si la tirada tuvo éxito o no.
        Una vez que el dado de Inspiración de Bardo es usado, se pierde. Una
        criatura sólo puede tener un dado de Inspiración de Bardo a la vez.
      </p>
      <p>
        Puedes usar este rasgo una cantidad de veces equivalente a tu
        modificador de Carisma (mínimo 1). Recuperas todos los usos gastados
        cuando terminas un descanso prolongado.
      </p>
      <p>
        Tu dado de Inspiración de Bardo cambia cuando alcanzas determinados
        niveles. El dado se convierte en 1d8 al nivel 5, en 1d10 al nivel 10 y
        en 1d12 al nivel 15.
      </p>

      {pc.level >= 5 && (
        <>
          <h3>{CLASSES.bard.leveling[5].traits.fontOfInspiration}</h3>
          <p>{BARD_SKILLS_EXPLANATION.fontOfInspiration()}</p>
        </>
      )}
    </>
  ),

  jackOfAllTrades: () => (
    <p>
      Empezando en el nivel 2, puedes añadir la mitad de tu bonificador de
      competencia, redondeado hacia abajo, a cualquier prueba de habilidad que
      realices que no incluya ya tu bonificador de competencia.
    </p>
  ),

  songOfRest: () => (
    <>
      <p>
        Empezando al nivel 2, puedes usar música o una oración reconfortante
        para ayudar a revitalizar a tus aliados heridos durante un descanso
        corto. Si tú o cualquier criatura amistosa que escucha tu interpretación
        recobra Puntos de Golpe al final del descanso corto, esa criatura
        recupera 1d6 de puntos adicionales.
      </p>
      <p>
        Los Puntos de Golpe extra se incrementan cuando alcanzas determinados
        niveles en esta clase: 1d8 al nivel 9, 1d10 al nivel 13 y 1d12 al nivel
        17.
      </p>
    </>
  ),

  bardCollege: (skill, pc) => (
    <>
      <p>
        A partir del nivel 3 ahondas en las técnicas avanzadas de un Colegio de
        Bardo de tu elección: El Colegio del Conocimiento o el Colegio del
        Valor, ambos detallados a continuación. Tu elección te proporciona
        rasgos en el nivel 3 y nuevamente en el nivel 6 y en el 14.
      </p>

      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/bard/bardCollege`}
          className={styles.modalButton}
        >
          Escoge Colegio de Bardo
        </Link>
      </div>
    </>
  ),

  loreBonusProficiencies: (skill, pc) => {
    const loreCollegeProficiencies = getLoreCollegeProficiencies(pc);

    return (
      <>
        <p>
          Cuando te unes al Colegio del Conocimiento en el nivel 3, ganas
          competencia con tres habilidades de tu elección.
        </p>

        {!loreCollegeProficiencies.length && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/bard/loreBonusProficiencies`}
              className={styles.modalButton}
            >
              Escoge habilidades
            </Link>
          </div>
        )}

        {!!loreCollegeProficiencies.length && (
          <p>
            Competente con:{' '}
            <ul>
              {loreCollegeProficiencies.map(skill => (
                <li>{translateSkill(skill)}</li>
              ))}
            </ul>
          </p>
        )}
      </>
    );
  },

  cuttingWords: () => (
    <p>
      En el nivel 3 también aprendes cómo usar tu ingenio para distraer,
      confundir y minar la confianza y competencia de otros. Cuando una criatura
      que puedes ver en un rango de 60 pies (18 metros) realiza una tirada de
      ataque, una prueba de habilidad o una tirada de daño, puedes usar tu
      reacción para gastar uno de tus usos de Inspiración de Bardo, tirando un
      dado de Inspiración de Bardo y restando el resultado a la tirada de la
      criatura. Puedes decidir usar este rasgo después de que la criatura haya
      realizado su prueba o tirada, pero antes de que el DM determine si la
      prueba de habilidad o la tirada de ataque tiene éxito o no, o antes de que
      la criatura calcule el daño. La criatura es inmune si no puede oírte o si
      es inmune al encantamiento.
    </p>
  ),

  valorBonusProficiencies: () => (
    <p>
      Cuando te unes al Colegio del Valor en el nivel 3, ganas competencia con
      armadura media, escudos y armas marciales.
    </p>
  ),

  combatInspiration: () => (
    <p>
      En el nivel 3 también aprendes a inspirar a otros en la batalla. Una
      criatura que tiene un dado de Inspiración de Bardo tuyo puede tirar ese
      dado y agregarlo a una tirada de daño. Alternativamente, cuando se realiza
      una tirada de ataque contra la criatura, esta puede usar su reacción para
      tirar el dado de Inspiración de Bardo y agregar el resultado a su CA
      contra el ataque, después de ver la tirada, pero antes de saber si esta
      acertó o no.
    </p>
  ),

  expertise: (skill, pc) => (
    <>
      <p>
        A partir del nivel 3 eliges dos de tus habilidades en las que seas
        competente. Tu bonificador de competencia para esas habilidades se
        duplica para cualquier prueba de habilidad que realices con ellas.
      </p>
      <p>
        Al nivel 10 eliges otras dos habilidades en las que seas competente que
        ganarán este beneficio.
      </p>

      {hasToSelectExpertSkills(pc) && (
        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/bard/expertSkills`}
            className={styles.modalButton}
          >
            Escoge habilidades
          </Link>
        </div>
      )}

      {!hasToSelectExpertSkills(pc) && (
        <ul>
          {getExpertSkills(pc).map(skillName => (
            <li>{translateSkill(skillName)}</li>
          ))}
        </ul>
      )}
    </>
  ),

  fontOfInspiration: () =>
    'A partir del nivel 5 recuperas todos tus usos de Inspiración de Bardo cuando terminas un descanso corto o prolongado.',

  countercharm: () => (
    <p>
      A partir del nivel 6 ganas la habilidad de usar notas musicales o palabras
      de poder para interrumpir efectos que afectan a la mente. Como una acción,
      puedes comenzar una interpretación que dura hasta el final de tu siguiente
      turno. Durante ese tiempo, tú y cualquier criatura amistosa en un rango de
      30 pies (9 metros) tienen ventaja en las tiradas de salvación para evitar
      ser asustados o encantados. Una criatura debe ser capaz de escucharte para
      ganar este beneficio. La interpretación finaliza de forma anticipada si
      eres incapacitado, silenciado, o si la terminas voluntariamente (no
      requiere una acción).
    </p>
  ),

  additionalMagicalSecrets: (skill, pc) => {
    const loreSpells = getAllLoreSpellsLearned(pc);
    return (
      <>
        <p>
          A partir del nivel 6 aprendes dos conjuros de cualquier clase.
          Cualquier conjuro que elijas debe ser de un nivel que puedas lanzar,
          como se muestra en la tabla Bardo, o un truco.
        </p>
        <p>
          Los conjuros elegidos cuentan como conjuros de bardo para ti, pero no
          cuentan para el total de Conjuros Conocidos de Bardo.
        </p>

        {!loreSpells.length && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/bard/loreSpells`}
              className={styles.modalButton}
            >
              Escoge Conjuros
            </Link>
          </div>
        )}

        {!!loreSpells.length && (
          <ul>
            {loreSpells.map(spell => (
              <li>
                {spell.forgotten ? (
                  <s>{translateSpell(spell.name)}</s>
                ) : (
                  translateSpell(spell.name)
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  },

  extraAttack: () => (
    <p>
      Empezando en el nivel 6, puedes atacar dos veces en lugar de una cuando
      realizas la acción de ataque en tu turno.
    </p>
  ),

  magicalSecrets: (skill, pc) => {
    const magicalSecretsSpells = getAllMagicalSecretsSpellsLearned(pc);
    return (
      <>
        <p>
          Para cuando alcanzas el nivel 10 has obtenido conocimiento mágico de
          un amplio espectro de disciplinas. Elige dos conjuros de cualquier
          clase, incluyendo la clase bardo. Cualquier conjuro que elijas debe
          ser de un nivel que puedas lanzar, como se muestra en la tabla Bardo,
          o un truco.
        </p>
        <p>
          Los conjuros elegidos cuentan como conjuros de bardo para ti y cuenta
          para el total de Conjuros Conocidos de Bardo.
        </p>
        <p>
          Aprendes dos conjuros adicionales de cualquier clase al nivel 14 y de
          nuevo en el 18.
        </p>

        {hasToLearnMagicalSecretsSpells(pc) && (
          <div className={styles.modalButtons}>
            <Link
              to={`/characters/pc/${pc.name}/leveling/bard/magicalSecrets`}
              className={styles.modalButton}
            >
              Escoge Conjuros
            </Link>
          </div>
        )}

        {!hasToLearnMagicalSecretsSpells(pc) && (
          <ul>
            {magicalSecretsSpells.map(spell => (
              <li>
                {spell.forgotten ? (
                  <s>{translateSpell(spell.name)}</s>
                ) : (
                  translateSpell(spell.name)
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  },

  peerlessSkill: () => (
    <p>
      Empezando en el nivel 14, cuando haces una prueba de habilidad, puedes
      gastar un uso de Inspiración de Bardo. Tira un dado de Inspiración de
      Bardo y agrega el resultado a tu prueba de habilidad. Puedes esperar a ver
      el resultado de la tirada antes de decidir usar el dado de Inspiración de
      Bardo, pero debes hacerlo antes de que el DM diga si la prueba tuvo éxito
      o no.
    </p>
  ),

  battleMagic: () => (
    <p>
      A partir del nivel 14 has dominado el arte de entretejer el lanzamiento de
      conjuros y el uso de las armas en un solo y armonioso acto. Cuando usas tu
      acción para lanzar un conjuro de bardo, puedes hacer un ataque con un arma
      como acción adicional.
    </p>
  ),

  superiorInspiration: () => (
    <p>
      A partir del nivel 20, cuando tiras iniciativa y no te quedan usos de
      Inspiración de Bardo, recuperas un uso.
    </p>
  ),
};
