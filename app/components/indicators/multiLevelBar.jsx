import { Fragment } from 'react';

// ████▓▓▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░
// ██████████████████████████▒▒▒▒▒▓▓▓▓▓▓
// ██████████████████████████████████▓▓▓
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░
// ░░░▒▒▒▓▓▓███

const charMap = {
  0: '█',
  1: '▓',
  2: '▒',
  3: '░',
};

const TOTAL_LENGTH = 20;

export function MultiLevelBar(props) {
  const { levels } = props;

  const totalSize = levels.reduce((total, l) => total + l.size, 0);

  return (
    <div className="bar">
      {levels
        .filter(l => l.size)
        .map((level, i) => (
          <Fragment key={`${level.thickness}-${level.size}-${level.tag}`}>
            <span className="bar__multiBar" style={level.style}>
              {Array(
                Math.max(Math.round((level.size * TOTAL_LENGTH) / totalSize), 1)
              ).fill(charMap[level.thickness])}
              {!!level.tag && (
                <span className="bar__barMarker tooltip tooltip--absolute">
                  {level.tag}
                  {!!level.tooltip && (
                    <span className="tooltiptext">{level.tooltip}</span>
                  )}
                </span>
              )}
            </span>
          </Fragment>
        ))}
    </div>
  );
}
