// ████░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓
// ██████████████████████████▒▒▒▒▒▓▓▓▓▓▓
// ██████████████████████████████████▓▓▓

import { useMemo } from 'react';

export function GrowBar(props) {
  const { cursorPos, cursorValue, softLimit, softValue, hardLimit, hardValue } =
    props;

  const segmentWidth = 2.7;

  let blue = 0;
  let orange = 0;
  let red = 0;
  let filled = Math.round(cursorPos / segmentWidth);
  let empty = Math.round(softLimit / segmentWidth);
  let light = Math.round((hardLimit - softLimit) / segmentWidth);
  let heavy = Math.round((100 - hardLimit) / segmentWidth);

  if (cursorPos < softLimit) {
    empty -= filled;
    blue = filled;
  } else if (cursorPos < hardLimit) {
    blue = empty;
    orange = filled - empty;
    empty = 0;
    light -= orange;
  } else {
    blue = empty;
    orange = light;
    red = filled - empty - light;
    empty = 0;
    light = 0;
    heavy -= red;
  }

  const cursorValueColor = useMemo(
    () =>
      cursorPos > softLimit
        ? cursorPos > hardLimit
          ? 'red'
          : 'orange'
        : 'iniital',
    [cursorPos, cursorValue, softLimit, hardLimit]
  );

  return (
    <div className="bar">
      <span className="bar__blueBar">
        {/* {Array(blue).fill('▓')} */}
        {Array(blue).fill('▒')}
        {/* {Array(blue).fill('█')} */}
      </span>
      <span className="bar__orangeBar">
        {/* {Array(orange).fill('▓')} */}
        {Array(orange).fill('▒')}
        {/* {Array(orange).fill('█')} */}
      </span>
      <span className="bar__redBar">
        {/* {Array(red).fill('▓')} */}
        {Array(red).fill('▒')}
        {/* {Array(red).fill('█')} */}
      </span>
      <span className="bar__blueBar">{Array(empty).fill('░')}</span>
      <span className="bar__blueBar">
        {Array(light).fill('░')}
        {/* {Array(light).fill('▒')} */}
      </span>
      <span className="bar__blueBar">
        {Array(heavy).fill('░')}
        {/* {Array(heavy).fill('▓')} */}
      </span>
      <span
        className="bar__cursorValue"
        style={{
          left: `calc(${cursorPos}% - 4px)`,
          color: cursorValueColor,
        }}
      >
        {cursorValue}
      </span>
      <span
        className="bar__softLimit"
        style={{ left: `calc(${softLimit}% - 4px)` }}
      >
        {softValue}
      </span>
      <span
        className="bar__hardLimit"
        style={{ left: `calc(${hardLimit}% - 4px)` }}
      >
        {hardValue}
      </span>
    </div>
  );
}
