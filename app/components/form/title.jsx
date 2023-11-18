import { useEffect, useRef, useState } from 'react';

import styles from '~/components/places.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function getCapitalizedTitle(title) {
  const capitalizedTitle = title.split('').reduce(
    (acc, char) =>
      char === char.toUpperCase()
        ? // current uppercase
          acc.wasCapital
          ? // previous uppercase
            {
              capitalized: [
                ...acc.capitalized.slice(0, acc.capitalized.length - 1),
                (acc.capitalized.length
                  ? acc.capitalized[acc.capitalized.length - 1]
                  : '') + char,
              ],
              wasCapital: true,
            }
          : // previous lowercase
            { capitalized: [...acc.capitalized, char], wasCapital: true }
        : // current lowercase
        acc.wasCapital
        ? // previous uppercase
          {
            capitalized: [
              ...acc.capitalized.slice(0, acc.capitalized.length - 1),
              <span className="places__title-capital">
                {acc.capitalized[acc.capitalized.length - 1]}
              </span>,
              char,
            ],
            wasCapital: false,
          }
        : // previous lowecase
          {
            capitalized: [
              ...acc.capitalized.slice(0, acc.capitalized.length - 1),
              (acc.capitalized.length
                ? acc.capitalized[acc.capitalized.length - 1]
                : '') + char,
            ],
            wasCapital: false,
          },
    { capitalized: [], wasCapital: false }
  );

  if (capitalizedTitle.wasCapital) {
    const { capitalized } = capitalizedTitle;
    capitalizedTitle.capitalized = [
      ...capitalized.slice(0, capitalized.length - 1),
      <span className="places__title-capital">
        {capitalized[capitalized.length - 1]}
      </span>,
    ];
  }

  return capitalizedTitle.capitalized;
}

export function Title(props) {
  const {
    value,
    defaultValue,
    onChange,
    inputName,
    className = '',
    inputClass = '',
    onReroll,
  } = props;

  const title = value || defaultValue;

  const [showTypeInput, setShowTypeInput] = useState(!title);
  useEffect(() => {
    setShowTypeInput(!title);
  }, [!title]);
  const typeRef = useRef();
  useEffect(() => {
    if (showTypeInput) {
      typeRef.current.focus();
    }
  }, [showTypeInput]);

  return (
    <h1 className={`places__title ${className}`}>
      {!!title && (
        <span
          style={{ display: showTypeInput ? 'none' : 'inline' }}
          onClick={() => setShowTypeInput(true)}
        >
          {getCapitalizedTitle(title)}
        </span>
      )}
      {value ? (
        <input
          ref={typeRef}
          type="text"
          name={inputName}
          value={value}
          className={`places__title-input ${inputClass}`}
          style={{ display: showTypeInput ? 'inline' : 'none' }}
          onBlur={() => title && setShowTypeInput(false)}
          onChange={onChange}
        />
      ) : (
        <input
          ref={typeRef}
          type="text"
          name={inputName}
          defaultValue={defaultValue}
          className={`places__title-input ${inputClass}`}
          style={{ display: showTypeInput ? 'inline' : 'none' }}
          onBlur={() => title && setShowTypeInput(false)}
        />
      )}
      {!!onReroll && (
        <span className="places__title-reroll" onClick={onReroll}>
          ⟳
        </span>
      )}
    </h1>
  );
}
