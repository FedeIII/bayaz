import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { useRef, useEffect, useState } from 'react';

import { createRandomNpc } from '~/domain/npc/npc';
import { CharacterSidebar } from '~/components/characters/characterSidebar';
import { CharacterInfo } from '~/components/characters/characterInfo';
import { createNpc } from '~/services/npc.server';
import { getSettlementsByDominionAndName } from '~/services/settlements.server';
import { getDeity } from '~/domain/npc/attrs/npcFaith';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Kandrax - Nuevo NPC rápido',
  },
];

export const action = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  // Convert the flat formData structure into nested objects
  const npcData = {
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
      deity: getDeity(rawData['faith.deityName']),
      deityName: rawData['faith.deityName'],
    },
    ideals: rawData.ideals,
    bonds: rawData.bonds,
    flaws: rawData.flaws,
    notes: rawData.notes || '',
  };

  try {
    const npc = await createNpc(npcData);
    return { success: true, npc };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loader = async () => {
  const settlements = await getSettlementsByDominionAndName();
  return { settlements };
};

function QuickNpc() {
  const { settlements } = useLoaderData();
  const actionData = useActionData();

  useTitle('Nuevo NPC rápido');

  const formRef = useRef();
  const submit = useSubmit();
  const [filters, setFilters] = useState({
    races: [],
    genders: [],
    deities: [],
  });

  const [formData, setFormData] = useState({
    name: '',
    race: '',
    gender: '',
    settlementId: '',
    looks: '',
    behavior: {
      mood: '',
      calm: '',
      stress: '',
    },
    talent: '',
    faith: {
      description: '',
      deity: '',
      deityName: '',
    },
    ideals: '',
    bonds: '',
    flaws: '',
    notes: '',
  });

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

  function generateRandomNpc() {
    const randomNpc = createRandomNpc(filters);

    const newFormData = {
      ...formData,
      ...randomNpc,
      behavior: {
        ...formData.behavior,
        ...(randomNpc.behavior || {}),
      },
      faith: {
        ...formData.faith,
        ...(randomNpc.faith || {}),
      },
    };

    setFormData(newFormData);
  }

  useEffect(() => {
    generateRandomNpc();
  }, []);

  function onCreateRandomClick() {
    generateRandomNpc();
  }

  function onSaveNpc(e) {
    e.preventDefault();
    submit(formRef.current, { method: 'post' });
  }

  return (
    <Form method="post" ref={formRef} onSubmit={onSaveNpc}>
      <div className="filters__container">
        <CharacterSidebar
          onCreateRandomClick={onCreateRandomClick}
          filters={filters}
          setFilters={setFilters}
          formData={formData}
        />
        <div className="filters__results">
          <CharacterInfo
            actionData={actionData}
            formData={formData}
            settlements={settlements}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Form>
  );
}

export default QuickNpc;
