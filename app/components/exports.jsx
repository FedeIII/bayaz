export function PlaceSummaryItem(props) {
  const { place, title, children } = props;
  return (
    <li>
      {title || place.name}

      <ul>
        {place.description
          .split('\n')
          .map((line, i) => line && <li key={i}>{line}</li>)}

        {place.notes
          .split('\n')
          .map((line, i) => line && <li key={i}>{line}</li>)}

        {children}
      </ul>
    </li>
  );
}
