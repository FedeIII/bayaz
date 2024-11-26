import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { getBardCollege } from '~/domain/classes/bard/bard';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getBardCollege(pc)) {
    throw new Error('Ya has escogido Colegio de Bardo');
  }

  if (pc.pClass !== 'bard') {
    throw new Error('Solo los bardos puedes escoger Colegio de Bardo');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const bardCollege = formData.get('bard-college');

  await updateAttrsForClass(id, 'bard', { bardCollege });

  return redirect(`/characters/pc/${id}/summary`);
};

function BardCollege() {
  const { pc } = useLoaderData();

  useTitle('Bardo nivel 3');

  const [college, setCollege] = useState('');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Colegio de Bardo</h2>
      <p className="app__paragraph">
        El camino de un bardo es sociable. Los bardos se buscan los unos a los
        otros para intercambiar canciones e historias, presumir de sus logros y
        compartir su conocimiento. Forman agrupaciones poco definidas, a las que
        llaman colegios, para facilitar las reuniones y preservar sus
        tradiciones.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Colegio de Bardo</span>
          <br />
          <select
            name="bard-college"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setCollege(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="lore">Colegio del Conocimiento</option>
            <option value="valor">Colegio del Valor</option>
          </select>
        </label>
      </p>
      {college === 'lore' && (
        <>
          <h3 className="app__pale-text">Colegio del Conocimiento</h3>
          <p className="app__paragraph">
            Los bardos del Colegio del Conocimiento conocen algo sobre la
            mayoría de las cosas, coleccionando fragmentos de saber de fuentes
            tan diversas como tomos de eruditos y cuentos de aldeanos.
          </p>
          <p className="app__paragraph">
            Ya sea cantando baladas populares en tabernas o elaboradas
            composiciones en cortes reales, estos bardos usan sus dones para
            mantener a sus audiencias fascinadas. Cuando los aplausos se apagan,
            los miembros de la audiencia se encuentran cuestionándose todo lo
            que tenían como cierto, desde su fe en el sacerdocio local hasta su
            lealtad hacia el rey.
          </p>
          <p className="app__paragraph">
            La lealtad de estos bardos está depositada en la búsqueda de la
            belleza y la verdad, no en el vasallaje de un monarca o en seguir
            las doctrinas de una deidad. Un noble que mantiene uno de estos
            bardos como heraldo o consejero sabe que dicho bardo es más honesto
            que correcto.
          </p>
          <p className="app__paragraph">
            La lealtad de estos bardos está depositada en la búsqueda de la
            belleza y la verdad, no en el vasallaje de un monarca o en seguir
            las doctrinas de una deidad. Un noble que mantiene uno de estos
            bardos como heraldo o consejero sabe que dicho bardo es más honesto
            que correcto.
          </p>
          <p className="app__paragraph">
            Los miembros de este colegio se reúnen en bibliotecas y a veces en
            verdaderos colegios, llenos de aulas y dormitorios, para compartir
            sus conocimientos con otros. Incluso se encuentran en festivales o
            reuniones de estado, donde pueden exponer la corrupción,
            desenmarañar mentiras y meterse con prepotentes figuras de la
            autoridad
          </p>
          <div className="app__paragraph">
            <h4 className="app__h4">Competencias Adicionales</h4>
            <p className="app__paragraph">
              Cuando te unes al Colegio del Conocimiento en el nivel 3, ganas
              competencia con tres habilidades de tu elección.
            </p>
            <h4 className="app__h4">Palabras Hirientes</h4>
            <p className="app__paragraph">
              En el nivel 3 también aprendes cómo usar tu ingenio para distraer,
              confundir y minar la confianza y competencia de otros. Cuando una
              criatura que puedes ver en un rango de 60 pies (18 metros) realiza
              una tirada de ataque, una prueba de habilidad o una tirada de
              daño, puedes usar tu reacción para gastar uno de tus usos de
              Inspiración de Bardo, tirando un dado de Inspiración de Bardo y
              restando el resultado a la tirada de la criatura. Puedes decidir
              usar este rasgo después de que la criatura haya realizado su
              prueba o tirada, pero antes de que el DM determine si la prueba de
              habilidad o la tirada de ataque tiene éxito o no, o antes de que
              la criatura calcule el daño. La criatura es inmune si no puede
              oírte o si es inmune al encantamiento.
            </p>
          </div>
        </>
      )}
      {college === 'valor' && (
        <>
          <h3 className="app__pale-text">Colegio del Valor</h3>
          <p className="app__paragraph">
            Los bardos del Colegio de Valor son osados poetas cuyos cuentos
            mantienen viva la memoria de los grandes héroes del pasado, y de
            este modo inspiran a una nueva generación de héroes. Estos bardos se
            reúnen en salones de banquetes o alrededor de grandes fogatas para
            cantar las hazañas de los poderosos, tanto del pasado como del
            presente. Viajan por el mundo para presenciar grandes eventos de
            primera mano y para asegurarse de que el recuerdo de esos eventos no
            abandone este mundo. Con sus canciones, inspiran a otros a al-
            canzar logros de las mismas dimensiones que los héroes de antaño.
          </p>
          <div className="app__paragraph">
            <h4 className="app__h4">Competencias Adicionales</h4>
            <p className="app__paragraph">
              Cuando te unes al Colegio del Valor en el nivel 3, ganas
              competencia con armadura media, escudos y armas marciales.
            </p>
            <h4 className="app__h4">Inspiración de Combate</h4>
            <p className="app__paragraph">
              En el nivel 3 también aprendes a inspirar a otros en la batalla.
              Una criatura que tiene un dado de Inspiración de Bardo tuyo puede
              tirar ese dado y agregarlo a una tirada de daño. Alternativamente,
              cuando se realiza una tirada de ataque contra la criatura, esta
              puede usar su reacción para tirar el dado de Inspiración de Bardo
              y agregar el resultado a su CA contra el ataque, después de ver la
              tirada, pero antes de saber si esta acertó o no.
            </p>
          </div>
        </>
      )}
      <p>
        <button type="submit" className="cards__button-card">
          Escoger
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        El camino de un bardo es sociable. Los bardos se buscan los unos a los
        otros para intercambiar canciones e historias, presumir de sus logros y
        compartir su conocimiento. Forman agrupaciones poco definidas, a las que
        llaman colegios, para facilitar las reuniones y preservar sus
        tradiciones.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default BardCollege;
