import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, learnSpells, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  ROGISH_ARCHETYPES,
  getRoguishArchetype,
  translateRoguishArchetype,
} from '~/domain/classes/rogue/rogue';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getRoguishArchetype(pc)) {
    throw new Error('Ya has escogido Arquetipo de Pícaro');
  }

  if (pc.pClass !== 'rogue') {
    throw new Error('Solo los Pícaros puedes escoger Arquetipo de Pícaro');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const roguishArchetype = formData.get('roguishArchetype');

  await updateAttrsForClass(id, 'rogue', { roguishArchetype });

  if (roguishArchetype === 'arcaneTrickster') {
    await learnSpells(id, ['mageHand']);
  }

  return redirect(`/characters/pc/${id}/summary`);
};

function RoguishArchetype() {
  const { pc } = useLoaderData();

  useTitle('Pícaro nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />

      <h2 className="app__pale-text">Arquetipo de Pícaro</h2>

      <p className="app__paragraph">
        Los pícaros tienen muchos rasgos en común, incluyendo su énfasis en
        perfeccionar sus habilidades, su preciso y mortífero acercamiento en
        combate, y sus cada vez más rápidos reflejos. Sin embargo, cada pícaro
        puede dirigir esos talentos en diferentes direcciones, personificando
        los arquetipos de pícaro. El arquetipo de tu elección es un reflejo de
        cómo enfocas a tu pícaro, no es necesariamente una indicación de la
        profesión que hayas elegido, sino una descripción de tus técnicas
        preferidas.
      </p>
      <p>
        <label>
          <span className="app__pale-text">Escoge Arquetipo</span>
          <br />
          <select
            name="roguishArchetype"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {ROGISH_ARCHETYPES.map(roguishArchetype => (
              <option value={roguishArchetype} key={roguishArchetype}>
                {translateRoguishArchetype(roguishArchetype)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateRoguishArchetype('arcaneTrickster')}
        </h3>
        Algunos pícaros potencian sus refinadas habilidades de sigilo y agilidad
        mediante la magia, aprendiendo trucos de encantamiento e ilusión. Estos
        pícaros abarcan rateros y asaltantes, pero también bromistas, traviesos
        y un número significativo de aventureros.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">
          {translateRoguishArchetype('assassin')}
        </h3>
        Concentras tu entrenamiento en el macabro arte de la muerte. Aquellos
        que se adhieren a este arquetipo son diversos personajes: Asesinos
        pagados, caza recompensas, espías e incluso clérigos especialmente
        ungidos para exterminar los enemigos de su deidad. El sigilo, el veneno
        y el disfraz te ayudan a eliminar a tus enemigos con eficacia mortal.
      </div>

      <div className="app__paragraph">
        <h3 className="app__pale-text">{translateRoguishArchetype('thief')}</h3>
        Perfeccionas tus habilidades en las artes del robo. Ladrones, bandidos,
        rateros, y otros criminales son los que normalmente siguen este
        arquetipo, pero también lo hacen los pícaros que prefieren pensar en
        ellos mismos como buscadores de tesoros profesionales, exploradores,
        saqueadores e investigadores. Además de mejorar tu agilidad y sigilo,
        aprendes habilidades útiles para adentrarte en ruinas antiguas, leer
        lenguas extrañas, y usar objetos mágicos que normalmente no podrías
        utilizar.
      </div>

      <div>
        <button type="submit" className="cards__button-card">
          Escoger Arquetipo
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
        Los pícaros tienen muchos rasgos en común, incluyendo su énfasis en
        perfeccionar sus habilidades, su preciso y mortífero acercamiento en
        combate, y sus cada vez más rápidos reflejos. Sin embargo, cada pícaro
        puede dirigir esos talentos en diferentes direcciones, personificando
        los arquetipos de pícaro. El arquetipo de tu elección es un reflejo de
        cómo enfocas a tu pícaro, no es necesariamente una indicación de la
        profesión que hayas elegido, sino una descripción de tus técnicas
        preferidas.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default RoguishArchetype;
