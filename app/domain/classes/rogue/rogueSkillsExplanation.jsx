import { Link } from '@remix-run/react';
import { SNEAK_ATTACK_DAMAGE, getArcaneTricksterSpells } from './rogue';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { hasToLearnArcaneTricksterSpell } from '~/domain/spells/rogue';
import { getSpellSavingThrow, translateSpell } from '~/domain/spells/spells';

import styles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const ROGUE_SKILLS_EXPLANATION = {
  sneakAttack: (skill, pc) => (
    <>
      <p>
        Al comienzo del nivel 1 sabes cómo atacar sutilmente y aprovechar la
        distracción de tu oponente. Una vez por turno, si tienes ventaja en la
        tirada de ataque puedes infligir {SNEAK_ATTACK_DAMAGE[pc.level]} de daño
        extra a la criatura que golpees. El ataque debe usar un arma sutil o a
        distancia.
      </p>
      <p>
        No necesitas ventaja en la tirada de ataque para realizar un Ataque
        Furtivo si tu objetivo tiene otro adversario a 5 pies (1,5 metros) que
        no esté incapacitado y tú no tengas desventaja en esta tirada
      </p>
    </>
  ),

  thievesCant: (skill, pc) => (
    <>
      <p>
        Durante tu entrenamiento como pícaro, aprendes la jerga de ladrones, una
        mezcla de dialecto, argot y código secretos que te permite enviar
        mensajes en una conversación aparentemente normal. Solo otra criatura
        que conozca la germanía puede entender tales mensajes. Transmitir un
        mensaje de este tipo cuesta cuatro veces más que decir la misma idea
        directamente.
      </p>
      <p>
        Además, entiendes una serie de signos y símbolos que se usan para
        esconder mensajes cortos y sencillos, como si un área es peligrosa o es
        territorio de un gremio de ladrones, si hay un botín cerca o si las
        gentes que viven en la zona son presas fáciles u ofrecerán cobijo a un
        ladrón a la fuga.
      </p>
    </>
  ),

  cunningAction: (skill, pc) => (
    <p>
      Comenzando en el nivel 2 tu rapidez mental y agilidad permiten que te
      muevas y actúes rápidamente. Puedes utilizar una acción adicional en cada
      uno de tus turnos de combate. Puedes usar esta acción solamente para
      acciones de Carrera, Retirada o Esconderse.
    </p>
  ),

  roguishArchetype: (skill, pc) => {
    return (
      <>
        <p>
          En el nivel 3 eliges un arquetipo que se parezca a la forma en la que
          usas tus habilidades de pícaro: Ladrón, Asesino o Bribón Arcano, todos
          detallados al final de la descripción de la clase. Tu elección de
          arquetipo te ofrecerá rasgos a nivel 3 y de nuevo en los niveles 9, 13
          y 17.
        </p>
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/rogue/roguishArchetype`}
            className="inventory-item__modal-button"
          >
            Escoge Arquetipo
          </Link>
        </div>
      </>
    );
  },

  spellcasting: (skill, pc) => (
    <>
      <p>
        En los niveles 3, 8, 14 y 20 aprendes un conjuro que puede ser de
        cualquier escuela de magia.
      </p>

      {hasToLearnArcaneTricksterSpell(pc) && (
        <div className="inventory-item__modal-buttons">
          <Link
            to={`/characters/pc/${pc.id}/leveling/rogue/spellcasting`}
            className="inventory-item__modal-button"
          >
            Escoge Nuevo Conjuro
          </Link>
        </div>
      )}

      {!hasToLearnArcaneTricksterSpell(pc) && (
        <strong>
          {getArcaneTricksterSpells(pc)
            .map(s => translateSpell(s.name))
            .join(', ')}
        </strong>
      )}
    </>
  ),

  mageHandLegerdemain: (skill, pc) => (
    <>
      <p>
        Empezando en el nivel 3, cuando lanzas <u>mano de mago</u>, puedes hacer
        invisible la mano espectral y puedes hacer las siguientes tareas
        adicionales con ella:
      </p>
      <ul>
        <li>
          Puedes depositar un objeto que estés sosteniendo en un contenedor
          portado por otra criatura.
        </li>
        <li>
          Puedes coger un objeto de un contenedor portado por otra criatura.
        </li>
        <li>
          Puedes usar herramientas de ladrón a distancia para abrir cerraduras y
          desarmar trampas a distancia.
        </li>
      </ul>
      <p>
        Puedes realizar una de estos trucos sin ser percibido por una criatura
        si tienes éxito en una prueba de Destreza (Juego de Manos) enfrentada a
        una prueba de Sabiduría (Percepción) de la criatura
      </p>
      <p>
        Además, puedes utilizar la acción adicional que te brinda Acción Astuta
        para controlar la mano.
      </p>
    </>
  ),

  bonusProficiencies: (skill, pc) => (
    <p>
      Cuando eliges este arquetipo en el nivel 3 ganas competencia con el kit de
      disfraz y el kit de envenenador.
    </p>
  ),

  assassinate: (skill, pc) => (
    <p>
      Empezando en el nivel 3 eres aún más mortal cuando te anticipas a tus
      enemigos. Tienes <u>ventaja</u> en las tiradas de ataque realizadas contra
      cualquier criatura que no haya resuelto su turno aún. Además, cualquier
      golpe que inflijas contra una criatura sorprendida es un{' '}
      <u>golpe crítico</u>.
    </p>
  ),

  fastHands: (skill, pc) => (
    <p>
      Empezando al nivel 3 puedes usar la acción adicional que te otorga tu
      Acción Astuta para hacer una prueba de Destreza (Juego de Manos), usar tus
      herramientas de ladrón para desarmar una trampa o abrir una cerradura, o
      para ejecutar la acción de Usar un Objeto.
    </p>
  ),

  secondStoryWork: (skill, pc) => (
    <>
      <p>
        Cuando escoges este arquetipo al nivel 3 ganas la habilidad de trepar
        más rápido de lo normal; trepar ya no te costará movimiento extra.
      </p>
      <p>
        Además, cuando haces un salto en carrera la distancia que cubres se
        incrementa en {getStatMod(getStat(pc, 'dex'))} pies (igual a tu
        modificador de Destreza).
      </p>
    </>
  ),

  uncannyDodge: (skill, pc) => (
    <p>
      Empezando en el nivel 5, cuando un atacante que puedes ver te golpea con
      un ataque, puedes usar tu reacción para reducir a la mitad el daño que
      sufras.
    </p>
  ),

  evasion: (skill, pc) => (
    <p>
      Comenzando al nivel 7 puedes esquivar ágilmente algunos efectos de área
      como por ejemplo el ardiente aliento de un dragón rojo o un hechizo de
      tormenta de hielo. Cuando estás sometido a un efecto que te permite hacer
      una tirada de salvación de Destreza para sufrir solo la mitad de daño, en
      lugar de eso no sufres ningún daño si tienes éxito en la tirada de
      salvación y solo la mitad de daño si fallas la tirada.
    </p>
  ),

  magicalAmbush: (skill, pc) => (
    <p>
      Empezando en el nivel 9, si estás escondido de una criatura en el momento
      en que lanzas un conjuro sobre ella, la criatura tiene desventaja en
      cualquier tirada de salvación contra el conjuro este turno.
    </p>
  ),

  supremeSneak: (skill, pc) => (
    <p>
      Empezando al nivel 9 tienes ventaja en una prueba de{' '}
      <u>Destreza (Sigilo)</u> si no te mueves más de la mitad de tu velocidad
      en el mismo turno.
    </p>
  ),

  infiltrationExpertise: (skill, pc) => {
    <>
      <p>
        Empezando en el nivel 9 puedes crear falsas identidades para ti mismo de
        manera infalible. Debes emplear siete días y 25 po para establecer la
        historia, profesión y afiliaciones para crear una identidad. No puedes
        establecer una identidad que pertenezca a alguien más. Por ejemplo,
        podrías adquirir la vestimenta adecuada, cartas de introducción y
        certificaciones que parezcan oficiales para establecerte como miembro de
        un gremio de comerciantes de una ciudad remota y así poder acercarte a
        otros mercaderes adinerados.
      </p>
      <p>
        Entonces, si adoptas la nueva identidad como un disfraz, las demás
        criaturas creen que eres esa persona hasta que tengan un motivo obvio
        para no hacerlo.
      </p>
    </>;
  },

  reliableTalent: (skill, pc) => (
    <p>
      Al nivel 11 has refinado tus habilidades hasta casi la perfección. Siempre
      que hagas una prueba de característica que te permita añadir tu
      bonificador de competencia, si en la tirada d20 obtienes un 9 o menor
      puedes tratarlo como un 10.
    </p>
  ),

  versatileTrickster: (skill, pc) => (
    <p>
      Al nivel 13 ganas la habilidad de distraer objetivos con tu mano de mago.
      Como una acción adicional en tu turno puedes designar una criatura que no
      esté a más de 5 pies (1,5 metros) de la mano espectral creada por el
      hechizo. Hacerlo te proporciona ventaja en las tiradas de ataque contra
      esa criatura hasta el final del turno
    </p>
  ),

  useMagicDevice: (skill, pc) => (
    <p>
      Al nivel 13 has aprendido tanto sobre cómo funciona la magia que puedes
      improvisar el uso de objetos incluso cuando no están pensados para que tú
      puedas usarlos. Ignoras todos los requisitos de clase, raza y nivel para
      el uso de objetos mágicos.
    </p>
  ),

  impostor: (skill, pc) => (
    <>
      <p>
        Al nivel 13 ganas la habilidad para imitar el habla, la escritura y el
        comportamiento de otra persona. Debes emplear al menos tres horas
        estudiando estos tres componentes del comportamiento de una persona,
        escuchándola hablar, examinando su escritura y observando sus
        peculiaridades.
      </p>
      <p>
        Tu ardid es indiscernible frente al observador casual. Si una criatura
        alerta sospecha que algo está mal, tienes ventaja en cualquier{' '}
        <u>tirada de Carisma (Engañar)</u> para evitar ser detectado.
      </p>
    </>
  ),

  blindsense: (skill, pc) => (
    <p>
      Empezando al nivel 14, si eres capaz de oír, eres consciente de dónde se
      encuentra cualquier criatura escondida o invisible a 10 pies (3 metros) o
      menos de ti.
    </p>
  ),

  slipperyMind: (skill, pc) => (
    <p>
      Al nivel 15 has adquirido una fuerza mental excepcional. Obtienes
      competencia en tiradas de salvación de Sabiduría.
    </p>
  ),

  spellThief: (skill, pc) => (
    <>
      <p>
        Al nivel 17 ganas la habilidad de robar mágicamente el conocimiento para
        lanzar un conjuro de otro lanzador de conjuros.
      </p>
      <p>
        Inmediatamente después de que una criatura lance un conjuro del cual
        seas objetivo o que te incluya en su área de efecto, puedes usar tu
        reacción para forzar a la criatura a realizar una{' '}
        <u>tirada de salvación</u>
        con el{' '}
        <u>
          modificador de su característica de lanzamiento de conjuros
        </u> con <u>CD {getSpellSavingThrow(pc)}</u>. La CD equivale a la CD de
        salvación de tus conjuros. Si falla la tirada de salvación, niegas el
        efecto del conjuro en ti y robas el conocimiento del conjuro si es al
        menos de nivel 1 y de un nivel que puedas lanzar (no es preciso que sea
        un conjuro de mago). Durante las siguientes 8 horas conoces el conjuro y
        puedes lanzarlo usando tus espacios de conjuro. La criatura no puede
        lanzar dicho conjuro hasta que las 8 horas hayan pasado.
      </p>
      <p>
        Una vez que utilices este rasgo, no puedes usarlo nuevamente hasta que
        finalices un descanso prolongado.
      </p>
    </>
  ),

  thiefsReflexes: (skill, pc) => (
    <p>
      Cuando alcanzas el nivel 17 te has convertido en un experto en tender
      emboscadas y escapar rápidamente del peligro. Puedes llevar a cabo dos
      turnos durante el primer asalto de cualquier combate. Realizas tu primer
      turno con tu iniciativa normal y el segundo turno con tu iniciativa menos
      10. No puedes usar esta característica cuando eres sorprendido.
    </p>
  ),

  deathStrike: (skill, pc) => (
    <p>
      Empezando en el nivel 17 te conviertes en un maestro de la muerte
      instantánea. Cuando atacas y golpeas a una criatura sorprendida, ésta debe
      hacer una{' '}
      <u>
        tirada de salvación de Constitución DC{' '}
        {8 + getStatMod(getStat(pc, 'dex')) + getProficiencyBonus(pc.level)}
      </u>{' '}
      (8 + tu modificador de Destreza + tu bonificador de competencia). Si falla
      la tirada de salvación, <u>duplica el daño</u> de tu ataque contra esa
      criatura.
    </p>
  ),

  elusive: (skill, pc) => (
    <p>
      Empezando al nivel 18 eres tan evasivo que raramente los atacantes pueden
      comprometer tu defensa. Ninguna tirada de ataque tiene ventaja contra ti
      mientras no estés incapacitado.
    </p>
  ),

  strokeOfLuck: (skill, pc) => (
    <>
      <p>
        Al nivel 20 tienes un don asombroso para acertar cuando necesitas
        hacerlo. Si tu ataque no golpea a un objetivo que está dentro de tu
        rango, puedes convertir el fallo en un golpe. Además, si fallas en una
        prueba de característica, puedes tratar la tirada d20 como un 20.
      </p>
      <p>
        Una vez que hayas usado este rasgo no puedes volver a usarlo hasta que
        hayas completado un descanso corto o un descanso prolongado.
      </p>
    </>
  ),
};
