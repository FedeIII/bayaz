import { Form, useActionData, useSubmit } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useRef, useEffect, useState } from 'react';
import { createRandomNpc } from '~/domain/npc/npc';
import { CharacterSidebar } from '~/components/characters/characterSidebar';
import { CharacterInfo } from '~/components/characters/characterInfo';
import { createNpc } from '~/services/npc.server';

import styles from '~/components/filters.css';
import { getDeity } from '~/domain/npc/attrs/npcFaith';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  // Convert the flat formData structure into nested objects
  const npcData = {
    name: rawData.name,
    race: rawData.race,
    gender: rawData.gender,
    looks: rawData.looks ? rawData.looks.split('\n') : [],
    behavior: {
      mood: rawData['behavior.mood'],
      calm: rawData['behavior.calm'],
      stress: rawData['behavior.stress']
    },
    talent: rawData.talent,
    faith: {
      description: rawData['faith.description'],
      deity: getDeity(rawData['faith.deityName']),
      deityName: rawData['faith.deityName']
    },
    ideals: rawData.ideals,
    bonds: rawData.bonds,
    flaws: rawData.flaws,
    notes: rawData.notes || ''
  };

  try {
    const npc = await createNpc(npcData);
    return json({ success: true, npc });
  } catch (error) {
    return json({ success: false, error: error.message });
  }
};

function QuickNpc() {
  const formRef = useRef();
  const submit = useSubmit();
  const actionData = useActionData();
  const [filters, setFilters] = useState({
    races: [],
    genders: [],
    deities: [],
  });

  const [formData, setFormData] = useState({
    name: '',
    race: '',
    gender: '',
    looks: '',
    behavior: {
      mood: '',
      calm: '',
      stress: ''
    },
    talent: '',
    faith: {
      description: '',
      deity: '',
      deityName: ''
    },
    ideals: '',
    bonds: '',
    flaws: '',
    notes: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'looks') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split('\n')
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
        ...(randomNpc.behavior || {})
      },
      faith: {
        ...formData.faith,
        ...(randomNpc.faith || {})
      }
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
        />
        <div className="filters__results">
          <CharacterInfo 
            formData={formData}
            onChange={handleInputChange}
          />
          <button type="submit" className="cards__button-card">
            Guardar NPC
          </button>
          {actionData?.success && (
            <div className="success-message">NPC guardado correctamente</div>
          )}
          {actionData?.error && (
            <div className="error-message">{actionData.error}</div>
          )}
        </div>
      </div>
    </Form>
  );
}

export default QuickNpc;
