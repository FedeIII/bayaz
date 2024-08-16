import { forwardRef } from 'react';

export default forwardRef(function MapPopup(props, ref) {
  const { L, title, children } = props;
  return (
    <L.Popup ref={ref} className="map__popup" pane="popupsPane">
      <h3 className="map__popup-title">{title}</h3>
      <div className="map__popup-content">{children}</div>
    </L.Popup>
  );
});
