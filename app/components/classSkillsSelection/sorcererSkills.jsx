import { useState } from 'react';

import {
  SORCERER_ORIGIN,
  translateSorcererOrigin,
  getSorcererOrigin,
  DRAGON_ANCESTORS,
  translateDragonAncestor,
} from '~/utils/characters';

function SorcererSkills(props) {
  const { pc } = props;
  const initSorcererOrigin = getSorcererOrigin(pc);
  const [sorcererOrigin, setSorcererOrigin] = useState(initSorcererOrigin);

  return (
    <>
      <p>
        <label>
          Escoge Origen de Hechicero:{' '}
          <select
            name="sorcerer-origin"
            value={sorcererOrigin}
            onChange={e => setSorcererOrigin(e.target.value)}
          >
            {SORCERER_ORIGIN.map(sorcererOrigin => (
              <option value={sorcererOrigin} key={sorcererOrigin}>
                {translateSorcererOrigin(sorcererOrigin)}
              </option>
            ))}
          </select>
        </label>
      </p>

      {sorcererOrigin === 'draconic-bloodline' && (
        <p>
          <label>
            Escoge Ancestro Dragon:{' '}
            <select name="dragon-ancestor">
              {DRAGON_ANCESTORS.map(ancestor => (
                <option value={ancestor} key={ancestor}>
                  {translateDragonAncestor(ancestor)}
                </option>
              ))}
            </select>
          </label>
        </p>
      )}
    </>
  );
}

export default SorcererSkills;
