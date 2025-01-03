import { useState } from 'react';
import { useLoaderData, useSubmit, useParams } from '@remix-run/react';
import {
  getParty,
  addImageToParty,
  removeImageFromParty,
} from '~/services/party.server';
import { getPlaces } from '~/services/place.server';
import { getSettlements } from '~/services/settlements.server';
import { getNpcs } from '~/services/npc.server';
import { usePresentTab } from '~/components/contexts/presentTabContext';
import { groupPartyImages } from '~/domain/party/display';
import { t } from '~/domain/translations';

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
    images: groupPartyImages(party),
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
  const { party, images, searchableItems } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const submit = useSubmit();
  const { id: partyId } = useParams();

  const filteredItems = searchableItems.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { showInPresentationWindow } = usePresentTab();

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

  const handleImageClick = image => {
    showInPresentationWindow(image.type, image.title, image.img, partyId);
  };

  return (
    <div className="party__images">
      <div className="party__images-search-section">
        <label htmlFor="search">
          {party.name ? `Imágenes de ${party.name}: ` : 'Imágenes: '}
          <input
            id="search"
            type="text"
            placeholder="Search places, settlements, or NPCs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="party__images-search-input"
          />
        </label>
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

      {Object.entries(images)?.map(([type, images]) => (
        <div key={type} className="party__images-group">
          <h2 className="party__images-group-title">{t(type)}</h2>
          <div className="party__images-group-list">
            {images.map(image => (
              <div key={image.referenceId} className="party__images-item">
                <div
                  className="party__images-link"
                  onClick={() => handleImageClick(image)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={image.img}
                    alt={image.title}
                    className="party__images-thumbnail"
                  />
                  <span className="party__images-title">{image.title}</span>
                </div>
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
      ))}
    </div>
  );
}
