import { useState } from 'react';
import { useLoaderData, useSubmit, useParams } from '@remix-run/react';
import { Link } from '@remix-run/react';
import {
  getParty,
  addImageToParty,
  removeImageFromParty,
} from '~/services/party.server';
import { getPlaces } from '~/services/place.server';
import { getSettlements } from '~/services/settlements.server';
import { getNpcs } from '~/services/npc.server';

function getDeepLink(type, id) {
  switch (type) {
    case 'place':
      return `/places/generic/${id}/players`;
    case 'settlement':
    case 'city':
    case 'town':
    case 'village':
      return `/places/settlement/${id}/players`;
    case 'npc':
      return `/characters/npc/${id}/players`;
  }
}

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const places = await getPlaces();
  const settlements = await getSettlements();
  const npcs = await getNpcs();

  return {
    party,
    searchableItems: [
      ...places.map(p => ({ type: 'place', ...p.toObject() })),
      ...settlements.map(s => ({ type: 'settlement', ...s.toObject() })),
      ...npcs.map(n => ({ type: 'npc', ...n.toObject() })),
    ],
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { partyId, action } = Object.fromEntries(formData);

  if (action === 'add') {
    const { type, referenceId, title, img } = Object.fromEntries(formData);
    await addImageToParty(partyId, { type, referenceId, title, img });
  } else if (action === 'remove') {
    const { imageId } = Object.fromEntries(formData);
    await removeImageFromParty(partyId, imageId);
  }

  return null;
};

export default function PartyImages() {
  const { party, searchableItems } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const submit = useSubmit();
  const { id: partyId } = useParams();

  const filteredItems = searchableItems.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = item => {
    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('partyId', partyId);
    formData.append('type', item.type);
    formData.append('referenceId', item.id);
    formData.append('title', item.name);
    formData.append('img', item.img);
    submit(formData, { method: 'post' });
  };

  const handleRemove = imageId => {
    const formData = new FormData();
    formData.append('action', 'remove');
    formData.append('partyId', partyId);
    formData.append('imageId', imageId);
    submit(formData, { method: 'post' });
  };

  return (
    <div className="party__images">
      <div className="party__images-search-section">
        <input
          type="text"
          placeholder="Search places, settlements, or NPCs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="party__images-search-input"
        />
        {searchTerm && (
          <div className="party__images-search-results">
            {filteredItems.map(item => (
              <div key={item.id} className="party__images-search-item">
                <img
                  src={item.img}
                  alt={item.name}
                  className="party__images-search-item-image"
                />
                <span>{item.name}</span>
                <button onClick={() => handleAdd(item)}>Add</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="party__images-list">
        {party.images?.map(image => (
          <div key={image.referenceId} className="party__images-item">
            <Link
              to={getDeepLink(image.type, image.referenceId)}
              className="party__images-link"
              target="_blank"
            >
              <img
                src={image.img}
                alt={image.title}
                className="party__images-thumbnail"
              />
              <span className="party__images-title">{image.title}</span>
            </Link>
            <button
              onClick={() => handleRemove(image.referenceId)}
              className="party__images-delete-button"
              title="Delete"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
