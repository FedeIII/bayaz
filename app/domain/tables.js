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
];

export const TABLE_MAP = new Map();
TABLES.forEach(table => TABLE_MAP.set(table.name, table));
