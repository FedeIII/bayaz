import { Form, useLoaderData, useSubmit, Link } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useRef, useState } from 'react';
import { CharacterInfo } from '~/components/characters/characterInfo';
import { updateNpc, getNpcWithSettlements } from '~/services/npc.server';
import { downloadNpcData } from '~/utils/exportHelpers';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const { npc, settlements } = await getNpcWithSettlements(params.id);
  if (!npc) {
    throw new Error('NPC not found');
  }
  return json({ npc, settlements });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  const npcData = {
    id: params.id,
    name: rawData.name,
    race: rawData.race,
    gender: rawData.gender,
    settlementId: rawData.settlementId,
    looks: rawData.looks ? rawData.looks.split('\n') : [],
    behavior: {
      mood: rawData['behavior.mood'],
      calm: rawData['behavior.calm'],
      stress: rawData['behavior.stress'],
    },
    talent: rawData.talent,
    faith: {
      description: rawData['faith.description'],
      deity: rawData['faith.deity'],
      deityName: rawData['faith.deityName'],
    },
    ideals: rawData.ideals,
    bonds: rawData.bonds,
    flaws: rawData.flaws,
    notes: rawData.notes || '',
  };

  try {
    const npc = await updateNpc(npcData);
    return json({ success: true, npc });
  } catch (error) {
    return json({ success: false, error: error.message });
  }
};

function NpcDetail() {
  const { npc, settlements } = useLoaderData();
  const formRef = useRef();
  const submit = useSubmit();
  const [formData, setFormData] = useState(npc);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name === 'looks') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split('\n'),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function onSaveNpc(e) {
    e.preventDefault();
    submit(formRef.current, { method: 'post' });
  }

  return (
    <Form method="post" ref={formRef} onSubmit={onSaveNpc}>
      <div className="places__buttons">
        <Link to="/characters/npc/quick/list" className="menus__back-button">
          ⇦ Volver
        </Link>
        <Link to="/characters/npc/quick" className="menus__back-button">
          ⇩ Random
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar
        </button>
        <button
          type="button"
          className="places__save"
          onClick={() => downloadNpcData(formData)}
        >
          ⇪ Exportar
        </button>
      </div>
      <CharacterInfo
        formData={formData}
        onChange={handleInputChange}
        settlements={settlements}
      />
    </Form>
  );
}

export default NpcDetail;
