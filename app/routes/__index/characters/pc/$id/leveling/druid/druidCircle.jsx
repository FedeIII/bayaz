import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  DRUID_CIRCLES,
  getDruidCircle,
  translateDruidCircle,
} from '~/domain/classes/druid/druid';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getDruidCircle(pc)) {
    throw new Error('Ya has escogido Círculo Druídico');
  }

  if (pc.pClass !== 'druid') {
    throw new Error('Solo los druidas puedes escoger Círculo Druídico');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const druidCircle = formData.get('druidCircle');

  await updateAttrsForClass(id, 'druid', { druidCircle });

  return redirect(`/characters/pc/${id}/summary`);
};

function DruidCircle() {
  const { pc } = useLoaderData();

  useTitle('Druida nivel 2');

  const [circle, setCircle] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <h2 className="app__pale-text">Círculo Druídico</h2>
      <p className="app__paragraph">
        Aunque su organización es invisible para la mayoría de los forasteros,
        los druidas son parte de una sociedad que se extiende por la tierra,
        haciendo caso omiso de las fronteras políticas. Todos los druidas son
        miembros nominales de esta sociedad druídica, aunque algunas personas
        están tan aisladas que nunca han visto a ningún miembro de alto rango de
        la sociedad o han participado en reuniones druídicas. Los druidas se
        reconocen unos a otros como hermanos y hermanas. No obstante, al igual
        que las criaturas salvajes, los druidas a veces compiten, o incluso unos
        se aprovechan de otros.
      </p>
      <p className="app__paragraph">
        A escala local, los druidas se organizan en círculos que comparten
        ciertas perspectivas sobre la naturaleza, el equilibrio y su camino como
        druidas.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Círculo Druídico</span>
          <br />
          <select
            name="druidCircle"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setCircle(e.target.value)}
          >
            <option value="" disabled></option>
            {DRUID_CIRCLES.map(circle => (
              <option value={circle} key={circle}>
                {translateDruidCircle(circle)}
              </option>
            ))}
          </select>
        </label>
      </p>
      {circle === 'land' && (
        <>
          <h3 className="app__pale-text">EL Círculo de la Tierra</h3>
          <p className="app__paragraph">
            El Círculo de la Tierra está formado por los místicos y los sabios
            que salvaguardan los conocimientos y ritos antiguos a través de una
            extensa tradición oral. Estos druidas se reúnen dentro de círculos
            sagrados de árboles o de piedras para susurrarse secretos
            primigenios en druídico. Los miembros más sabios del círculo
            presiden como líderes espirituales a las comunidades que se aferran
            a la Vieja Fe y sirven como asesores de los gobernantes de esta
            gente. Como miembro de este círculo, tu magia se ve influida por la
            tierra en que fuiste iniciado en los misteriosos ritos del círculo.
          </p>
        </>
      )}
      {circle === 'moon' && (
        <>
          <h3 className="app__pale-text">El Círculo de la Luna</h3>
          <p className="app__paragraph">
            Los druidas del Círculo de la Luna son fieros guardianes de lo
            salvaje. Su orden se reúne bajo la luna llena para compartir
            noticias y posibles peligros. Se adentran en los lugares más
            profundos de la naturaleza, donde podrían pasar semanas antes de
            cruzarse con otra criatura humanoide, y mucho menos con otro druida.
          </p>
          <p className="app__paragraph">
            Cambiantes como la luna, un druida de este círculo podría acechar
            como un gran gato una noche, elevarse sobre las copas de los árboles
            como un águila al día siguiente, y abalanzarse a través de la maleza
            en forma de oso para ahuyentar a un intruso monstruoso. Lo salvaje
            es parte de la sangre del druida.
          </p>
        </>
      )}
      <p>
        <button type="submit" className="cards__button-card">
          Escoger Círculo
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Aunque su organización es invisible para la mayoría de los forasteros,
        los druidas son parte de una sociedad que se extiende por la tierra,
        haciendo caso omiso de las fronteras políticas. Todos los druidas son
        miembros nominales de esta sociedad druídica, aunque algunas personas
        están tan aisladas que nunca han visto a ningún miembro de alto rango de
        la sociedad o han participado en reuniones druídicas. Los druidas se
        reconocen unos a otros como hermanos y hermanas. No obstante, al igual
        que las criaturas salvajes, los druidas a veces compiten, o incluso unos
        se aprovechan de otros.
      </p>
      <p>
        A escala local, los druidas se organizan en círculos que comparten
        ciertas perspectivas sobre la naturaleza, el equilibrio y su camino como
        druidas.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default DruidCircle;
