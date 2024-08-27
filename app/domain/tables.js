export async function getTable(search) {
  const lowercaseSearch = search.toLowerCase();
  return TABLES.filter(
    table =>
      table.name.toLowerCase().includes(lowercaseSearch) ||
      table.keywords.some(keyword => keyword.includes(lowercaseSearch)) ||
      table.rows.some(row =>
        Object.entries(row).some(
          ([key, value]) =>
            key.toLowerCase().includes(lowercaseSearch) ||
            value.toLowerCase().includes(lowercaseSearch)
        )
      )
  );
}

export const TABLES = [
  {
    name: 'Gastos por nivel de vida',
    keywords: [],
    rows: [
      {
        'Nivel de vida': 'Deplorable',
        'Coste por día': '---',
      },
      {
        'Nivel de vida': 'Miserable',
        'Coste por día': '1 pp',
      },
      {
        'Nivel de vida': 'Pobre',
        'Coste por día': '2 pp',
      },
      {
        'Nivel de vida': 'Modesto',
        'Coste por día': '1 po',
      },
      {
        'Nivel de vida': 'Cómodo',
        'Coste por día': '2 po',
      },
      {
        'Nivel de vida': 'Lujoso',
        'Coste por día': '4 po',
      },
      {
        'Nivel de vida': 'Aristocrático',
        'Coste por día': '10+ po',
      },
    ],
  },

  {
    name: 'Irse de juerga',
    keywords: ['fiesta'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        'd100 + nivel': '01 - 10',
        Resultado:
          'Acabas encarcelado durante ld4 días una vez termina el periodo de la actividad. Se te acusa de conducta inmoral y alteración del orden público. Puedes pagar una fianza de 10 po para evitar pasar tiempo en la cárcel. También puedes intentar resistirte al arresto.',
      },
      {
        'd100 + nivel': '11 - 20',
        Resultado:
          'Recobras la consciencia en un lugar desconocido y sin recordar cómo has llegado hasta él. Te han robado 3d6 x 5 po.',
      },
      {
        'd100 + nivel': '21 - 30',
        Resultado:
          'Te has creado un enemigo. Esta persona, negocio u organización es ahora hostil hacia ti. El DM decide a quién (o qué) has ofendido, pero tú eliges cómo lo agraviaste.',
      },
      {
        'd100 + nivel': '31 - 40',
        Resultado:
          'Te ves atrapado en un romance tempestuoso. Tira 1d20. Si sacas de 1 a 5, la cosa acaba mal. Si sacas de 6 a 10, el romance termina de forma amistosa. Si sacas de 11 a 20, la relación no ha terminado todavía. Tú escoges la identidad del interés romántico, pero tu DM debe aprobar la elección. Si el amorío acabó mal, podrías recibir un defecto nuevo. Si terminó bien o aún no ha finalizado, tu interés romántico podría convertirse en un vínculo nuevo.',
      },
      {
        'd100 + nivel': '41 - 80',
        Resultado:
          'Obtienes unas ganancias modestas apostando. Recuperas los gastos relativos al nivel de vida de los días que pasaste de juerga.',
      },
      {
        'd100 + nivel': '81 - 90',
        Resultado:
          'Obtienes unas ganancias modestas apostando. Recuperas los gastos relativos al nivel de vida de los días que pasaste de juerga y además ganas 1d20 x 4 po',
      },
      {
        'd100 + nivel': '91+',
        Resultado:
          'Ganas una pequeña fortuna apostando. Recuperas los gastos relativos al nivel de vida de los días que pasaste de juerga y además ganas 4d6 x 10 po. Tus juergas son legendarias y serán recordadas en el lugar.',
      },
    ],
  },

  {
    name: 'Comida, bebida y alojamiento',
    keywords: ['servicios', 'alimentos'],
    rows: [
      {
        Objeto: 'Banquete (por persona)',
        Precio: '10 po',
      },
      {
        Objeto: 'Carne, trozo',
        Precio: '3 pp',
      },
      {
        Objeto: 'Cerveza',
        Precio: '',
      },
      {
        Objeto: ' · · Galón',
        Precio: '2 pp',
      },
      {
        Objeto: ' · · Jarra',
        Precio: '4 pc',
      },
      {
        Objeto: 'Comida (por día)',
        Precio: '',
      },
      {
        Objeto: ' · · Miserable',
        Precio: '3 pc',
      },
      {
        Objeto: ' · · Pobre',
        Precio: '6 pc',
      },
      {
        Objeto: ' · · Modesta',
        Precio: '3 pp',
      },
      {
        Objeto: ' · · Cómoda',
        Precio: '5 pp',
      },
      {
        Objeto: ' · · Lujosa',
        Precio: '8 pp',
      },
      {
        Objeto: ' · · Aristocrática',
        Precio: '2 po',
      },
      {
        Objeto: 'Estancia en posada (por día)',
        Precio: '',
      },
      {
        Objeto: ' · · Miserable',
        Precio: '7 pc',
      },
      {
        Objeto: ' · · Pobre',
        Precio: '1 pp',
      },
      {
        Objeto: ' · · Modesta',
        Precio: '5 pp',
      },
      {
        Objeto: ' · · Cómoda',
        Precio: '8 pp',
      },
      {
        Objeto: ' · · Lujosa',
        Precio: '2 po',
      },
      {
        Objeto: ' · · Aristocrática',
        Precio: '4 po',
      },
      {
        Objeto: 'Pan, hogaza',
        Precio: '2 pc',
      },
      {
        Objeto: 'Queso, trozo',
        Precio: '1 pp',
      },
      {
        Objeto: 'Vino',
        Precio: '',
      },
      {
        Objeto: ' · · Común (jarra)',
        Precio: '2 pp',
      },
      {
        Objeto: ' · · De calidad (botella)',
        Precio: '10 po',
      },
    ],
  },

  {
    name: 'Entidades militares',
    keywords: ['unidades', 'tamaño', 'grupos', 'mando'],
    rows: [
      {
        Entidad: 'Binomio',
        Mando: 'Soldado',
        Personal: '2',
      },
      {
        Entidad: 'Escuadra',
        Mando: 'Cabo',
        Personal: '4-6',
      },
      {
        Entidad: 'Pelotón',
        Mando: 'Sargento',
        Personal: '8-15',
      },
      {
        Entidad: 'Sección',
        Mando: 'Teniente',
        Personal: '20-40',
      },
      {
        Entidad: `Compañía, Escuadrón (caballería)`,
        Mando: 'Capitán, Comandante (caballería)',
        Personal: '60-200',
      },
      {
        Entidad: 'Batallón',
        Mando: 'Teniente coronel',
        Personal: '300-700',
      },
      {
        Entidad: 'Regimiento',
        Mando: 'Coronel',
        Personal: '700-2.000',
      },
      {
        Entidad: 'Brigada',
        Mando: 'General de brigada',
        Personal: '3.000-6.000',
      },
      {
        Entidad: 'División',
        Mando: 'General de división',
        Personal: '10.000-15.000',
      },
    ],
  },

  {
    name: 'Tesoro Personal - CR 0-4 (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        d100: '01-30',
        PC: '5d6 (17)',
        PP: '--',
        PE: '--',
        PO: '--',
        PPT: '--',
      },
      {
        d100: '31-60',
        PC: '--',
        PP: '4d6 (14)',
        PE: '--',
        PO: '--',
        PPT: '--',
      },
      {
        d100: '61-70',
        PC: '--',
        PP: '--',
        PE: '3d6 (10)',
        PO: '--',
        PPT: '--',
      },
      {
        d100: '71-95',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '3d6 (10)',
        PPT: '--',
      },
      {
        d100: '96-00',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '--',
        PPT: '1d6 (3)',
      },
    ],
  },

  {
    name: 'Tesoro Personal - CR 5-10 (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        d100: '01-30',
        PC: '4d6 * 100 (1.400)',
        PP: '--',
        PC: '1d6 * 10 (35)',
        PO: '--',
        PPT: '--',
      },
      {
        d100: '31-60',
        PC: '--',
        PP: '6d6 * 10 (210)',
        PE: '--',
        PO: '2d6 * 10 (70)',
        PPT: '--',
      },
      {
        d100: '61-70',
        PC: '--',
        PP: '--',
        PE: '3d6 * 10 (105)',
        PO: '2d6 * 10 (70)',
        PPT: '--',
      },
      {
        d100: '71-95',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '4d6 * 10 (140)',
        PPT: '--',
      },
      {
        d100: '96-00',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '2d6 * 10 (70)',
        PPT: '3d6 (10)',
      },
    ],
  },

  {
    name: 'Tesoro Personal - CR 11-16 (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        d100: '01-20',
        PC: '--',
        PP: '4d6 * 100 (1.400)',
        PC: '--',
        PO: '1d6 * 100 (350)',
        PPT: '--',
      },
      {
        d100: '21-35',
        PC: '--',
        PP: '--',
        PE: '1d6 * 100 (350)',
        PO: 'ld6 * 100 (350)',
        PPT: '--',
      },
      {
        d100: '36-75',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '2d6 * 100 (700)',
        PPT: '1d6 * 10 (35)',
      },
      {
        d100: '76-00',
        PC: '--',
        PP: '--',
        PE: '--',
        PO: '2d6 * 100 (700)',
        PPT: '2d6 * 10 (70)',
      },
    ],
  },

  {
    name: 'Tesoro Acumulado - CR 0-4 Monedas (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        '': 'Monedas',
        PC: '6d6 * 100 (2.100)',
        PP: '3d6 * 100 (1.050)',
        PC: '--',
        PO: '2d6 * 10 (70)',
        PPT: '--',
      },
    ],
  },

  {
    name: 'Tesoro Acumulado - CR 0-4 (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        d1OO: '01-06',
        'Gemas u obras de arte': '--',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '07-16',
        'Gemas u obras de arte': '2d6 (7) gemas por valor de 10 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '17-26',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '27-36',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 50 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '37-44',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 1O po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '45-52',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '53-60',
        'Gemas u obras de arte': '2d6 (7) gemas de va lor 50 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '61-65',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 1O po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '66-70',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '71-75',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '76-78',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 10 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '79-80',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '81-85',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '86-92',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '93-97',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '98-99',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos G',
      },
      {
        d1OO: '00',
        'Gemas u obras de arte': '2d6 (7) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos G',
      },
    ],
  },

  {
    name: 'Tesoro Acumulado - CR 5-10 Monedas (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        '': 'Monedas',
        PC: '2d6 * 100 (700)',
        PP: '2d6 * 1,000 (7.000)',
        PC: '--',
        PO: '6d6 * 100 (2.100)',
        PPT: '3d6 * 10 (105)',
      },
    ],
  },

  {
    name: 'Tesoro Acumulado - CR 0-4 (Resultados / 2)',
    keywords: ['recompensa', 'loot'],
    rows: [
      {
        d1OO: '01-04',
        'Gemas u obras de arte': '--',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '05-10',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '11-16',
        'Gemas u obras de arte': '3d6 (1O) gemas de valor 50 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '17-22',
        'Gemas u obras de arte': '3d6 (1O) gemas de valor 100 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '23-28',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': '--',
      },
      {
        d1OO: '29-32',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '33-36',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '37-40',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '41-44',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira 1d6 veces en la tabla de objetos mágicos A',
      },
      {
        d1OO: '45-49',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '50-54',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '55-59',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos B',
      },
      {
        d1OO: '60-63',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces e n la tabla de objetos mágicos B',
      },
      {
        d1OO: '64-66',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '67-69',
        'Gemas u obras de arte': '3d6 (10) gemas de va lor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '70-72',
        'Gemas u obras de arte': '3d6 (10) gemas de va lor 100 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '73-74',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos C',
      },
      {
        d1OO: '75-76',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos D',
      },
      {
        d1OO: '77-78',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos D',
      },
      {
        d1OO: '79',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos D',
      },
      {
        d1OO: '80',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos D',
      },
      {
        d1OO: '81-84',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 25 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '85-88',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 50 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '89-91',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '92-94',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos F',
      },
      {
        d1OO: '95-96',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos G',
      },
      {
        d1OO: '97-98',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira 1d4 veces en la tabla de objetos mágicos G',
      },
      {
        d1OO: '99',
        'Gemas u obras de arte': '3d6 (10) gemas de valor 100 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos H',
      },
      {
        d1OO: '00',
        'Gemas u obras de arte': '2d4 (5) obras de arte de 250 po cada una',
        'Objetos mágicos': 'Tira una vez en la tabla de objetos mágicos H',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 10 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d12: '1',
        'Descripción de la gema': 'Azurita (opaca, azul oscuro moteado)',
      },
      {
        d12: '2',
        'Descripción de la gema':
          'Ágata con franjas (translúcida, con rayas marrones, azules, blancas o rojas)',
      },
      {
        d12: '3',
        'Descripción de la gema': 'Cuarzo azul (transparente, azul pálido)',
      },
      {
        d12: '4',
        'Descripción de la gema':
          'Ojo de ágata (translúcido, círculos grises, blancos, marrones, azules o verdes)',
      },
      {
        d12: '5',
        'Descripción de la gema': 'Hematita (opaca, gris-negra)',
      },
      {
        d12: '6',
        'Descripción de la gema':
          'Lapislázuli (opaco, azul claro y oscuro con motas amarillas)',
      },
      {
        d12: '7',
        'Descripción de la gema':
          'Malaquita (opaca, estrías de verde claro y oscuro)',
      },
      {
        d12: '8',
        'Descripción de la gema':
          'Ágata musgosa (translúcida, rosa o blanco amarillento con trazos musgosos verdes o grises',
      },
      {
        d12: '9',
        'Descripción de la gema': 'Obsidiana (opaca, negro)',
      },
      {
        d12: '10',
        'Descripción de la gema': 'Rodocrosita (opaca, rosa pálido)',
      },
      {
        d12: '11',
        'Descripción de la gema':
          'Ojo de tigre (translúcido, marrón con núcleo dorado)',
      },
      {
        d12: '12',
        'Descripción de la gema': 'Turquesa (opaca, azul-verde claro)',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 50 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d12: '1',
        'Descripción de la gema':
          'Jaspe sanguíneo (opaco, gris oscuro con motas rojas)',
      },
      {
        d12: '2',
        'Descripción de la gema':
          'Cornalina (opaca, de naranja a marrón rojizo)',
      },
      {
        d12: '3',
        'Descripción de la gema': 'Calcedonia (opaca, blanco)',
      },
      {
        d12: '4',
        'Descripción de la gema': 'Crisoprasa (translúcida, verde)',
      },
      {
        d12: '5',
        'Descripción de la gema':
          'Citrino (transparente, amarillo-marrón pálido)',
      },
      {
        d12: '6',
        'Descripción de la gema': 'Jaspe (opaco, azul, negro o marrón) ',
      },
      {
        d12: '7',
        'Descripción de la gema':
          'Piedra de luna (translúcida, blanco con brillos azulados)',
      },
      {
        d12: '8',
        'Descripción de la gema':
          'Ónice (opaco, blanco, negro, o con franjas de ambos colores)',
      },
      {
        d12: '9',
        'Descripción de la gema':
          'Cuarzo (transparente, blanco, gris turbio o amarillo)',
      },
      {
        d12: '10',
        'Descripción de la gema': 'Sardónice (opaco, franjas rojas y blancas)',
      },
      {
        d12: '11',
        'Descripción de la gema':
          'Cuarzo rosa estrellado (translúcido, piedra rosácea con núcleo en forma de estrella blanca)',
      },
      {
        d12: '12',
        'Descripción de la gema':
          'Zirconita (transparente, azul verdoso pálido)',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 100 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d10: '1',
        'Descripción de la gema':
          'Ámbar (transparente, dorado acuoso a dorado profundo)',
      },
      {
        d10: '2',
        'Descripción de la gema': 'Amatista (transparente, púrpura profundo)',
      },
      {
        d10: '3',
        'Descripción de la gema':
          'Crisoberilo (transparente, de amarillo verdoso a verde pálido)',
      },
      {
        d10: '4',
        'Descripción de la gema': 'Coral (opaco, carmesí)',
      },
      {
        d10: '5',
        'Descripción de la gema':
          'Granate (transparente, rojo, marrón verdoso o violeta)',
      },
      {
        d10: '6',
        'Descripción de la gema':
          'Jade (translúcido, verde claro, verde oscuro o blanco)',
      },
      {
        d10: '7',
        'Descripción de la gema': 'Azabache (opaco, negro profundo)',
      },
      {
        d10: '8',
        'Descripción de la gema':
          'Perla (opaco, blanco lustroso, amarillo o rosa) ',
      },
      {
        d10: '9',
        'Descripción de la gema':
          'Espinela (transparente, rojo, marrón rojizo o verde oscuro)',
      },
      {
        d10: '10',
        'Descripción de la gema':
          'Turmalina (transparente, verde pálido, azul, marrón o rojo)',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 500 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d6: '1',
        'Descripción de la gema': 'Alejandrita (transparente, verde oscuro)',
      },
      {
        d6: '2',
        'Descripción de la gema':
          'Aguamarina (transparente, azul verdoso pálido)',
      },
      {
        d6: '3',
        'Descripción de la gema': 'Perla negra (opaco, negro puro)',
      },
      {
        d6: '4',
        'Descripción de la gema': 'Espinela azul (transparente, azul oscuro)',
      },
      {
        d6: '5',
        'Descripción de la gema':
          'Peridoto (transparente, verde aceituna profundo)',
      },
      {
        d6: '6',
        'Descripción de la gema': 'Topacio (transparente, amarillo dorado)',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 1.000 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d8: '1',
        'Descripción de la gema':
          'Ópalo negro (translúcido, verde oscuro con moteado negro y vetas doradas)',
      },
      {
        d8: '2',
        'Descripción de la gema':
          'Zafiro azul (transparente, azul-blanco a azul medio)',
      },
      {
        d8: '3',
        'Descripción de la gema':
          'Esmeralda (transparente, verde profundo y brillante)',
      },
      {
        d8: '4',
        'Descripción de la gema': 'Ópalo de fuego (translúcido, rojo fuego)',
      },
      {
        d8: '5',
        'Descripción de la gema':
          'Ópalo (translúcido, azul pálido con moteado verde y dorado)',
      },
      {
        d8: '6',
        'Descripción de la gema':
          'Rubí estrella (translúcido, rubí con núcleo en forma de estrella blanca)',
      },
      {
        d8: '7',
        'Descripción de la gema':
          'Zafiro estrella (translúcido, zafiro azul con núcleo en forma de estrella blanca)',
      },
      {
        d8: '8',
        'Descripción de la gema':
          'Zafiro amarillo (transparente, amarillo fuego o amarillo verdoso)',
      },
    ],
  },

  {
    name: 'Piedras Preciosas de 5.000 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d4: '1',
        'Descripción de la gema':
          'Zafiro negro (translúcido, negro lustroso con detalles luminosos)',
      },
      {
        d4: '2',
        'Descripción de la gema':
          'Diamante (transparente, azul-blanco, amarillo canario, rosa, marrón o azul)',
      },
      {
        d4: '3',
        'Descripción de la gema': 'Jacinto (transparente, naranja fuego)',
      },
      {
        d4: '4',
        'Descripción de la gema':
          'Rubí (transparente, rojo claro a rojo profundo)',
      },
    ],
  },

  {
    name: 'Obras de arte de 25 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d10: '1',
        'Descripción de la gema': 'Aguamanil de plata',
      },
      {
        d10: '2',
        'Descripción de la gema': 'Estatuilla tallada en hueso',
      },
      {
        d10: '3',
        'Descripción de la gema': 'Brazalete de oro pequeno',
      },
      {
        d10: '4',
        'Descripción de la gema': 'Vestiduras de tela de oro',
      },
      {
        d10: '5',
        'Descripción de la gema':
          'Máscara de terciopelo negro bordada en plata',
      },
      {
        d10: '6',
        'Descripción de la gema': 'Cáliz de cobre con filigrana de plata',
      },
      {
        d10: '7',
        'Descripción de la gema': 'Pareja de dados de hueso grabados',
      },
      {
        d10: '8',
        'Descripción de la gema':
          'Conjunto de espejos con marco de madera pintada',
      },
      {
        d10: '9',
        'Descripción de la gema': 'Panuelo de seda bordado',
      },
      {
        d10: '10',
        'Descripción de la gema': 'Relicario con retrato pintado a mano dentro',
      },
    ],
  },

  {
    name: 'Obras de arte de 250 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d10: '1',
        'Descripción de la gema': 'Anillo de oro con jaspe sanguíneo',
      },
      {
        d10: '2',
        'Descripción de la gema': 'Estatuilla tallada en marfil',
      },
      {
        d10: '3',
        'Descripción de la gema': 'Brazalete de oro grande',
      },
      {
        d10: '4',
        'Descripción de la gema':
          'Collar de plata con co lgante de piedra preciosa',
      },
      {
        d10: '5',
        'Descripción de la gema': 'Corona de bronce',
      },
      {
        d10: '6',
        'Descripción de la gema': 'Bata de seda bordada en oro',
      },
      {
        d10: '7',
        'Descripción de la gema': 'Tapiz grande y de calidad',
      },
      {
        d10: '8',
        'Descripción de la gema': 'Jarra de latón con incrustación de jade',
      },
      {
        d10: '9',
        'Descripción de la gema': 'Caja de figuritas de animales de turquesa',
      },
      {
        d10: '10',
        'Descripción de la gema':
          'Jaula de pájaro de oro, con filigrana de electro',
      },
    ],
  },

  {
    name: 'Obras de arte de 750 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d10: '1',
        'Descripción de la gema':
          'Cáliz de plata con piedras de luna incrustadas',
      },
      {
        d10: '2',
        'Descripción de la gema':
          'Espada de acero revestida en plata con un azabache incrustado en la empuñadura',
      },
      {
        d10: '3',
        'Descripción de la gema':
          'Arpa tallada en madera exótica con incrustaciones de marfil y zirconitas',
      },
      {
        d10: '4',
        'Descripción de la gema': 'Ídolo de oro pequeño',
      },
      {
        d10: '5',
        'Descripción de la gema':
          'Peine dorado con forma de dragón, cuyos ojos son granates rojos',
      },
      {
        d10: '6',
        'Descripción de la gema':
          'Tapón de vino repujado con pan de oro e incrustado con amatistas',
      },
      {
        d10: '7',
        'Descripción de la gema':
          'Daga ceremonial de electro con perla negra en el pomo',
      },
      {
        d10: '8',
        'Descripción de la gema': 'Broche de oro y plata',
      },
      {
        d10: '9',
        'Descripción de la gema':
          'Estatuilla de obsidiana con incrustaciones y relieves en oro',
      },
      {
        d10: '10',
        'Descripción de la gema': 'Máscara de guerra de oro, pintada',
      },
    ],
  },

  {
    name: 'Obras de arte de 2.500 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d10: '1',
        'Descripción de la gema':
          'Cadena de oro fino con colgante de ópalo de fuego',
      },
      {
        d10: '2',
        'Descripción de la gema': 'Antigua obra maestra de la pintura',
      },
      {
        d10: '3',
        'Descripción de la gema':
          'Manto de terciopelo, con encaje de seda y numerosas piedras de luna engastadas',
      },
      {
        d10: '4',
        'Descripción de la gema': 'Brazalete de platino con zafiro engastado',
      },
      {
        d10: '5',
        'Descripción de la gema':
          'Guante bordado con trozos de gema incrustados',
      },
      {
        d10: '6',
        'Descripción de la gema': 'Ajorca de tobillo enjoyada',
      },
      {
        d10: '7',
        'Descripción de la gema': 'Caja de música de oro',
      },
      {
        d10: '8',
        'Descripción de la gema':
          'Diadema de oro con cuatro aguamarinas engastadas',
      },
      {
        d10: '9',
        'Descripción de la gema':
          'Parche de ojo con un ojo falso representado mediante zafiro azul y piedras de luna',
      },
      {
        d10: '10',
        'Descripción de la gema': 'Collar de perlas rosas pequeñas',
      },
    ],
  },

  {
    name: 'Obras de arte de 7.500 po',
    keywords: ['joyas', 'gemas'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d8: '1',
        'Descripción de la gema':
          'Corona de oro con piedras preciosas incrustadas',
      },
      {
        d8: '2',
        'Descripción de la gema': 'Anillo de platino con gemas',
      },
      {
        d8: '3',
        'Descripción de la gema': 'Estatuilla de oro con rubíes engarzados',
      },
      {
        d8: '4',
        'Descripción de la gema': 'Copa de oro con esmeraldas',
      },
      {
        d8: '5',
        'Descripción de la gema': 'Joyero de oro con filigrana de platino',
      },
      {
        d8: '6',
        'Descripción de la gema': 'Sarcófago de niño pintado en oro',
      },
      {
        d8: '7',
        'Descripción de la gema':
          'Tablero de juego de mesa de jade, con piezas de oro macizo',
      },
      {
        d8: '8',
        'Descripción de la gema':
          'Cuerno para beber de marfil, con filigrana de oro y cuajado de piedras preciosas',
      },
    ],
  },

  {
    name: 'Tabla de objetos mágicos A',
    keywords: ['loot'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d100: '01-50',
        'Objeto mágico': 'Poción de curación',
      },
      {
        d100: '51-61',
        'Objeto mágico': 'Pergamino de conjuro (truco)',
      },
      {
        d100: '61-70',
        'Objeto mágico': 'Poción de trepar',
      },
      {
        d100: '71-90',
        'Objeto mágico': 'Pergamino de conjuro (Nivel 1)',
      },
      {
        d100: '91-94',
        'Objeto mágico': 'Pergamino de conjuro (Nivel 2)',
      },
      {
        d100: '95-98',
        'Objeto mágico': 'Poción de curación mayor',
      },
      {
        d100: '99',
        'Objeto mágico': 'Bolsa de contención',
      },
      {
        d100: '00',
        'Objeto mágico': 'Globo flotante',
      },
    ],
  },

  {
    name: 'Tabla de objetos mágicos B',
    keywords: ['loot'],
    classNames: {
      td: 'glossary__table-column--align-left',
    },
    rows: [
      {
        d100: '01-15',
        'Objeto mágico': 'Poción de curación mayor',
      },
      {
        d100: '16-22',
        'Objeto mágico': 'Poción de aliento de fuego',
      },
      {
        d100: '23-29',
        'Objeto mágico': 'Poción de resistencia',
      },
      {
        d100: '30-34',
        'Objeto mágico': 'Munición +1',
      },
      {
        d100: '35-39',
        'Objeto mágico': 'Poción de amistad animal',
      },
      {
        d100: '40-44',
        'Objeto mágico': 'Poción de fuerza de gigante de las colinas',
      },
      {
        d100: '45-49',
        'Objeto mágico': 'Poción de crecimiento',
      },
      {
        d100: '50-55',
        'Objeto mágico': 'Poción de respirar bajo el agua',
      },
      {
        d100: '55-59',
        'Objeto mágico': 'Pergamino de conjuro (Nivel 2)',
      },
      {
        d100: '60-64',
        'Objeto mágico': 'Pergamino de conjuro (Nivel 3)',
      },
      {
        d100: '65-67',
        'Objeto mágico': 'Bolsa de contención',
      },
      {
        d100: '68-70',
        'Objeto mágico': 'Ungüento de Keoghtom',
      },
      {
        d100: '71-73',
        'Objeto mágico': 'Aceite escurridizo',
      },
      {
        d100: '74-75',
        'Objeto mágico': 'Polvo de desaparición',
      },
      {
        d100: '76-77',
        'Objeto mágico': 'Polvo de sequedad',
      },
      {
        d100: '78-79',
        'Objeto mágico': 'Polvo de estornudar y atragantarse',
      },
      {
        d100: '80-81',
        'Objeto mágico': 'Gema elemental',
      },
      {
        d100: '82-83',
        'Objeto mágico': 'Filtro de amor',
      },
      {
        d100: '84',
        'Objeto mágico': 'Vasija alquímica',
      },
      {
        d100: '85',
        'Objeto mágico': 'Gorro de respirar bajo el agua',
      },
      {
        d100: '86',
        'Objeto mágico': 'Capa de la mantarraya',
      },
      {
        d100: '87',
        'Objeto mágico': 'Globo flotante',
      },
      {
        d100: '88',
        'Objeto mágico': 'Anteojos de la noche',
      },
      {
        d100: '89',
        'Objeto mágico': 'Yelmo de entender idiomas',
      },
      {
        d100: '90',
        'Objeto mágico': 'Vara inamovible',
      },
      {
        d100: '91',
        'Objeto mágico': 'Linterna de revelación',
      },
      {
        d100: '92',
        'Objeto mágico': 'Armadura de marinero',
      },
      {
        d100: '93',
        'Objeto mágico': 'Armadura de mithral',
      },
      {
        d100: '94',
        'Objeto mágico': 'Poción de veneno',
      },
      {
        d100: '95',
        'Objeto mágico': 'Anillo de natación',
      },
      {
        d100: '96',
        'Objeto mágico': 'Túnica de objetos útiles',
      },
      {
        d100: '97',
        'Objeto mágico': 'Cuerda de escalada',
      },
      {
        d100: '98',
        'Objeto mágico': 'Silla de monta del caballero',
      },
      {
        d100: '99',
        'Objeto mágico': 'Varita de detección mágica',
      },
      {
        d100: '00',
        'Objeto mágico': 'Varita de secretos',
      },
    ],
  },
];

export const TABLE_MAP = new Map();
TABLES.forEach(table => TABLE_MAP.set(table.name, table));
