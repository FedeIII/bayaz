import random from '../random';

export const BUILDING_TYPES = [
  'residence',
  'religious',
  'tavern',
  'warehouse',
  'shop',
];

const BUILDING_SUBTYPES = {
  residence: [
    [
      2,
      'Casucha abandonada',
      [
        [75, 'Nadie dentro'],
        [25, 'Alguien dentro'],
      ],
    ],
    [
      6,
      'Hogar de clase media',
      [
        [75, 'Alguien dentro'],
        [25, 'Nadie dentro'],
      ],
    ],
    [
      2,
      'Hogar de clase alta',
      [
        [75, 'Alguien dentro'],
        [25, 'Nadie dentro'],
      ],
    ],
    [
      5,
      'Edificio de apartamentos abarrotado',
      [
        [30, 'Comunidad unida y amigable'],
        [25, 'Comunidad hostil y dividida'],
        [20, 'El dueño de todos los apartamentos vive en el mismo edificio'],
        [15, 'Comunidad extremadamente pobre'],
        [10, 'Un sector de la comunidad está involucrado en temas ilegales'],
      ],
    ],
    [
      2,
      'Orfanato',
      [
        [55, 'Mugriento'],
        [20, 'Llevado por un humilde benefactor'],
        [15, 'Volcado con los niños'],
        [10, 'Usado de tapadera para tráfico de niños'],
      ],
    ],
    [
      1,
      'Antro para esclavos oculto',
      [
        [50, 'Negocio legítimo como tapadera'],
        [20, 'Ilusión mágica como tapadera'],
        [
          20,
          'Edificio aparentemente abandonado con pasadizo secreto a una mazmorra',
        ],
        [10, 'Tráfico oculto tras varias capas de burocracia sin sentido'],
      ],
    ],
    [
      1,
      'Tapadera para una secta secreta',
      [
        [30, 'Secta anti-progreso, para preservar la sociedad'],
        [20, 'Secta pro-progreso, para arriesgarse a avanzar la sociedad'],
        [
          15,
          'Secta que secuestran a víctimas para sacrificios (a dios de la Materia)',
        ],
        [
          13,
          'Secta de experimentos para transferencia de energía vital (a dios de la Energía)',
        ],
        [
          12,
          'Secta de control mental. Intentan afectar al gobierno local (a dios del Espíritu)',
        ],
        [
          10,
          'Secta de suicidas. Intentan hacer desaparecer el asentamiento (a dios del Espacio)',
        ],
      ],
    ],
    [
      1,
      'Mansión lujosa y bien protegida',
      [
        [30, 'Miembros del gobierno'],
        [20, 'Familia noble'],
        [20, 'Una próspera familia criminal'],
        [15, 'Familia de un gran mercader'],
        [15, 'Grandes benefacores del clero'],
      ],
    ],
  ],

  religious: [
    [
      4,
      'Templo a Materia',
      [
        [20, 'Abandonado'],
        [20, 'Sencillo'],
        [20, 'Normal'],
        [20, 'Lujoso'],
        [20, 'Divino'],
      ],
    ],
    [
      3,
      'Templo a Energía',
      [
        [20, 'Abandonado'],
        [20, 'Sencillo'],
        [20, 'Normal'],
        [20, 'Lujoso'],
        [20, 'Divino'],
      ],
    ],
    [
      2,
      'Templo a Espíritu',
      [
        [20, 'Abandonado'],
        [20, 'Sencillo'],
        [20, 'Normal'],
        [20, 'Lujoso'],
        [20, 'Divino'],
      ],
    ],
    [
      1,
      'Templo a Espacio',
      [
        [20, 'Abandonado'],
        [20, 'Sencillo'],
        [20, 'Normal'],
        [20, 'Lujoso'],
        [20, 'Divino'],
      ],
    ],
    [
      2,
      'Templo a una deidad falsa (dirigido por sacerdotes embusteros)',
      [
        [25, 'Ilusionistas creando efectos falsos para ganar dinero'],
        [
          25,
          'Falsos adivinos del futuro. Timadores carismáticos que intentan decirle a la víctima lo que quiere oir',
        ],
        [
          25,
          'Clérigos y brujos timadores, intentando sacar dinero a la gente a base de conjuros de control mental',
        ],
        [
          25,
          'Falsos curanderos. Se ofrecen a curar a grupos e intentan siempre timar al menos a uno de los miembros',
        ],
      ],
    ],
    [
      1,
      'Hogar de ascetas',
      [
        [20, 'Los ascetas ofrecen meditación que da inspiración'],
        [20, 'Los ascetas ofrecen una cura leve'],
        [
          20,
          'Los ascetas ofrecen sabiduría local, aclarando dudas sobre gobierno, costumbres y secretos del entorno',
        ],
        [
          20,
          'Los ascetas ofrecen la posibilidad de entablar conversación con el Dios del Espíritu',
        ],
        [
          20,
          'Los ascetas ofrecen un ritual del té que si termina, da a los jugadores resistencias adecuadas',
        ],
      ],
    ],
    [
      2,
      'Santuario abandonado',
      [
        [
          30,
          'DC 15 Religión (Int), un jugador puede averiguar pistas sobre un dios concreto (dios basado en el asentamiento y quests actuales)',
        ],
        [
          25,
          'DC 15 Investigación (Int), un jugador puede averiguar información cartográfica de la zona',
        ],
        [
          20,
          'DC 15 Historia (Int), un jugador puede averiguar información sobre la civilización anterior en la zona',
        ],
        [
          15,
          'DC 15 Naturaleza (Int), un jugador puede averiguar información sobre animales o plantas que los jugadores necesiten o nueva información para empezar una futura quest',
        ],
        [
          10,
          'DC 15 C. Arcano (Int), un jugador puede averiguar información mágica sobre un hechizo u objeto que pueda usar para desbloquear una futura quest',
        ],
        [
          5,
          'DC 15 Percepción (Wis), un jugador puede averiguar pistas sobre la actuación de algún grupo criminal del asentamiento o alrededores',
        ],
      ],
    ],
    [
      2,
      'Biblioteca',
      [
        [40, 'Especializada en Historia'],
        [30, 'Especializada en Ingeniería'],
        [20, 'Especializada en Teología'],
      ],
    ],
    [
      1,
      'Santuario oculto dedicado a un infernal o deidad malvada',
      [
        [50, 'Abandonado'],
        [
          15,
          'Los jugadores interrumpen un ritual de invocación de un infernal, con el que puede que se tengan que enfrentar',
        ],
        [
          15,
          `El santuario tiene una trampa. DC 20 Percepción pasiva (o DC 15 Percepción (Wis) o DC 15 C. Arcano) detectar la trampa. Si los jugadores caen, checkeo de C. Arcano para ver cuanto tardan en descifrar la forma de salir en las runas:
          20+ instantaneo, 15+ 30min, 10+ 2h, 5+ 5h, 1+ 1d
          La forma de salir es hacer un sacrificio de sangre (-1d6 de daño) frente al altar`,
        ],
        [
          15,
          'El santuario ofrece visiones de conocimiento muy encriptado sobre algún tema local',
        ],
        [
          5,
          'Uno de los dioses se aparece ofreciendo una quest para reducir el poder de otro de los dioses',
        ],
      ],
    ],
  ],

  tavern: [
    [
      6,
      'Antro estridente',
      [
        [50, 'Lo de siempre'],
        [25, 'Actuación musical'],
        [15, 'Gran fiesta'],
        [5, 'Clientela acosadora de una raza/genero de la Party'],
        [5, 'Una pelea'],
      ],
    ],
    [
      4,
      'Bar tranquilo y de perfil bajo',
      [
        [50, 'Los clientes se giran a mirar a los PCs al entrar'],
        [50, 'Nadie repara en los PCs al entrar'],
      ],
    ],
    [
      1,
      'Lugar de reunión de un gremio',
      [
        [50, 'De ladrones'],
        [50, 'De asesinos'],
      ],
    ],
    [
      1,
      'Lugar de encuentro de una sociedad secreta (buena/mala)',
      [
        [20, 'Religiosa'],
        [20, 'Política'],
        [20, 'Social'],
        [20, 'De vigilantes'],
      ],
    ],
    [
      2,
      'Club de cenas de la clase alta',
      [
        [85, 'Los PCs necesitan una buena excusa para quedarse'],
        [15, 'Los PCs pasan desapercibidos'],
      ],
    ],
    [
      2,
      'Casa de apuestas',
      [
        [50, 'Civilizada'],
        [
          20,
          'Timador intenta convencer a los PCs para que apuesten y ganar dinero',
        ],
        [15, 'Los PCs atraen la atención de un corredor de apuestas ilegales'],
        [10, 'Un atraco ocurre mientras los PCs están dentro'],
        [5, 'Con pelea entre cliente y seguridad'],
      ],
    ],
    [
      2,
      'Clientela de una raza o gremio concretos',
      [
        [50, 'Los PCs son bienvenidos'],
        [50, 'Los PCs son recibidos con hostilidad'],
      ],
    ],
    [
      1,
      'Club solo para miembros',
      [
        [50, 'Con seguridad en la recepción'],
        [50, 'Con recepción sin seguridad'],
      ],
    ],
    [
      2,
      'Burdel',
      [
        [50, 'Íntimo'],
        [50, 'Público'],
      ],
    ],
  ],

  warehouse: [
    [
      4,
      'Vacío o abandonado',
      [
        [75, 'Completamente abandonado'],
        [25, 'Vagabundo viviendo ahí'],
      ],
    ],
    [
      2,
      'Bien protegido, productos valiosos',
      [
        [50, 'Seguridad vigila a los PCs'],
        [50, 'Seguridad echa a los PCs'],
      ],
    ],
    [
      4,
      'Productos baratos',
      [
        [75, 'Sin seguridad permanente'],
        [25, 'Con seguridad laxa'],
      ],
    ],
    [
      4,
      'Productos a granel',
      [
        [75, 'Sin seguridad permanente'],
        [25, 'Con seguridad laxa'],
      ],
    ],
    [
      1,
      'Animales vivos',
      [
        [75, 'Ganado/granja'],
        [10, 'Exóticos'],
        [10, 'Fantásticos'],
        [5, 'Un sólo animal muy grande'],
      ],
    ],
    [
      2,
      'Armas o armaduras',
      [
        [50, 'Seguridad vigila a los PCs'],
        [50, 'Seguridad echa a los PCs'],
      ],
    ],
    [
      2,
      'Bienes de una tierra lejana',
      [
        [50, 'Seguridad vigila a los PCs'],
        [50, 'Seguridad echa a los PCs'],
      ],
    ],
    [
      1,
      'Cubil secreto de contrabandistas',
      [
        [
          75,
          'Emboscada de los contrabandistas. DC 20 Percepción (Wis) para darse cuenta de ella a tiempo',
        ],
        [
          50,
          'Amenaza verbal. Los contrabandistas buscan soborno material o de informacion a cambio de dejar en paz a los PCs',
        ],
        [33, 'El contrabando lo dirige el gobierno'],
        [
          25,
          'Los PCs son sorprendidos por las autoridades. Los guardias creerán que los PCs son los contrabandistas',
        ],
        [
          20,
          'Los contrabandistas están hablando de su negocio sin darse cuenta inicialmente de los PCs. Sigilo (Dex) de los PCs vs Percepción (Wis) de los contrabandistas',
        ],
      ],
    ],
  ],

  /* prettier-ignore */
  shop: [
    [3, 'Casa de empeños', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Hierbas/inciensos', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Frutas/verduras', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Comida en salazón', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Alfarero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [2, 'Enterrador', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [3, 'Librero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [2, 'Prestamista', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [2, 'Armas/armaduras', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Candelero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [2, 'Herrero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Carpintero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Costurero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [2, 'Joyero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Panadero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [1, 'Cartógrafo', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Sastre', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Cordelero', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [4, 'Albañil', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
    [3, 'Escriba', [[50, 'El negocio va bien'], [50, 'El negocio va mal']]],
  ],
};

export function createRandomBuilding(filters) {
  const type = random.element(
    filters.types.length ? filters.types : BUILDING_TYPES
  );

  const subtype = random.split(BUILDING_SUBTYPES[type]);

  const variant = random.split(
    BUILDING_SUBTYPES[type].find(subtypeDef => subtypeDef[1] === subtype)[2]
  );

  return {
    type,
    subtype,
    variant,
  };
}
