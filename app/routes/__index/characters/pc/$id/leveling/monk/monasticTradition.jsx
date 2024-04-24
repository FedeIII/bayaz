import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  MONASTIC_TRADITIONS,
  getMonasticTradition,
  translateMonasticTradition,
} from '~/domain/classes/monk/monk';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getMonasticTradition(pc)) {
    throw new Error('Ya has escogido Tradición Monástica');
  }

  if (pc.pClass !== 'monk') {
    throw new Error('Solo los monjes puedes escoger Tradición Monástica');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const monasticTradition = formData.get('monasticTradition');
  const elementalDisciplines = [];

  if (monasticTradition === 'wayOfTheFourElements') {
    elementalDisciplines.push('elementalAttunement');
  }

  await updateAttrsForClass(id, 'monk', {
    monasticTradition,
    elementalDisciplines,
  });
  return redirect(`/characters/pc/${id}/summary`);
};

function MonasticTradition() {
  const { pc } = useLoaderData();

  useTitle('Monje nivel 3');

  const [selectedTradition, setSelectedTradition] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Tradición Monástica</h2>
      <p className="app__paragraph">
        Tres tradiciones de búsqueda son comunes en los monasterios repartidos
        por el multiverso. En la mayoría de los monasterios practican sólo una
        tradición, pero algunos honran las tres tradiciones y entrenan a sus
        monjes de acuerdo con sus aptitudes e intereses. Las tres tradiciones se
        basan en las mismas técnicas básicas, diferenciándose conforme el alumno
        gana experiencia. De esta forma un monje no debe elegir una tradición
        hasta alcanzar el nivel 3 de experiencia.
      </p>

      <div>
        <label>
          <span className="app__pale-text">Escoge Tradición Monástica</span>
          <br />
          <select
            name="monasticTradition"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setSelectedTradition(e.target.value)}
          >
            <option value="" disabled></option>
            {MONASTIC_TRADITIONS.map(tradition => (
              <option value={tradition} key={tradition}>
                {translateMonasticTradition(tradition)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedTradition === 'wayOfTheFourElements' && (
        <>
          <h3 className="app__pale-text">
            {translateMonasticTradition(selectedTradition)}
          </h3>
          <p className="app__paragraph">
            Sigues una tradición monástica que te enseña cómo emplear los
            elementos. Cuando concentras tu ki, puedes alinear tu ser con las
            fuerzas de la creación y manipular los elementos a voluntad, como si
            fueran una extensión de tu propio cuerpo. Algunos miembros de esta
            tradición dedican su vida a un solo elemento, pero otros entrelazan
            varios elementos.
          </p>
          <p className="app__paragraph">
            Muchos monjes de esta tradición se tatúan sus cuerpos con
            representaciones de su poder con el ki, generalmente como dragones
            enroscados, pero también como aves fénix, peces, plantas, montañas y
            olas.
          </p>

          <h4 className="app__pale-text">Discípulo de los Elementos</h4>
          <p className="app__paragraph">
            Cuando eliges esta tradición en el nivel 3 aprendes disciplinas
            mágicas que emplean el poder de los cuatro elementos. Una disciplina
            requiere que gastes puntos ki cada vez que la usas.
          </p>
          <p className="app__paragraph">
            Conoces la disciplina de Sintonía Elemental y otra disciplina
            elemental de tu elección.
          </p>
          <p className="app__paragraph">
            Cuando aprendas una nueva disciplina elemental, puedes reemplazar
            una disciplina elemental que ya conozcas por otra.
          </p>
        </>
      )}

      {selectedTradition === 'openHand' && (
        <>
          <h3 className="app__pale-text">
            {translateMonasticTradition(selectedTradition)}
          </h3>
          <p className="app__paragraph">
            Los monjes del camino de la mano abierta son los más grandes
            maestros del combate con artes marciales, ya sea con armas o sin
            ellas. Aprenden técnicas para empujar y derribar a sus oponentes,
            manipulan el ki para curar el daño en sus cuerpos y practican
            meditación avanzada, que puede protegerlos del daño.
          </p>

          <h4 className="app__pale-text">Técnica de la Mano Abierta</h4>
          <p className="app__paragraph">
            Comenzando cuando eliges esta tradición en el nivel 3 puedes
            manipular el ki del oponente al mismo tiempo que utilizas el tuyo.
            Cuando golpeas a una criatura con uno de los ataques otorgados por
            tu ráfaga de golpes, puedes aplicar alguno de los siguientes efectos
            en el objetivo:
          </p>
          <ul className="app__paragraph">
            <li>
              Debe tener éxito en una tirada de salvación de Destreza o ser
              tumbado.
            </li>
            <li>
              Debe hacer una tirada de salvación de Fuerza. Si falla, puedes
              empujarlo hasta 15 pies (5 metros) lejos de ti.
            </li>
            <li>
              No puede hacer reacciones hasta el final de tu siguiente turno.
            </li>
          </ul>
        </>
      )}

      {selectedTradition === 'wayOfShadow' && (
        <>
          <h3 className="app__pale-text">
            {translateMonasticTradition(selectedTradition)}
          </h3>
          <p className="app__paragraph">
            Los monjes del camino de la sombra siguen una tradición que valora
            el sigilo y el subterfugio. Estos monjes pueden ser conocidos como
            ninjas o danzarines sombríos, ya que sirven como espías y asesinos.
            A veces los miembros de un monasterio ninja son miembros de la misma
            familia, formando un clan que juró mantener en secreto sus artes y
            misiones. Otros monasterios son más parecidos a cofradías de
            ladrones, alquilando sus servicios a nobles, mercaderes ricos o
            cualquier otro que pueda pagar sus honorarios. Sin importar sus
            métodos, los cabecillas de estos monasterios esperan absoluta e
            incuestionable obediencia por parte de sus estudiantes.
          </p>

          <h4 className="app__pale-text">Artes Sombrías</h4>
          <p className="app__paragraph">
            Cuando eliges esta tradición en el nivel 3 puedes usar tu ki para
            duplicar el efecto de ciertos conjuros. Como una acción, puedes
            gastar 2 puntos ki para <u>lanzar oscuridad</u>,{' '}
            <u>visión en la oscuridad</u>,<u>pasar sin dejar rastro</u>, o{' '}
            <u>silencio</u> sin requerir componentes materiales. Además,
            obtienes el truco <u>ilusión menor</u> si es que no lo conoces de
            antemano.
          </p>
        </>
      )}

      <p>
        <button type="submit" className="cards__button-card">
          Escoger Tradición
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Tres tradiciones de búsqueda son comunes en los monasterios repartidos
        por el multiverso. En la mayoría de los monasterios practican sólo una
        tradición, pero algunos honran las tres tradiciones y entrenan a sus
        monjes de acuerdo con sus aptitudes e intereses. Las tres tradiciones se
        basan en las mismas técnicas básicas, diferenciándose conforme el alumno
        gana experiencia. De esta forma un monje no debe elegir una tradición
        hasta alcanzar el nivel 3 de experiencia.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default MonasticTradition;
