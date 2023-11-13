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
    [2, 'Casucha abandonada'],
    [6, 'Hogar de clase media'],
    [2, 'Hogar de clase alta'],
    [5, 'Edificio de apartamentos abarrotado'],
    [2, 'Orfanato'],
    [1, 'Antro para esclavos oculto'],
    [1, 'Tapadera para una secta secreta'],
    [1, 'Mansión lujosa y bien protegida'],
  ],

  religious: [
    [4, 'Templo a Materia'],
    [3, 'Templo a Energía'],
    [2, 'Templo a Espíritu'],
    [1, 'Templo a Espacio'],
    [2, 'Templo a una deidad falsa (dirigido por sacerdotes embusteros)'],
    [1, 'Hogar de ascetas'],
    [2, 'Santuario abandonado'],
    [2, 'Biblioteca dedicada a estudios teológicos'],
    [3, 'Santuario oculto dedicado a un infernal o deidad malvada'],
  ],

  tavern: [
    [5, 'Bar tranquilo y de perfil bajo'],
    [4, 'Antro estridente'],
    [1, 'Lugar de reunión de un gremio de ladrones'],
    [1, 'Lugar de encuentro de una sociedad secreta'],
    [2, 'Club de cenas de la clase alta'],
    [2, 'Casa de apuestas'],
    [2, 'Clientela de una raza o gremio concretos'],
    [1, 'Club solo para miembros'],
    [2, 'Burdel'],
  ],

  warehouse: [
    [4, 'Vacío o abandonado'],
    [2, 'Bien protegido, productos valiosos'],
    [4, 'Productos baratos'],
    [4, 'Productos a granel'],
    [1, 'Animales vivos'],
    [2, 'Armas o armaduras'],
    [2, 'Bienes de una tierra lejana'],
    [1, 'Cubil secreto de contrabandistas'],
  ],

  shop: [
    [1, 'Casa de empeños'],
    [1, 'Hierbas/inciensos'],
    [1, 'Frutas/verduras'],
    [1, 'Comida en salazón'],
    [1, 'Alfarero'],
    [1, 'Enterrador'],
    [1, 'Librero'],
    [1, 'Prestamista'],
    [1, 'Armas/armaduras'],
    [1, 'Candelero'],
    [1, 'Herrero'],
    [1, 'Carpintero'],
    [1, 'Costurero'],
    [1, 'Joyero'],
    [1, 'Panadero'],
    [1, 'Cartógrafo'],
    [1, 'Sastre'],
    [1, 'Cordelero'],
    [1, 'Albañil'],
    [1, 'Escriba'],
  ],
};

export function createRandomBuilding(filters) {
  const type = random.element(
    filters.types.length ? filters.types : BUILDING_TYPES
  );

  return {
    type,
    subtype: random.split(BUILDING_SUBTYPES[type]),
  };
}
