import { useState } from 'react';
import { Form } from '@remix-run/react';
import { getAvailableFeats } from '~/domain/feats/featUtils';
import { Card } from '~/components/cards/card';
import { t } from '~/domain/translations';

export function FeatForm(props) {
  const { pc, improvementLevel, onBack } = props;
  const [selectedFeat, setSelectedFeat] = useState(null);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="level"
        value={improvementLevel}
        hidden
      />
      <input readOnly type="text" name="type" value="feat" hidden />

      <h2 className="app__pale-text app__sticky-title">
        Selecciona una dote{' '}
        {selectedFeat?.name ? `: ${t(selectedFeat.name)}` : ''}
      </h2>

      <div className="cards">
        {getAvailableFeats(pc).map(feat => (
          <label
            key={feat.name}
            className="cards__selectable-card"
            onClick={() => setSelectedFeat(feat)}
          >
            <input
              type="radio"
              name="featId"
              value={feat.name}
              className="cards__input"
              hidden
            />
            <Card
              title={t(feat.name)}
              titleClass="cards__title"
              bodyClassName="cards__body"
            >
              {feat.description(null, pc)}
            </Card>
          </label>
        ))}
      </div>

      <div className="cards__buttons">
        <button type="button" onClick={onBack} className="cards__button-card">
          Volver
        </button>
        <button type="submit" className="cards__button-card">
          Seleccionar
        </button>
      </div>
    </Form>
  );
}
