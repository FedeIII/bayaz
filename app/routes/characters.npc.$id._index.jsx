import { Form, useLoaderData, useSubmit, Link } from '@remix-run/react';
import { useRef, useState } from 'react';
import { CharacterInfo } from '~/components/characters/characterInfo';
import { getNpc, updateNpc } from '~/services/npc.server';
import { getSettlementsByDominionAndName } from '~/services/settlements.server';
import { downloadNpcData } from '~/utils/exportHelpers';
import { useTitle } from '~/components/hooks/useTitle';
import { getFromStore } from '~/components/hooks/useStore';
import { usePresentTab } from '~/components/contexts/presentTabContext';

import styles from '~/components/filters.css';
import placesStyles from '~/components/places.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: placesStyles },
  ];
};

export const meta = ({ data }) => [
  {
    title: data.npc?.name,
  },
];

export const loader = async ({ params }) => {
  const npc = await getNpc(params.id);
  const settlements = await getSettlementsByDominionAndName();
  if (!npc) {
    throw new Error('NPC not found');
  }
  return { npc, settlements };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  const npcData = {
    id: params.id,
    name: rawData.name,
    race: rawData.race,
    gender: rawData.gender,
    img: rawData.img,
    doc: rawData.doc,
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
    return { success: true, npc };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

function NpcDetail() {
  const { npc, settlements } = useLoaderData();
  const formRef = useRef();
  const submit = useSubmit();
  const [formData, setFormData] = useState(npc);
  const { showInPresentationWindow } = usePresentTab();
  const partyId = getFromStore('partyId');

  useTitle(npc.name);

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

  const handlePresent = () => {
    if (partyId) {
      showInPresentationWindow('npc', formData.name, formData.img, partyId);
    } else if (npc?.id) {
      window.open(`./${npc?.id}/players`, '_blank');
    }
  };

  return (
    <Form method="post" ref={formRef} onSubmit={onSaveNpc}>
      <div className="places__buttons">
        <Link to="/characters/npc/quick/list" className="menus__back-button">
          ⇦ Volver
        </Link>
        <Link to="/characters/npc/quick/new" className="menus__back-button">
          ⇩ Random
        </Link>
        <button type="submit" className="places__save">
          ⇧ Guardar
        </button>
        <button type="button" onClick={handlePresent} className="places__save">
          ⇨ Presentar
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
