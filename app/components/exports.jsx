import { useEffect, useState } from 'react';
import { isValidHtml } from '../utils/parsers/domParser';

export function PlaceSummaryItem(props) {
  const { place, title, children } = props;

  const [isDescriptionHtml, setIsDescriptionHtml] = useState(null);

  useEffect(() => {
    if (typeof DOMParser !== 'undefined') {
      setIsDescriptionHtml(isValidHtml(place.description));
    }
  }, [place.description, typeof DOMParser]);

  const [isNotesHtml, setIsNotesHtml] = useState(null);
  useEffect(() => {
    if (typeof DOMParser !== 'undefined') {
      setIsNotesHtml(isValidHtml(place.notes));
    }
  }, [place.notes, typeof DOMParser]);

  return (
    <>
      <li>
        {title || place.name}

        <ul>
          {/* Both are HTML */}
          {isDescriptionHtml && isNotesHtml && (
            <>
              <li
                dangerouslySetInnerHTML={{
                  __html: 'Descripción' + place.description,
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: 'Notas' + place.notes,
                }}
              />
            </>
          )}

          {/* Just one is HTML */}
          {!isDescriptionHtml !== !isNotesHtml && (
            <>
              {isDescriptionHtml ? (
                <li
                  dangerouslySetInnerHTML={{
                    __html: 'Descripción' + place.description,
                  }}
                />
              ) : (
                place.description && (
                  <li>
                    Descripción:{' '}
                    <ul>
                      {place.description
                        .split('\n')
                        .map((line, i) => line && <li key={i}>{line}</li>)}
                    </ul>
                  </li>
                )
              )}

              {isNotesHtml ? (
                <li
                  dangerouslySetInnerHTML={{
                    __html: 'Notas' + place.notes,
                  }}
                />
              ) : (
                place.notes && (
                  <li>
                    Notas:{' '}
                    <ul>
                      {place.notes
                        .split('\n')
                        .map((line, i) => line && <li key={i}>{line}</li>)}
                    </ul>
                  </li>
                )
              )}
            </>
          )}

          {/* Neither is HTML */}
          {!isDescriptionHtml && !isNotesHtml && (
            <>
              {place.description && (
                <li>
                  Descripción:{' '}
                  <ul>
                    {place.description
                      .split('\n')
                      .map((line, i) => line && <li key={i}>{line}</li>)}
                  </ul>
                </li>
              )}
              {place.notes && (
                <li>
                  Notas:{' '}
                  <ul>
                    {place.notes
                      .split('\n')
                      .map((line, i) => line && <li key={i}>{line}</li>)}
                  </ul>
                </li>
              )}
            </>
          )}

          {children}
        </ul>
      </li>
    </>
  );
}
