import { forwardRef } from 'react';
import { Popup } from 'react-leaflet';

export default forwardRef(function MapPopup(props, ref) {
  const { title, children } = props;
  return (
    <Popup ref={ref} className="map__popup" pane="popupsPane">
      <h3 className="map__popup-title">{title}</h3>
      <div className="map__popup-content">{children}</div>
    </Popup>
  );
});
