export default function MapPopup(props) {
  const { L, title, children } = props;
  return (
    <L.Popup className="map__popup" pane="popupsPane">
      <h3 className="map__popup-title">{title}</h3>
      <div className="map__popup-content">{children}</div>
    </L.Popup>
  );
}
