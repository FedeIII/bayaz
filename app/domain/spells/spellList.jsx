export const SPELL_LIST = [
  {
    name: 'acidSplash',
    desc: (
      <>
        <p>
          Lanzas un orbe de ácido. Elige una criatura o dos criaturas dentro del
          alcance que se encuentren a 5 pies o menos entre sí y que puedas ver.
          El objetivo debe superar una tirada de salvación de Destreza para no
          recibir 1d6 puntos de daño por ácido.
        </p>
        <p>
          El daño de este conjuro aumenta en 1d6 cuando alcanzas el nivel 5
          (2d6), el nivel 11 (3d6) y el nivel 17 (4d6).
        </p>
      </>
    ),
    page: 'phb 211',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Conjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'aid',
    desc: (
      <>
        <p>
          Tu conjuro refuerza a tus aliados con tenacidad y determinación. Elige
          hasta tres criaturas que estén dentro del alcance. Mientras dura el
          efecto del conjuro, aumentan en 5 los Puntos de Golpe máximos y los
          Puntos de Golpe actuales de cada objetivo.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, los Puntos de Golpe del objetivo se incrementan en 5 puntos
          adicionales por cada nivel de espacio de conjuros por encima de nivel
          2.
        </p>
      </>
    ),
    page: 'phb 211',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A tiny strip of white cloth.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
  },
  {
    name: 'alarm',
    desc: (
      <>
        <p>
          Se activa una alarma contra visitas indeseadas. Elige una puerta, una
          ventana o un área dentro del alcance que no sea más grande que un cubo
          de 20 pies (4 casillas, 6 m). Hasta que el conjuro finalice, una
          alarma avisa cuando una criatura, ya sea pequeña o grande, toca o
          entre en el área protegida. Cuando lanzas el conjuro, puedes elegir a
          ciertas criaturas que no harán sonar la alarma. También puedes elegir
          si la alarma es un aviso mental o audible.
        </p>
        <p>
          La alarma mental te alerta enviando un pensamiento a tu mente si te
          encuentras a menos de 1 milla (1,6 km) del área protegida. Este
          pensamiento te despierta si estás dormido.
        </p>
        <p>
          Una alarma audible emite el sonido de una campana de mano durante 10
          segundos dentro de un área de 60 pies (12 casillas, 18 m).
        </p>
      </>
    ),
    page: 'phb 211',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A tiny bell and a piece of fine silver wire.',
    ritual: true,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 1,
    school: 'Abjuration',
    class: ['ranger', 'ritual caster', 'wizard'],
  },
  {
    name: 'alterSelf',
    desc: (
      <>
        <p>
          Asumes una forma diferente. Cuando lanzas el conjuro, elige una de las
          siguientes opciones, cuyos efectos duran mientras dure el conjuro.
          Mientras dura el conjuro, puedes finalizar la opción elegida gastando
          una acción para ganar los beneficios de otra apariencia diferente.
        </p>
        <p>
          <b>Adaptación acuática.</b> Adaptas tu cuerpo al entorno acuático, te
          brotan branquias y te crecen membranas entre los dedos. Puedes
          respirar bajo el agua y adquieres al nadar una velocidad igual a la
          velocidad que tienes al caminar.
        </p>
        <p>
          <b>Cambio de apariencia.</b> Transformas tu apariencia. Decides qué
          apariencia quieres tomar, incluida la altura, el peso, rasgos
          faciales, el sonido de tu voz, la longitud y color del pelo y otros
          rasgos distintivos, si los hay. Puedes hacer que te vean como un
          miembro de otra raza, pero ninguna de tus estadísticas cambia. Tampoco
          puedes parecer una criatura de diferente tamaño que tú, ya que la
          forma básica se mantiene; por ejemplo, si eres bípedo este conjuro no
          te convertirá en cuadrúpedo. En cualquier momento durante la duración
          del conjuro, se puede utilizar una acción para cambiar de apariencia
          de nuevo.
        </p>
        <p>
          <b>Armas naturales.</b> Te crecen garras, colmillos, espinas, cuernos
          o cualquier otra arma natural a tu elección. Tus ataques sin armas
          provocarán 1d6 daño contundente, perforante o cortante, según proceda
          con el arma natural elegida y eres considerado competente con ataques
          desarmados. Finalmente, el arma natural es mágica y tienes un
          bonificador de +1 a las tiradas de ataque y daño que hacen uso de
          ella.
        </p>
      </>
    ),
    page: 'phb 211',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'animalFriendship',
    desc: (
      <>
        <p>
          Este conjuro permite convencer a una bestia de que no vas a hacerle
          daño. Elige una bestia que puedas ver dentro del alcance del conjuro.
          Ella también debe verte y escucharte. Si la inteligencia de la bestia
          es 4 o más, el conjuro falla automáticamente. Si no, la bestia debe
          superar una tirada de salvación de Sabiduría o es encantada por ti
          durante la duración del conjuro. Si alguno de tus compañeros o tú hace
          daño a la bestia, el conjuro también finaliza.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, puedes afectar a una bestia adicional por cada nivel de
          espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 212',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A morsel of food.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['nature'],
    },
    domains: ['nature'],
  },
  {
    name: 'animalMessenger',
    desc: (
      <>
        <p>
          Por medio de este conjuro se utiliza un animal para entregar un
          mensaje. Elige una bestia diminuta que puedas ver dentro de tu alcance
          de visión, como por ejemplo una ardilla, un arrendajo azul o un
          murciélago. Especifica una ubicación, que debes haber visitado
          previamente, y un destinatario que coincida con una descripción
          general, como por ejemplo "un hombre o mujer vestido con el uniforme
          de la guardia de la ciudad" o "un enano pelirrojo que lleve un
          sombrero puntiagudo". Puedes transmitir un mensaje hablado de unas 25
          palabras. La bestia objetivo viaja durante la duración del conjuro
          hasta la ubicación elegida, si es una bestia alada cubrirá alrededor
          de 50 millas (80 km) cada 24 horas, si es otro tipo de bestia cubrirá
          25 millas (40 km) en el mismo tiempo.
        </p>
        <p>
          Cuando el mensajero llegue a su destino, entregará el mensaje a la
          criatura que has descrito, imitando el sonido de tu voz. El mensajero
          solo hablará con una criatura que coincida con la descripción dada. Si
          el mensajero no alcanza su destino antes de que el efecto del conjuro
          finalice, el mensaje se pierde, y la bestia regresa al lugar donde
          lanzaste el conjuro.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Si lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, la duración del conjuro aumenta en 48 horas por cada nivel
          de espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 212',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A morsel of food.',
    ritual: true,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'druid', 'ranger', 'ritual caster'],
  },
  {
    name: 'animalShapes',
    desc: (
      <>
        <p>
          Your magic turns others into beasts. Choose any number of willing
          creatures that you can see within range. You transform each target
          into the form of a Large or smaller beast with a challenge rating of 4
          or lower. On subsequent turns, you can use your action to transform
          affected creatures into new forms.
        </p>
        <p>
          The transformation lasts for the duration for each target, or until
          the target drops to 0 hit points or dies. You can choose a different
          form for each target. A target’s game statistics are replaced by the
          statistics of the chosen beast, though the target retains its
          alignment and Intelligence, Wisdom, and Charisma scores. The target
          assumes the hit points of its new form, and when it reverts to its
          normal form, it returns to the number of hit points it had before it
          transformed. If it reverts as a result of dropping to 0 hit points,
          any excess damage carries over to its normal form. As long as the
          excess damage doesn’t reduce the creature’s normal form to 0 hit
          points, it isn’t knocked unconscious. The creature is limited in the
          actions it can perform by the nature of its new form, and it can’t
          speak or cast spells.
        </p>
        <p>
          The target’s gear melds into the new form. The target can’t activate,
          wield, or otherwise benefit from any of its equipment.
        </p>
      </>
    ),
    page: 'phb 212',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 24 hours',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'animateDead',
    desc: (
      <>
        <p>
          This spell creates an undead servant. Choose a pile of bones or a
          corpse of a Medium or Small humanoid within range. Your spell imbues
          the target with a foul mimicry of life, raising it as an undead
          creature. The target becomes a skeleton if you chose bones or a zombie
          if you chose a corpse (the DM has the creature’s game statistics).
        </p>
        <p>
          On each of your turns, you can use a bonus action to mentally command
          any creature you made with this spell if the creature is within 60
          feet of you (if you control multiple creatures, you can command any or
          all of them at the same time, issuing the same command to each one).
          You decide what action the creature will take and where it will move
          during its next turn, or you can issue a general command, such as to
          guard a particular chamber or corridor. If you issue no commands, the
          creature only defends itself against hostile creatures. Once given an
          order, the creature continues to follow it until its task is complete.
        </p>
        <p>
          The creature is under your control for 24 hours, after which it stops
          obeying any command you’ve given it. To maintain control of the
          creature for another 24 hours, you must cast this spell on the
          creature again before the current 24-hour period ends. This use of the
          spell reasserts your control over up to four creatures you have
          animated with this spell, rather than animating a new one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          you animate or reassert control over two additional undead creatures
          for each slot level above 3rd. Each of the creatures must come from a
          different corpse or pile of bones.
        </p>
      </>
    ),
    page: 'phb 212',
    range: '10 feet',
    components: 'V, S, M',
    material: 'A drop of blood, a piece of flesh, and a pinch of bone dust.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 3,
    school: 'Necromancy',
    class: ['cleric', 'wizard'],
  },
  {
    name: 'animateObjects',
    desc: (
      <>
        <p>
          Objects come to life at your command. Choose up to ten nonmagical
          objects within range that are not being worn or carried. Medium
          targets count as two objects, Large targets count as four objects,
          Huge targets count as eight objects. You can’t animate any object
          larger than Huge. Each target animates and becomes a creature under
          your control until the spell ends or until reduced to 0 hit points.
        </p>
        <p>
          As a bonus action, you can mentally command any creature you made with
          this spell if the creature is within 500 feet of you (if you control
          multiple creatures, you can command any or all of them at the same
          time, issuing the same command to each one). You decide what action
          the creature will take and where it will move during its next turn, or
          you can issue a general command, such as to guard a particular chamber
          or corridor. If you issue no commands, the creature only defends
          itself against hostile creatures. Once given an order, the creature
          continues to follow it until its task is complete.
        </p>
        <p>
          An animated object is a construct with AC, hit points, attacks,
          Strength, and Dexterity determined by its size. Its Constitution is 10
          and its Intelligence and Wisdom are 3, and its Charisma is 1. Its
          speed is 30 feet; if the object lacks legs or other appendages it can
          use for locomotion, it instead has a flying speed of 30 feet and can
          hover. If the object is securely attached to a surface or a larger
          object, such as a chain bolted to a wall, its speed is 0. It has
          blindsight with a radius of 30 feet and is blind beyond that distance.
          When the animated object drops to 0 hit points, it reverts to its
          original object form, and any remaining damage carries over to its
          original object form.
        </p>
        <p>
          If you command an object to attack, it can make a single melee attack
          against a creature within 5 feet of it. It makes a slam attack with an
          attack bonus and bludgeoning damage determined by its size. The DM
          might rule that a specific object inflicts slashing or piercing damage
          based on its form.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          If you cast this spell using a spell slot of 6th level or higher, you
          can animate two additional objects for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 213',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Transmutation',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'antilifeShell',
    desc: (
      <>
        <p>
          A shimmering barrier extends out from you in a 10-foot radius and
          moves with you, remaining centered on you and hedging out creatures
          other than undead and constructs. The barrier lasts for the duration.
        </p>
        <p>
          The barrier prevents an affected creature from passing or reaching
          through. An affected creature can cast spells or make attacks with
          ranged or reach weapons through the barrier.
        </p>
        <p>
          If you move so that an affected creature is forced to pass through the
          barrier, the spell ends.
        </p>
      </>
    ),
    page: 'phb 213',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Abjuration',
    class: ['druid'],
  },
  {
    name: 'antimagicField',
    desc: (
      <>
        <p>
          A 10-foot-radius invisible sphere of antimagic surrounds you. This
          area is divorced from the magical energy that suffuses the multiverse.
          Within the sphere, spells can’t be cast, summoned creatures disappear,
          and even magic items become mundane. Until the spell ends, the sphere
          moves with you, centered on you.
        </p>
        <p>
          Spells and other magical effects, except those created by an artifact
          or a deity, are suppressed in the sphere and can’t protrude into it. A
          slot expended to cast a suppressed spell is consumed. While an effect
          is suppressed, it doesn’t function, but the time it spends suppressed
          counts against its duration.
        </p>
        <p>
          Targeted Effects. Spells and other magical effects, such as magic
          missile and charm person, that target a creature or an object in the
          sphere have no effect on that target.
        </p>
        <p>
          Areas of Magic. The area of another spell or magical effect, such as
          fireball, can’t extend into the sphere. If the sphere overlaps an area
          of magic, the part of the area that is covered by the sphere is
          suppressed. For example, the flames created by a wall of fire are
          suppressed within the sphere, creating a gap in the wall if the
          overlap is large enough.
        </p>
        <p>
          Spells. Any active spell or other magical effect on a creature or an
          object in the sphere is suppressed while the creature or object is in
          it.
        </p>
        <p>
          Magic Items. The properties and powers of magic items are suppressed
          in the sphere. For example, a +1 longsword in the sphere functions as
          a nonmagical longsword.
        </p>
        <p>
          A magic weapon’s properties and powers are suppressed if it is used
          against a target in the sphere or wielded by an attacker in the
          sphere. If a magic weapon or a piece of magic ammunition fully leaves
          the sphere (for example, if you fire a magic arrow or throw a magic
          spear at a target outside the sphere), the magic of the item ceases to
          be suppressed as soon as it exits.
        </p>
        <p>
          Magical Travel. Teleportation and planar travel fail to work in the
          sphere, whether the sphere is the destination or the departure point
          for such magical travel. A portal to another location, world, or plane
          of existence, as well as an opening to an extradimensional space such
          as that created by the rope trick spell, temporarily closes while in
          the sphere.
        </p>
        <p>
          Creatures and Objects. A creature or object summoned or created by
          magic temporarily winks out of existence in the sphere. Such a
          creature instantly reappears once the space the creature occupied is
          no longer within the sphere.
        </p>
        <p>
          Dispel Magic. Spells and magical effects such as dispel magic have no
          effect on the sphere. Likewise, the spheres created by different
          antimagic field spells don’t nullify each other.
        </p>
      </>
    ),
    page: 'phb 213',
    range: 'Self',
    components: 'V, S, M',
    material: 'A pinch of powdered iron or iron filings.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Abjuration',
    class: ['cleric', 'wizard'],
  },
  {
    name: 'antipathy/Sympathy',
    desc: (
      <>
        <p>
          This spell attracts or repels creatures of your choice. You target
          something within range, either a Huge or smaller object or creature or
          an area that is no larger than a 200-foot cube. Then specify a kind of
          intelligent creature, such as red dragons, goblins, or vampires. You
          invest the target with an aura that either attracts or repels the
          specified creatures for the duration. Choose antipathy or sympathy as
          the aura’s effect.
        </p>
        <p>
          <b>Antipathy.</b> The enchantment causes creatures of the kind you
          designated to feel an intense urge to leave the area and avoid the
          target. When such a creature can see the target or comes within 60
          feet of it, the creature must succeed on a wisdom saving throw or
          become frightened. The creature remains frightened while it can see
          the target or is within 60 feet of it. While frightened by the target,
          the creature must use its movement to move to the nearest safe spot
          from which it can’t see the target. If the creature moves more than 60
          feet from the target and can’t see it, the creature is no longer
          frightened, but the creature becomes frightened again if it regains
          sight of the target or moves within 60 feet of it.
        </p>
        <p>
          <b>Sympathy.</b> The enchantment causes the specified creatures to
          feel an intense urge to approach the target while within 60 feet of it
          or able to see it. When such a creature can see the target or comes
          within 60 feet of it, the creature must succeed on a wisdom saving
          throw or use its movement on each of its turns to enter the area or
          move within reach of the target. When the creature has done so, it
          can’t willingly move away from the target. If the target damages or
          otherwise harms an affected creature, the affected creature can make a
          wisdom saving throw to end the effect, as described below.
        </p>
        <p>
          <b>Ending the Effect.</b> If an affected creature ends its turn while
          not within 60 feet of the target or able to see it, the creature makes
          a wisdom saving throw. On a successful save, the creature is no longer
          affected by the target and recognizes the feeling of repugnance or
          attraction as magical. In addition, a creature affected by the spell
          is allowed another wisdom saving throw every 24 hours while the spell
          persists.
        </p>
        <p>
          A creature that successfully saves against this effect is immune to it
          for 1 minute, after which time it can be affected again.
        </p>
      </>
    ),
    page: 'phb 214',
    range: '60 feet',
    components: 'V, S, M',
    material:
      'Either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect.',
    ritual: false,
    duration: '10 days',
    concentration: false,
    casting_time: '1 hour',
    level: 8,
    school: 'Enchantment',
    class: ['druid', 'wizard'],
  },
  {
    name: 'arcaneEye',
    desc: (
      <>
        <p>
          You create an invisible, magical eye within range that hovers in the
          air for the duration.
        </p>
        <p>
          You mentally receive visual information from the eye, which has normal
          vision and darkvision out to 30 feet. The eye can look in every
          direction.
        </p>
        <p>
          As an action, you can move the eye up to 30 feet in any direction.
          There is no limit to how far away from you the eye can move, but it
          can’t enter another plane of existence. A solid barrier blocks the
          eye’s movement, but the eye can pass through an opening as small as 1
          inch in diameter.
        </p>
      </>
    ),
    page: 'phb 214',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A bit of bat fur.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Divination',
    class: ['cleric', 'wizard'],
    archetype: {
      cleric: ['knowledge'],
    },
    domains: ['knowledge'],
  },
  {
    name: 'arcaneGate',
    desc: (
      <>
        <p>
          You create linked teleportation portals that remain open for the
          duration. Choose two points on the ground that you can see, one point
          within 10 feet of you and one point within 500 feet of you. A circular
          portal, 10 feet in diameter, opens over each point. If the portal
          would open in the space occupied by a creature, the spell fails, and
          the casting is lost.
        </p>
        <p>
          The portals are two-dimensional glowing rings filled with mist,
          hovering inches from the ground and perpendicular to it at the points
          you choose. A ring is visible only from one side (your choice), which
          is the side that functions as a portal.
        </p>
        <p>
          Any creature or object entering the portal exits from the other portal
          as if the two were adjacent to each other; passing through a portal
          from the nonportal side has no effect. The mist that fills each portal
          is opaque and blocks vision through it. On your turn, you can rotate
          the rings as a bonus action so that the active side faces in a
          different direction.
        </p>
      </>
    ),
    page: 'phb 214',
    range: '500 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Conjuration',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'arcaneLock',
    desc: (
      <>
        <p>
          Toca una puerta, ventana, umbral, cofre u otra entrada cerrada, y esta
          queda cerrada mágicamente mientras dure el conjuro. Tú y las criaturas
          que designes Cuando lanzas este conjuro pueden abrir el objeto de
          forma normal. También puedes establecer una contraseña que cuando se
          pronuncie a menos de 5 pies (1 casillas, 1,5 m) del objeto, suprima el
          conjuro durante 1 minuto. De otra manera, el objeto no se puede abrir
          hasta que sea roto o el conjuro sea disipado o suprimido. Lanzar el
          conjuro de apertura [knock] sobre el objeto suprime el efecto de
          cerradura arcana [Arcane Lock] durante 10 minutos.
        </p>
        <p>
          Mientras el objeto esté afectado por este conjuro, es más difícil de
          romper o de abrir por la fuerza; la CD para romperlo o abrir cualquier
          cerradura aumenta en 10.
        </p>
      </>
    ),
    page: 'phb 215',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Gold dust worth at least 25gp, which the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['wizard'],
  },
  {
    name: 'armorOfAgathys',
    desc: (
      <>
        <p>
          Una fuerza mágica protectora te envuelve, manifestándose como un
          espectro helado que te cubre a ti y a tu equipo. Ganas 5 puntos
          temporales de golpe mientras dure el conjuro. Si una criatura te
          golpea mediante un ataque de cuerpo a cuerpo mientras tienes estos
          Puntos de Golpe temporales, la criatura sufre 5 puntos de daño por
          frío.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, tanto los Puntos de Golpe temporales como los puntos de daño
          por frio se incrementan en 5 por cada nivel de espacio de conjuros por
          encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 215',
    range: 'Self',
    components: 'V, S, M',
    material: 'A cup of water.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Abjuration',
    class: ['warlock'],
  },
  {
    name: 'armsOfHadar',
    desc: (
      <>
        <p>
          Invocas el poder de Hadar, el Hambriento Oscuro. Zarcillos de oscura
          energía brotan de ti y azotan a todas las criaturas que se encuentren
          a menos de 10 pies (2 casillas, 3 m). Cada criatura en el área debe
          realizar una tirada de salvación de Fuerza. En caso de que falle la
          tirada de salvación, el objetivo sufre 2d6 puntos de daño necrótico y
          no podrá reaccionar hasta su siguiente turno. En caso de que supere la
          tirada de salvación la criatura sufre sólo la mitad del daño y ningún
          otro efecto.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa con 1d6 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 215',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['warlock'],
  },
  {
    name: 'astralProjection',
    desc: (
      <>
        <p>
          You and up to eight willing creatures within range project your astral
          bodies into the Astral Plane (the spell fails and the casting is
          wasted if you are already on that plane). The material body you leave
          behind is unconscious and in a state of suspended animation; it
          doesn’t need food or air and doesn’t age.
        </p>
        <p>
          Your astral body resembles your mortal form in almost every way,
          replicating your game statistics and possessions. The principal
          difference is the addition of a silvery cord that extends from between
          your shoulder blades and trails behind you, fading to invisibility
          after 1 foot. This cord is your tether to your material body. As long
          as the tether remains intact, you can find your way home. If the cord
          is cut—something that can happen only when an effect specifically
          states that it does—your soul and body are separated, killing you
          instantly.
        </p>
        <p>
          Your astral form can freely travel through the Astral Plane and can
          pass through portals there leading to any other plane. If you enter a
          new plane or return to the plane you were on when casting this spell,
          your body and possessions are transported along the silver cord,
          allowing you to re-enter your body as you enter the new plane. Your
          astral form is a separate incarnation. Any damage or other effects
          that apply to it have no effect on your physical body, nor do they
          persist when you return to it.
        </p>
        <p>
          The spell ends for you and your companions when you use your action to
          dismiss it. When the spell ends, the affected creature returns to its
          physical body, and it awakens.
        </p>
        <p>
          The spell might also end early for you or one of your companions. A
          successful dispel magic spell used against an astral or physical body
          ends the spell for that creature. If a creature’s original body or its
          astral form drops to 0 hit points, the spell ends for that creature.
          If the spell ends and the silver cord is intact, the cord pulls the
          creature’s astral form back to its body, ending its state of suspended
          animation.
        </p>
        <p>
          If you are returned to your body prematurely, your companions remain
          in their astral forms and must find their own way back to their
          bodies, usually by dropping to 0 hit points.
        </p>
      </>
    ),
    page: 'phb 215',
    range: '10 feet',
    components: 'V, S, M',
    material:
      'For each creature you affect with this spell, you must provide one jacinth worth at least 1,000gp and one ornately carved bar of silver worth at least 100gp, all of which the spell consumes.',
    ritual: false,
    duration: 'Special',
    concentration: false,
    casting_time: '1 hour',
    level: 9,
    school: 'Necromancy',
    class: ['cleric', 'warlock', 'wizard'],
  },
  {
    name: 'augury',
    desc: (
      <>
        <p>
          Ya sea lanzando palillos con gemas incrustadas, lanzando huesos de
          dragón, disponiendo cartas con ilustraciones o empleando alguna otra
          herramienta de adivinación, una entidad de otro mundo te proporciona
          un presagio sobre los resultados del curso de una acción específica
          que planeas llevar a cabo en los siguientes 30 minutos. El DM elige
          entre los siguientes presagios posibles:
        </p>
        <ul>
          <li>Dicha, para buenos resultados.</li>
          <li>Desdicha, para malos resultados.</li>
          <li>Dicha y desdicha, para resultados tanto buenos como malos.</li>
          <li>
            Nada, para resultados que no son especialmente buenos o malos.
          </li>
        </ul>
        <p>
          El conjuro no tiene en cuenta cualquier circunstancia posible que
          podría cambiar el resultado, como por ejemplo el lanzamiento de
          conjuros adicionales, o la pérdida o llegada de un compañero.
        </p>
        <p>
          Si lanzas el conjuro dos veces o más antes de completar tu próximo
          descanso prolongado, existe un 25% acumulativo por cada lanzamiento
          después del primero que obtengas una lectura al azar. El DM realiza
          esta tirada en secreto.
        </p>
      </>
    ),
    page: 'phb 215',
    range: 'Self',
    components: 'V, S, M',
    material:
      'Specially marked sticks, bones, or similar tokens worth at least 25gp.',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 2,
    school: 'Divination',
    class: ['cleric', 'ritual caster'],
    domains: ['knowledge'],
  },
  {
    name: 'auraOfLife',
    desc: (
      <>
        <p>
          Life-preserving energy radiates from you in an aura with a 30-foot
          radius. Until the spell ends, the aura moves with you, centered on
          you. Each nonhostile creature in the aura (including you) has
          resistance to necrotic damage, and its hit point maximum can’t be
          reduced. In addition, a nonhostile, living creature regains 1 hit
          point when it starts its turn in the aura with 0 hit points.
        </p>
      </>
    ),
    page: 'phb 216',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['paladin'],
  },
  {
    name: 'auraOfPurity',
    desc: (
      <>
        <p>
          Purifying energy radiates from you in an aura with a 30-foot radius.
          Until the spell ends, the aura moves with you, centered on you. Each
          nonhostile creature in the aura (including you) can’t become diseased,
          has resistance to poison damage, and has advantage on saving throws
          against affects that cause any of the following conditions: blinded,
          charmed, deafened, frightened, paralysed, poisoned and stunned.
        </p>
      </>
    ),
    page: 'phb 216',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['paladin'],
  },
  {
    name: 'auraOfVitality',
    desc: (
      <>
        <p>
          Healing energy radiates from you in an aura with a 30-foot radius.
          Until the spell ends, the aura moves with you, centered on you. You
          can use a bonus action to cause one creature in the aura (including
          you) to regain 2d6 hit points.
        </p>
      </>
    ),
    page: 'phb 216',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'awaken',
    desc: (
      <>
        <p>
          After spending the casting time tracing magical pathways within a
          precious gemstone, you touch a Huge or smaller beast or plant. The
          target must have either no Intelligence score or an Intelligence of 3
          or less. The target gains an Intelligence of 10. The target also gains
          the ability to speak one language you know. If the target is a plant,
          it gains the ability to move its limbs, roots, vines, creepers, and so
          forth, and it gains senses similar to a human’s. Your DM chooses
          statistics appropriate for the awakened plant, such as the statistics
          for the awakened shrub or the awakened tree.
        </p>
        <p>
          The awakened beast or plant is charmed by you for 30 days or until you
          or your companions do anything harmful to it. When the charmed
          condition ends, the awakened creature chooses whether to remain
          friendly to you, based on how you treated it while it was charmed.
        </p>
      </>
    ),
    page: 'phb 216',
    range: 'Touch',
    components: 'V, S, M',
    material: 'An agate worth at least 1,000 gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '8 hours',
    level: 5,
    school: 'Transmutation',
    class: ['bard', 'druid'],
  },
  {
    name: 'bane',
    desc: (
      <>
        <p>
          Up to three creatures of your choice that you can see within range
          must make charisma saving throws. Whenever a target that fails this
          saving throw makes an attack roll or a saving throw before the spell
          ends, the target must roll a d4 and subtract the number rolled from
          the attack roll or saving throw.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 2nd level or higher,
          you can target one additional creature for each slot level above 1st.
        </p>
      </>
    ),
    page: 'phb 216',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A drop of blood.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'paladin'],
    archetype: {
      paladin: ['vengeance'],
    },
    oaths: 'Vengeance',
  },
  {
    name: 'banishingSmite',
    desc: (
      <>
        <p>
          The next time you hit a creature with a weapon attack before this
          spell ends, your weapon crackles with force, and the attack deals an
          extra 5d10 force damage to the target. Additionally, if this attack
          reduces the target to 50 hit points or fewer, you banish it. If the
          target is native to a different plane of existence than the one you’re
          on, the target disappears, returning to its home plane. If the target
          is native to the plane you’re on, the creature vanishes into a
          harmless demiplane. While there, the target is incapacitated. It
          remains there until the spell ends, at which point the target
          reappears in the space it left or in the nearest unoccupied space if
          that space is occupied.
        </p>
      </>
    ),
    page: 'phb 216',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 5,
    school: 'Abjuration',
    class: ['paladin'],
  },
  {
    name: 'banishment',
    desc: (
      <>
        <p>
          You attempt to send one creature that you can see within range to
          another plane of existence. The target must succeed on a charisma
          saving throw or be banished.
        </p>
        <p>
          If the target is native to the plane of existence you’re on, you
          banish the target to a harmless demiplane. While there, the target is
          incapacitated. The target remains there until the spell ends, at which
          point the target reappears in the space it left or in the nearest
          unoccupied space if that space is occupied.
        </p>
        <p>
          If the target is native to a different plane of existence than the one
          you’re on, the target is banished with a faint popping noise,
          returning to its home plane. If the spell ends before 1 minute has
          passed, the target reappears in the space it left or in the nearest
          unoccupied space if that space is occupied. Otherwise, the target
          doesn’t return.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th level or higher,
          you can target one additional creature for each slot level above 4th.
        </p>
      </>
    ),
    page: 'phb 217',
    range: '60 feet',
    components: 'V, S, M',
    material: 'An item distasteful to the target.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['cleric', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    oaths: 'Vengeance',
  },
  {
    name: 'barkskin',
    desc: (
      <>
        <p>
          Tocas a una criatura voluntaria. Hasta la finalización de la duración
          del conjuro, la piel del objetivo se vuelve rugosa, como la corteza de
          un roble, haciendo que la CA del objetivo no pueda ser nunca menor que
          16, independientemente del tipo de armadura que porte.
        </p>
      </>
    ),
    page: 'phb 217',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A handful of oak bark.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['nature'],
    },
    domains: ['nature'],
    circles: ['forest'],
  },
  {
    name: 'beaconOfHope',
    desc: (
      <>
        <p>
          This spell bestows hope and vitality. Choose any number of creatures
          within range. For the duration, each target has advantage on wisdom
          saving throws and death saving throws, and regains the maximum number
          of hit points possible from any healing.
        </p>
      </>
    ),
    page: 'phb 217',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
    archetype: {
      paladin: ['devotion'],
    },
    domains: ['life'],
    oaths: 'Devotion',
  },
  {
    name: 'beastSense',
    desc: (
      <>
        <p>
          Tocas a una bestia voluntaria. Mientras dura el efecto del conjuro,
          puedes utilizar tu acción para ver a través de los ojos de la bestia y
          oír lo que ella oye, continuas percibiendo el entorno a través de sus
          sentidos hasta que utilices una acción para volver a tus sentidos
          normales
        </p>
        <p>
          Mientras percibes el entorno a través de sus sentidos, ganas
          cualquiera de los beneficios que posea la bestia, aunque permaneces
          cegado y ensordecido a los estímulos de tu propio entorno.
        </p>
      </>
    ),
    page: 'phb 217',
    range: 'Touch',
    components: 'S',
    ritual: true,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['druid', 'ranger', 'ritual caster'],
  },
  {
    name: 'bestowCurse',
    desc: (
      <>
        <p>
          You touch a creature, and that creature must succeed on a wisdom
          saving throw or become cursed for the duration of the spell. When you
          cast this spell, choose the nature of the curse from the following
          options:
        </p>
        <p>
          - Choose one ability score. While cursed, the target has disadvantage
          on ability checks and saving throws made with that ability score.
        </p>
        <p>
          - While cursed, the target has disadvantage on attack rolls against
          you.
        </p>
        <p>
          - While cursed, the target must make a wisdom saving throw at the
          start of each of its turns. If it fails, it wastes its action that
          turn doing nothing.
        </p>
        <p>
          - While the target is cursed, your attacks and spells deal an extra
          1d8 necrotic damage to the target.
        </p>
        <p>
          A remove curse spell ends this effect. At the DM’s option, you may
          choose an alternative curse effect, but it should be no more powerful
          than those described above. The DM has final say on such a curse’s
          effect.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          If you cast this spell using a spell slot of 4th level or higher, the
          duration is concentration, up to 10 minutes. If you use a spell slot
          of 5th level or higher, the duration is 8 hours. If you use a spell
          slot of 7th level or higher, the duration is 24 hours. If you use a
          9th level spell slot, the spell lasts until it is dispelled. Using a
          spell slot of 5th level or higher grants a duration that doesn’t
          require concentration.
        </p>
      </>
    ),
    page: 'phb 218',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Necromancy',
    class: ['bard', 'cleric', 'wizard'],
  },
  {
    name: "bigby'sHand",
    desc: (
      <>
        <p>
          You create a Large hand of shimmering, translucent force in an
          unoccupied space that you can see within range. The hand lasts for the
          spell’s duration, and it moves at your command, mimicking the
          movements of your own hand.
        </p>
        <p>
          The hand is an object that has AC 20 and hit points equal to your hit
          point maximum. If it drops to 0 hit points, the spell ends. It has a
          Strength of 26 (+8) and a Dexterity of 10 (+0). The hand doesn’t fill
          its space.
        </p>
        <p>
          When you cast the spell and as a bonus action on your subsequent
          turns, you can move the hand up to 60 feet and then cause one of the
          following effects with it.
        </p>
        <p>
          <b>Clenched Fist.</b> The hand strikes one creature or object within 5
          feet of it. Make a melee spell attack for the hand using your game
          statistics. On a hit, the target takes 4d8 force damage.
        </p>
        <p>
          <b>Forceful Hand.</b> The hand attempts to push a creature within 5
          feet of it in a direction you choose. Make a check with the hand’s
          Strength contested by the Strength (Athletics) check of the target. If
          the target is Medium or smaller, you have advantage on the check. If
          you succeed, the hand pushes the target up to 5 feet plus a number of
          feet equal to five times your spellcasting ability modifier. The hand
          moves with the target to remain within 5 feet of it.
        </p>
        <p>
          <b>Grasping Hand.</b> The hand attempts to grapple a Huge or smaller
          creature within 5 feet of it. You use the hand’s Strength score to
          resolve the grapple. If the target is Medium or smaller, you have
          advantage on the check. While the hand is grappling the target, you
          can use a bonus action to have the hand crush it. When you do so, the
          target takes bludgeoning damage equal to 2d6 + your spellcasting
          ability modifier.
        </p>
        <p>
          <b>Interposing Hand.</b> The hand interposes itself between you and a
          creature you choose until you give the hand a different command. The
          hand moves to stay between you and the target, providing you with half
          cover against the target. The target can't move through the hand’s
          space if its Strength score is less than or equal to the hand’s
          Strength score. If its Strength score is higher than the hand’s
          Strength score, the target can move toward you through the hand’s
          space, but that space is difficult terrain for the target.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the damage from the clenched fist option increases by 2d8 and the
          damage from the grasping hand increases by 2d6 for each slot level
          above 5th.
        </p>
      </>
    ),
    page: 'phb 218',
    range: '120 feet',
    components: 'V, S, M',
    material: 'An eggshell and a snakeskin glove.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: 'bladeBarrier',
    desc: (
      <>
        <p>
          You create a vertical wall of whirling, razor-sharp blades made of
          magical energy. The wall appears within range and lasts for the
          duration. You can make a straight wall up to 100 feet long, 20 feet
          high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20
          feet high, and 5 feet thick. The wall provides three-quarters cover to
          creatures behind it, and its space is difficult terrain.
        </p>
        <p>
          When a creature enters the wall’s area for the first time on a turn or
          starts its turn there, the creature must make a dexterity saving
          throw. On a failed save, the creature takes 6d10 slashing damage. On a
          successful save, the creature takes half as much damage.
        </p>
      </>
    ),
    page: 'phb 218',
    range: '90 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'bladeWard',
    desc: (
      <>
        <p>
          Extiendes tu mano y trazas con él una runa de protección en el aire.
          Hasta el final del siguiente turno tendrás resistencia contra daño
          contundente, perforante y cortante infligido por ataques de armas.
        </p>
      </>
    ),
    page: 'phb 218',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Abjuration',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'bless',
    desc: (
      <>
        <p>
          You bless up to three creatures of your choice within range. Whenever
          a target makes an attack roll or a saving throw before the spell ends,
          the target can roll a d4 and add the number rolled to the attack roll
          or saving throw.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 2nd level or higher,
          you can target one additional creature for each slot level above 1st.
        </p>
      </>
    ),
    page: 'phb 219',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A sprinkling of holy water.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['cleric', 'paladin'],
    domains: ['life'],
  },
  {
    name: 'blight',
    desc: (
      <>
        <p>
          Necromantic energy washes over a creature of your choice that you can
          see within range, draining moisture and vitality from it. The target
          must make a constitution saving throw. The target takes 8d8 necrotic
          damage on a failed save, or half as much damage on a successful one.
          The spell has no effect on undead or constructs.
        </p>
        <p>
          If you target a plant creature or a magical plant, it makes the saving
          throw with disadvantage, and the spell deals maximum damage to it.
        </p>
        <p>
          If you target a nonmagical plant that isn’t a creature, such as a tree
          or shrub, it doesn’t make a saving throw; it simply withers and dies.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th level of higher,
          the damage increases by 1d8 for each slot level above 4th.
        </p>
      </>
    ),
    page: 'phb 219',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Necromancy',
    class: ['druid', 'sorcerer', 'warlock', 'wizard'],
    circles: ['desert'],
  },
  {
    name: 'blindingSmite',
    desc: (
      <>
        <p>
          The next time you hit a creature with a melee weapon attack during
          this spell’s duration, your weapon flares with bright light, and the
          attack deals an extra 3d8 radiant damage to the target. Additionally,
          the target must succeed on a constitution saving throw or be blinded
          until the spell ends.
        </p>
        <p>
          A creature blinded by this spell makes another constitution saving
          throw at the end of each of its turns. On a successful save, it is no
          longer blinded.
        </p>
      </>
    ),
    page: 'phb 219',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 3,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'blindness/Deafness',
    desc: (
      <>
        <p>
          Puedes cegar o dejar sordo a un enemigo. Elige una criatura que puedas
          ver dentro del alcance para que realice una tirada de salvación de
          Constitución. Si la tirada de salvación falla, el objetivo queda
          cegado o ensordecido (a tu elección) durante la duración del conjuro.
          Al final de cada turno, el objetivo puede realizar una tirada de
          salvación de Constitución. En caso de éxito, el conjuro finaliza.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, puedes elegir como objetivo una criatura adicional por cada
          nivel de espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 219',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Necromancy',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['fiend'],
    },
    patrons: ['fiend'],
  },
  {
    name: 'blink',
    desc: (
      <>
        <p>
          Roll a d20 at the end of each of your turns for the duration of the
          spell. On a roll of 11 or higher, you vanish from your current plane
          of existence and appear in the Ethereal Plane (the spell fails and the
          casting is wasted if you were already on that plane). At the start of
          your next turn, and when the spell ends if you are on the Ethereal
          Plane, you return to an unoccupied space of your choice that you can
          see within 10 feet of the space you vanished from. If no unoccupied
          space is available within that range, you appear in the nearest
          unoccupied space (chosen at random if more than one space is equally
          near). You can dismiss this spell as an action.
        </p>
        <p>
          While on the Ethereal Plane, you can see and hear the plane you
          originated from, which is cast in shades of gray, and you can’t see
          anything there more than 60 feet away. You can only affect and be
          affected by other creatures on the Ethereal Plane. Creatures that
          aren’t there can’t perceive you or interact with you, unless they have
          the ability to do so.
        </p>
      </>
    ),
    page: 'phb 219',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['trickery'],
      warlock: ['archfey'],
    },
    domains: ['trickery'],
    patrons: ['archfey'],
  },
  {
    name: 'blur',
    desc: (
      <>
        <p>
          Tu cuerpo comienza a difuminarse, cambiante y oscilante para todos
          aquellos que puedan verte. Mientras dura el conjuro, cualquier
          criatura posee desventaja en las tiradas que hace contra ti. Un
          atacante será inmune a este efecto si no se basa en la vista para
          atacar, como con vista ciega, o puede ver a través de las ilusiones,
          como con visión verdadera.
        </p>
      </>
    ),
    page: 'phb 219',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['desert'],
    },
    circles: ['desert'],
  },
  {
    name: 'brandingSmite',
    desc: (
      <>
        <p>
          Mientras dura el efecto de este conjuro, la próxima vez que impactes a
          una criatura con un ataque de armas, el arma resplandece mientras
          golpea con una radiante luz astral. El ataque inflige un daño extra de
          2d6 puntos de daño radiante al objetivo, que se hará visible si era
          invisible, y el objetivo comenzará a desprender una luz tenue en un
          radio de 5 pies (1 casilla, 1,5 m) y no podrá volverse invisible hasta
          que el conjuro finalice.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño extra se incrementa en 1d6 por cada nivel de espacio
          de conjuros por encima del nivel 2.
        </p>
      </>
    ),
    page: 'phb 219',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 2,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'burningHands',
    desc: (
      <>
        <p>
          Mientras sostienes tus manos con los pulgares tocándose y los dedos
          separados, una delgada capa de llamas se extiende desde las yemas de
          tus dedos extendidos. Cada criatura en un cono de 15 pies (3 casillas,
          4,5 m) debe realizar una tirada de salvación de Destreza. Si la tirada
          de salvación fracasa, una criatura sufre 3d6 puntos de daño por fuego,
          si tiene éxito en la tirada de salvación sólo recibirá la mitad de
          daño
        </p>
        <p>
          El fuego prende cualquier objeto inflamable en el área que no esté
          siendo sujeto o transportado
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d6 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 220',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['light'],
      warlock: ['fiend'],
    },
    domains: ['light'],
    patrons: ['fiend'],
  },
  {
    name: 'callLightning',
    desc: (
      <>
        <p>
          A storm cloud appears in the shape of a cylinder that is 10 feet tall
          with a 60-foot radius, centered on a point you can see 100 feet
          directly above you. The spell fails if you can’t see a point in the
          air where the storm cloud could appear (for example, if you are in a
          room that can’t accommodate the cloud).
        </p>
        <p>
          When you cast the spell, choose a point you can see within range. A
          bolt of lightning flashes down from the cloud to that point. Each
          creature within 5 feet of that point must make a dexterity saving
          throw. A creature takes 3d10 lightning damage on a failed save, or
          half as much damage on a successful one. On each of your turns until
          the spell ends, you can use your action to call down lightning in this
          way again, targeting the same point or a different one.
        </p>
        <p>
          If you are outdoors in stormy conditions when you cast this spell, the
          spell gives you control over the existing storm instead of creating a
          new one. Under such conditions, the spell’s damage increases by 1d10.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th or higher level,
          the damage increases by 1d10 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 220',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['cleric', 'druid'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
    circles: ['forest'],
  },
  {
    name: 'calmEmotions',
    desc: (
      <>
        <p>
          Intentas suprimir emociones fuertes que afectan a un grupo de
          personas. Cada humanoide en una esfera de radio 20 pies (4 casillas, 6
          m) centrado en un punto que elijas dentro del alcance, debe realizar
          una tirada de salvación de Carisma; una criatura puede elegir fallar
          esta tirada si así lo desea. Si la criatura falla la tirada de
          salvación elige uno de los dos siguientes efectos.
        </p>
        <p>
          Puedes suprimir cualquier efecto que causa que el objetivo esté en
          estado encantado o asustado. Cuando finalice el conjuro, cualquier
          efecto disipado vuelve, siempre y cuando la duración de la condición
          no hubiera expirado antes.
        </p>
        <p>
          Alternativamente, puedes hacer que un objetivo permanezca indiferente
          hacia criaturas de tu elección contra las que es abiertamente hostil.
          Esta indiferencia finaliza si el objetivo es atacado o herido
          directamente por un conjuro, o si es testigo de que alguno de sus
          amigos están siendo dañados
        </p>
        <p>
          Cuando el conjuro finaliza la criatura vuelve a ser hostil otra vez,
          salvo que el DM precise lo contrario.
        </p>
      </>
    ),
    page: 'phb 221',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'warlock'],
    archetype: {
      warlock: ['archfey'],
    },
    patrons: ['archfey'],
  },
  {
    name: 'chainLightning',
    desc: (
      <>
        <p>
          You create a bolt of lightning that arcs toward a target of your
          choice that you can see within range. Three bolts then leap from that
          target to as many as three other targets, each of which must be within
          30 feet of the first target. A target can be a creature or an object
          and can be targeted by only one of the bolts.
        </p>
        <p>
          A target must make a dexterity saving throw. The target takes 10d8
          lightning damage on a failed save, or half as much damage on a
          successful one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          one additional bolt leaps from the first target to another target for
          each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 221',
    range: '150 feet',
    components: 'V, S, M',
    material:
      'A bit of fur; a piece of amber, glass, or a crystal rod; and three silver pins.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'charmPerson',
    desc: (
      <>
        <p>
          Puedes intentar hechizar a un humanoide que veas dentro del alcance
          del conjuro. El objetivo debe realizar una tirada de salvación de
          Sabiduría, y lo hace con ventaja si tú o tus compañeros estáis
          luchando contra él. Si falla la tirada de salvación, queda encantado
          hasta que el conjuro finalice o hasta que tú o tus compañeros le
          hagáis algo perjudicial. La criatura encantada os considera amigos.
          Cuando finalice el conjuro, la criatura sabe que ha sido encantada por
          ti.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuro de nivel 2 o
          superior, puedes elegir como objetivo a una criatura adicional por
          cada nivel de espacio de conjuros por encima de nivel 1. Las criaturas
          deben estar a 30 pies (6 casillas, 9 m) la una de la otra cuando las
          eliges como objetivo.
        </p>
      </>
    ),
    page: 'phb 221',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
  },
  {
    name: 'chillTouch',
    desc: (
      <>
        <p>
          Creas una mano esquelética y fantasmal en el espacio de una criatura
          que esté dentro del alcance. Haz un ataque de conjuro a distancia
          contra la criatura para atacarla con el frío de la tumba. Si impactas,
          el objetivo recibe 1d8 puntos de daño necrótico y no puede recuperar
          puntos de golpe hasta que no empiece tu siguiente turno. Hasta
          entonces, la mano se aferra al objetivo.
        </p>
        <p>
          Si impactas a un objetivo no muerto, este también tiene desventaja en
          las tiradas de ataque que haga contra ti hasta que termine tu
          siguiente turno.
        </p>
        <p>
          El daño de este conjuro aumenta en 1d8 cuando llegas al nivel 5 (2d8),
          al nivel 11 (3d8) y al nivel 17 (4d8).
        </p>
      </>
    ),
    page: 'phb 221',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Necromancy',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'chromaticOrb',
    desc: (
      <>
        <p>
          You hurl a 4-inch-diameter sphere of energy at a creature that you can
          see within range. You choose acid, cold, fire, lightning, poison, or
          thunder for the type of orb you create, and then make a ranged spell
          attack against the target. If the attack hits, the creature takes 3d8
          of the type you chose.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 2nd level or higher,
          the damage increases by 1d8 for each slot level above 1st.
        </p>
      </>
    ),
    page: 'phb 221',
    range: '90 feet',
    components: 'V, S, M',
    material: 'A diamond worth at least 50gp.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'circleOfDeath',
    desc: (
      <>
        <p>
          A sphere of negative energy ripples out in a 60-footradius sphere from
          a point within range. Each creature in that area must make a
          constitution saving throw. A target takes 8d6 necrotic damage on a
          failed save, or half as much damage on a successful one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the damage increases by 2d6 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 221',
    range: '150 feet',
    components: 'V, S, M',
    material: 'The powder of a crushed black pearl worth at least 500 gp.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Necromancy',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'circleOfPower',
    desc: (
      <>
        <p>
          Divine energy radiates from you, distorting and diffusing magical
          energy within 30 feet of you. Until the spell ends, the sphere moves
          with you, centered on you. For the duration, each friendly creature in
          the area (including you) has advantage on saving throws against spells
          and other magical effects. Additionally, when an affected creature
          succeeds on a saving throw made against a spell or magical effect that
          allows it to make a saving throw to take only half damage, it instead
          takes no damage if it succeeds on the saving throw.
        </p>
      </>
    ),
    page: 'phb 221',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Abjuration',
    class: ['paladin'],
  },
  {
    name: 'clairvoyance',
    desc: (
      <>
        <p>
          You create an invisible sensor within range in a location familiar to
          you (a place you have visited or seen before) or in an obvious
          location that is unfamiliar to you (such as behind a door, around a
          corner, or in a grove of trees). The sensor remains in place for the
          duration, and it can’t be attacked or otherwise interacted with.
        </p>
        <p>
          When you cast the spell, you choose seeing or hearing. You can use the
          chosen sense through the sensor as if you were in its space. As your
          action, you can switch between seeing and hearing.
        </p>
        <p>
          A creature that can see the sensor (such as a creature benefiting from
          see invisibility or truesight) sees a luminous, intangible orb about
          the size of your fist.
        </p>
      </>
    ),
    page: 'phb 222',
    range: '1 mile',
    components: 'V, S, M',
    material:
      'A focus worth at least 100gp, either a jeweled horn for hearing or a glass eye for seeing.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '10 minutes',
    level: 3,
    school: 'Divination',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'clone',
    desc: (
      <>
        <p>
          This spell grows an inert duplicate of a living creature as a
          safeguard against death. This clone forms inside a sealed vessel and
          grows to full size and maturity after 120 days; you can also choose to
          have the clone be a younger version of the same creature. It remains
          inert and endures indefinitely, as long as its vessel remains
          undisturbed.
        </p>
        <p>
          At any time after the clone matures, if the original creature dies,
          its soul transfers to the clone, provided that the soul is free and
          willing to return. The clone is physically identical to the original
          and has the same personality, memories, and abilities, but none of the
          original’s equipment. The original creature’s physical remains, if
          they still exist, become inert and can’t thereafter be restored to
          life, since the creature’s soul is elsewhere.
        </p>
      </>
    ),
    page: 'phb 222',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A diamond worth at least 1,000 gp and at least 1 cubic inch of flesh of the creature that is to be cloned, which the spell consumes, and a vessel worth at least 2,000 gp that has a sealable lid and is large enough to hold a Medium creature, such as a huge urn, coffin, mud-filled cyst in the ground, or crystal container filled with salt water.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 hour',
    level: 8,
    school: 'Necromancy',
    class: ['wizard'],
  },
  {
    name: 'cloudOfDaggers',
    desc: (
      <>
        <p>
          Llenas el aire de dagas giratorias de un cubo de 5 pies (1 casilla,
          1,5 m) de lado. El cubo se crea en un punto a tu elección dentro del
          alcance del conjuro. Cuando una criatura entra en el área del conjuro
          por primera vez en un turno o comienza su turno dentro del área sufre
          4d4 puntos de daño cortante.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño se incrementa en 2d4 por cada nivel de espacio de
          conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 222',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A sliver of glass.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Conjuration',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'cloudkill',
    desc: (
      <>
        <p>
          You create a 20-foot-radius sphere of poisonous, yellow-green fog
          centered on a point you choose within range. The fog spreads around
          corners. It lasts for the duration or until strong wind disperses the
          fog, ending the spell. Its area is heavily obscured.
        </p>
        <p>
          When a creature enters the spell's area for the first time on a turn
          or starts its turn there, that creature must make a constitution
          saving throw. The creature takes 5d8 poison damage on a failed save,
          or half as much damage on a successful one. Creatures are affected
          even if they hold their breath or don't need to breathe.
        </p>
        <p>
          The fog moves 10 feet away from you at the start of each of your
          turns, rolling along the surface of the ground. The vapors, being
          heavier than air, sink to the lowest level of the land, even pouring
          down openings.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the damage increases by 1d8 for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 222',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Conjuration',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['underdark'],
    },
    circles: ['underdark'],
  },
  {
    name: 'colorSpray',
    desc: (
      <>
        <p>
          A dazzling array of flashing, colored light springs from your hand.
          Roll 6d10; the total is how many hit points of creatures this spell
          can effect. Creatures in a 15-foot cone originating from you are
          affected in ascending order of their current hit points (ignoring
          unconscious creatures and creatures that can’t see).
        </p>
        <p>
          Starting with the creature that has the lowest current hit points,
          each creature affected by this spell is blinded until the spell ends.
          Subtract each creature’s hit points from the total before moving on to
          the creature with the next lowest hit points. A creature’s hit points
          must be equal to or less than the remaining total for that creature to
          be affected.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 2nd level or higher,
          roll an additional 2d10 for each slot level above 1st.
        </p>
      </>
    ),
    page: 'phb 222',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A pinch of powder or sand that is colored red, yellow, and blue.',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Illusion',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'command',
    desc: (
      <>
        <p>
          Gritas una orden condensada en una palabra a una criatura que puedas
          ver dentro del alcance del conjuro. El objetivo debe superar una
          tirada de salvación de Sabiduría o cumplir la orden en su siguiente
          turno. El conjuro no tiene efecto si el objetivo es un muerto
          viviente, si no comprende tu idioma, o si tu orden es directamente
          dañina para él.
        </p>
        <p>
          A continuación tienes algunas típicas órdenes y sus efectos. Puedes
          dar una orden distinta a las descritas aquí. Si lo haces, el DM
          determina cómo se comporta el objetivo. Si el objetivo no puede
          cumplir tu orden, el conjuro finaliza.
        </p>
        <ul>
          <li>
            <b>Acércate.</b> El objetivo se mueve hacia ti por la ruta más corta
            y directa, terminando su turno si llega a menos de 5 pies (1
            casilla, 1,5 m) de ti.
          </li>
          <li>
            <b>Suéltalo.</b> El objetivo suelta cualquier cosa que este
            sujetando y luego termina su turno.
          </li>
          <li>
            <b>Huye.</b> El objetivo gasta su turno alejándose de ti de la forma
            más rápida posible.
          </li>
          <li>
            <b>Túmbate.</b> El objetivo se tira al suelo y queda tumbado y
            termina su turno.
          </li>
          <li>
            <b>Detente.</b> El objetivo no se mueve y no lleva a cabo acciones.
            Una criatura voladora permanece en el aire, volando a la distancia
            mínima necesaria para mantenerse en el aire.
          </li>
        </ul>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, puedes afectar a una criatura adicional por cada nivel de
          espacio de conjuros por encima de nivel 1. Las criaturas deben estar a
          menos de 30 pies (6 casillas, 9 m) una de otra cuando las eliges como
          objetivo.
        </p>
      </>
    ),
    page: 'phb 223',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['cleric', 'paladin', 'warlock'],
    archetype: {
      warlock: ['fiend'],
    },
    domains: ['knowledge'],
    patrons: ['fiend'],
  },
  {
    name: 'commune',
    desc: (
      <>
        <p>
          You contact your deity or a divine proxy and ask up to three questions
          that can be answered with a yes or no. You must ask your questions
          before the spell ends. You receive a correct answer for each question.
        </p>
        <p>
          Divine beings aren’t necessarily omniscient, so you might receive
          “unclear” as an answer if a question pertains to information that lies
          beyond the deity’s knowledge. In a case where a one-word answer could
          be misleading or contrary to the deity’s interests, the DM might offer
          a short phrase as an answer instead.
        </p>
        <p>
          If you cast the spell two or more times before finishing your next
          long rest, there is a cumulative 25 percent chance for each casting
          after the first that you get no answer. The DM makes this roll in
          secret.
        </p>
      </>
    ),
    page: 'phb 223',
    range: 'Self',
    components: 'V, S, M',
    material: 'Incense and a vial of holy or unholy water.',
    ritual: true,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Divination',
    class: ['cleric', 'paladin', 'ritual caster'],
    archetype: {
      paladin: ['devotion'],
    },
    oaths: 'Devotion',
  },
  {
    name: 'communeWithNature',
    desc: (
      <>
        <p>
          You briefly become one with nature and gain knowledge of the
          surrounding territory. In the outdoors, the spell gives you knowledge
          of the land within 3 miles of you. In caves and other natural
          underground settings, the radius is limited to 300 feet. The spell
          doesn’t function where nature has been replaced by construction, such
          as in dungeons and towns.
        </p>
        <p>
          You instantly gain knowledge of up to three facts of your choice about
          any of the following subjects as they relate to the area:
        </p>
        <p>- terrain and bodies of water</p>
        <p>- prevalent plants, minerals, animals, or peoples</p>
        <p>- powerful celestials, fey, fiends, elementals, or undead</p>
        <p>- influence from other planes of existence</p>
        <p>- buildings</p>
        <p>
          For example, you could determine the location of powerful undead in
          the area, the location of major sources of safe drinking water, and
          the location of any nearby towns.
        </p>
      </>
    ),
    page: 'phb 224',
    range: 'Self',
    components: 'V, S',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Divination',
    class: ['druid', 'paladin', 'ranger', 'ritual caster'],
    archetype: {
      paladin: ['ancients'],
    },
    circles: ['arctic', 'forest'],
    oaths: 'Ancients',
  },
  {
    name: 'compelledDuel',
    desc: (
      <>
        <p>
          Intentas obligar a una criatura a participar en un duelo. La criatura,
          que debe estar visible dentro del alcance del conjuro, realiza una
          tirada de salvación de Sabiduría. En caso de que falle la tirada de
          salvación, la criatura se enfrenta a ti, obligada por tu mandato
          divino. Durante la duración del conjuro, tendrá desventaja en las
          tiradas de ataque contra otras criaturas que no seas tú, y debe
          realizar tiradas de salvación de Sabiduría cada vez que intente
          moverse a un espacio que se encuentre más lejos de 30 pies (6
          casillas, 9 m) de donde te encuentras; si supera la tirada de
          salvación, el conjuro no restringe el movimiento del objetivo en ese
          turno.
        </p>
        <p>
          El conjuro finaliza si atacas a cualquier otra criatura, si lanzas un
          conjuro que tenga como objetivo una criatura hostil diferente al
          objetivo, si una criatura amiga tuya hace daño al objetivo o lanza un
          conjuro dañino contra ella, o si tu finalizas el turno a más de 30
          pies (6 casillas, 9 m) de él
        </p>
      </>
    ),
    page: 'phb 224',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Enchantment',
    class: ['paladin'],
  },
  {
    name: 'comprehendLanguages',
    desc: (
      <>
        <p>
          Mientras dura el conjuro, comprendes el significado literal de
          cualquier idioma hablado que oigas. También comprendes cualquier
          idioma escrito que veas, pero debes estar tocando la superficie sobre
          la cual están escritas las palabras. Es necesario alrededor de 1
          minuto para leer una página de texto.
        </p>
        <p>
          Este conjuro no descifra mensajes secretos en un texto o un glifo,
          como en un sello arcano, que no es parte de un idioma escrito.
        </p>
      </>
    ),
    page: 'phb 224',
    range: 'Self',
    components: 'V, S, M',
    material: 'A pinch of soot and salt.',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Divination',
    class: ['bard', 'ritual caster', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'compulsion',
    desc: (
      <>
        <p>
          Creatures of your choice that you can see within range and that can
          hear you must make a wisdom saving throw. A target automatically
          succeeds on this saving throw if it can’t be charmed. On a failed
          save, a target is affected by this spell. Until the spell ends, you
          can use a bonus action on each of your turns to designate a direction
          that is horizontal to you. Each affected target must use as much of
          its movement as possible to move in that direction on its next turn.
          It can take any action before it moves. After moving in this way, it
          can make another Wisdom save to try to end the effect.
        </p>
        <p>
          A target isn’t compelled to move into an obviously deadly hazard, such
          as a fire or a pit, but it will provoke opportunity attacks to move in
          the designated direction.
        </p>
      </>
    ),
    page: 'phb 224',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Enchantment',
    class: ['bard'],
  },
  {
    name: 'coneOfCold',
    desc: (
      <>
        <p>
          A blast of cold air erupts from your hands. Each creature in a 60-foot
          cone must make a constitution saving throw. A creature takes 8d8 cold
          damage on a failed save, or half as much damage on a successful one.
        </p>
        <p>
          A creature killed by this spell becomes a frozen statue until it
          thaws.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the damage increases by 1d8 for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 224',
    range: 'Self',
    components: 'V, S, M',
    material: 'A small crystal or glass cone.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['arctic'],
    },
    circles: ['arctic'],
  },
  {
    name: 'confusion',
    desc: (
      <>
        <p>
          This spell assails and distorts the minds of creatures, generating
          illusions and causing uncontrolled actions. Each creature in a sphere
          of 10-foot-radius centered on a point chosen in the range of the spell
          must make a wisdom saving throw otherwise it will be affected by the
          spell.
        </p>
        <p>
          An affected target can react and it must start at the beginning of
          1d10 each of his game rounds to determine its behavior for that round.
        </p>
        <p>
          At the end of each turn, an affected creature can make a saving throw
          of Wisdom. If successful, the effect of the spell ends for this
          target.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a level spell slot 5 or more, the
          radius of the sphere increases by 5 feet for each level of higher
          spell slot to 4.
        </p>
      </>
    ),
    page: 'phb 224',
    range: '90 feet',
    components: 'V, S, M',
    material: 'Three walnut shells.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['knowledge'],
    },
    domains: ['knowledge'],
  },
  {
    name: 'conjureAnimals',
    desc: (
      <>
        <p>
          You summon fey spirits that take the form of beasts and appear in
          unoccupied spaces that you can see within range. Choose one of the
          following options for what appears:
        </p>
        <p>- One beast of challenge rating 2 or lower</p>
        <p>- Two beasts of challenge rating 1 or lower</p>
        <p>- Four beasts of challenge rating 1/2 or lower</p>
        <p>- Eight beasts of challenge rating 1/4 or lower</p>
        <p>
          - Each beast is also considered fey, and it disappears when it drops
          to 0 hit points or when the spell ends.
        </p>
        <p>
          The summoned creatures are friendly to you and your companions. Roll
          initiative for the summoned creatures as a group, which has its own
          turns. They obey any verbal commands that you issue to them (no action
          required by you). If you don’t issue any commands to them, they defend
          themselves from hostile creatures, but otherwise take no actions.
        </p>
        <p>The DM has the creatures’ statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using certain higher-level spell slots, you
          choose one of the summoning options above, and more creatures appear:
          twice as many with a 5th-level slot, three times as many with a
          7th-level.
        </p>
      </>
    ),
    page: 'phb 225',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['druid', 'ranger'],
  },
  {
    name: 'conjureBarrage',
    desc: (
      <>
        <p>
          You throw a nonmagical weapon or fire a piece of nonmagical ammunition
          into the air to create a cone of identical weapons that shoot forward
          and then disappear. Each creature in a 60-foot cone must succeed on a
          dexterity saving throw. A creature takes 3d8 damage on a failed save,
          or half as much damage on a successful one. The damage type is the
          same as that of the weapon or ammunition used as a component.
        </p>
      </>
    ),
    page: 'phb 225',
    range: 'Self',
    components: 'V, S, M',
    material: 'One piece of ammunition or a thrown weapon.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['ranger'],
  },
  {
    name: 'conjureCelestial',
    desc: (
      <>
        <p>
          You summon a celestial of challenge rating 4 or lower, which appears
          in an unoccupied space that you can see within range. The celestial
          disappears when it drops to 0 hit points or when the spell ends.
        </p>
        <p>
          The celestial is friendly to you and your companions for the duration.
          Roll initiative for the celestial, which has its own turns. It obeys
          any verbal commands that you issue to it (no action required by you),
          as long as they don’t violate its alignment. If you don’t issue any
          commands to the celestial, it defends itself from hostile creatures
          but otherwise takes no actions.
        </p>
        <p>The DM has the celestial’s statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a 9th-level spell slot, you summon a
          celestial of challenge rating 5 or lower.
        </p>
      </>
    ),
    page: 'phb 225',
    range: '90 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 minute',
    level: 7,
    school: 'Conjuration',
    class: ['cleric'],
  },
  {
    name: 'conjureElemental',
    desc: (
      <>
        <p>
          You call forth an elemental servant. Choose an area of air, earth,
          fire, or water that fills a 10-foot cube within range. An elemental of
          challenge rating 5 or lower appropriate to the area you chose appears
          in an unoccupied space within 10 feet of it. For example, a fire
          elemental emerges from a bonfire, and an earth elemental rises up from
          the ground. The elemental disappears when it drops to 0 hit points or
          when the spell ends.
        </p>
        <p>
          The elemental is friendly to you and your companions for the duration.
          Roll initiative for the elemental, which has its own turns. It obeys
          any verbal commands that you issue to it (no action required by you).
          If you don’t issue any commands to the elemental, it defends itself
          from hostile creatures but otherwise takes no actions.
        </p>
        <p>
          If your concentration is broken, the elemental doesn’t disappear.
          Instead, you lose control of the elemental, it becomes hostile toward
          you and your companions, and it might attack. An uncontrolled
          elemental can’t be dismissed by you, and it disappears 1 hour after
          you summoned it.
        </p>
        <p>The DM has the elemental’s statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the challenge rating increases by 1 for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 225',
    range: '90 feet',
    components: 'V, S, M',
    material:
      'Burning incense for air, soft clay for earth, sulfur and phosphorus for fire, or water and sand for water.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 minute',
    level: 5,
    school: 'Conjuration',
    class: ['druid', 'wizard'],
    circles: ['coast'],
  },
  {
    name: 'conjureFey',
    desc: (
      <>
        <p>
          You summon a fey creature of challenge rating 6 or lower, or a fey
          spirit that takes the form of a beast of challenge rating 6 or lower.
          It appears in an unoccupied space that you can see within range. The
          fey creature disappears when it drops to 0 hit points or when the
          spell ends.
        </p>
        <p>
          The fey creature is friendly to you and your companions for the
          duration. Roll initiative for the creature, which has its own turns.
          It obeys any verbal commands that you issue to it (no action required
          by you), as long as they don't violate its alignment. If you don’t
          issue any commands to the fey creature, it defends itself from hostile
          creatures but otherwise takes no actions.
        </p>
        <p>
          If your concentration is broken, the fey creature doesn’t disappear.
          Instead, you lose control of the fey creature, it becomes hostile
          toward you and your companions, and it might attack. An uncontrolled
          fey creature can't be dismissed by you, and it disappears 1 hour after
          you summoned it.
        </p>
        <p>The DM has the fey creature’s statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the challenge rating increases by 1 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 226',
    range: '90 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 minute',
    level: 6,
    school: 'Conjuration',
    class: ['druid', 'warlock'],
  },
  {
    name: 'conjureMinorElementals',
    desc: (
      <>
        <p>
          You summon elementals that appear in unoccupied spaces that you can
          see within range. You choose one the following options for what
          appears:
        </p>
        <p>- One elemental of challenge rating 2 or lower</p>
        <p>- Two elementals of challenge rating 1 or lower</p>
        <p>- Four elementals of challenge rating 1/2 or lower</p>
        <p>- Eight elementals of challenge rating 1/4 or lower.</p>
        <p>
          An elemental summoned by this spell disappears when it drops to 0 hit
          points or when the spell ends.
        </p>
        <p>
          The summoned creatures are friendly to you and your companions. Roll
          initiative for the summoned creatures as a group, which has its own
          turns. They obey any verbal commands that you issue to them (no action
          required by you). If you don’t issue any commands to them, they defend
          themselves from hostile creatures, but otherwise take no actions.
        </p>
        <p>The DM has the creatures' statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using certain higher-level spell slots, you
          choose one of the summoning options above, and more creatures appear:
          twice as many with a 6th-level slot and three times as many with an
          8th-level slot.
        </p>
      </>
    ),
    page: 'phb 226',
    range: '90 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 minute',
    level: 4,
    school: 'Conjuration',
    class: ['druid', 'wizard'],
  },
  {
    name: 'conjureVolley',
    desc: (
      <>
        <p>
          You fire a piece of nonmagical ammunition from a ranged weapon or
          throw a nonmagical weapon into the air and choose a point within
          range. Hundreds of duplicates of the ammunition or weapon fall in a
          volley from above and then disappear. Each creature in a
          40-foot-radius. 20-foot-high cylinder centered on that point must make
          a dexterity saving throw. A creature takes 8d8 damage on a failed
          save, or half as much damage on a successful one. The damage type is
          the same as that of the ammunition or weapon.
        </p>
      </>
    ),
    page: 'phb 226',
    range: '150 feet',
    components: 'V, S, M',
    material: 'One piece of ammunition or one thrown weapon.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Conjuration',
    class: ['ranger'],
  },
  {
    name: 'conjureWoodlandBeings',
    desc: (
      <>
        <p>
          You summon fey creatures that appear in unoccupied spaces that you can
          see within range. Choose one of the following options for what
          appears:
        </p>
        <p>- One fey creature of challenge rating 2 or lower</p>
        <p>- Two fey creatures of challenge rating 1 or lower</p>
        <p>- Four fey creatures of challenge rating 1/2 or lower</p>
        <p>- Eight fey creatures of challenge rating 1/4 or lower</p>
        <p>
          A summoned creature disappears when it drops to 0 hit points or when
          the spell ends.
        </p>
        <p>
          The summoned creatures are friendly to you and your companions. Roll
          initiative for the summoned creatures as a group, which have their own
          turns. They obey any verbal commands that you issue to them (no action
          required by you). If you don't issue any commands to them, they defend
          themselves from hostile creatures, but otherwise take no actions.
        </p>
        <p>The DM has the creatures’ statistics.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using certain higher-level spell slots, you
          choose one of the summoning options above, and more creatures appear:
          twice as many with a 6th-level slot and three times as many with an
          8th-level slot.
        </p>
      </>
    ),
    page: 'phb 226',
    range: '60 feet',
    components: 'V, S, M',
    material: 'One holly berry per creature summoned.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['druid', 'ranger'],
  },
  {
    name: 'contactOtherPlane',
    desc: (
      <>
        <p>
          You mentally contact a demigod, the spirit of a long-dead sage, or
          some other mysterious entity from another plane. Contacting this
          extraplanar intelligence can strain or even break your mind. When you
          cast this spell, make a DC 15 intelligence saving throw. On a failure,
          you take 6d6 psychic damage and are insane until you finish a long
          rest. While insane, you can’t take actions, can’t understand what
          other creatures say, can’t read, and speak only in gibberish. A
          greater restoration spell cast on you ends this effect.
        </p>
        <p>
          On a successful save, you can ask the entity up to five questions. You
          must ask your questions before the spell ends. The DM answers each
          question with one word, such as “yes,” “no,” “maybe,” “never,”
          “irrelevant,” or “unclear” (if the entity doesn’t know the answer to
          the question). If a one-word answer would be misleading, the DM might
          instead offer a short phrase as an answer.
        </p>
      </>
    ),
    page: 'phb 226',
    range: 'Self',
    components: 'V',
    ritual: true,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Divination',
    class: ['ritual caster', 'warlock', 'wizard'],
  },
  {
    name: 'contagion',
    desc: (
      <>
        <p>
          Your touch inflicts disease. Make a melee spell attack against a
          creature within your reach. On a hit, you afflict the creature with a
          disease of your choice from any of the ones described below.
        </p>
        <p>
          At the end of each of the target’s turns, it must make a constitution
          saving throw. After failing three of these saving throws, the
          disease’s effects last for the duration, and the creature stops making
          these saves. After succeeding on three of these saving throws, the
          creature recovers from the disease, and the spell ends.
        </p>
        <p>
          Since this spell induces a natural disease in its target, any effect
          that removes a disease or otherwise ameliorates a disease’s effects
          apply to it.
        </p>
        <p>
          <b>Blinding Sickness.</b> Pain grips the creature’s mind, and its eyes
          turn milky white. The creature has disadvantage on wisdom checks and
          wisdom saving throws and is blinded.
        </p>
        <p>
          <b>Filth Fever.</b> A raging fever sweeps through the creature’s body.
          The creature has disadvantage on strength checks, strength saving
          throws, and attack rolls that use Strength.
        </p>
        <p>
          <b>Flesh Rot.</b> The creature’s flesh decays. The creature has
          disadvantage on Charisma checks and vulnerability to all damage.
        </p>
        <p>
          <b>Mindfire.</b> The creature’s mind becomes feverish. The creature
          has disadvantage on intelligence checks and intelligence saving
          throws, and the creature behaves as if under the effects of the
          confusion spell during combat.
        </p>
        <p>
          <b>Seizure.</b> The creature is overcome with shaking. The creature
          has disadvantage on dexterity checks, dexterity saving throws, and
          attack rolls that use Dexterity.
        </p>
        <p>
          <b>Slimy Doom.</b> The creature begins to bleed uncontrollably. The
          creature has disadvantage on constitution checks and constitution
          saving throws. In addition, whenever the creature takes damage, it is
          stunned until the end of its next turn.
        </p>
      </>
    ),
    page: 'phb 227',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: '7 days',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Necromancy',
    class: ['cleric', 'druid'],
  },
  {
    name: 'contingency',
    desc: (
      <>
        <p>
          Choose a spell of 5th level or lower that you can cast, that has a
          casting time of 1 action, and that can target you. You cast that
          spell—called the contingent spell—as part of casting contingency,
          expending spell slots for both, but the contingent spell doesn't come
          into effect. Instead, it takes effect when a certain circumstance
          occurs. You describe that circumstance when you cast the two spells.
          For example, a contingency cast with water breathing might stipulate
          that water breathing comes into effect when you are engulfed in water
          or a similar liquid.{' '}
        </p>
        <p>
          The contingent spell takes effect immediately after the circumstance
          is met for the first time, whether or not you want it to. and then
          contingency ends.
        </p>
        <p>
          The contingent spell takes effect only on you, even if it can normally
          target others. You can use only one contingency spell at a time. If
          you cast this spell again, the effect of another contingency spell on
          you ends. Also, contingency ends on you if its material component is
          ever not on your person.
        </p>
      </>
    ),
    page: 'phb 227',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A statuette of yourself carved from ivory and decorated with gems worth at least 1,500 gp.',
    ritual: false,
    duration: '10 days',
    concentration: false,
    casting_time: '10 minutes',
    level: 6,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: 'continualFlame',
    desc: (
      <>
        <p>
          Una llama, equivalente en brillo a una antorcha, brota de un objeto
          que tocas. El efecto tiene la misma apariencia que una llama normal
          pero ni da calor ni consume oxígeno. La llama incesante puede cubrirse
          y esconderse, pero no puede sofocarse ni extinguirse.
        </p>
      </>
    ),
    page: 'phb 227',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Ruby dust worth 50 gp, which the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['cleric', 'wizard'],
  },
  {
    name: 'controlWater',
    desc: (
      <>
        <p>
          Until the spell ends, you control any freestanding water inside an
          area you choose that is a cube up to 100 feet on a side. You can
          choose from any of the following effects when you cast this spell. As
          an action on your turn, you can repeat the same effect or choose a
          different one.
        </p>
        <p>
          <b>Flood.</b> You cause the water level of all standing water in the
          area to rise by as much as 20 feet. If the area includes a shore, the
          flooding water spills over onto dry land.
        </p>
        <p>
          instead create a 20-foot tall wave that travels from one side of the
          area to the other and then crashes down. Any Huge or smaller vehicles
          in the wave’s path are carried with it to the other side. Any Huge or
          smaller vehicles struck by the wave have a 25 percent chance of
          capsizing.
        </p>
        <p>
          The water level remains elevated until the spell ends or you choose a
          different effect. If this effect produced a wave, the wave repeats on
          the start of your next turn while the flood effect lasts.
        </p>
        <p>
          <b>Part Water.</b> You cause water in the area to move apart and
          create a trench. The trench extends across the spell’s area, and the
          separated water forms a wall to either side. The trench remains until
          the spell ends or you choose a different effect. The water then slowly
          fills in the trench over the course of the next round until the normal
          water level is restored.
        </p>
        <p>
          <b>Redirect Flow.</b> You cause flowing water in the area to move in a
          direction you choose, even if the water has to flow over obstacles, up
          walls, or in other unlikely directions. The water in the area moves as
          you direct it, but once it moves beyond the spell’s area, it resumes
          its flow based on the terrain conditions. The water continues to move
          in the direction you chose until the spell ends or you choose a
          different effect.
        </p>
        <p>
          <b>Whirlpool.</b> This effect requires a body of water at least 50
          feet square and 25 feet deep. You cause a whirlpool to form in the
          center of the area. The whirlpool forms a vortex that is 5 feet wide
          at the base, up to 50 feet wide at the top, and 25 feet tall. Any
          creature or object in the water and within 25 feet of the vortex is
          pulled 10 feet toward it. A creature can swim away from the vortex by
          making a Strength (Athletics) check against your spell save DC.
        </p>
        <p>
          When a creature enters the vortex for the first time on a turn or
          starts its turn there, it must make a strength saving throw. On a
          failed save, the creature takes 2d8 bludgeoning damage and is caught
          in the vortex until the spell ends. On a successful save, the creature
          takes half damage, and isn’t caught in the vortex. A creature caught
          in the vortex can use its action to try to swim away from the vortex
          as described above, but has disadvantage on the Strength (Athletics)
          check to do so.
        </p>
        <p>
          The first time each turn that an object enters the vortex, the object
          takes 2d8 bludgeoning damage; this damage occurs each round it remains
          in the vortex.
        </p>
      </>
    ),
    page: 'phb 227',
    range: '300 feet',
    components: 'V, S, M',
    material: 'A drop of water and a pinch of dust.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'wizard'],
  },
  {
    name: 'controlWeather',
    desc: (
      <>
        <p>
          You take control of the weather within 5 miles of you for the
          duration. You must be outdoors to cast this spell. Moving to a place
          where you don’t have a clear path to the sky ends the spell early.
        </p>
        <p>
          When you cast the spell, you change the current weather conditions,
          which are determined by the DM based on the climate and season. You
          can change precipitation, temperature, and wind. It takes 1d4 x 10
          minutes for the new conditions to take effect. Once they do so, you
          can change the conditions again. When the spell ends, the weather
          gradually returns to normal.
        </p>
        <p>
          When you change the weather conditions, find a current condition on
          the following tables and change its stage by one, up or down. When
          changing the wind, you can change its direction.
        </p>
      </>
    ),
    page: 'phb 228',
    range: 'Self',
    components: 'V, S, M',
    material: 'Burning incense and bits of earth and wood mixed in water.',
    ritual: false,
    duration: 'Up to 8 hours',
    concentration: true,
    casting_time: '10 minutes',
    level: 8,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'wizard'],
    domains: ['tempest'],
    circles: ['coast'],
  },
  {
    name: 'cordonOfArrows',
    desc: (
      <>
        <p>
          Entierras 4 piezas de munición no mágica, flechas o proyectiles de
          ballesta, en el suelo dentro del alcance para proteger una zona y los
          cubres de magia. Hasta que finalice el conjuro, cualquier criatura que
          no seas tú, que se aproximé por primera vez en su turno o comience su
          turno a 30 pies (6 casillas, 9 m) de la munición, recibirá el impacto
          de uno de los proyectiles. La criatura debe superar una tirada de
          salvación de Destreza o sufrir 1d6 puntos de daño perforante. La
          munición utilizada se destruye. El conjuro finaliza cuando no queda
          más munición.
        </p>
        <p>
          Cuando lanzas este conjuro, puedes elegir varias criaturas a tu
          elección que el conjuro ignora.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, la cantidad de munición que puede hechizarse se incrementa
          en 2 por cada nivel de espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 228',
    range: '5 feet',
    components: 'V, S, M',
    material: 'Four or more arrows or bolts.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['ranger'],
  },
  {
    name: 'counterspell',
    desc: (
      <>
        <p>
          You attempt to interrupt a creature in the process of casting a spell.
          If the creature is casting a spell of 3rd level or lower, its spell
          fails and has no effect. If it is casting a spell of 4th level or
          higher, make an ability check using your spellcasting ability. The DC
          equals 10 + the spell’s level. On a success, the creature’s spell
          fails and has no effect.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the interrupted spell has no effect if its level is less than or equal
          to the level of the spell slot you used.
        </p>
      </>
    ),
    page: 'phb 228',
    range: '60 feet',
    components: 'S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 reaction',
    level: 3,
    school: 'Abjuration',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'createFoodAndWater',
    desc: (
      <>
        <p>
          You create 45 pounds of food and 30 gallons of water on the ground or
          in containers within range, enough to sustain up to fifteen humanoids
          or five steeds for 24 hours. The food is bland but nourishing, and
          spoils if uneaten after 24 hours. The water is clean and doesn’t go
          bad.
        </p>
      </>
    ),
    page: 'phb 229',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'paladin'],
    archetype: {
      druid: ['desert'],
    },
    circles: ['desert'],
  },
  {
    name: 'createOrDestroyWater',
    desc: (
      <>
        <p>Puedes crear o destruir agua.</p>
        <ul>
          <li>
            <b>Crear agua.</b> Creas 10 galones (37 litros) de agua limpia en un
            recipiente que se encuentra dentro del alcance del conjuro.
            Alternativamente, el agua cae como lluvia en un cubo de 30 pies
            cuadrados (6 casillas, 9 m), extinguiendo las llamas que puede haber
            en ese área.
          </li>
          <li>
            <b>Destruir agua.</b> Destruyes 10 galones (37 litros) de agua que
            se encuentre en un recipiente situado dentro del alcance del
            conjuro. Alternativamente, destruyes niebla en un cubo cuadrado de
            30 pies (6 casillas, 9 m) dentro del alcance del conjuro.
          </li>
        </ul>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, puedes crear o destruir 10 galones (37 litros) de agua
          adicionales, o aumentar en 5 pies (1 casillas, 1,5 m) el tamaño del
          cubo, por cada nivel de espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 229',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A drop of water if creating water, or a few grains of sand if destroying it.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Transmutation',
    class: ['cleric', 'druid'],
  },
  {
    name: 'createUndead',
    desc: (
      <>
        <p>
          You can cast this spell only at night. Choose up to three corpses of
          Medium or Small humanoids within range. Each corpse becomes a ghoul
          under your control. (The DM has game statistics for these creatures.)
        </p>
        <p>
          As a bonus action on each of your turns, you can mentally command any
          creature you animated with this spell if the creature is within 120
          feet of you (if you control multiple creatures, you can command any or
          all of them at the same time, issuing the same command to each one).
          You decide what action the creature will take and where it will move
          during its next turn, or you can issue a general command, such as to
          guard a particular chamber or corridor. If you issue no commands, the
          creature only defends itself against hostile creatures. Once given an
          order, the creature continues to follow it until its task is complete.
        </p>
        <p>
          The creature is under your control for 24 hours, after which it stops
          obeying any command you have given it. To maintain control of the
          creature for another 24 hours, you must cast this spell on the
          creature before the current 24-hour period ends. This use of the spell
          reasserts your control over up to three creatures you have animated
          with this spell, rather than animating new ones.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a 7th-level spell slot, you can animate
          or reassert control over four ghouls. When you cast this spell using
          an 8th-level spell slot, you can animate or reassert control over five
          ghouls or two ghasts or wights. When you cast this spell using a
          9th-level spell slot, you can animate or reassert control over six
          ghouls, three ghasts or wights, or two mummies.
        </p>
      </>
    ),
    page: 'phb 229',
    range: '10 feet',
    components: 'V, S, M',
    material:
      'One clay pot filled with grave dirt, one clay pot filled with brackish water, and one 150 gp black onyx stone for each corpse.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 6,
    school: 'Necromancy',
    class: ['cleric', 'warlock', 'wizard'],
  },
  {
    name: 'creation',
    desc: (
      <>
        <p>
          You pull wisps of shadow material from the Shadowfell to create a
          nonliving object of vegetable matter within 'range': soft goods, rope,
          wood, or something similar. You can also use this spell to create
          mineral objects such as stone, crystal, or metal. The object created
          must be no larger than a 5-foot cube, and the object must be of a form
          and material that you have seen before.
        </p>
        <p>
          The duration depends on the object’s material. If the object is
          composed of multiple materials, use the shortest duration.
        </p>
        <p>
          <b>Vegetable matter</b> 1 day
        </p>
        <p>
          <b>Stone or crystal</b> 12 hours
        </p>
        <p>
          <b>Precious metals</b> 1 hour
        </p>
        <p>
          <b>Gems</b> 10 minutes
        </p>
        <p>
          <b>Adamantine or mithral</b> 1 minute
        </p>
        <p>
          Using any material created by this spell as another spell’s material
          component causes that spell to fail.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the cube increases by 5 feet for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 229',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A tiny piece of matter of the same type of the item you plan to create.',
    ritual: false,
    duration: 'Special',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Illusion',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'crownOfMadness',
    desc: (
      <>
        <p>
          Un humanoide de tu elección que puedas ver dentro del alcance del
          conjuro debe tener éxito en una tirada de salvación de Sabiduría o ser
          encantado por ti hasta que el conjuro finalice. Mientras el objetivo
          esté encantado aparece sobre su cabeza una retorcida corona de púas de
          hierro y un brillo de locura en sus ojos.
        </p>
        <p>
          La criatura encantada debe utilizar su acción antes de mover en cada
          uno de sus turnos para realizar un ataque cuerpo a cuerpo contra una
          criatura que no sea ella misma que tú eliges mentalmente.
        </p>
        <p>
          El objetivo puede actuar de forma normal en su turno si no eliges
          ninguna criatura o si no hay ninguna criatura a su alcance.
        </p>
        <p>
          En los siguientes turnos, debes usar tu acción para mantener el
          control sobre el objetivo o el conjuro finaliza. El objetivo también
          puede realizar una tirada de salvación basada en la Sabiduría al
          finalizar cada uno de sus turnos. Si supera la tirada el conjuro
          acaba.
        </p>
      </>
    ),
    page: 'phb 229',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: "crusader'sMantle",
    desc: (
      <>
        <p>
          Holy power radiates from you in an aura with a 30-foot radius,
          awakening boldness in friendly creatures. Until the spell ends, the
          aura moves with you, centered on you. While in the aura, each
          nonhostile creature in the aura (including you) deals an extra 1d4
          radiant damage when it hits with a weapon attack.
        </p>
      </>
    ),
    page: 'phb 230',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['cleric', 'paladin'],
    archetype: {
      cleric: ['war'],
    },
    domains: ['war'],
  },
  {
    name: 'cureWounds',
    desc: (
      <>
        <p>
          Una criatura que tocas recupera un número de Puntos de Golpe igual a
          1d8 + tu modificador de característica para lanzar conjuros. Este
          conjuro no tiene efecto sobre muertos vivientes o constructos.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, la curación se incrementa en 1d8 por cada nivel de espacio
          de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 230',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    domains: ['life'],
  },
  {
    name: 'dancingLights',
    desc: (
      <>
        <p>
          Creas hasta cuatro luces del tamaño de una antorcha dentro del alcance
          (antorchas, linternas u orbes brillantes) que flotan en el aire
          mientras dura el conjuro. También puedes combinar las cuatro luces en
          una forma brillante vagamente humanoide de tamaño Mediano.
          Independientemente de lo que elijas, cada luz emite una luz tenue en
          un radio de 10 pies.
        </p>
        <p>
          Como acción adicional durante tu turno, puedes mover las luces hasta
          60 pies a un nuevo lugar dentro del alcance. Una luz debe estar a 20
          pies o menos de otra luz creada mediante este conjuro y se apaga si
          excede el alcance del conjuro.
        </p>
      </>
    ),
    page: 'phb 230',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A bit of phosphorus or wychwood, or a glowworm.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'darkness',
    desc: (
      <>
        <p>
          Una oscuridad mágica se extiende desde un punto a tu elección dentro
          del alcance del conjuro para llenar una esfera de 15 pies (3 casillas,
          4,5 m) de radio mientras dura el mismo. La oscuridad se extiende
          alrededor de las esquinas. Una criatura con visión en la oscuridad no
          puede ver en esta oscuridad, y las luces no mágicas no pueden
          iluminarla.
        </p>
        <p>
          Si el punto que eliges es un objeto que portas o uno que no está
          siendo sujetado o transportado, la oscuridad emana desde el objeto y
          se mueve con él. Cubrir totalmente la fuente de oscuridad con un
          objeto opaco, como por ejemplo con un cuenco o con un yelmo, bloquea
          la oscuridad.
        </p>
        <p>
          Si partes del área de este conjuro se superponen con un área de luz
          creada por un conjuro de nivel 2 o menor, el conjuro que creó la luz
          queda disipado.
        </p>
      </>
    ),
    page: 'phb 230',
    range: '60 feet',
    components: 'V, M',
    material: 'Bat fur and a drop of pitch or piece of coal.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['swamp'],
    },
    circles: ['swamp'],
  },
  {
    name: 'darkvision',
    desc: (
      <>
        <p>
          Tocas a una criatura voluntaria para concederle la habilidad de ver en
          la oscuridad. Durante la duración del conjuro, la criatura elegida
          puede ver en la oscuridad hasta un alcance de 60 pies (12 casillas, 18
          m).
        </p>
      </>
    ),
    page: 'phb 230',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Either a pinch of dried carrot or an agate.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['druid', 'ranger', 'sorcerer', 'wizard'],
  },
  {
    name: 'daylight',
    desc: (
      <>
        <p>
          A 60-foot-radius sphere of light spreads out from a point you choose
          within range. The sphere is bright light and sheds dim light for an
          additional 60 feet.
        </p>
        <p>
          If you chose a point on an object you are holding or one that isn’t
          being worn or carried, the light shines from the object and moves with
          it. Completely covering the affected object with an opaque object,
          such as a bowl or a helm, blocks the light.
        </p>
        <p>
          If any of this spell’s area overlaps with an area of darkness created
          by a spell of 3rd level or lower, the spell that created the darkness
          is dispelled.
        </p>
      </>
    ),
    page: 'phb 230',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['cleric', 'druid', 'paladin', 'ranger', 'sorcerer'],
    domains: ['light'],
    circles: ['grassland'],
  },
  {
    name: 'deathWard',
    desc: (
      <>
        <p>
          You touch a creature and grant it a measure of protection from death.
        </p>
        <p>
          The first time the target would drop to 0 hit points as a result of
          taking damage, the target instead drops to 1 hit point, and the spell
          ends.
        </p>
        <p>
          If the spell is still in effect when the target is subjected to an
          effect that would kill it instantaneously without dealing damage, that
          effect is instead negated against the target, and the spell ends.
        </p>
      </>
    ),
    page: 'phb 230',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
    domains: ['life'],
  },
  {
    name: 'delayedBlastFireball',
    desc: (
      <>
        <p>
          A beam of yellow light flashes from your pointing finger, then
          condenses to linger at a chosen point within range as a glowing bead
          for the duration. When the spell ends, either because your
          concentration is broken or because you decide to end it, the bead
          blossoms with a low roar into an explosion of flame that spreads
          around corners. Each creature in a 20-foot-radius sphere centered on
          that point must make a dexterity saving throw. A creature takes fire
          damage equal to the total accumulated damage on a failed save, or half
          as much damage on a successful one.
        </p>
        <p>
          The spell’s base damage is 12d6. If at the end of your turn the bead
          has not yet detonated, the damage increases by 1d6.
        </p>
        <p>
          If the glowing bead is touched before the interval has expired, the
          creature touching it must make a dexterity saving throw. On a failed
          save, the spell ends immediately, causing the bead to erupt in flame.
          On a successful save, the creature can throw the bead up to 40 feet.
          When it strikes a creature or a solid object, the spell ends, and the
          bead explodes.
        </p>
        <p>
          The fire damages objects in the area and ignites flammable objects
          that aren’t being worn or carried.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 8th level or higher,
          the base damage increases by 1d6 for each slot level above 7th.
        </p>
      </>
    ),
    page: 'phb 230',
    range: '150 feet',
    components: 'V, S, M',
    material: 'A tiny ball of bat guano and sulfur.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 7,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'demiplane',
    desc: (
      <>
        <p>
          You create a shadowy door on a flat solid surface that you can see
          within range. The door is large enough to allow Medium creatures to
          pass through unhindered. When opened, the door leads to a demiplane
          that appears to be an empty room 30 feet in each dimension, made of
          wood or stone. When the spell ends, the door disappears, and any
          creatures or objects inside the demiplane remain trapped there, as the
          door also disappears from the other side.
        </p>
        <p>
          Each time you cast this spell, you can create a new demiplane, or have
          the shadowy door connect to a demiplane you created with a previous
          casting of this spell. Additionally, if you know the nature and
          contents of a demiplane created by a casting of this spell by another
          creature, you can have the shadowy door connect to its demiplane
          instead.
        </p>
      </>
    ),
    page: 'phb 231',
    range: '60 feet',
    components: 'S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Conjuration',
    class: ['warlock', 'wizard'],
  },
  {
    name: 'destructiveWave',
    desc: (
      <>
        <p>
          You strike the ground, creating a burst of divine energy that ripples
          outward from you. Each creature you choose within 30 feet of you must
          succeed on a constitution saving throw or take 5d6 thunder damage, as
          well as 5d6 radiant or necrotic damage (your choice), and be knocked
          prone. A creature that succeeds on its saving throw takes half as much
          damage and isn’t knocked prone.
        </p>
      </>
    ),
    page: 'phb 231',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['cleric', 'paladin'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
  },
  {
    name: 'detectEvilAndGood',
    desc: (
      <>
        <p>
          Mientras dure el conjuro, sabes si hay aberraciones, celestiales,
          feéricos, infernales o muertos vivientes a 30 pies (6 casillas, 9 m)
          de ti, y también la localización de la criatura. De manera similar,
          sabes si un lugar u objeto hasta a 30 pies (6 casillas, 9 m) de ti ha
          sido mágicamente sacralizado o desacralizado.
        </p>
        <p>
          El conjuro puede penetrar en la mayoría de barreras, pero es bloqueado
          por 1 pie (30 cm) de piedra, 1 pulgada (2,54 cm) de metal común, una
          delgada capa de plomo o 3 pies (90 cm) de madera o suciedad.
        </p>
      </>
    ),
    page: 'phb 231',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Divination',
    class: ['cleric', 'paladin'],
  },
  {
    name: 'detectMagic',
    desc: (
      <>
        <p>
          Mientras dura el conjuro, sientes la presencia de la magia a menos de
          30 pies (6 casillas, 9 m) de ti. Si sientes magia de esta forma,
          puedes utilizar tu acción para ver un aura débil alrededor de
          cualquier criatura u objeto visibles en al área que posee magia, y
          averiguar su escuela de magia, si existe.
        </p>
        <p>
          El conjuro puede penetrar en la mayoría de barreras, pero es bloqueado
          por 1 pie (30 cm) de piedra, 1 pulgada (2,54 cm) de metal común, una
          delgada capa de plomo o 3 pies (90 cm) de madera o suciedad.
        </p>
      </>
    ),
    page: 'phb 231',
    range: 'Self',
    components: 'V, S',
    ritual: true,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Divination',
    class: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'ritual caster',
      'sorcerer',
      'wizard',
    ],
  },
  {
    name: 'detectPoisonAndDisease',
    desc: (
      <>
        <p>
          Mientras dure el conjuro, notas la presencia y localización de
          venenos, criaturas venenosas y enfermedades hasta a 30 pies (6
          casillas, 9 m) de ti. También identificas el tipo de veneno, criatura
          venenosa o enfermedad en cada caso.
        </p>
        <p>
          El conjuro puede penetrar en la mayoría de barreras, pero es bloqueado
          por 1 pie (30 cm) de piedra, 1 pulgada (2,54 cm) de metal común, una
          delgada capa de plomo o 3 pies (90 cm) de madera o suciedad.
        </p>
      </>
    ),
    page: 'phb 231',
    range: 'Self',
    components: 'V, S, M',
    material: 'A yew leaf.',
    ritual: true,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Divination',
    class: ['cleric', 'druid', 'paladin', 'ranger', 'ritual caster'],
  },
  {
    name: 'detectThoughts',
    desc: (
      <>
        <p>
          Mientras dure el conjuro, puedes leer los pensamientos de ciertas
          criaturas. Cuando lanzas el conjuro y como tu acción en los turnos
          siguientes hasta que el conjuro finalice, puedes concentrar tu mente
          en una criatura que puedas ver hasta 30 pies (6 casillas, 9 m) de ti.
          Si la criatura elegida tiene una Inteligencia de 3 o menos o no habla
          ninguna lengua, ésta no se ve afectada.
        </p>
        <p>
          Inicialmente descubres los pensamientos superficiales de la criatura,
          lo que piensa en ese momento. Como una acción, puedes, o bien
          desplazar tu atención a los pensamientos de otra criatura, o bien
          sondear con mayor profundidad en la mente de la misma criatura. Si
          investigas más a fondo, la criatura debe realizar una tirada de
          salvación de Sabiduría. Si la salvación falla consigues entender su
          manera de razonar (si la tiene), su estado emocional, y algo que se
          cierne de forma notoria sobre su mente (como algo que le preocupa, ama
          u odia). Con una salvación con éxito, el conjuro finaliza. En
          cualquier caso, la criatura es consciente de que estás sondeando su
          mente, y a menos que desplaces tu atención a los pensamientos de otra
          criatura, la criatura puede usar su acción en su turno para realizar
          una prueba de Inteligencia enfrentada a una prueba de Inteligencia
          tuya; si la supera, el conjuro finaliza.
        </p>
        <p>
          Las preguntas dirigidas verbalmente a la criatura objetivo moldean de
          forma natural el curso de sus pensamientos, por lo que este conjuro es
          especialmente efectivo como parte de un interrogatorio.
        </p>
        <p>
          También puedes usar este conjuro para detectar la presencia de
          criaturas pensantes que no puedas ver. Cuando lanzas el conjuro o como
          una acción mientras éste dure, puedes buscar pensamientos hasta 30
          pies (6 casillas, 9 m) de ti. El conjuro puede penetrar en la mayoría
          de barreras, pero es bloqueado por 2 pies (60 cm) de piedra, 2 pulgada
          (5 cm) de metal común o una delgada capa de plomo. No puedes detectar
          una criatura con una Inteligencia 3 o menor o una que no hable ninguna
          lengua.
        </p>
        <p>
          Una vez detectas la presencia de una criatura de esta forma, puedes
          leer sus pensamientos durante el resto de la duración como se ha
          descrito arriba aunque no puedas verla, pero debe mantenerse en el
          alcance.
        </p>
      </>
    ),
    page: 'phb 231',
    range: 'Self',
    components: 'V, S, M',
    material: 'A copper coin.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'dimensionDoor',
    desc: (
      <>
        <p>
          You teleport yourself from your current location to any other spot
          within range. You arrive at exactly the spot desired. It can be a
          place you can see, one you can visualize, or one you can describe by
          stating distance and direction, such as “200 feet straight downward”
          or “upward to the northwest at a 45-degree angle, 300 feet.”
        </p>
        <p>
          You can bring along objects as long as their weight doesn’t exceed
          what you can carry. You can also bring one willing creature of your
          size or smaller who is carrying gear up to its carrying capacity. The
          creature must be within 5 feet of you when you cast this spell.
        </p>
        <p>
          If you would arrive in a place already occupied by an object or a
          creature, you and any creature traveling with you each take 4d6 force
          damage, and the spell fails to teleport you.
        </p>
      </>
    ),
    page: 'phb 233',
    range: '500 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['bard', 'cleric', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['trickery'],
      paladin: ['vengeance'],
    },
    domains: ['trickery'],
    oaths: 'Vengeance',
  },
  {
    name: 'disguiseSelf',
    desc: (
      <>
        <p>
          Haces que tu aspecto, incluyendo ropa, armadura, armas y otras
          posesiones en tu persona, sea diferente hasta que finalice el conjuro
          o hasta que uses tu acción para cancelarlo. Puedes parecer 1 pie (30
          cm) más bajo o más alto y puedes parecer más delgado, más gordo o algo
          intermedio.
        </p>
        <p>
          No puedes cambiar el tipo de criatura, así que debes adoptar una forma
          que tenga la misma disposición básica de extremidades. De otro modo,
          la extensión de la ilusión depende de ti
        </p>
        <p>
          Los cambios creados por este conjuro no se sostienen ante un examen
          físico. Por ejemplo, si utilizas este conjuro para añadir un sombrero
          a tu apariencia, los objetos traspasan el sombrero, y cualquiera que
          intente tocarlo no tocaría nada o tocaría tu cabeza y pelo. Si
          utilizas este conjuro para parecer más delgado de lo que eres, la mano
          de alguien que se extienda para tocarte chocaría contigo mientras
          pareciera que aún está en el aire.
        </p>
        <p>
          Para percibir que esta disfrazado, una criatura puede utilizar su
          acción para examinar tu apariencia y debe superar una prueba de
          Inteligencia.
        </p>
      </>
    ),
    page: 'phb 233',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Illusion',
    class: ['bard', 'cleric', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
  },
  {
    name: 'disintegrate',
    desc: (
      <>
        <p>
          A thin green ray springs from your pointing finger to a target that
          you can see within range. The target can be a creature, an object, or
          a creation of magical force, such as the wall created by wall of
          force.
        </p>
        <p>
          A creature targeted by this spell must make a dexterity saving throw.
          On a failed save, the target takes 10d6 + 40 force damage. If this
          damage reduces the target to 0 hit points, it is disintegrated.
        </p>
        <p>
          A disintegrated creature and everything it is wearing and carrying,
          except magic items, are reduced to a pile of fine gray dust. The
          creature can be restored to life only by means of a true resurrection
          or a wish spell.
        </p>
        <p>
          This spell automatically disintegrates a Large or smaller nonmagical
          object or a creation of magical force. If the target is a Huge or
          larger object or creation of force, this spell disintegrates a
          10-foot-cube portion of it. A magic item is unaffected by this spell.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the damage increases by 3d6 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 233',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A lodestone and a pinch of dust.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Transmutation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'dispelEvilAndGood',
    desc: (
      <>
        <p>
          Shimmering energy surrounds and protects you from fey, undead, and
          creatures originating from beyond the Material Plane. For the
          duration, celestials, elementals, fey, fiends, and undead have
          disadvantage on attack rolls against you.
        </p>
        <p>
          You can end the spell early by using either of the following special
          functions.
        </p>
        <p>
          <b>Break Enchantment.</b> As your action, you touch a creature you can
          reach that is charmed, frightened, or possessed by a celestial, an
          elemental, a fey, a fiend, or an undead. The creature you touch is no
          longer charmed, frightened, or possessed by such creatures.
        </p>
        <p>
          <b>Dismissal.</b> As your action, make a melee spell attack against a
          celestial, an elemental, a fey, a fiend, or an undead you can reach.
          On a hit, you attempt to drive the creature back to its home plane.
          The creature must succeed on a charisma saving throw or be sent back
          to its home plane (if it isn't there already). If they aren’t on their
          home plane, undead are sent to the Shadowfell, and fey are sent to the
          Feywild.
        </p>
      </>
    ),
    page: 'phb 233',
    range: 'Self',
    components: 'V, S, M',
    material: 'Holy water or powdered silver and iron.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
  },
  {
    name: 'dispelMagic',
    desc: (
      <>
        <p>
          Choose one creature, object, or magical effect within range. Any spell
          of 3rd level or lower on the target ends. For each spell of 4th level
          or higher on the target, make an ability check using your spellcasting
          ability. The DC equals 10 + the spell’s level. On a successful check,
          the spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          you automatically end the effects of a spell on the target if the
          spell’s level is equal to or less than the level of the spell slot you
          used.
        </p>
      </>
    ),
    page: 'phb 234',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Abjuration',
    class: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'sorcerer',
      'warlock',
      'wizard',
    ],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
    oaths: 'Devotion',
  },
  {
    name: 'dissonantWhispers',
    desc: (
      <>
        <p>
          Susurras una melodía discrepante que sólo una criatura de tu elección
          dentro del alcance puede oír, asolándola con un terrible dolor. El
          objetivo debe realizar una tirada de salvación de Sabiduría. Con una
          salvación fallida, sufre 3d6 puntos de daño psíquico e inmediatamente
          debe usar su reacción, si la tiene disponible, para moverse tan lejos
          de ti como le sea posible. La criatura no se dirige a terrenos
          obviamente peligrosos, como un foso o un fuego. Con una salvación con
          éxito, el objetivo sufre la mitad del daño y no tiene que moverse. Una
          criatura ensordecida tendrá éxito automáticamente en la salvación.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d6 por cada nivel de espacio de
          conjuros por encima de nivel nivel 1.
        </p>
      </>
    ),
    page: 'phb 234',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'warlock'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'divination',
    desc: (
      <>
        <p>
          Your magic and an offering put you in contact with a god or a god’s
          servants. You ask a single question concerning a specific goal, event,
          or activity to occur within 7 days. The DM offers a truthful reply.
          The reply might be a short phrase, a cryptic rhyme, or an omen.
        </p>
        <p>
          The spell doesn’t take into account any possible circumstances that
          might change the outcome, such as the casting of additional spells or
          the loss or gain of a companion.
        </p>
        <p>
          If you cast the spell two or more times before finishing your next
          long rest, there is a cumulative 25 percent chance for each casting
          after the first that you get a random reading. The DM makes this roll
          in secret.
        </p>
      </>
    ),
    page: 'phb 234',
    range: 'Self',
    components: 'V, S, M',
    material:
      'Incense and a sacrificial offering appropriate to your religion, together worth at least 25gp, which the spell consumes.',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Divination',
    class: ['cleric', 'druid', 'ritual caster'],
    archetype: {
      druid: ['forest', 'grassland'],
    },
    circles: ['forest', 'grassland'],
  },
  {
    name: 'divineFavor',
    desc: (
      <>
        <p>
          Tus plegarias te fortalecen con un resplandor divino. Mientras dure el
          conjuro, tus ataques con arma infligen 1d4 puntos de daño radiante
          adicional al impactar.
        </p>
      </>
    ),
    page: 'phb 234',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Evocation',
    class: ['cleric', 'paladin'],
    archetype: {
      cleric: ['war'],
    },
    domains: ['war'],
  },
  {
    name: 'divineWord',
    desc: (
      <>
        <p>
          You speak a word of God, full of the power that has shaped the world
          at the dawn of creation. Choose as many creatures as you want from
          those you see, in the range of the spell. Every creature that hears
          you must make a backup Charisma, or she undergoes an effect based on
          the current value of his life.
        </p>
        <p>- pv or less 50: muted for 1 minute</p>
        <p>- 40 hp or less: deafened and blinded for 10 minutes</p>
        <p>- 30 hp or less: blinded, deafened and dazed for 1 hour</p>
        <p>- 20 hp or less: killed instantly</p>
        <p>
          Regardless of its points of current life, a celestial, an elementary,
          a fairy or a fiend who fails his roll is returned to its original plan
          (if not already) and it can not go back on your plan for 24 hours,
          regardless of the means, with the exception of the wish spell.
        </p>
      </>
    ),
    page: 'phb 234',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 bonus action',
    level: 7,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'dominateBeast',
    desc: (
      <>
        <p>
          You attempt to beguile a creature that you can see within range. It
          must succeed on a wisdom saving throw or be charmed by you for the
          duration. If you or creatures that are friendly to you are fighting
          it, it has advantage on the saving throw.
        </p>
        <p>
          While the creature is charmed, you have a telepathic link with it as
          long as the two of you are on the same plane of existence. You can use
          this telepathic link to issue commands to the creature while you are
          conscious (no action required), which it does its best to obey. You
          can specify a simple and general course of action, such as "Attack
          that creature," "Run over there," or "Fetch that object." If the
          creature completes the order and doesn\'t receive further direction
          from you, it defends and preserves itself to the best of its ability.
        </p>
        <p>
          You can use your action to take total and precise control of the
          target. Until the end of your next turn, the creature takes only the
          actions you choose, and doesn\'t do anything that you don\'t allow it
          to do. During this time, you can also cause the creature to use a
          reaction, but this requires you to use your own reaction as well. Each
          time the target takes damage, it makes a new wisdom saving throw
          against the spell. If the saving throw succeeds, the spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell with a 9th level spell slot, the duration is
          concentration, up to 8 hours.
        </p>
      </>
    ),
    page: 'phb 234',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Enchantment',
    class: ['cleric', 'druid', 'sorcerer', 'warlock'],
    archetype: {
      cleric: ['nature'],
      warlock: ['archfey', 'greatOldOne'],
    },
    domains: ['nature'],
    patrons: ['archfey', 'greatOldOne'],
  },
  {
    name: "drawmij'sInstantSummons",
    desc: (
      <>
        <p>
          You touch an object weighing 10 pounds or less whose longest dimension
          is 6 feet or less. The spell leaves an invisible mark on its surface
          and invisibly inscribes the name of the item on the sapphire you use
          as the material component. Each time you cast this spell, you must use
          a different sapphire.
        </p>
        <p>
          At any time thereafter, you can use your action to speak the item’s
          name and crush the sapphire. The item instantly appears in your hand
          regardless of physical or planar distances, and the spell ends.
        </p>
        <p>
          If another creature is holding or carrying the item, crushing the
          sapphire doesn’t transport the item to you, but instead you learn who
          the creature possessing the object is and roughly where that creature
          is located at that moment.
        </p>
        <p>
          Dispel magic or a similar effect successfully applied to the sapphire
          ends this spell’s effect.
        </p>
      </>
    ),
    page: 'phb 235',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A sapphire worth 1,000 gp.',
    ritual: true,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 6,
    school: 'Conjuration',
    class: ['ritual caster', 'wizard'],
  },
  {
    name: 'dominateMonster',
    desc: (
      <>
        <p>
          You attempt to beguile a creature that you can see within range. It
          must succeed on a wisdom saving throw or be charmed by you for the
          duration. If you or creatures that are friendly to you are fighting
          it, it has advantage on the saving throw.
        </p>
        <p>
          While the creature is charmed, you have a telepathic link with it as
          long as the two of you are on the same plane of existence. You can use
          this telepathic link to issue commands to the creature while you are
          conscious (no action required), which it does its best to obey. You
          can specify a simple and general course of action, such as “Attack
          that creature,” “Run over there,” or “Fetch that object.” If the
          creature completes the order and doesn’t receive further direction
          from you, it defends and preserves itself to the best of its ability.
        </p>
        <p>
          You can use your action to take total and precise control of the
          target. Until the end of your next turn, the creature takes only the
          actions you choose, and doesn’t do anything that you don’t allow it to
          do. During this time, you can also cause the creature to use a
          reaction, but this requires you to use your own reaction as well.
        </p>
        <p>
          Each time the target takes damage, it makes a new wisdom saving throw
          against the spell. If the saving throw succeeds, the spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell with a 9th-level spell slot, the duration is
          concentration, up to 8 hours.
        </p>
      </>
    ),
    page: 'phb 235',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'dominatePerson',
    desc: (
      <>
        <p>
          You attempt to beguile a humanoid that you can see within range. It
          must succeed on a wisdom saving throw or be charmed by you for the
          duration. If you or creatures that are friendly to you are fighting
          it, it has advantage on the saving throw.
        </p>
        <p>
          While the target is charmed, you have a telepathic link with it as
          long as the two of you are on the same plane of existence. You can use
          this telepathic link to issue commands to the creature while you are
          conscious (no action required), which it does its best to obey. You
          can specify a simple and general course of action, such as “Attack
          that creature,” “Run over there,” or “Fetch that object.” If the
          creature completes the order and doesn’t receive further direction
          from you, it defends and preserves itself to the best of its ability.
        </p>
        <p>
          You can use your action to take total and precise control of the
          target. Until the end of your next turn, the creature takes only the
          actions you choose, and doesn’t do anything that you don’t allow it to
          do. During this time you can also cause the creature to use a
          reaction, but this requires you to use your own reaction as well.
        </p>
        <p>
          Each time the target takes damage, it makes a new wisdom saving throw
          against the spell. If the saving throw succeeds, the spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a 6th-level spell slot, the duration is
          concentration, up to 10 minutes. When you use a 7th-level spell slot,
          the duration is concentration, up to 1 hour. When you use a spell slot
          of 8th level or higher, the duration is concentration, up to 8 hours.
        </p>
      </>
    ),
    page: 'phb 235',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['trickery'],
      warlock: ['archfey', 'greatOldOne'],
    },
    domains: ['trickery'],
    patrons: ['archfey', 'greatOldOne'],
  },
  {
    name: 'dream',
    desc: (
      <>
        <p>
          This spell shapes a creature’s dreams. Choose a creature known to you
          as the target of this spell. The target must be on the same plane of
          existence as you. Creatures that don’t sleep, such as elves, can’t be
          contacted by this spell. You, or a willing creature you touch, enters
          a trance state, acting as a messenger.
        </p>
        <p>
          While in the trance, the messenger is aware of his or her
          surroundings, but can’t take actions or move.
        </p>
        <p>
          If the target is asleep, the messenger appears in the target’s dreams
          and can converse with the target as long as it remains asleep, through
          the duration of the spell. The messenger can also shape the
          environment of the dream, creating landscapes, objects, and other
          images. The messenger can emerge from the trance at any time, ending
          the effect of the spell early. The target recalls the dream perfectly
          upon waking. If the target is awake when you cast the spell, the
          messenger knows it, and can either end the trance (and the spell) or
          wait for the target to fall asleep, at which point the messenger
          appears in the target’s dreams.
        </p>
        <p>
          You can make the messenger appear monstrous and terrifying to the
          target. If you do, the messenger can deliver a message of no more than
          ten words and then the target must make a wisdom saving throw. On a
          failed save, echoes of the phantasmal monstrosity spawn a nightmare
          that lasts the duration of the target’s sleep and prevents the target
          from gaining any benefit from that rest. In addition, when the target
          wakes up, it takes 3d6 psychic damage.
        </p>
        <p>
          If you have a body part, lock of hair, clipping from a nail, or
          similar portion of the target’s body, the target makes its saving
          throw with disadvantage.
        </p>
      </>
    ),
    page: 'phb 236',
    range: 'Special',
    components: 'V, S, M',
    material:
      'A handful of sand, a dab of ink, and a writing quill plucked from a sleeping bird.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Illusion',
    class: ['bard', 'druid', 'warlock', 'wizard'],
    archetype: {
      druid: ['grassland'],
    },
    circles: ['grassland'],
  },
  {
    name: 'druidcraft',
    desc: (
      <>
        <p>
          Al susurrarles a los espíritus de la naturaleza, creas uno de los
          siguientes efectos dentro del alcance:
        </p>
        <ul>
          <li>
            Creas un pequeño efecto sensorial inofensivo que predice el tiempo
            que hará donde te encuentras durante las próximas 24 horas. El
            efecto puede manifestarse como un orbe dorado para los cielos
            despejados, una nube para la lluvia, copos de nieve cayendo para la
            nieve, etcétera. Este efecto persiste durante 1 ronda.
          </li>
          <li>
            Haces que instantáneamente florezca un capullo, germine una semilla
            o brote una hoja.
          </li>
          <li>
            Creas un sensor instantáneo e inofensivo, como hojas cayendo, una
            brisa, el sonido de un animalillo o el vago olor de una mofeta. El
            efecto debe caber en un cubo de 5 pies.
          </li>
          <li>
            Apagas o encientes inmediatamente una vela, una antorcha o una
            hoguera.
          </li>
        </ul>
      </>
    ),
    page: 'phb 236',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'earthquake',
    desc: (
      <>
        <p>
          You create a seismic disturbance at a point on the ground that you can
          see within range. For the duration, an intense tremor rips through the
          ground in a 100-foot-radius circle centered on that point and shakes
          creatures and structures in contact with the ground in that area.
        </p>
        <p>
          The ground in the area becomes difficult terrain. Each creature on the
          ground that is concentrating must make a constitution saving throw. On
          a failed save, the creature’s concentration is broken.
        </p>
        <p>
          When you cast this spell and at the end of each turn you spend
          concentrating on it, each creature on the ground in the area must make
          a dexterity saving throw. On a failed save, the creature is knocked
          prone.
        </p>
        <p>
          This spell can have additional effects depending on the terrain in the
          area, as determined by the DM.
        </p>
        <p>
          Fissures. Fissures open throughout the spell’s area at the start of
          your next turn after you cast the spell. A total of 1d6 such fissures
          open in locations chosen by the DM. Each is 1d10 × 10 feet deep, 10
          feet wide, and extends from one edge of the spell’s area to the
          opposite side. A creature standing on a spot where a fissure opens
          must succeed on a dexterity saving throw or fall in. A creature that
          successfully saves moves with the fissure’s edge as it opens.
        </p>
        <p>
          A fissure that opens beneath a structure causes it to automatically
          collapse (see below).
        </p>
        <p>
          Structures. The tremor deals 50 bludgeoning damage to any structure in
          contact with the ground in the area when you cast the spell and at the
          start of each of your turns until the spell ends. If a structure drops
          to 0 hit points, it collapses and potentially damages nearby
          creatures. A creature within half the distance of a structure’s height
          must make a dexterity saving throw. On a failed save, the creature
          takes 5d6 bludgeoning damage, is knocked prone, and is buried in the
          rubble, requiring a DC 20 Strength (Athletics) check as an action to
          escape. The DM can adjust the DC higher or lower, depending on the
          nature of the rubble. On a successful save, the creature takes half as
          much damage and doesn’t fall prone or become buried.
        </p>
      </>
    ),
    page: 'phb 236',
    range: '500 feet',
    components: 'V, S, M',
    material: 'A pinch of dirt, a piece of rock, and a lump of clay.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Evocation',
    class: ['cleric', 'druid', 'sorcerer'],
  },
  {
    name: 'eldritchBlast',
    desc: (
      <>
        <p>
          Un rayo de energía chispeante alcanza a una criatura que elijas dentro
          del alcance. Haz una tirada de ataque de conjuro a distancia contra el
          objetivo. Si impactas, este recibe 1d10 puntos de daño por fuerza.
        </p>
        <p>
          El conjuro crea más de un rayo cuando subes de nivel: dos rayos en el
          nivel 5, tres rayos en el nivel 11 y cuatro rayos en el nivel 17.
          Puedes dirigir los rayos al mismo objetivo o a objetivos diferentes.
          Haz una tirada de ataque por cada rayo.
        </p>
      </>
    ),
    page: 'phb 237',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['warlock'],
  },
  {
    name: 'elementalWeapon',
    desc: (
      <>
        <p>
          A nonmagical weapon you touch becomes a magic weapon. Choose one of
          the following damage types: acid, cold, fire, lightning, or thunder.
          For the duration, the weapon has a +1 bonus to attack rolls and deals
          an extra 1d4 damage of the chosen type when it hits.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th or 6th level, the
          bonus to attack rolls increases to +2 and the extra damage increases
          to 2d4. When you use a spell slot of 7th level or higher, the bonus
          increases to +3 and the extra damage increases to 3d4.
        </p>
      </>
    ),
    page: 'phb 237',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['paladin'],
  },
  {
    name: 'enhanceAbility',
    desc: (
      <>
        <p>
          Tocas una criatura y le concedes una mejora mágica. Elige uno de los
          siguientes efectos; el objetivo gana el efecto hasta que el conjuro
          finalice.
        </p>
        <ul>
          <li>
            <b>Fuerza de toro.</b> El objetivo tiene ventaja en las pruebas de
            Fuerza y su capacidad de carga se dobla.
          </li>
          <li>
            <b>Gracia felina.</b> El objetivo tiene ventaja en las pruebas de
            Destreza. Además no recibe daño por caídas de 20 pies (4 casillas, 6
            m) o menos si no está incapacitado.
          </li>
          <li>
            <b>Resistencia de oso.</b> El objetivo tiene ventaja en las pruebas
            de Constitución. También gana 2d6 Puntos de Golpe temporales, que se
            pierden cuando el conjuro finaliza.
          </li>
          <li>
            <b>Astucia de zorro.</b> El objetivo tiene ventaja en las pruebas de
            Inteligencia.
          </li>
          <li>
            <b>Sabiduría de búho.</b> El objetivo tiene ventaja en las pruebas
            de Sabiduría.
          </li>
          <li>
            <b>Esplendor de águila.</b> El objetivo tiene ventaja en las pruebas
            de Carisma.
          </li>
        </ul>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, puedes seleccionar una criatura adicional por cada nivel de
          espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 237',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Fur or a feather from a beast.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['bard', 'cleric', 'druid', 'sorcerer'],
  },
  {
    name: 'enlarge/Reduce',
    desc: (
      <>
        <p>
          Provocas que una criatura u objeto que puedas ver dentro del alcance
          se vuelva más grande o más pequeña mientras dure el conjuro. Elije una
          criatura o un objeto que no esté siendo portado o transportado. Si el
          objetivo no es voluntario, puede realizar una tirada de salvación de
          Constitución. Con una salvación con éxito el conjuro no tiene efecto.
        </p>
        <p>
          Si el objetivo es una criatura, todo lo que vista y porte cambia de
          tamaño con ella. Cualquier objeto dejado caer por una criatura
          afectada vuelve a su tamaño normal al instante.
        </p>
        <p>
          <b>Agrandar.</b> El objetivo dobla su tamaño en todas las dimensiones
          y su peso se multiplica por ocho. Este crecimiento aumenta su tamaño
          en una categoría, por ejemplo, de mediano a grande. Si no hay
          suficiente espacio para que el objetivo doble su tamaño, la criatura u
          objeto alcanza el tamaño máximo posible en el espacio disponible.
          Hasta que el conjuro finalice, el objetivo también tiene ventaja en
          las pruebas Fuerza y en las tiradas de salvación de Fuerza. Las armas
          del objetivo también se agrandan con él, acorde a su nuevo tamaño.
          Mientras estas armas estén agrandadas, los ataques que el objetivo
          realice con ellas infligen 1d4 puntos de daño extra.
        </p>
        <p>
          <b>Reducir.</b> El tamaño del objetivo se reduce a la mitad en todas
          las dimensiones, y su peso se reduce a un octavo del normal. Esta
          reducción disminuye su tamaño en una categoría, por ejemplo, de
          mediano a pequeño. Hasta que el conjuro finalice, el objetivo también
          tiene desventaja en las pruebas Fuerza y en las tiradas de salvación
          de Fuerza. Las armas del objetivo también se reducen con él, acorde a
          su nuevo tamaño. Mientras estas armas estén reducidas, los ataques que
          el objetivo realice con ellas infligen 1d4 puntos de daño menos (esto
          no puede reducir el daño por debajo de 1).
        </p>
      </>
    ),
    page: 'phb 237',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A pinch iron powder.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'ensnaringStrike',
    desc: (
      <>
        <p>
          La siguiente vez que impactes una criatura con un ataque de arma antes
          de que el conjuro finalice, una retorcida masa de enredaderas con
          espinas aparecen en el lugar del impacto, y el objetivo debe superar
          una tirada de salvación de Fuerza o quedará neutralizado por las
          enredaderas mágicas hasta que el conjuro finalice. Un criatura grande
          o mayor tiene ventaja en la tirada de salvación. Si el objetivo supera
          la salvación las enredaderas se marchitan.
        </p>
        <p>
          Mientras esté neutralizado por este conjuro, el objetivo sufre 1d6
          puntos de daño perforante al inicio de cada uno de sus turnos. Una
          criatura apresada por las enredaderas o una que pueda tocar a la
          criatura, puede usar su acción para realizar una prueba de Fuerza
          contra la CD de tu salvación de conjuros. Con una salvación con éxito,
          el objetivo queda liberado.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d6 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 237',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Conjuration',
    class: ['paladin', 'ranger'],
    archetype: {
      paladin: ['ancients'],
    },
    oaths: 'Ancients',
  },
  {
    name: 'entangle',
    desc: (
      <>
        <p>
          Plantas trepadoras y enredaderas brotan del suelo en un cuadrado de 20
          pies (6 m) desde un punto dentro del alcance. Mientras dure el
          conjuro, las plantas convierten el suelo en el área en terreno
          difícil.
        </p>
        <p>
          Una criatura en el área debe superar una tirada de salvación de Fuerza
          Cuando lanzas el conjuro o quedará neutralizada por las enredaderas
          hasta que el conjuro finalice. Una criatura neutralizada por las
          plantas puede usar su acción para realizar una prueba de Fuerza contra
          la CD de tu salvación de conjuros. Con una tirada con éxito se libera.
        </p>
        <p>Cuando el conjuro finaliza, las plantas conjuradas se marchitan.</p>
      </>
    ),
    page: 'phb 238',
    range: '90 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'enthrall',
    desc: (
      <>
        <p>
          Tejes una cadena de palabras con el objetivo de distraer, provocando
          que criaturas de tu elección que puedas ver dentro del alcance y te
          puedan oír realicen una tirada de salvación de Sabiduría. Cualquier
          criatura que no pueda ser encantada supera esta tirada de salvación
          automáticamente, y si tú o tus compañeros estáis luchando contra la
          criatura, ésta tiene ventaja en la salvación. Con una salvación
          fallida, el objetivo tiene desventaja en las pruebas de Sabiduría
          (Percepción) realizadas para percibir cualquier criatura que no seas
          tú hasta que finalice el conjuro o hasta que el objetivo no pueda
          oírte. El conjuro finaliza si quedas incapacitado o no puedes hablar.
        </p>
      </>
    ),
    page: 'phb 238',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'warlock'],
  },
  {
    name: 'etherealness',
    desc: (
      <>
        <p>
          You step into the border regions of the Ethereal Plane, in the area
          where it overlaps with your current plane. You remain in the Border
          Ethereal for the duration or until you use your action to dismiss the
          spell. During this time, you can move in any direction. If you move up
          or down, every foot of movement costs an extra foot. You can see and
          hear the plane you originated from, but everything there looks gray,
          and you can’t see anything more than 60 feet away.
        </p>
        <p>
          While on the Ethereal Plane, you can only affect and be affected by
          other creatures on that plane. Creatures that aren’t on the Ethereal
          Plane can’t perceive you and can’t interact with you, unless a special
          ability or magic has given them the ability to do so.
        </p>
        <p>
          You ignore all objects and effects that aren’t on the Ethereal Plane,
          allowing you to move through objects you perceive on the plane you
          originated from.
        </p>
        <p>
          When the spell ends, you immediately return to the plane you
          originated from in the spot you currently occupy. If you occupy the
          same spot as a solid object or creature when this happens, you are
          immediately shunted to the nearest unoccupied space that you can
          occupy and take force damage equal to twice the number of feet you are
          moved.
        </p>
        <p>
          This spell has no effect if you cast it while you are on the Ethereal
          Plane or a plane that doesn’t border it, such as one of the Outer
          Planes.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 8th level or higher,
          you can target up to three willing creatures (including you) for each
          slot level above 7th. The creatures must be within 10 feet of you when
          you cast the spell.
        </p>
      </>
    ),
    page: 'phb 238',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Transmutation',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: "evard'sBlackTentacles",
    desc: (
      <>
        <p>
          Dark writhing tentacles occupy the ground in a square of 90 feet ridge
          you can see the range of the spell. For the duration of the spell, the
          tentacles make the difficult terrain.
        </p>
        <p>
          When a creature enters the affected area for the first time in a turn
          or where it begins its turn, it must make a dexterity saving throw or
          it suffers 3d6 bludgeoning damage and is hampered by tentacles until
          the end of the spell. A creature that starts its turn in the area and
          is already hampered by the tentacles suffers 3d6 bludgeoning damage.
        </p>
        <p>
          A creature hampered by the tentacles can use his action to a test
          Strength or Dexterity (at its option) opposite to the SD backup of
          your fate. If successful, it is free.
        </p>
      </>
    ),
    page: 'phb 238',
    range: '90 feet',
    components: 'V, S, M',
    material: 'A piece of tentacle of an octopus or a giant squid.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'expeditiousRetreat',
    desc: (
      <>
        <p>
          Este conjuro te permite moverte a un ritmo increíble. Cuando lanzas
          este conjuro, y posteriormente, puedes usar una acción adicional en
          cada uno de tus siguientes turnos hasta que el conjuro finalice, para
          realizar la acción carrera.
        </p>
      </>
    ),
    page: 'phb 238',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Transmutation',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'eyebite',
    desc: (
      <>
        <p>
          For the spell’s duration, your eyes become an inky void imbued with
          dread power. One creature of your choice within 60 feet of you that
          you can see must succeed on a wisdom saving throw or be affected by
          one of the following effects of your choice for the duration. On each
          of your turns until the spell ends, you can use your action to target
          another creature but can’t target a creature again if it has succeeded
          on a saving throw against this casting of eyebite.
        </p>
        <p>
          <b>Asleep.</b> The target falls unconscious. It wakes up if it takes
          any damage or if another creature uses its action to shake the sleeper
          awake.
        </p>
        <p>
          <b>Panicked.</b> The target is frightened of you. On each of its
          turns, the frightened creature must take the Dash action and move away
          from you by the safest and shortest available route, unless there is
          nowhere to move. If the target moves to a place at least 60 feet away
          from you where it can no longer see you, this effect ends.
        </p>
        <p>
          <b>Sickened.</b> The target has disadvantage on attack rolls and
          ability checks. At the end of each of its turns, it can make another
          wisdom saving throw. If it succeeds, the effect ends.
        </p>
      </>
    ),
    page: 'phb 238',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Necromancy',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'fabricate',
    desc: (
      <>
        <p>
          You convert raw materials into products of the same material. For
          example, you can fabricate a wooden bridge from a clump of trees, a
          rope from a patch of hemp, and clothes from flax or wool.
        </p>
        <p>
          Choose raw materials that you can see within range. You can fabricate
          a Large or smaller object (contained within a 10-foot cube, or eight
          connected 5-foot cubes), given a sufficient quantity of raw material.
          If you are working with metal, stone, or another mineral substance,
          however, the fabricated object can be no larger than Medium (contained
          within a single 5-foot cube). The quality of objects made by the spell
          is commensurate with the quality of the raw materials.
        </p>
        <p>
          Creatures or magic items can’t be created or transmuted by this spell.
          You also can’t use it to create items that ordinarily require a high
          degree of craftsmanship, such as jewelry, weapons, glass, or armor,
          unless you have proficiency with the type of artisan’s tools used to
          craft such objects.
        </p>
      </>
    ),
    page: 'phb 239',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 4,
    school: 'Transmutation',
    class: ['wizard'],
  },
  {
    name: 'faerieFire',
    desc: (
      <>
        <p>
          Cada objeto en un cubo de 20 pies (4 casillas, 6 m) dentro del alcance
          queda perfilado en luz azul, verde o violeta (a tu elección).
          Cualquier criatura en el área cuando el conjuro es lanzado también
          queda perfilada con la luz si no supera una tirada de salvación de
          Destreza. Mientras dure el conjuro, objetos y criaturas afectados
          emiten luz tenue en un radio de 10 pies (2 casillas, 3 m).
        </p>
        <p>
          Cualquier tirada de ataque contra una criatura u objeto afectado tiene
          ventaja si el atacante puede verlo, y la criatura u objeto afectados
          no se pueden beneficiar de ser invisibles.
        </p>
      </>
    ),
    page: 'phb 239',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['bard', 'cleric', 'druid', 'warlock'],
    archetype: {
      cleric: ['light'],
      warlock: ['archfey'],
    },
    domains: ['light'],
    patrons: ['archfey'],
  },
  {
    name: 'falseLife',
    desc: (
      <>
        <p>
          Te fortaleces a ti mismo con una copia nigromántica de vida, ganas 1d4
          + 4 Puntos de Golpe temporales mientras dure el conjuro. A niveles
          superiores. Cuando lanzas este hechizo usando un espacio de conjuros
          de nivel 2 o superior, ganas 5 Puntos de Golpe temporales adicionales
          por cada nivel de espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este conjuro usando un espacio de nivel 2 o superior,
          ganas 5 puntos de golpe temporales adicionales por cada nivel de
          espacio por encima del primero.
        </p>
      </>
    ),
    page: 'phb 239',
    range: 'Self',
    components: 'V, S, M',
    material: 'A small amount of alcohol or distilled spirits.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Necromancy',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'fear',
    desc: (
      <>
        <p>
          You project a phantasmal image of a creature’s worst fears. Each
          creature in a 30-foot cone must succeed on a wisdom saving throw or
          drop whatever it is holding and become frightened for the duration.
        </p>
        <p>
          While frightened by this spell, a creature must take the Dash action
          and move away from you by the safest available route on each of its
          turns, unless there is nowhere to move. If the creature ends its turn
          in a location where it doesn’t have line of sight to you, the creature
          can make a wisdom saving throw. On a successful save, the spell ends
          for that creature.
        </p>
      </>
    ),
    page: 'phb 239',
    range: 'Self',
    components: 'V, S, M',
    material: 'A white feather or the heart of a hen.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'featherFall',
    desc: (
      <>
        <p>
          Elige hasta a 5 criaturas que estén cayendo dentro del alcance. La
          velocidad de descenso de una criatura cayendo se reduce a 60 pies (12
          casillas, 18 m) por asalto hasta que el conjuro finalice. Si la
          criatura aterriza antes de que el conjuro finalice, no sufre daño de
          caída y puede aterrizar de pie, y el conjuro finaliza para dicha
          criatura.
        </p>
      </>
    ),
    page: 'phb 239',
    range: '60 feet',
    components: 'V, M',
    material: 'A small feather or a piece of down.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 reaction',
    level: 1,
    school: 'Transmutation',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'feeblemind',
    desc: (
      <>
        <p>
          You blast the mind of a creature that you can see within range,
          attempting to shatter its intellect and personality. The target takes
          4d6 psychic damage and must make an intelligence saving throw.
        </p>
        <p>
          On a failed save, the creature’s Intelligence and Charisma scores
          become 1. The creature can’t cast spells, activate magic items,
          understand language, or communicate in any intelligible way. The
          creature can, however, identify its friends, follow them, and even
          protect them.
        </p>
        <p>
          At the end of every 30 days, the creature can repeat its saving throw
          against this spell. If it succeeds on its saving throw, the spell
          ends.
        </p>
        <p>
          The spell can also be ended by greater restoration, heal, or wish.
        </p>
      </>
    ),
    page: 'phb 239',
    range: '150 feet',
    components: 'V, S, M',
    material: 'A handful of clay, crystal, glass, or mineral spheres.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Enchantment',
    class: ['bard', 'druid', 'warlock', 'wizard'],
  },
  {
    name: 'feignDeath',
    desc: (
      <>
        <p>
          You touch a willing creature and put it into a cataleptic state that
          is indistinguishable from death.
        </p>
        <p>
          For the spell’s duration, or until you use an action to touch the
          target and dismiss the spell, the target appears dead to all outward
          inspection and to spells used to determine the target’s status. The
          target is blinded and incapacitated, and its speed drops to 0. The
          target has resistance to all damage except psychic damage. If the
          target is diseased or poisoned when you cast the spell, or becomes
          diseased or poisoned while under the spell’s effect, the disease and
          poison have no effect until the spell ends.
        </p>
      </>
    ),
    page: 'phb 240',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A pinch of graveyard dirt.',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Necromancy',
    class: ['bard', 'cleric', 'druid', 'ritual caster', 'wizard'],
  },
  {
    name: 'findFamiliar',
    desc: (
      <>
        <p>
          Adquieres el servicio de un familiar, un espíritu que toma una forma
          animal a tu elección: araña, búho, caballo de mar, cangrejo,
          comadreja, cuervo, gato, halcón, lagarto, murciélago, pez (payaso),
          pulpo, rana (sapo), rata o serpiente venenosa. Aparece en un espacio
          desocupado dentro del alcance, el familiar posee las estadísticas
          propias de la forma elegida, pero es celestial, feérico o infernal (a
          tú elección), en vez de bestia.
        </p>
        <p>
          Tu familiar actúa independientemente de ti, pero siempre obedece tus
          órdenes. En combate, tira su propia iniciativa y actúa en su propio
          turno. Un familiar no puede atacar pero puede llevar a cabo otras
          acciones de manera normal.
        </p>
        <p>
          Cuando el familiar es reducido a 0 Puntos de Golpe, desaparece, sin
          dejar rastro de forma física. Reaparece cuando vuelves a lanzar este
          conjuro.
        </p>
        <p>
          Cuando tu familiar este a menos de 100 pies (20 casillas, 30 m) de ti,
          puedes comunicarte con él telepáticamente. Además, como una acción,
          puedes ver a través de los ojos de tu familiar y oír lo que él oye
          hasta el inicio de tu siguiente turno, obteniendo los beneficios de
          cualquier tipo de sentido especial que el familiar tenga. Durante este
          tiempo, tú estás sordo y ciego respecto a tus propios sentidos.
        </p>
        <p>
          Como una acción, puedes cancelar a tu familiar. Este desaparece en una
          dimensión de bolsillo donde espera tu invocación. Alternativamente,
          puedes cancelarlo para siempre. Como una acción mientras está
          cancelado temporalmente, puedes hacer que reaparezca en cualquier
          lugar desocupado hasta a 30 pies (6 casillas, 9 m) de ti.
        </p>
        <p>
          No puedes tener más de un familiar al mismo tiempo. Si lanzas este
          conjuro otra vez mientras tienes un familiar, lo que provocas en
          realidad es que éste adopte una nueva forma. Elige una de las formas
          de la lista anterior. Tu familiar se transforma en la criatura
          elegida.
        </p>
        <p>
          Finalmente, cuando lanzas un conjuro con alcance de toque, tu familiar
          puede descargar el conjuro como si lo hubiera conjurado él. Tu
          familiar debe estar a no más de 100 pies (20 casillas, 30 m) de ti, y
          debe usar su reacción para descargar el conjuro cuando tú lo lanzas.
          Si el conjuro requiere de una tirada de ataque, usa tu modificador de
          ataque para la tirada.
        </p>
      </>
    ),
    page: 'phb 240',
    range: '10 feet',
    components: 'V, S, M',
    material:
      '10po en carbón, incienso y hierbas que deben ser consumidas en el fuego de una brasera de bronce.',
    ritual: true,
    duration: 'Instáneo',
    concentration: false,
    casting_time: '1 hora',
    level: 1,
    school: 'Conjuration',
    class: ['ritual caster', 'wizard'],
  },
  {
    name: 'findSteed',
    desc: (
      <>
        <p>
          Convocas un espíritu que toma la forma de un inusualmente inteligente,
          fuerte, y leal corcel, creando un longevo vínculo con él. Aparece en
          un espacio desocupado dentro del alcance, el corcel toma la forma que
          elijas, como un caballo de batalla, un poni, un camello, un alce o un
          mastín. (Tu DM puede permitir convocar otros animales como corceles).
          El corcel posee las estadísticas propias de la forma elegida, pero es
          celestial, feérico o infernal (a tú elección), en vez de su tipo
          habitual. Además, si tu corcel tiene Inteligencia 5 o menor, su
          Inteligencia se convierte en 6, y gana la habilidad de entender una
          lengua de tu elección que hables.
        </p>
        <p>
          Tu corcel te sirve como montura, tanto en combate como fuera de él, y
          tienes un vínculo instintivo con él que os permite luchar como una
          única unidad. Mientras estés montado, puedes hacer que cualquier
          conjuro que lances y tenga como objetivo sólo a ti, tenga también como
          objetivo a tu corcel.
        </p>
        <p>
          Cuando el corcel es reducido a 0 Puntos de Golpe, desaparece, sin
          dejar rastro de forma física. También puedes cancelar a tu corcel en
          cualquier momento como una acción, haciendo que desaparezca. En
          cualquier caso, lanzar este conjuro otra vez convoca al mismo corcel,
          restableciendo sus Puntos de Golpe al máximo.
        </p>
        <p>
          Mientras tu corcel esté hasta a 1 milla (1’6 km) de ti, puedes
          comunicarte con él telepáticamente.
        </p>
        <p>
          No puedes tener más de un corcel vinculado por este conjuro al mismo
          tiempo. Como una acción, puedes liberar al corcel del vínculo en
          cualquier momento, ocasionando que desaparezca.
        </p>
      </>
    ),
    page: 'phb 240',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 2,
    school: 'Conjuration',
    class: ['paladin'],
  },
  {
    name: 'findThePath',
    desc: (
      <>
        <p>
          This spell allows you to find the shortest, most direct physical route
          to a specific fixed location that you are familiar with on the same
          plane of existence. If you name a destination on another plane of
          existence, a destination that moves (such as a mobile fortress), or a
          destination that isn’t specific (such as “a green dragon’s lair”), the
          spell fails.
        </p>
        <p>
          For the duration, as long as you are on the same plane of existence as
          the destination, you know how far it is and in what direction it lies.
          While you are traveling there, whenever you are presented with a
          choice of paths along the way, you automatically determine which path
          is the shortest and most direct route (but not necessarily the safest
          route) to the destination.
        </p>
      </>
    ),
    page: 'phb 240',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A set of divinatory tools—such as bones, ivory sticks, cards, teeth, or carved runes—worth 100gp and an object from the location you wish to find.',
    ritual: false,
    duration: 'Up to 24 hours',
    concentration: true,
    casting_time: '1 minute',
    level: 6,
    school: 'Divination',
    class: ['bard', 'cleric', 'druid'],
  },
  {
    name: 'findTraps',
    desc: (
      <>
        <p>
          Sientes la presencia de cualquier trampa dentro del alcance que esté
          dentro de la línea de visión. Una trampa, para el propósito de este
          conjuro, incluye cualquier cosa que pueda infligir un efecto repentino
          o inesperado que consideres perjudicial o indeseable, que fue
          específicamente planeado como tal por su creador. Así, el conjuro
          podría sentir el área de efecto de un conjuro alarma, un glifo de
          protección, o una trampa de foso mecánica, pero no revelaría una
          debilidad natural en el suelo, un techo inestable, o un sumidero
          oculto.
        </p>
        <p>
          Este hechizo simplemente revela que hay una trampa. No descubres la
          localización de cada una de las trampas, pero comprendes la naturaleza
          general del peligro que representa la trampa percibida.
        </p>
      </>
    ),
    page: 'phb 241',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['cleric', 'druid', 'ranger'],
  },
  {
    name: 'fingerOfDeath',
    desc: (
      <>
        <p>
          You send negative energy coursing through a creature that you can see
          within range, causing it searing pain. The target must make a
          constitution saving throw. It takes 7d8 + 30 necrotic damage on a
          failed save, or half as much damage on a successful one.
        </p>
        <p>
          A humanoid killed by this spell rises at the start of your next turn
          as a zombie that is permanently under your command, following your
          verbal orders to the best of its ability.
        </p>
      </>
    ),
    page: 'phb 241',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Necromancy',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'fireball',
    desc: (
      <>
        <p>
          A bright streak flashes from your pointing finger to a point you
          choose within range and then blossoms with a low roar into an
          explosion of flame. Each creature in a 20-foot-radius sphere centered
          on that point must make a dexterity saving throw. A target takes 8d6
          fire damage on a failed save, or half as much damage on a successful
          one.
        </p>
        <p>
          The fire spreads around corners. It ignites flammable objects in the
          area that aren’t being worn or carried.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the damage increases by 1d6 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 241',
    range: '150 feet',
    components: 'V, S, M',
    material: 'A tiny ball of bat guano and sulfur.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['light'],
      warlock: ['fiend'],
    },
    domains: ['light'],
    patrons: ['fiend'],
  },
  {
    name: 'fireBolt',
    desc: (
      <>
        <p>
          Arrojas una mota de fuego a una criatura u objeto que se encuentre
          dentro del alcance. Haz un ataque de conjuro a distancia contra el
          objetivo. Si impactas, este recibe 1d10 puntos de daño por fuego. Este
          conjuro incinera a cualquier objeto inflamable al que alcance y que
          nadie lleve puesto ni transporte.
        </p>
        <p>
          El daño de este conjuro aumenta en 1d10 cuando subes al nivel 5,
          (2d10), al nivel 11 (3d10) y al nivel 17 (4d10).
        </p>
      </>
    ),
    page: 'phb 242',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'fireShield',
    desc: (
      <>
        <p>
          Thin and vaporous flame surround your body for the duration of the
          spell, radiating a bright light bright light in a 10-foot radius and
          dim light for an additional 10 feet. You can end the spell using an
          action to make it disappear.
        </p>
        <p>
          The flames are around you a heat shield or cold, your choice. The heat
          shield gives you cold damage resistance and the cold resistance to
          fire damage.
        </p>
        <p>
          In addition, whenever a creature within 5 feet of you hits you with a
          melee attack, flames spring from the shield. The attacker then suffers
          2d8 points of fire damage or cold, depending on the model.
        </p>
      </>
    ),
    page: 'phb 242',
    range: 'Self',
    components: 'V, S, M',
    material: 'A little phosphorus or a firefly.',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Evocation',
    class: ['warlock', 'wizard'],
    archetype: {
      warlock: ['fiend'],
    },
    patrons: ['fiend'],
  },
  {
    name: 'fireStorm',
    desc: (
      <>
        <p>
          A storm made up of sheets of roaring flame appears in a location you
          choose within range. The area of the storm consists of up to ten
          10-foot cubes, which you can arrange as you wish. Each cube must have
          at least one face adjacent to the face of another cube. Each creature
          in the area must make a dexterity saving throw. It takes 7d10 fire
          damage on a failed save, or half as much damage on a successful one.
        </p>
        <p>
          The fire damages objects in the area and ignites flammable objects
          that aren’t being worn or carried. If you choose, plant life in the
          area is unaffected by this spell.
        </p>
      </>
    ),
    page: 'phb 242',
    range: '150 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Evocation',
    class: ['cleric', 'druid', 'sorcerer'],
  },
  {
    name: 'flameBlade',
    desc: (
      <>
        <p>
          Evocas una espada ardiente en tu mano libre. La hoja es parecida en
          forma y tamaño a una cimitarra y permanece hasta que finalice el
          conjuro. Si dejas ir la espada, ésta desaparece, pero puedes volver a
          convocarla con una acción adicional.
        </p>
        <p>
          Puedes usar tu acción para realizar un ataque de conjuro cuerpo a
          cuerpo con la espada. Con un impacto, el objetivo sufre 3d6 puntos de
          daño por fuego.
        </p>
        <p>
          El filo flamígero emite luz brillante en un radio de 10 pies (2
          casillas, 3 m) y luz tenue en 10 pies (2 casillas, 3 m) adicionales.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 4 o
          superior, el daño se incrementa en 1d6 por cada dos niveles de espacio
          de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 242',
    range: 'Self',
    components: 'V, S, M',
    material: 'Leaf of sumac.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 bonus action',
    level: 2,
    school: 'Evocation',
    class: ['druid'],
  },
  {
    name: 'flameStrike',
    desc: (
      <>
        <p>
          A vertical column of divine fire roars down from the heavens in a
          location you specify. Each creature in a 10-foot-radius, 40-foot-high
          cylinder centered on a point within range must make a dexterity saving
          throw. A creature takes 4d6 fire damage and 4d6 radiant damage on a
          failed save, or half as much damage on a successful one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the fire damage or the radiant damage (your choice) increases by 1d6
          for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 242',
    range: '60 feet',
    components: 'V, S, M',
    material: 'Pinch of sulfur.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['cleric', 'paladin', 'warlock'],
    archetype: {
      paladin: ['devotion'],
      warlock: ['fiend'],
    },
    domains: ['light', 'war'],
    oaths: 'Devotion',
    patrons: ['fiend'],
  },
  {
    name: 'flamingSphere',
    desc: (
      <>
        <p>
          Una esfera de 5 pies (1 casilla, 1,5 m) de diámetro aparece en un
          espacio desocupado de tu elección dentro del alcance y permanece
          mientras dura el conjuro. Cualquier criatura que finalice su turno a
          menos de 5 pies (1 casilla, 1,5 m) de la esfera debe realizar una
          tirada de salvación de Destreza. La criatura sufre 2d6 puntos de daño
          por fuego con una salvación fracasada, o la mitad con una salvación
          con éxito.
        </p>
        <p>
          Como acción adicional, puedes mover la esfera hasta 30 pies (6
          casillas, 9 m). Si chocas la esfera contra una criatura, esa criatura
          debe realizar la tirada de salvación contra el daño de la esfera, y la
          esfera detiene su movimiento ese turno.
        </p>
        <p>
          Cuando muevas la esfera, puede dirigirla sobre barreras de hasta 5
          pies (1 casilla, 1,5 m) de alto y saltar pozos de hasta 10 pies (2
          casilla, 3 m) de ancho. La esfera prende los objetos inflamables que
          no estén sujetos o transportados, y desprende luz brillante en un
          radio de 20 pies (4 casillas, 6 m) y luz tenue en para 20 pies (4
          casillas, 6 m) adicionales.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño se incrementa en 1d6 por cada nivel de espacio de
          conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 242',
    range: '60 feet',
    components: 'V, S, M',
    material:
      'A bit of tallow, a pinch of brimstone, and a dusting of powdered iron.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'wizard'],
    archetype: {
      cleric: ['light'],
    },
    domains: ['light'],
  },
  {
    name: 'fleshToStone',
    desc: (
      <>
        <p>
          You attempt to turn one creature that you can see within range into
          stone. If the target’s body is made of flesh, the creature must make a
          constitution saving throw. On a failed save, it is restrained as its
          flesh begins to harden. On a successful save, the creature isn’t
          affected.
        </p>
        <p>
          A creature restrained by this spell must make another constitution
          saving throw at the end of each of its turns. If it successfully saves
          against this spell three times, the spell ends. If it fails its saves
          three times, it is turned to stone and subjected to the petrified
          condition for the duration. The successes and failures don’t need to
          be consecutive; keep track of both until the target collects three of
          a kind.
        </p>
        <p>
          If the creature is physically broken while petrified, it suffers from
          similar deformities if it reverts to its original state.
        </p>
        <p>
          If you maintain your concentration on this spell for the entire
          possible duration, the creature is turned to stone until the effect is
          removed.
        </p>
      </>
    ),
    page: 'phb 243',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A pinch of lime, water, and earth.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Transmutation',
    class: ['warlock', 'wizard'],
  },
  {
    name: 'fly',
    desc: (
      <>
        <p>
          You touch a willing creature. The target gains a flying speed of 60
          feet for the duration. When the spell ends, the target falls if it is
          still aloft, unless it can stop the fall.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          you can target one additional creature for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 243',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A wing feather from any bird.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'fogCloud',
    desc: (
      <>
        <p>
          Creas una esfera de neblina de 20 pies (4 casillas, 6 m) de radio
          centrada en un punto dentro del alcance. La esfera se extiende
          alrededor de las esquinas, y el área se oscurece profundamente. El
          conjuro finaliza al terminar su duración o cuando un viento de
          velocidad moderada o superior (por lo menos 10 millas por hora [16 km
          por hora] lo disperse.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el radio de la neblina se incrementa en 20 pies por cada
          nivel de espacio de conjuros por encima de nivel 1
        </p>
      </>
    ),
    page: 'phb 243',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'ranger', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
  },
  {
    name: 'forbiddance',
    desc: (
      <>
        <p>
          You create a ward against magical travel that protects up to 40,000
          square feet of floor space to a height of 30 feet above the floor. For
          the duration, creatures can’t teleport into the area or use portals,
          such as those created by the gate spell, to enter the area. The spell
          proofs the area against planar travel, and therefore prevents
          creatures from accessing the area by way of the Astral Plane, Ethereal
          Plane, Feywild, Shadowfell, or the plane shift spell.
        </p>
        <p>
          In addition, the spell damages types of creatures that you choose when
          you cast it. Choose one or more of the following: celestials,
          elementals, fey, fiends, and undead. When a chosen creature enters the
          spell’s area for the first time on a turn or starts its turn there,
          the creature takes 5d10 radiant or necrotic damage (your choice when
          you cast this spell).
        </p>
        <p>
          When you cast this spell, you can designate a password. A creature
          that speaks the password as it enters the area takes no damage from
          the spell.
        </p>
        <p>
          The spell’s area can't overlap with the area of another forbiddance
          spell. If you cast forbiddance every day for 30 days in the same
          location, the spell lasts until it is dispelled, and the material
          components are consumed on the last casting.
        </p>
      </>
    ),
    page: 'phb 243',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A sprinkling of holy water, rare incense, and powdered ruby worth at least 1,000 gp.',
    ritual: true,
    duration: '24 hours',
    concentration: false,
    casting_time: '10 minutes',
    level: 6,
    school: 'Abjuration',
    class: ['cleric', 'ritual caster'],
  },
  {
    name: 'forcecage',
    desc: (
      <>
        <p>
          An immobile, invisible, cube-shaped prison composed of magical force
          springs into existence around an area you choose within range. The
          prison can be a cage or a solid box, as you choose.
        </p>
        <p>
          A prison in the shape of a cage can be up to 20 feet on a side and is
          made from 1/2-inch diameter bars spaced 1/2 inch apart.{' '}
        </p>
        <p>
          A prison in the shape of a box can be up to 10 feet on a side,
          creating a solid barrier that prevents any matter from passing through
          it and blocking any spells cast into or out from the area.
        </p>
        <p>
          When you cast the spell, any creature that is completely inside the
          cage's area is trapped. Creatures only partially within the area, or
          those too large to fit inside the area, are pushed away from the
          center of the area until they are completely outside the area.
        </p>
        <p>
          A creature inside the cage can’t leave it by nonmagical means. If the
          creature tries to use teleportation or interplanar travel to leave the
          cage, it must first make a charisma saving throw. On a success, the
          creature can use that magic to exit the cage. On a failure, the
          creature can't exit the cage and wastes the use of the spell or
          effect. The cage also extends into the Ethereal Plane, blocking
          ethereal travel.
        </p>
        <p>This spell can’t be dispelled by dispel magic.</p>
      </>
    ),
    page: 'phb 243',
    range: '100 feet',
    components: 'V, S, M',
    material: 'Ruby dust worth 1,500 gp.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Evocation',
    class: ['bard', 'warlock', 'wizard'],
  },
  {
    name: 'foresight',
    desc: (
      <>
        <p>
          You touch a willing creature and bestow a limited ability to see into
          the immediate future. For the duration, the target can’t be surprised
          and has advantage on attack rolls, ability checks, and saving throws.
          Additionally, other creatures have disadvantage on attack rolls
          against the target for the duration.
        </p>
        <p>
          This spell immediately ends if you cast it again before its duration
          ends.
        </p>
      </>
    ),
    page: 'phb 244',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A hummingbird feather.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 9,
    school: 'Divination',
    class: ['bard', 'druid', 'warlock', 'wizard'],
  },
  {
    name: 'freedomOfMovement',
    desc: (
      <>
        <p>
          You touch a willing creature. For the duration, the target’s movement
          is unaffected by difficult terrain, and spells and other magical
          effects can neither reduce the target’s speed nor cause the target to
          be paralyzed or restrained.
        </p>
        <p>
          The target can also spend 5 feet of movement to automatically escape
          from nonmagical restraints, such as manacles or a creature that has it
          grappled. Finally, being underwater imposes no penalties on the
          target’s movement or attacks.
        </p>
      </>
    ),
    page: 'phb 244',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A leather strap, bound around the arm or a similar appendage.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    archetype: {
      paladin: ['devotion'],
    },
    domains: ['war'],
    circles: ['arctic', 'coast', 'forest', 'grassland', 'swamp'],
    oaths: 'Devotion',
  },
  {
    name: 'friends',
    desc: (
      <>
        <p>
          Hasta que el conjuro termine, tienes ventaja en todas las tiradas de
          Carisma dirigidas hacia una criatura de tu elección que no sea hostil
          hacia ti. Cuando el conjuro termine, la criatura se da cuenta de que
          has usado magia para influenciar su humor y se vuelve hostil hacia ti.
          Una criatura violenta puede verse inclinada a atacarte. Otra criatura
          puede buscar venganza de otras maneras (a discreción del DM),
          dependiendo de la naturaleza de tu interacción con ella.
        </p>
      </>
    ),
    page: 'phb 244',
    range: 'Self',
    components: 'S, M',
    material:
      'A small amount of makeup applied to the face as this spell is cast.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 0,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'gaseousForm',
    desc: (
      <>
        <p>
          You transform a willing creature you touch, along with everything it’s
          wearing and carrying, into a misty cloud for the duration. The spell
          ends if the creature drops to 0 hit points. An incorporeal creature
          isn’t affected.
        </p>
        <p>
          While in this form, the target’s only method of movement is a flying
          speed of 10 feet. The target can enter and occupy the space of another
          creature. The target has resistance to nonmagical damage, and it has
          advantage on Strength, Dexterity, and constitution saving throws. The
          target can pass through small holes, narrow openings, and even mere
          cracks, though it treats liquids as though they were solid surfaces.
          The target can’t fall and remains hovering in the air even when
          stunned or otherwise incapacitated.
        </p>
        <p>
          While in the form of a misty cloud, the target can’t talk or
          manipulate objects, and any objects it was carrying or holding can’t
          be dropped, used, or otherwise interacted with. The target can’t
          attack or cast spells.
        </p>
      </>
    ),
    page: 'phb 244',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A bit of gauze and a wisp of smoke.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['underdark'],
    },
    circles: ['underdark'],
  },
  {
    name: 'gate',
    desc: (
      <>
        <p>
          You conjure a portal linking an unoccupied space you can see within
          range to a precise location on a different plane of existence. The
          portal is a circular opening, which you can make 5 to 20 feet in
          diameter. You can orient the portal in any direction you choose. The
          portal lasts for the duration.
        </p>
        <p>
          The portal has a front and a back on each plane where it appears.
          Travel through the portal is possible only by moving through its
          front. Anything that does so is instantly transported to the other
          plane, appearing in the unoccupied space nearest to the portal.
        </p>
        <p>
          Deities and other planar rulers can prevent portals created by this
          spell from opening in their presence or anywhere within their domains.
        </p>
        <p>
          When you cast this spell, you can speak the name of a specific
          creature (a pseudonym, title, or nickname doesn’t work). If that
          creature is on a plane other than the one you are on, the portal opens
          in the named creature’s immediate vicinity and draws the creature
          through it to the nearest unoccupied space on your side of the portal.
          You gain no special power over the creature, and it is free to act as
          the DM deems appropriate. It might leave, attack you, or help you.
        </p>
      </>
    ),
    page: 'phb 244',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A diamond worth at least 5,000gp.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 9,
    school: 'Conjuration',
    class: ['cleric', 'sorcerer', 'wizard'],
  },
  {
    name: 'geas',
    desc: (
      <>
        <p>
          You place a magical command on a creature that you can see within
          range, forcing it to carry out some service or refrain from some
          action or course of activity as you decide. If the creature can
          understand you, it must succeed on a wisdom saving throw or become
          charmed by you for the duration. While the creature is charmed by you,
          it takes 5d10 psychic damage each time it acts in a manner directly
          counter to your instructions, but no more than once each day. A
          creature that can't understand you is unaffected by the spell.
        </p>
        <p>
          You can issue any command you choose, short of an activity that would
          result in certain death. Should you issue a suicidal command, the
          spell ends.
        </p>
        <p>
          You can end the spell early by using an action to dismiss it. A remove
          curse, greater restoration, or wish spell also ends it.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th or 8th level, the
          duration is 1 year. When you cast this spell using a spell slot of 9th
          level, the spell lasts until it is ended by one of the spells
          mentioned above.
        </p>
      </>
    ),
    page: 'phb 244',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: '30 days',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'druid', 'paladin', 'wizard'],
  },
  {
    name: 'gentleRepose',
    desc: (
      <>
        <p>
          Tocas un cadáver o cualquiera de sus restos. Por la duración del
          conjuro, el objetivo se encuentra protegido de la descomposición y no
          puede convertirse en no muerto.
        </p>
        <p>
          Este conjuro también aumenta el tiempo límite para alzar al objetivo
          de entre los muertos, porque los días pasados bajo la influencia de
          este conjuro no cuentan en el tiempo límite de conjuros tales como
          revivir a los muertos [raise dead].
        </p>
      </>
    ),
    page: 'phb 245',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A pinch of salt and one copper piece placed on each of the corpse’s eyes, which must remain there for the duration.',
    ritual: true,
    duration: '10 days',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Necromancy',
    class: ['cleric', 'ritual caster', 'wizard'],
  },
  {
    name: 'giantInsect',
    desc: (
      <>
        <p>
          You transform up to ten centipedes, three spiders, five wasps, or one
          scorpion within range into giant versions of their natural forms for
          the duration. A centipede becomes a giant centipede, a spider becomes
          a giant spider, a wasp becomes a giant wasp, and a scorpion becomes a
          giant scorpion.
        </p>
        <p>
          Each creature obeys your verbal commands, and in combat, they act on
          your turn each round. The DM has the statistics for these creatures
          and resolves their actions and movement.
        </p>
        <p>
          A creature remains in its giant size for the duration, until it drops
          to 0 hit points, or until you use an action to dismiss the effect on
          it.
        </p>
        <p>
          The DM might allow you to choose different targets. For example, if
          you transform a bee, its giant version might have the same statistics
          as a giant wasp.
        </p>
      </>
    ),
    page: 'phb 245',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'glibness',
    desc: (
      <>
        <p>
          Until the spell ends, when you make a Charisma check, you can replace
          the number you roll with a 15. Additionally, no matter what you say,
          magic that would determine if you are telling the truth indicates that
          you are being truthful.
        </p>
      </>
    ),
    page: 'phb 245',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Transmutation',
    class: ['bard', 'warlock'],
  },
  {
    name: 'globeOfInvulnerability',
    desc: (
      <>
        <p>
          An immobile, faintly shimmering barrier springs into existence in a
          10-foot radius around you and remains for the duration.
        </p>
        <p>
          Any spell of 5th level or lower cast from outside the barrier can’t
          affect creatures or objects within it, even if the spell is cast using
          a higher level spell slot. Such a spell can target creatures and
          objects within the barrier, but the spell has no effect on them.
          Similarly, the area within the barrier is excluded from the areas
          affected by such spells.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the barrier blocks spells of one level higher for each slot level
          above 6th.
        </p>
      </>
    ),
    page: 'phb 245',
    range: 'Self',
    components: 'V, S, M',
    material: 'A glass or crystal bead that shatters when the spell ends.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Abjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'glyphOfWarding',
    desc: (
      <>
        <p>
          When you cast this spell, you enter a glyph that hurt other creatures,
          either on a surface (like a table or a portion of a floor or wall) or
          inside an object that can be closed (like a book a parchment or
          cabinet) to hide the glyph. If you opt for a surface, the glyph can
          cover an area of ​​10 feet or less in diameter. If you select an
          object, it must remain in place. If the object is moved to over 10
          feet from where the spell was spell casts, the glyph breeze and the
          spell expires without being triggered.
        </p>
        <p>
          The glyph is virtually invisible and roll Intelligence (Investigation)
          against the fate of your save DC is required to find out.
        </p>
        <p>
          You determine the shutter glyph while casting the spell. For the
          glyphs inscribed on a surface, the triggers are typically hit or stand
          on a glyph remove an object placed on the glyph, approach at a certain
          distance of the glyph or manipulate an object on which is inscribed
          the glyph. For the glyphs inscribed in an object, triggers are
          typically open the object, approaching at a distance from the object,
          seen or read the glyph. Once the glyph is triggered, the spell ends.
        </p>
        <p>
          You can refine the trigger conditions so that the spell will work only
          in certain circumstances or in physical attributes (height or weight),
          the creature type (eg, only aberrations or the Dark Elves trigger the
          glyph) or alignment. You can also determine the conditions for certain
          creatures do not trigger the glyph, using a password, for example.
        </p>
        <p>
          When you sign the glyph, make a choice between the explosive runes or
          glyph fate.
        </p>
        <p>
          <b>Explosive runes.</b> When triggered, magical energy springs from
          the glyph in a 20-foot-radius sphere centered on the glyph. The sphere
          bypasses the corners. Each creature in the area must make a dexterity
          saving throw or it suffers 5d8 acid damage, lightning, fire, cold or
          thunder (to be determined during the creation of the glyph). If
          successful, the damage is halved.
        </p>
        <p>
          <b>Sort glyph.</b> You can store a level of 3 or less prepared spell
          in the glyph to chant during the creation of the glyph. The spell must
          target one creature or area. The stored spell has no immediate effect
          when spell casts that way. When the glyph is activated, the stored
          spell spell casts. If the spell is a target, it will target the
          creature that triggered the glyph. If the spell affects an area, the
          area is centered on that creature. If the spell invokes hostile
          creatures or creates sharp objects or traps, they also appear close as
          possible to the intruder and attack. If the spell requires
          concentration, it persists for the duration of the spell.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a 4 or higher is level, the damage
          explosive runes increased by 1d8 for each level of top slot 3. If you
          create a glyph spell, you may store a spell whose level is equivalent
          or less to spell slot used for the custody of the glyph.
        </p>
      </>
    ),
    page: 'phb 245',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Incense and powdered diamond worth at least 200 gp, the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 hour',
    level: 3,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'wizard'],
  },
  {
    name: 'goodberry',
    desc: (
      <>
        <p>
          Hasta diez bayas aparecen en tu mano las cuales están infundidas con
          magia por toda la duración del conjuro. Una criatura puede usar su
          acción para comer una baya. Comerse una baya recupera 1 punto de
          golpe, y la baya provee suficiente nutrientes para mantener a una
          criatura durante un día.
        </p>
        <p>
          Las bayas pierden su potencial si estas no han sido consumidas en las
          24 horas después de que el conjuro fue lanzado.
        </p>
      </>
    ),
    page: 'phb 246',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A sprig of mistletoe.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Transmutation',
    class: ['druid', 'ranger'],
  },
  {
    name: 'graspingVine',
    desc: (
      <>
        <p>
          You conjure a vine that sprouts from the ground in an unoccupied space
          of your choice that you can see within range. When you cast this
          spell, you can direct the vine to lash out at a creature within 30
          feet of it that you can see. That creature must succeed on a dexterity
          saving throw or be pulled 20 feet directly toward the vine.
        </p>
        <p>
          Until the spell ends, you can direct the vine to lash out at the same
          creature or another one as a bonus action on each of your turns.
        </p>
      </>
    ),
    page: 'phb 246',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 4,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['nature'],
    },
    domains: ['nature'],
  },
  {
    name: 'grease',
    desc: (
      <>
        <p>
          Una grasa resbaladiza cubre el terrero en un cuadrado de 10 pies (2
          casillas, 3 m) de lado centrada en un punto dentro del alcance y
          convirtiendo el área en terreno difícil.
        </p>
        <p>
          Cuando la grasa aparece, cada criatura en el área debe realizar una
          tirada de salvación con éxito de Destreza o caer tumbada. Una criatura
          que entre en el área o finalice su turno ahí también debe superar una
          tirada de salvación o caer tumbada.
        </p>
      </>
    ),
    page: 'phb 246',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A bit of pork rind or butter.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['wizard'],
  },
  {
    name: 'greaterInvisibility',
    desc: (
      <>
        <p>
          You or a creature you touch becomes invisible until the spell ends.
          Anything the target is wearing or carrying is invisible as long as it
          is on the target’s person.
        </p>
      </>
    ),
    page: 'phb 246',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Illusion',
    class: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['underdark'],
      warlock: ['archfey'],
    },
    circles: ['underdark'],
    patrons: ['archfey'],
  },
  {
    name: 'greaterRestoration',
    desc: (
      <>
        <p>
          You imbue a creature you touch with positive energy to undo a
          debilitating effect. You can reduce the target’s exhaustion level by
          one, or end one of the following effects on the target:
        </p>
        <p>- One effect that charmed or petrified the target</p>
        <p>
          - One curse, including the target’s attunement to a cursed magic item
        </p>
        <p>- Any reduction to one of the target’s ability scores</p>
        <p>- One effect reducing the target’s hit point maximum</p>
      </>
    ),
    page: 'phb 246',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Diamond dust worth at least 100gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'druid'],
  },
  {
    name: 'guardianOfFaith',
    desc: (
      <>
        <p>
          A Large spectral guardian appears and hovers for the duration in an
          unoccupied space of your choice that you can see within range. The
          guardian occupies that space and is indistinct except for a gleaming
          sword and shield emblazoned with the symbol of your deity.
        </p>
        <p>
          Any creature hostile to you that moves to a space within 10 feet of
          the guardian for the first time on a turn must succeed on a dexterity
          saving throw. The creature takes 20 radiant damage on a failed save,
          or half as much damage on a successful one. The guardian vanishes when
          it has dealt a total of 60 damage.
        </p>
      </>
    ),
    page: 'phb 246',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['cleric', 'paladin'],
    archetype: {
      paladin: ['devotion'],
    },
    domains: ['life', 'light'],
    oaths: 'Devotion',
  },
  {
    name: 'guardsAndWards',
    desc: (
      <>
        <p>
          You create a ward that protects up to 2,500 square feet of floor space
          (an area 50 feet square, or one hundred 5-foot squares or twenty-five
          10-foot squares). The warded area can be up to 20 feet tall, and
          shaped as you desire. You can ward several stories of a stronghold by
          dividing the area among them, as long as you can walk into each
          contiguous area while you are casting the spell.
        </p>
        <p>
          When you cast this spell, you can specify individuals that are
          unaffected by any or all of the effects that you choose. You can also
          specify a password that, when spoken aloud, makes the speaker immune
          to these effects.
        </p>
        <p>
          Guards and wards creates the following effects within the warded area.
        </p>
        <p>
          <b>Corridors.</b> Fog fills all the warded corridors, making them
          heavily obscured. In addition, at each intersection or branching
          passage offering a choice of direction, there is a 50 percent chance
          that a creature other than you will believe it is going in the
          opposite direction from the one it chooses.
        </p>
        <p>
          <b>Doors.</b> All doors in the warded area are magically locked, as if
          sealed by an arcane lock spell. In addition, you can cover up to ten
          doors with an illusion (equivalent to the illusory object function of
          the minor illusion spell) to make them appear as plain sections of
          wall.
        </p>
        <p>
          <b>Stairs.</b> Webs fill all stairs in the warded area from top to
          bottom, as the web spell. These strands regrow in 10 minutes if they
          are burned or torn away while guards and wards lasts.
        </p>
        <p>
          <b>Other Spell Effect.</b> You can place your choice of one of the
          following magical effects within the warded area of the stronghold.
        </p>
        <p>
          - Place dancing lights in four corridors. You can design nate a simple
          program that the lights repeat as long as guards and wards lasts.
        </p>
        <p>- Place magic mouth in two locations.</p>
        <p>
          - Place stinking cloud in two locations. The vapors appear in the
          places you designate; they return within 10 minutes if dispersed by
          wind while guards and wards lasts.
        </p>
        <p>- Place a constant gust of wind in one corridor or room.</p>
        <p>
          - Place a suggestion in one location. You select an area of up to 5
          feet square, and any creature that enters or passes through the area
          receives the suggestion mentally.
        </p>
        <p>
          The whole warded area radiates magic. A dispel magic cast on a
          specific effect, if successful, removes only that effect.
        </p>
        <p>
          You can create a permanently guarded and warded structure by casting
          this spell there every day for one year.
        </p>
      </>
    ),
    page: 'phb 248',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Burning incense, a small measure of brimstone and oil, a knotted string, a small amount of umber hulk blood, and a small silver rod worth at least 10 gp.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '10 minutes',
    level: 6,
    school: 'Abjuration',
    class: ['bard', 'wizard'],
  },
  {
    name: 'guidance',
    desc: (
      <>
        <p>
          Tocas a una criatura voluntaria. Una vez antes de que el conjuro
          termine, el objetivo puede tirar 1d4 y sumar el resultado a una prueba
          de característica de su elección. Puede tirar el dado antes o después
          de hacer la prueba. Luego el conjuro termina.
        </p>
      </>
    ),
    page: 'phb 248',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 0,
    school: 'Divination',
    class: ['cleric', 'druid'],
  },
  {
    name: 'guidingBolt',
    desc: (
      <>
        <p>
          Un destello de luz golpea directamente a una criatura de tu elección
          dentro del alcance. Realiza un ataque de conjuro a distancia contra el
          objetivo. Si aciertas, el objetivo sufre 4d6 puntos de daño radiante,
          y el siguiente ataque realizado contra el objetivo antes de que
          finalice tu siguiente turno tiene ventaja, gracias a la tenue luz
          mística que brilla en el objetivo hasta entonces.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa por 1d6 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 248',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'gustOfWind',
    desc: (
      <>
        <p>
          Una línea de fuerte viento de 60 pies (12 casillas, 18 m) de largo y
          10 pies (2 casillas, 3 m) de ancho sale disparada de ti en la
          dirección que elijas por la duración del conjuro. Cada criatura que
          comience su turno en la línea debe superar una tirada de salvación de
          Fuerza o ser empujado 15 pies (3 casillas, 4.5 m) de ti en la
          dirección de la línea.
        </p>
        <p>
          Cualquier criatura en la línea debe gastar 2 pies de movimiento por
          cada 1 pie si trata de acercarse a ti.
        </p>
        <p>
          La ráfaga dispersa gas o vapor, y extingue velas, antorchas y llamas
          similares sin proteger en el área. El viento provoca que las llamas
          protegidas como las que se encuentren en las linternas, bailen
          salvajemente y tengan un 50 por ciento de probabilidades de
          extinguirse.
        </p>
        <p>
          Como acción adicional en cada uno de tus turnos antes de que el
          conjuro finalice, puedes cambiar la dirección en la cual la línea sale
          proyectada de ti.
        </p>
      </>
    ),
    page: 'phb 248',
    range: 'Self',
    components: 'V, S, M',
    material: 'A legume seed.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['cleric', 'druid', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
  },
  {
    name: 'hailOfThorns',
    desc: (
      <>
        <p>
          La próxima vez que impactes a una criatura con un arma a distancia
          antes de que el conjuro finalice, este conjuro crea una lluvia de
          espinas que nacen de tu arma a distancia o de tu munición. Además del
          efecto normal del ataque, el objetivo del mismo y cada criatura a 5
          pies de él deben realizar una tirada de salvación de Destreza. Una
          criatura sufre 1d10 puntos de daño perforante con una salvación
          fracasada, o la mitad con una salvación con éxito.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d10 por cada nivel de espacio de
          conjuros por encima de nivel 1 (hasta un máximo de 6d10).
        </p>
      </>
    ),
    page: 'phb 249',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Conjuration',
    class: ['ranger'],
  },
  {
    name: 'hallow',
    desc: (
      <>
        <p>
          You touch a point and infuse an area around it with holy (or unholy)
          power. The area can have a radius up to 60 feet, and the spell fails
          if the radius includes an area already under the effect a hallow
          spell. The affected area is subject to the following effects.
        </p>
        <p>
          First, celestials, elementals, fey, fiends, and undead can’t enter the
          area, nor can such creatures charm, frighten, or possess creatures
          within it. Any creature charmed, frightened, or possessed by such a
          creature is no longer charmed, frightened, or possessed upon entering
          the area. You can exclude one or more of those types of creatures from
          this effect.
        </p>
        <p>
          Second, you can bind an extra effect to the area. Choose the effect
          from the following list, or choose an effect offered by the DM. Some
          of these effects apply to creatures in the area; you can designate
          whether the effect applies to all creatures, creatures that follow a
          specific deity or leader, or creatures of a specific sort, such as
          ores or trolls. When a creature that would be affected enters the
          spell’s area for the first time on a turn or starts its turn there, it
          can make a charisma saving throw. On a success, the creature ignores
          the extra effect until it leaves the area.
        </p>
        <p>
          <b>Courage.</b> Affected creatures can’t be frightened while in the
          area.
        </p>
        <p>
          <b>Darkness.</b> Darkness fills the area. Normal light, as well as
          magical light created by spells of a lower level than the slot you
          used to cast this spell, can’t illuminate the area.
        </p>
        <p>
          <b>Daylight.</b> Bright light fills the area. Magical darkness created
          by spells of a lower level than the slot you used to cast this spell
          can’t extinguish the light.
        </p>
        <p>
          <b>Energy Protection.</b> Affected creatures in the area have
          resistance to one damage type of your choice, except for bludgeoning,
          piercing, or slashing.
        </p>
        <p>
          <b>Energy Vulnerability.</b> Affected creatures in the area have
          vulnerability to one damage type of your choice, except for
          bludgeoning, piercing, or slashing.
        </p>
        <p>
          <b>Everlasting Rest.</b> Dead bodies interred in the area can’t be
          turned into undead.
        </p>
        <p>
          <b>Extradimensional Interference.</b> Affected creatures can’t move or
          travel using teleportation or by extradimensional or interplanar
          means.
        </p>
        <p>
          <b>Fear.</b> Affected creatures are frightened while in the area.
        </p>
        <p>
          <b>Silence.</b> No sound can emanate from within the area, and no
          sound can reach into it.
        </p>
        <p>
          <b>Tongues.</b> Affected creatures can communicate with any other
          creature in the area, even if they don’t share a common language.
        </p>
      </>
    ),
    page: 'phb 249',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Herbs, oils, and incense worth at least 1,000 gp, which the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '24 hours',
    level: 5,
    school: 'Evocation',
    class: ['cleric', 'warlock'],
    archetype: {
      warlock: ['fiend'],
    },
    patrons: ['fiend'],
  },
  {
    name: 'hallucinatoryTerrain',
    desc: (
      <>
        <p>
          The tactile characteristics of the terrain are unchanged, so creatures
          entering the area are likely to see through the illusion. If the
          difference isn’t obvious by touch, a creature carefully examining the
          illusion can attempt an Intelligence (Investigation) check against
          your spell save DC to disbelieve it. A creature who discerns the
          illusion for what it is, sees it as a vague image superimposed on the
          terrain.
        </p>
      </>
    ),
    page: 'phb 249',
    range: '300 feet',
    components: 'V, S, M',
    material:
      'A stone, a twig, and a bit of green plant.</p><p>You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren’t changed in appearance.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '10 minutes',
    level: 4,
    school: 'Illusion',
    class: ['bard', 'druid', 'warlock', 'wizard'],
    circles: ['desert'],
  },
  {
    name: 'harm',
    desc: (
      <>
        <p>
          You unleash a virulent disease on a creature that you can see within
          range. The target must make a constitution saving throw. On a failed
          save, it takes 14d6 necrotic damage, or half as much damage on a
          successful save. The damage can’t reduce the target’s hit points below
          1. If the target fails the saving throw, its hit point maximum is
          reduced for 1 hour by an amount equal to the necrotic damage it took.
          Any effect that removes a disease allows a creature’s hit point
          maximum to return to normal before that time passes.
        </p>
      </>
    ),
    page: 'phb 249',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Necromancy',
    class: ['cleric'],
  },
  {
    name: 'haste',
    desc: (
      <>
        <p>
          Choose a willing creature that you can see within range. Until the
          spell ends, the target’s speed is doubled, it gains a +2 bonus to AC,
          it has advantage on dexterity saving throws, and it gains an
          additional action on each of its turns. That action can be used only
          to take the Attack (one weapon attack only), Dash, Disengage, Hide, or
          Use an Object action.
        </p>
        <p>
          When the spell ends, the target can’t move or take actions until after
          its next turn, as a wave of lethargy sweeps over it.
        </p>
      </>
    ),
    page: 'phb 250',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A shaving of licorice root.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['druid', 'paladin', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['grassland'],
      paladin: ['vengeance'],
    },
    circles: ['grassland'],
    oaths: 'Vengeance',
  },
  {
    name: 'heal',
    desc: (
      <>
        <p>
          Choose a creature that you can see within range. A surge of positive
          energy washes through the creature, causing it to regain 70 hit
          points. This spell also ends blindness, deafness, and any diseases
          affecting the target. This spell has no effect on constructs or
          undead.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the amount of healing increases by 10 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 250',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['cleric', 'druid'],
  },
  {
    name: 'healingWord',
    desc: (
      <>
        <p>
          Una criatura de tu elección que puedas ver dentro del alcance recupera
          Puntos de Golpe iguales a 1d4 + tu modificador de característica de
          lanzamiento de conjuros. Este conjuro no tiene ningún efecto sobre
          constructos o muertos vivientes.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, la cantidad de sanación se incrementa en 1d4 por cada nivel
          de espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 250',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Evocation',
    class: ['bard', 'cleric', 'druid'],
  },
  {
    name: 'heatMetal',
    desc: (
      <>
        <p>
          Elige un objeto metálico manufacturado, como un arma de metal o una
          armadura metálica media o pesada, que puedas ver dentro del alcance.
          Provocas que el objeto comience a brillar al rojo vivo. Cualquier
          criatura en contacto físico con el objeto sufre 2d8 puntos de daño por
          fuego cuando lanzas este conjuro. Hasta que el conjuro finalice puedes
          usar una acción adicional en cada uno de tus subsiguientes turnos para
          causar este daño de nuevo.
        </p>
        <p>
          Si la criatura está agarrando o portando el objeto del que toma daño,
          esta debe superar una tirada de salvación de Constitución o tirar el
          objeto si es que puede. Si no puede tirar el objeto, tiene desventaja
          en las tiradas de ataque y las pruebas de característica hasta el
          comienzo de tu siguiente turno.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 3rd level or higher,
          the damage increases by 1d8 for each slot level above 2nd.
        </p>
      </>
    ),
    page: 'phb 250',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A piece of iron and a flame.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['bard', 'druid'],
  },
  {
    name: 'hellishRebuke',
    desc: (
      <>
        <p>
          Apuntas con tu dedo, y la criatura que te dañó se ve momentáneamente
          envuelta por llamas infernales. La criatura debe realizar una tirada
          de salvación de Destreza. Esta sufre 2d10 puntos de daño por fuego en
          una salvación fallida, o la mitad del daño en una salvación con éxito.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se ve incrementado por 1d10 por cada nivel de
          espacio de conjuros por encima de nivel 1
        </p>
      </>
    ),
    page: 'phb 250',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 reaction',
    level: 1,
    school: 'Evocation',
    class: ['warlock'],
  },
  {
    name: "heroes'Feast",
    desc: (
      <>
        <p>
          You bring forth a great feast, including magnificent food and drink.
          The feast takes 1 hour to consume and disappears at the end of that
          time, and the beneficial effects don’t set in until this hour is over.
          Up to twelve other creatures can partake of the feast.
        </p>
        <p>
          A creature that partakes of the feast gains several benefits. The
          creature is cured of all diseases and poison, becomes immune to poison
          and being frightened, and makes all wisdom saving throws with
          advantage. Its hit point maximum also increases by 2d10, and it gains
          the same number of hit points. These benefits last for 24 hours.
        </p>
      </>
    ),
    page: 'phb 250',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A gem-encrusted bowl worth at least 1,000gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 6,
    school: 'Conjuration',
    class: ['cleric', 'druid'],
  },
  {
    name: 'heroism',
    desc: (
      <>
        <p>
          Una criatura voluntaria que toques es imbuida con valentía. Hasta que
          el conjuro finalice, la criatura es inmune a ser asustada y gana
          Puntos de Golpe temporales iguales a tu modificador de característica
          de lanzamiento de conjuros al comienzo de cada uno de sus turnos.
          Cuando el conjuro finaliza, el objetivo pierde cualquier remanente de
          Puntos de Golpe temporales de este conjuro.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, puedes elegir como objetivo una criatura adicional por cada
          nivel de espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 250',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'paladin'],
  },
  {
    name: 'hex',
    desc: (
      <>
        <p>
          Colocas una maldición en una criatura que puedes ver dentro del
          alcance. Hasta que el conjuro finalice, infliges 1d6 puntos de daño
          necrótico extra al objetivo siempre que aciertes un impacto con un
          ataque. Además, elige una característica cuando lanzas el conjuro. El
          objetivo tiene desventaja en las tiradas de característica realizadas
          con la característica elegida
        </p>
        <p>
          Si el objetivo cae a 0 Puntos de Golpe antes de que el conjuro
          finalice, puedes utilizar una acción adicional en un turno tuyo
          subsiguiente para maldecir a una nueva criatura.
        </p>
        <p>
          Un lanzamiento de quitar maldición [remove curse] en el objetivo
          finaliza este conjuro prematuramente.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 ó
          4, puedes mantener la concentración en el conjuro hasta 8 horas.
          Cuando usas un espacio de conjuros de nivel 5 o superior, puedes
          mantener la concentración en el conjuro hasta 24 horas.
        </p>
      </>
    ),
    page: 'phb 251',
    range: '90 feet',
    components: 'V, S, M',
    material: 'The petrified eye of a newt.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Enchantment',
    class: ['warlock'],
  },
  {
    name: 'holdMonster',
    desc: (
      <>
        <p>
          Choose a creature you can see and reach. The target must make a saving
          throw of Wisdom or be paralyzed for the duration of the spell. This
          spell has no effect against the undead. At the end of each round, the
          target can make a new saving throw of Wisdom. If successful, the spell
          ends for the creature.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a level 6 or higher location, you can
          target an additional creature for each level of location beyond the
          fifth. The creatures must be within 30 feet o f each other when you
          target them.
        </p>
      </>
    ),
    page: 'phb 251',
    range: '90 feet',
    components: 'V, S, M',
    material: 'A small piece of iron.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['war'],
      paladin: ['vengeance'],
    },
    domains: ['war'],
    oaths: 'Vengeance',
  },
  {
    name: 'holdPerson',
    desc: (
      <>
        <p>
          Elige un humanoide que puedas ver dentro del alcance. El objetivo debe
          superar una tirada de salvación de Sabiduría o ser paralizado durante
          la duración. Al final de cada uno de sus turnos, el objetivo puede
          intentar otra tirada de salvación de Sabiduría. Si tiene éxito, el
          conjuro finaliza en el objetivo.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, puedes elegir como objetivo a un humanoide adicional por
          cada nivel de espacio de conjuros por encima de nivel 2. Los
          humanoides deben de estar a 30 pies (6 casillas, 9 m) uno del otro
          cuando los selecciones.
        </p>
      </>
    ),
    page: 'phb 251',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A small, straight piece of iron.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'sorcerer',
      'warlock',
      'wizard',
    ],
    archetype: {
      paladin: ['vengeance'],
    },
    circles: ['arctic'],
    oaths: 'Vengeance',
  },
  {
    name: 'holyAura',
    desc: (
      <>
        <p>
          Divine light washes out from you and coalesces in a soft radiance in a
          30-foot radius around you. Creatures of your choice in that radius
          when you cast this spell shed dim light in a 5-foot radius and have
          advantage on all saving throws, and other creatures have disadvantage
          on attack rolls against them until the spell ends. In addition, when a
          fiend or an undead hits an affected creature with a melee attack, the
          aura flashes with brilliant light. The attacker must succeed on a
          constitution saving throw or be blinded until the spell ends.
        </p>
      </>
    ),
    page: 'phb 251',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A tiny reliquary worth at least 1,000gp containing a sacred relic, such as a scrap of cloth from a saint’s robe or a piece of parchment from a religious text.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Abjuration',
    class: ['cleric'],
  },
  {
    name: 'hungerOfHadar',
    desc: (
      <>
        <p>
          You open a gateway to the dark between the stars, a region infested
          with unknown horrors. A 20-foot-radius sphere of blackness and bitter
          cold appears, centered on a point with range and lasting for the
          duration. This void is filled with a cacophony of soft whispers and
          slurping noises that can be heard up to 30 feet away. No light,
          magical or otherwise, can illuminate the area, and creatures fully
          within the area are blinded.
        </p>
        <p>
          The void creates a warp in the fabric of space, and the area is
          difficult terrain. Any creature that starts its turn in the area takes
          2d6 cold damage. Any creature that ends its turn in the area must
          succeed on a dexterity saving throw or take 2d6 acid damage as milky,
          otherworldly tentacles rub against it.
        </p>
      </>
    ),
    page: 'phb 251',
    range: '150 feet',
    components: 'V, S, M',
    material: 'A pickled octopus tentacle.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['warlock'],
  },
  {
    name: "hunter'sMark",
    desc: (
      <>
        <p>
          Elige a una criatura que puedas ver dentro del alcance y queda
          místicamente marcada como tu presa. Hasta que el conjuro finalice,
          infliges 1d6 puntos de daño extra al objetivo cada vez que aciertas un
          impacto con un ataque de arma, y tienes ventaja en cualquier prueba de
          Sabiduría (Percepción) o Sabiduría (Supervivencia) para tratar de
          encontrarlo. Si el objetivo cae a 0 Puntos de Golpe antes de que el
          conjuro finalice, como acción adicional en un turno subsiguiente tuyo
          puedes marcar a una nueva criatura.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 ó
          4, puedes mantener la concentración en este conjuro hasta 8 horas.
          Cuando usas un espacio de conjuros de nivel 5 o superior, puedes
          mantener la concentración en el conjuro hasta 24 horas.
        </p>
      </>
    ),
    page: 'phb 251',
    range: '90 feet',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Divination',
    class: ['paladin', 'ranger'],
    archetype: {
      paladin: ['vengeance'],
    },
    oaths: 'Vengeance',
  },
  {
    name: 'hypnoticPattern',
    desc: (
      <>
        <p>
          You create a twisting pattern of colors that weaves through the air
          inside a 30-foot cube within range. The pattern appears for a moment
          and vanishes. Each creature in the area who sees the pattern must make
          a wisdom saving throw. On a failed save, the creature becomes charmed
          for the duration. While charmed by this spell, the creature is
          incapacitated and has a speed of 0.
        </p>
        <p>
          The spell ends for an affected creature if it takes any damage or if
          someone else uses an action to shake the creature out of its stupor.
        </p>
      </>
    ),
    page: 'phb 252',
    range: '120 feet',
    components: 'S, M',
    material:
      'A glowing stick of incense or a crystal vial filled with phosphorescent material.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'iceStorm',
    desc: (
      <>
        <p>
          A hail of rock-hard ice pounds to the ground in a 20-foot-radius,
          40-foot-high cylinder centered on a point within range. Each creature
          in the cylinder must make a dexterity saving throw. A creature takes
          2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half
          as much damage on a successful one.
        </p>
        <p>
          Hailstones turn the storm’s area of effect into difficult terrain
          until the end of your next turn.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th level or higher,
          the bludgeoning damage increases by 1d8 for each slot level above 4th.
        </p>
      </>
    ),
    page: 'phb 252',
    range: '300 feet',
    components: 'V, S, M',
    material: 'A pinch of dust and a few drops of water.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Evocation',
    class: ['cleric', 'druid', 'paladin', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['tempest'],
      paladin: ['ancients'],
    },
    domains: ['tempest'],
    circles: ['arctic'],
    oaths: 'Ancients',
  },
  {
    name: 'identify',
    desc: (
      <>
        <p>
          Eliges un objeto que debes estar tocando mientras realizas este
          conjuro. Si es un objeto mágico o algún tipo de objeto con magia
          imbuida, aprendes sus propiedades y cómo usarlas, ya sea que requiera
          vinculación, y cuantas cargas posee, si es que tiene alguna. Aprendes
          si algún conjuro está afectando el objeto y que es lo que hace. Si el
          objeto fue creado por un conjuro, aprendes que conjuro lo creo.
        </p>
        <p>
          Si en su lugar tocas a una criatura mientras realizas el conjuro,
          aprendes que conjuros, si es que hay alguno, está actualmente
          afectándolo.
        </p>
      </>
    ),
    page: 'phb 252',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A pearl worth at least 100gp and an owl feather.',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 1,
    school: 'Divination',
    class: ['bard', 'cleric', 'ritual caster', 'wizard'],
    archetype: {
      cleric: ['knowledge'],
    },
    domains: ['knowledge'],
  },
  {
    name: 'illusoryScript',
    desc: (
      <>
        <p>
          Escribes en un pergamino, papel u otro material de escritura adecuado
          y lo imbuyes con una potente ilusión que se mantiene por la duración
          del conjuro.
        </p>
        <p>
          Solo para ti y las criaturas que designes cuando estas lanzando el
          conjuro, la escritura aparece normal, escrita por tu mano y transmites
          cualquiera que sea el significado que intentas mostrar cuando
          escribiste el texto. Para los demás, la escritura aparece como si
          fuera escrita en una mágica o desconocida escritura que es ilegible,
          alternativamente, puedes provocar que el escrito aparezca ser un
          mensaje totalmente diferente, escrito por otra mano y lenguaje, aunque
          el lenguaje tiene que ser uno que tu conozcas.
        </p>
        <p>
          Este conjuro puede ser disipado, pero tanto el mensaje original como
          la ilusión desaparecen.
        </p>
        <p>Una criatura con ver realmente puede leer el mensaje oculto.</p>
      </>
    ),
    page: 'phb 252',
    range: 'Touch',
    components: 'S, M',
    material:
      'A lead-based ink worth at least 10gp, which this spell consumes.',
    ritual: true,
    duration: '10 days',
    concentration: false,
    casting_time: '1 minute',
    level: 1,
    school: 'Illusion',
    class: ['bard', 'ritual caster', 'warlock', 'wizard'],
  },
  {
    name: 'imprisonment',
    desc: (
      <>
        <p>
          You create a magical restraint to hold a creature that you can see
          within range. The target must succeed on a wisdom saving throw or be
          bound by the spell; if it succeeds, it is immune to this spell if you
          cast it again. While affected by this spell, the creature doesn’t need
          to breathe, eat, or drink, and it doesn’t age. Divination spells can’t
          locate or perceive the target.
        </p>
        <p>
          When you cast the spell, you choose one of the following forms of
          imprisonment.
        </p>
        <p>
          Burial. The target is entombed far beneath the earth in a sphere of
          magical force that is just large enough to contain the target. Nothing
          can pass through the sphere, nor can any creature teleport or use
          planar travel to get into or out of it.
        </p>
        <p>
          The special component for this version of the spell is a small mithral
          orb.
        </p>
        <p>
          Chaining. Heavy chains, firmly rooted in the ground, hold the target
          in place. The target is restrained until the spell ends, and it can’t
          move or be moved by any means until then.
        </p>
        <p>
          The special component for this version of the spell is a fine chain of
          precious metal.
        </p>
        <p>
          Hedged Prison. The spell transports the target into a tiny demiplane
          that is warded against teleportation and planar travel. The demiplane
          can be a labyrinth, a cage, a tower, or any similar confined structure
          or area of your choice.
        </p>
        <p>
          The special component for this version of the spell is a miniature
          representation of the prison made from jade.
        </p>
        <p>
          Minimus Containment. The target shrinks to a height of 1 inch and is
          imprisoned inside a gemstone or similar object. Light can pass through
          the gemstone normally (allowing the target to see out and other
          creatures to see in), but nothing else can pass through, even by means
          of teleportation or planar travel. The gemstone can’t be cut or broken
          while the spell remains in effect.
        </p>
        <p>
          The special component for this version of the spell is a large,
          transparent gemstone, such as a corundum, diamond, or ruby.
        </p>
        <p>Slumber. The target falls asleep and can’t be awoken.</p>
        <p>
          The special component for this version of the spell consists of rare
          soporific herbs.
        </p>
        <p>
          Ending the Spell. During the casting of the spell, in any of its
          versions, you can specify a condition that will cause the spell to end
          and release the target. The condition can be as specific or as
          elaborate as you choose, but the DM must agree that the condition is
          reasonable and has a likelihood of coming to pass. The conditions can
          be based on a creature’s name, identity, or deity but otherwise must
          be based on observable actions or qualities and not based on
          intangibles such as level, class, or hit points.
        </p>
        <p>
          A dispel magic spell can end the spell only if it is cast as a
          9th-level spell, targeting either the prison or the special component
          used to create it.
        </p>
        <p>
          You can use a particular special component to create only one prison
          at a time. If you cast the spell again using the same component, the
          target of the first casting is immediately freed from its binding.
        </p>
      </>
    ),
    page: 'phb 252',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A vellum depiction or a carved statuette in the likeness of the target, and a special component that varies according to the version of the spell you choose, worth at least 500gp per Hit Die of the target.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 9,
    school: 'Abjuration',
    class: ['warlock', 'wizard'],
  },
  {
    name: 'incendiaryCloud',
    desc: (
      <>
        <p>
          A swirling cloud of smoke shot through with white-hot embers appears
          in a 20-foot-radius sphere centered on a point within range. The cloud
          spreads around corners and is heavily obscured. It lasts for the
          duration or until a wind of moderate or greater speed (at least 10
          miles per hour) disperses it.
        </p>
        <p>
          When the cloud appears, each creature in it must make a dexterity
          saving throw. A creature takes 10d8 fire damage on a failed save, or
          half as much damage on a successful one. A creature must also make
          this saving throw when it enters the spell’s area for the first time
          on a turn or ends its turn there.
        </p>
        <p>
          The cloud moves 10 feet directly away from you in a direction that you
          choose at the start of each of your turns.
        </p>
      </>
    ),
    page: 'phb 253',
    range: '150 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Conjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'inflictWounds',
    desc: (
      <>
        <p>
          Realiza un ataque de conjuro cuerpo a cuerpo contra una criatura que
          tengas al alcance. En un impacto con éxito, el objetivo sufre 3d10
          puntos de daño necrótico.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d10 por cada nivel del espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 253',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Necromancy',
    class: ['cleric'],
  },
  {
    name: 'insectPlague',
    desc: (
      <>
        <p>
          Swarming, biting locusts fill a 20-foot-radius sphere centered on a
          point you choose within range. The sphere spreads around corners. The
          sphere remains for the duration, and its area is lightly obscured. The
          sphere's area is difficult terrain.
        </p>
        <p>
          When the area appears, each creature in it must make a constitution
          saving throw. A creature takes 4d10 piercing damage on a failed save,
          or half as much damage on a successful one. A creature must also make
          this saving throw when it enters the spell's area for the first time
          on a turn or ends its turn there.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the damage increases by 1d10 for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 254',
    range: '300 feet',
    components: 'V, S, M',
    material:
      'A few grains of sugar, some kernels of grain, and a smear of fat.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'sorcerer'],
    domains: ['nature', 'tempest'],
    circles: ['desert', 'grassland', 'swamp', 'underdark'],
  },
  {
    name: 'invisibility',
    desc: (
      <>
        <p>
          Una criatura que tocas se vuelve invisible hasta que finaliza el
          conjuro. Cualquier cosa que el objetivo este portando o transportando
          se vuelve invisible siempre que esté sobre la persona objetivo. El
          conjuro finaliza cuando el objetivo ataca o lanza un conjuro.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, puedes elegir como objetivo a una criatura adicional por
          cada nivel de espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 254',
    range: 'Touch',
    components: 'V, S, M',
    material: 'An eyelash encased in gum arabic.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['grassland'],
    },
    circles: ['grassland'],
  },
  {
    name: 'jump',
    desc: (
      <>
        <p>
          Tocas una criatura. La distancia de salto que puede cubrir esa
          criatura es triplicada hasta que el conjuro finalice.
        </p>
      </>
    ),
    page: 'phb 254',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A grasshopper’s hind leg.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Transmutation',
    class: ['druid', 'ranger', 'sorcerer', 'wizard'],
  },
  {
    name: 'knock',
    desc: (
      <>
        <p>
          Elige un objeto que puedas ver dentro del alcance. El objeto puede ser
          una puerta, una caja, un cofre, un juego de grilletes, un candado u
          otro objeto que contenga un método corriente o mágico para impedir
          abrirlo.
        </p>
        <p>
          Un objetivo que esté cerrado por una cerradura corriente o que está
          atascado o atrancado queda abierto, desatascado o desatrancado. Si el
          objeto posee varias cerraduras, solo una de ellas queda abierta. Si
          eliges un objetivo que está cerrado con cerradura arcana [arcane
          lock], el conjuro queda suprimido durante 10 minutos, tiempo durante
          el cual el objetivo puede ser abierto y cerrado de manera normal.
          Cuando lanzas el conjuro, un fuerte golpe, que se oye tan lejos como a
          300 pies (60 casillas 90 m), surge del objeto elegido como objetivo.
        </p>
      </>
    ),
    page: 'phb 254',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'legendLore',
    desc: (
      <>
        <p>
          Name or describe a person, place or object. The fate brings to mind a
          brief and summary information about the thing you named. Information
          can be presented as tales of forgotten history or even secret
          information that have never been revealed. If the thing you named is
          not legendary resonance, you get no information. More information you
          already have about the thing, more precise and detailed the
          information you will receive.
        </p>
        <p>
          What you learn is accurate but can be hidden in figurative language.
          For example, if you have a mysterious magical ax in your hand, the
          spell can reveal this information: "Woe to the wicked that affects his
          hands the ax because the handle decide those of malignant Only a true
          child of the stone magnet. and loved Moradin could awaken the true
          power of this ax, and only with the sacred Rudnogg word on the lips."
        </p>
      </>
    ),
    page: 'phb 254',
    range: 'Self',
    components: 'V, S, M',
    material:
      'Incense worth 250 inches that fate consumes and four sticks of ivory worth 50 gp each.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 5,
    school: 'Divination',
    class: ['bard', 'cleric', 'wizard'],
    domains: ['knowledge'],
  },
  {
    name: "leomund'sSecretChest",
    desc: (
      <>
        <p>
          You hide a chest, and all its contents, on the Ethereal Plane. You
          must touch the chest and the miniature replica that serves as a
          material component for the spell. The chest can contain up to 12 cubic
          feet of nonliving material (3 feet by 2 feet by 2 feet).
        </p>
        <p>
          While the chest remains on the Ethereal Plane, you can use an action
          and touch the replica to recall the chest. It appears in an unoccupied
          space on the ground within 5 feet of you. You can send the chest back
          to the Ethereal Plane by using an action and touching both the chest
          and the replica.
        </p>
        <p>
          After 60 days, there is a cumulative 5 percent chance per day that the
          spell's effect ends. This effect ends if you cast this spell again, if
          the smaller replica chest is destroyed, or if you choose to end the
          spell as an action. If the spell ends and the larger chest is on the
          Ethereal Plane, it is irretrievably lost.
        </p>
      </>
    ),
    page: 'phb 254',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'An exquisite chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth at least 5,000 gp, and a Tiny replica made from the same materials worth at least 50 gp.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['wizard'],
  },
  {
    name: "leomund'sTinyHut",
    desc: (
      <>
        <p>
          A 10-foot-radius immobile dome of force springs into existence around
          and above you and remains stationary for the duration. The spell ends
          if you leave its area.
        </p>
        <p>
          Nine creatures of Medium size or smaller can fit inside the dome with
          you. The spell fails if its area includes a larger creature or more
          than nine creatures. Creatures and objects within the dome when you
          cast this spell can move through it freely. All other creatures and
          objects are barred from passing through it. Spells and other magical
          effects can’t extend through the dome or be cast through it. The
          atmosphere inside the space is comfortable and dry, regardless of the
          weather outside.
        </p>
        <p>
          Until the spell ends, you can command the interior to become dimly lit
          or dark. The dome is opaque from the outside, of any color you choose,
          but it is transparent from the inside.
        </p>
      </>
    ),
    page: 'phb 255',
    range: 'Self',
    components: 'V, S, M',
    material: 'A small crystal bead.',
    ritual: true,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 3,
    school: 'Evocation',
    class: ['bard', 'ritual caster', 'wizard'],
  },
  {
    name: 'lesserRestoration',
    desc: (
      <>
        <p>
          Tocas a una criatura y finalizas o bien una enfermedad o una condición
          que le aflija. La condición puede ser cegado, ensordecido, paralizado
          o envenenado.
        </p>
      </>
    ),
    page: 'phb 255',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    domains: ['life'],
    oaths: 'Devotion',
  },
  {
    name: 'levitate',
    desc: (
      <>
        <p>
          Una criatura u objeto a tu elección que puedas ver dentro del alcance
          se eleva verticalmente, hasta 20 pies (4 casillas, 6 m), y permanece
          suspendido mientras dure el conjuro.
        </p>
        <p>
          El conjuro puede hacer levitar a un objetivo que pese hasta 500 libras
          (225 kg). Una criatura no voluntaria que supere una tirada de
          salvación de Constitución no es afectada por el conjuro.
        </p>
        <p>
          El objetivo solo se puede mover si es empujado contra o se agarra a
          una objeto o superficie fija a su alcance (como un muro o un techo),
          lo que le permite moverse como si estuviera trepando. Puedes cambiar
          la altitud del objetivo hasta 20 pies (4 casillas, 6 m) arriba o abajo
          en tu turno. Si eres el objetivo, puedes moverte hacia arriba o abajo
          como parte de tu movimiento. De otro modo, puedes utilizar tu acción
          para mover al objetivo, que debe permanecer dentro del alcance del
          conjuro.
        </p>
        <p>
          Cuando finaliza el conjuro, el objetivo flota suavemente hasta el
          suelo si aún sigue en el aire.
        </p>
      </>
    ),
    page: 'phb 255',
    range: '60 feet',
    components: 'V, S, M',
    material:
      'Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'light',
    desc: (
      <>
        <p>
          Tocas un objeto de no más de 10 pies en cualquier dimensión. Hasta que
          el conjuro termine, el objeto emite luz brillante en un radio de 20
          pies y luz tenue en otros 20 pies adicionales. La luz puede ser del
          color que quieras. Cubrir completamente el objeto con algo opaco
          bloquea la luz. El conjuro termina si lo lanzas otra vez o si lo
          disipas como acción.
        </p>
        <p>
          Si eliges como objetivo a un objeto que una criatura hostil lleva
          puesto o transporta, dicha criatura debe superar una tirada de
          salvación de Destreza para evitar el conjuro.
        </p>
      </>
    ),
    page: 'phb 255',
    range: 'Touch',
    components: 'V, M',
    material: 'A firefly or phosphorescent moss.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['bard', 'cleric', 'sorcerer', 'wizard'],
  },
  {
    name: 'lightningArrow',
    desc: (
      <>
        <p>
          The next time you make a ranged weapon attack during the spell’s
          duration, the weapon’s ammunition, or the weapon itself if it’s a
          thrown weapon, transforms into a bolt of lightning. Make the attack
          roll as normal. The target takes 4d8 lightning damage on a hit, or
          half as much damage on a miss, instead of the weapon’s normal damage.
        </p>
        <p>
          Whether you hit or miss, each creature within 10 feet of the target
          must make a dexterity saving throw. Each of these creatures takes 2d8
          lightning damage on a failed save, or half as much damage on a
          successful one.
        </p>
        <p>
          The piece of ammunition or weapon then returns to its normal form.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the damage for both effects of the spell increases by 1d8 for each
          slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 255',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 3,
    school: 'Transmutation',
    class: ['ranger'],
  },
  {
    name: 'lightningBolt',
    desc: (
      <>
        <p>
          A stroke of lightning forming a line 100 feet long and 5 feet wide
          blasts out from you in a direction you choose. Each creature in the
          line must make a dexterity saving throw. A creature takes 8d6
          lightning damage on a failed save, or half as much damage on a
          successful one.
        </p>
        <p>
          The lightning ignites flammable objects in the area that aren’t being
          worn or carried.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the damage increases by 1d6 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 255',
    range: 'Self',
    components: 'V, S, M',
    material: 'A bit of fur and a rod of amber, crystal, or glass.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['mountain'],
    },
    circles: ['mountain'],
  },
  {
    name: 'locateAnimalsOrPlants',
    desc: (
      <>
        <p>
          Describe o nombra un tipo específico de bestia o planta.
          Concentrándote en la voz de la naturaleza de tus alrededores,
          presientes la dirección y distancia a la criatura o planta de ese tipo
          más cercana a menos de 5 millas (8 km), si hay alguna presente.
        </p>
      </>
    ),
    page: 'phb 256',
    range: 'Self',
    components: 'V, S, M',
    material: 'A bit of fur from a bloodhound.',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['bard', 'druid', 'ranger', 'ritual caster'],
  },
  {
    name: 'locateCreature',
    desc: (
      <>
        <p>
          Describe or name a creature that is familiar to you. You sense the
          direction to the creature’s location, as long as that creature is
          within 1,000 feet of you. If the creature is moving, you know the
          direction of its movement.
        </p>
        <p>
          The spell can locate a specific creature known to you, or the nearest
          creature of a specific kind (such as a human or a unicorn), so long as
          you have seen such a creature up close—within 30 feet—at least once.
          If the creature you described or named is in a different form, such as
          being under the effects of a polymorph spell, this spell doesn’t
          locate the creature.
        </p>
        <p>
          This spell can’t locate a creature if running water at least 10 feet
          wide blocks a direct path between you and the creature.
        </p>
      </>
    ),
    page: 'phb 256',
    range: 'Self',
    components: 'V, S, M',
    material: 'A bit of fur from a bloodhound.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Divination',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'],
    circles: ['swamp'],
  },
  {
    name: 'locateObject',
    desc: (
      <>
        <p>
          Describe o nombra un objeto que te sea familiar. Presientes la
          dirección a la ubicación del objeto, siempre que el objeto esté a
          menos de 1.000 pies (300 m) de ti. Si el objeto está en movimiento,
          conoces la dirección de su movimiento.
        </p>
        <p>
          El conjuro puede encontrar objetos específicos que conoces, siempre
          que lo hayas visto de cerca, a menos de 30 pies (6 casillas, 9 m), al
          menos una vez. Alternativamente, el conjuro puede localizar el objeto
          más cercano de un determinado tipo, como cierta clase de ropa,
          joyería, mobiliario, herramienta o arma.
        </p>
        <p>
          El conjuro no puede encontrar a un objeto si cualquier grosor de
          plomo, incluso una hoja delgada, bloquea el camino directo entre ti y
          el objeto.
        </p>
      </>
    ),
    page: 'phb 256',
    range: 'Self',
    components: 'V, S, M',
    material: 'A forked twig.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'],
  },
  {
    name: 'longstrider',
    desc: (
      <>
        <p>
          Tocas a una criatura. La velocidad de la criatura se incrementa en 10
          pies (2 casillas, 3 m) hasta que el conjuro finalice.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo con un espacio de conjuros de nivel 2 o
          superior, puedes afectar una criatura adicional por cada nivel de
          espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 256',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A pinch of dirt.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Transmutation',
    class: ['bard', 'druid', 'ranger', 'wizard'],
  },
  {
    name: 'mageArmor',
    desc: (
      <>
        <p>
          Tocas a una criatura voluntaria, que no esté portando una armadura, y
          una fuerza mágica protectora la rodea hasta el fin de la duración del
          conjuro. La CA base del objetivo se vuelve 13 + su modificador de
          Destreza. El conjuro finaliza si el receptor se pone una armadura o si
          tú cancelas el conjuro como una acción.
        </p>
      </>
    ),
    page: 'phb 256',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A piece of cured leather.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Abjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'mageHand',
    desc: (
      <>
        <p>
          Una mano espectral aparece flotando en un punto que elijas dentro del
          alcance. La mano dura mientras lo haga el conjuro o hasta que la
          disipes como acción. La mano se desvanece si está a más de 30 pies de
          ti o si vuelves a lanzar este conjuro.
        </p>
        <p>
          Puedes usar tu acción para controlar la mano. Puedes usar la mano para
          manipular un objeto, abrir una puerta o un recipiente cerrado, guardar
          o sacar un objeto de un recipiente abierto o verter el contenido de un
          vial. Puedes mover la mano hasta 30 pies cada vez que la usas.
        </p>
        <p>
          La mano no puede atacar, activar objetos mágicos ni transportar más de
          10 libras.
        </p>
      </>
    ),
    page: 'phb 256',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Conjuration',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'magicCircle',
    desc: (
      <>
        <p>
          Choose one or more of the following types of creatures: celestials,
          elementals, fey, fiends, or undead. The circle affects a creature of
          the chosen type in the following ways:
        </p>
        <p>
          - The creature can’t willingly enter the cylinder by nonmagical means.
          If the creature tries to use teleportation or interplanar travel to do
          so, it must first succeed on a charisma saving throw.
        </p>
        <p>
          - The creature has disadvantage on attack rolls against targets within
          the cylinder.
        </p>
        <p>
          - Targets within the cylinder can’t be charmed, frightened, or
          possessed by the creature.
        </p>
        <p>
          When you cast this spell, you can elect to cause its magic to operate
          in the reverse direction, preventing a creature of the specified type
          from leaving the cylinder and protecting targets outside it.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the duration increases by 1 hour for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 256',
    range: '10 feet',
    components: 'V, S, M',
    material:
      'Holy water or powdered silver and iron worth at least 100 gp, which the spell consumes.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 minute',
    level: 3,
    school: 'Abjuration',
    class: ['cleric', 'paladin', 'warlock', 'wizard'],
  },
  {
    name: 'magicJar',
    desc: (
      <>
        <p>
          Your body falls into a catatonic state as your soul leaves it and
          enters the container you used for the spell's material component.
          While your soul inhabits the container, you are aware of your
          surroundings as if you were in the container's space. You can't move
          or use reactions. The only action you can take is to project your soul
          up to 100 feet out of the container, either returning to your living
          body (and ending the spell) or attempting to possess a humanoids body.
        </p>
        <p>
          You can attempt to possess any humanoid within 100 feet of you that
          you can see (creatures warded by a protection from evil and good or
          magic circle spell can't be possessed). The target must make a
          charisma saving throw. On a failure, your soul moves into the target's
          body, and the target's soul becomes trapped in the container. On a
          success, the target resists your efforts to possess it, and you can't
          attempt to possess it again for 24 hours.
        </p>
        <p>
          Once you possess a creature's body, you control it. Your game
          statistics are replaced by the statistics of the creature, though you
          retain your alignment and your Intelligence, Wisdom, and Charisma
          scores. You retain the benefit of your own class features. If the
          target has any class levels, you can't use any of its class features.
        </p>
        <p>
          Meanwhile, the possessed creature's soul can perceive from the
          container using its own senses, but it can't move or take actions at
          all.
        </p>
        <p>
          While possessing a body, you can use your action to return from the
          host body to the container if it is within 100 feet of you, returning
          the host creature's soul to its body. If the host body dies while
          you're in it, the creature dies, and you must make a charisma saving
          throw against your own spellcasting DC. On a success, you return to
          the container if it is within 100 feet of you. Otherwise, you die.
        </p>
        <p>
          If the container is destroyed or the spell ends, your soul immediately
          returns to your body. If your body is more than 100 feet away from you
          or if your body is dead when you attempt to return to it, you die. If
          another creature's soul is in the container when it is destroyed, the
          creature's soul returns to its body if the body is alive and within
          100 feet. Otherwise, that creature dies.
        </p>
        <p>When the spell ends, the container is destroyed.</p>
      </>
    ),
    page: 'phb 257',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A gem, crystal, reliquary, or some other ornamental container worth at least 500 gp.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 6,
    school: 'Necromancy',
    class: ['wizard'],
  },
  {
    name: 'magicMissile',
    desc: (
      <>
        <p>
          Creas tres dardos brillantes de fuerza mágica. Cada dardo impacta a
          una criatura de tu elección que puedas ver dentro del alcance. Un
          dardo inflige 1d4 + 1 puntos de daño por fuerza a su objetivo. Todos
          los dardos impactan a la vez, y los puedes dirigir para que impacten a
          una criatura o a varias.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el conjuro crea un dardo más por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 257',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'magicMouth',
    desc: (
      <>
        <p>
          Implantas un mensaje en un objeto dentro del alcance, un mensaje que
          es pronunciado cuando se da una condición desencadenante. Elige un
          objeto que puedas ver y que no esté siendo sujetado o transportado por
          otra criatura. Di entonces el mensaje, que deben ser 25 palabras o
          menos, pero que puede ser transmitido a lo largo de 10 minutos.
          Finalmente, determina la circunstancia que desencadenará el conjuro
          para emitir el mensaje.
        </p>
        <p>
          Cuando dicha circunstancia ocurre, una boca mágica aparece en el
          objeto y recita el mensaje con tu voz y el mismo volumen con el que
          hablaste. Si el objeto que elegiste tiene una boca o algo que se
          parezca a una boca (por ejemplo, la boca de una estatua), la boca
          mágica aparece en ese lugar para que parezca que las palabras
          provengan de la boca del objeto. Cuando lanzas este conjuro, puedes
          hacer que finalice después de emitir el mensaje, o puede permanecer y
          repetir el mensaje siempre que el desencadenante ocurra
        </p>
        <p>
          La circunstancia desencadenante puede ser tan general o detallada como
          tú quieras, pero debe basarse en condiciones visuales o audibles que
          ocurran a 30 pies (6 casillas, 9 m) o menos del objeto. Por ejemplo,
          puedes dar instrucciones a la boca de hablar cuando cualquier criatura
          se mueva a 30 pies (6 casillas, 9 m) o menos del objeto o cuando una
          campana de plata tañe a 30 pies (6 casillas, 9 m) o menos de él.
        </p>
      </>
    ),
    page: 'phb 257',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A honeycomb and jade dust of at least 10 inches, the spell consumes.',
    ritual: true,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 2,
    school: 'Illusion',
    class: ['bard', 'ritual caster', 'wizard'],
  },
  {
    name: 'magicWeapon',
    desc: (
      <>
        <p>
          Tocas un arma no mágica. Hasta que finalice el conjuro, el arma se
          convierte en un arma mágica con un bonificador +1 a las tiradas de
          ataque y de daño.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 4 o
          superior, el bonificador se incrementa a +2. Cuando usas un espacio de
          conjuros de nivel 6 o superior, el bonificador se incrementa a +3.
        </p>
      </>
    ),
    page: 'phb 257',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 bonus action',
    level: 2,
    school: 'Transmutation',
    class: ['cleric', 'paladin', 'wizard'],
    archetype: {
      cleric: ['war'],
    },
    domains: ['war'],
  },
  {
    name: 'majorImage',
    desc: (
      <>
        <p>
          You create the image of an object, a creature, or some other visible
          phenomenon that is no larger than a 20-foot cube. The image appears at
          a spot that you can see within range and lasts for the duration. It
          seems completely real, including sounds, smells, and temperature
          appropriate to the thing depicted. You can’t create sufficient heat or
          cold to cause damage, a sound loud enough to deal thunder damage or
          deafen a creature, or a smell that might sicken a creature (like a
          troglodyte’s stench).
        </p>
        <p>
          As long as you are within range of the illusion, you can use your
          action to cause the image to move to any other spot within range. As
          the image changes location, you can alter its appearance so that its
          movements appear natural for the image. For example, if you create an
          image of a creature and move it, you can alter the image so that it
          appears to be walking. Similarly, you can cause the illusion to make
          different sounds at different times, even making it carry on a
          conversation, for example.
        </p>
        <p>
          Physical interaction with the image reveals it to be an illusion,
          because things can pass through it. A creature that uses its action to
          examine the image can determine that it is an illusion with a
          successful Intelligence (Investigation) check against your spell save
          DC. If a creature discerns the illusion for what it is, the creature
          can see through the image, and its other sensory qualities become
          faint to the creature.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the spell lasts until dispelled, without requiring your concentration.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A bit of fleece.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'massCureWounds',
    desc: (
      <>
        <p>
          A wave of healing energy washes out from a point of your choice within
          range. Choose up to six creatures in a 30-foot-radius sphere centered
          on that point. Each target regains hit points equal to 3d8 + your
          spellcasting ability modifier. This spell has no effect on undead or
          constructs.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 6th level or higher,
          the healing increases by 1d8 for each slot level above 5th.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Conjuration',
    class: ['bard', 'cleric', 'druid'],
    domains: ['life'],
  },
  {
    name: 'massHeal',
    desc: (
      <>
        <p>
          A flood of healing energy flows from you into injured creatures around
          you. You restore up to 700 hit points, divided as you choose among any
          number of creatures that you can see within range. Creatures healed by
          this spell are also cured of all diseases and any effect making them
          blinded or deafened. This spell has no effect on undead or constructs.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Conjuration',
    class: ['cleric'],
  },
  {
    name: 'massHealingWord',
    desc: (
      <>
        <p>
          As you call out words of restoration, up to six creatures of your
          choice that you can see within range regain hit points equal to 1d4 +
          your spellcasting ability modifier. This spell has no effect on undead
          or constructs.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the healing increases by 1d4 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 bonus action',
    level: 3,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'massSuggestion',
    desc: (
      <>
        <p>
          You suggest a course of activity (limited to a sentence or two) and
          magically influence up to twelve creatures of your choice that you can
          see within range and that can hear and understand you. Creatures that
          can’t be charmed are immune to this effect. The suggestion must be
          worded in such a manner as to make the course of action sound
          reasonable. Asking the creature to stab itself, throw itself onto a
          spear, immolate itself, or do some other obviously harmful act
          automatically negates the effect of the spell.
        </p>
        <p>
          Each target must make a wisdom saving throw. On a failed save, it
          pursues the course of action you described to the best of its ability.
          The suggested course of action can continue for the entire duration.
          If the suggested activity can be completed in a shorter time, the
          spell ends when the subject finishes what it was asked to do.
        </p>
        <p>
          You can also specify conditions that will trigger a special activity
          during the duration. For example, you might suggest that a group of
          soldiers give all their money to the first beggar they meet. If the
          condition isn’t met before the spell ends, the activity isn’t
          performed.
        </p>
        <p>
          If you or any of your companions damage a creature affected by this
          spell, the spell ends for that creature.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a 7th-level spell slot, the duration is
          10 days. When you use an 8th-level spell slot, the duration is 30
          days. When you use a 9th-level spell slot, the duration is a year and
          a day.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '60 feet',
    components: 'V, M',
    material:
      'A snake’s tongue and either a bit of honeycomb or a drop of sweet oil.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'maze',
    desc: (
      <>
        <p>
          You banish a creature that you can see within range into a
          labyrinthine demiplane. The target remains there for the duration or
          until it escapes the maze.
        </p>
        <p>
          The target can use its action to attempt to escape. When it does so,
          it makes a DC 20 Intelligence check. If it succeeds, it escapes, and
          the spell ends (a minotaur or goristro demon automatically succeeds).
        </p>
        <p>
          When the spell ends, the target reappears in the space it left or, if
          that space is occupied, in the nearest unoccupied space.
        </p>
      </>
    ),
    page: 'phb 258',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 8,
    school: 'Conjuration',
    class: ['wizard'],
  },
  {
    name: 'meldIntoStone',
    desc: (
      <>
        <p>
          You step into a stone object or surface large enough to fully contain
          your body, melding yourself and all the equipment you carry with the
          stone for the duration. Using your movement, you step into the stone
          at a point you can touch. Nothing of your presence remains visible or
          otherwise detectable by nonmagical senses.
        </p>
        <p>
          While merged with the stone, you can’t see what occurs outside it, and
          any Wisdom (Perception) checks you make to hear sounds outside it are
          made with disadvantage. You remain aware of the passage of time and
          can cast spells on yourself while merged in the stone. You can use
          your movement to leave the stone where you entered it, which ends the
          spell. You otherwise can’t move.
        </p>
        <p>
          Minor physical damage to the stone doesn’t harm you, but its partial
          destruction or a change in its shape (to the extent that you no longer
          fit within it) expels you and deals 6d6 bludgeoning damage to you. The
          stone’s complete destruction (or transmutation into a different
          substance) expels you and deals 50 bludgeoning damage to you. If
          expelled, you fall prone in an unoccupied space closest to where you
          first entered.
        </p>
      </>
    ),
    page: 'phb 259',
    range: 'Touch',
    components: 'V, S',
    ritual: true,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'ritual caster'],
    archetype: {
      druid: ['mountain'],
    },
    circles: ['mountain'],
  },
  {
    name: "melf'sAcidArrow",
    desc: (
      <>
        <p>
          Una reluciente flecha verde sale disparada hacia un objetivo dentro
          del alcance y estalla en un estallido de ácido. Con un impacto, el
          objetivo sufre 4d4 puntos de daño por ácido inmediatamente y 2d4
          puntos de daño por ácido al final de su siguiente turno. Con un fallo,
          la flecha salpica al objetivo de ácido por la mitad del daño inicial y
          ningún daño al final de su siguiente turno.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño (tanto el inicial como el posterior) se incrementa
          en 1d4 por cada nivel de espacio de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 259',
    range: '90 feet',
    components: 'V, S, M',
    material: 'Powdered rhubarb leaf and an adder’s stomach.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['druid', 'wizard'],
    archetype: {
      druid: ['swamp'],
    },
    circles: ['swamp'],
  },
  {
    name: 'mending',
    desc: (
      <>
        <p>
          Este conjuro repara una única rotura o rasgadura de un objeto que
          tocas, como una malla metálica rota, las dos mitades de una llave, una
          capa rasgada o una bota de vino que gotea. Mientras la rotura o
          rasgadura no sea mayor de 1 pie en cualquier dimensión, la remiendas y
          no dejas ningún rastro del daño anterior.
        </p>
        <p>
          Este conjuro puede reparar físicamente un objeto mágico o un
          constructo, pero no puede restaurar su magia.
        </p>
      </>
    ),
    page: 'phb 259',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Two lodestones.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 minute',
    level: 0,
    school: 'Transmutation',
    class: ['cleric', 'bard', 'druid', 'sorcerer', 'wizard'],
  },
  {
    name: 'message',
    desc: (
      <>
        <p>
          Apuntas con un dedo a una criatura dentro del alcance y susurras un
          mensaje. El objetivo (y sólo el objetivo) oye el mensaje y puede
          responder con un susurro que solo tú puedes oír.
        </p>
        <p>
          Puedes invocar este conjuro a través de objetos sólidos si el objetivo
          te es familiar y sabes que está detrás de la barrera. Silencio mágico,
          1 pie (30 cm) de piedra, 1 pulgada (2,54 cm) de metal común, una
          delgada capa de plomo o 3 pies (90 cm) de madera bloquean el hechizo.
          El conjuro no tiene que seguir una línea recta y puede viajar
          libremente doblando esquinas o a través de aberturas.
        </p>
      </>
    ),
    page: 'phb 259',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A short piece of copper wire.',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Transmutation',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'meteorSwarm',
    desc: (
      <>
        <p>
          Blazing orbs of fire plummet to the ground at four different points
          you can see within range. Each creature in a 40-foot-radius sphere
          centered on each point you choose must make a dexterity saving throw.
          The sphere spreads around corners. A creature takes 20d6 fire damage
          and 20d6 bludgeoning damage on a failed save, or half as much damage
          on a successful one. A creature in the area of more than one fiery
          burst is affected only once.
        </p>
        <p>
          The spell damages objects in the area and ignites flammable objects
          that aren’t being worn or carried.
        </p>
      </>
    ),
    page: 'phb 259',
    range: '1 mile',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'mindBlank',
    desc: (
      <>
        <p>
          Until the spell ends, one willing creature you touch is immune to
          psychic damage, any effect that would sense its emotions or read its
          thoughts, divination spells, and the charmed condition. The spell even
          foils wish spells and spells or effects of similar power used to
          affect the target’s mind or to gain information about the target.
        </p>
      </>
    ),
    page: 'phb 259',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Abjuration',
    class: ['bard', 'wizard'],
  },
  {
    name: 'minorIllusion',
    desc: (
      <>
        <p>
          Creas un sonido o una imagen de un objeto dentro del alcance que
          permanece mientras dura el conjuro. La ilusión también finaliza si la
          disipas como una acción o lanzas de nuevo este conjuro.
        </p>
        <p>
          Si creas un sonido, su volumen puede ir desde un susurro a un grito.
          Puede ser tu voz, la voz de cualquier otro, el rugido de un león, el
          batir de tambores, o cualquier otro sonido que elijas. El sonido
          continúa sin disminuir a lo largo de toda la duración del conjuro, o
          puedes crear sonidos discretos en momentos diferentes antes de que
          finalice el conjuro.
        </p>
        <p>
          Si creas la imagen de un objeto, como una silla, huellas en el barro,
          o un cofre pequeño, no debe ser mayor que un cubo de 5 pies (1
          casilla, 1,5 m) de lado. La imagen no puede crear sonido, luz, olor o
          cualquier otro efecto sensorial. La interacción física con la imagen
          revela que es una ilusión, porque las cosas la pueden atravesar.
        </p>
        <p>
          Si creas la imagen de un objeto, como una silla, huellas en el barro,
          o un cofre pequeño, no debe ser mayor que un cubo de 5 pies (1
          casilla, 1,5 m) de lado. La imagen no puede crear sonido, luz, olor o
          cualquier otro efecto sensorial. La interacción física con la imagen
          revela que es una ilusión, porque las cosas la pueden atravesar.
        </p>
      </>
    ),
    page: 'phb 260',
    range: '30 feet',
    components: 'S, M',
    material: 'A bit of fleece.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'mirageArcane',
    desc: (
      <>
        <p>
          You make terrain in an area up to 1 mile square look, sound, smell,
          and even feel like some other sort of terrain. The terrain’s general
          shape remains the same, however. Open fields or a road could be made
          to resemble a swamp, hill, crevasse, or some other difficult or
          impassable terrain. A pond can be made to seem like a grassy meadow, a
          precipice like a gentle slope, or a rock-strewn gully like a wide and
          smooth road.
        </p>
        <p>
          Similarly, you can alter the appearance of structures, or add them
          where none are present. The spell doesn’t disguise, conceal, or add
          creatures.
        </p>
        <p>
          The illusion includes audible, visual, tactile, and olfactory
          elements, so it can turn clear ground into difficult terrain (or vice
          versa) or otherwise impede movement through the area. Any piece of the
          illusory terrain (such as a rock or stick) that is removed from the
          spell’s area disappears immediately.
        </p>
        <p>
          Creatures with truesight can see through the illusion to the terrain’s
          true form; however, all other elements of the illusion remain, so
          while the creature is aware of the illusion’s presence, the creature
          can still physically interact with the illusion.
        </p>
      </>
    ),
    page: 'phb 260',
    range: 'Sight',
    components: 'V, S',
    ritual: false,
    duration: '10 days',
    concentration: false,
    casting_time: '10 minutes',
    level: 7,
    school: 'Illusion',
    class: ['bard', 'druid', 'wizard'],
  },
  {
    name: 'mirrorImage',
    desc: (
      <>
        <p>
          Tres duplicados ilusorios de ti mismo aparecen en tu espacio. Hasta
          que el conjuro finalice, las copias se mueven contigo e imitan tus
          acciones, intercambiando su posición de manera que resulta imposible
          saber qué imagen es real. Puedes usar tu acción para disipar las
          copias ilusorias.
        </p>
        <p>
          Cada vez que una criatura te elija como objetivo de un ataque mientras
          dure el conjuro, lanza un d20 para determinar si el ataque tiene por
          objetivo a uno de tus dobles en vez de a ti.
        </p>
        <p>
          Si tienes tres copias, debes sacar un 6 o más para cambiar el objetivo
          del ataque a un doble. Con dos copias, debes sacar un 8 o más. Con una
          copia, debes sacar un 11 o más.
        </p>
        <p>
          La CA de las copias es 10 + tu modificador de Destreza. Si un ataque
          impacta a un doble, el doble es destruido. Un doble sólo puede ser
          destruido por un ataque que le impacte. Ignora todo el resto de daño y
          efectos. El conjuro finaliza cuando las tres copias son destruidas.
        </p>
        <p>
          Una criatura no se ve afectada por el conjuro si no puede ver, si
          depende de otro sentido distinto a la vista, como la vista ciega, o si
          puede percibir las ilusiones como falsas, como con visión verdadera.
        </p>
      </>
    ),
    page: 'phb 260',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['trickery'],
      druid: ['coast'],
    },
    domains: ['trickery'],
    circles: ['coast'],
  },
  {
    name: 'mislead',
    desc: (
      <>
        <p>
          You become invisible at the same time that an illusory double of you
          appears where you are standing. The double lasts for the duration, but
          the invisibility ends if you attack or cast a spell.
        </p>
        <p>
          You can use your action to move your illusory double up to twice your
          speed and make it gesture, speak, and behave in whatever way you
          choose.
        </p>
        <p>
          You can see through its eyes and hear through its ears as if you were
          located where it is. On each of your turns as a bonus action, you can
          switch from using its senses to using your own, or back again. While
          you are using its senses, you are blinded and deafened in regard to
          your own surroundings.
        </p>
      </>
    ),
    page: 'phb 260',
    range: 'Self',
    components: 'S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Illusion',
    class: ['bard', 'wizard'],
  },
  {
    name: 'mistyStep',
    desc: (
      <>
        <p>
          Rodeado brevemente por una bruma plateada, te teleportas a un máximo
          de 30 pies (6 casillas, 9 m) hasta un espacio desocupado que puedas
          ver.
        </p>
      </>
    ),
    page: 'phb 260',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 bonus action',
    level: 2,
    school: 'Conjuration',
    class: ['druid', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['coast'],
      paladin: ['ancients', 'vengeance'],
    },
    circles: ['coast'],
    oaths: 'Ancients, Vengeance',
  },
  {
    name: 'modifyMemory',
    desc: (
      <>
        <p>
          You attempt to reshape another creature’s memories. One creature that
          you can see must make a wisdom saving throw. If you are fighting the
          creature, it has advantage on the saving throw. On a failed save, the
          target becomes charmed by you for the duration. The charmed target is
          incapacitated and unaware of its surroundings, though it can still
          hear you. If it takes any damage or is targeted by another spell, this
          spell ends, and none of the target’s memories are modified.
        </p>
        <p>
          While this charm lasts, you can affect the target’s memory of an event
          that it experienced within the last 24 hours and that lasted no more
          than 10 minutes. You can permanently eliminate all memory of the
          event, allow the target to recall the event with perfect clarity and
          exacting detail, change its memory of the details of the event, or
          create a memory of some other event.
        </p>
        <p>
          You must speak to the target to describe how its memories are
          affected, and it must be able to understand your language for the
          modified memories to take root. Its mind fills in any gaps in the
          details of your description. If the spell ends before you have
          finished describing the modified memories, the creature’s memory isn’t
          altered. Otherwise, the modified memories take hold when the spell
          ends.
        </p>
        <p>
          A modified memory doesn’t necessarily affect how a creature behaves,
          particularly if the memory contradicts the creature’s natural
          inclinations, alignment, or beliefs. An illogical modified memory,
          such as implanting a memory of how much the creature enjoyed dousing
          itself in acid, is dismissed, perhaps as a bad dream. The DM might
          deem a modified memory too nonsensical to affect a creature in a
          significant manner.
        </p>
        <p>
          A remove curse or greater restoration spell cast on the target
          restores the creature’s true memory.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          If you cast this spell using a spell slot of 6th level or higher, you
          can alter the target’s memories of an event that took place up to 7
          days ago (6th level), 30 days ago (7th level), 1 year ago (8th level),
          or any time in the creature’s past (9th level).
        </p>
      </>
    ),
    page: 'phb 261',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'wizard'],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
  },
  {
    name: 'moonbeam',
    desc: (
      <>
        <p>
          Un rayo plateado de pálida luz alumbra en un cilindro de 5 pies (1
          casilla, 1,5 m) de radio y 40 pies (8 casillas, 12 m) de alto centrado
          en un punto dentro del alcance. Mientras dure el conjuro, luz tenue
          llena el cilindro.
        </p>
        <p>
          Cuando una criatura entra en el área de efecto por primera vez en un
          turno o empieza su turno en ella, queda envuelta en llamas fantasmales
          que causan un dolor abrasador, y debe realizar una tirada de salvación
          de Constitución. Sufre 2d10 puntos de daño radiante con una salvación
          fallida, o la mitad de dicho daño con una salvación con éxito.
        </p>
        <p>
          Un cambiaformas realiza su tirada de salvación con desventaja. Si
          falla, también vuelve a su forma original de forma instantánea y no
          puede asumir ninguna forma diferente hasta que abandone la luz del
          conjuro.
        </p>
        <p>
          En cada uno de tus turnos después de haber lanzado el conjuro, puedes
          usar una acción para mover el rayo 60 pies (12 casillas, 18 m) en
          cualquier dirección.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño se incrementa en 1d10 por cada nivel de espacio de
          conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 261',
    range: '120 feet',
    components: 'V, S, M',
    material:
      'Several seeds of any moonseed plant and a piece of opalescent feldspar.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['druid', 'paladin'],
    archetype: {
      paladin: ['ancients'],
    },
    oaths: 'Ancients',
  },
  {
    name: "mordenkainen'sFaithfulHound",
    desc: (
      <>
        <p>
          You create a sword-shaped plane of force that hovers within range. It
          lasts for the duration.
        </p>
        <p>
          When the sword appears, you make a melee spell attack against a target
          of your choice within 5 feet of the sword. On a hit, the target takes
          3d10 force damage. Until the spell ends, you can use a bonus action on
          each of your turns to move the sword up to 20 feet to a spot you can
          see and repeat this attack against the same target or a different one.
        </p>
      </>
    ),
    page: 'phb 261',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A miniature platinum sword with a grip and pommel of copper and zinc, worth 250gp.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Conjuration',
    class: ['wizard'],
  },
  {
    name: "mordenkainen'sMagnificentMansion",
    desc: (
      <>
        <p>
          You conjure an extradimensional dwelling in range that lasts for the
          duration. You choose where its one entrance is located. The entrance
          shimmers faintly and is 5 feet wide and 10 feet tall. You and any
          creature you designate when you cast the spell can enter the
          extradimensional dwelling as long as the portal remains open. You can
          open or close the portal if you are within 30 feet of it. While
          closed, the portal is invisible.
        </p>
        <p>
          Beyond the portal is a magnificent foyer with numerous chambers
          beyond. The atmosphere is clean, fresh, and warm.
        </p>
        <p>
          You can create any floor plan you like, but the space can’t exceed 50
          cubes, each cube being 10 feet on each side. The place is furnished
          and decorated as you choose. It contains sufficient food to serve a
          nine course banquet for up to 100 people. A staff of 100
          near-transparent servants attends all who enter. You decide the visual
          appearance of these servants and their attire. They are completely
          obedient to your orders. Each servant can perform any task a normal
          human servant could perform, but they can’t attack or take any action
          that would directly harm another creature. Thus the servants can fetch
          things, clean, mend, fold clothes, light fires, serve food, pour wine,
          and so on. The servants can go anywhere in the mansion but can’t leave
          it. Furnishings and other objects created by this spell dissipate into
          smoke if removed from the mansion. When the spell ends, any creatures
          inside the extradimensional space are expelled into the open spaces
          nearest to the entrance.
        </p>
      </>
    ),
    page: 'phb 261',
    range: '300 feet',
    components: 'V, S, M',
    material:
      'A miniature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon, each item worth at least 5 gp.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 7,
    school: 'Conjuration',
    class: ['bard', 'wizard'],
  },
  {
    name: "mordenkainen'sPrivateSanctum",
    desc: (
      <>
        <p>
          You make an area within range magically secure. The area is a cube
          that can be as small as 5 feet to as large as 100 feet on each side.
          The spell lasts for the duration or until you use an action to dismiss
          it.
        </p>
        <p>
          until you use an action to dismiss it. When you cast the spell, you
          decide what sort of security the spell provides, choosing any or all
          of the following properties:
        </p>
        <p>
          - Sound can't pass through the barrier at the edge of the warded area.
        </p>
        <p>
          - The barrier of the warded area appears dark and foggy, preventing
          vision (including darkvision) through it.
        </p>
        <p>
          - Sensors created by divination spells can’t appear inside the
          protected area or pass through the barrier at its perimeter.
        </p>
        <p>- Creatures in the area can’t be targeted by divination spells.</p>
        <p>- Nothing can teleport into or out of the warded area.</p>
        <p>- Planar travel is blocked within the warded area.</p>
        <p>
          Casting this spell on the same spot every day for a year makes this
          effect permanent.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th level or higher,
          you can increase the size of the cube by 100 feet for each slot level
          beyond 4th. Thus you could protect a cube that can be up to 200 feet
          on one side by using a spell slot of 5th level.
        </p>
      </>
    ),
    page: 'phb 262',
    range: '120 feet',
    components: 'V, S, M',
    material:
      'A thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '10 minutes',
    level: 4,
    school: 'Abjuration',
    class: ['wizard'],
  },
  {
    name: "mordenkainen'sSword",
    desc: (
      <>
        <p>
          You create a sword-shaped plane of force that hovers within range. It
          lasts for the duration.
        </p>
        <p>
          When the sword appears, you make a melee spell attack against a target
          of your choice within 5 feet of the sword. On a hit, the target takes
          3d10 force damage. Until the spell ends, you can use a bonus action on
          each of your turns to move the sword up to 20 feet to a spot you can
          see and repeat this attack against the same target or a different one.
        </p>
      </>
    ),
    page: 'phb 262',
    range: '60 feet',
    components: 'V, S, M',
    material:
      'A miniature platinum sword with a grip and pommel of copper and zinc, worth 250 gp.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 7,
    school: 'Evocation',
    class: ['bard', 'wizard'],
  },
  {
    name: 'moveEarth',
    desc: (
      <>
        <p>
          Choose an area of terrain no larger than 40 feet on a side within
          range. You can reshape dirt, sand, or clay in the area in any manner
          you choose for the duration. You can raise or lower the area's
          elevation, create or fill in a trench, erect or flatten a wall, or
          form a pillar. The extent of any such changes can't exceed half the
          area's largest dimension. So, if you affect a 40-foot square, you can
          create a pillar up to 20 feet high, raise or lower the square's
          elevation by up to 20 feet, dig a trench up to 20 feet deep, and so
          on. It takes 10 minutes for these changes to complete.
        </p>
        <p>
          At the end of every 10 minutes you spend concentrating on the spell,
          you can choose a new area of terrain to affect.
        </p>
        <p>
          Because the terrain's transformation occurs slowly, creatures in the
          area can't usually be trapped or injured by the ground's movement.
        </p>
        <p>
          This spell can't manipulate natural stone or stone construction. Rocks
          and structures shift to accommodate the new terrain. If the way you
          shape the terrain would make a structure unstable, it might collapse.
        </p>
        <p>
          Similarly, this spell doesn't directly affect plant growth. The moved
          earth carries any plants along with it.
        </p>
      </>
    ),
    page: 'phb 263',
    range: '120 feet',
    components: 'V, S, M',
    material:
      'An iron blade and a small bag containing a mixture of soils—clay, loam, and sand.',
    ritual: false,
    duration: 'Up to 2 hours',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Transmutation',
    class: ['druid', 'sorcerer', 'wizard'],
  },
  {
    name: 'nondetection',
    desc: (
      <>
        <p>
          For the duration, you hide a target that you touch from divination
          magic. The target can be a willing creature or a place or an object no
          larger than 10 feet in any dimension. The target can’t be targeted by
          any divination magic or perceived through magical scrying sensors.
        </p>
      </>
    ),
    page: 'phb 263',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A pinch of diamond dust worth 25 gp sprinkled over the target, which the spell consumes.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'ranger', 'wizard'],
    archetype: {
      cleric: ['knowledge'],
    },
    domains: ['knowledge'],
  },
  {
    name: "nystul'sMagicAura",
    desc: (
      <>
        <p>
          Colocas una ilusión en una criatura o en un objeto que toques para que
          los conjuros de adivinación revelen información falsa sobre él. El
          objetivo puede ser una criatura voluntaria o un objeto que no esté
          siendo sujetado o transportado por otra criatura.
        </p>
        <p>
          Cuando lanzas el conjuro elige uno o los dos efectos siguientes. El
          efecto permanece hasta que finalice el conjuro. Si lanzas este conjuro
          sobre la misma criatura u objeto cada día durante 30 días, colocando
          el mismo efecto en él cada vez, la ilusión permanece hasta que sea
          disipada.
        </p>
        <p>
          <b>Aura falsa.</b> Cambias la manera en que el objetivo se muestra
          ante conjuros y efectos mágicos, como detectar magia, que detectan
          auras mágicas. Puedes hacer que un objeto no mágico parezca mágico, un
          objeto mágico parezca no mágico, o cambiar el aura mágica del objeto
          de tal manera que parezca que pertenece a una escuela específica de
          magia que tu elijas. Cuando uses este efecto en un objeto puedes hacer
          que la falsa magia sea aparente para cualquier criatura que sujete el
          objeto.
        </p>
        <p>
          <b>Enmascarar.</b> Cambias la manera en que el objetivo se muestra
          ante conjuros y efectos mágicos que detectan el tipo de una criatura,
          como el rasgo de paladín, Sentido divino (Divine Sense) o el
          desencadenante del conjuro símbolo [symbol]. Eliges un tipo de
          criatura y otros conjuros y efectos mágicos tratan al objetivo como si
          fuera una criatura de ese tipo o de ese alineamiento.
        </p>
      </>
    ),
    page: 'phb 263',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A small square of silk.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['wizard'],
  },
  {
    name: "otiluke'sFreezingSphere",
    desc: (
      <>
        <p>
          A frigid globe of cold energy streaks from your fingertips to a point
          of your choice within range, where it explodes in a 60-foot-radius
          sphere. Each creature within the area must make a constitution saving
          throw. On a failed save, a creature takes 10d6 cold damage. On a
          successful save, it takes half as much damage.
        </p>
        <p>
          If the globe strikes a body of water or a liquid that is principally
          water (not including water-based creatures), it freezes the liquid to
          a depth of 6 inches over an area 30 feet square. This ice lasts for 1
          minute. Creatures that were swimming on the surface of frozen water
          are trapped in the ice. A trapped creature can use an action to make a
          Strength check against your spell save DC to break free.
        </p>
        <p>
          You can refrain from firing the globe after completing the spell, if
          you wish. A small globe about the size of a sling stone, cool to the
          touch, appears in your hand. At any time, you or a creature you give
          the globe to can throw the globe (to a range of 40 feet) or hurl it
          with a sling (to the sling’s normal range). It shatters on impact,
          with the same effect as the normal casting of the spell. You can also
          set the globe down without shattering it. After 1 minute, if the globe
          hasn’t already shattered, it explodes.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the damage increases by 1d6 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 263',
    range: '300 feet',
    components: 'V, S, M',
    material: 'A small crystal sphere.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: "otiluke'sResilientSphere",
    desc: (
      <>
        <p>
          A sphere of shimmering force encloses a creature or object of Large
          size or smaller within range. An unwilling creature must make a
          dexterity saving throw. On a failed save, the creature is enclosed for
          the duration.
        </p>
        <p>
          Nothing—not physical objects, energy, or other spell effects—can pass
          through the barrier, in or out, though a creature in the sphere can
          breathe there. The sphere is immune to all damage, and a creature or
          object inside can’t be damaged by attacks or effects originating from
          outside, nor can a creature inside the sphere damage anything outside
          it.
        </p>
        <p>
          The sphere is weightless and just large enough to contain the creature
          or object inside. An enclosed creature can use its action to push
          against the sphere’s walls and thus roll the sphere at up to half the
          creature’s speed. Similarly, the globe can be picked up and moved by
          other creatures.
        </p>
        <p>
          A disintegrate spell targeting the globe destroys it without harming
          anything inside it.
        </p>
      </>
    ),
    page: 'phb 264',
    range: '30 feet',
    components: 'V, S, M',
    material:
      'A hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: "otto'sIrresistibleDance",
    desc: (
      <>
        <p>
          Choose one creature that you can see within range. The target begins a
          comic dance in place: shuffling, tapping its feet, and capering for
          the duration. Creatures that can’t be charmed are immune to this
          spell.
        </p>
        <p>
          A dancing creature must use all its movement to dance without leaving
          its space and has disadvantage on dexterity saving throws and attack
          rolls. While the target is affected by this spell, other creatures
          have advantage on attack rolls against it. As an action, a dancing
          creature makes a wisdom saving throw to regain control of itself. On a
          successful save, the spell ends.
        </p>
      </>
    ),
    page: 'phb 264',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Enchantment',
    class: ['bard', 'wizard'],
  },
  {
    name: 'passWithoutTrace',
    desc: (
      <>
        <p>
          Un velo de sombras y silencio se irradia desde ti, enmascarándote a ti
          y a tus compañeros para no ser detectados. Mientras dure el conjuro,
          cada criatura que elijas hasta a 30 pies (6 casillas, 9 m) de ti
          (incluyéndote) tiene un bonificador de +10 a las pruebas de Destreza
          (Sigilo) y no pueden ser rastreadas excepto por medios mágicos. Una
          criatura que recibe este bonificador no deja huellas ni otros rastros
          a su paso.
        </p>
      </>
    ),
    page: 'phb 264',
    range: 'Self',
    components: 'V, S, M',
    material: 'Ashes from a burned leaf of mistletoe and a sprig of spruce.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
    circles: ['grassland'],
  },
  {
    name: 'passwall',
    desc: (
      <>
        <p>
          A passage appears at a point of your choice that you can see on a
          wooden, plaster, or stone surface (such as a wall, a ceiling, or a
          floor) within range, and lasts for the duration. You choose the
          opening’s dimensions: up to 5 feet wide, 8 feet tall, and 20 feet
          deep. The passage creates no instability in a structure surrounding
          it.
        </p>
        <p>
          When the opening disappears, any creatures or objects still in the
          passage created by the spell are safely ejected to an unoccupied space
          nearest to the surface on which you cast the spell.
        </p>
      </>
    ),
    page: 'phb 264',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A pinch of sesame seeds.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Transmutation',
    class: ['druid', 'wizard'],
    archetype: {
      druid: ['mountain'],
    },
    circles: ['mountain'],
  },
  {
    name: 'phantasmalForce',
    desc: (
      <>
        <p>
          Confeccionas una ilusión que arraiga en la mente de una criatura que
          puedas ver dentro del alcance. El objetivo debe realizar una tirada de
          salvación de Inteligencia. Con una salvación fallida, creas un objeto,
          criatura u otro fenómeno visible fantasmagórico de tu elección no
          mayor de un cubo de 10 pies (2 casillas, 3 m) que sólo es perceptible
          por el objetivo mientras dure el conjuro. Este hechizo no tiene efecto
          en muertos vivientes o constructos.
        </p>
        <p>
          La fantasmagoría incluye sonido, temperatura, y otros estímulos,
          evidentes sólo para la criatura también.
        </p>
        <p>
          El objetivo puede usar su acción para examinar la fantasmagoría con
          una prueba de Inteligencia (Investigación) contra la CD de tu
          salvación de conjuros. Si supera la prueba, el objetivo se percata de
          que la fantasmagoría es una ilusión y el conjuro finaliza.
        </p>
        <p>
          Mientras el objetivo está afectado por el conjuro, el objetivo trata a
          la fantasmagoría como si fuera real. El objetivo racionaliza cualquier
          respuesta ilógica derivada de tratar con la fantasmagoría. Por
          ejemplo, un objetivo tratando de caminar por un puente fantasmal que
          cubre un abismo cae una vez haya puesto un pie en el puente. Si el
          objetivo sobrevive a la caída, todavía piensa que el puente existe y
          encuentra alguna otra explicación para haber caído, le empujaron, se
          resbaló, o un fuerte viento lo puede haber tirado.
        </p>
        <p>
          Un objetivo afectado está tan convencido de la realidad de la
          fantasmagoría que incluso puede recibir daño de la ilusión. Una
          fantasmagoría creada para parecer una criatura puede atacar al
          objetivo. De manera similar, una fantasmagoría creada para aparecer
          como fuego, un charco de ácido o lava puede quemar al objetivo. Cada
          asalto en tu turno, la fantasmagoría puede causar 1d6 puntos de daño
          psíquico al objetivo si está en el área de la fantasmagoría o si está
          a 5 pies (1,5 m) de la misma, siempre y cuando la ilusión sea de una
          criatura o peligro que pueda causar daño de forma lógica, como
          atacando. El objetivo percibe el daño del tipo apropiado según la
          ilusión.
        </p>
      </>
    ),
    page: 'phb 264',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A bit of fleece.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['archfey', 'greatOldOne'],
    },
    patrons: ['archfey', 'greatOldOne'],
  },
  {
    name: 'phantasmalKiller',
    desc: (
      <>
        <p>
          You tap into the nightmares of a creature you can see within range and
          create an illusory manifestation of its deepest fears, visible only to
          that creature. The target must make a wisdom saving throw. On a failed
          save, the target becomes frightened for the duration. At the start of
          each of the target’s turns before the spell ends, the target must
          succeed on a wisdom saving throw or take 4 d10 psychic damage. On a
          successful save, the spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 5th level or higher,
          the damage increases by 1dlO for each slot level above 4th.
        </p>
      </>
    ),
    page: 'phb 265',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Illusion',
    class: ['wizard'],
  },
  {
    name: 'phantomSteed',
    desc: (
      <>
        <p>
          A Large quasi-real, horselike creature appears on the ground in an
          unoccupied space of your choice within range. You decide the
          creature’s appearance, but it is equipped with a saddle, bit, and
          bridle. Any of the equipment created by the spell vanishes in a puff
          of smoke if it is carried more than 10 feet away from the steed.
        </p>
        <p>
          For the duration, you or a creature you choose can ride the steed. The
          creature uses the statistics for a riding horse, except it has a speed
          of 100 feet and can travel 10 miles in an hour, or 13 miles at a fast
          pace. When the spell ends, the steed gradually fades, giving the rider
          1 minute to dismount. The spell ends if you use an action to dismiss
          it or if the steed takes any damage.
        </p>
      </>
    ),
    page: 'phb 265',
    range: '30 feet',
    components: 'V, S',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 minute',
    level: 3,
    school: 'Illusion',
    class: ['ritual caster', 'wizard'],
  },
  {
    name: 'planarAlly',
    desc: (
      <>
        <p>
          You beseech an otherworldly entity for aid. The being must be known to
          you: a god, a primordial, a demon prince, or some other being of
          cosmic power. That entity sends a celestial, an elemental, or a fiend
          loyal to it to aid you, making the creature appear in an unoccupied
          space within range. If you know a specific creature’s name, you can
          speak that name when you cast this spell to request that creature,
          though you might get a different creature anyway (DM’s choice).
        </p>
        <p>
          When the creature appears, it is under no compulsion to behave in any
          particular way. You can ask the creature to perform a service in
          exchange for payment, but it isn’t obliged to do so. The requested
          task could range from simple (fly us across the chasm, or help us
          fight a battle) to complex (spy on our enemies, or protect us during
          our foray into the dungeon). You must be able to communicate with the
          creature to bargain for its services.
        </p>
        <p>
          Payment can take a variety of forms. A celestial might require a
          sizable donation of gold or magic items to an allied temple, while a
          fiend might demand a living sacrifice or a gift of treasure. Some
          creatures might exchange their service for a quest undertaken by you.
        </p>
        <p>
          As a rule of thumb, a task that can be measured in minutes requires a
          payment worth 100 gp per minute. A task measured in hours requires
          1,000 gp per hour. And a task measured in days (up to 10 days)
          requires 10,000 gp per day. The DM can adjust these payments based on
          the circumstances under which you cast the spell. If the task is
          aligned with the creature’s ethos, the payment might be halved or even
          waived. Nonhazardous tasks typically require only half the suggested
          payment, while especially dangerous tasks might require a greater
          gift. Creatures rarely accept tasks that seem suicidal.
        </p>
        <p>
          After the creature completes the task, or when the agreed-upon
          duration of service expires, the creature returns to its home plane
          after reporting back to you, if appropriate to the task and if
          possible. If you are unable to agree on a price for the creature’s
          service, the creature immediately returns to its home plane.
        </p>
        <p>
          A creature enlisted to join your group counts as a member of it,
          receiving a full share of experience points awarded.
        </p>
      </>
    ),
    page: 'phb 265',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 6,
    school: 'Conjuration',
    class: ['cleric'],
  },
  {
    name: 'planarBinding',
    desc: (
      <>
        <p>
          With this spell, you attempt to bind a celestial, an elemental, a fey,
          or a fiend to your service. The creature must be within range for the
          entire casting of the spell. (Typically, the creature is first
          summoned into the center of an inverted magic circle in order to keep
          it trapped while this spell is cast.) At the completion of the
          casting, the target must make a charisma saving throw. On a failed
          save, it is bound to serve you for the duration. If the creature was
          summoned or created by another spell, that spell’s duration is
          extended to match the duration of this spell.
        </p>
        <p>
          A bound creature must follow your instructions to the best of its
          ability. You might command the creature to accompany you on an
          adventure, to guard a location, or to deliver a message. The creature
          obeys the letter of your instructions, but if the creature is hostile
          to you, it strives to twist your words to achieve its own objectives.
          If the creature carries out your instructions completely before the
          spell ends, it travels to you to report this fact if you are on the
          same plane of existence. If you are on a different plane of existence,
          it returns to the place where you bound it and remains there until the
          spell ends.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of a higher level, the
          duration increases to 10 days with a 6th-level slot, to 30 days with a
          7th-level slot, to 180 days with an 8th-level slot, and to a year and
          a day with a 9th-level spell slot.
        </p>
      </>
    ),
    page: 'phb 265',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A jewel worth at least 1,000 gp, which the spell consumes.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 hour',
    level: 5,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'druid', 'wizard'],
  },
  {
    name: 'planeShift',
    desc: (
      <>
        <p>
          You and up to eight willing creatures who link hands in a circle are
          transported to a different plane of existence. You can specify a
          target destination in general terms, such as the City of Brass on the
          Elemental Plane of Fire or the palace of Dispater on the second level
          of the Nine Hells, and you appear in or near that destination. If you
          are trying to reach the City of Brass, for example, you might arrive
          in its Street of Steel, before its Gate of Ashes, or looking at the
          city from across the Sea of Fire, at the DM’s discretion.
        </p>
        <p>
          Alternatively, if you know the sigil sequence of a teleportation
          circle on another plane of existence, this spell can take you to that
          circle. If the teleportation circle is too small to hold all the
          creatures you transported, they appear in the closest unoccupied
          spaces next to the circle.
        </p>
        <p>
          You can use this spell to banish an unwilling creature to another
          plane. Choose a creature within your reach and make a melee spell
          attack against it. On a hit, the creature must make a charisma saving
          throw. If the creature fails this save, it is transported to a random
          location on the plane of existence you specify. A creature so
          transported must find its own way back to your current plane of
          existence.
        </p>
      </>
    ),
    page: 'phb 266',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A forked, metal rod worth at least 250 gp, attuned to a particular plane of existence.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Conjuration',
    class: ['cleric', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'plantGrowth',
    desc: (
      <>
        <p>
          This spell channels vitality into plants within a specific area. There
          are two possible uses for the spell, granting either immediate or
          long-term benefits.
        </p>
        <p>
          If you cast this spell using 1 action, choose a point within range.
          All normal plants in a 100-foot radius centered on that point become
          thick and overgrown. A creature moving through the area must spend 4
          feet of movement for every 1 foot it moves.
        </p>
        <p>
          You can exclude one or more areas of any size within the spell’s area
          from being affected.
        </p>
        <p>
          If you cast this spell over 8 hours, you enrich the land. All plants
          in a half-mile radius centered on a point within range become enriched
          for 1 year. The plants yield twice the normal amount of food when
          harvested.
        </p>
      </>
    ),
    page: 'phb 266',
    range: '150 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'warlock'],
    archetype: {
      cleric: ['nature'],
      paladin: ['ancients'],
      warlock: ['archfey'],
    },
    domains: ['nature'],
    circles: ['forest'],
    oaths: 'Ancients',
    patrons: ['archfey'],
  },
  {
    name: 'poisonSpray',
    desc: (
      <>
        <p>
          Extiendes tu mano hacia una criatura que puedas ver dentro del alcance
          y proyectas un soplido de gas nocivo desde tu palma. La criatura debe
          superar una tirada de salvación de Constitución o sufrir 1d12 puntos
          de daño por veneno.
        </p>
        <p>
          El daño de este conjuro se incrementa en 1d12 cuando alcanzas el nivel
          5 (2d12), nivel 11 (3d12) y nivel 17 (4d12).
        </p>
      </>
    ),
    page: 'phb 266',
    range: '10 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Conjuration',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'polymorph',
    desc: (
      <>
        <p>
          This spell transforms a creature that you can see within range into a
          new form. An unwilling creature must make a wisdom saving throw to
          avoid the effect. A shapechanger automatically succeeds on this saving
          throw.
        </p>
        <p>
          The transformation lasts for the duration, or until the target drops
          to 0 hit points or dies. The new form can be any beast whose challenge
          rating is equal to or less than the target’s (or the target’s level,
          if it doesn't have a challenge rating). The target’s game statistics,
          including mental ability scores, are replaced by the statistics of the
          chosen beast. It retains its alignment and personality.
        </p>
        <p>
          The target assumes the hit points of its new form. When it reverts to
          its normal form, the creature returns to the number of hit points it
          had before it transformed. If it reverts as a result of dropping to 0
          hit points, any excess damage carries over to its normal form. As long
          as the excess damage doesn’t reduce the creature’s normal form to 0
          hit points, it isn’t knocked unconscious.
        </p>
        <p>
          The creature is limited in the actions it can perform by the nature of
          its new form, and it can’t speak, cast spells, or take any other
          action that requires hands or speech.
        </p>
        <p>
          The target’s gear melds into the new form. The creature can’t
          activate, use, wield, or otherwise benefit from any of its equipment.
        </p>
      </>
    ),
    page: 'phb 266',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A caterpillar cocoon.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Transmutation',
    class: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['trickery'],
    },
    domains: ['trickery'],
  },
  {
    name: 'powerWordHeal',
    desc: (
      <>
        <p>
          A wave of healing energy washes over the creature you touch. The
          target regains all its hit points. If the creature is charmed,
          frightened, paralyzed, or stunned, the condition ends. If the creature
          is prone, it can use its reaction to stand up. This spell has no
          effect on undead or constructs.
        </p>
      </>
    ),
    page: 'phb 266',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Evocation',
    class: ['bard'],
  },
  {
    name: 'powerWordKill',
    desc: (
      <>
        <p>
          You utter a word of power that can compel one creature you can see
          within range to die instantly. If the creature you choose has 100 hit
          points or fewer, it dies. Otherwise, the spell has no effect.
        </p>
      </>
    ),
    page: 'phb 266',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'powerWordStun',
    desc: (
      <>
        <p>
          You speak a word of power that can overwhelm the mind of one creature
          you can see within range, leaving it dumbfounded. If the target has
          150 hit points or fewer, it is stunned. Otherwise, the spell has no
          effect.
        </p>
        <p>
          The stunned target must make a constitution saving throw at the end of
          each of its turns. On a successful save, this stunning effect ends.
        </p>
      </>
    ),
    page: 'phb 267',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'prayerOfHealing',
    desc: (
      <>
        <p>
          Hasta seis criaturas de tu elección, que puedas ver dentro del
          alcance, recuperan cada una, Puntos de Golpe igual a 2d8 + tú
          modificador de característica para lanzamiento de conjuros. Este
          conjuro no tiene efecto en muertos vivientes ni constructos.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, la curación se incrementa en 1d8 por cada nivel de espacio
          de conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 267',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '10 minutes',
    level: 2,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'prestidigitation',
    desc: (
      <>
        <p>
          Este conjuro es un truco de magia menor que conjuradores novatos usan
          para practicar. Creas una de los siguientes efectos mágicos dentro del
          alcance:
        </p>
        <ul>
          <li>
            Creas al instante un efecto sensorial inofensivo, como una ducha de
            chispas, un soplo de viento, una débil nota musical, un olor
            extraño.
          </li>
          <li>
            Instantáneamente enciendes o apagas una vela, una antorcha o una
            pequeña fogata.
          </li>
          <li>
            Instantáneamente puedes limpiar o manchar un objeto no más grande
            que 1 pie (0,02 m3) cúbicos.
          </li>
          <li>
            Puedes helar, calentar o dar sabor hasta 1 pie (0,02 m3) cúbico de
            material inerte por 1 hora.
          </li>
          <li>
            Puedes colorear, hacer una pequeña marca o que un símbolo aparezca
            en un objeto o una superficie por 1 hora.
          </li>
          <li>
            Creas una baratija no mágica o una imagen ilusoria que pueda caber
            en tu mano y dura hasta el final de tu siguiente turno.
          </li>
        </ul>
        <p>
          Si lanzas este conjuro en múltiples ocasiones, puedes tener hasta tres
          efectos no instantáneos activos al mismo tiempo, y puedes cancelar un
          efecto como una acción.
        </p>
      </>
    ),
    page: 'phb 267',
    range: '10 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Transmutation',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'prismaticSpray',
    desc: (
      <>
        <p>
          Eight multicolored rays of light flash from your hand. Each ray is a
          different color and has a different power and purpose. Each creature
          in a 60-foot cone must make a dexterity saving throw. For each target,
          roll a d8 to determine which color ray affects it.
        </p>
        <p>
          <b>1. Red.</b> The target takes 10d6 fire damage on a failed save, or
          half as much damage on a successful one.
        </p>
        <p>
          <b>2. Orange.</b> The target takes 10d6 acid damage on a failed save,
          or half as much damage on a successful one.
        </p>
        <p>
          <b>3. Yellow.</b> The target takes 10d6 lightning damage on a failed
          save, or half as much damage on a successful one.
        </p>
        <p>
          <b>4. Green.</b> The target takes 10d6 poison damage on a failed save,
          or half as much damage on a successful one.
        </p>
        <p>
          <b>5. Blue.</b> The target takes 10d6 cold damage on a failed save, or
          half as much damage on a successful one.
        </p>
        <p>
          <b>6. Indigo.</b> On a failed save, the target is restrained. It must
          then make a constitution saving throw at the end of each of its turns.
          If it successfully saves three times, the spell ends. If it fails its
          save three times, it permanently turns to stone and is subjected to
          the petrified condition. The successes and failures don’t need to be
          consecutive; keep track of both until the target collects three of a
          kind.
        </p>
        <p>
          <b>7. Violet.</b> On a failed save, the target is blinded. It must
          then make a wisdom saving throw at the start of your next turn. A
          successful save ends the blindness. If it fails that save, the
          creature is transported to another plane of existence of the DM’s
          choosing and is no longer blinded. (Typically, a creature that is on a
          plane that isn’t its home plane is banished home, while other
          creatures are usually cast into the Astral or Ethereal planes.)
        </p>
        <p>
          <b>8. Special.</b> The target is struck by two rays. Roll twice more,
          rerolling any 8.
        </p>
      </>
    ),
    page: 'phb 267',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'prismaticWall',
    desc: (
      <>
        <p>
          A shimmering, multicolored plane of light forms a vertical opaque
          wall—up to 90 feet long, 30 feet high, and 1 inch thick—centered on a
          point you can see within range. Alternatively, you can shape the wall
          into a sphere up to 30 feet in diameter centered on a point you choose
          within range. The wall remains in place for the duration. If you
          position the wall so that it passes through a space occupied by a
          creature, the spell fails, and your action and the spell slot are
          wasted.
        </p>
        <p>
          The wall sheds bright light out to a range of 100 feet and dim light
          for an additional 100 feet. You and creatures you designate at the
          time you cast the spell can pass through and remain near the wall
          without harm. If another creature that can see the wall moves to
          within 20 feet of it or starts its turn there, the creature must
          succeed on a constitution saving throw or become blinded for 1 minute.
        </p>
        <p>
          The wall consists of seven layers, each with a different color. When a
          creature attempts to reach into or pass through the wall, it does so
          one layer at a time through all the wall’s layers. As it passes or
          reaches through each layer, the creature must make a dexterity saving
          throw or be affected by that layer’s properties as described below.
        </p>
        <p>
          The wall can be destroyed, also one layer at a time, in order from red
          to violet, by means specific to each layer. Once a layer is destroyed,
          it remains so for the duration of the spell. A rod of cancellation
          destroys a prismatic wall, but an antimagic field has no effect on it.
        </p>
        <p>
          <b>1. Red.</b> The creature takes 10d6 fire damage on a failed save,
          or half as much damage on a successful one. While this layer is in
          place, nonmagical ranged attacks can’t pass through the wall. The
          layer can be destroyed by dealing at least 25 cold damage to it.
        </p>
        <p>
          <b>2. Orange.</b> The creature takes 10d6 acid damage on a failed
          save, or half as much damage on a successful one. While this layer is
          in place, magical ranged attacks can’t pass through the wall. The
          layer is destroyed by a strong wind.
        </p>
        <p>
          <b>3. Yellow.</b> The creature takes 10d6 lightning damage on a failed
          save, or half as much damage on a successful one. This layer can be
          destroyed by dealing at least 60 force damage to it.
        </p>
        <p>
          <b>4. Green.</b> The creature takes 10d6 poison damage on a failed
          save, or half as much damage on a successful one. A passwall spell, or
          another spell of equal or greater level that can open a portal on a
          solid surface, destroys this layer.
        </p>
        <p>
          <b>5. Blue.</b> The creature takes 10d6 cold damage on a failed save,
          or half as much damage on a successful one. This layer can be
          destroyed by dealing at least 25 fire damage to it.
        </p>
        <p>
          <b>6. Indigo.</b> On a failed save, the creature is restrained. It
          must then make a constitution saving throw at the end of each of its
          turns. If it successfully saves three times, the spell ends. If it
          fails its save three times, it permanently turns to stone and is
          subjected to the petrified condition. The successes and failures don’t
          need to be consecutive; keep track of both until the creature collects
          three of a kind.
        </p>
        <p>
          While this layer is in place, spells can’t be cast through the wall.
          The layer is destroyed by bright light shed by a daylight spell or a
          similar spell of equal or higher level.
        </p>
        <p>
          <b>7. Violet.</b> On a failed save, the creature is blinded. It must
          then make a wisdom saving throw at the start of your next turn. A
          successful save ends the blindness. If it fails that save, the
          creature is transported to another plane of the DM’s choosing and is
          no longer blinded. (Typically, a creature that is on a plane that
          isn’t its home plane is banished home, while other creatures are
          usually cast into the Astral or Ethereal planes.) This layer is
          destroyed by a dispel magic spell or a similar spell of equal or
          higher level that can end spells and magical effects.
        </p>
      </>
    ),
    page: 'phb 267',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Abjuration',
    class: ['wizard'],
  },
  {
    name: 'produceFlame',
    desc: (
      <>
        <p>
          Una fluctuante llama aparece en tu mano. La llama permanece allí
          mientras dure el conjuro y no te hiere a ti ni a tu equipo. La llama
          despide luz brillante en un radio de 10 pies (2 casillas, 3 m) y luz
          tenue en 10 pies (2 casillas, 3 m) adicionales. El conjuro finaliza si
          tú lo cancelas como una acción o si lo lanzas de nuevo.
        </p>
        <p>
          También puedes atacar con la llama, pero al hacerlo finaliza el
          conjuro. Cuando lanzas este conjuro, o como una acción en un turno
          posterior, puedes lanzar la llama a una criatura dentro de 30 pies (6
          casillas, 9 m) de ti. Realiza una tirada de ataque de conjuro a
          distancia. Con un impacto, el objetivo sufre 1d8 puntos de daño por
          fuego.
        </p>
        <p>
          El daño de este conjuro se incrementa en 1d8 cuando alcanzas el nivel
          5 (2d8), nivel 11 (3d8), y nivel 17 (4d8).
        </p>
      </>
    ),
    page: 'phb 269',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'programmedIllusion',
    desc: (
      <>
        <p>
          You create an illusion of an object, a creature, or some other visible
          phenomenon within range that activates when a specific condition
          occurs. The illusion is imperceptible until then. It must be no larger
          than a 30-foot cube, and you decide when you cast the spell how the
          illusion behaves and what sounds it makes. This scripted performance
          can last up to 5 minutes.
        </p>
        <p>
          When the condition you specify occurs, the illusion springs into
          existence and performs in the manner you described. Once the illusion
          finishes performing, it disappears and remains dormant for 10 minutes.
          After this time, the illusion can be activated again.
        </p>
        <p>
          The triggering condition can be as general or as detailed as you like,
          though it must be based on visual or audible conditions that occur
          within 30 feet of the area. For example, you could create an illusion
          of yourself to appear and warn off others who attempt to open a
          trapped door, or you could set the illusion to trigger only when a
          creature says the correct word or phrase.
        </p>
        <p>
          Physical interaction with the image reveals it to be an illusion,
          because things can pass through it. A creature that uses its action to
          examine the image can determine that it is an illusion with a
          successful Intelligence (Investigation) check against your spell save
          DC. If a creature discerns the illusion for what it is, the creature
          can see through the image, and any noise it makes sounds hollow to the
          creature.
        </p>
      </>
    ),
    page: 'phb 269',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A bit of fleece and jade dust worth at least 25 gp.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Illusion',
    class: ['bard', 'wizard'],
  },
  {
    name: 'projectImage',
    desc: (
      <>
        <p>
          You create an illusory copy of yourself that lasts for the duration.
          The copy can appear at any location within range that you have seen
          before, regardless of intervening obstacles. The illusion looks and
          sounds like you but is intangible. If the illusion takes any damage,
          it disappears, and the spell ends.
        </p>
        <p>
          You can use your action to move this illusion up to twice your speed,
          and make it gesture, speak, and behave in whatever way you choose. It
          mimics your mannerisms perfectly.
        </p>
        <p>
          You can see through its eyes and hear through its ears as if you were
          in its space. On your turn as a bonus action, you can switch from
          using its senses to using your own, or back again. While you are using
          its senses, you are blinded and deafened in regard to your own
          surroundings.
        </p>
        <p>
          Physical interaction with the image reveals it to be an illusion,
          because things can pass through it. A creature that uses its action to
          examine the image can determine that it is an illusion with a
          successful Intelligence (Investigation) check against your spell save
          DC. If a creature discerns the illusion for what it is, the creature
          can see through the image, and any noise it makes sounds hollow to the
          creature.
        </p>
      </>
    ),
    page: 'phb 270',
    range: '500 miles',
    components: 'V, S, M',
    material: 'A small replica of you made from materials worth at least 5 gp.',
    ritual: false,
    duration: 'Up to 24 hours',
    concentration: true,
    casting_time: '1 action',
    level: 7,
    school: 'Illusion',
    class: ['bard', 'wizard'],
  },
  {
    name: 'protectionFromEnergy',
    desc: (
      <>
        <p>
          For the duration, the willing creature you touch has resistance to one
          damage type of your choice: acid, cold, fire, lightning, or thunder.
        </p>
      </>
    ),
    page: 'phb 270',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Abjuration',
    class: ['cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard'],
    archetype: {
      paladin: ['ancients', 'vengeance'],
    },
    circles: ['desert'],
    oaths: 'Ancients, Vengeance',
  },
  {
    name: 'protectionFromEvilAndGood',
    desc: (
      <>
        <p>
          Hasta que el conjuro finalice, una criatura voluntaria que toques es
          protegida contra cierto tipo de criaturas: aberraciones, celestiales,
          elementales, seres feéricos, demonios y muertos vivientes.
        </p>
        <p>
          La protección otorga varios beneficios. Las criaturas del tipo elegido
          tienen desventaja en tiradas de ataque en contra del objetivo. Además
          el receptor no puede ser encantado, asustado o poseído por ellos. Si
          el objetivo ya se encuentra encantado, asustado o poseído por tal
          criatura, el objetivo tendrá ventaja en cualquier tirada de salvación
          en contra del efecto relevante.
        </p>
      </>
    ),
    page: 'phb 270',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Holy water or powdered silver and iron, which the spell consumes.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Abjuration',
    class: ['cleric', 'paladin', 'warlock', 'wizard'],
    oaths: 'Devotion',
  },
  {
    name: 'protectionFromPoison',
    desc: (
      <>
        <p>
          Tocas una criatura. Si esta envenenada, neutralizas el veneno. Si más
          de un veneno aflige al objetivo, neutralizarás un veneno que sepas que
          está presente, o neutralizarás uno al azar.
        </p>
        <p>
          Mientras dure el conjuro, el objetivo tiene ventaja en las tiradas de
          salvación en contra de ser envenenado, y tendrá resistencia al daño
          por veneno.
        </p>
      </>
    ),
    page: 'phb 270',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['cleric', 'druid', 'paladin', 'ranger'],
  },
  {
    name: 'purifyFoodAndDrink',
    desc: (
      <>
        <p>
          Toda comida y bebida no mágica dentro de un radio de 5 pies (1
          casilla, 1.5 m), centrado en esfera en un punto de tu elección dentro
          del alcance, es purificada y queda libre de venenos y enfermedades.
        </p>
      </>
    ),
    page: 'phb 270',
    range: '10 feet',
    components: 'V, S',
    ritual: true,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'paladin', 'ritual caster'],
  },
  {
    name: 'raiseDead',
    desc: (
      <>
        <p>
          You return a dead creature you touch to life, provided that it has
          been dead no longer than 10 days. If the creature’s soul is both
          willing and at liberty to rejoin the body, the creature returns to
          life with 1 hit point.
        </p>
        <p>
          This spell also neutralizes any poisons and cures nonmagical diseases
          that affected the creature at the time it died. This spell doesn’t,
          however, remove magical diseases, curses, or similar effects; if these
          aren’t first removed prior to casting the spell, they take effect when
          the creature returns to life. The spell can’t return an undead
          creature to life.
        </p>
        <p>
          This spell closes all mortal wounds, but it doesn’t restore missing
          body parts. If the creature is lacking body parts or organs integral
          for its survival—its head, for instance—the spell automatically fails.
        </p>
        <p>
          Coming back from the dead is an ordeal. The target takes a -4 penalty
          to all attack rolls, saving throws, and ability checks. Every time the
          target finishes a long rest, the penalty is reduced by 1 until it
          disappears.
        </p>
      </>
    ),
    page: 'phb 270',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A diamond worth at least 500gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 hour',
    level: 5,
    school: 'Necromancy',
    class: ['bard', 'cleric', 'paladin'],
    domains: ['life'],
  },
  {
    name: "rary'sTelepathicBond",
    desc: (
      <>
        <p>
          You forge a telepathic link among up to eight willing creatures of
          your choice within range, psychically linking each creature to all the
          others for the duration. Creatures with Intelligence scores of 2 or
          less aren’t affected by this spell.
        </p>
        <p>
          Until the spell ends, the targets can communicate telepathically
          through the bond whether or not they have a common language. The
          communication is possible over any distance, though it can’t extend to
          other planes of existence.
        </p>
      </>
    ),
    page: 'phb 270',
    range: '30 feet',
    components: 'V, S, M',
    material: 'Pieces of eggshell from two different kinds of creatures.',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Divination',
    class: ['ritual caster', 'wizard'],
  },
  {
    name: 'rayOfEnfeeblement',
    desc: (
      <>
        <p>
          Un rayo negro de energía debilitadora surge de tu dedo hacia una
          criatura dentro del alcance. Realiza una tirada de ataque de conjuro a
          distancia contra el objetivo. Con un impacto, el objetivo inflige sólo
          la mitad de daño con ataques con armas que usen su Fuerza hasta que
          finalice el conjuro.
        </p>
        <p>
          Al final de cada turno del objetivo, éste puede realizar una tirada de
          salvación de Constitución contra el conjuro. Con un éxito, el conjuro
          finaliza.
        </p>
      </>
    ),
    page: 'phb 271',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Necromancy',
    class: ['warlock', 'wizard'],
  },
  {
    name: 'rayOfFrost',
    desc: (
      <>
        <p>
          Un gélido rayo de luz blancoazulada sale disparada hacia una criatura
          dentro del alcance. Realiza una tirada de ataque de conjuro contra el
          objetivo. Con un impacto, éste sufre 1d8 puntos de daño por frío y su
          velocidad se reduce en 10 pies (2 casillas, 3 m) hasta el inicio de tu
          próximo turno.
        </p>
        <p>
          El daño del conjuro se incrementa en 1d8 cuando alcanzas el nivel 5
          (2d8), el nivel 11 (3d8) y el nivel 17 (4d8).
        </p>
      </>
    ),
    page: 'phb 271',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'rayOfSickness',
    desc: (
      <>
        <p>
          Un rayo de enfermiza energía verdosa arremete contra una criatura
          dentro del alcance. Realiza una tirada de ataque de conjuro a
          distancia contra el objetivo. Con un impacto, el objetivo sufre 2d8
          puntos de daño por veneno y debe realizar una tirada de salvación de
          Constitución. Con una salvación fallida, también estará envenenado
          hasta el final de tu siguiente turno.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d8 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 271',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Necromancy',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'regenerate',
    desc: (
      <>
        <p>
          You touch a creature and stimulate its natural healing ability. The
          target regains 4d8 + 15 hit points. For the duration of the spell, the
          target regains 1 hit point at the start of each of its turns (10 hit
          points each minute).
        </p>
        <p>
          The target’s severed body members (fingers, legs, tails, and so on),
          if any, are restored after 2 minutes. If you have the severed part and
          hold it to the stump, the spell instantaneously causes the limb to
          knit to the stump.
        </p>
      </>
    ),
    page: 'phb 271',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A prayer wheel and holy water.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 minute',
    level: 7,
    school: 'Transmutation',
    class: ['bard', 'cleric', 'druid'],
  },
  {
    name: 'reincarnate',
    desc: (
      <>
        <p>
          You touch a dead humanoid or a piece of a dead humanoid. Provided that
          the creature has been dead no longer than 10 days, the spell forms a
          new adult body for it and then calls the soul to enter that body. If
          the target’s soul isn’t free or willing to do so, the spell fails.
        </p>
        <p>
          The magic fashions a new body for the creature to inhabit, which
          likely causes the creature’s race to change. The DM rolls a d 100 and
          consults the following table to determine what form the creature takes
          when restored to life, or the DM chooses a form.
        </p>
        <p>
          <b>01-04</b> Dragonborn
        </p>
        <p>
          <b>05-13</b> Dwarf, hill
        </p>
        <p>
          <b>14-21</b> Dwarf, mountain
        </p>
        <p>
          <b>22-25</b> Elf, dark
        </p>
        <p>
          <b>26-34</b> Elf, high
        </p>
        <p>
          <b>35-42</b> Elf, wood
        </p>
        <p>
          <b>43-46</b> Gnome, forest
        </p>
        <p>
          <b>47-52</b> Gnome, rock
        </p>
        <p>
          <b>53-56</b> Half-elf
        </p>
        <p>
          <b>57-60</b> Half-orc
        </p>
        <p>
          <b>61-68</b> Halfling, lightfoot
        </p>
        <p>
          <b>69-76</b> Halfling, stout
        </p>
        <p>
          <b>77-96</b> Human
        </p>
        <p>
          <b>97-00</b> Tiefling
        </p>
        <p>
          The reincarnated creature recalls its former life and experiences. It
          retains the capabilities it had in its original form, except it
          exchanges its original race for the new one and changes its racial
          traits accordingly.
        </p>
      </>
    ),
    page: 'phb 271',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Rare oils and unguents worth at least 1,000 gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 hour',
    level: 5,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'removeCurse',
    desc: (
      <>
        <p>
          At your touch, all curses affecting one creature or object end. If the
          object is a cursed magic item, its curse remains, but the spell breaks
          its owner’s attunement to the object so it can be removed or
          discarded.
        </p>
      </>
    ),
    page: 'phb 271',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Abjuration',
    class: ['cleric', 'paladin', 'warlock', 'wizard'],
  },
  {
    name: 'resistance',
    desc: (
      <>
        <p>
          Tocas a una criatura voluntaria. Antes de que el conjuro finalice, el
          objetivo puede tirar 1d4 y añadir el número del resultado a una tirada
          se salvación de su elección. Puede tirar el dado antes o después de
          hacer la tirada de salvación. Luego el conjuro finaliza.
        </p>
      </>
    ),
    page: 'phb 272',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A miniature cloak.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 0,
    school: 'Abjuration',
    class: ['cleric', 'druid'],
  },
  {
    name: 'resurrection',
    desc: (
      <>
        <p>
          You touch a dead creature that has been dead for no more than a
          century, that didn’t die of old age, and that isn’t undead. If its
          soul is free and willing, the target returns to life with all its hit
          points.
        </p>
        <p>
          This spell neutralizes any poisons and cures normal diseases
          afflicting the creature when it died. It doesn’t, however, remove
          magical diseases, curses, and the like; if such effects aren’t removed
          prior to casting the spell, they afflict the target on its return to
          life.
        </p>
        <p>
          This spell closes all mortal wounds and restores any missing body
          parts.
        </p>
        <p>
          Coming back from the dead is an ordeal. The target takes a -4 penalty
          to all attack rolls, saving throws, and ability checks. Every time the
          target finishes a long rest, the penalty is reduced by 1 until it
          disappears.
        </p>
        <p>
          Casting this spell to restore life to a creature that has been dead
          for one year or longer taxes you greatly. Until you finish a long
          rest, you can’t cast spells again, and you have disadvantage on all
          attack rolls, ability checks, and saving throws.
        </p>
      </>
    ),
    page: 'phb 272',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A diamond worth at least 1,000gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 hour',
    level: 7,
    school: 'Necromancy',
    class: ['bard', 'cleric'],
  },
  {
    name: 'reverseGravity',
    desc: (
      <>
        <p>
          This spell reverses gravity in a 50-foot-radius, 100-foot high
          cylinder centered on a point within range. All creatures and objects
          that aren’t somehow anchored to the ground in the area fall upward and
          reach the top of the area when you cast this spell. A creature can
          make a dexterity saving throw to grab onto a fixed object it can
          reach, thus avoiding the fall.
        </p>
        <p>
          If some solid object (such as a ceiling) is encountered in this fall,
          falling objects and creatures strike it just as they would during a
          normal downward fall. If an object or creature reaches the top of the
          area without striking anything, it remains there, oscillating
          slightly, for the duration.
        </p>
        <p>
          At the end of the duration, affected objects and creatures fall back
          down.
        </p>
      </>
    ),
    page: 'phb 272',
    range: '100 feet',
    components: 'V, S, M',
    material: 'A lodestone and iron filings.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 7,
    school: 'Transmutation',
    class: ['druid', 'sorcerer', 'wizard'],
  },
  {
    name: 'revivify',
    desc: (
      <>
        <p>
          You touch a creature that has died within the last minute. That
          creature returns to life with 1 hit point. This spell can’t return to
          life a creature that has died of old age, nor can it restore any
          missing body parts.
        </p>
      </>
    ),
    page: 'phb 272',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Diamonds worth 300gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['cleric', 'paladin'],
    domains: ['life'],
  },
  {
    name: 'ropeTrick',
    desc: (
      <>
        <p>
          Tocas una cuerda con un largo de hasta 60 pies (12 casillas, 18 m). Un
          extremo de la cuerda se eleva en el aire hasta que toda la cuerda
          cuelga perpendicular al suelo. En el extremo superior de la cuerda,
          una entrada invisible se abre hacia un espacio extradimensional que
          dura hasta que el conjuro finalice. El espacio extradimensional puede
          ser alcanzado subiendo por la cuerda. El espacio puede contener hasta
          ocho criaturas medianas o más pequeñas. La cuerda puede ser recogida
          desde dentro de dicho espacio, haciendo que desparezca de la vista.
        </p>
        <p>
          Los ataques y los conjuros no pueden cruzar la entrada del espacio
          extradimensional ni hacia dentro ni hacia fuera, pero aquellos que se
          encuentren en el interior pueden mirar a través de una ventana de 3
          por 5 pies (90 cm x 150 cm) cuyo centro coincide con la cuerda.
        </p>
        <p>
          Cualquier cosa dentro del espacio extradimensional cae cuando el
          conjuro finaliza.
        </p>
      </>
    ),
    page: 'phb 272',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Powdered corn extract and a twisted loop of parchment.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['wizard'],
  },
  {
    name: 'sacredFlame',
    desc: (
      <>
        <p>
          Un resplandor parecido a una llama desciende sobre una criatura que
          puedas ver y esté dentro del alance. El objetivo debe superar una
          tirada de salvación de Destreza o sufrir 1d8 puntos de daño radiante.
          El objetivo no gana ningún beneficio por cobertura para esta tirada de
          salvación.
        </p>
        <p>
          El daño de este conjuro se incrementa en 1d8 cuando alcanzas el nivel
          5 (2d8), el nivel 11 (3d8) y el nivel 17 (4d8).
        </p>
      </>
    ),
    page: 'phb 272',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['cleric'],
  },
  {
    name: 'sanctuary',
    desc: (
      <>
        <p>
          Proteges a una criatura que esté dentro del alcance. Hasta que el
          conjuro finalice, cualquier criatura que tenga como objetivo a la
          criatura protegida, bien sea con un ataque o un conjuro de daño, debe
          realizar una tirada de salvación de Sabiduría primero. Si falla la
          tirada, la criatura debe escoger otro objetivo o perder el ataque o el
          conjuro. Este conjuro no protege contra efectos de área, tales como la
          explosión de una bola de fuego [fireball].
        </p>
        <p>
          Si la criatura protegida realiza un ataque o lanza un conjuro que
          afecte una criatura enemiga, este conjuro finaliza.
        </p>
      </>
    ),
    page: 'phb 272',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A small silver mirror.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
    archetype: {
      paladin: ['devotion'],
    },
    oaths: 'Devotion',
  },
  {
    name: 'scorchingRay',
    desc: (
      <>
        <p>
          Creas tres rayos de fuego y los arrojas a objetivos dentro del
          alcance. Puedes arrojarlos a uno solo o a varios objetivos.
        </p>
        <p>
          Haz un ataque de conjuro a distancia por cada rayo. Al impactar, el
          objetivo sufre 2d6 puntos de daño por fuego.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, puedes crear un rayo adicional por cada nivel de espacio por
          encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 273',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['light'],
      warlock: ['fiend'],
    },
    domains: ['light'],
    patrons: ['fiend'],
  },
  {
    name: 'scrying',
    desc: (
      <>
        <p>
          You can see and hear a particular creature you choose that is on the
          same plane of existence as you. The target must make a wisdom saving
          throw, which is modified by how well you know the target and the sort
          of physical connection you have to it. If a target knows you're
          casting this spell, it can fail the saving throw voluntarily if it
          wants to be observed.
        </p>
        <p>
          <b>Knowledge &amp; Save Modifier</b>
        </p>
        <p>Secondhand (you have heard of the target) +5</p>
        <p>Firsthand (you have met the target) +0</p>
        <p>Familiar (you know the target well) -5</p>
        <p>
          <b>Connection &amp; Save Modifier</b>
        </p>
        <p>Likeness or picture -2</p>
        <p>Possession or garment -4</p>
        <p>Body part, lock of hair, bit of nail, or the like -10</p>
        <p>
          On a successful save, the target isn’t affected, and you can’t use
          this spell against it again for 24 hours.
        </p>
        <p>
          On a failed save, the spell creates an invisible sensor within 10 feet
          of the target. You can see and hear through the sensor as if you were
          there. The sensor moves with the target, remaining within 10 feet of
          it for the duration. A creature that can see invisible objects sees
          the sensor as a luminous orb about the size of your fist.
        </p>
        <p>
          Instead of targeting a creature, you can choose a location you have
          seen before as the target of this spell. When you do, the sensor
          appears at that location and doesn’t move.
        </p>
      </>
    ),
    page: 'phb 273',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '10 minutes',
    level: 5,
    school: 'Divination',
    class: ['bard', 'cleric', 'druid', 'paladin', 'warlock', 'wizard'],
    archetype: {
      paladin: ['vengeance'],
    },
    domains: ['knowledge', 'light'],
    circles: ['coast', 'swamp'],
    oaths: 'Vengeance',
  },
  {
    name: 'searingSmite',
    desc: (
      <>
        <p>
          La próxima vez que impactes a una criatura con un ataque de arma
          cuerpo a cuerpo durante la duración del conjuro, tu arma resplandece
          con una intensidad candente y el ataque inflige 1d6 puntos de daño
          extra por fuego y prenderá al objetivo en llamas. Al principio de cada
          turno hasta el final del conjuro, el objetivo tiene que realizar una
          tirada de salvación de Constitución. Con una tirada fracasada sufre
          1d6 puntos de daño por fuego. Con una tirada de salvación con éxito,
          el conjuro finaliza. Si el objetivo o una criatura dentro de un
          alcance de 5 pies (1 casilla, 1,5 m) de él usa una acción para apagar
          las llamas, o si cualquier tipo de efecto extingue las llamas (como el
          objetivo siendo sumergido en agua), el conjuro finaliza.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño extra inicial realizado por el atacante se
          incrementa en 1d6 por cada nivel de espacio de conjuro por encima de
          nivel 1.
        </p>
      </>
    ),
    page: 'phb 274',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'seeInvisibility',
    desc: (
      <>
        <p>
          Puedes ver criaturas y objetos como si fueran visibles, y puedes ver
          dentro del Plano Etéreo. Las criaturas etéreas y los objetos aparecen
          en forma espectral y son translúcidas
        </p>
      </>
    ),
    page: 'phb 274',
    range: 'Self',
    components: 'V, S, M',
    material: 'A dash of talc and a small amount of silver powder.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Divination',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'seeming',
    desc: (
      <>
        <p>
          This spell allows you to change the appearance of any number of
          creatures that you can see within range. You give each target you
          choose a new, illusory appearance. An unwilling target can make a
          charisma saving throw, and if it succeeds, it is unaffected by this
          spell.
        </p>
        <p>
          The spell disguises physical appearance as well as clothing, armor,
          weapons, and equipment. You can make each creature seem 1 foot shorter
          or taller and appear thin, fat, or in between. You can't change a
          target's body type, so you must choose a form that has the same basic
          arrangement of limbs. Otherwise, the extent of the illusion is up to
          you. The spell lasts for the duration, unless you use your action to
          dismiss it sooner.
        </p>
        <p>
          The changes wrought by this spell fail to hold up to physical
          inspection. For example, if you use this spell to add a hat to a
          creature's outfit, objects pass through the hat, and anyone who
          touches it would feel nothing or would feel the creature's head and
          hair. If you use this spell to appear thinner than you are, the hand
          of someone who reaches out to touch you would bump into you while it
          was seemingly still in midair.
        </p>
        <p>
          A creature can use its action to inspect a target and make an
          Intelligence (Investigation) check against your spell save DC. If it
          succeeds, it becomes aware that the target is disguised.
        </p>
      </>
    ),
    page: 'phb 274',
    range: '30 feet',
    components: 'V, S',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 action',
    level: 5,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['archfey'],
    },
    patrons: ['archfey'],
  },
  {
    name: 'sending',
    desc: (
      <>
        <p>
          You send a short message of twenty-five words or less to a creature
          with which you are familiar. The creature hears the message in its
          mind, recognizes you as the sender if it knows you, and can answer in
          a like manner immediately. The spell enables creatures with
          Intelligence scores of at least 1 to understand the meaning of your
          message.
        </p>
        <p>
          You can send the message across any distance and even to other planes
          of existence, but if the target is on a different plane than you,
          there is a 5 percent chance that the message doesn’t arrive.
        </p>
      </>
    ),
    page: 'phb 274',
    range: 'Unlimited',
    components: 'V, S, M',
    material: 'A short piece of fine copper wire.',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['bard', 'cleric', 'warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'sequester',
    desc: (
      <>
        <p>
          By means of this spell, a willing creature or an object can be hidden
          away, safe from detection for the duration. When you cast the spell
          and touch the target, it becomes invisible and can’t be targeted by
          divination spells or perceived through scrying sensors created by
          divination spells.
        </p>
        <p>
          If the target is a creature, it falls into a state of suspended
          animation. Time ceases to flow for it, and it doesn’t grow older.
        </p>
        <p>
          You can set a condition for the spell to end early. The condition can
          be anything you choose, but it must occur or be visible within 1 mile
          of the target. Examples include “after 1,000 years” or “when the
          tarrasque awakens.” This spell also ends if the target takes any
          damage.
        </p>
      </>
    ),
    page: 'phb 274',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A powder composed of diamond, emerald, ruby, and sapphire dust worth at least 5,000 gp, which the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Transmutation',
    class: ['wizard'],
  },
  {
    name: 'shapechange',
    desc: (
      <>
        <p>
          You assume the form of a different creature for the duration. The new
          form can be of any creature with a challenge rating equal to your
          level or lower. The creature can’t be a construct or an undead, and
          you must have seen the sort of creature at least once. You transform
          into an average example of that creature, one without any class levels
          or the Spellcasting trait.
        </p>
        <p>
          Your game statistics are replaced by the statistics of the chosen
          creature, though you retain your alignment and Intelligence, Wisdom,
          and Charisma scores. You also retain all of your skill and saving
          throw proficiencies, in addition to gaining those of the creature. If
          the creature has the same proficiency as you and the bonus listed in
          its statistics is higher than yours, use the creature’s bonus in place
          of yours. You can’t use any legendary actions or lair actions of the
          new form.
        </p>
        <p>
          You assume the hit points and Hit Dice of the new form. When you
          revert to your normal form, you return to the number of hit points you
          had before you transformed. If you revert as a result of dropping to 0
          hit points, any excess damage carries over to your normal form. As
          long as the excess damage doesn’t reduce your normal form to 0 hit
          points, you aren’t knocked unconscious.
        </p>
        <p>
          You retain the benefit of any features from your class, race, or other
          source and can use them, provided that your new form is physically
          capable of doing so. You can’t use any special senses you have (for
          example, darkvision) unless your new form also has that sense. You can
          only speak if the creature can normally speak.
        </p>
        <p>
          When you transform, you choose whether your equipment falls to the
          ground, merges into the new form, or is worn by it. Worn equipment
          functions as normal. The DM determines whether it is practical for the
          new form to wear a piece of equipment, based on the creature’s shape
          and size. Your equipment doesn’t change shape or size to match the new
          form, and any equipment that the new form can’t wear must either fall
          to the ground or merge into your new form. Equipment that merges has
          no effect in that state.
        </p>
        <p>
          During this spell’s duration, you can use your action to assume a
          different form following the same restrictions and rules for the
          original form, with one exception: if your new form has more hit
          points than your current one, your hit points remain at their current
          value.
        </p>
      </>
    ),
    page: 'phb 274',
    range: 'Self',
    components: 'V, S, M',
    material:
      'A jade circlet worth at least 1,500 gp, which you must place on your head before you cast the spell.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 9,
    school: 'Transmutation',
    class: ['druid', 'wizard'],
  },
  {
    name: 'shatter',
    desc: (
      <>
        <p>
          Un fuerte y repentino sonido resonante, dolorosamente intenso, estalla
          en un punto a tu elección dentro del alcance. Cada criatura que se
          encuentre en una esfera de 10 pies (2 casillas, 3m) de radio centrada
          en ese punto debe realizar una tirada de salvación de Constitución.
          Una criatura sufre 3d8 puntos de daño por electricidad con una tirada
          fracasada, o la mitad del daño en una salvación con éxito. Una
          criatura hecha de un material inorgánico como piedra, cristal, o metal
          tiene desventaja en esta tirada de salvación.
        </p>
        <p>
          Un objeto no mágico que no esté sujeto ni transportado también sufre
          el daño si está en el área del conjuro.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño se incrementa en 1d8 por cada nivel de espacio de
          conjuro por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 275',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A burst of mica.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Evocation',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
  },
  {
    name: 'shield',
    desc: (
      <>
        <p>
          Creas una barrera invisible de fuerza mágica que te protege. Hasta el
          inicio de tu próximo turno, tienes un bonificador de +5 a tu CA, que
          incluye al ataque desencadenante, y no sufres daño del conjuro
          proyectil mágico.
        </p>
      </>
    ),
    page: 'phb 275',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 reaction',
    level: 1,
    school: 'Abjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'shieldOfFaith',
    desc: (
      <>
        <p>
          Un campo reluciente aparece y rodea a una criatura de tu elección que
          este dentro del alcance, otorgándole un bonificador de +2 a su CA
          durante la duración del conjuro.
        </p>
      </>
    ),
    page: 'phb 275',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A small parchment with a bit of holy text written on it.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Abjuration',
    class: ['cleric', 'paladin'],
    domains: ['war'],
  },
  {
    name: 'shillelagh',
    desc: (
      <>
        <p>
          La madera de un garrote o bastón que estás portando es imbuida con el
          poder de la naturaleza. Mientras el conjuro permanezca activo, puedes
          usar tu característica de lanzamiento de conjuros en vez de la Fuerza
          para las tiradas de ataque y daño de ataques cuerpo a cuerpo usando
          esa arma, y el dado de daño del arma se convierte en 1d8. El arma
          también se vuelve mágica, si no lo era anteriormente. El conjuro
          finaliza si lanzas otro conjuro o si sueltas el arma.
        </p>
      </>
    ),
    page: 'phb 275',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Mistletoe, a shamrock leaf, and a club or quarterstaff.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 bonus action',
    level: 0,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'shockingGrasp',
    desc: (
      <>
        <p>
          Un relámpago brota de tu mano enviando una onda de choque a la
          criatura que intentas tocar. Haz un ataque de conjuro cuerpo a cuerpo
          contra el objetivo. Tienes ventaja en la tirada de ataque si el
          objetivo lleva puesta una armadura hecha de metal. Al impactar, el
          objetivo sufre 1d8 puntos de daño por electricidad, y no puede
          realizar reacciones hasta el inicio de su próximo turno
        </p>
        <p>
          El daño del conjuro se ve incrementado por 1d8 cuando alcanzas nivel 5
          (2d8), nivel 11 (3d8) y nivel 17 (4d8).
        </p>
      </>
    ),
    page: 'phb 275',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Evocation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'silence',
    desc: (
      <>
        <p>
          Mientras dure la duración del conjuro, ningún sonido puede ser creado
          dentro o pasar a través de una esfera de 20 pies (4 casillas, 6 m) de
          radio centrada en un punto a tu elección dentro del alcance. Cualquier
          criatura u objeto completamente dentro de la esfera es inmune al daño
          de trueno, y las criaturas están ensordecidas al entrar completamente
          en ella.
        </p>
        <p>
          Lanzar un conjuro que requiera un componente verbal es imposible allí
          dentro.
        </p>
      </>
    ),
    page: 'phb 275',
    range: '120 feet',
    components: 'V, S',
    ritual: true,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Illusion',
    class: ['bard', 'cleric', 'druid', 'ranger', 'ritual caster'],
    archetype: {
      druid: ['desert'],
    },
    circles: ['desert'],
  },
  {
    name: 'silentImage',
    desc: (
      <>
        <p>
          Creas la imagen de un objeto, una criatura o algún otro fenómeno
          visible que no sea más grande que un cubo de 15 pies (3 casillas, 4.5
          m) de lado. La imagen aparece en un lugar dentro del alcance y
          permanecerá ahí por la duración del conjuro. La imagen es puramente
          visual: no está acompañada por sonido, olor u otros efectos
          sensoriales.
        </p>
        <p>
          Puedes usar tu acción para mover la imagen a cualquier lugar dentro
          del alcance. Mientras la imagen se mueve puedes alterar su apariencia
          de tal forma que su movimiento parezca natural. Por ejemplo, si creas
          una imagen de una criatura y la mueves, puedes alterar su imagen de
          tal forma que parezca que camina.
        </p>
        <p>
          La interacción física con la imagen revela que es una ilusión, porque
          los objetos pueden pasar a través. Una criatura que usa su acción para
          examinar la imagen puede determinar que es una ilusión con una prueba
          de Inteligencia (Investigación) con éxito contra la CD de tu conjuro.
          Si una criatura se da cuenta de que es una ilusión, la criatura puede
          ver a través de la imagen.
        </p>
      </>
    ),
    page: 'phb 276',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A bit of fleece.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Illusion',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'simulacrum',
    desc: (
      <>
        <p>
          You shape an illusory duplicate of one beast or humanoid that is
          within range for the entire casting time of the spell. The duplicate
          is a creature, partially real and formed from ice or snow, and it can
          take actions and otherwise be affected as a normal creature. It
          appears to be the same as the original, but it has half the creature’s
          hit point maximum and is formed without any equipment. Otherwise, the
          illusion uses all the statistics of the creature it duplicates.
        </p>
        <p>
          The simulacrum is friendly to you and creatures you designate. It
          obeys your spoken commands, moving and acting in accordance with your
          wishes and acting on your turn in combat. The simulacrum lacks the
          ability to learn or become more powerful, so it never increases its
          level or other abilities, nor can it regain expended spell slots.
        </p>
        <p>
          If the simulacrum is damaged, you can repair it in an alchemical
          laboratory, using rare herbs and minerals worth 100 gp per hit point
          it regains. The simulacrum lasts until it drops to 0 hit points, at
          which point it reverts to snow and melts instantly.
        </p>
        <p>
          If you cast this spell again, any currently active duplicates you
          created with this spell are instantly destroyed.
        </p>
      </>
    ),
    page: 'phb 276',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Snow or ice in quantities sufficient to made a life-size copy of the duplicated creature; some hair, fingernail clippings, or other piece of that creature’s body placed inside the snow or ice; and powdered ruby worth 1,500 gp, sprinkled over the duplicate and consumed by the spell.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '12 hours',
    level: 7,
    school: 'Illusion',
    class: ['wizard'],
  },
  {
    name: 'sleep',
    desc: (
      <>
        <p>
          Este conjuro envía a las criaturas a un estado de sueño mágico. Tira
          5d8; el total representa los Puntos de Golpe de las criaturas a las
          que puede afectar este conjuro. Las criaturas en un alcance de 20 pies
          (4 casillas, 6 m) de un punto que escojas que esté dentro del alcance,
          se ven afectadas en orden ascendente de Puntos de Golpe actuales
          (ignorando criaturas inconscientes).
        </p>
        <p>
          Empezando por la criatura que tiene menos Puntos de Golpes actuales,
          cada criatura afectada por este conjuro queda inconsciente hasta que
          el conjuro finalice, hasta que la criatura reciba daño o hasta que
          alguien use una acción para sacudirla o abofetearla para que
          despierte. Resta los Puntos de Golpe de cada criatura del total antes
          de pasar a la próxima criatura con menor cantidad de Puntos de Golpe.
          Los Puntos de Golpe de una criatura deben ser iguales o menores al
          total restante para que esa criatura se vea afectada.
        </p>
        <p>
          Los muertos vivientes y las criaturas inmunes a ser encantadas no
          pueden ser afectados por este conjuro
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, tiras 2d8 adicionales por cada nivel de espacio de conjuros
          por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 276',
    range: '90 feet',
    components: 'V, S, M',
    material: 'A pinch of fine sand, rose petals, or a cricket.',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['archfey'],
    },
    patrons: ['archfey'],
  },
  {
    name: 'sleetStorm',
    desc: (
      <>
        <p>
          Until the spell ends, freezing rain and sleet fall in a 20-foot-tall
          cylinder with a 40-foot radius centered on a point you choose within
          range. The area is heavily obscured, and exposed flames in the area
          are doused.
        </p>
        <p>
          The ground in the area is covered with slick ice, making it difficult
          terrain. When a creature enters the spell’s area for the first time on
          a turn or starts its turn there, it must make a dexterity saving
          throw. On a failed save, it falls prone.
        </p>
        <p>
          If a creature is concentrating in the spell’s area, the creature must
          make a successful constitution saving throw against your spell save DC
          or lose concentration.
        </p>
      </>
    ),
    page: 'phb 276',
    range: '150 feet',
    components: 'V, S, M',
    material: 'A pinch of dust and a few drops of water.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
    circles: ['arctic'],
  },
  {
    name: 'slow',
    desc: (
      <>
        <p>
          You alter time around up to six creatures of your choice in a 40-foot
          cube within range. Each target must succeed on a wisdom saving throw
          or be affected by this spell for the duration.
        </p>
        <p>
          An affected target’s speed is halved, it takes a -2 penalty to AC and
          dexterity saving throws, and it can’t use reactions. On its turn, it
          can use either an action or a bonus action, not both. Regardless of
          the creature’s abilities or magic items, it can’t make more than one
          melee or ranged attack during its turn.
        </p>
        <p>
          If the creature attempts to cast a spell with a casting time of 1
          action, roll a d20. On an 11 or higher, the spell doesn’t take effect
          until the creature’s next turn, and the creature must use its action
          on that turn to complete the spell. If it can’t, the spell is wasted.
        </p>
        <p>
          A creature affected by this spell makes another wisdom saving throw at
          the end of its turn. On a successful save, the effect ends for it.
        </p>
      </>
    ),
    page: 'phb 277',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A drop of molasses.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['arctic'],
    },
    circles: ['arctic'],
  },
  {
    name: 'spareTheDying',
    desc: (
      <>
        <p>
          Tocas a una criatura viviente que tenga 0 Puntos de Golpe. La criatura
          se estabiliza. Este conjuro no tiene efecto en muertos vivientes ni en
          constructos.
        </p>
      </>
    ),
    page: 'phb 277',
    range: 'Touch',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Necromancy',
    class: ['cleric'],
  },
  {
    name: 'speakWithAnimals',
    desc: (
      <>
        <p>
          Ganas la habilidad de comprender y comunicarte verbalmente con las
          bestias durante la duración del conjuro. El conocimiento y la
          conciencia de muchas bestias está limitado por su inteligencia, pero
          dentro de un mínimo las bestias pueden darte información sobre sitios
          cercanos y monstruos, incluyendo cualquier cosa que puedan percibir o
          hayan percibido en el último día. Debes ser capaz de persuadir a una
          bestia para que te haga pequeños favores, siempre bajo la aprobación
          del DM.
        </p>
      </>
    ),
    page: 'phb 277',
    range: 'Self',
    components: 'V, S',
    ritual: true,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Divination',
    class: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'ritual caster'],
    archetype: {
      cleric: ['nature'],
      paladin: ['ancients'],
    },
    domains: ['nature'],
    oaths: 'Ancients',
  },
  {
    name: 'speakWithDead',
    desc: (
      <>
        <p>
          You grant the semblance of life and intelligence to a corpse of your
          choice within range, allowing it to answer the questions you pose. The
          corpse must still have a mouth and can’t be undead. The spell fails if
          the corpse was the target of this spell within the last 10 days.
        </p>
        <p>
          Until the spell ends, you can ask the corpse up to five questions. The
          corpse knows only what it knew in life, including the languages it
          knew. Answers are usually brief, cryptic, or repetitive, and the
          corpse is under no compulsion to offer a truthful answer if you are
          hostile to it or it recognizes you as an enemy. This spell doesn’t
          return the creature’s soul to its body, only its animating spirit.
          Thus, the corpse can’t learn new information, doesn’t comprehend
          anything that has happened since it died, and can’t speculate about
          future events.
        </p>
      </>
    ),
    page: 'phb 277',
    range: '10 feet',
    components: 'V, S, M',
    material: 'Burning incense.',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Necromancy',
    class: ['bard', 'cleric'],
    domains: ['knowledge'],
  },
  {
    name: 'speakWithPlants',
    desc: (
      <>
        <p>
          You imbue plants within 30 feet of you with limited sentience and
          animation, giving them the ability to communicate with you and follow
          your simple commands. You can question plants about events in the
          spell’s area within the past day, gaining information about creatures
          that have passed, weather, and other circumstances.
        </p>
        <p>
          You can also turn difficult terrain caused by plant growth (such as
          thickets and undergrowth) into ordinary terrain that lasts for the
          duration. Or you can turn ordinary terrain where plants are present
          into difficult terrain that lasts for the duration, causing vines and
          branches to hinder pursuers, for example.
        </p>
        <p>
          Plants might be able to perform other tasks on your behalf, at the
          DM’s discretion. The spell doesn’t enable plants to uproot themselves
          and move about, but they can freely move branches, tendrils, and
          stalks.
        </p>
        <p>
          If a plant creature is in the area, you can communicate with it as if
          you shared a common language, but you gain no magical ability to
          influence it.
        </p>
        <p>
          This spell can cause the plants created by the entangle spell to
          release a restrained creature.
        </p>
      </>
    ),
    page: 'phb 277',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['bard', 'druid', 'ranger'],
  },
  {
    name: 'spiderClimb',
    desc: (
      <>
        <p>
          Hasta que el conjuro finalice, una criatura voluntaria que toques gana
          la habilidad de moverse arriba, abajo y hacia los lados en superficies
          verticales y boca abajo por el techo, mientras tenga sus manos libres.
          El objetivo también adquiere una velocidad de escalada igual a su
          velocidad caminando.
        </p>
      </>
    ),
    page: 'phb 277',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A drop of bitumen and a spider.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['forest', 'mountain', 'underdark'],
    },
    circles: ['forest', 'mountain', 'underdark'],
  },
  {
    name: 'spikeGrowth',
    desc: (
      <>
        <p>
          Del suelo en un radio de 20 pies (4 casillas, 6 m) centrado en un
          punto dentro del alcance, brotan duros pinchos y espinas. El área se
          convierte en un terreno difícil durante la duración del conjuro.
          Cuando una criatura entra o se mueve dentro del área, sufre 2d4 puntos
          de daño perforante por cada 5 pies (1 casilla, 1.5 m) que se desplace.
        </p>
        <p>
          La transformación del suelo está camuflada para que parezca natural.
          Cualquier criatura que no pueda ver el área en el momento en que se
          lanza el conjuro debe realizar una prueba de Sabiduría (Percepción)
          contra la CD de tu salvación de conjuros para reconocer el terreno
          como peligroso antes de entrar en él.
        </p>
      </>
    ),
    page: 'phb 277',
    range: '150 feet',
    components: 'V, S, M',
    material: 'Seven sharp spines or seven twigs cut peak.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['nature'],
    },
    domains: ['nature'],
    circles: ['arctic', 'mountain'],
  },
  {
    name: 'spiritGuardians',
    desc: (
      <>
        <p>
          You call forth spirits to protect you. They flit around you to a
          distance of 15 feet for the duration. If you are good or neutral,
          their spectral form appears angelic or fey (your choice). If you are
          evil, they appear fiendish.
        </p>
        <p>
          When you cast this spell, you can designate any number of creatures
          you can see to be unaffected by it. An affected creature’s speed is
          halved in the area, and when the creature enters the area for the
          first time on a turn or starts its turn there, it must make a wisdom
          saving throw. On a failed save, the creature takes 3d8 radiant damage
          (if you are good or neutral) or 3d8 necrotic damage (if you are evil).
          On a successful save, the creature takes half as much damage.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the damage increases by 1d8 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 278',
    range: 'Self',
    components: 'V, S, M',
    material: 'A holy symbol.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['cleric'],
    domains: ['war'],
  },
  {
    name: 'spiritualWeapon',
    desc: (
      <>
        <p>
          Creas un arma espectral flotante dentro del alcance que persiste
          durante la duración o hasta que lances otro conjuro. Cuando lanzas el
          conjuro, puedes realizar un ataque de conjuro cuerpo a cuerpo contra
          una criatura a 5 pies (1 casilla, 1.5 m) del arma. Si impacta, el
          objetivo sufre 1d8 + tu modificador de característica de lanzador de
          conjuros como daño por fuerza.
        </p>
        <p>
          Como acción adicional en tu turno, puedes mover el arma hasta 20 pies
          (4 casillas, 6 m) y repetir el ataque contra una criatura a 5 pies (1
          casilla, 1.5 m) de la misma.
        </p>
        <p>
          El arma puede tomar la forma que tú prefieras. Los clérigos de
          deidades asociadas con ciertas armas (como St. Cuthbert, conocido por
          su maza o Thor por su martillo) le dan la forma asociada con su
          deidad.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 3 o
          superior, el daño se incrementa en 1d8 por cada nivel de espacio de
          conjuros por encima de nivel 2.
        </p>
      </>
    ),
    page: 'phb 278',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 bonus action',
    level: 2,
    school: 'Evocation',
    class: ['cleric'],
    domains: ['life', 'war'],
  },
  {
    name: 'staggeringSmite',
    desc: (
      <>
        <p>
          The next time you hit a creature with a melee weapon attack during
          this spell’s duration, your weapon pierces both body and mind, and the
          attack deals an extra 4d6 psychic damage to the target. The target
          must make a wisdom saving throw. On a failed save, it has disadvantage
          on attack rolls and ability checks, and can't take reactions, until
          the end of its next turn.
        </p>
      </>
    ),
    page: 'phb 278',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 4,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'stinkingCloud',
    desc: (
      <>
        <p>
          You create a 20-foot-radius sphere of yellow, nauseating gas centered
          on a point within range. The cloud spreads around corners, and its
          area is heavily obscured. The cloud lingers in the air for the
          duration.
        </p>
        <p>
          Each creature that is completely within the cloud at the start of its
          turn must make a constitution saving throw against poison. On a failed
          save, the creature spends its action that turn retching and reeling.
          Creatures that don’t need to breathe or are immune to poison
          automatically succeed on this saving throw.
        </p>
        <p>
          A moderate wind (at least 10 miles per hour) disperses the cloud after
          4 rounds. A strong wind (at least 20 miles per hour) disperses it
          after 1 round.
        </p>
      </>
    ),
    page: 'phb 278',
    range: '90 feet',
    components: 'V, S, M',
    material: 'A rotten egg or several skunk cabbage leaves.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Conjuration',
    class: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      druid: ['swamp', 'underdark'],
      warlock: ['fiend'],
    },
    circles: ['swamp', 'underdark'],
    patrons: ['fiend'],
  },
  {
    name: 'stoneShape',
    desc: (
      <>
        <p>
          You touch a stone object of Medium size or smaller or a section of
          stone no more than 5 feet in any dimension and form it into any shape
          that suits your purpose. So, for example, you could shape a large rock
          into a weapon, idol, or coffer, or make a small passage through a
          wall, as long as the wall is less than 5 feet thick. You could also
          shape a stone door or its frame to seal the door shut. The object you
          create can have up to two hinges and a latch, but finer mechanical
          detail isn’t possible.
        </p>
      </>
    ),
    page: 'phb 278',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Soft clay, to be crudely worked into the desired shape for the stone object.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 4,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'wizard'],
    circles: ['mountain', 'underdark'],
  },
  {
    name: 'stoneskin',
    desc: (
      <>
        <p>
          This spell turns the flesh of a willing creature you touch as hard as
          stone. Until the spell ends, the target has resistance to nonmagical
          bludgeoning, piercing, and slashing damage.
        </p>
      </>
    ),
    page: 'phb 278',
    range: 'Touch',
    components: 'V, S, M',
    material: 'Diamond dust worth 100 gp, which the spell consumes.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Abjuration',
    class: ['cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['war'],
      paladin: ['ancients'],
    },
    domains: ['war'],
    circles: ['mountain'],
    oaths: 'Ancients',
  },
  {
    name: 'stormOfVengeance',
    desc: (
      <>
        <p>
          A churning storm cloud forms, centered on a point you can see and
          spreading to a radius of 360 feet. Lightning flashes in the area,
          thunder booms, and strong winds roar. Each creature under the cloud
          (no more than 5,000 feet beneath the cloud) when it appears must make
          a constitution saving throw. On a failed save, a creature takes 2d6
          thunder damage and becomes deafened for 5 minutes.
        </p>
        <p>
          Each round you maintain concentration on this spell, the storm
          produces additional effects on your turn.
        </p>
        <p>
          <b>Round 2.</b> Acidic rain falls from the cloud. Each creature and
          object under the cloud takes 1d6 acid damage.
        </p>
        <p>
          <b>Round 3.</b> You call six bolts of lightning from the cloud to
          strike six creatures or objects of your choice beneath the cloud. A
          given creature or object can’t be struck by more than one bolt. A
          struck creature must make a dexterity saving throw. The creature takes
          10d6 lightning damage on a failed save, or half as much damage on a
          successful one.
        </p>
        <p>
          <b>Round 4.</b> Hailstones rain down from the cloud. Each creature
          under the cloud takes 2d6 bludgeoning damage.
        </p>
        <p>
          <b>Round 5-10.</b> Gusts and freezing rain assail the area under the
          cloud. The area becomes difficult terrain and is heavily obscured.
          Each creature there takes 1d6 cold damage. Ranged weapon attacks in
          the area are impossible. The wind and rain count as a severe
          distraction for the purposes of maintaining concentration on spells.
          Finally, gusts of strong wind (ranging from 20 to 50 miles per hour)
          automatically disperse fog, mists, and similar phenomena in the area,
          whether mundane or magical.
        </p>
      </>
    ),
    page: 'phb 279',
    range: 'Sight',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 9,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'suggestion',
    desc: (
      <>
        <p>
          Sugieres el curso de una actividad (limitado a un par de frases) e
          influyes mágicamente a una criatura a la que puedas ver dentro del
          alcance que pueda escucharte y entenderte. Las criaturas inmunes al
          encantamiento son inmunes a este efecto. La sugerencia debe realizarse
          de manera que la acción suene razonable. Pedir a una criatura que se
          apuñale, se lance contra una lanza, se inmole, o haga algo obviamente
          dañino finaliza el conjuro al momento.
        </p>
        <p>
          El objetivo debe realizar una tirada de salvación por Carisma. Si
          falla la salvación, intentará realizar la acción que has sugerido de
          la mejor manera posible. El transcurso de la acción que has sugerido
          continúa durante toda la duración del conjuro. Si la actividad
          sugerida se puede completar en menos tiempo, el conjuro finaliza
          cuando el sujeto termina lo que le ha sido sugerido.
        </p>
        <p>
          Se pueden especificar también condiciones que activarán una actividad
          especial durante la duración. Por ejemplo, puedes sugerir a un
          caballero que entregue su caballo de guerra al primer mendigo que
          encuentre. Si la condición no se cumple antes de que el conjuro
          finalice, la actividad no es realizada.
        </p>
        <p>
          Si tú o cualquiera de tus compañeros dañáis al objetivo, el conjuro
          finaliza.
        </p>
      </>
    ),
    page: 'phb 279',
    range: '30 feet',
    components: 'V, M',
    material:
      'A snake’s tongue and either a bit of honeycomb or a drop of sweet oil.',
    ritual: false,
    duration: 'Up to 8 hours',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['knowledge'],
    },
    domains: ['knowledge'],
  },
  {
    name: 'sunbeam',
    desc: (
      <>
        <p>
          A beam of brilliant light flashes out from your hand in a 5-foot-wide,
          60-foot-long line. Each creature in the line must make a constitution
          saving throw. On a failed save, a creature takes 6d8 radiant damage
          and is blinded until your next turn. On a successful save, it takes
          half as much damage and isn’t blinded by this spell. Undead and oozes
          have disadvantage on this saving throw.
        </p>
        <p>
          You can create a new line of radiance as your action on any turn until
          the spell ends.
        </p>
        <p>
          For the duration, a mote of brilliant radiance shines in your hand. It
          sheds bright light in a 30-foot radius and dim light for an additional
          30 feet. This light is sunlight.
        </p>
      </>
    ),
    page: 'phb 279',
    range: 'Self',
    components: 'V, S, M',
    material: 'A magnifying glass.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'wizard'],
  },
  {
    name: 'sunburst',
    desc: (
      <>
        <p>
          Brilliant sunlight flashes in a 60-foot radius centered on a point you
          choose within range. Each creature in that light must make a
          constitution saving throw. On a failed save, a creature takes 12d6
          radiant damage and is blinded for 1 minute. On a successful save, it
          takes half as much damage and isn’t blinded by this spell. Undead and
          oozes have disadvantage on this saving throw.
        </p>
        <p>
          A creature blinded by this spell makes another constitution saving
          throw at the end of each of its turns. On a successful save, it is no
          longer blinded.
        </p>
        <p>
          This spell dispels any darkness in its area that was created by a
          spell.
        </p>
      </>
    ),
    page: 'phb 279',
    range: '150 feet',
    components: 'V, S, M',
    material: 'Fire and a piece of sunstone.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'wizard'],
  },
  {
    name: 'swiftQuiver',
    desc: (
      <>
        <p>
          You transmute your quiver so it produces an endless supply of
          nonmagical ammunition, which seems to leap into your hand when you
          reach for it.
        </p>
        <p>
          On each of your turns until the spell ends, you can use a bonus action
          to make two attacks with a weapon that uses ammunition from the
          quiver. Each time you make such a ranged attack, your quiver magically
          replaces the piece of ammunition you used with a similar piece of
          nonmagical ammunition. Any pieces of ammunition created by this spell
          disintegrate when the spell ends. If the quiver leaves your
          possession, the spell ends.
        </p>
      </>
    ),
    page: 'phb 279',
    range: 'Touch',
    components: 'V, S, M',
    material: 'A quiver containing at least one piece of ammunition.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 5,
    school: 'Transmutation',
    class: ['ranger'],
  },
  {
    name: 'symbol',
    desc: (
      <>
        <p>
          When you cast this spell, you inscribe a harmful glyph either on a
          surface (such as a section of floor, a wall, or a table) or within an
          object that can be closed to conceal the glyph (such as a book, a
          scroll, or a treasure chest). If you choose a surface, the glyph can
          cover an area of the surface no larger than 10 feet in diameter. If
          you choose an object, that object must remain in its place; if the
          object is moved more than 10 feet from where you cast this spell, the
          glyph is broken, and the spell ends without being triggered.
        </p>
        <p>
          The glyph is nearly invisible, requiring an Intelligence
          (Investigation) check against your spell save DC to find it.
        </p>
        <p>
          You decide what triggers the glyph when you cast the spell. For glyphs
          inscribed on a surface, the most typical triggers include touching or
          stepping on the glyph, removing another object covering it,
          approaching within a certain distance of it, or manipulating the
          object that holds it. For glyphs inscribed within an object, the most
          common triggers are opening the object, approaching within a certain
          distance of it, or seeing or reading the glyph.
        </p>
        <p>
          You can further refine the trigger so the spell is activated only
          under certain circumstances or according to a creature’s physical
          characteristics (such as height or weight), or physical kind (for
          example, the ward could be set to affect hags or shapechangers). You
          can also specify creatures that don’t trigger the glyph, such as those
          who say a certain password.
        </p>
        <p>
          When you inscribe the glyph, choose one of the options below for its
          effect. Once triggered, the glyph glows, filling a 60-foot-radius
          sphere with dim light for 10 minutes, after which time the spell ends.
          Each creature in the sphere when the glyph activates is targeted by
          its effect, as is a creature that enters the sphere for the first time
          on a turn or ends its turn there.{' '}
        </p>
        <p>
          <b>Death.</b> Each target must make a constitution saving throw,
          taking 10d 10 necrotic damage on a failed save, or half as much damage
          on a successful save.
        </p>
        <p>
          <b>Discord.</b> Each target must make a constitution saving throw. On
          a failed save, a target bickers and argues with other creatures for 1
          minute. During this time, it is incapable of meaningful communication
          and has disadvantage on attack rolls and ability checks.
        </p>
        <p>
          <b>Fear.</b> Each target must make a wisdom saving throw and becomes
          frightened for 1 minute on a failed save. While frightened, the target
          drops whatever it is holding and must move at least 30 feet away from
          the glyph on each of its turns, if able.
        </p>
        <p>
          <b>Hopelessness.</b> Each target must make a charisma saving throw. On
          a failed save, the target is overwhelmed with despair for 1 minute.
          During this time, it can’t attack or target any creature with harmful
          abilities, spells, or other magical effects.
        </p>
        <p>
          <b>Insanity.</b> Each target must make an intelligence saving throw.
          On a failed save, the target is driven insane for 1 minute. An insane
          creature can’t take actions, can't understand what other creatures
          say, can’t read, and speaks only in gibberish. The DM controls its
          movement, which is erratic.
        </p>
        <p>
          <b>Pain.</b> Each target must make a constitution saving throw and
          becomes incapacitated with excruciating pain for 1 minute on a failed
          save.
        </p>
        <p>
          <b>Sleep.</b> Each target must make a wisdom saving throw and falls
          unconscious for 10 minutes on a failed save. A creature awakens if it
          takes damage or if someone uses an action to shake or slap it awake.
        </p>
        <p>
          <b>Stunning.</b> Each target must make a wisdom saving throw and
          becomes stunned for 1 minute on a failed save.
        </p>
      </>
    ),
    page: 'phb 280',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'Mercury, phosphorus, and powdered diamond and opal with a total value of at least 1,000 gp, which the spell consumes.',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 7,
    school: 'Abjuration',
    class: ['bard', 'cleric', 'wizard'],
  },
  {
    name: "tasha'sHideousLaughter",
    desc: (
      <>
        <p>
          Una criatura de tu elección que puedas ver y dentro del alcance
          percibe todo de forma tremendamente cómica y cae desternillada de risa
          al suelo si le afecta el conjuro. El objetivo debe superar una tirada
          de salvación de Sabiduría o cae al suelo, considerándose incapacitada
          e incapaz de levantarse durante la duración. Una criatura con una
          Inteligencia menor o igual a 4 no se ve afectada
        </p>
        <p>
          Al final de cada uno de sus turnos, y cada vez que reciba daño, el
          objetivo puede realizar otra tirada de salvación de Sabiduría. El
          objetivo tira con ventaja la tirada de salvación si sufre daño. En
          cuando supera una tirada de salvación, el conjuro finaliza.
        </p>
      </>
    ),
    page: 'phb 280',
    range: '30 feet',
    components: 'V, S, M',
    material: 'Tiny tarts and a feather that is waved in the air.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Enchantment',
    class: ['bard', 'warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'telekinesis',
    desc: (
      <>
        <p>
          You gain the ability to move or manipulate creatures or objects by
          thought. When you cast the spell, and as your action each round for
          the duration, you can exert your will on one creature or object that
          you can see within range, causing the appropriate effect below. You
          can affect the same target round after round, or choose a new one at
          any time. If you switch targets, the prior target is no longer
          affected by the spell.
        </p>
        <p>
          <b>Creature.</b> You can try to move a Huge or smaller creature. Make
          an ability check with your spellcasting ability contested by the
          creature’s Strength check. If you win the contest, you move the
          creature up to 30 feet in any direction, including upward but not
          beyond the range of this spell. Until the end of your next turn, the
          creature is restrained in your telekinetic grip. A creature lifted
          upward is suspended in mid-air.
        </p>
        <p>
          On subsequent rounds, you can use your action to attempt to maintain
          your telekinetic grip on the creature by repeating the contest.
        </p>
        <p>
          <b>Object.</b> You can try to move an object that weighs up to 1,000
          pounds. If the object isn’t being worn or carried, you automatically
          move it up to 30 feet in any direction, but not beyond the range of
          this spell.
        </p>
        <p>
          If the object is worn or carried by a creature, you must make an
          ability check with your spellcasting ability contested by that
          creature’s Strength check. If you succeed, you pull the object away
          from that creature and can move it up to 30 feet in any direction but
          not beyond the range of this spell.
        </p>
        <p>
          You can exert fine control on objects with your telekinetic grip, such
          as manipulating a simple tool, opening a door or a container, stowing
          or retrieving an item from an open container, or pouring the contents
          from a vial.
        </p>
      </>
    ),
    page: 'phb 280',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Transmutation',
    class: ['sorcerer', 'warlock', 'wizard'],
    archetype: {
      warlock: ['greatOldOne'],
    },
    patrons: ['greatOldOne'],
  },
  {
    name: 'telepathy',
    desc: (
      <>
        <p>
          You create a telepathic link between yourself and a willing creature
          with which you are familiar. The creature can be anywhere on the same
          plane of existence as you. The spell ends if you or the target are no
          longer on the same plane.
        </p>
        <p>
          Until the spell ends, you and the target can instantaneously share
          words, images, sounds, and other sensory messages with one another
          through the link, and the target recognizes you as the creature it is
          communicating with. The spell enables a creature with an Intelligence
          score of at least 1 to understand the meaning of your words and take
          in the scope of any sensory messages you send to it.
        </p>
      </>
    ),
    page: 'phb 281',
    range: 'Unlimited',
    components: 'V, S, M',
    material: 'A pair of linked silver rings.',
    ritual: false,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 8,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: 'teleport',
    desc: (
      <>
        <p>
          This spell instantly transports you and up to eight willing creatures
          of your choice that you can see within range, or a single object that
          you can see within range, to a destination you select. If you target
          an object, it must be able to fit entirely inside a 10-foot cube, and
          it can’t be held or carried by an unwilling creature.
        </p>
        <p>
          The destination you choose must be known to you, and it must be on the
          same plane of existence as you. Your familiarity with the destination
          determines whether you arrive there successfully. The DM rolls d100
          and consults the table.
        </p>
      </>
    ),
    page: 'phb 281',
    range: '10 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 7,
    school: 'Conjuration',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: 'teleportationCircle',
    desc: (
      <>
        <p>
          As you cast the spell, you draw a 10-foot-diameter circle on the
          ground inscribed with sigils that link your location to a permanent
          teleportation circle of your choice whose sigil sequence you know and
          that is on the same plane of existence as you. A shimmering portal
          opens within the circle you drew and remains open until the end of
          your next turn. Any creature that enters the portal instantly appears
          within 5 feet of the destination circle or in the nearest unoccupied
          space if that space is occupied.
        </p>
        <p>
          Many major temples, guilds, and other important places have permanent
          teleportation circles inscribed somewhere within their confines. Each
          such circle includes a unique sigil sequence—a string of magical runes
          arranged in a particular pattern. When you first gain the ability to
          cast this spell, you learn the sigil sequences for two destinations on
          the Material Plane, determined by the DM. You can learn additional
          sigil sequences during your adventures. You can commit a new sigil
          sequence to memory after studying it for 1 minute.
        </p>
        <p>
          You can create a permanent teleportation circle by casting this spell
          in the same location every day for one year. You need not use the
          circle to teleport when you cast the spell in this way.
        </p>
      </>
    ),
    page: 'phb 282',
    range: '10 feet',
    components: 'V, M',
    material:
      'Rare chalks and inks infused with precious gems with 50 gp, which the spell consumes.',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 minute',
    level: 5,
    school: 'Conjuration',
    class: ['bard', 'sorcerer', 'wizard'],
  },
  {
    name: "tenser'sFloatingDisk",
    desc: (
      <>
        <p>
          Este conjuro crea un círculo horizontal de fuerza, de 3 pies de
          diámetro y una pulgada (2,54 cm) de grosor, que flota a 3 pies (90 cm)
          sobre un espacio desocupado a tu elección que puedas ver dentro del
          alcance. El disco permanecerá durante la duración, y puede sostener
          hasta 500 libras (226 kg). Si se coloca más peso encima de él, el
          conjuro finaliza, y todo lo que haya en el disco cae al suelo.
        </p>
        <p>
          El disco está inmóvil mientras tú estés hasta a 20 pies (4 casillas, 6
          m) de él. Si te mueves a más de 20 pies (4 casillas, 6 m), el disco de
          sigue, permaneciendo a 20 pies (4 casillas, 6 m) de ti. Puede moverse
          por terreno abrupto, subir o bajar escaleras, laderas o similares,
          pero no puede cruzar un desnivel de 10 pies (2 casillas, 3 m) o más.
          Por ejemplo, el disco no puede moverse a través de un hoyo de diez
          pies de profundidad, ni puede abandonar el mismo hoyo si ha sido
          creado dentro.
        </p>
        <p>
          Si te alejas más de 100 pies (20 casillas, 30 m) del disco
          (normalmente debido a que el disco no pueda seguirte) el conjuro
          finaliza.
        </p>
      </>
    ),
    page: 'phb 282',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A drop of mercury.',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['ritual caster', 'wizard'],
  },
  {
    name: 'thaumaturgy',
    desc: (
      <>
        <p>
          Realizas una pequeña maravilla, un signo de un poder sobrenatural,
          dentro del alcance. Puedes crear uno de los siguientes efectos mágicos
          dentro del alcance:
        </p>
        <ul>
          <li>
            Tu voz resuena hasta tres veces más fuerte de lo normal durante 1
            minuto.
          </li>
          <li>
            Creas llamas que parpadean, iluminan, se oscurecen o cambian de
            color durante 1 minuto.
          </li>
          <li>Causas inofensivos temblores en el suelo durante 1 minuto.</li>
          <li>
            Creas un sonido instantáneo que se origina en un punto dentro del
            alcance a tu elección, como el estallido de un trueno, el llanto de
            un cuervo o murmullos ominosos
          </li>
          <li>
            Haces que una puerta sin cerradura se abra de golpe o se cierre con
            un golpe.
          </li>
          <li>Alteras la apariencia de tus ojos durante 1 minuto.</li>
        </ul>
        <p>
          Si lanzas este conjuro múltiples veces puedes tener activados hasta 3
          efectos a la vez durante 1 minuto, y puedes hacer desaparecer uno de
          los efectos como acción.
        </p>
      </>
    ),
    page: 'phb 282',
    range: '30 feet',
    components: 'V',
    ritual: false,
    duration: '1 minute',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Transmutation',
    class: ['cleric'],
  },
  {
    name: 'thornWhip',
    desc: (
      <>
        <p>
          Creas un látigo largo, como la rama de una vid, cubierto de espinas
          que azotan bajo tu orden a una criatura dentro del alcance. Realiza un
          ataque de conjuro cuerpo a cuerpo contra el objetivo. Si impactas, la
          criatura sufre 1d6 puntos de daño perforante, y si la criatura es
          grande o más pequeña, tiras de la criatura hasta 10 pies más cerca de
          ti.
        </p>
        <p>
          El daño de este conjuro aumenta en 1d6 cuando alcanzas el nivel 5
          (2d6), nivel 11 (3d6), y nivel 17 (4d6).
        </p>
      </>
    ),
    page: 'phb 282',
    range: '30 feet',
    components: 'V, S, M',
    material: 'The stem of a plant with thorns.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'thunderousSmite',
    desc: (
      <>
        <p>
          La próxima vez que impactes a alguien con un arma de combate cuerpo a
          cuerpo durante la duración del conjuro, tu arma suena como un trueno
          que se puede escuchar hasta a 300 pies (60 casillas, 90 m) de ti, y el
          ataque inflige un daño extra de 2d6 puntos de daño sonico al objetivo.
          Además, si el objetivo es una criatura, debe superar una tirada de
          salvación de Fuerza o ser empujada a 10 pies (2 casillas, 6 m) de ti y
          tumbada.
        </p>
      </>
    ),
    page: 'phb 282',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'thunderwave',
    desc: (
      <>
        <p>
          Una onda de fuerza atronadora se origina desde ti. Cada criatura
          dentro de un cubo de 15 pies (3 casillas, 4.5 m) originándose en ti
          debe realizar una tirada de salvación de Constitución. Con una
          salvación fracasada, la criatura sufre 2d8 puntos de daño sonico y es
          empujada 10 pies (2 casillas, 3 m) de ti. Si supera la tirada, la
          criatura sufre la mitad del daño y no es empujada.
        </p>
        <p>
          Además, los objetos no fijos que estén completamente dentro del
          alcance son empujados 10 pies (2 casillas, 3 m) de ti por el efecto
          del conjuro, que además emite un sonido de trueno audible a 300 pies
          (60 casillas, 90 m).
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño se incrementa en 1d8 por cada nivel de espacio de
          conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 282',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'],
    archetype: {
      cleric: ['tempest'],
    },
    domains: ['tempest'],
  },
  {
    name: 'timeStop',
    desc: (
      <>
        <p>
          You briefly stop the flow of time for everyone but yourself. No time
          passes for other creatures, while you take 1d4 + 1 turns in a row,
          during which you can use actions and move as normal.
        </p>
        <p>
          This spell ends if one of the actions you use during this period, or
          any effects that you create during this period, affects a creature
          other than you or an object being worn or carried by someone other
          than you. In addition, the spell ends if you move to a place more than
          1,000 feet from the location where you cast it.
        </p>
      </>
    ),
    page: 'phb 283',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Transmutation',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'tongues',
    desc: (
      <>
        <p>
          This spell grants the creature you touch the ability to understand any
          spoken language it hears. Moreover, when the target speaks, any
          creature that knows at least one language and can hear the target
          understands what it says.
        </p>
      </>
    ),
    page: 'phb 283',
    range: 'Touch',
    components: 'V, M',
    material: 'A small clay model of a ziggurat.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Divination',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'transportViaPlants',
    desc: (
      <>
        <p>
          This spell creates a magical link between a Large or larger inanimate
          plant within range and another plant, at any distance, on the same
          plane of existence. You must have seen or touched the destination
          plant at least once before. For the duration, any creature can step
          into the target plant and exit from the destination plant by using 5
          feet of movement.
        </p>
      </>
    ),
    page: 'phb 283',
    range: '10 feet',
    components: 'V, S',
    ritual: false,
    duration: '1 round',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'trapTheSoul',
    desc: (
      <>
        <p>
          This spell name was added as an error and does not exist. Refer to the
          spell named "imprisonment" for information on what this spell was
          intended to be.
        </p>
      </>
    ),
    page: 'phb Error',
    range: '30 feet',
    components: 'V, S, M',
    ritual: false,
    duration: 'Until dispelled',
    concentration: false,
    casting_time: '1 minute',
    level: 8,
    school: 'Conjuration',
    class: ['wizard'],
  },
  {
    name: 'treeStride',
    desc: (
      <>
        <p>
          You gain the ability to enter a tree and move from inside it to inside
          another tree of the same kind within 500 feet. Both trees must be
          living and at least the same size as you. You must use 5 feet of
          movement to enter a tree. You instantly know the location of all other
          trees of the same kind within 500 feet and, as part of the move used
          to enter the tree, can either pass into one of those trees or step out
          of the tree you’re in. You appear in a spot of your choice within 5
          feet of the destination tree, using another 5 feet of movement. If you
          have no movement left, you appear within 5 feet of the tree you
          entered.
        </p>
        <p>
          You can use this transportation ability once per round for the
          duration. You must end each turn outside a tree.
        </p>
      </>
    ),
    page: 'phb 283',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Conjuration',
    class: ['cleric', 'druid', 'paladin', 'ranger'],
    archetype: {
      cleric: ['nature'],
      paladin: ['ancients'],
    },
    domains: ['nature'],
    circles: ['forest'],
    oaths: 'Ancients',
  },
  {
    name: 'truePolymorph',
    desc: (
      <>
        <p>
          Choose one creature or nonmagical object that you can see within
          range. You transform the creature into a different creature, the
          creature into an object, or the object into a creature (the object
          must be neither worn nor carried by another creature). The
          transformation lasts for the duration, or until the target drops to 0
          hit points or dies. If you concentrate on this spell for the full
          duration, the transformation becomes permanent.
        </p>
        <p>
          Shapechangers aren’t affected by this spell. An unwilling creature can
          make a wisdom saving throw, and if it succeeds, it isn’t affected by
          this spell.
        </p>
        <p>
          <b>Creature into Creature.</b> If you turn a creature into another
          kind of creature, the new form can be any kind you choose whose
          challenge rating is equal to or less than the target’s (or its level,
          if the target doesn’t have a challenge rating). The target’s game
          statistics, including mental ability scores, are replaced by the
          statistics of the new form. It retains its alignment and personality.
        </p>
        <p>
          The target assumes the hit points of its new form, and when it reverts
          to its normal form, the creature returns to the number of hit points
          it had before it transformed. If it reverts as a result of dropping to
          0 hit points, any excess damage carries over to its normal form. As
          long as the excess damage doesn’t reduce the creature’s normal form to
          0 hit points, it isn’t knocked unconscious.
        </p>
        <p>
          The creature is limited in the actions it can perform by the nature of
          its new form, and it can’t speak, cast spells, or take any other
          action that requires hands or speech unless its new form is capable of
          such actions.
        </p>
        <p>
          The target’s gear melds into the new form. The creature can’t
          activate, use, wield, or otherwise benefit from any of its equipment.
        </p>
        <p>
          <b>Object into Creature.</b> You can turn an object into any kind of
          creature, as long as the creature’s size is no larger than the
          object’s size and the creature’s challenge rating is 9 or lower. The
          creature is friendly to you and your companions. It acts on each of
          your turns. You decide what action it takes and how it moves. The DM
          has the creature’s statistics and resolves all of its actions and
          movement.
        </p>
        <p>
          If the spell becomes permanent, you no longer control the creature. It
          might remain friendly to you, depending on how you have treated it.
        </p>
        <p>
          <b>Creature into Object.</b> If you turn a creature into an object, it
          transforms along with whatever it is wearing and carrying into that
          form. The creature’s statistics become those of the object, and the
          creature has no memory of time spent in this form, after the spell
          ends and it returns to its normal form.
        </p>
      </>
    ),
    page: 'phb 283',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A drop of mercury, a dollop of gum arabic, and a wisp of smoke.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 9,
    school: 'Transmutation',
    class: ['bard', 'warlock', 'wizard'],
  },
  {
    name: 'trueResurrection',
    desc: (
      <>
        <p>
          You touch a creature that has been dead for no longer than 200 years
          and that died for any reason except old age. If the creature’s soul is
          free and willing, the creature is restored to life with all its hit
          points.
        </p>
        <p>
          This spell closes all wounds, neutralizes any poison, cures all
          diseases, and lifts any curses affecting the creature when it died.
          The spell replaces damaged or missing organs and limbs.
        </p>
        <p>
          The spell can even provide a new body if the original no longer
          exists, in which case you must speak the creature’s name. The creature
          then appears in an unoccupied space you choose within 10 feet of you.
        </p>
      </>
    ),
    page: 'phb 284',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A sprinkle of holy water and diamonds worth at least 25,000gp, which the spell consumes.',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 hour',
    level: 9,
    school: 'Necromancy',
    class: ['cleric', 'druid'],
  },
  {
    name: 'trueSeeing',
    desc: (
      <>
        <p>
          This spell gives the willing creature you touch the ability to see
          things as they actually are. For the duration, the creature has
          truesight, notices secret doors hidden by magic, and can see into the
          Ethereal Plane, all out to a range of 120 feet.
        </p>
      </>
    ),
    page: 'phb 284',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'An ointment for the eyes that costs 25gp; is made from mushroom powder, saffron, and fat; and is consumed by the spell.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Divination',
    class: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'trueStrike',
    desc: (
      <>
        <p>
          Extiendes la mano y apuntas con un dedo a un objetivo a tu alcance. Tu
          magia te concede una breve visión sobre las defensas de tu objetivo.
          En tu siguiente turno, obtienes ventaja en tu primera tirada de ataque
          contra el objetivo, siempre y cuando este conjuro no haya finalizado.
        </p>
      </>
    ),
    page: 'phb 284',
    range: '30 feet',
    components: 'S',
    ritual: false,
    duration: 'Up to 1 round',
    concentration: true,
    casting_time: '1 action',
    level: 0,
    school: 'Divination',
    class: ['bard', 'sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'tsunami',
    desc: (
      <>
        <p>
          A wall of water springs into existence at a point you choose within
          range. You can make the wall up to 300 feet long, 300 feet high, and
          50 feet thick. The wall lasts for the duration.
        </p>
        <p>
          When the wall appears, each creature within its area must make a
          strength saving throw. On a failed save, a creature takes 6 d10
          bludgeoning damage, or half as much damage on a successful save.
        </p>
        <p>
          At the start of each of your turns after the wall appears, the wall,
          along with any creatures in it, moves 50 feet away from you. Any Huge
          or smaller creature inside the wall or whose space the wall enters
          when it moves must succeed on a strength saving throw or take 5 d10
          bludgeoning damage. A creature can take this damage only once per
          round. At the end of the turn, the wall’s height is reduced by 50
          feet, and the damage creatures take from the spell on subsequent
          rounds is reduced by 1d10. When the wall reaches 0 feet in height, the
          spell ends.
        </p>
        <p>
          A creature caught in the wall can move by swimming. Because of the
          force of the wave, though, the creature must make a successful
          Strength (Athletics) check against your spell save DC in order to move
          at all. If it fails the check, it can’t move. A creature that moves
          out of the area falls to the ground.
        </p>
      </>
    ),
    page: 'phb 284',
    range: 'Sight',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 6 rounds',
    concentration: true,
    casting_time: '1 minute',
    level: 8,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'unseenServant',
    desc: (
      <>
        <p>
          Este conjuro crea una fuerza invisible, sin mente ni forma que lleva a
          cabo tareas sencillas bajo tu orden hasta que el conjuro finaliza. El
          sirviente aparece en un espacio existente desocupado en el suelo
          dentro del alcance. Tiene una CA de 10, 1 punto de golpe, una Fuerza
          de 2, y no puede atacar. Si baja a 0 Puntos de Golpe, el conjuro
          finaliza.
        </p>
        <p>
          En cada uno de tus turnos como acción adicional, puedes mandarle
          mentalmente al sirviente que se mueva hasta 15 pies (3 casillas, 4.5
          m) e interactúe con un objeto. El sirviente puede llevar a cabo tareas
          sencillas que un humano podría hacer, como buscar cosas, limpiar,
          reparar, doblar ropa, encender fuegos, traer comida, y servir vino.
          Una vez le des una orden, el sirviente lleva a cabo la tarea lo mejor
          posible en la medida de sus posibilidades hasta que la complete,
          después espera por tu siguiente orden.
        </p>
        <p>
          Si mandas al sirviente llevar a cabo una tarea que lo haría moverse a
          más de 60 pies (12 casillas, 18 m) lejos de ti, el conjuro finaliza.
        </p>
      </>
    ),
    page: 'phb 284',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A piece of string and a bit of wood.',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 1,
    school: 'Conjuration',
    class: ['bard', 'ritual caster', 'warlock', 'wizard'],
  },
  {
    name: 'vampiricTouch',
    desc: (
      <>
        <p>
          The touch of your shadow-wreathed hand can siphon life force from
          others to heal your wounds. Make a melee spell attack against a
          creature within your reach. On a hit, the target takes 3d6 necrotic
          damage, and you regain hit points equal to half the amount of necrotic
          damage dealt. Until the spell ends, you can make the attack again on
          each of your turns as an action.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 4th level or higher,
          the damage increases by 1d6 for each slot level above 3rd.
        </p>
      </>
    ),
    page: 'phb 285',
    range: 'Self',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Necromancy',
    class: ['warlock', 'wizard'],
  },
  {
    name: 'viciousMockery',
    desc: (
      <>
        <p>
          Sueltas una sarta de insultos unidos con imperceptibles encantamientos
          a una criatura que puedes ver dentro del alcance. Si tu objetivo puede
          oírte (aunque no necesita entenderte), debe superar una tirada de
          salvación de Sabiduría o sufrir 1d4 puntos de daño psíquico y tener
          desventaja en la siguiente tirada de ataque que haga antes del final
          de su siguiente turno.
        </p>
        <p>
          El daño de este conjuro se incrementa en 1d4 cuando llegas a nivel 5
          (2d4), nivel 11 (3d4) y nivel 17 (4d4).
        </p>
      </>
    ),
    page: 'phb 285',
    range: '60 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 0,
    school: 'Enchantment',
    class: ['bard'],
  },
  {
    name: 'wallOfFire',
    desc: (
      <>
        <p>
          You create a wall of fire on a solid surface within range. You can
          make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a
          ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick.
          The wall is opaque and lasts for the duration.
        </p>
        <p>
          When the wall appears, each creature within its area must make a
          Dexterity saving throw. On a failed save, a creature takes 5d8 fire
          damage, or half as much damage on a successful save.
        </p>
        <p>
          One side of the wall, selected by you when you cast this spell, deals
          5d8 fire damage to each creature that ends its turn within 10 feet o f
          that side or inside the wall. A creature takes the same damage when it
          enters the wall for the first time on a turn or ends its turn there.
          The other side o f the wall deals no damage.
        </p>
        <p>The other side of the wall deals no damage.</p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a level spell slot 5 or more, the
          damage of the spell increases by 1d8 for each level of higher spell
          slot to 4.
        </p>
      </>
    ),
    page: 'phb 285',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A small piece of phosphorus.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 4,
    school: 'Evocation',
    class: ['cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    archetype: {
      cleric: ['light'],
      warlock: ['fiend'],
    },
    domains: ['light'],
    patrons: ['fiend'],
  },
  {
    name: 'wallOfForce',
    desc: (
      <>
        <p>
          An invisible wall of force springs into existence at a point you
          choose within range. The wall appears in any orientation you choose,
          as a horizontal or vertical barrier or at an angle. It can be free
          floating or resting on a solid surface. You can form it into a
          hemispherical dome or a sphere with a radius of up to 10 feet, or you
          can shape a flat surface made up of ten 10-foot-by-10-foot panels.
          Each panel must be contiguous with another panel. In any form, the
          wall is 1/4 inch thick. It lasts for the duration. If the wall cuts
          through a creature’s space when it appears, the creature is pushed to
          one side of the wall (your choice which side).
        </p>
        <p>
          Nothing can physically pass through the wall. It is immune to all
          damage and can’t be dispelled by dispel magic. A disintegrate spell
          destroys the wall instantly, however. The wall also extends into the
          Ethereal Plane, blocking ethereal travel through the wall.
        </p>
      </>
    ),
    page: 'phb 285',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A pinch of powder made by crushing a clear gemstone.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: 'wallOfIce',
    desc: (
      <>
        <p>
          You create a wall of ice on a solid surface within range. You can form
          it into a hemispherical dome or a sphere with a radius of up to 10
          feet, or you can shape a flat surface made up of ten 10-foot-square
          panels. Each panel must be contiguous with another panel. In any form,
          the wall is 1 foot thick and lasts for the duration.
        </p>
        <p>
          If the wall cuts through a creature’s space when it appears, the
          creature within its area is pushed to one side of the wall and must
          make a dexterity saving throw. On a failed save, the creature takes
          10d6 cold damage, or half as much damage on a successful save.
        </p>
        <p>
          The wall is an object that can be damaged and thus breached. It has AC
          12 and 30 hit points per 10-foot section, and it is vulnerable to fire
          damage. Reducing a 10-foot section of wall to 0 hit points destroys it
          and leaves behind a sheet of frigid air in the space the wall
          occupied. A creature moving through the sheet of frigid air for the
          first time on a turn must make a constitution saving throw. That
          creature takes 5d6 cold damage on a failed save, or half as much
          damage on a successful one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          the damage the wall deals when it appears increases by 2d6, and the
          damage from passing through the sheet of frigid air increases by 1d6,
          for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 285',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A small piece of quartz.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Evocation',
    class: ['wizard'],
  },
  {
    name: 'wallOfStone',
    desc: (
      <>
        <p>
          A nonmagical wall of solid stone springs into existence at a point you
          choose within range. The wall is 6 inches thick and is composed of ten
          10-foot-by-10-foot panels. Each panel must be contiguous with at least
          one other panel. Alternatively, you can create 10-foot-by-20-foot
          panels that are only 3 inches thick.
        </p>
        <p>
          If the wall cuts through a creature’s space when it appears, the
          creature is pushed to one side of the wall (your choice). If a
          creature would be surrounded on all sides by the wall (or the wall and
          another solid surface), that creature can make a dexterity saving
          throw. On a success, it can use its reaction to move up to its speed
          so that it is no longer enclosed by the wall.
        </p>
        <p>
          The wall can have any shape you desire, though it can’t occupy the
          same space as a creature or object. The wall doesn’t need to be
          vertical or rest on any firm foundation. It must, however, merge with
          and be solidly supported by existing stone. Thus, you can use this
          spell to bridge a chasm or create a ramp.
        </p>
        <p>
          If you create a span greater than 20 feet in length, you must halve
          the size of each panel to create supports. You can crudely shape the
          wall to create crenellations, battlements, and so on.
        </p>
        <p>
          The wall is an object made of stone that can be damaged and thus
          breached. Each panel has AC 15 and 30 hit points per inch of
          thickness. Reducing a panel to 0 hit points destroys it and might
          cause connected panels to collapse at the DM’s discretion.
        </p>
        <p>
          If you maintain your concentration on this spell for its whole
          duration, the wall becomes permanent and can’t be dispelled.
          Otherwise, the wall disappears when the spell ends.
        </p>
      </>
    ),
    page: 'phb 287',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A small block of granite.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 5,
    school: 'Evocation',
    class: ['druid', 'sorcerer', 'wizard'],
    circles: ['desert', 'mountain'],
  },
  {
    name: 'wallOfThorns',
    desc: (
      <>
        <p>
          You create a wall of tough, pliable, tangled brush bristling with
          needle-sharp thorns. The wall appears within range on a solid surface
          and lasts for the duration. You choose to make the wall up to 60 feet
          long, 10 feet high, and 5 feet thick or a circle that has a 20-foot
          diameter and is up to 20 feet high and 5 feet thick. The wall blocks
          line of sight.
        </p>
        <p>
          When the wall appears, each creature within its area must make a
          dexterity saving throw. On a failed save, a creature takes 7d8
          piercing damage, or half as much damage on a successful save.
        </p>
        <p>
          A creature can move through the wall, albeit slowly and painfully. For
          every 1 foot a creature moves through the wall, it must spend 4 feet
          of movement. Furthermore, the first time a creature enters the wall on
          a turn or ends its turn there, the creature must make a dexterity
          saving throw. It takes 7d8 slashing damage on a failed save, or half
          as much damage on a successful one.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          When you cast this spell using a spell slot of 7th level or higher,
          both types of damage increase by 1d8 for each slot level above 6th.
        </p>
      </>
    ),
    page: 'phb 287',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A handful of thorns.',
    ritual: false,
    duration: 'Up to 10 minutes',
    concentration: true,
    casting_time: '1 action',
    level: 6,
    school: 'Conjuration',
    class: ['druid'],
  },
  {
    name: 'wardingBond',
    desc: (
      <>
        <p>
          Este conjuro protege a una criatura voluntaria que toques y crea una
          conexión mística entre el objetivo y tú hasta que el conjuro finalice.
          Mientras el objetivo se encuentre a 60 pies (12 casillas, 18 m) de ti,
          gana +1 de bonificación a la CA, en las tiradas de salvación, y tiene
          resistencia a todo el daño. También, cada vez que sufra daño, tú
          sufres la misma cantidad.
        </p>
        <p>
          El conjuro finaliza si caes a 0 Puntos de Golpe o si el objetivo y tú
          estáis separados más de 60 pies (12 casillas, 18 m). También finaliza
          si el conjuro es lanzado otra vez a cualquiera de las criaturas
          conectadas. Además puedes cancelar el conjuro como una acción
        </p>
      </>
    ),
    page: 'phb 287',
    range: 'Touch',
    components: 'V, S, M',
    material:
      'A pair of platinum rings worth at least 50gp each, which you and the target must wear for the duration.',
    ritual: false,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Abjuration',
    class: ['cleric'],
  },
  {
    name: 'waterBreathing',
    desc: (
      <>
        <p>
          This spell gives a maximum of ten willing creatures within range and
          you can see, the ability to breathe underwater until the end of its
          term. Affected creatures also retain their normal breathing pattern.
        </p>
      </>
    ),
    page: 'phb 287',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A short piece of reed or straw.',
    ritual: true,
    duration: '24 hours',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['druid', 'ranger', 'ritual caster', 'sorcerer', 'wizard'],
    circles: ['coast'],
  },
  {
    name: 'waterWalk',
    desc: (
      <>
        <p>
          This spell grants the ability to move across any liquid surface—such
          as water, acid, mud, snow, quicksand, or lava—as if it were harmless
          solid ground (creatures crossing molten lava can still take damage
          from the heat). Up to ten willing creatures you can see within range
          gain this ability for the duration.
        </p>
        <p>
          If you target a creature submerged in a liquid, the spell carries the
          target to the surface of the liquid at a rate of 60 feet per round.
        </p>
      </>
    ),
    page: 'phb 287',
    range: '30 feet',
    components: 'V, S, M',
    ritual: true,
    duration: '1 hour',
    concentration: false,
    casting_time: '1 action',
    level: 3,
    school: 'Transmutation',
    class: ['cleric', 'druid', 'ranger', 'ritual caster', 'sorcerer'],
    circles: ['coast', 'swamp'],
  },
  {
    name: 'web',
    desc: (
      <>
        <p>
          Conjuras una gruesa masa de pegajosas redes en un punto de tu elección
          dentro del alcance. Las telarañas llenan un cubo de 20 pies (4
          casillas, 6 m) en ese punto durante toda la duración. Las telarañas
          son un terreno difícil y oscurecen ligeramente su área.
        </p>
        <p>
          Si las telarañas no están sujetas entre dos sólidas masas (como
          paredes o árboles) o extendidas en capas sobre el suelo, pared, o
          techo, la telaraña conjurada cae sobre sí misma, y el conjuro finaliza
          al terminar tu siguiente turno. Las telarañas se extienden en capas
          sobre una superficie plana que tiene una profundidad de 5 pies (1
          casilla, 1.5 m).
        </p>
        <p>
          Cada criatura que empieza su turno en las telarañas o que entre en
          ellas durante su turno debe realizar una tirada de salvación de
          Destreza. En una salvación fallida, la criatura queda neutralizada
          siempre y cuando permanezca en las telarañas o hasta que se libere.
        </p>
        <p>
          Una criatura neutralizada por las telarañas puede usar su acción para
          hacer una prueba de Fuerza contra la CD de tu salvación de conjuros.
          Si tiene éxito, ya no permanece neutralizada.
        </p>
        <p>
          Las telarañas son inflamables. Cualquier cubo de 5 pies (1 casilla,
          1.5 m) de telarañas expuestas al fuego se incendia en 1 asalto,
          infringiendo 2d4 puntos de daño por fuego a cualquier criatura que
          empieza su turno en el fuego.
        </p>
      </>
    ),
    page: 'phb 287',
    range: '60 feet',
    components: 'V, S, M',
    material: 'A bit of spiderweb.',
    ritual: false,
    duration: 'Up to 1 hour',
    concentration: true,
    casting_time: '1 action',
    level: 2,
    school: 'Conjuration',
    class: ['druid', 'sorcerer', 'wizard'],
    archetype: {
      druid: ['underdark'],
    },
    circles: ['underdark'],
  },
  {
    name: 'weird',
    desc: (
      <>
        <p>
          Drawing on the deepest fears of a group of creatures, you create
          illusory creatures in their minds, visible only to them. Each creature
          in a 30-foot-radius sphere centered on a point of your choice within
          range must make a wisdom saving throw. On a failed save, a creature
          becomes frightened for the duration. The illusion calls on the
          creature’s deepest fears, manifesting its worst nightmares as an
          implacable threat. At the start of each of the frightened creature’s
          turns, it must succeed on a wisdom saving throw or take 4 d10 psychic
          damage. On a successful save, the spell ends for that creature.
        </p>
      </>
    ),
    page: 'phb 288',
    range: '120 feet',
    components: 'V, S',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 9,
    school: 'Illusion',
    class: ['wizard'],
  },
  {
    name: 'windWalk',
    desc: (
      <>
        <p>
          You and up to ten willing creatures you can see within range assume a
          gaseous form for the duration, appearing as wisps of cloud. While in
          this cloud form, a creature has a flying speed of 300 feet and has
          resistance to damage from nonmagical weapons. The only actions a
          creature can take in this form are the Dash action or to revert to its
          normal form. Reverting takes 1 minute, during which time a creature is
          incapacitated and can’t move. Until the spell ends, a creature can
          revert to cloud form, which also requires the 1-minute transformation.
        </p>
        <p>
          If a creature is in cloud form and flying when the effect ends, the
          creature descends 60 feet per round for 1 minute until it lands, which
          it does safely. If it can’t land after 1 minute, the creature falls
          the remaining distance.
        </p>
      </>
    ),
    page: 'phb 288',
    range: '30 feet',
    components: 'V, S, M',
    material: 'Fire and holy water.',
    ritual: false,
    duration: '8 hours',
    concentration: false,
    casting_time: '1 minute',
    level: 6,
    school: 'Transmutation',
    class: ['druid'],
  },
  {
    name: 'windWall',
    desc: (
      <>
        <p>
          A wall of strong wind rises from the ground at a point you choose
          within range. You can make the wall up to 50 feet long, 15 feet high,
          and 1 foot thick. You can shape the wall in any way you choose so long
          as it makes one continuous path along the ground. The wall lasts for
          the duration.
        </p>
        <p>
          When the wall appears, each creature within its area must make a
          strength saving throw. A creature takes 3d8 bludgeoning damage on a
          failed save, or half as much damage on a successful one.
        </p>
        <p>
          The strong wind keeps fog, smoke, and other gases at bay. Small or
          smaller flying creatures or objects can’t pass through the wall.
          Loose, lightweight materials brought into the wall fly upward. Arrows,
          bolts, and other ordinary projectiles launched at targets behind the
          wall are deflected upward and automatically miss. (Boulders hurled by
          giants or siege engines, and similar projectiles, are unaffected.)
          Creatures in gaseous form can’t pass through it.
        </p>
      </>
    ),
    page: 'phb 288',
    range: '120 feet',
    components: 'V, S, M',
    material: 'A tiny fan and a feather of exotic origin.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 3,
    school: 'Evocation',
    class: ['cleric', 'druid', 'ranger'],
    archetype: {
      cleric: ['nature'],
    },
    domains: ['nature'],
  },
  {
    name: 'wish',
    desc: (
      <>
        <p>
          Desire is the most powerful spell a deadly creature can throw. Simply
          by speaking aloud, you can alter the very foundations of reality as
          you wish.
        </p>
        <p>
          The most basic use of this spell is to duplicate any other out of 8th
          level or lower. You only need to fill out any conditions for that, not
          even the need for costly components. The fate simply takes effect. You
          can also create one of the following effects of your choice:
        </p>
        <p>
          - You create one object of up to 25,000 gp in value that isn’t a magic
          item. The object can be no more than 300 feet in any dimension, and it
          appears in an unoccupied space you can see on the ground.
        </p>
        <p>
          - You allow a maximum of twenty creatures you can see to get all their
          points and you dispel all effects affecting them, as described in
          greater restoration spell.
        </p>
        <p>
          - You grant to a maximum of ten creatures you can see resistance to a
          damage type you choose.
        </p>
        <p>
          - You grant to a maximum of ten creatures you can see immunity to a
          single spell or other magical effect for 8 hours. For example, you can
          immunize yourself and your companions against the attack of the Lich
          draining.
        </p>
        <p>
          - You cancel a recent event unique by requiring a new replacement jet
          diced any jet made during the last round (including your last turn).
          The reality is transformed to match the new launch. For example, a
          wish spell can cancel a successful saving throw enemy critical strike
          an opponent or ally saving throw missed. You can impose a jet with
          advantage or disadvantage, and you can choose to use the new result of
          the start or the old.
        </p>
        <p>
          You can also do other things than the above examples. Describe your
          wishes to your MD in the most accurate way possible. The DM is free to
          determine what happens in this case; more desire, the more likely it
          is that something goes wrong. This spell may simply fail, the effect
          you want might be only partially executed, or you may suffer from
          unpredictable consequences depending on your formulation wish. For
          example, want an enemy died could propel you to a future time when
          your enemy is no longer alive, you effectively eliminating the game.
          Similarly, desiring a legendary magical object or artifact could carry
          you instantaneously in the presence of the current owner of the
          object.
        </p>
        <p>
          Stress to cast this spell to produce an effect other than the
          reproduction of another spell weakens you. After undergoing this
          tension every time you cast a spell, and this until your next extended
          rest, you suffer 1d10 necrotic damage per spell level. This damage can
          not be reduced or avoided in any way. In addition, your Force falls to
          3, if it is not already less than 3, for 2d4 days. For each day spent
          resting or practicing a minor activity, your recovery time decreases
          by 2 days. Finally, you have a 33% chance of never being able to cast
          the spell if you wish undergoes stress.
        </p>
      </>
    ),
    page: 'phb 288',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 9,
    school: 'Conjuration',
    class: ['sorcerer', 'wizard'],
  },
  {
    name: 'witchBolt',
    desc: (
      <>
        <p>
          Un haz de chisporroteante energía azul es lanzado hacia una criatura
          dentro del alcance, formando un constante arco de relámpago entre el
          objetivo y tú. Haz un ataque de conjuro a distancia contra esa
          criatura. En un impacto, el objetivo sufre 1d12 puntos de daño por
          electricidad, y en cada uno de tus turnos mientras dure, puedes usar
          tu acción para realizar 1d12 puntos de daño por electrcidad al
          objetivo automáticamente. Este conjuro finaliza si usas tu acción para
          hacer otra cosa. Este conjuro también finaliza si el objetivo está
          alguna vez fuera del alcance del conjuro o si tiene cobertura total de
          ti.
        </p>
      </>
    ),
    higher_level: (
      <>
        <p>
          Cuando lanzas este hechizo usando un espacio de conjuros de nivel 2 o
          superior, el daño inicial se incrementa en 1d12 por cada nivel de
          espacio de conjuros por encima de nivel 1.
        </p>
      </>
    ),
    page: 'phb 289',
    range: '30 feet',
    components: 'V, S, M',
    material: 'A twig from a tree that has been struck by lightning.',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 action',
    level: 1,
    school: 'Evocation',
    class: ['sorcerer', 'warlock', 'wizard'],
  },
  {
    name: 'wordOfRecall',
    desc: (
      <>
        <p>
          You and up to five willing creatures within 5 feet of you instantly
          teleport to a previously designated sanctuary. You and any creatures
          that teleport with you appear in the nearest unoccupied space to the
          spot you designated when you prepared your sanctuary (see below). If
          you cast this spell without first preparing a sanctuary, the spell has
          no effect.
        </p>
        <p>
          You must designate a sanctuary by casting this spell within a
          location, such as a temple, dedicated to or strongly linked to your
          deity. If you attempt to cast the spell in this manner in an area that
          isn’t dedicated to your deity, the spell has no effect.
        </p>
      </>
    ),
    page: 'phb 289',
    range: '5 feet',
    components: 'V',
    ritual: false,
    duration: 'Instantaneous',
    concentration: false,
    casting_time: '1 action',
    level: 6,
    school: 'Conjuration',
    class: ['cleric'],
  },
  {
    name: 'wrathfulSmite',
    desc: (
      <>
        <p>
          La próxima vez que impactes con un arma de ataque de cuerpo a cuerpo
          durante la duración de este conjuro, tu ataque inflige 1d6 puntos de
          daño psíquico extra. Además, si el blanco es una criatura, debe hacer
          una tirada de salvación de Sabiduría o estar asustada de ti hasta que
          el conjuro finalice. Como una acción, la criatura puede realizar una
          prueba de Sabiduría contra la CD de tus conjuros para templar su
          resolución y finalizar este conjuro.
        </p>
      </>
    ),
    page: 'phb 289',
    range: 'Self',
    components: 'V',
    ritual: false,
    duration: 'Up to 1 minute',
    concentration: true,
    casting_time: '1 bonus action',
    level: 1,
    school: 'Evocation',
    class: ['paladin'],
  },
  {
    name: 'zoneOfTruth',
    desc: (
      <>
        <p>
          Creas una zona mágica que protege contra el engaño en una esfera de 15
          pies (3 casillas, 4.5. m) de radio centrado en un lugar de tu elección
          dentro del alcance. Hasta que el conjuro finalice, una criatura que
          entre en el área del conjuro por primera vez en un turno o empiece su
          turno allí debe realizar una tirada de salvación de Carisma. Con una
          salvación fracasada, la criatura no puede decir una mentira deliberada
          mientras esté en el radio. Tú sabes si cada criatura hace la tirada de
          salvación con éxito o si la falla.
        </p>
        <p>
          Una criatura afectada es consciente del conjuro y por consiguiente
          puede evitar responder preguntas las cuales normalmente respondería
          con una mentira. Una criatura puede ser evasiva en sus respuestas
          siempre y cuando permanezca dentro del límite de la verdad.
        </p>
      </>
    ),
    page: 'phb 289',
    range: '60 feet',
    components: 'V, S',
    ritual: false,
    duration: '10 minutes',
    concentration: false,
    casting_time: '1 action',
    level: 2,
    school: 'Enchantment',
    class: ['bard', 'cleric', 'paladin'],
    oaths: 'Devotion',
  },
];
