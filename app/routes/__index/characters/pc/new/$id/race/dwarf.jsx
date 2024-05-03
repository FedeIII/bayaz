import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import { pcItem } from '~/domain/equipment/equipment';
import { TOOLS } from '~/domain/equipment/tools';
import { t } from '~/domain/translations';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const toolName = formData.get('tool');

  const pc = await getPc(id);

  await updatePc({
    id,
    proficientItems: [...pc.proficientItems, pcItem(toolName)],
  });

  return redirect(`../${id}/class`);
};

function PcDwarfSkills() {
  const { pc } = useLoaderData();
  const { id, name } = pc;

  const navigation = useNavigation();
  const isCreating = Boolean(navigation);

  const [isToolSelected, setIsToolSelected] = useState(false);

  return (
    <Form method="post">
      <div className="characters__content">
        <h2>Habilidades de Enano para {name}</h2>
        <input readOnly type="text" name="id" value={id} hidden />

        <div className="characters__trait-columns characters__trait-columns--three">
          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Selecciona herramientas de artesano con las que ser competente
            </span>
            <div className="characters__traits"></div>
            {[
              TOOLS().smithsTools(),
              TOOLS().brewersSupplies(),
              TOOLS().masonsTools(),
            ].map(tool => (
              <label
                htmlFor={tool.name}
                key={tool.name}
                className="characters__skill-label"
              >
                <input
                  type="radio"
                  name="tool"
                  id={tool.name}
                  value={tool.name}
                  onChange={() => setIsToolSelected(true)}
                />
                {t(tool.name)}
              </label>
            ))}
          </div>
        </div>

        <p>
          <button
            type="submit"
            className="cards__button-card"
            disabled={isCreating || !isToolSelected}
          >
            {isCreating
              ? 'Creando...'
              : isToolSelected
                ? 'Continuar'
                : 'Elige habilidades'}
          </button>
        </p>
      </div>
    </Form>
  );
}

export default PcDwarfSkills;
