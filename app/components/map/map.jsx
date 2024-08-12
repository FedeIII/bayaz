import { useEffect, useRef, useState } from 'react';
import SvgComponent from './svgComponent';

function MapComponent(props) {
  const { markers } = props;
  const svgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;

    const handleWheel = e => {
      e.preventDefault();

      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();

      // Calculate mouse position within the SVG container
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate new zoom level
      const scaleAmount = 1 + e.deltaY / 500;
      const newZoom = Math.max(0.5, Math.min(zoom * scaleAmount, 10));

      // Adjust offset to keep zoom centered around the cursor
      const newOffsetX = (mouseX - (mouseX - offset.x)) * (newZoom / zoom);
      const newOffsetY = (mouseY - (mouseY - offset.y)) * (newZoom / zoom);

      setZoom(newZoom);
      setOffset({ x: newOffsetX, y: newOffsetY });
    };

    svg.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      svg.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, offset]);

  const handleMouseDown = e => {
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = e => {
    if (dragging) {
      setOffset({ x: e.clientX - start.x, y: e.clientY - start.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMarkerClick = marker => {
    alert(`Marker clicked: ${marker.label}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <SvgComponent
        ref={svgRef}
        viewBox="0 0 1000 1000"
        style={{
          width: '100%',
          height: '100%',
          cursor: dragging ? 'grabbing' : 'grab',
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transition: dragging ? 'none' : 'transform 0.3s ease',
          backgroundColor: '#FFFFFF',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {markers.map((marker, index) => (
          <circle
            key={index}
            cx={marker.x}
            cy={marker.y}
            r="10"
            fill="red"
            onClick={() => handleMarkerClick(marker)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </SvgComponent>
    </div>
  );
}

export default MapComponent;
