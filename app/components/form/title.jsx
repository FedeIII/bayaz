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

export function Title({
  inputName,
  className,
  inputClass,
  placeholder,
  value,
  onChange,
  onReroll,
  tag: Tag = 'h1',
}) {
  return (
    <Tag className={className}>
      <TitleContent
        inputName={inputName}
        inputClass={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onReroll={onReroll}
      />
    </Tag>
  );
}

function TitleContent(props) {
  const {
    value,
    placeholder,
    onChange,
    onBlur,
    inputName,
    inputClass = '',
    onReroll,
  } = props;

  const [showTypeInput, setShowTypeInput] = useState(!value);
  const [isFocused, setIsFocused] = useState(false);
  const [showInputHighlight, setShowInputHighlight] = useState(!value);
  const typeRef = useRef();

  useEffect(() => {
    if (!isFocused) {
      setShowTypeInput(!value);
    }
  }, [value, isFocused]);

  useEffect(() => {
    if (showTypeInput) {
      typeRef.current?.focus();
    }
  }, [showTypeInput]);

  return (
    <>
      {!!value && (
        <span
          style={{ display: showTypeInput ? 'none' : 'inline' }}
          className="places__title-input places__title-input--uppercase"
          onClick={() => setShowTypeInput(true)}
        >
          {getCapitalizedTitle(value)}
        </span>
      )}
      <input
        ref={typeRef}
        type="text"
        name={inputName}
        placeholder={placeholder}
        value={value}
        className={`places__title-input ${inputClass} ${
          showInputHighlight ? 'places__title-input--empty' : ''
        }`}
        style={{ display: showTypeInput ? 'inline' : 'none' }}
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          if (value) {
            setShowTypeInput(false);
          }
          setShowInputHighlight(!e.target.value);
          setIsFocused(false);
          onBlur?.(e);
        }}
        onChange={onChange}
      />
      {!!onReroll && (
        <span className="places__title-reroll" onClick={onReroll}>
          ⟳
        </span>
      )}
    </>
  );
}
