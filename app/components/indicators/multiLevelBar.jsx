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

export function MultiLevelBar(props) {
  const { levels } = props;

  const total = levels.reduce((l1, l2) => l1.size + l2.size);

  return (
    <div className={styles.bar}>
      {levels.map(level => (
        <>
          <span className={styles.multiBar} style={level.style}>
            {Array(level.size).fill(charMap[level.thickness])}
            {!!level.tag && (
              <span className={styles.barMarker}>{level.tag}</span>
            )}
          </span>
        </>
      ))}
    </div>
  );
}
