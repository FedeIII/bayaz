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
              <span
                key={acc.capitalized[acc.capitalized.length - 1]}
                className="places__title-capital"
              >
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
      <span
        key={capitalized[capitalized.length - 1]}
        className="places__title-capital"
      >
        {capitalized[capitalized.length - 1]}
      </span>,
    ];
  }

  return capitalizedTitle.capitalized;
}

export function Title(props) {
  const { className = '', tag = 'h1' } = props;

  switch (tag) {
    case 'h1':
    default:
      return (
        <h1 className={`places__title ${className}`}>
          <TitleContent {...props} />
        </h1>
      );
    case 'h2':
      return (
        <h2 className={`places__title ${className}`}>
          <TitleContent {...props} />
        </h2>
      );
    case 'h3':
      return (
        <h3 className={`places__title ${className}`}>
          <TitleContent {...props} />
        </h3>
      );
  }
}

function TitleContent(props) {
  const {
    value,
    defaultValue,
    placeholder,
    onChange,
    onBlur,
    inputName,
    inputClass = '',
    onReroll,
  } = props;

  const title = value || defaultValue;

  const [showTypeInput, setShowTypeInput] = useState(!title);
  const [showInputHighlight, setShowInputHighlight] = useState(!title);
  useEffect(() => {
    setShowTypeInput(!title);
  }, [!title]);
  const typeRef = useRef();
  useEffect(() => {
    if (showTypeInput) {
      typeRef.current?.focus();
    }
  }, [showTypeInput]);

  return (
    <>
      {!!title && (
        <span
          style={{ display: showTypeInput ? 'none' : 'inline' }}
          onClick={() => setShowTypeInput(true)}
        >
          {getCapitalizedTitle(title)}
        </span>
      )}
      {!!inputName &&
        (value ? (
          <input
            ref={typeRef}
            type="text"
            name={inputName}
            placeholder={placeholder || value}
            value={value || ''}
            className={`places__title-input ${inputClass} ${
              showInputHighlight ? 'places__title-input--empty' : ''
            }`}
            style={{ display: showTypeInput ? 'inline' : 'none' }}
            onBlur={() => {
              if (title) {
                setShowTypeInput(false);
              }
              onBlur?.();
            }}
            onChange={onChange}
          />
        ) : (
          <input
            ref={typeRef}
            type="text"
            name={inputName}
            placeholder={placeholder}
            defaultValue={defaultValue || ''}
            className={`places__title-input ${inputClass} ${
              showInputHighlight ? 'places__title-input--empty' : ''
            }`}
            style={{ display: showTypeInput ? 'inline' : 'none' }}
            onBlur={e => {
              title && setShowTypeInput(false);
              setShowInputHighlight(!e.target.value);
            }}
          />
        ))}
      {!!onReroll && (
        <span className="places__title-reroll" onClick={onReroll}>
          ⟳
        </span>
      )}
    </>
  );
}
