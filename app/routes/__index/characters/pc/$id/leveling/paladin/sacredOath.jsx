import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  SACRED_OATHS,
  getSacredOath,
  translateSacredOath,
} from '~/domain/classes/paladin/paladin';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getSacredOath(pc)) {
    throw new Error('Ya has escogido Juramento Sagrado');
  }

  if (pc.pClass !== 'paladin') {
    throw new Error('Solo los Paladines puedes escoger Juramento Sagrado');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const sacredOath = formData.get('sacredOath');

  await updateAttrsForClass(id, 'paladin', { sacredOath });

  return redirect(`/characters/pc/${id}/summary`);
};

function SacredOath() {
  const { pc } = useLoaderData();

  useTitle('Paladín nivel 3');

  const [selectedSacredOath, setSelectedSacredOath] = useState('Devotion');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Juramento Sagrado</h2>

      <p className="app__paragraph">
        Convertirse en paladín requiere tomar votos que comprometen al paladín
        con la causa de la rectitud, una forma activa de luchar contra la
        maldad. El juramento final, llevado a cabo cuando se alcanza el nivel 3,
        es la culminación de todo el entrenamiento del paladín. Algunos
        personajes con esta clase no se consideran verdaderos paladines hasta
        que han alcanzado el nivel 3 y han hecho su juramento. Para otros, el
        juramento no es más que una mera formalidad, una forma de plasmar
        oficialmente aquello que ha sido siempre una verdad en el corazón del
        paladín
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Juramento Sagrado</span>
          <br />
          <select
            name="sacredOath"
            id="sacredOath"
            onChange={e => setSelectedSacredOath(e.target.value)}
          >
            {SACRED_OATHS.map(sacredOath => (
              <option value={sacredOath} key={sacredOath}>
                {translateSacredOath(sacredOath)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateSacredOath(selectedSacredOath)}
        </h3>

        {selectedSacredOath === 'Devotion' && (
          <>
            <p>
              El Juramento de Devoción une al paladín a los más nobles ideales
              de justicia, virtud y orden. Algunas veces llamados caballeros,
              caballeros blancos o guerreros sagrados, estos paladines encarnan
              el ideal del caballero de brillante armadura, actuando con honor
              en busca de la justicia y el bien común. Se mantienen a sí mismos
              en los más altos estándares de conducta, y algunos, para bien o
              para mal, piensan que el resto del mundo debe mantenerse también
              en esos estándares. Muchos de estos paladines son devotos de
              dioses de la ley y la bondad, y siguen sus principios tanto como
              demuestran su devoción por ellos. Piensan en los ángeles (los
              sirvientes perfectos de los dioses) como sus ideales, e incorporan
              imágenes de alas angelicales en sus yelmos y en sus heráldicas.
            </p>
            <h4>Credo de la Devoción</h4>
            <p>
              Aunque las restricciones y palabras exactas del Juramento de
              Devoción pueden cambiar, los paladines de este juramento comparten
              estas creencias.
            </p>
            <ul>
              <li>
                <u>Honestidad.</u> No mientas o hagas trampas. Deja que tu
                palabra sea tu promesa.
              </li>
              <li>
                <u>Valentía.</u> Nunca temas actuar, aunque ser cauteloso es de
                sabios.
              </li>
              <li>
                <u>Compasión.</u> Ayuda a los demás, protege al débil y castiga
                a aquellos que los amenacen. Ten piedad de tus enemigos, pero
                hazlo con sabiduría.
              </li>
              <li>
                <u>Honor.</u> Trata bien a los demás y deja que tus honorables
                actos sean un ejemplo para los demás. Realiza todo el bien que
                te sea posible causando la menor cantidad de daño posible.
              </li>
              <li>
                <u>Deber.</u> Se responsable de tus acciones y sus
                consecuencias, protege a aquellos que se encuentran bajo tus
                cuidados y obedece a aquellos que tienen autoridad por encima de
                ti.
              </li>
            </ul>
          </>
        )}

        {selectedSacredOath === 'Ancients' && (
          <>
            <p>
              El Juramento de los Ancestros es tan antiguo como la raza élfica y
              los rituales de los druidas. Llamados algunas veces caballeros
              feéricos, caballeros verdes, o caballeros astados, los paladines
              que hacen este juramento luchan del lado de la luz en el conflicto
              cósmico en contra de la oscuridad porque aman la belleza y las
              cosas llenas de vida que hay en el mundo, no necesariamente porque
              crean en los principios del honor, el coraje o la justicia.
              Adornan sus armaduras y ropajes con imágenes de cosas que crecen
              (hojas, cornamentas, o flores) para reflejar su compromiso de
              preservar la vida y la luz en el mundo.
            </p>
            <h4>Credo de los Ancestros</h4>
            <p>
              Las creencias del Juramento de los Ancestros han sido preservadas
              durante más siglos de los que pueden contarse. Este juramento
              enfatiza los principios de lo bueno por encima de la ley o el
              caos. Sus cuatro principios básicos son simples.
            </p>
            <ul>
              <li>
                <u>Aviva la Luz.</u> A través de tus actos de piedad, amabilidad
                y perdón, aviva la luz de la esperanza en el mundo, haciendo
                retroceder la desesperación.
              </li>
              <li>
                <u>Cobija a la Luz.</u> Donde hay bondad, belleza, amor y
                alegría en el mundo, combate contra la maldad que las ahogaría.
                Donde la vida florece, combate contra las fuerzas que arrasarían
                las tierras hasta convertirlas en un yermo.
              </li>
              <li>
                <u>Conserva tu Propia Luz.</u> Deléitate con la música y la
                risa, la belleza y el arte. Si dejas morir la luz en tu corazón,
                no podrás preservarla en el mundo.
              </li>
              <li>
                <u>Se la Luz.</u> Sé un glorioso faro para todos aquellos que
                viven en la desesperación. Deja que la luz de tu alegría y tu
                coraje brille en todas tus acciones.
              </li>
            </ul>
          </>
        )}

        {selectedSacredOath === 'Vengeance' && (
          <>
            <p>
              El Juramento de Venganza es una solemne promesa de castigar a
              aquellos que han cometido un gravísimo pecado. Cuando las fuerzas
              del mal asesinan a los indefensos aldeanos, cuando un pueblo
              entero se vuelve en contra de la voluntad de los dioses, cuando
              una hermandad de ladrones se torna demasiado violenta y poderosa,
              cuando un dragón masacra toda una villa; en momentos así, los
              paladines surgen y realizan un Juramento de Venganza para
              enderezar aquello que ha ido mal. Para estos paladines (que
              algunos llaman vengadores o caballeros oscuros) su propia pureza
              no es tan importante como el impartir justicia.
            </p>
            <h4>Credo de la Venganza</h4>
            <p>
              Las creencias del Juramento de la Venganza pueden variar de un
              paladín a otro, pero todo su credo gira en torno a castigar a los
              malhechores empleando cualquier medio necesario. Los paladines que
              se entregan a esta creencia sacrifican voluntariamente su propia
              rectitud con tal de impartir la justicia necesaria a aquellos que
              han hecho el mal, por lo que estos paladines normalmente son de
              alineamiento neutral o legal neutral. Los principios centrales de
              este credo son brutalmente simples.
            </p>
            <ul>
              <li>
                <u>Combatir el Mal Mayor.</u> Enfrentado a una elección de
                luchar con los enemigos de mi juramento o combatir un mal menor,
                escojo el mal mayor.
              </li>
              <li>
                <u>No hay Piedad Para los Malvados.</u> . Los enemigos normales
                puede que merezcan mi piedad, pero los enemigos de mi juramento
                no.
              </li>
              <li>
                <u>El Fin Justifica los Medios.</u> No tengo reparos a la hora
                de exterminar a mis enemigos.
              </li>
              <li>
                <u>Restitución.</u> Si mis enemigos traen la ruina al mundo es
                debido a que yo no pude pararlos. Debo ayudar a aquellos que
                sufren por sus fechorías.
              </li>
            </ul>
          </>
        )}
      </div>

      <div>
        <button type="submit" className="cards__button-card">
          Escoger Juramento Sagrado
        </button>
      </div>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Convertirse en paladín requiere tomar votos que comprometen al paladín
        con la causa de la rectitud, una forma activa de luchar contra la
        maldad. El juramento final, llevado a cabo cuando se alcanza el nivel 3,
        es la culminación de todo el entrenamiento del paladín. Algunos
        personajes con esta clase no se consideran verdaderos paladines hasta
        que han alcanzado el nivel 3 y han hecho su juramento. Para otros, el
        juramento no es más que una mera formalidad, una forma de plasmar
        oficialmente aquello que ha sido siempre una verdad en el corazón del
        paladín
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default SacredOath;
