import { Fragment } from 'react';

import styles from './bar.module.css';

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
    <div className={styles.bar}>
      {levels
        .filter(l => l.size)
        .map((level, i) => (
          <Fragment key={`${level.thickness}-${level.size}-${level.tag}`}>
            <span className={styles.multiBar} style={level.style}>
              {Array(
                Math.max(Math.round((level.size * TOTAL_LENGTH) / totalSize), 1)
              ).fill(charMap[level.thickness])}
              {!!level.tag && (
                <span className={styles.barMarker}>{level.tag}</span>
              )}
            </span>
          </Fragment>
        ))}
    </div>
  );
}
